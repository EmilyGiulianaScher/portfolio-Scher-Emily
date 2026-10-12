import { Download, MapPin } from "lucide-react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import portrait from "@/assets/emily.jpg";
import { siteConfig } from "@/content/site";
import { Container } from "./container";
import { ExternalLink } from "./external-link";
import { buttonVariants } from "./ui/button";

const NAME_WORDS = siteConfig.name.split(" ");

export function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const otherLocale = locale === "es" ? "en" : "es";

  return (
    <section className="bg-hero text-hero-foreground lg:flex lg:min-h-svh lg:items-center">
      <Container className="grid items-center gap-10 pt-32 pb-10 lg:grid-cols-12 lg:gap-10 lg:pt-28 lg:pb-12">
        <div className="lg:col-span-7">
          <h1 className="text-display" translate="no">
            {NAME_WORDS.map((word, i) => (
              // El recorte (overflow) vive en el contenedor de cada linea. Con interlineado menor a 1
              // los trazos altos y bajos de las letras se salen de la caja de la linea: el relleno
              // arriba y abajo (compensado con margen negativo) evita que se corten.
              <span key={word} className="-my-[0.14em] block overflow-hidden py-[0.14em]">
                <span
                  className="rise-word inline-block"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  {word}
                </span>{" "}
              </span>
            ))}
          </h1>
          <p className="text-lead mt-6 max-w-md">{t("role")}</p>
          <p className="mt-2 flex items-center gap-2 text-sm font-medium">
            <MapPin aria-hidden="true" className="size-4 shrink-0" />
            {t("location")}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={siteConfig.cv[locale]}
              download
              className={buttonVariants({ variant: "primary" })}
            >
              <Download aria-hidden="true" />
              {t("cv")}
            </a>
            <ExternalLink
              href={siteConfig.links.github}
              className={buttonVariants({ variant: "outline" })}
            >
              <FaGithub aria-hidden="true" />
              GitHub
            </ExternalLink>
            <ExternalLink
              href={siteConfig.links.linkedin}
              className={buttonVariants({ variant: "outline" })}
            >
              <FaLinkedinIn aria-hidden="true" />
              LinkedIn
            </ExternalLink>
          </div>
          <p className="mt-4 text-sm">
            <a
              href={siteConfig.cv[otherLocale]}
              download
              lang={otherLocale}
              className="underline underline-offset-4"
            >
              {t("cvOther")}
            </a>
          </p>
        </div>

        {/* En escritorio el retrato ocupa todo el alto de la columna; en celular, un encuadre bajo. */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm sm:max-w-md lg:col-span-5 lg:col-start-8 lg:aspect-auto lg:h-[min(36rem,calc(100svh-11rem))] lg:max-w-none">
          <Image
            src={portrait}
            alt={t("photoAlt")}
            fill
            placeholder="blur"
            preload
            fetchPriority="high"
            sizes="(min-width: 1024px) 38vw, 70vw"
            className="object-cover object-[50%_28%]"
          />
        </div>
      </Container>
    </section>
  );
}
