import { readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { resolveLocale } from "@/i18n/locale";
import { contrastRatio, parseTokens } from "@/lib/contrast";

type Props = { params: Promise<{ locale: string }> };

const css = readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");
const themes = [
  { id: "themeLight", tokens: parseTokens(css, ":root") },
  { id: "themeDark", tokens: parseTokens(css, '[data-theme="dark"]') },
] as const;

const rows = [
  { id: "text", fg: "foreground", bg: "background" },
  { id: "textMuted", fg: "muted-foreground", bg: "background" },
  { id: "accent", fg: "primary", bg: "background" },
  { id: "onAccent", fg: "primary-foreground", bg: "primary" },
  { id: "hero", fg: "hero-foreground", bg: "hero" },
  { id: "focus", fg: "ring", bg: "background" },
  { id: "border", fg: "border-strong", bg: "background" },
] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "Sistema" });
  return { title: t("metaTitle"), robots: { index: false } };
}

export default async function SistemaPage({ params }: Props) {
  setRequestLocale(await resolveLocale(params));
  const t = await getTranslations("Sistema");

  return (
    <main
      id="contenido"
      tabIndex={-1}
      className="mx-auto max-w-5xl px-6 pt-28 pb-16 outline-none md:px-12"
    >
      <h1 className="text-title">{t("title")}</h1>
      <p className="text-muted-foreground mt-4 max-w-prose">{t("intro")}</p>

      <section aria-labelledby="color" className="mt-16">
        <h2 id="color" className="text-heading">
          {t("colorTitle")}
        </h2>
        <div className="mt-6 grid gap-10 md:grid-cols-2">
          {themes.map(({ id, tokens }) => (
            <div key={id}>
              <h3 className="font-sans text-base font-semibold">{t(id)}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {Object.entries(tokens)
                  .filter(([name]) => !["border", "ring", "border-strong"].includes(name))
                  .map(([name, value]) => (
                    <li key={name} className="text-xs">
                      <span
                        className="border-border-strong block h-10 w-16 border"
                        style={{ background: value }}
                        role="img"
                        aria-label={`${name} ${value}`}
                      />
                      <span className="mt-1 block">{name}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </li>
                  ))}
              </ul>
              <table className="mt-5 w-full text-left text-sm">
                <caption className="sr-only">{t("tableCaption", { theme: t(id) })}</caption>
                <thead>
                  <tr className="border-border border-b">
                    <th scope="col" className="py-2 pr-2 font-semibold">
                      {t("colPair")}
                    </th>
                    <th scope="col" className="py-2 text-right font-semibold">
                      {t("colRatio")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(({ id: rowId, fg, bg }) => {
                    const ratio = contrastRatio(tokens[fg]!, tokens[bg]!);
                    return (
                      <tr key={rowId} className="border-border border-b">
                        <th scope="row" className="py-2 pr-2 font-normal">
                          {t(`rows.${rowId}`)}
                        </th>
                        <td className="py-2 text-right tabular-nums">{ratio.toFixed(2)}:1</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="tipografia" className="mt-16">
        <h2 id="tipografia" className="text-heading">
          {t("typographyTitle")}
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">{t("typographyIntro")}</p>
        <div className="mt-6 space-y-6">
          <p className="text-title font-serif">{t("sampleTitle")}</p>
          <p className="text-heading font-serif">{t("sampleHeading")}</p>
          <p className="text-lead max-w-prose">{t("sampleLead")}</p>
          <p className="max-w-prose">{t("sampleBody")}</p>
        </div>
      </section>

      <section aria-labelledby="componentes" className="mt-16">
        <h2 id="componentes" className="text-heading">
          {t("componentsTitle")}
        </h2>
        <div className="mt-6 flex flex-wrap items-center gap-6">
          <a
            href="#componentes"
            className="bg-primary text-primary-foreground rounded-sm px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90"
          >
            {t("buttonPrimary")}
          </a>
          <a
            href="#componentes"
            className="border-border-strong hover:bg-surface rounded-sm border px-5 py-3 text-sm font-medium transition-colors"
          >
            {t("buttonSecondary")}
          </a>
          <a href="#componentes" className="text-primary underline decoration-2 underline-offset-4">
            {t("link")}
          </a>
        </div>
        <p className="text-muted-foreground mt-4 text-sm">{t("focusHint")}</p>
      </section>
    </main>
  );
}
