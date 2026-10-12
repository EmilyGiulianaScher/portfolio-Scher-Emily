"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";
import { useTheme } from "./theme-provider";

const subscribe = () => () => {};

export function ThemeToggle() {
  const t = useTranslations("Header");
  const { resolvedTheme, setTheme } = useTheme();
  // El servidor no conoce el tema del usuario: hasta hidratar usamos una etiqueta neutra para
  // no generar un desajuste. Los iconos no dependen de JS: los muestra CSS segun data-theme.
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  const isDark = mounted && resolvedTheme === "dark";
  const label = !mounted ? t("themeGeneric") : isDark ? t("themeToLight") : t("themeToDark");

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="text-foreground hover:bg-surface inline-flex size-9 items-center justify-center rounded-sm"
    >
      <Sun aria-hidden="true" className="hidden size-5 dark:block" />
      <Moon aria-hidden="true" className="block size-5 dark:hidden" />
    </button>
  );
}
