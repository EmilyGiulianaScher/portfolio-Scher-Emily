import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "@/test/render";
import { Header } from "./header";

jest.mock("next/navigation", () => ({
  usePathname: () => "/es",
  useParams: () => ({ locale: "es" }),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
}));

describe("Header", () => {
  it("el primer elemento enfocable es el enlace para saltar al contenido", async () => {
    const user = userEvent.setup();
    renderApp(<Header />);

    await user.tab();

    const skip = screen.getByRole("link", { name: "Saltar al contenido" });
    expect(skip).toHaveFocus();
    expect(skip).toHaveAttribute("href", "#contenido");
  });

  it("distingue sus dos regiones de navegacion por nombre", () => {
    renderApp(<Header />);

    expect(screen.getByRole("navigation", { name: "Principal" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Idioma" })).toBeInTheDocument();
  });

  it("enlaza cada seccion con la home del idioma actual", () => {
    renderApp(<Header />);

    const nav = within(screen.getByRole("navigation", { name: "Principal" }));
    expect(nav.getByRole("link", { name: "Proyectos" })).toHaveAttribute("href", "/es#proyectos");
    expect(nav.getByRole("link", { name: "Experiencia" })).toHaveAttribute(
      "href",
      "/es#experiencia",
    );
    expect(nav.getByRole("link", { name: "Sobre mí" })).toHaveAttribute("href", "/es#sobre-mi");
    expect(nav.getByRole("link", { name: "Habilidades" })).toHaveAttribute(
      "href",
      "/es#habilidades",
    );
    expect(nav.getByRole("link", { name: "Contacto" })).toHaveAttribute("href", "/es#contacto");
  });

  it("sigue el orden de las secciones: experiencia antes que proyectos", () => {
    renderApp(<Header />);

    const nav = within(screen.getByRole("navigation", { name: "Principal" }));
    expect(nav.getAllByRole("link").map((link) => link.textContent)).toEqual([
      "Experiencia",
      "Proyectos",
      "Sobre mí",
      "Habilidades",
      "Contacto",
    ]);
  });

  it("traduce los textos al ingles", () => {
    renderApp(<Header />, { locale: "en" });

    expect(screen.getByRole("link", { name: "Skip to content" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
  });
});
