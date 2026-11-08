# FRANCIS.DEV Portfolio V2

FRANCIS.DEV is a responsive single-page portfolio for Francis Lee Recanil. It presents professional experience, selected projects, education, technical skills, and contact actions in a focused recruiter-friendly interface.

## Tech stack

- React 19 and TypeScript
- Vite 8
- Tailwind CSS 4 through `@tailwindcss/vite`
- Lucide React icons
- Vitest, Testing Library, and jsdom
- Variable fonts from Fontsource

## Features

- Responsive desktop and mobile navigation
- Accessible section navigation and skip link
- Project case studies with screenshot galleries and an accessible lightbox
- Centralized portfolio content and asset paths
- Resume viewing and download actions
- Dark visual system with responsive layouts and motion effects

## Local setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Development and verification commands

```bash
npm run dev        # Start the Vite development server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript without emitting files
npm test           # Run the Vitest suite once
npm run build      # Typecheck and create a production build
npm run preview    # Preview the production build locally
```

## Deployment overview

The project is a static Vite build. Run `npm run build` and publish the generated `dist/` directory using the hosting provider configured for the repository. Deployment credentials and provider-specific settings are intentionally kept outside the repository.

## Project structure

```text
src/
├── components/
│   ├── layout/       # Desktop and mobile shell/navigation
│   ├── sections/     # Portfolio page sections
│   └── ui/           # Reusable presentation primitives
├── data/             # Portfolio content and public asset paths
├── hooks/            # Stateful UI behavior
├── test/             # Test setup
├── types/            # Shared TypeScript types
├── App.tsx           # Single-page composition
└── styles.css        # Global styles and responsive visual system
public/
├── assets/           # Runtime images, icons, and license notices
├── documents/        # Public resume document
└── images/           # Project gallery media
docs/                 # Repository and maintenance documentation
```

Portfolio content is centrally managed in `src/data/portfolio.ts`. Original source assets and visual reference documents remain preserved in their supplied, ignored directories.
