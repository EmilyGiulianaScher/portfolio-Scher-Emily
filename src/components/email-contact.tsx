"use client";

import { Check, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { buttonVariants } from "./ui/button";

type EmailContactProps = {
  /** Direccion en base64. Se decodifica solo en el navegador. */
  encoded: string;
};
type Status = "idle" | "copied" | "error";

const subscribe = () => () => {};

/**
 * Muestra el email sin dejarlo en el HTML ni en los datos que el servidor envia al navegador: la
 * direccion llega codificada y recien se decodifica en el cliente. El texto no se puede
 * seleccionar; para copiarla esta el boton, y el enlace abre el programa de correo.
 */
export function EmailContact({ encoded }: EmailContactProps) {
  const t = useTranslations("CopyEmail");
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // En el servidor (y durante la hidratacion) la direccion es null; en el navegador se decodifica.
  const address = useSyncExternalStore(
    subscribe,
    () => atob(encoded),
    () => null,
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    if (!address) return;
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(address);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    timer.current = setTimeout(() => setStatus("idle"), 3000);
  }

  const Icon = status === "copied" ? Check : Copy;

  return (
    <>
      {address ? (
        <a
          href={`mailto:${address}`}
          className="font-serif text-2xl break-all underline-offset-4 select-none hover:underline md:text-4xl"
        >
          {address}
        </a>
      ) : (
        <span aria-hidden="true" className="font-serif text-2xl select-none md:text-4xl">
          ••••••••@•••••.com
        </span>
      )}
      <noscript>
        <p className="mt-2 text-sm">{t("noscript")}</p>
      </noscript>

      {/* El boton solo existe cuando hay direccion (requiere JavaScript): sin JS no queda un boton muerto. */}
      {address && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button type="button" onClick={copy} className={buttonVariants({ variant: "outline" })}>
            <Icon aria-hidden="true" />
            {t("copy")}
          </button>
          {/* Region de estado: los lectores de pantalla anuncian el cambio. */}
          <span role="status" className="text-sm">
            {status === "copied" && t("copied")}
            {status === "error" && t("error")}
          </span>
        </div>
      )}
    </>
  );
}
