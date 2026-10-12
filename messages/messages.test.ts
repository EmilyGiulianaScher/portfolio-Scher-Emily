import en from "./en.json";
import es from "./es.json";

type Tree = { [key: string]: string | Tree };

function flatten(tree: Tree, prefix = ""): Record<string, string> {
  return Object.entries(tree).reduce<Record<string, string>>((acc, [key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return typeof value === "string"
      ? { ...acc, [path]: value }
      : { ...acc, ...flatten(value, path) };
  }, {});
}

const spanish = flatten(es);
const english = flatten(en);

describe("mensajes por idioma", () => {
  it("es y en definen exactamente las mismas claves", () => {
    expect(Object.keys(english).sort()).toEqual(Object.keys(spanish).sort());
  });

  it.each([
    ["es", spanish],
    ["en", english],
  ])("no hay textos vacios en %s", (_locale, messages) => {
    const empty = Object.entries(messages).filter(([, value]) => value.trim() === "");
    expect(empty).toEqual([]);
  });

  it("los placeholders coinciden entre idiomas", () => {
    const placeholders = (text: string) => (text.match(/\{\w+\}/g) ?? []).sort();
    for (const [key, text] of Object.entries(spanish)) {
      expect({ key, vars: placeholders(english[key] ?? "") }).toEqual({
        key,
        vars: placeholders(text),
      });
    }
  });

  // Red de seguridad: un marcador de "texto de ejemplo" nunca debe llegar al sitio publicado.
  it.each([
    ["es", spanish],
    ["en", english],
  ])("no quedan marcadores de texto pendiente en %s", (_locale, messages) => {
    const pending = Object.entries(messages).filter(([, value]) =>
      /\[(completar|to complete|todo)[^\]]*\]/i.test(value),
    );
    expect(pending.map(([key]) => key)).toEqual([]);
  });
});
