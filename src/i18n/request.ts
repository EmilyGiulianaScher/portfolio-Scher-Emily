import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    // Un archivo por idioma en /messages: el contenido queda separado del codigo.
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
