import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Proyecto",
  type: "document",
  orderings: [{ title: "Orden en la página", name: "orden", by: [{ field: "orden", direction: "asc" }] }],
  fields: [
    defineField({ name: "title", title: "Nombre", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Dirección web",
      description: "Se genera a partir del nombre. Es la parte final del enlace del proyecto.",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "orden",
      title: "Orden",
      description: "Número para ordenar los proyectos en la página (1 = primero). El primero sale de fondo en la portada.",
      type: "number",
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: { list: ["Residencial", "Comercial"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "type", title: "Tipo", description: "Ej. Vivienda unifamiliar", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Ubicación", type: "string" }),
    defineField({ name: "year", title: "Año", type: "string" }),
    defineField({ name: "area", title: "Superficie", description: "Ej. 250 m²", type: "string" }),
    defineField({ name: "summary", title: "Resumen", description: "Una frase que se ve en la tarjeta del proyecto.", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Descripción", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({
      name: "gallery",
      title: "Fotos",
      description: "La primera foto es la portada. Arrastra para cambiar el orden.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      options: { layout: "grid" },
    }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "gallery.0" } },
});
