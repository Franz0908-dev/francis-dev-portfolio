# Portfolio review and evidence log

Reviewed 2026-11-17. Local-only work; no push, commit or deployment. The supplied checkout has no `.git` directory or configured deployment identity. No AGENTS.md was found in the workspace. The portfolio design skill was read; the user's explicit implementation request authorized the edits without additional section approvals.

The initial review below records the pre-certificate snapshot. The supplied certificate ZIP has since been processed; current credential details, public files, privacy decisions, verification attempts and follow-up checks are recorded in [CERTIFICATES_REVIEW.md](CERTIFICATES_REVIEW.md). The previous request for four certificate files is resolved; the Graphic Design Workshop alone remains text-only. Undergraduate wording and unconfirmed project/production facts are unchanged.

## Review scope and findings

Inspected every source component, hook, type, test, package/lockfile, TypeScript/Vite/ESLint configuration, HTML, README, license/provenance record, public asset, all eight supplied screenshots and the entire bundled one-page PDF. Opened the existing site at desktop, tablet and mobile sizes before editing. Inspected the original hero/portrait and optimized WebP images visually.

| Area | Finding and implementation |
| --- | --- |
| Identity and mobile hero | Name was only visible in the desktop sidebar. The full name is now the h1 on every layout, followed by the role and concise introduction. Added View projects; retained email, view résumé and download actions. |
| Visual design | Preserved the purple palette, supplied artwork, Space Grotesk/JetBrains Mono and dark cards. Simplified hero typography, made tablet navigation two rows, adjusted mobile actions and sidebar social actions, added matching certificate cards. |
| Navigation | Mobile omitted Education and incorrectly marked Contact active there. All seven sections now have distinct links on desktop, tablet and mobile. The mobile strip scrolls horizontally, preserves readable labels and scrolls the active item into view. |
| Section tracking | Replaced selection from partial IntersectionObserver callbacks with one animation-frame-throttled reading-position calculation over all sections. Accounts for sticky headers, upward scrolling, viewport resize, layout changes and page end. |
| Galleries | Moved the viewer out of section layout into a document-level native modal/top layer. This removes transformed-ancestor/stacking constraints after scroll. Added previous/next controls, arrow keys, swipe, native background inertness, explicit Tab wrap, Escape, close and backdrop handling. Close restores the exact originating trigger without moving scroll position. |
| Accessibility | Section labels now point at section h2 headings; main can receive skip-link focus. Controls retain visible focus, touch targets and reduced-motion support. Real browser coverage checks background focus exclusion, Tab/Shift+Tab and focus restoration. |
| Assets and performance | Original hero/portrait PNGs total 3,808,754 bytes. Responsive WebP hero variants are 38,984 / 79,650 / 117,348 bytes; portraits are 6,430 / 15,978 bytes. Originals retained outside public output. Thumbnails retain lazy loading, captions and dimensions. Only two needed Latin font files are bundled. |
| Contact | Added the supplied LinkedIn URL alongside GitHub and mailto links. Contact copy addresses roles and web projects. No invented contact form or delivery endpoint. |
| SEO | Improved title/description and social text metadata. Retained English language and theme. No confirmed origin, so canonical/og:url/absolute social image/sitemap are intentionally pending. |
| Hosting | Relative Vite base plus a shared asset resolver covers root and directory hosting, including documents and future certificate files. Verified actual static output with strict 404 handling under both mounts. |
| Credentials and privacy | No certificate images/PDFs or academic records were supplied. Four text entries retain résumé-supported titles/issuers; only Chimes has a recorded year. No IDs, QR codes, issuer-verification links, placeholder files or fabricated dates were added. Existing screenshots show test products/customers and demo academic accounts; no additional credential files were published. |
| Résumé | Generated an updated, searchable one-page PDF using shared website data. Preserved the supplied original PDF and its original path. The revised public copy omits the old telephone numbers and includes LinkedIn, current case studies and conservative education wording. Native Windows PDF loading/rendering verified one page; the rendered page was inspected. |

## Reconciliation and evidence

The résumé is a supplied record of claims, not independent issuer or institution verification. The latest supplied site data and screenshots document a later academic prototype; the implementation source and a working external demo are not in this checkout.

| Fact | Supplied evidence | Published resolution |
| --- | --- | --- |
| Name/contact | PDF and profile data agree on Francis Lee Recanil, email and GitHub; user supplied LinkedIn. | Same name, role, email and social destinations across the site and revised PDF. |
| Chimes dates/role | Both list Full Stack Web Developer Intern, July 18–August 5, 2026, 300 hours. | Preserved these dates, role and hours. Certificate copy is still needed. |
| Chimes stack | Original résumé explicitly lists Laravel 13, PHP, React 19, TypeScript, Inertia.js, Tailwind CSS 4, SQLite and Vite. | Added that stack to the team case study and revised PDF. |
| Chimes contribution | PDF records frontend/backend implementation/debugging across products, inventory, sales, orders, invoices and reporting. Site records generated-code review and testing in the running app. | Combined the documented activities; team credit remains prominent. No complete module or sole ownership is asserted. Screenshots describe team-built functionality. |
| Academic project name/status/database | PDF: School Laboratory Reservation System, original academic design/plan, SQL Server proposed. Latest site: BCP Laboratory Reservation System, solo academic implementation, ASP.NET Core MVC/C#/EF Core/SQLite/Razor/JavaScript/Bootstrap/FullCalendar/Chart.js; four supplied demo screens. | Main title is BCP Laboratory Reservation System; proposal history names the earlier title and SQL Server plan. Current work is described as an academic prototype with SQLite. No institutional production use is claimed. |
| Academic individual work | Latest site states directed implementation and tested running features; extensive AI assistance with limited manual source review. | Preserved the specific involvement and review limit once in that case study and revised PDF. No independently authored code claim. |
| Education | Both: BS Computer Engineering, Bestlink College of the Philippines, 2022–2025, undergraduate. Site: through third year first semester. PDF: completed third year. No transcript supplied. | Shared supported wording: undergraduate studies, degree not completed. Removed the conflicting completed-term assertion from current public copy; original retained. |
| Credentials | Original PDF and site list Chimes 300-Hour Internship Certificate (2026), Java Programming NC III / TESDA, Full Stack Web Development / Udemy (course completion), Graphic Design Workshop / Sangguniang Kabataan. No copies/IDs or other dates supplied. | Four text cards with exact supported titles/issuers and Chimes year. No View certificate or verification action until a real reviewed public copy/link exists. |
| Other old résumé projects | POS, Student Management System and Portfolio Website appear in the old PDF without supplied source/screenshots in this checkout. | Current résumé focuses on the two documented featured case studies. Original records remain preserved. |
| Project links | No project repo/demo URLs in supplied data or README; no git remote available. GitHub profile lookup could not be retrieved through the web tool. | Retained supplied GitHub profile. Did not invent repository slugs, hosted demos or project dates. |

## Facts/files still needed

1. Education transcript or exact last successfully completed semester, including its academic year. Was it third year first semester or the full third year? Current copy avoids choosing between them.
2. Shareable copies of all four certificates, including the exact Udemy course title, TESDA credential type, issuers' displayed names and issue/completion dates. Include official verification URLs if the issuers provide them. Originals should remain outside public/ until reviewed and redacted as needed.
3. Public project repository/demo URLs and any publication permission required for the team project. For stronger contribution detail, identify the precise features/modules you personally implemented or debugged. Current wording is limited to documented activities.
4. Academic proposal/implementation dates and source or demo evidence for verifying the recorded stack and behavior independently. The gallery currently documents supplied prototype screens only.
5. Confirm the final production URL, including any subpath, before adding canonical and absolute sharing metadata.

## Validation

- Initial `npm ci`: passed, 246 packages installed; initial audit reported nine moderate dev-tool findings. Initial existing tests: 2 passed.
- Final clean `npm ci --offline --no-audit`: passed after stopping the dev server to release a locked native CSS module. The earlier attempt while Vite was running failed with EPERM and was resolved by stopping that owned process.
- Type checking, ESLint, Vitest (10 focused tests) and production build: passed. Regression tests cover modal portal placement, all eight triggers, exact focus/overflow restoration, controls, arrows, swipe, cancel/backdrop, Tab wrap, base paths and active sections in both directions.
- Production browser QA: actual built files checked at `/` and `/portfolio/`, in 1440×900, 820×1180, 390×844, 320×700 and 1024×600 viewports. Keyboard, touch, viewport coverage after scroll, both galleries, active navigation including Education/Certifications, focus, images, PDF responses and reduced motion checked. Actual résumé download matched the public PDF byte-for-byte; View resume opened the PDF in a new tab; the keyboard skip link focused main. Zero app console/network errors in the final completed run. Browser QA used the installed Chromium for Testing with CHROME_PATH and QA_SINGLE_PROCESS=1; the default system Chrome was not usable on this restricted host. Screenshots and the machine report are in `.cache/`.
- WebP visual inspection: passed. Native Windows PDF renderer: updated résumé loads as one page and renders with legible selectable/searchable text and working URL annotations.
- Live external destination content, certificate verification and production hosting are not verified: registry/public-network requests were restricted and no production identity or certificate copies were supplied. Local link structure and built document/image responses are verified.

### Dependency update limitation

The initial audit identified `GHSA-g3hv-75wg-m249` (minimatch pattern amplification) through ESLint and typescript-eslint, with nine moderate dev-tool entries. The official advisory identifies minimatch 11.0.1 as patched: https://github.com/advisories/GHSA-g3hv-75wg-m249 .

Attempted `npm install -D eslint@latest typescript-eslint@latest --fetch-retries=0`: failed with EACCES fetching registry metadata. The final `npm audit --json --fetch-retries=0` also failed against the registry bulk advisory endpoint; `.cache/dependency-audit.json` records that error. A fresh clean audit is therefore unverified. No incompatible minimatch major override or fabricated package integrity was inserted. Installed dependency versions are retained; the lockfile's root engine metadata matches package.json. Updating affected dev dependencies remains unfinished until registry access is available. This is a local environment restriction, not a claimed clean audit.

Original supplied résumé SHA-256 (unchanged): `CDE3C11FE7749DA136BEEC50F9BA1FDE498E888B66C484F5160553920E874F01`.
