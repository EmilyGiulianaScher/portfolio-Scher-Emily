# Emily Giuliana Scher — Portfolio

Personal portfolio of Emily Giuliana Scher, a frontend developer from Corrientes, Argentina, focused on React and TypeScript.
The site is bilingual (Spanish and English), has light and dark themes, and treats accessibility and
performance as requirements, not extras. The repository is meant to be read: the decisions below explain why
things are built the way they are.

- **Live site:** set after the first deploy (see [Deploy](#deploy)).
- **Languages:** `/es` and `/en`.
- **Visual system:** `/es/sistema` documents the color tokens and their measured contrast ratios.

## Stack

| Area      | Choice                                                     |
| --------- | ---------------------------------------------------------- |
| Framework | Next.js 16 (App Router), React 19                          |
| Language  | TypeScript with `strict` and `noUncheckedIndexedAccess`    |
| Styling   | Tailwind CSS 4 with semantic design tokens                 |
| i18n      | `next-intl` (`/es`, `/en`), one JSON file per language     |
| Theming   | Own `ThemeProvider` (system, light, dark) via `data-theme` |
| Testing   | Jest, React Testing Library, `jest-axe`                    |
| Quality   | ESLint (`eslint-config-next`), Prettier, GitHub Actions    |
| Hosting   | Vercel                                                     |

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. The root redirects to `/es` or `/en` based on the browser language.

> **Windows / PowerShell:** if `npm` is blocked by the execution policy, run `npm.cmd run dev`, or allow
> local scripts for your user with `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

### Scripts

| Script                                    | What it does                      |
| ----------------------------------------- | --------------------------------- |
| `npm run dev`                             | Development server                |
| `npm run build` / `npm start`             | Production build and server       |
| `npm run lint`                            | ESLint                            |
| `npm run typecheck`                       | TypeScript without emitting files |
| `npm run format` / `npm run format:check` | Prettier (write / verify)         |
| `npm test` / `npm run test:watch`         | Jest                              |

## Project structure

```text
messages/            Copy, one file per language (es.json, en.json)
src/
  app/
    [locale]/        Routes: home, case study, visual system, localized 404
    globals.css      Design tokens (light and dark) and the type scale
    sitemap.ts       Sitemap with language alternates
    robots.ts
  components/        Small, focused components (hero, projects, header...)
    ui/              Shared primitives (button variants)
  content/           Language-independent data: projects, experience, skills, links
  i18n/              Routing, request config and locale-aware navigation
  lib/               Utilities: contrast math, SEO helpers, site URL
  test/              Test helpers and the page-level accessibility test
```

## Technical decisions

**Content is separate from code.** Anything a person reads lives in `messages/*.json`. Data that does not
change by language (stacks, links, dates) lives in `src/content/`. A test checks that both languages define
the same keys and the same placeholders, so adding a string to one language and forgetting the other fails CI.
Translation keys are typed: a misspelled key is a compile error.

**Routes include the language.** `/es` and `/en` give each language its own URL with `hreflang` alternates and
a canonical link per page, instead of switching text with client state. The language selector is a pair of
links (not buttons), so it works without JavaScript and each target declares its `lang`.

**Color contrast is tested, not assumed.** All color tokens live in `src/app/globals.css`. A test
(`src/lib/contrast.test.ts`) parses that file and asserts WCAG AA for every text and UI pairing in both
themes. The `/sistema` page renders the same measured ratios from the same source.

**Accessibility is built in.** Skip link, landmark regions with names, a single `h1` and no skipped heading
levels, visible keyboard focus, `prefers-reduced-motion` respected (the only entrance animation is disabled
for people who ask for less motion), and external links announce that they open in a new tab. A page-level
`axe` test covers the whole home page in both languages.

**Own theme provider.** `next-themes` renders a `<script>` inside a Client Component, which React 19 reports in the console on every language switch. The provider in `src/components/theme-provider.tsx` is about 60 lines: the pre-paint script is rendered by the server in `<head>`, so there is no flash and no warning.

**Server Components by default.** Only interactive pieces (theme toggle, language switcher, copy-email button)
are Client Components. Only the strings those components use are sent to the browser.

**Images are optimized at the source and at delivery.** Source files are compressed (the portrait went from
4.7 MB to 141 KB), and `next/image` serves responsive sizes in modern formats with a blur placeholder.

**Why Jest.** `next/jest` configures SWC and path aliases with no extra tooling, and Jest is the most common
requirement in job descriptions. `next-intl` ships ES modules only, so `jest.config.mjs` replaces the
`transformIgnorePatterns` that `next/jest` sets (the reason is documented in that file).

**Fully static output, no experimental flags.** Every page is generated as static HTML at build time through
`generateStaticParams`. The site has no per-request data, so it does not use Cache Components or partial
prefetching (both are on in the current Next.js starter); keeping them off keeps the build simple and the
behavior predictable.

**Measured, not assumed.** Lighthouse on the production build: Accessibility, Best Practices and SEO score 100,
Performance 100 on desktop and about 90 on a simulated slow-4G phone.

## Editing the content

| To change...                      | Edit                                      |
| --------------------------------- | ----------------------------------------- |
| Any visible text                  | `messages/es.json` and `messages/en.json` |
| Projects (links, stack, images)   | `src/content/projects.ts`                 |
| Experience dates                  | `src/content/experience.ts`               |
| Skills                            | `src/content/skills.ts`                   |
| Email, GitHub, LinkedIn, CV paths | `src/content/site.ts`                     |
| Colors and type scale             | `src/app/globals.css`                     |

Replace the CVs in `public/` keeping the file names (`CVScherEmilyEs.pdf`, `CVScherEmilyEn.pdf`); the download
buttons pick them up automatically.

## Deploy

The project deploys to Vercel with no extra configuration.

1. Import the GitHub repository in Vercel (framework preset: Next.js).
2. Optional: set `NEXT_PUBLIC_SITE_URL` to the final public URL (for example a custom domain). Without it, the
   site uses the production domain Vercel provides at build time for canonicals, the sitemap and social cards.
3. Every push to `main` deploys to production and every pull request gets a preview URL.

The GitHub Actions workflow in `.github/workflows/ci.yml` runs lint, type check, formatting check, tests and a
production build on every push and pull request. A CI build with no public URL (`NEXT_PUBLIC_SITE_URL` or the
domain Vercel provides) fails on purpose, so the site can never be published with canonicals pointing at
localhost; the workflow declares a placeholder for its own build.

## License

No license is specified yet. The code is public for reference; the text, images and CVs are the property of
Emily Giuliana Scher.
