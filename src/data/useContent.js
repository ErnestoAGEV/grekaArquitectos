import { useEffect, useState } from "react";
import { projectsData, galleryFor } from "./projects";
import { defaultContent } from "./content";

// Contenido editable desde el Studio de Sanity (greka.sanity.studio).
const IMAGE = `{ url, "w": metadata.dimensions.width, "h": metadata.dimensions.height }`;
const QUERY = `{
  "projects": *[_type == "project" && defined(slug.current)] | order(coalesce(orden, 9999) asc, _createdAt asc) {
    title, "slug": slug.current, category, type, location, year, area, summary, description,
    "gallery": gallery[].asset->${IMAGE}
  },
  "site": *[_id == "siteSettings"][0] {
    ...,
    "hero": hero { ..., "image": image.asset->${IMAGE} },
    "about": about { ..., "image": image.asset->${IMAGE} }
  }
}`;
const API = `https://w49vic6b.apicdn.sanity.io/v2024-01-01/data/query/production?query=${encodeURIComponent(QUERY)}`;

const toImage = (a) => ({
  src: `${a.url}?w=1600&auto=format&q=75`,
  sm: `${a.url}?w=800&auto=format&q=75`,
  w: a.w,
  h: a.h,
});

const toProject = (p) => {
  const photos = (p.gallery ?? []).filter(Boolean);
  const gallery = photos.length ? photos.map(toImage) : galleryFor(p.slug);
  return { ...p, id: p.slug, cover: gallery[0], gallery };
};

const filled = (v) =>
  typeof v === "string" ? v.trim() !== "" : v != null && !(Array.isArray(v) && v.length === 0);

// Cada campo vacío en Sanity cae al texto por defecto.
const toSite = (site) =>
  Object.fromEntries(
    Object.entries(defaultContent).map(([section, defaults]) => {
      const fields = Object.entries(site?.[section] ?? {}).filter(([, v]) => filled(v));
      const merged = { ...defaults, ...Object.fromEntries(fields) };
      if (merged.image) merged.image = toImage(merged.image);
      return [section, merged];
    }),
  );

const fallback = { projects: projectsData, site: defaultContent };

// Una sola petición por carga de página, compartida por todos los componentes.
let cached;
let request;
const load = () =>
  (request ??= fetch(API, { signal: AbortSignal.timeout(5000) })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`Sanity ${r.status}`))))
    .then(({ result }) => ({
      projects: result.projects.length ? result.projects.map(toProject) : projectsData,
      site: toSite(result.site),
    }))
    .catch(() => fallback) // sin conexión a Sanity se muestran los datos locales
    .then((data) => (cached = data)));

export function useContent() {
  const [data, setData] = useState(cached);

  useEffect(() => {
    if (!cached) load().then(setData);
  }, []);

  return { ...(data ?? fallback), ready: Boolean(data) };
}
