/** @jest-environment node */
import { NextIntlClientProvider } from "next-intl";
import { renderToString } from "react-dom/server";
import { siteConfig } from "@/content/site";
import en from "../../messages/en.json";
import es from "../../messages/es.json";
import { Contact } from "./contact";

const EMAIL_PATTERN = /[\w.+-]+@[\w-]+\.[\w.-]+/;

describe("Contact: HTML que baja del servidor", () => {
  it.each([
    ["es", es],
    ["en", en],
  ] as const)("no contiene el email, ni como texto ni como mailto (%s)", (locale, messages) => {
    const html = renderToString(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Contact />
      </NextIntlClientProvider>,
    );
    const address = Buffer.from(siteConfig.email.encoded, "base64").toString("utf8");

    expect(html).not.toMatch(EMAIL_PATTERN);
    expect(html).not.toContain("mailto:");
    expect(html).not.toContain(address);
  });

  it("avisa a quien no tiene JavaScript como contactarla", () => {
    const html = renderToString(
      <NextIntlClientProvider locale="es" messages={es}>
        <Contact />
      </NextIntlClientProvider>,
    );

    expect(html).toContain("Activá JavaScript para ver el email");
  });

  it("sin JavaScript no queda un boton de copiar que no hace nada", () => {
    const html = renderToString(
      <NextIntlClientProvider locale="es" messages={es}>
        <Contact />
      </NextIntlClientProvider>,
    );

    expect(html).not.toContain("Copiar email");
  });
});

describe("Contact: datos que Next envia al navegador", () => {
  // Next serializa en el HTML las props de los componentes de cliente. Lo que se le pasa a
  // EmailContact es siteConfig.email: no debe contener ninguna parte legible de la direccion.
  it("el email de la configuracion no contiene la direccion ni sus partes en claro", () => {
    const serialized = JSON.stringify(siteConfig.email);
    const address = Buffer.from(siteConfig.email.encoded, "base64").toString("utf8");
    const [user, domain] = address.split("@");

    expect(serialized).not.toContain("@");
    expect(serialized).not.toContain(user!);
    expect(serialized).not.toContain(domain!);
  });
});
