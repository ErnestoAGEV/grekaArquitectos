import photos from "./photos.json";

const unsplash = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=75`;

// Placeholders mientras no existan fotos en src/data/photos.json (ver scripts/optimize-photos.py)
const placeholders = {
  "marina-guanajuato": ["1441986300917-64674bd600d8", "1567401893414-76b7b1e5a7a5", "1555529669-e69e7aa0ba9a"],
  "marina-san-fernando": ["1528698827591-e19ccd7bc23d", "1604719312566-8912e9227c6a", "1441984904996-e0b6ba687e04"],
  "casa-kosmos": ["1600585154340-be6161a56a0c", "1600607687939-ce8a6c25118c", "1600566753376-12c8ab7fb75b"],
  "casa-cuarzita": ["1600585154526-990dced4db0d", "1600210492486-724fe5c67fb0", "1600607688969-a5bfcd646154"],
};

export const galleryFor = (slug) => {
  const real = Object.hasOwn(photos, slug) ? photos[slug] : undefined;
  if (real?.length) {
    return real.map((p) => ({
      src: import.meta.env.BASE_URL + p.src,
      sm: import.meta.env.BASE_URL + p.sm,
      w: p.w,
      h: p.h,
    }));
  }
  return (placeholders[slug] ?? placeholders["casa-kosmos"]).map((id) => ({ src: unsplash(id), sm: unsplash(id), w: 1600, h: 1067 }));
};

// Sólo datos confirmados; los campos opcionales (ubicación, año, área) se muestran si existen.
const projects = [
  {
    slug: "marina-san-fernando",
    title: "Marina San Fernando",
    category: "Comercial",
    type: "Interiorismo comercial",
    location: "Plaza San Fernando, Colima",
    summary: "Tienda departamental en el corazón de Plaza San Fernando.",
    description:
      "Diseñamos el interior de la tienda Marina en Plaza San Fernando. Organizamos los departamentos alrededor de circulaciones amplias y usamos plafones, iluminación y materiales que dan unidad a todo el piso de venta, para que el producto sea el protagonista.",
  },
  {
    slug: "casa-kosmos",
    title: "Casa Kosmos",
    category: "Residencial",
    type: "Vivienda unifamiliar",
    summary: "Una casa pensada para la vida diaria.",
    description:
      "Proyectamos Casa Kosmos alrededor de la vida diaria de la familia: espacios abiertos, buena luz natural y una relación directa entre el interior y el exterior. Cada espacio tiene una razón de ser y una proporción cuidada.",
  },
  {
    slug: "marina-guanajuato",
    title: "Marina Guanajuato",
    category: "Comercial",
    type: "Interiorismo comercial",
    location: "Guanajuato",
    summary: "Interiorismo para una tienda departamental.",
    description:
      "Llevamos el concepto de la tienda Marina a Guanajuato. Trabajamos recorridos claros entre departamentos, plafones con ritmo propio e iluminación pensada para resaltar cada área de venta.",
  },
  {
    slug: "casa-cuarzita",
    title: "Casa Cuarzita",
    category: "Residencial",
    type: "Vivienda unifamiliar",
    summary: "Volúmenes sencillos y materiales honestos.",
    description:
      "En Casa Cuarzita apostamos por volúmenes sencillos y materiales honestos. Cuidamos la entrada de luz, las vistas y la manera en que se conectan los espacios para lograr una casa serena y fácil de habitar.",
  },
];

export const projectsData = projects.map((p) => {
  const gallery = galleryFor(p.slug);
  return { ...p, id: p.slug, cover: gallery[0], gallery };
});
