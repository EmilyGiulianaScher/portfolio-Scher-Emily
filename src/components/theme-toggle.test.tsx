import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderApp } from "@/test/render";
import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("cambia entre modo claro y oscuro y actualiza su etiqueta", async () => {
    const user = userEvent.setup();
    renderApp(<ThemeToggle />);

    await user.click(await screen.findByRole("button", { name: "Cambiar a modo oscuro" }));

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(screen.getByRole("button", { name: "Cambiar a modo claro" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cambiar a modo claro" }));

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
  });

  it("se puede operar con el teclado", async () => {
    const user = userEvent.setup();
    renderApp(<ThemeToggle />);

    await user.tab();
    await user.keyboard("{Enter}");

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
  });

  it("traduce la etiqueta al ingles", async () => {
    renderApp(<ThemeToggle />, { locale: "en" });

    expect(await screen.findByRole("button", { name: "Switch to dark mode" })).toBeInTheDocument();
  });
});
