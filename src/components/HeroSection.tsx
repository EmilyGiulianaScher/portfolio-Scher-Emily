import { useEffect, useRef } from "react";

const HeroSection = () => {
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
            Portfolio
          </p>
          <h1 className="reveal text-5xl md:text-7xl font-serif leading-[1.1] text-foreground mb-4">
            Emily Giuliana Scher
          </h1>
          <p className="reveal text-lg md:text-xl text-primary font-medium mb-6">
            UX Developer | Frontend Web
          </p>
          <p className="reveal text-xl md:text-2xl font-serif text-foreground/90 mb-4 leading-snug">
            Entiendo el contexto, maqueto la idea y desarrollo la solución.
          </p>
          <p className="reveal text-base text-muted-foreground leading-relaxed mb-8 max-w-lg">
            Creo interfaces limpias y atractivas que resuelven problemas de la forma más sencilla
            posible. Mi objetivo es que tanto el código por detrás como la experiencia del usuario
            por delante sean impecables.
          </p>
          <button
            onClick={scrollToProjects}
            className="reveal inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-full font-medium text-sm hover:opacity-90 transition-opacity duration-200"
          >
            Ver mis proyectos
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-px">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
