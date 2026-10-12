/**
 * Habilidades agrupadas. Los nombres propios de tecnologias no se traducen ("name"); el resto
 * apunta a una clave de messages/*.json bajo "Skills.items" ("key").
 */
export type SkillTextKey =
  "htmlCss" | "a11y" | "restApis" | "designSystems" | "spanish" | "english" | "portuguese";

export type Skill = { name: string } | { key: SkillTextKey };

export type SkillGroupId = "frontend" | "data" | "styles" | "tools" | "languages";

export const skillGroups: ReadonlyArray<{ id: SkillGroupId; items: readonly Skill[] }> = [
  {
    id: "frontend",
    items: [
      { name: "React" },
      { name: "Next.js (App Router)" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { key: "htmlCss" },
      { key: "a11y" },
    ],
  },
  {
    id: "data",
    items: [{ name: "Context API" }, { key: "restApis" }, { name: "Supabase (PostgreSQL, Auth)" }],
  },
  {
    id: "styles",
    items: [{ name: "Tailwind CSS" }, { name: "Figma" }, { key: "designSystems" }],
  },
  {
    id: "tools",
    items: [{ name: "Git" }, { name: "Storybook" }],
  },
  {
    id: "languages",
    items: [{ key: "spanish" }, { key: "english" }, { key: "portuguese" }],
  },
];
