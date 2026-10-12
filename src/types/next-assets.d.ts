// Tipos de las importaciones de imagenes (.jpg, .webp...). Normalmente los aporta next-env.d.ts,
// pero ese archivo se genera y no se versiona: sin esta referencia, el type check de CI falla.
/// <reference types="next/image-types/global" />
