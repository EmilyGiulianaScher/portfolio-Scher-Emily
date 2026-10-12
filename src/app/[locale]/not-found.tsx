import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main
      id="contenido"
      tabIndex={-1}
      className="flex min-h-svh flex-col items-start justify-center gap-6 px-6 outline-none md:px-12"
    >
      <h1 className="text-title">{t("title")}</h1>
      <p className="text-muted-foreground max-w-prose">{t("description")}</p>
      <Link
        href="/"
        className="bg-primary text-primary-foreground rounded-sm px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90"
      >
        {t("back")}
      </Link>
    </main>
  );
}
