import { useEffect, useRef } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForm, ValidationError } from "@formspree/react";

const ContactSection = () => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [state, handleSubmit] = useForm("xeeprvzy");

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
            {t("contact.subtitle")}
          </p>
          <h2 className="reveal text-3xl md:text-4xl font-serif text-foreground mb-6 leading-snug">
            {t("contact.title")}
          </h2>
          <p className="reveal text-base text-muted-foreground leading-relaxed mb-10">
            {t("contact.description")}
          </p>

          {state.succeeded ? (
            <div className="reveal flex flex-col items-center gap-3 text-primary">
              <CheckCircle className="w-10 h-10" />
              <p className="text-base font-medium">{t("contact.success")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="reveal flex flex-col gap-4 text-left">

              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  {t("contact.form.name")}
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  placeholder={t("contact.form.namePlaceholder")}
                  className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ValidationError prefix="Name" field="name" errors={state.errors} className="text-sm text-destructive" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  {t("contact.form.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  placeholder={t("contact.form.emailPlaceholder")}
                  className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-sm text-destructive" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder={t("contact.form.messagePlaceholder")}
                  className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} className="text-sm text-destructive" />
              </div>

              {state.errors && Object.keys(state.errors).length > 0 && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="w-4 h-4" />
                  <span>{t("contact.error")}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={state.submitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed self-center mt-2"
              >
                <Send className="w-4 h-4" />
                {state.submitting ? t("contact.form.sending") : t("contact.form.submit")}
              </button>

            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;