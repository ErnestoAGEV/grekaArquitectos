import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { project } from "./schemaTypes/project";
import { siteSettings } from "./schemaTypes/siteSettings";

// "Contenido del sitio" es un documento único: no se puede crear otro ni borrarlo.
const singleton = "siteSettings";

export default defineConfig({
  name: "default",
  title: "Greka Arquitectos",
  projectId: "w49vic6b",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            S.listItem()
              .title("Contenido del sitio")
              .id(singleton)
              .child(S.document().schemaType(singleton).documentId(singleton)),
            S.divider(),
            S.documentTypeListItem("project").title("Proyectos"),
          ]),
    }),
  ],
  schema: {
    types: [project, siteSettings],
    templates: (templates) => templates.filter((t) => t.schemaType !== singleton),
  },
  document: {
    actions: (actions, { schemaType }) =>
      schemaType === singleton
        ? actions.filter(({ action }) => ["publish", "discardChanges", "restore"].includes(action))
        : actions,
  },
});
