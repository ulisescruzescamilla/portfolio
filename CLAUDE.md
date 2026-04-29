# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev       # Start dev server at http://localhost:3000
npm run build     # Production build
npm run lint      # ESLint (no test suite configured)
```

## Stack

- **Next.js 16.2.3** with App Router — this is a newer version with breaking changes; consult `node_modules/next/dist/docs/` before writing code
- **React 19.2.4**
- **Tailwind CSS v4** (configured via `postcss.config.mjs`, not a `tailwind.config.*` file)
- **TypeScript 5**

## Project structure

```
src/
  app/
    layout.tsx      # Root layout — sets metadata, Geist fonts, body flex-col wrapper
    page.tsx        # Single page: Navbar > main(Hero, Skills) > Footer
    globals.css     # Global styles
  components/
    Navbar.tsx
    Hero.tsx
    Skills.tsx
    Footer.tsx
```

The site is a single-page portfolio. All sections live in `src/components/` and are composed in `src/app/page.tsx`.

## SEO

### Current state
`src/app/layout.tsx` exports a `Metadata` object with `title` and `description` only. No Open Graph, Twitter Card, canonical, structured data, `robots.txt`, or `sitemap.xml` exist yet.

### Rules

**Metadata lives in `layout.tsx` only.** Use the Next.js `Metadata` / `generateMetadata` API — never raw `<meta>` tags or a `<Head>` component. The full shape of the `Metadata` type is in `node_modules/next/dist/docs/`.

**Open Graph and Twitter Card fields are required** whenever metadata is touched:
```ts
export const metadata: Metadata = {
  title: "...",
  description: "...",
  openGraph: {
    title: "...",
    description: "...",
    url: "https://escamilla.dev",
    siteName: "Ulises Escamilla",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "...",
    description: "...",
  },
};
```

**One `<h1>` per page.** It already lives in `Hero.tsx`. Do not add another `<h1>` anywhere. New sections get `<h2>`.

**All sections must be Server Components** so their text is in the initial HTML. Only add `"use client"` when interactivity is unavoidable (Navbar already does this for the mobile menu). Moving static content into a client component harms SEO.

**Images must use `next/image`** with a descriptive `alt` attribute. Never use `<img>`.

**`robots.txt` and `sitemap.xml`** are generated via `src/app/robots.ts` and `src/app/sitemap.ts` (App Router file conventions) — not static files in `public/`.

**`dangerouslySetInnerHTML` SVGs** (used in `Skills.tsx`) are invisible to crawlers as meaningful content. Skill names are already rendered as visible `<span>` text alongside each icon — keep that pattern.

**Every function should be documented with JDocs

## Key notes

- Path alias `@/` maps to `src/` (configured in `tsconfig.json`)
- No test framework is set up
- Tailwind v4 uses CSS-first configuration — class variants and theme tokens are defined in `globals.css`, not a JS config file
