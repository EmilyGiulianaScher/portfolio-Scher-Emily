import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "./routing";

/**
 * Lee el parametro [locale] de una pagina o layout y lo valida. Un idioma que no existe responde
 * 404; si existe, queda tipado como Locale ("es" | "en") para las traducciones.
 */
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return locale;
}
