import { useEffect, useRef } from "react";
import { Mail } from "lucide-react";

const ContactSection = () => {
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
    <section id="contacto" ref={ref} className="py-24 md:py-32 bg-card">
      <div className="container">
        <div className="max-w-xl mx-auto text-center">
          <p className="reveal text-sm font-medium tracking-widest uppercase text-primary mb-3">
            Contacto
          </p>
          <h2 className="reveal text-3xl md:text-4xl font-serif text-foreground mb-6 leading-snug">
            ¿Trabajamos juntos?
          </h2>
          <p className="reveal text-base text-muted-foreground leading-relaxed mb-10">
            Ya sea para un proyecto freelance, una oportunidad en tu equipo o simplemente para
            charlar sobre código y diseño, me encantaría leerte.
          </p>
          <a
            href="mailto:emilygiulianascher@gmail.com"
            className="reveal inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Mail className="w-4 h-4" />
            Escribime un email
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
