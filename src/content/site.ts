/** Datos de identidad que no cambian con el idioma. */
export const siteConfig = {
  name: "Emily Giuliana Scher",
  shortName: "Emily Scher",
  links: {
    github: "https://github.com/EmilyGiulianaScher",
    // URL tomada del hipervinculo de LinkedIn de los CV.
    linkedin: "https://www.linkedin.com/in/emily-giuliana-scher/",
  },
  /**
   * El email va codificado (base64) y se decodifica en el navegador (ver EmailContact): asi no
   * aparece como texto ni en el HTML ni en los datos que Next envia al cliente, donde los robots
   * que juntan direcciones lo encontrarian. Frena a los robots simples; no es seguridad.
   */
  email: { encoded: "ZW1pbHlnaXVsaWFuYXNjaGVyQGdtYWlsLmNvbQ==" },
  /** CV por idioma, servidos desde /public. */
  cv: {
    es: "/CVScherEmilyEs.pdf",
    en: "/CVScherEmilyEn.pdf",
  },
} as const;
