import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t("header.nav.home"), href: "#inicio" },
    { label: t("header.nav.about"), href: "#sobre-mi" },
    { label: t("header.nav.projects"), href: "#proyectos" },
    { label: t("header.nav.contact"), href: "#contacto" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith("es") ? "en" : "es";
    i18n.changeLanguage(newLang);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleClick("#inicio");
          }}
          className="font-serif text-xl tracking-tight text-foreground"
        >
          Emily<span className="text-primary">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item.label}
            </button>
          ))}
          
          <button
            onClick={toggleLanguage}
            className="text-xs font-bold tracking-wider text-muted-foreground hover:text-foreground transition-colors ml-4 px-2 py-1 rounded-sm border border-transparent hover:border-border"
          >
            {i18n.language.startsWith("es") ? "EN / es" : "ES / en"}
          </button>
        </nav>

        {/* Mobile toggle and language switcher */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="text-xs font-bold tracking-wider text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            {i18n.language.startsWith("es") ? "EN / es" : "ES / en"}
          </button>

          <button
            className="flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span
              className={`block w-5 h-[2px] bg-foreground transition-transform duration-200 ${
                mobileOpen ? "rotate-45 translate-y-[5px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-foreground transition-opacity duration-200 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-[2px] bg-foreground transition-transform duration-200 ${
                mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-background/95 backdrop-blur-md border-t border-border animate-fade-in">
          <div className="container flex flex-col py-4 gap-3">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="text-left py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
