import { siteConfig } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

/** Datos estructurados (schema.org/Person) para buscadores. Solo incluye datos ya publicos. */
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: "Frontend Developer",
    url: siteUrl,
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
    address: { "@type": "PostalAddress", addressLocality: "Corrientes", addressCountry: "AR" },
    knowsLanguage: ["es", "en", "pt"],
  };

  return (
    <script
      type="application/ld+json"
      // "<" escapado para que ningun valor pueda cerrar la etiqueta <script>.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
