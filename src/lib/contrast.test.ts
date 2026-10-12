import { readFileSync } from "node:fs";
import path from "node:path";
import { contrastRatio, parseTokens } from "./contrast";

const css = readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf8");

const themes = {
  claro: parseTokens(css, ":root"),
  oscuro: parseTokens(css, '[data-theme="dark"]'),
};

// [texto o elemento, fondo, minimo WCAG]. 4.5 = texto normal AA, 3 = elementos de interfaz.
const pairs: ReadonlyArray<[string, string, number]> = [
  ["foreground", "background", 4.5],
  ["foreground", "surface", 4.5],
  ["muted-foreground", "background", 4.5],
  ["muted-foreground", "surface", 4.5],
  ["primary", "background", 4.5],
  ["primary", "surface", 4.5],
  ["primary-foreground", "primary", 4.5],
  ["hero-foreground", "hero", 4.5],
  ["ring", "background", 3],
  ["ring", "hero", 3],
  ["border-strong", "background", 3],
  ["border-strong", "surface", 3],
];

describe("contraste de tokens de color", () => {
  describe.each(Object.entries(themes))("tema %s", (_name, tokens) => {
    it("define todos los tokens usados", () => {
      for (const [fg, bg] of pairs) {
        expect(tokens).toHaveProperty(fg);
        expect(tokens).toHaveProperty(bg);
      }
    });

    it.each(pairs)("%s sobre %s alcanza %s:1", (fg, bg, min) => {
      expect(contrastRatio(tokens[fg]!, tokens[bg]!)).toBeGreaterThanOrEqual(min);
    });
  });
});

describe("contrastRatio", () => {
  it("devuelve 21 para negro sobre blanco", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
  });

  it("rechaza colores invalidos", () => {
    expect(() => contrastRatio("rojo", "#ffffff")).toThrow();
  });
});
