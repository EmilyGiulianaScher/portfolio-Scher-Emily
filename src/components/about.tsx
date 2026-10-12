import { GraduationCap, Heart, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/content/site";
import { Container } from "./container";

const FACTS = [
  { label: "location", value: "locationValue", Icon: MapPin },
  { label: "studies", value: "studiesValue", Icon: GraduationCap },
] as const;

/**
 * Sobre mi: banda de color a todo el ancho, con titulo y texto centrados y un borde ondulado
 * que se funde con la seccion siguiente (el relleno de la onda es el color de esa seccion).
 */
export function About() {
  const t = useTranslations("About");

  return (
    <section
      id="sobre-mi"
      aria-labelledby="sobre-mi-titulo"
      className="bg-hero text-hero-foreground relative scroll-mt-24 pt-12 pb-28 md:pt-16 md:pb-32"
    >
      <Container className="flex flex-col items-center text-center">
        <h2 id="sobre-mi-titulo" className="text-title italic">
          {t("title")}
        </h2>
        <p className="text-lead mt-6 max-w-[52ch] font-serif md:text-[1.5rem] md:leading-relaxed">
          {t("p1")}
        </p>

        <dl className="mt-8 grid w-full max-w-3xl gap-3 text-left sm:grid-cols-2">
          {FACTS.map(({ label, value, Icon }) => (
            <div
              key={label}
              className="bg-background/60 border-border-strong/30 rounded-md border p-4"
            >
              <dt className="flex items-center gap-3 font-medium">
                <span
                  aria-hidden="true"
                  className="bg-hero text-hero-foreground flex size-9 shrink-0 items-center justify-center rounded-full"
                >
                  <Icon className="size-[1.125rem]" />
                </span>
                {t(`facts.${label}`)}
              </dt>
              <dd className="mt-2 pl-12 text-sm">{t(`facts.${value}`)}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 flex items-center gap-2 text-sm font-medium" translate="no">
          <Heart aria-hidden="true" className="size-4 fill-current" />
          {siteConfig.name}
        </p>
      </Container>

      {/* Onda decorativa: mismo color que la seccion de abajo (Habilidades). */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="text-surface absolute inset-x-0 bottom-[-1px] h-10 w-full md:h-16"
      >
        <path
          fill="currentColor"
          d="M0 40c120 24 240 24 360 0s240-24 360 0 240 24 360 0 240-24 360 0v24H0z"
        />
      </svg>
    </section>
  );
}
