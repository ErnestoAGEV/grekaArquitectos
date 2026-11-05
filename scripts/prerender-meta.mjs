// Post-build: un HTML por proyecto con sus propias meta/OG/canonical, 404 real y sitemap.
// Bots que no ejecutan JS (WhatsApp, Facebook, Bing, IA) ven así los datos y el texto de cada página.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { defaultContent } from "../src/data/content.js";

const SITE = "https://grekaarquitectos.com";
const QUERY = `{
  "projects": *[_type == "project" && defined(slug.current)] | order(coalesce(orden, 9999) asc, _createdAt asc) {
    title, "slug": slug.current, type, location, year, summary, description, _updatedAt, "cover": gallery[0].asset->url
  },
  "site": *[_id == "siteSettings"][0] { hero, about, services, projectsSection, process, faq, contact, _updatedAt }
}`;
const API = `https://w49vic6b.apicdn.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent(QUERY)}`;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const clip = (s, n = 155) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(" ", n - 1)) + "…");
const t = (s) => esc(String(s ?? "").replace(/\s*\n\s*/g, " "));
const ld = (obj) => `    <script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>\n`;

// Mismo criterio que useContent.js: un campo vacío en Sanity cae al texto por defecto
const filled = (v) => (typeof v === "string" ? v.trim() !== "" : v != null && !(Array.isArray(v) && v.length === 0));
const mergeSite = (site) =>
  Object.fromEntries(
    Object.entries(defaultContent).map(([k, d]) => [
      k,
      { ...d, ...Object.fromEntries(Object.entries(site?.[k] ?? {}).filter(([, v]) => filled(v))) },
    ]),
  );

const setMeta = (html, attr, key, value) => {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`index.html sin <meta ${attr}="${key}">`);
  return html.replace(re, `$1${esc(value)}$2`);
};

// Texto real de la página dentro de #root; React lo reemplaza al montar (createRoot limpia el contenedor).
const snapshot = (inner) => `<div id="root"><div class="seo-snapshot">${inner}</div></div>`;
const list = (items, fn) => (items ?? []).map(fn).join("\n");
const meta = (p, sep) => t([p.type, p.location, p.year].filter(Boolean).join(sep));

const homeSnapshot = (c, projects) =>
  snapshot(`
<header><p>${t(c.hero.eyebrow)}</p><h1>${t(c.hero.headline)}</h1><p>${t(c.hero.lead)}</p></header>
<main>
<section><p>${t(c.about.statement)}</p><p>${t(c.about.lead)}</p></section>
<section><h2>${t(c.services.title)}</h2><p>${t(c.services.intro)}</p>
${list(c.services.items, (s) => `<h3>${t(s.title)}</h3><p>${t(s.text)}</p>`)}</section>
<section><h2>${t(c.projectsSection.title)}</h2><p>${t(c.projectsSection.intro)}</p><ul>
${list(projects, (p) => `<li><a href="/project/${p.slug}">${t(p.title)}</a> — ${meta(p, ", ")}. ${t(p.summary)}</li>`)}</ul></section>
<section><h2>${t(c.process.title)}</h2><p>${t(c.process.intro)}</p><ol>
${list(c.process.steps, (s) => `<li><h3>${t(s.title)}</h3><p>${t(s.text)}</p></li>`)}</ol></section>
<section><h2>${t(c.faq.title)}</h2>
${list(c.faq.items, (f) => `<h3>${t(f.q)}</h3><p>${t(f.a)}</p>`)}</section>
<section><h2>${t(c.contact.title)}</h2><p>${t(c.contact.lead)}</p>
<address>${t(c.contact.address)} · <a href="tel:${t(c.contact.phone).replace(/\s/g, "")}">${t(c.contact.phone)}</a> · <a href="mailto:${t(c.contact.email)}">${t(c.contact.email)}</a></address></section>
</main>`);

const projectSnapshot = (p) =>
  snapshot(`
<main><p><a href="/">Greka Arquitectos</a></p><h1>${t(p.title)}</h1>
<p>${meta(p, " · ")}</p><p>${t(p.summary)}</p><p>${t(p.description)}</p>
<p><a href="/#projects">Ver más proyectos de arquitectura en Colima</a></p></main>`);

const page = (base, { title, description, url, image, extraHead = "", body }) => {
  let html = base.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  html = setMeta(html, "name", "description", description);
  html = setMeta(html, "property", "og:title", title);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", url);
  if (image) html = setMeta(html, "property", "og:image", image);
  if (body) html = html.replace('<div id="root"></div>', body);
  return html.replace("</head>", `    <link rel="canonical" href="${esc(url)}" />\n${extraHead}  </head>`);
};

const base = await readFile("dist/index.html", "utf8");

let projects, site, siteUpdated;
try {
  const res = await fetch(API, { signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`Sanity ${res.status}`);
  const { result } = await res.json();
  site = mergeSite(result.site);
  siteUpdated = result.site?._updatedAt;
  // El slug se usa como nombre de archivo: sólo letras, números y guiones
  projects = result.projects.filter((p) => /^[a-z0-9-]+$/i.test(p.slug) || console.warn(`prerender-meta: slug ignorado "${p.slug}"`));
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
  body: homeSnapshot(site, projects),
  extraHead: ld({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (site.faq.items ?? []).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }),
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
    extraHead: ld(breadcrumb),
    body: projectSnapshot(p),
  }));
}

// Con 404.html en la raíz, Pages responde 404 real a rutas inexistentes (y React muestra NotFound)
await writeFile("dist/404.html", base
  .replace(/<title>[^<]*<\/title>/, "<title>Página no encontrada | Greka Arquitectos</title>")
  .replace("</head>", `    <meta name="robots" content="noindex" />\n  </head>`));

const day = (d) => (d ? d.slice(0, 10) : null);
const latest = [siteUpdated, ...projects.map((p) => p._updatedAt)].filter(Boolean).sort().at(-1);
const urls = [
  { loc: `${SITE}/`, lastmod: day(latest) },
  ...projects.map((p) => ({ loc: `${SITE}/project/${p.slug}`, lastmod: day(p._updatedAt) })),
];
await writeFile("dist/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`).join("\n")}
</urlset>
`);

console.log(`prerender-meta: ${projects.length} proyectos, 404.html y sitemap.xml`);
