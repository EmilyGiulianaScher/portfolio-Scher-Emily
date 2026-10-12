/**
 * URL publica del sitio, usada para canonicals, sitemap y Open Graph.
 * Se define con NEXT_PUBLIC_SITE_URL (por ejemplo, un dominio propio). Si no existe, usa el
 * dominio de produccion que Vercel inyecta en cada build. En local cae a localhost.
 *
 * En un build de integracion continua (CI) sin ninguna de las dos, falla: de lo contrario el sitio
 * publicado emitiria canonicals, sitemap y tarjetas sociales apuntando a localhost sin que nadie
 * lo note.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelHost) return `https://${vercelHost}`;

  if (process.env.CI) {
    throw new Error(
      "Falta NEXT_PUBLIC_SITE_URL: sin ella las URLs absolutas del sitio apuntarian a localhost.",
    );
  }
  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
