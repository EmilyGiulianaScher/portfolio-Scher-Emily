import { cva, type VariantProps } from "class-variance-authority";

/**
 * Estilos de boton para enlaces y botones. El borde del variante "outline" usa currentColor,
 * asi hereda el color de texto del contexto (hero rosa, fondo claro u oscuro) con contraste.
 * Los iconos hijos (svg) quedan alineados con el texto y a un tamaño comun.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium transition-colors [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:opacity-90",
        outline: "border border-current hover:bg-foreground/10",
      },
    },
    defaultVariants: { variant: "primary" },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
