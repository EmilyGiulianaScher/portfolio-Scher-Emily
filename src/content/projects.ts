import type { StaticImageData } from "next/image";
import bonaBudin from "@/assets/projects/bona-budin.webp";
import carpinteria from "@/assets/projects/carpinteria.webp";
import stocknow from "@/assets/projects/stocknow.webp";

/**
 * Proyectos propios con sitio publicado. Los textos (nombre, problema, rol...) viven en
 * messages/*.json bajo "Projects.items.<id>". El trabajo en empresas (por ejemplo Making Sense)
 * va en Experiencia, no aca.
 */
export type Project = {
  id: "stocknow" | "bonaBudin" | "carpinteria";
  image: StaticImageData;
  site: string;
  stack: readonly string[];
  repo?: string;
  featured?: boolean;
};

export const projects: readonly Project[] = [
  {
    id: "stocknow",
    featured: true,
    image: stocknow,
    site: "https://stocknow-app.netlify.app/",
    stack: ["Next.js", "React", "Tailwind CSS", "Supabase"],
  },
  {
    id: "bonaBudin",
    image: bonaBudin,
    site: "https://bonabudin.netlify.app/",
    // Segun Emily: el frontend es suyo y el backend esta en AppSheet de Google (datos en Google Sheets).
    stack: ["React", "AppSheet", "Google Sheets"],
  },
  {
    id: "carpinteria",
    image: carpinteria,
    site: "https://carpinteriasanjose.netlify.app/",
    repo: "https://github.com/EmilyGiulianaScher/carpinteria-san-jose",
    stack: ["React", "AppSheet", "Google Sheets"],
  },
];
