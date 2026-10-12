import { Clock, Globe, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { siteConfig } from "@/content/site";
import { EmailContact } from "./email-contact";
import { ExternalLink } from "./external-link";
import { Section } from "./section";
import { buttonVariants } from "./ui/button";

const DETAILS = [
  { label: "availability", value: "availabilityValue", Icon: Clock },
  { label: "timezone", value: "timezoneValue", Icon: Globe },
] as const;

export function Contact() {
  const t = useTranslations("Contact");
  const { github, linkedin } = siteConfig.links;

  return (
    <Section id="contacto" title={t("title")} tone="hero">
      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-lead max-w-prose">{t("lead")}</p>
          <dl className="mt-6 space-y-3 text-sm">
            {DETAILS.map(({ label, value, Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                <dt className="font-medium">{t(label)}:</dt>
                <dd>{t(value)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="flex items-center gap-2 text-sm font-medium">
            <Mail aria-hidden="true" className="size-4" />
            {t("emailLabel")}
          </p>
          <EmailContact encoded={siteConfig.email.encoded} />

          <p className="mt-8 text-sm font-medium">{t("profilesLabel")}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <ExternalLink href={github} className={buttonVariants({ variant: "outline" })}>
              <FaGithub aria-hidden="true" />
              GitHub
            </ExternalLink>
            <ExternalLink href={linkedin} className={buttonVariants({ variant: "outline" })}>
              <FaLinkedinIn aria-hidden="true" />
              LinkedIn
            </ExternalLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
