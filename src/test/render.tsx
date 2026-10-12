import { render } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";
import en from "../../messages/en.json";
import es from "../../messages/es.json";

const allMessages = { es, en };

type Options = { locale?: keyof typeof allMessages };

/** Renderiza un componente con los mismos proveedores de idioma y tema que usa la app. */
export function renderApp(ui: React.ReactElement, { locale = "es" }: Options = {}) {
  return render(ui, {
    wrapper: ({ children }) => (
      <NextIntlClientProvider locale={locale} messages={allMessages[locale]}>
        <ThemeProvider>{children}</ThemeProvider>
      </NextIntlClientProvider>
    ),
  });
}
