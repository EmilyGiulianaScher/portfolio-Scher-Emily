import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Link, usePathname y redirect conscientes del idioma activo.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
