import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { siteConfig } from "@/content/site";
import { renderApp } from "@/test/render";
import { Contact } from "./contact";
import { EmailContact } from "./email-contact";

// La direccion se decodifica igual que lo hace el componente en el navegador.
const address = atob(siteConfig.email.encoded);

describe("Contact", () => {
  it("muestra el email como enlace mailto y no tiene formulario", async () => {
    renderApp(<Contact />);

    expect(await screen.findByRole("link", { name: address })).toHaveAttribute(
      "href",
      `mailto:${address}`,
    );
    expect(document.querySelector("form")).toBeNull();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("el texto del email no se puede seleccionar", async () => {
    renderApp(<Contact />);

    expect(await screen.findByRole("link", { name: address })).toHaveClass("select-none");
  });

  it("ofrece GitHub y LinkedIn en pestaña nueva, con iconos decorativos", () => {
    renderApp(<Contact />);

    for (const name of [/^GitHub/, /^LinkedIn/]) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("target", "_blank");
      expect(link.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("se muestra en ingles", async () => {
    renderApp(<Contact />, { locale: "en" });

    expect(screen.getByRole("heading", { level: 2, name: "Contact" })).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "Copy email" })).toBeInTheDocument();
  });
});

describe("EmailContact", () => {
  const encoded = btoa("hola@ejemplo.com");

  it("copia el email al portapapeles y lo anuncia en una region de estado", async () => {
    const user = userEvent.setup();
    renderApp(<EmailContact encoded={encoded} />);

    await user.click(await screen.findByRole("button", { name: "Copiar email" }));

    expect(await navigator.clipboard.readText()).toBe("hola@ejemplo.com");
    expect(screen.getByRole("status")).toHaveTextContent("Email copiado");
  });

  it("explica que hacer cuando no se puede copiar", async () => {
    const user = userEvent.setup();
    renderApp(<EmailContact encoded={encoded} />);
    jest.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(new Error("denegado"));

    await user.click(await screen.findByRole("button", { name: "Copiar email" }));

    expect(screen.getByRole("status")).toHaveTextContent(/No se pudo copiar/);
  });
});
