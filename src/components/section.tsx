import { cn } from "@/lib/utils";
import { Container } from "./container";

const TONES = {
  default: "",
  surface: "bg-surface",
  hero: "bg-hero text-hero-foreground",
} as const;

type SectionProps = {
  id: string;
  title: string;
  tone?: keyof typeof TONES;
  children: React.ReactNode;
};

/** Seccion de la home: region nombrada por su titulo, con el ritmo vertical compartido. */
export function Section({ id, title, tone = "default", children }: SectionProps) {
  const headingId = `${id}-titulo`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-24 py-10 md:py-16", TONES[tone])}
    >
      <Container>
        <h2 id={headingId} className="text-title">
          {title}
        </h2>
        {children}
      </Container>
    </section>
  );
}
