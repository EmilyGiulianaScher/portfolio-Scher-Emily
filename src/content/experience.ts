/**
 * Datos de la linea de tiempo que no dependen del idioma. El rol, el lugar y los logros viven en
 * messages/*.json bajo "Experience.items.<id>". Las fechas (AAAA-MM) se formatean por idioma.
 * `caseStudyHref` (sin prefijo de idioma) enlaza un caso de estudio escrito de ese trabajo.
 */
type ExperienceEntry = {
  id: "stocknow" | "makingSense" | "freelance";
  company: string;
  start: string;
  end: string | null;
  caseStudyHref?: string;
};

export const experience: readonly ExperienceEntry[] = [
  { id: "stocknow", company: "StockNow", start: "2025-11", end: null },
  {
    id: "makingSense",
    company: "Making Sense",
    start: "2025-02",
    end: "2025-07",
    caseStudyHref: "/work/making-sense-design-system",
  },
  { id: "freelance", company: "Freelance", start: "2023-12", end: "2025-01" },
];
