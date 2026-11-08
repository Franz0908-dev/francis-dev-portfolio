# Read-Only Consistency Audit

No files were modified during the audit. The current portfolio contains **2 critical, 8 moderate, and 5 minor inconsistencies or documentation gaps** against the approved facts.

## Critical inconsistencies

### C1. Education status is factually incorrect

- **File:** `src/data/portfolio.ts:170`
- **Current wording:** `Undergraduate — Completed Third Year`
- **Conflict:** The approved status is “Undergraduate Studies — Through Third Year, First Semester.” “Completed Third Year” is explicitly prohibited.
- **Proposed replacement:** `Undergraduate Studies — Through Third Year, First Semester`
- **Severity:** Critical

This outdated wording is also enforced by:

- **File:** `src/App.test.tsx:18`
- **Current wording:** `Undergraduate — Completed Third Year`
- **Proposed replacement:** `Undergraduate Studies — Through Third Year, First Semester`

### C2. Education heading implies continuing or current enrollment

- **File:** `src/components/sections/EducationSection.tsx:10`
- **Current wording:** `A technical foundation still in progress.`
- **Conflict:** The approved facts state that Francis is not currently enrolled. “Still in progress” can reasonably be understood as active enrollment.
- **Proposed replacement:** `A foundation in computer engineering studies.`
- **Severity:** Critical

The existing description at line 11 correctly avoids claiming graduation and can remain:

> `Education and verified training presented clearly without implying degree completion.`

## Moderate inconsistencies

### M1. Internship summary omits the approved AI-assisted workflow and uses broader contribution language

- **File:** `src/data/portfolio.ts:31-32`
- **Current wording:**  
  `Worked with a development team on a Sales and Inventory System, contributing across interface, application, database, testing, and debugging tasks.`
- **Conflict:** The approved facts specifically establish AI-assisted coding, personal review of AI-generated code, testing in the running application, and participation in debugging and refinement. The current wording omits these facts and broadly implies contribution across entire application layers.
- **Proposed replacement:**  
  `Worked with a development team on a Sales and Inventory System using AI-assisted coding tools. Personally reviewed AI-generated code, tested changes in the running application, and participated in debugging and refinement.`
- **Severity:** Moderate

### M2. Internship contribution labels may imply personal ownership of complete modules

- **File:** `src/data/portfolio.ts:33-40`
- **Current wording:**
  - `Inventory and product management`
  - `Supplier management`
  - `Dashboard and reporting functionality`
  - `Low-stock alerts`
  - `Frontend UI and React components`
  - `Backend and database integration`
  - `Debugging, testing, and collaboration`
- **Conflict:** These noun-phrase labels appear under “Relevant internship work” and can be read as personal implementation ownership of complete modules. The approved facts do not establish that entire modules were personally implemented.
- **Proposed replacement:**
  - `AI-assisted coding workflow`
  - `Personal review of AI-generated code`
  - `Testing changes in the running application`
  - `Debugging and refinement`
  - `Team collaboration`
- **Severity:** Moderate

If the named system areas must remain visible, they should be labelled as team-developed system areas rather than personal module ownership.

### M3. Featured-project description overstates module-level personal contribution

- **File:** `src/data/portfolio.ts:48-49`
- **Current wording:**  
  `Collaborated with a development team to build and improve features for a Sales and Inventory System. Contributed to inventory, product, and supplier management modules, dashboard and reporting functionality, and low-stock alerts. Supported frontend, backend, database, and debugging tasks.`
- **Conflict:** Team attribution is correct, but the wording assigns specific module and application-layer contributions beyond the approved facts. It also omits AI-assisted coding, personal review, running-application testing, and refinement.
- **Proposed replacement:**  
  `Collaborated with a development team on a Sales and Inventory System using AI-assisted coding tools. Personally reviewed AI-generated code, tested changes in the running application, and participated in debugging and refinement. The system screens represent team-developed functionality and do not imply sole or complete module ownership.`
- **Severity:** Moderate

### M4. Project-area presentation still implies personal contribution to named modules

- **Files:**
  - `src/data/portfolio.ts:50`
  - `src/components/sections/ProjectSection.tsx:138-144`
- **Current wording:**
  - `areas: ['Inventory', 'Products', 'Suppliers', 'Dashboard', 'Reports', 'Low-stock alerts']`
  - `Contributed areas`
- **Conflict:** The approved facts do not confirm personal implementation responsibility for each named area. The existing boundary correctly denies sole ownership, but “Contributed areas” still presents the list as individually attributable work.
- **Proposed replacement heading:** `Team-developed system areas`
- **Proposed explanatory wording:**  
  `Selected areas of the team-developed system; inclusion does not imply sole or complete implementation ownership.`
- **Severity:** Moderate

The screenshots do not need to be removed or replaced.

### M5. BCP development context omits material limitations and responsibilities

- **File:** `src/data/portfolio.ts:93-94`
- **Current wording:**  
  `Independently developed as an academic project and built and refined with AI-assisted development.`
- **Conflict:** It does not explain that Francis directed the AI-assisted implementation process, tested features in the running application, and performed only limited manual source-code review.
- **Proposed replacement:**  
  `Solo academic project developed through an AI-assisted workflow. Directed the implementation process and tested features in the running application; manual source-code review was limited.`
- **Severity:** Moderate

This replacement preserves solo-project attribution without overstating traditional manual implementation.

### M6. Generic AI disclosure can imply a consistent level of code review across both projects

- **File:** `src/components/sections/TechStackSection.tsx:38`
- **Current wording:**  
  `Used for explanation, ideation, code review, debugging support, and validation—with human review and adaptation.`
- **Conflict:** The BCP facts state that manual source-code review was limited. The generic statement may be interpreted as claiming thorough human code review for all AI-assisted work.
- **Proposed replacement:**  
  `Used for explanation, ideation, code generation, debugging support, and validation. Review depth varied by project and is disclosed in each case study.`
- **Severity:** Moderate

### M7. BCP technology list contains items outside the approved stack

- **File:** `src/data/portfolio.ts:96-108`
- **Current wording:**
  - `C#`
  - `ASP.NET Core MVC`
  - `Razor`
  - `Entity Framework Core`
  - `SQLite`
  - `HTML`
  - `CSS`
  - `JavaScript`
  - `Bootstrap`
  - `FullCalendar`
  - `Chart.js`
- **Conflict:** The approved stack does not include HTML or CSS as separately claimed technologies. The approved naming is EF Core.
- **Proposed replacement:**
  - `ASP.NET Core MVC`
  - `C#`
  - `EF Core`
  - `SQLite`
  - `Razor`
  - `JavaScript`
  - `Bootstrap`
  - `FullCalendar`
  - `Chart.js`
- **Severity:** Moderate

HTML and CSS may be implicit in the application, but they should not be presented as approved project-stack claims without confirmation.

### M8. Outdated local documentation conflicts with the approved education facts

- **File:** `FRANCIS_DEV_V2_READY_ASSETS/docs/PORTFOLIO_BRIEF.md:14`
- **Current wording:**  
  `Education: BS Computer Engineering undergraduate, completed third year, Bestlink College of the Philippines, 2022–2025. Never state graduated.`
- **Conflict:** “Completed third year” is no longer approved. The approved status is through Third Year, First Semester, and not currently enrolled.
- **Proposed replacement:**  
  `Education: Bachelor of Science in Computer Engineering, Bestlink College of the Philippines, 2022–2025. Undergraduate Studies — Through Third Year, First Semester. Not currently enrolled. Do not claim graduation, completed third year, current enrollment, or a confirmed return date.`
- **Severity:** Moderate

## Minor inconsistencies

### m1. Project-section introduction overstates verification and documentation

- **File:** `src/components/sections/ProjectSection.tsx:122`
- **Current wording:**  
  `Two verified project case studies with authentic screens, distinct development contexts, and clearly documented contributions.`
- **Conflict:** The current Sales case study does not document the approved AI workflow and uses contribution wording that exceeds the approved facts. “Verified” is also undefined.
- **Proposed replacement:**  
  `Two project case studies with selected system screens and clearly separated team and solo development contexts.`
- **Severity:** Minor

### m2. “Verified technology stack” is unnecessarily strong

- **File:** `src/components/sections/ProjectSection.tsx:174`
- **Current wording:** `Verified technology stack`
- **Conflict:** The approved stack can be presented as a fact, but the portfolio does not explain an independent verification process.
- **Proposed replacement:** `Project technology stack`
- **Severity:** Minor

### m3. Navigation still uses singular “Featured Project”

- **File:** `src/data/portfolio.ts:19`
- **Current wording:**  
  `{ id: 'project', label: 'Featured Project', shortLabel: 'Project' }`
- **Conflict:** The current local portfolio displays two project case studies.
- **Proposed replacement:**  
  `{ id: 'project', label: 'Featured Projects', shortLabel: 'Projects' }`
- **Severity:** Minor

### m4. README asset-location statement is incomplete

- **File:** `README.md:31`
- **Current wording:**  
  `Runtime media and icons are stored under public/assets, with license and provenance notices under public/assets/licenses.`
- **Conflict:** The BCP gallery is stored under `public/images/bcp-lab-reservation/`, not `public/assets/`.
- **Proposed replacement:**  
  `Runtime media is stored under public/assets and public/images, with license and provenance notices under public/assets/licenses.`
- **Severity:** Minor

Alternatively, the media directories could later be consolidated, but no folder change is required for this consistency correction.

### m5. The previous local audit report contains an outdated education recommendation

- **File:** `PORTFOLIO_AUDIT_REPORT.md:300` in the report that preceded this consistency audit
- **Current wording in that earlier report:**  
  `“Undergraduate; completed third year” is safer than implying ongoing enrollment unless active status is confirmed.`
- **Conflict:** “Completed third year” is explicitly prohibited by the newly approved facts.
- **Proposed replacement:**  
  `Use “Undergraduate Studies — Through Third Year, First Semester” and state that Francis is not currently enrolled. Do not imply graduation, completed third year, current enrollment, or a confirmed return date.`
- **Severity:** Minor

The earlier report was untracked and not displayed by the application, but it should not be treated as an authoritative content source in its earlier form. This consistency audit supersedes that recommendation.

## Public-versus-local differences

### Publicly committed project page is behind the latest local project

The committed `HEAD` version of `ProjectSection.tsx` publicly documents:

> `Presented as a text-first case study until authentic project media is available and approved.`

The latest local version now contains:

- Two project case studies
- Eight screenshot gallery entries
- A lightbox
- The BCP Laboratory Reservation System
- New “verified” and “authentic” wording

The corresponding source changes and all screenshot directories remain uncommitted. Therefore, the public GitHub source does not yet document the current local BCP case study or galleries.

### The public committed education status is also outdated

The committed public `src/data/portfolio.ts` contains the same incorrect wording:

> `Undergraduate — Completed Third Year`

Updating only the local display later would not be sufficient; the committed source and its test expectation would also need to be updated together after approval.

### README does not document either case study

`README.md` contains no project-specific attribution or AI-assistance details. It therefore does not contradict the approved project facts, but it also does not document the latest local project additions.

## Content confirmed consistent

The following current content agrees with the approved facts and should be preserved.

### Internship

- `src/data/portfolio.ts:26` — `Chimes Consulting`
- `src/data/portfolio.ts:27` — `Full Stack Web Developer Intern`
- `src/data/portfolio.ts:28` — `July 18 – August 5, 2026`
- `src/data/portfolio.ts:29` — `300 internship hours`
- `src/data/portfolio.ts:176` — `300-Hour Internship Certificate`, Chimes Consulting, 2026
- `src/components/sections/ExperienceSection.tsx:33-35` — company-issued completion-certificate wording

The dates and hours should remain unchanged as instructed.

### Education

- `src/data/portfolio.ts:169` — `Bachelor of Science in Computer Engineering`
- `src/data/portfolio.ts:171` — `Bestlink College of the Philippines`
- `src/data/portfolio.ts:172` — `2022–2025`
- No graduation claim is present.

### Sales and Inventory System

- `src/data/portfolio.ts:47` — `Team-developed project`
- `src/components/sections/ProjectSection.tsx:133-136` explicitly says no sole ownership is claimed.
- No current wording explicitly claims sole development.

### BCP Laboratory Reservation System

- `src/data/portfolio.ts:89` — `Solo Academic Project`
- `src/data/portfolio.ts:90` — `AI-Assisted Development`
- Gallery wording uses demo framing for the administrator dashboard.
- No production-deployment or institutional-adoption claim was found.
- No screenshot removal or replacement is required by this consistency audit.

## Resume-reference result

The local resume exists at:

`public/documents/francis-lee-recanil-resume.pdf`

The application consistently references that path from the sidebar, hero, contact section, tests, and README. The PDF is accessible as a valid local file, but its text could not be reliably extracted in the available read-only environment. Its education wording, enrollment status, internship workflow, and project claims therefore remain **unverified by this audit** and should be manually compared against the approved facts before any future resume revision.

## Final audit status

No application source, documentation source, resume, screenshot, Git history, remote repository, or deployment was changed during the audit. This report records proposed wording only. Explicit approval is required before implementing any correction.
