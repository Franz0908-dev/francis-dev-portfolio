# FRANCIS.DEV Portfolio V2

A responsive single-page portfolio for Francis Lee Recanil, built with React, TypeScript, Vite, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Quality checks

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

To inspect the production build locally:

```bash
npm run preview
```

## Content and assets

Portfolio content is centrally managed in `src/data/portfolio.ts`. Runtime media is stored under `public/assets` and `public/images`, with license and provenance notices under `public/assets/licenses`.

The approved resume is served from `public/documents/francis-lee-recanil-resume.pdf`. Original source assets and visual reference documents remain preserved in their supplied directories.
