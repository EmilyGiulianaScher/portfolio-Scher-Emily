import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { resolveLocale } from "@/i18n/locale";
import { localizedAlternates } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { alternates: localizedAlternates(await resolveLocale(params)) };
}

export default async function HomePage({ params }: Props) {
  setRequestLocale(await resolveLocale(params));

  return (
    <main id="contenido" tabIndex={-1} className="outline-none">
      <Hero />
      <Experience />
      <Projects />
      <About />
      <Skills />
      <Contact />
    </main>
  );
}
