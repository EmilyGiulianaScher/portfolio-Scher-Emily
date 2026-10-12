import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { ExternalLink } from "./external-link";
import { TechIcon } from "./tech-icon";

type ProjectCardProps = { project: Project; featured?: boolean };

const LINK_CLASS =
  "inline-flex items-center gap-1.5 font-medium underline underline-offset-4 decoration-2 text-primary transition-colors hover:text-foreground [&_svg]:size-4 [&_svg]:shrink-0";

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const t = useTranslations("Projects");

  return (
    <article
      className={cn(
        "bg-background border-border overflow-hidden rounded-md border",
        featured ? "grid lg:grid-cols-12 lg:items-center" : "flex h-full flex-col",
      )}
    >
      <div
        className={cn(
          "bg-surface border-border",
          featured ? "lg:col-span-7 lg:border-r" : "border-b",
        )}
      >
        <Image
          src={project.image}
          alt={t(`items.${project.id}.imageAlt`)}
          placeholder="blur"
          sizes={
            featured
              ? "(min-width: 1024px) 58vw, 100vw"
              : "(min-width: 1024px) 40vw, (min-width: 768px) 80vw, 100vw"
          }
          className={cn(
            "h-auto w-full object-cover object-top",
            featured ? "aspect-video" : "aspect-[16/9]",
          )}
        />
      </div>

      <div
        className={cn(
          "flex flex-col p-6 md:p-8",
          featured ? "lg:col-span-5 lg:justify-center" : "flex-1",
        )}
      >
        <h3 className={cn("font-serif", featured ? "text-title" : "text-heading")}>
          {t(`items.${project.id}.name`)}
        </h3>
        <p className="mt-3">{t(`items.${project.id}.summary`)}</p>

        <dl className="mt-5 space-y-3 text-[0.9375rem] leading-relaxed">
          <div>
            <dt className="font-medium">{t("problem")}</dt>
            <dd className="text-muted-foreground">{t(`items.${project.id}.problem`)}</dd>
          </div>
          <div>
            <dt className="font-medium">{t("role")}</dt>
            <dd className="text-muted-foreground">{t(`items.${project.id}.role`)}</dd>
          </div>
          <div>
            <dt className="font-medium">{t("stack")}</dt>
            <dd translate="no">
              <ul className="mt-1.5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="bg-surface border-border inline-flex items-center gap-2 rounded-sm border px-2.5 py-1.5 text-sm"
                  >
                    <TechIcon name={tech} className="size-[1.125rem] shrink-0" />
                    {tech}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <p className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-6 text-sm">
          <ExternalLink href={project.site} className={LINK_CLASS}>
            {t(`items.${project.id}.visit`)}
            <ArrowUpRight aria-hidden="true" />
          </ExternalLink>
          {project.repo && (
            <ExternalLink href={project.repo} className={LINK_CLASS}>
              <FaGithub aria-hidden="true" />
              {t("source")}
            </ExternalLink>
          )}
        </p>
      </div>
    </article>
  );
}
