import { screen } from "@testing-library/react";
import { renderApp } from "@/test/render";
import { Footer } from "./footer";

jest.mock("next/navigation", () => ({
  usePathname: () => "/es",
  useParams: () => ({ locale: "es" }),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
}));

describe("Footer", () => {
  it("es el contenido de informacion del sitio y enlaza al sistema visual", () => {
    renderApp(<Footer />);

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sistema visual" })).toHaveAttribute(
      "href",
      "/es/sistema",
    );
  });

  it("no enlaza al codigo fuente de este portfolio", () => {
    renderApp(<Footer />, { locale: "en" });

    expect(
      screen.queryByRole("link", { name: /source code|código fuente/i }),
    ).not.toBeInTheDocument();
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });
});
