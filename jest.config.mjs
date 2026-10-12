import nextJest from "next/jest.js";

// next/jest carga next.config, .env y transforma con SWC; tambien resuelve los alias de tsconfig.
const createJestConfig = nextJest({ dir: "./" });

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
};

// next-intl y sus dependencias se publican solo como ESM y Jest corre en CommonJS: hay que
// transformarlas. next/jest agrega varios patrones que ignoran todo node_modules (Jest descarta un
// archivo si coincide cualquiera), asi que los reemplazamos por uno que incluye las excepciones
// propias de Next mas las nuestras.
const TRANSFORMED_PACKAGES = [
  "next-intl",
  "use-intl",
  "@formatjs",
  "intl-messageformat",
  "icu-minify",
  "next/dist/client",
  "next/dist/shared/lib",
];

async function buildJestConfig() {
  const jestConfig = await createJestConfig(config)();
  jestConfig.transformIgnorePatterns = [
    `/node_modules/(?!(${TRANSFORMED_PACKAGES.join("|")})/)`,
    "^.+\\.module\\.(css|sass|scss)$",
  ];
  return jestConfig;
}

export default buildJestConfig;
