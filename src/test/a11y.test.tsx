import { configureAxe, toHaveNoViolations } from "jest-axe";
import { renderApp } from "@/test/render";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

expect.extend(toHaveNoViolations);

jest.mock("next/navigation", () => ({
  usePathname: () => "/es",
  useParams: () => ({ locale: "es" }),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
}));

// jsdom no calcula estilos, asi que axe no puede medir contraste: eso se verifica aparte con los
// tokens de color (src/lib/contrast.test.ts). El resto de las reglas WCAG si corre aca.
const axe = configureAxe({ rules: { "color-contrast": { enabled: false } } });

function HomePage() {
  return (
    <>
      <Header />
      <main id="contenido">
        <Hero />
        <Experience />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

describe("accesibilidad de la home (axe, WCAG 2.x A y AA)", () => {
  it.each(["es", "en"] as const)("no tiene violaciones en %s", async (locale) => {
    const { container } = renderApp(<HomePage />, { locale });

    expect(await axe(container)).toHaveNoViolations();
  });

  it("tiene un unico h1 y los encabezados no saltan de nivel", () => {
    const { container } = renderApp(<HomePage />);

    const levels = [...container.querySelectorAll("h1, h2, h3")].map((h) =>
      Number(h.tagName.slice(1)),
    );
    expect(levels.filter((level) => level === 1)).toHaveLength(1);
    levels.reduce((previous, level) => {
      expect(level - previous).toBeLessThanOrEqual(1);
      return level;
    }, 0);
  });

  it("todas las imagenes tienen texto alternativo", () => {
    const { container } = renderApp(<HomePage />);

    for (const image of container.querySelectorAll("img")) {
      expect(image).toHaveAttribute("alt");
      expect(image.getAttribute("alt")).not.toBe("");
    }
  });
});
