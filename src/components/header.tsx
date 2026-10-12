import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "@/content/navigation";
import { siteConfig } from "@/content/site";
import { Container } from "./container";
import { HeaderShell } from "./header-shell";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const t = useTranslations("Header");

  return (
    <HeaderShell>
      <a
        href="#contenido"
        className="bg-primary text-primary-foreground sr-only rounded-sm px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
      >
        {t("skip")}
      </a>
      <Container className="flex flex-wrap items-center gap-x-8 gap-y-2 py-3 md:flex-nowrap">
        <Link href="/" className="font-serif text-xl" translate="no">
          {siteConfig.shortName}
        </Link>

        {/* En celular el menu baja a una segunda fila: evita un menu hamburguesa y su JavaScript. */}
        <nav
          aria-label={t("mainNav")}
          className="order-last basis-full md:order-none md:basis-auto"
        >
          <ul className="flex items-center gap-6 text-sm font-medium">
            {navItems.map(({ id, href }) => (
              <li key={id}>
                <Link
                  href={href}
                  className="inline-block py-1 hover:underline hover:underline-offset-4"
                >
                  {t(`nav.${id}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </Container>
    </HeaderShell>
  );
}
