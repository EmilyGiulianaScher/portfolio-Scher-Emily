import type { Locale } from "@/i18n/routing";
import type messages from "../../messages/es.json";

// Tipa los idiomas y las claves de traduccion: una clave inexistente falla en compilacion.
declare module "next-intl" {
  interface AppConfig {
    Locale: Locale;
    Messages: typeof messages;
  }
}
