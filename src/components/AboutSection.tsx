import { useEffect, useRef } from "react";
import { User } from "lucide-react";

const AboutSection = () => {
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
              Sobre Mí
            </p>
            <h2 className="reveal text-3xl md:text-4xl font-serif text-foreground mb-10 leading-snug">
              Un poco sobre mí y cómo trabajo
            </h2>

            <div className="space-y-6">
              <p className="reveal text-base text-muted-foreground leading-relaxed">
                Soy UX Developer radicada en Corrientes. Actualmente combino mi experiencia en el
                mundo corporativo con proyectos freelance e iniciativas propias, buscando siempre el
                equilibrio perfecto entre las necesidades del negocio y una experiencia de usuario
                fluida. Mi enfoque técnico está fuertemente anclado en React y Sass. Me gusta la
                arquitectura limpia: diseño componentes reutilizables, utilizo variables para
                optimizar estilos y mantengo una estructura de carpetas lógica que permite escalar
                cualquier proyecto sin dolores de cabeza.
              </p>
              <p className="reveal text-base text-muted-foreground leading-relaxed">
                Cuando cierro el editor de código, mi cabeza sigue activa. Estudio Licenciatura en
                Sistemas de la Información y, para desconectar la pantalla, divido mi tiempo entre
                entrenar, cuidar mi colección de plantas, gestionar estrategias para redes sociales
                o relajarme cocinando algo rico en casa.
              </p>
            </div>

            {/* Decorative divider */}
            <div className="reveal mt-12 flex items-center gap-3">
              <span className="block h-[2px] w-12 bg-primary/40 rounded-full" />
              <span className="block h-[2px] w-6 bg-secondary rounded-full" />
            </div>
          </div>

          {/* Photo placeholder */}
          <div className="reveal w-full md:w-72 lg:w-80 shrink-0 flex justify-center md:mt-12">
            <div className="w-64 h-80 rounded-2xl bg-muted border border-border flex flex-col items-center justify-center gap-3">
              <User className="w-10 h-10 text-muted-foreground/50" />
              <span className="text-sm text-muted-foreground/60 select-none">Tu foto aquí</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
