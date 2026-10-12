import { Code, Database, Languages, Palette, Wrench } from "lucide-react";
import { useTranslations } from "next-intl";
import { skillGroups, type Skill, type SkillGroupId } from "@/content/skills";
import { Section } from "./section";
import { hasTechIcon, TechIcon } from "./tech-icon";

const GROUP_ICONS = {
  frontend: Code,
  data: Database,
  styles: Palette,
  tools: Wrench,
  languages: Languages,
} satisfies Record<SkillGroupId, typeof Code>;

export function Skills() {
  const t = useTranslations("Skills");
  const label = (skill: Skill) => ("name" in skill ? skill.name : t(`items.${skill.key}`));

  return (
    <Section id="habilidades" title={t("title")} tone="surface">
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 md:gap-x-8 md:gap-y-10 lg:grid-cols-5">
        {skillGroups.map(({ id, items }) => {
          const Icon = GROUP_ICONS[id];
          return (
            <div key={id}>
              <h3 className="text-heading flex items-center gap-2 font-serif">
                <Icon aria-hidden="true" className="text-primary size-5 shrink-0" />
                {t(`groups.${id}`)}
              </h3>
              <ul className="mt-3 space-y-1.5">
                {items.map((skill) => (
                  // Los nombres de tecnologias no se traducen; el resto del texto si.
                  <li
                    key={label(skill)}
                    translate={"name" in skill ? "no" : undefined}
                    className="flex items-center gap-2"
                  >
                    {"name" in skill && hasTechIcon(skill.name) ? (
                      <TechIcon
                        name={skill.name}
                        className="text-muted-foreground size-4 shrink-0"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="bg-border-strong mx-1.5 size-1 shrink-0 rounded-full"
                      />
                    )}
                    {label(skill)}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
