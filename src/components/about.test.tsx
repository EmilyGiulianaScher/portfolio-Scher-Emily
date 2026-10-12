import { screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { About } from "./about";

describe("About", () => {
  it("es una region nombrada por su titulo", () => {
    renderApp(<About />);

    const heading = screen.getByRole("heading", { level: 2, name: "Sobre mí" });
    expect(screen.getByRole("region", { name: "Sobre mí" })).toContainElement(heading);
  });

  it("resume los datos clave como lista de definiciones", () => {
    renderApp(<About />);

    const region = screen.getByRole("region", { name: "Sobre mí" });
    expect(within(region).getByText("Ubicación")).toBeInTheDocument();
    expect(
      within(region).getByText(/Licenciatura en Sistemas de la Información/),
    ).toBeInTheDocument();
    expect(within(region).getByText("Estudios")).toBeInTheDocument();
  });

  it("no incluye datos personales de relleno", () => {
    const { container } = renderApp(<About />);

    expect(container).not.toHaveTextContent(/cocin|entreno/i);
  });

  it("se muestra en ingles", () => {
    renderApp(<About />, { locale: "en" });

    expect(screen.getByRole("heading", { level: 2, name: "About me" })).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
  });
});
