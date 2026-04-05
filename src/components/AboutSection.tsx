import { useEffect, useRef } from "react";
import { User } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.15 }
    );
    const els = ref.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="sobre-mi" ref={ref} className="py-24 md:py-32 bg-card">
      <div className="container">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          {/* Text */}
          <div className="flex-1 max-w-2xl">
            <p className="reveal text-sm font-medium tracking-widest uppercase text-primary mb-3">
              {t("about.subtitle")}
            </p>
            <h2 className="reveal text-3xl md:text-4xl font-serif text-foreground mb-10 leading-snug">
              {t("about.title")}
            </h2>

            <div className="space-y-6">
              <p className="reveal text-base text-muted-foreground leading-relaxed">
                {t("about.p1")}
              </p>
              <p className="reveal text-base text-muted-foreground leading-relaxed">
                {t("about.p2")}
              </p>
            </div>

            <div className="reveal mt-12 flex items-center gap-3">
              <span className="block h-[2px] w-12 bg-primary/40 rounded-full" />
              <span className="block h-[2px] w-6 bg-secondary rounded-full" />
            </div>
          </div>

          <div className="reveal w-full md:w-72 lg:w-80 shrink-0 flex justify-center md:mt-12">
            <img
              src="/fotoPortfolio.png"
              alt="Emily Giuliana Scher"
              loading="lazy"
              className="w-64 h-80 rounded-2xl object-cover object-center border border-border bg-muted shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
