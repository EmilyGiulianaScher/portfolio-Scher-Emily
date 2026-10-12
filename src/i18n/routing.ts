import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // Siempre con prefijo (/es, /en): URLs explicitas, compartibles y sin ambiguedad para el SEO.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
