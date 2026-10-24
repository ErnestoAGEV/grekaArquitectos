// Post-build: un HTML por proyecto con sus propias meta/OG/canonical, 404 real y sitemap.
// Bots que no ejecutan JS (WhatsApp, Facebook, Bing) ven así los datos correctos de cada página.
import { readFile, writeFile, mkdir } from "node:fs/promises";

const SITE = "https://grekaarquitectos.com";
const QUERY = `*[_type == "project" && defined(slug.current)] | order(coalesce(orden, 9999) asc, _createdAt asc) {
  title, "slug": slug.current, summary, description, "cover": gallery[0].asset->url
}`;
const API = `https://w49vic6b.apicdn.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent(QUERY)}`;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clip = (s, n = 155) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)) + "…");

const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`index.html sin <meta ${attr}="${key}">`);
  return html.replace(re, `$1${esc(value)}$2`);
};

const page = (base, { title, description, url, image, extraHead = "" }) => {
  let html = base.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", url);
  if (image) html = setMeta(html, "property", "og:image", image);
  return html.replace("</head>", `    <link rel="canonical" href="${esc(url)}" />\n${extraHead}  </head>`);
};

const base = await readFile("dist/index.html", "utf8");

let projects;
try {
  const res = await fetch(API, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  // El slug se usa como nombre de archivo: sólo letras, números y guiones
  projects = (await res.json()).result.filter((p) => /^[a-z0-9-]+$/i.test(p.slug) || console.warn(`prerender-meta: slug ignorado "${p.slug}"`));
  if (!projects.length) throw new Error("Sanity sin proyectos");
} catch (err) {
  // Sin datos no se genera nada: el sitio sigue funcionando con el fallback SPA de Pages.
  console.warn(`prerender-meta: omitido (${err.message})`);
  process.exit(0);
}

await writeFile("dist/index.html", page(base, {
  title: base.match(/<title>([^<]*)<\/title>/)[1],
  description: base.match(/<meta name="description" content="([^"]*)"/)[1],
  url: `${SITE}/`,
}));

await mkdir("dist/project", { recursive: true });
for (const p of projects) {
  const url = `${SITE}/project/${p.slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: p.title, item: url },
    ],
  };
  // Archivo .html (no carpeta/index.html) para que Pages lo sirva en /project/slug sin barra final
  await writeFile(`dist/project/${p.slug}.html`, page(base, {
    title: `${p.title} | Greka Arquitectos`,
    description: clip(p.description || p.summary || p.title),
    url,
    image: p.cover ? `${p.cover}?w=1200&h=630&fit=crop&auto=format` : null,
    extraHead: `    <script type="application/ld+json">${JSON.stringify(breadcrumb).replace(/</g, "\\u003c")}</script>\n`,
  }));
}

// Con 404.html en la raíz, Pages responde 404 real a rutas inexistentes (y React muestra NotFound)
await writeFile("dist/404.html", base
  .replace(/<title>[^<]*<\/title>/, "<title>Página no encontrada | Greka Arquitectos</title>")
  .replace("</head>", `    <meta name="robots" content="noindex" />\n  </head>`));

const urls = [`${SITE}/`, ...projects.map((p) => `${SITE}/project/${p.slug}`)];
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join("\n")}
</urlset>
`);

console.log(`prerender-meta: ${projects.length} proyectos, 404.html y sitemap.xml`);
