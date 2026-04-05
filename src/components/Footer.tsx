import { Github, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="py-8 border-t border-border">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {t("footer.credits")}
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/emily-giuliana-scher/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/EmilyGiulianaScher"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
