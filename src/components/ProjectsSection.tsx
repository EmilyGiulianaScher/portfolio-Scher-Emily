import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProjectsSection = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: "stocknow",
      url: "https://stocknow-app.netlify.app/",
      image: "/stockNowHeader.png",
    },
    {
      id: "frizaditas",
      url: "https://frizaditasctes.netlify.app/",
      image: "/frizaditasHeader.png",
    },
    {
      id: "syslab",
      url: "https://syslabdemo.netlify.app/",
      image: "/syslabDemoHeader.png",
    },
    {
      id: "bona",
      url: "https://bonabudin.netlify.app/",
      image: "/bonaBudinHeader.png",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    const els = ref.current?.querySelectorAll(".reveal");
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="proyectos" ref={ref} className="py-24 md:py-32">
      <div className="container">
        <p className="reveal text-sm font-medium tracking-widest uppercase text-primary mb-3">
          {t("projects.subtitle")}
        </p>
        <h2 className="reveal text-3xl md:text-4xl font-serif text-foreground mb-12 leading-snug">
          {t("projects.title")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article
              key={project.id}
              className="reveal group rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              {/* Project Image */}
              <div className="aspect-video bg-muted overflow-hidden relative">
                <img
                  src={project.image}
                  alt={t(`projects.items.${project.id}.title`)}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-serif text-foreground">{t(`projects.items.${project.id}.title`)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(`projects.items.${project.id}.description`)}
                </p>
                <p className="text-sm text-muted-foreground/80 leading-relaxed italic">
                  <span className="font-medium not-italic text-foreground/70">
                    {t("projects.uxLabel")}
                  </span>
                  {t(`projects.items.${project.id}.ux`)}
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {t("projects.visitLink")}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
