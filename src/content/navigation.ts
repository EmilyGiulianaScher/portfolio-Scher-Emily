/** Secciones del menu principal, en el orden en que aparecen en la home. */
export const navItems = [
  { id: "experience", href: "/#experiencia" },
  { id: "projects", href: "/#proyectos" },
  { id: "about", href: "/#sobre-mi" },
  { id: "skills", href: "/#habilidades" },
  { id: "contact", href: "/#contacto" },
] as const;

export type NavItemId = (typeof navItems)[number]["id"];
