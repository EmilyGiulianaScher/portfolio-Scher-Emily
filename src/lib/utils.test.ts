import { cn } from "./utils";

describe("cn", () => {
  it("une clases y descarta valores falsy", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });

  it("resuelve conflictos de Tailwind dejando la ultima clase", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
