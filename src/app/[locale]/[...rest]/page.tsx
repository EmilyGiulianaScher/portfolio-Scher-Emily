import { notFound } from "next/navigation";

// Captura cualquier ruta desconocida para que el 404 se muestre dentro del layout del idioma.
export default function CatchAllPage() {
  notFound();
}
