import { cn } from "@/lib/utils";

/** Ancho maximo y margenes laterales compartidos por todas las secciones. */
export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[80rem] px-6 md:px-12", className)} {...props} />;
}
