import { useTranslations } from "next-intl";
import { projects } from "@/content/projects";
import { ProjectCard } from "./project-card";
import { Section } from "./section";

export function Projects() {
  const t = useTranslations("Projects");
  const featured = projects.filter((project) => project.featured);
  const others = projects.filter((project) => !project.featured);

  return (
    <Section id="proyectos" title={t("title")} tone="surface">
      <p className="text-muted-foreground mt-3 max-w-prose">{t("intro")}</p>

      <div className="mt-8 space-y-6 md:space-y-8">
        {featured.map((project) => (
          <ProjectCard key={project.id} project={project} featured />
        ))}

        <ul className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {others.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
