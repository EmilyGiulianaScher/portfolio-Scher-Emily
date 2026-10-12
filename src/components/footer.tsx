import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "./container";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="py-8 text-sm">
      <Container className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-muted-foreground">{t("credits")}</p>
        <Link href="/sistema" className="underline underline-offset-4">
          {t("system")}
        </Link>
      </Container>
    </footer>
  );
}
