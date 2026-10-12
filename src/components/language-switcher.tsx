"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

// Cada idioma se nombra en su propio idioma: es lo que reconoce quien lo busca.
const LANGUAGE_NAMES: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

/**
 * Selector de idioma como enlaces (no botones): funciona sin JavaScript, se puede abrir en una
 * pestaña nueva y cada destino declara su idioma con `lang` para los lectores de pantalla.
 * Es un enlace normal (no `Link` de Next): el idioma cambia el <html> de la raiz, asi que se carga
 * la pagina completa. Con navegacion en el cliente React 19 avisa del <script> de tema del <head>.
 * El texto visible es el nombre accesible (WCAG 2.5.3, "etiqueta en el nombre"), sin aria-label.
 */
export function LanguageSwitcher() {
  const t = useTranslations("Header");
  const currentLocale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")}>
      <ul className="flex items-center gap-1 text-sm">
        {routing.locales.map((locale) => {
          const isCurrent = locale === currentLocale;
          return (
            <li key={locale}>
              <a
                href={`/${locale}${pathname === "/" ? "" : pathname}`}
                lang={locale}
                hrefLang={locale}
                aria-current={isCurrent ? "true" : undefined}
                className={cn(
                  "inline-block rounded-sm px-2 py-1 font-medium",
                  isCurrent
                    ? "text-foreground underline decoration-2 underline-offset-4"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {LANGUAGE_NAMES[locale]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
