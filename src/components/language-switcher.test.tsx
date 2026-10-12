import { screen } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { LanguageSwitcher } from "./language-switcher";

jest.mock("next/navigation", () => ({
  usePathname: () => "/es/sistema",
  useParams: () => ({ locale: "es" }),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
}));

describe("LanguageSwitcher", () => {
  it("ofrece un enlace por idioma que conserva la pagina actual", () => {
    renderApp(<LanguageSwitcher />);

    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("href", "/es/sistema");
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en/sistema");
  });

  it("marca el idioma activo con aria-current", () => {
    renderApp(<LanguageSwitcher />);

    expect(screen.getByRole("link", { name: "Español" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: "English" })).not.toHaveAttribute("aria-current");
  });

  it("declara el idioma de cada destino para los lectores de pantalla", () => {
    renderApp(<LanguageSwitcher />);

    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("lang", "en");
  });

  it("etiqueta la navegacion en el idioma de la pagina", () => {
    renderApp(<LanguageSwitcher />, { locale: "en" });

    expect(screen.getByRole("navigation", { name: "Language" })).toBeInTheDocument();
  });
});
