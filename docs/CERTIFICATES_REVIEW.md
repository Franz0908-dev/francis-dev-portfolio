# Certificate integration review

Completed 2026-11-17, continuing the local portfolio review. No push or deployment.

## Supplied evidence and published details

Source: `D:/Downloads/francis-lee-recanil-certificates.zip` (SHA-256 `E3CDED4FD0ACE53A86E3FA81FE450F30806CB51A07BDE97BA953F13805C16BFF`). Inspected the four original PDF files, all one page, and rendered every page with the native Windows PDF engine before preparing public copies. Original filenames call both TESDA documents certificates of completion; their actual page headings say **Certificate of Training**, which controls the public wording.

| Portfolio title | Issuer | Type and issue date | Public PDF |
| --- | --- | --- | --- |
| 300-Hour Internship Certificate | Chimes Consulting | Certificate of Completion; August 5, 2026 | [Public copy](../public/certificates/chimes-300-hour-internship.pdf) |
| Programming (Java) NC III | TESDA | Certificate of Training; October 11, 2023 | [Public copy](../public/certificates/tesda-programming-java-nc-iii-training.pdf) |
| Computer Security Incident Handling Level I | TESDA | Certificate of Training; September 3, 2026 | [Public copy](../public/certificates/tesda-computer-security-incident-handling-level-i-training.pdf) |
| The Complete Full-Stack Web Development Bootcamp | Udemy | Certificate of Completion; April 13, 2026; 62 hours | [Public copy](../public/certificates/udemy-complete-full-stack-web-development-bootcamp.pdf) |

The TESDA pages also identify JOYSIS TECH VOC INC. as the training provider/co-issuer; the cards use the requested short issuer label TESDA. Training completion is not represented as independently confirmed national assessment certification. Udemy's certificate displays the name Francis Lee, as supplied; the document's name and credential information were not rewritten.

The original Graphic Design Workshop / Sangguniang Kabataan record is retained as a fifth text-only entry, supported by the original résumé, with no invented date or PDF. The four supplied credentials each have a working View certificate action independent of external verification.

## Privacy review and public copies

- The TESDA originals contain a unique learner identifier and verification QR codes. Those regions, including the scan/validation prompt, are covered with opaque redactions before the reviewed page is re-encoded into a new PDF. Each TESDA public copy includes a footer disclosing that the learner identifier and QR code were redacted for privacy. No private identifier values are copied into repository source or this log.
- Chimes and Udemy contain the public recipient name and credential details; no home address, personal telephone number, date of birth or learner identifier was found on their pages. No visible credential details were changed. Udemy's printed certificate URL/number is retained as part of the supplied public-facing credential.
- Issuer names, issuer signatures, institutional address, dates, course details, seals and printed credential/reference numbers are retained where visible outside the privacy regions. The institutional location printed on TESDA is not presented as a residential address.
- All four public PDFs are rebuilt from fresh rendered page images. The originals' hidden text, annotations, metadata, form fields and any other original PDF objects are therefore excluded. They are image-based public copies, rather than the original searchable/source PDFs; this also ensures the redacted identifier cannot be recovered by selecting text or removing an overlaid PDF rectangle.
- Loaded and rendered all four final public PDFs with the native Windows PDF engine: each is a valid one-page document. Inspected both redacted renders to ensure the learner ID/QR are fully covered and the surrounding title, date, training records and seals remain readable. Static inspection finds one flattened image per PDF and no embedded files, JavaScript, launch actions, forms or original metadata.
- Original PDFs and processing images remain under ignored `.cache/private-certificates/`, outside `public/` and `dist/`. The source ZIP was read and preserved in Downloads. The supplied original résumé remains unchanged (SHA-256 `CDE3C11FE7749DA136BEEC50F9BA1FDE498E888B66C484F5160553920E874F01`).

## External verification

The Udemy page prints `ude.my/UC-21a44d22-bb34-498c-a1ae-deaa353b0a8c`. Attempted the exact HTTPS short URL with the web tool and a direct HTTP client; the web tool reported inaccessible and the direct request failed with EACCES. An attempt to inspect the corresponding Udemy certificate page was also inaccessible. Resolution and issuer confirmation remain unverified; this is not evidence that the certificate URL is invalid. No external verification button was added.

Neither TESDA PDF prints a plain-text verification URL; both use QR codes. The local browser lacks a barcode decoder, and no individual issuer verification destination was confirmed through the available issuer search. No guessed QR destination, national-certificate registry or generic issuer homepage was substituted for a training-certificate verification link. Original QR codes remain in the private originals. A confirmed privacy-safe issuer URL can be added to `verificationUrl` later without changing the local PDF action.

## Résumé and scope

Regenerated `public/documents/francis-lee-recanil-resume-updated.pdf` and `documents/resume.html` from the shared credential data. Cross-checked all four titles, issuer labels, certificate types, dates and Udemy duration against the public cards and supplied pages. The current résumé remains a legible one-page text PDF; both TESDA rows explicitly say Certificate of Training. Graphic Design remains text-only on both site and résumé. Undergraduate wording is unchanged, as are the project descriptions, contributions, dates, demo/repository links and production metadata.

## Checks

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test`: 11 passed across three files. Added coverage for all four certificate paths, exact issue dates, TESDA training labels, Udemy duration, and local file actions without external verification. The text-only workshop has no invented link.
- `node --check scripts/qa-browser.mjs`: passed.
- `npm run build`: passed.
- `npm run qa:browser`: passed on the production build at `/` and `/portfolio/`, across desktop (1440×900), tablet (820×1180), mobile (390×844), narrow (320×700), and short desktop (1024×600). All four links were checked at both mounts: HTTP 200, application/pdf MIME, PDF header and byte hashes matching the intended public files. On desktop at each mount, clicked every View certificate action and confirmed the correct PDF opened in a new tab. Existing navigation, viewer, keyboard/touch/focus, résumé download/view, assets and reduced-motion checks also pass. Zero app console or network errors. Screenshots and the report remain under `.cache/`.
- Native Windows PDF engine: all public certificate copies and updated résumé load/render successfully as one page each; renders inspected.

## Registry retry

Retried `npm install -D eslint@latest typescript-eslint@latest --package-lock-only --ignore-scripts --fetch-retries=0 --cache .cache/npm` to resolve updates safely before applying them. Registry metadata access again failed with EACCES. Retried `npm audit --json --fetch-retries=0 --cache .cache/npm`; the bulk advisory endpoint also failed. No dependency versions or package integrity values were guessed or changed. The earlier nine moderate development-tool findings remain the last successful audit result; a fresh audit and dependency update require working registry access.

Remaining optional content: the Graphic Design Workshop PDF/date and confirmed external certificate verification URLs. The earlier education/project/production confirmations remain deferred by the user's instruction.
## Inline certificate previews

Added four 960-pixel-wide WebP previews generated directly from the current public PDF files, including the existing TESDA redactions and their disclosure footers. The generator never reads the private originals. Dimensions and encoded sizes:

| Preview | Dimensions | Size |
| --- | --- | --- |
| Chimes internship | 960 × 720 | 28,038 bytes |
| TESDA Programming (Java) NC III | 960 × 708 | 50,050 bytes |
| TESDA Computer Security Incident Handling Level I | 960 × 708 | 47,198 bytes |
| Udemy full-stack bootcamp | 960 × 714 | 24,050 bytes |

The four images total 149,336 bytes. They load eagerly, retain intrinsic dimensions and display with width:100% / height:auto / object-fit:contain, without cropping or hover/click reveal. Each image links to its existing PDF; the separate View certificate action and all credential details remain below. Desktop/tablet retain two columns; phones use one. Graphic Design remains text-only.

Regeneration: on Windows, run `node scripts/prepare-certificate-previews.mjs`; it uses `scripts/render-certificate-previews.ps1` and the installed Chromium encoder. Standard CHROME_PATH and QA_SINGLE_PROCESS options are supported. Native page renders and asset metadata are written under ignored `.cache/certificate-previews/`.

Validation: type checking, lint, all 11 tests and production build passed. Browser QA checks eager image loading before scrolling to the section, all four previews' aspect ratios and order above headings, responsive column counts, root/subpath asset paths, and matching preview/text PDF destinations. All four image links were clicked successfully on desktop and mobile at `/` and `/portfolio/`; the separate PDF links and previous site checks also passed across all five viewports, with zero app console/network errors. Inspected the WebPs and final desktop/mobile screenshots. Existing public PDFs, résumé contents, education and project information were not changed.
## Workshop document update

The former text-only Graphic Design Workshop is now **Artistic Graphics Editing Workshop**. Event: Project UnCAGE 1.0: Unravel Communication through Artistic Graphics Editing. Issuer: Technological University of the Philippines – Manila, in partnership with Sangguniang Kabataan, Barangay Punturin. Type: Certificate of Participation. Date: June 18, 2022. These details were checked against the supplied `GRAPHICS EDITING CT.pdf`.

Inspected the complete one-page PDF before publication. Its recipient line is blank; the card explicitly states “The supplied workshop document has a blank recipient field.” and uses “View workshop document”. The résumé entry now uses the same corrected title, issuer, type and date and discloses the blank field. No recipient name was inserted into the certificate, PDF or preview. The supplied page contains issuer signatures and public event/location information; no recipient personal details or active/embedded/form fields were found.

The public PDF `public/certificates/artistic-graphics-editing-workshop.pdf` is an exact copy of the supplied original. Both SHA-256 hashes are `C5190BCF293AED9C04B13A4BCBD2B9CB321F7844D27370E1DA30DACD17A052D3`. Only the preview is trimmed: the 1280×1811 render's design bounds, with a four-pixel safety border, are x=0, y=424, width=1280, height=963. This removes the outer blank margins and keeps the complete certificate design and blank recipient line. The optimized WebP is 960×722, 137,474 bytes. The preview generator applies margin trimming only to this workshop file; the other four public PDFs/previews retain their existing full-page content and TESDA redactions.

All five cards have clickable previews plus separate full-size PDF links, with two columns on desktop/tablet and one on phones. All credential details remain beneath the image. There is no hover/click reveal or lazy-load gate.

Follow-up checks passed: type checking, ESLint, all 12 tests, production build, and production browser QA at `/` and `/portfolio/` across desktop, tablet, phone, narrow phone and short desktop sizes. All five preview/PDF pairs were checked for loaded images, preserved displayed aspect ratios and correct local paths; image actions were clicked on desktop/mobile and separate PDF links on desktop at both mounts. PDF responses use application/pdf and match the intended public file bytes. Existing navigation, galleries, keyboard/touch/focus and résumé actions also pass, with zero app console/network errors. Desktop and mobile workshop screenshots were visually inspected. Native Windows PDF rendering confirms the updated résumé remains a legible one-page PDF. No push or deployment was performed.
