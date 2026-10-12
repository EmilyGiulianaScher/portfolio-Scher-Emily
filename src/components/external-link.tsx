import { useTranslations } from "next-intl";

/** Enlace a otro sitio: abre en pestaña nueva y avisa a los lectores de pantalla. */
export function ExternalLink({ children, ...props }: Omit<React.ComponentProps<"a">, "target">) {
  const t = useTranslations("Common");

  return (
    <a target="_blank" rel="noopener noreferrer" {...props}>
      {children}
      <span className="sr-only"> ({t("opensInNewTab")})</span>
    </a>
  );
}
