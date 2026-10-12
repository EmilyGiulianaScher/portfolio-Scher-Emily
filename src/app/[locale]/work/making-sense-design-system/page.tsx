import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/container";
import { resolveLocale } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";
import { localizedAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

const DID_KEYS = ["d1", "d2", "d3", "d4", "d5"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "CaseStudy" });
  return {
    title: t("metaTitle"),
    description: t("lead"),
    alternates: localizedAlternates(locale, "/work/making-sense-design-system"),
  };
}

export default async function CaseStudyPage({ params }: Props) {
  setRequestLocale(await resolveLocale(params));
  const t = await getTranslations("CaseStudy");

  return (
    <main id="contenido" tabIndex={-1} className="pt-28 pb-20 outline-none">
      <Container className="max-w-3xl">
        <Link href="/#experiencia" className="text-sm font-medium underline underline-offset-4">
          {t("back")}
        </Link>

        <h1 className="text-title mt-8">{t("title")}</h1>
        <p className="text-lead mt-4 font-serif">{t("lead")}</p>

        <section aria-labelledby="contexto" className="mt-12">
          <h2 id="contexto" className="text-heading">
            {t("contextTitle")}
          </h2>
          <p className="mt-3">{t("context")}</p>
        </section>

        <section aria-labelledby="rol" className="mt-10">
          <h2 id="rol" className="text-heading">
            {t("roleTitle")}
          </h2>
          <p className="mt-3">{t("role")}</p>
        </section>

        <section aria-labelledby="hice" className="mt-10">
          <h2 id="hice" className="text-heading">
            {t("didTitle")}
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {DID_KEYS.map((key) => (
              <li key={key}>{t(key)}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="nota" className="bg-surface mt-12 rounded-sm p-6">
          <h2 id="nota" className="text-heading">
            {t("noteTitle")}
          </h2>
          <p className="mt-3">{t("note")}</p>
        </section>
      </Container>
    </main>
  );
}
