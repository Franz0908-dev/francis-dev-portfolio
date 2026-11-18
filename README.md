# FRANCIS.DEV

Francis Lee Recanil's portfolio, built with React, TypeScript, Vite, and Tailwind CSS. It includes three project case studies, internship experience, education, certifications, contact links, and a searchable one-page résumé.

## Develop and check

Use Node 24.15 or newer (validated on Node 24.18.1).

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

`npm run qa:browser` checks the actual `dist/` output in an installed Chromium browser, at `/` and `/portfolio/`, across desktop, tablet, mobile, narrow, and short desktop viewports. It checks navigation in both scroll directions, the native screenshot viewer, focus, keyboard, touch, image decoding, résumé links, credentials, console errors, and reduced motion. It also starts and stops its own strict static server. Screenshots and a JSON report are written under `.cache/`.

Set `CHROME_PATH` if your browser is not in a standard Chrome/Edge/Chromium installation location. On restricted Windows test hosts that cannot run Chromium child processes, use `$env:QA_SINGLE_PROCESS='1'` in PowerShell for local QA. This affects the test browser only. No extra browser packages are required.

## Content and evidence

Edit `src/data/portfolio.ts`. Read [the review and evidence log](docs/PORTFOLIO_REVIEW.md) before changing factual claims. The current public résumé uses the same profile, project, internship, education, and credential data as the site.

- Current download: `public/documents/francis-lee-recanil-resume-updated.pdf`.
- Supplied original, preserved unchanged: `public/documents/francis-lee-recanil-resume.pdf`.
- Generated HTML résumé companion: `documents/resume.html`.
- With `npm run dev` serving port 5173, `npm run prepare:resume` regenerates the current PDF and HTML from shared data. Set `DEV_URL` if the dev server uses another URL.
- `npm run prepare:media` regenerates responsive WebP variants from the supplied originals in `source-assets/images/`. These originals are excluded from `dist/` because only `public/` is copied.
- Project screenshots remain supplied PNGs, loaded lazily with intrinsic dimensions. Logo/license notices remain under `public/assets/licenses/`.

Four reviewed technical certificate PDFs are available in `public/certificates/`: Chimes internship completion, TESDA Programming (Java) NC III training, TESDA Computer Security Incident Handling Level I training, and the Udemy full-stack bootcamp. The two TESDA entries are **Certificates of Training**, as printed on the documents. Their public copies have the unique learner identifier and verification QR removed with flattened redactions; all four copies are rebuilt from reviewed page images so original hidden text, annotations and metadata are excluded. Original PDFs remain outside public output under the ignored `.cache/private-certificates/` folder, and the supplied ZIP is preserved.

All five document cards have an inline WebP preview above their details. The fifth card is Artistic Graphics Editing Workshop: its original participation document is preserved byte-for-byte, its supplied recipient field is blank, and its link is labeled View workshop document. Its preview trims only the large blank outer page margins, retaining the entire certificate design. The other four previews retain their full public PDF pages, including the TESDA redactions. Every preview loads eagerly and links to its corresponding PDF; separate labeled PDF links remain below each card. On Windows, regenerate these static assets with `node scripts/prepare-certificate-previews.mjs` using an installed Chromium browser (the same `CHROME_PATH` / `QA_SINGLE_PROCESS` options as browser QA). The renderer reads only `public/certificates/*.pdf`, preserving the public TESDA redactions; private originals are never used.

The supplied dates, certificate types and Udemy's 62 hours are shared by the site and current résumé. The former Graphic Design Workshop entry is replaced by the supplied Artistic Graphics Editing Workshop document, with the exact event, issuer, type, date and a visible blank-recipient note. The résumé includes the same qualification and blank-recipient disclosure. Local View certificate actions do not depend on external verification. The printed Udemy URL could not be resolved in this environment, and no individual TESDA verification URL was confirmed, so neither is exposed as a verified external action. See [the certificate review](docs/CERTIFICATES_REVIEW.md) for evidence, privacy decisions, checks and remaining limits.

For future additions, inspect originals outside `public/`, flatten any privacy redactions, remove hidden personal text/metadata, inspect the exported copy again and then add its `publicFile` path. Only set `verificationUrl` after confirming an authentic issuer destination; do not guess URLs or IDs.

## Static deployment

Build output is `dist/`. The default `base: './'` supports root hosting and a directory such as `/portfolio/` with a trailing slash. All local media, résumé and certificate paths use the Vite base. This is a single-page document with hash navigation; a host only needs to serve the built files with their normal MIME types.

```sh
npm run build
npm run preview:paths
```

The strict preview serves the same build at `http://127.0.0.1:4180/` and `http://127.0.0.1:4180/portfolio/`. It returns 404 for missing assets, making broken paths visible. A known deployment prefix can instead be built with `npm run build -- --base=/portfolio/`.

No production URL is confirmed. The HTML includes title, description, theme, Open Graph and Twitter text metadata. Add canonical URL, `og:url`, an absolute social image URL and sitemap only after confirming the actual production origin and path. No deployment or push was performed.

## Dependency status

The initial install and audit reported nine moderate development-tool findings associated with `minimatch` through ESLint and typescript-eslint. Registry access subsequently returned `EACCES`, preventing safe dependency updates and a fresh final audit. The existing dependency versions were retained; package and lockfile engine metadata are synchronized. See the review for the exact unfinished check. Run `npm update --save-dev eslint typescript-eslint`, `npm audit fix`, and all checks above in an environment with registry access, reviewing the resulting dependency diff. Do not use forced major overrides without compatibility testing.
