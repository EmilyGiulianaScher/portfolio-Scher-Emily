import { screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { Projects } from "./projects";

describe("Projects", () => {
  it("es una region nombrada y lista solo los trabajos propios con sitio", () => {
    renderApp(<Projects />);

    expect(screen.getByRole("region", { name: "Proyectos" })).toBeInTheDocument();
    const names = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(names).toEqual(["StockNow", "Bona Budín", "Carpintería San José"]);
  });

  it("no mezcla el trabajo en empresas ni este mismo portfolio con los proyectos", () => {
    const { container } = renderApp(<Projects />);

    expect(container).not.toHaveTextContent(/Making Sense/);
    expect(container).not.toHaveTextContent(/Este portfolio/);
    expect(screen.queryByRole("link", { name: /caso de estudio/i })).not.toBeInTheDocument();
  });

  it("cada proyecto declara problema, rol y stack", () => {
    renderApp(<Projects />);

    for (const label of ["Problema", "Mi rol", "Stack"]) {
      expect(screen.getAllByText(label)).toHaveLength(3);
    }
  });

  it("las capturas son visibles para lectores de pantalla y tienen una descripcion real", () => {
    renderApp(<Projects />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);
    for (const image of images) {
      // Una descripcion real, no un nombre de archivo ni una sola palabra.
      expect(image.getAttribute("alt")?.length).toBeGreaterThan(30);
    }
  });

  it("los sitios publicados abren en pestaña nueva y el enlace dice lo que se va a ver", () => {
    renderApp(<Projects />);

    const stocknow = screen.getByRole("link", { name: /^Ver la página pública/ });
    expect(stocknow).toHaveAttribute("href", "https://stocknow-app.netlify.app/");
    expect(stocknow).toHaveAttribute("target", "_blank");

    const sites = screen.getAllByRole("link", { name: /^Ver sitio/ });
    expect(sites.map((link) => link.getAttribute("href"))).toEqual([
      "https://bonabudin.netlify.app/",
      "https://carpinteriasanjose.netlify.app/",
    ]);
    for (const link of sites) expect(link).toHaveAttribute("target", "_blank");
  });

  it("enlaza solo el repositorio publico de la carpinteria", () => {
    renderApp(<Projects />);

    const repos = screen.getAllByRole("link", { name: /^Código fuente/ });
    expect(repos.map((link) => link.getAttribute("href"))).toEqual([
      "https://github.com/EmilyGiulianaScher/carpinteria-san-jose",
    ]);
    expect(repos[0]).toHaveAttribute("target", "_blank");
  });

  it("los iconos de los enlaces son decorativos", () => {
    const { container } = renderApp(<Projects />);

    const icons = container.querySelectorAll("a svg");
    expect(icons.length).toBeGreaterThan(0);
    for (const icon of icons) expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("no promete numeros de impacto que no se pueden respaldar", () => {
    const { container } = renderApp(<Projects />);

    expect(within(container).queryByText(/\d+\s?%/)).not.toBeInTheDocument();
  });

  it("se muestra en ingles", () => {
    renderApp(<Projects />, { locale: "en" });

    expect(screen.getByRole("heading", { level: 2, name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^View the public page/ })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /^Visit site/ })).toHaveLength(2);
  });
});
