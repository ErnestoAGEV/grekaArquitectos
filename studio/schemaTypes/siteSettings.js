import { defineArrayMember, defineField, defineType } from "sanity";

const text = (name, title, description, rows = 3) =>
  defineField({ name, title, description, type: "text", rows });

const item = (fields, title = "title", subtitle = "text") =>
  defineArrayMember({ type: "object", fields, preview: { select: { title, subtitle } } });

const titleText = [
  defineField({ name: "title", title: "Título", type: "string" }),
  text("text", "Texto"),
];

const section = (name, title, fields) =>
  defineField({ name, title, type: "object", group: name, options: { collapsible: false }, fields });

// Un solo documento con todos los textos de la página. Un campo vacío usa el texto original.
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Contenido del sitio",
  type: "document",
  groups: [
    { name: "hero", title: "Portada", default: true },
    { name: "about", title: "Nosotros" },
    { name: "services", title: "Servicios" },
    { name: "projectsSection", title: "Proyectos" },
    { name: "process", title: "Proceso" },
    { name: "faq", title: "Preguntas" },
    { name: "contact", title: "Contacto" },
    { name: "footer", title: "Pie de página" },
  ],
  fields: [
    section("hero", "Portada", [
      defineField({ name: "eyebrow", title: "Texto pequeño arriba del título", type: "string" }),
      text("headline", "Título", "Cada renglón se muestra en una línea."),
      text("lead", "Texto debajo del título"),
      defineField({
        name: "image",
        title: "Foto de fondo",
        description: "Si la dejas vacía se usa la portada del primer proyecto.",
        type: "image",
        options: { hotspot: true },
      }),
    ]),
    section("about", "Nosotros", [
      text("statement", "Frase principal"),
      text("lead", "Párrafo"),
      defineField({
        name: "image",
        title: "Foto",
        description: "Si la dejas vacía se usa una foto del segundo proyecto.",
        type: "image",
        options: { hotspot: true },
      }),
      defineField({ name: "principles", title: "Principios", type: "array", of: [item(titleText)] }),
    ]),
    section("services", "Servicios", [
      defineField({ name: "title", title: "Título", type: "string" }),
      text("intro", "Introducción"),
      defineField({
        name: "items",
        title: "Servicios",
        type: "array",
        of: [
          item([
            ...titleText,
            defineField({ name: "tags", title: "Etiquetas", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
          ]),
        ],
      }),
    ]),
    section("projectsSection", "Proyectos", [
      defineField({ name: "title", title: "Título", type: "string" }),
      text("intro", "Introducción", "Los proyectos se editan en la sección «Proyectos» del menú."),
    ]),
    section("process", "Proceso", [
      defineField({ name: "title", title: "Título", type: "string" }),
      text("intro", "Introducción"),
      defineField({ name: "steps", title: "Etapas", type: "array", of: [item(titleText)] }),
    ]),
    section("faq", "Preguntas frecuentes", [
      defineField({ name: "title", title: "Título", type: "string" }),
      defineField({
        name: "items",
        title: "Preguntas",
        type: "array",
        of: [
          item(
            [defineField({ name: "q", title: "Pregunta", type: "string" }), text("a", "Respuesta", undefined, 4)],
            "q",
            "a",
          ),
        ],
      }),
    ]),
    section("contact", "Contacto", [
      text("title", "Título", "Cada renglón se muestra en una línea.", 2),
      text("lead", "Texto"),
      defineField({ name: "address", title: "Dirección", description: "También se usa para el mapa.", type: "string" }),
      defineField({ name: "phone", title: "Teléfono", type: "string" }),
      defineField({ name: "email", title: "Correo", type: "string", validation: (r) => r.email() }),
      defineField({ name: "whatsapp", title: "WhatsApp", description: "Número con lada del país, ej. 5213123143828", type: "string" }),
      defineField({ name: "whatsappMessage", title: "Mensaje inicial de WhatsApp", type: "string" }),
      defineField({ name: "facebook", title: "Facebook", description: "Enlace a la página. Vacío = no se muestra.", type: "url" }),
    ]),
    section("footer", "Pie de página", [text("claim", "Frase", "Cada renglón se muestra en una línea.", 2)]),
  ],
  preview: { prepare: () => ({ title: "Contenido del sitio" }) },
});
