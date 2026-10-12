import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// En Next 16 "middleware" se llama "proxy". Redirige "/" a /es o /en segun el navegador.
export default createMiddleware(routing);

export const config = {
  // Excluye api, archivos internos de Next y cualquier archivo con extension (pdf, png, ico...).
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
