import { screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { Skills } from "./skills";

describe("Skills", () => {
  it("agrupa las habilidades bajo cinco encabezados", () => {
    renderApp(<Skills />);

    const groups = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(groups).toEqual([
      "Frontend",
      "Estado y datos",
      "Estilos y diseño",
      "Herramientas",
      "Idiomas",
    ]);
  });

  it("incluye tecnologias y textos traducibles", () => {
    renderApp(<Skills />);

    const region = within(screen.getByRole("region", { name: "Habilidades" }));
    expect(region.getByText("React")).toBeInTheDocument();
    expect(region.getByText("Accesibilidad web")).toBeInTheDocument();
    expect(region.getByText("Español (nativo)")).toBeInTheDocument();
  });

  it("no usa barras de porcentaje", () => {
    renderApp(<Skills />);

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.queryByRole("meter")).not.toBeInTheDocument();
  });

  it("traduce los grupos y los idiomas al ingles", () => {
    renderApp(<Skills />, { locale: "en" });

    expect(screen.getByRole("heading", { level: 3, name: "State and data" })).toBeInTheDocument();
    expect(screen.getByText("Spanish (native)")).toBeInTheDocument();
  });
});
