import { useEffect, useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "SySLab / StockNow",
    description:
      "Un sistema integral de gestión de inventario web pensado para optimizar el control de stock de manera sencilla y visual.",
    ux: "Diseño modular y dashboard intuitivo para que la carga y consulta de datos sea rápida, reduciendo la fricción administrativa.",
    url: "https://stocknow-app.netlify.app/",
  },
  {
    title: "Frizaditas",
    description:
      "Catálogo digital y plataforma de pedidos para un emprendimiento gastronómico local.",
    ux: "Navegación centrada en la conversión, con imágenes destacadas y un flujo de compra directo y sin distracciones.",
    url: "https://frizaditasctes.netlify.app/",
  },
  {
    title: "Carpintería San José",
    description:
      "Catálogo web institucional para mostrar trabajos a medida y productos de madera.",
    ux: "Diseño sobrio, con tonos cálidos que transmiten la naturaleza del rubro, destacando las fotografías de los productos como elemento central.",
    url: "https://carpinteriasanjose.netlify.app/",
  },
  {
    title: "Invitación Digital Lu & Angi",
    description: "Web interactiva para gestión de invitados de casamiento.",
    ux: "Una experiencia móvil fluida con confirmación de asistencia (RSVP) integrada, asegurando que los invitados accedan a la información del evento fácilmente.",
    url: "https://nos-casamos-lu-angi.netlify.app/",
  },
];

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

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
          Proyectos
        </p>
        <h2 className="reveal text-3xl md:text-4xl font-serif text-foreground mb-12 leading-snug">
          Trabajos seleccionados
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article
              key={project.title}
              className="reveal group rounded-2xl border border-border bg-card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-muted flex items-center justify-center">
                <span className="text-sm text-muted-foreground select-none">
                  Imagen del proyecto
                </span>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="text-xl font-serif text-foreground">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
                <p className="text-sm text-muted-foreground/80 leading-relaxed italic">
                  <span className="font-medium not-italic text-foreground/70">
                    Enfoque UX:{" "}
                  </span>
                  {project.ux}
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Visitar sitio web
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
