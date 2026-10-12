import { screen, within } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { Experience } from "./experience";

jest.mock("next/navigation", () => ({
  usePathname: () => "/es",
  useParams: () => ({ locale: "es" }),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
}));

describe("Experience", () => {
  it("lista las posiciones de la mas reciente a la mas antigua", () => {
    renderApp(<Experience />);

    const companies = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(companies).toEqual(["StockNow", "Making Sense", "Freelance"]);
  });

  it("formatea las fechas segun el idioma y las expone con <time>", () => {
    const { container, unmount } = renderApp(<Experience />);
    const first = within(container.querySelector("li")!);

    expect(first.getByText("noviembre de 2025")).toHaveAttribute("datetime", "2025-11");
    expect(first.getByText(/Presente/)).toBeInTheDocument();
    unmount();

    const english = renderApp(<Experience />, { locale: "en" });
    const firstEn = within(english.container.querySelector("li")!);
    expect(firstEn.getByText("November 2025")).toBeInTheDocument();
    expect(firstEn.getByText(/Present/)).toBeInTheDocument();
  });

  it("indica que Making Sense fue trabajo remoto desde Corrientes", () => {
    renderApp(<Experience />);

    expect(screen.getByText("Mar del Plata, Argentina (remoto)")).toBeInTheDocument();
  });

  it("enlaza el caso de estudio solo desde el trabajo en Making Sense", () => {
    renderApp(<Experience />);

    const links = screen.getAllByRole("link", { name: "Leer el caso de estudio" });
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", "/es/work/making-sense-design-system");
    expect(links[0]?.closest("li")).toHaveTextContent("Making Sense");
  });

  it("los iconos son decorativos", () => {
    const { container } = renderApp(<Experience />);

    const icons = container.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
    for (const icon of icons) expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("no incluye porcentajes de mejora sin respaldo", () => {
    const { container } = renderApp(<Experience />);

    expect(container.textContent).not.toMatch(/\d+\s?%/);
  });
});
