import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Canonical y alternates por idioma para una ruta (sin prefijo de idioma, p. ej. "" o "/sistema").
 * Se define en cada pagina y no en el layout: un canonical heredado haria que todas las paginas
 * declaren a la home como su original.
 */
export function localizedAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`])),
      "x-default": `/${routing.defaultLocale}${path}`,
    },
  };
}
