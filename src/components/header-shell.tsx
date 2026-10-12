"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 16;

/**
 * Contenedor fijo del encabezado. Arriba de todo es transparente (se apoya en el hero); al bajar
 * toma un fondo de vidrio esmerilado para que el menu siga legible sobre cualquier seccion.
 * Los hijos (menu, selector de idioma) los renderiza el servidor: aca solo vive el estado de scroll.
 */
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className={cn(
        "fixed inset-x-0 top-0 z-30 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "bg-background/70 border-border/70 text-foreground shadow-[0_8px_30px_-12px_rgb(0_0_0/0.25)] backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent",
      )}
    >
      {children}
    </header>
  );
}
