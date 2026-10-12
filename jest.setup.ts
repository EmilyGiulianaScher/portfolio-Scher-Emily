import "@testing-library/jest-dom";

// jsdom no implementa matchMedia, que ThemeProvider usa para leer la preferencia del sistema.
// (Los tests con entorno "node" no tienen window y no lo necesitan.)
if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
}
