/** Utilidades de contraste WCAG 2.x para validar los tokens de color. */

function channelToLinear(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

export function relativeLuminance(hex: string): number {
  const match = /^#([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match?.[1]) throw new Error(`Color hexadecimal invalido: "${hex}"`);
  const n = parseInt(match[1], 16);
  const r = channelToLinear((n >> 16) & 255);
  const g = channelToLinear((n >> 8) & 255);
  const b = channelToLinear(n & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const [lighter, darker] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x) as [
    number,
    number,
  ];
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Extrae las variables `--nombre: #hex;` del bloque que abre con `selector {` en su propia linea.
 * Asume CSS formateado con Prettier, que es lo que garantiza `npm run format:check`.
 */
export function parseTokens(css: string, selector: string): Record<string, string> {
  const lines = css.split("\n");
  const open = lines.findIndex((line) => line.trim() === `${selector} {`);
  if (open === -1) return {};

  const tokens: Record<string, string> = {};
  for (const line of lines.slice(open + 1)) {
    if (line.trim() === "}") break;
    const match = /^\s*--([\w-]+):\s*(#[0-9a-fA-F]{6});/.exec(line);
    if (match?.[1] && match[2]) tokens[match[1]] = match[2];
  }
  return tokens;
}
