import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { experience } from "@/content/experience";
import { Section } from "./section";

export function Experience() {
  const t = useTranslations("Experience");
  const format = useFormatter();

  // Las fechas son AAAA-MM; se fijan en UTC para que el mes no cambie segun la zona horaria.
  const month = (isoMonth: string) =>
    format.dateTime(new Date(`${isoMonth}-01T00:00:00Z`), {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    });

  return (
    <Section id="experiencia" title={t("title")}>
      <ol className="border-border mt-8 divide-y border-t">
        {experience.map(({ id, company, start, end, caseStudyHref }) => (
          <li key={id} className="border-border grid gap-3 py-6 md:grid-cols-12 md:gap-8">
            <div className="space-y-1 text-[0.9375rem] md:col-span-3">
              <p className="flex items-center gap-2 font-medium first-letter:uppercase">
                <CalendarDays aria-hidden="true" className="size-4 shrink-0" />
                <span>
                  <time dateTime={start}>{month(start)}</time>
                  {" – "}
                  {end ? <time dateTime={end}>{month(end)}</time> : t("present")}
                </span>
              </p>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin aria-hidden="true" className="size-4 shrink-0" />
                {t(`items.${id}.place`)}
              </p>
            </div>

            <div className="md:col-span-9">
              <h3 className="text-heading font-serif">{company}</h3>
              <p className="text-[0.9375rem] font-medium">{t(`items.${id}.role`)}</p>
              <ul className="mt-2 max-w-[70ch] list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed">
                <li>{t(`items.${id}.b1`)}</li>
                <li>{t(`items.${id}.b2`)}</li>
                <li>{t(`items.${id}.b3`)}</li>
              </ul>
              {caseStudyHref && (
                <p className="mt-4 text-sm">
                  <Link
                    href={caseStudyHref}
                    className="text-primary hover:text-foreground inline-flex items-center gap-1.5 font-medium underline decoration-2 underline-offset-4 transition-colors"
                  >
                    {t("caseStudy")}
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
