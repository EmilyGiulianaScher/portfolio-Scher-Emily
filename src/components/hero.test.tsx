import { screen } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { Hero } from "./hero";

describe("Hero", () => {
  it("muestra el nombre completo como encabezado principal", () => {
    renderApp(<Hero />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Emily Giuliana Scher");
  });

  it.each([
    ["es", "Desarrolladora frontend"],
    ["en", "Frontend developer"],
  ] as const)("presenta el rol en el idioma %s", (locale, text) => {
    renderApp(<Hero />, { locale });

    expect(screen.getByText(new RegExp(text))).toBeInTheDocument();
  });

  it("incluye el retrato con texto alternativo en cada idioma", () => {
    const { unmount } = renderApp(<Hero />);
    expect(screen.getByAltText("Retrato de Emily Giuliana Scher sonriendo")).toBeInTheDocument();
    unmount();

    renderApp(<Hero />, { locale: "en" });
    expect(screen.getByAltText("Portrait of Emily Giuliana Scher smiling")).toBeInTheDocument();
  });

  describe("descarga del CV", () => {
    it("ofrece el CV en el idioma de la pagina y el del otro idioma", () => {
      renderApp(<Hero />, { locale: "es" });

      const main = screen.getByRole("link", { name: "Descargar CV" });
      expect(main).toHaveAttribute("href", "/CVScherEmilyEs.pdf");
      expect(main).toHaveAttribute("download");

      const other = screen.getByRole("link", { name: "CV en inglés" });
      expect(other).toHaveAttribute("href", "/CVScherEmilyEn.pdf");
      expect(other).toHaveAttribute("lang", "en");
    });

    it("invierte los idiomas cuando la pagina esta en ingles", () => {
      renderApp(<Hero />, { locale: "en" });

      expect(screen.getByRole("link", { name: "Download CV" })).toHaveAttribute(
        "href",
        "/CVScherEmilyEn.pdf",
      );
      expect(screen.getByRole("link", { name: "CV in Spanish" })).toHaveAttribute(
        "href",
        "/CVScherEmilyEs.pdf",
      );
    });
  });

  describe("enlaces externos", () => {
    it.each([
      ["GitHub", "https://github.com/EmilyGiulianaScher"],
      ["LinkedIn", "https://www.linkedin.com/in/emily-giuliana-scher/"],
    ])("%s abre en pestaña nueva de forma segura y lo anuncia", (name, href) => {
      renderApp(<Hero />);

      const link = screen.getByRole("link", { name: new RegExp(`^${name}`) });
      expect(link).toHaveAttribute("href", href);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
      expect(link).toHaveAccessibleName(`${name} (se abre en una pestaña nueva)`);
    });
  });
});
