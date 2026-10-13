import type { Metadata, Viewport } from "next";
import { Newsreader, Schibsted_Grotesk } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/components/theme-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PersonJsonLd } from "@/components/person-json-ld";
import { siteConfig } from "@/content/site";
import { resolveLocale } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site-url";
import "../globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

const OPEN_GRAPH_LOCALES = { es: "es_AR", en: "en_US" } as const;

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// El tema por defecto es el claro: el color de la barra del navegador en celular acompana a su fondo.
export const viewport: Viewport = {
  themeColor: "#fcf6f6",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const image = { url: "/og.png", width: 1200, height: 630, alt: siteConfig.name };

  return {
    metadataBase: new URL(siteUrl),
    title: t("title"),
    description: t("description"),
    authors: [{ name: siteConfig.name, url: siteConfig.links.github }],
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      locale: OPEN_GRAPH_LOCALES[locale],
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => OPEN_GRAPH_LOCALES[l]),
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [image.url],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const locale = await resolveLocale(params);
  setRequestLocale(locale);

  // Al cliente solo viaja lo que usan los componentes interactivos, no todos los textos.
  const { Header: headerMessages, CopyEmail: copyEmailMessages } = await getMessages();

  return (
    <html
      lang={locale}
      className={`${newsreader.variable} ${schibsted.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <NextIntlClientProvider messages={{ Header: headerMessages, CopyEmail: copyEmailMessages }}>
          <ThemeProvider>
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
        <PersonJsonLd />
      </body>
    </html>
  );
}
