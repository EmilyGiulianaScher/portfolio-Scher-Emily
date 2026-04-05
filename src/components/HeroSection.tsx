import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Download, File, ChevronDown } from "lucide-react";

const HeroSection = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [showCVMenu, setShowCVMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowCVMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    const els = ref.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToProjects = () => {
    document.querySelector("#proyectos")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      ref={ref}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "var(--hero-gradient)" }}
    >
      {/* Decorative shapes */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-secondary/40 blur-3xl" />
      <div className="absolute bottom-20 left-[5%] w-48 h-48 rounded-full bg-primary/10 blur-3xl" />

      <div className="container relative z-10 py-24 md:py-32">
        <div className="max-w-2xl">
          <p className="reveal text-sm font-medium tracking-widest uppercase text-primary mb-4">
            {t("hero.portfolio")}
          </p>
          <h1 className="reveal text-5xl md:text-7xl font-serif leading-[1.1] text-foreground mb-4">
            {t("hero.name")}
          </h1>
          <p className="reveal text-lg md:text-xl text-primary font-medium mb-6">
            {t("hero.role")}
          </p>
          <p className="reveal text-xl md:text-2xl font-serif text-foreground/90 mb-4 leading-snug">
            {t("hero.tagline")}
          </p>
          <p className="reveal text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
            {t("hero.description")}
          </p>
          <div className="reveal flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToProjects}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-medium text-sm hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
            >
              {t("hero.cta")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-px">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowCVMenu(!showCVMenu)}
                className="inline-flex items-center gap-2 border-2 border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/5 text-foreground px-6 py-3 rounded-full font-medium text-sm transition-colors shadow-sm hover:shadow-md"
              >
                <Download className="w-4 h-4" />
                {t("hero.downloadCv")}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showCVMenu ? 'rotate-180' : ''}`} />
              </button>

              {showCVMenu && (
                <div className="absolute top-full mt-3 right-0 sm:left-0 min-w-48 bg-card border border-border rounded-xl shadow-xl p-2 z-50 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
                  <a
                    href="/CVScherEmilyEs.pdf"
                    download="CVScherEmilyEs.pdf"
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-lg transition-colors cursor-pointer"
                    onClick={() => setShowCVMenu(false)}
                  >
                    <File className="w-4 h-4 text-primary" />
                    {t("hero.cvEs")}
                  </a>
                  <a
                    href="/CVScherEmilyEn.pdf"
                    download="CVScherEmilyEn.pdf"
                    className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-lg transition-colors cursor-pointer"
                    onClick={() => setShowCVMenu(false)}
                  >
                    <File className="w-4 h-4 text-primary" />
                    {t("hero.cvEn")}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
