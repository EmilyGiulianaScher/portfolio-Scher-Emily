import { Smartphone, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiCplusplus,
  SiCss,
  SiFigma,
  SiGit,
  SiGooglesheets,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiStorybook,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

/** Icono de cada tecnologia, por el nombre con el que aparece en el contenido. */
const ICONS: Record<string, IconType | LucideIcon> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Next.js (App Router)": SiNextdotjs,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  "Tailwind CSS": SiTailwindcss,
  Supabase: SiSupabase,
  "Supabase (PostgreSQL, Auth)": SiSupabase,
  "Google Sheets": SiGooglesheets,
  // simple-icons no incluye AppSheet: se usa un icono generico de app.
  AppSheet: Smartphone,
  Git: SiGit,
  Storybook: SiStorybook,
  Figma: SiFigma,
  HTML: SiHtml5,
  CSS: SiCss,
  "C/C++": SiCplusplus,
};

/** Devuelve el icono (decorativo) de una tecnologia, o nada si no tiene. El nombre va siempre al lado. */
export function TechIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name];
  if (!Icon) return null;
  return <Icon aria-hidden="true" className={className} />;
}

export const hasTechIcon = (name: string) => name in ICONS;
