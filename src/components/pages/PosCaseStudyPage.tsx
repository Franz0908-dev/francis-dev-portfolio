import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ExternalLink, GitFork, Maximize2, MoveRight, X } from 'lucide-react'
import { posProject } from '../../data/portfolio'

const featureGroups = [
  ['Product catalog and variants', 'Variant-specific pricing and product options remain explicit throughout catalog and checkout flows.'],
  ['POS checkout', 'A focused checkout path supports cart review, customer context, payment, and receipt workflows.'],
  ['Branch-aware inventory', 'Stock is keyed by branch and variant so size-level availability is not collapsed into a single balance.'],
  ['Shared packaging stock', 'Cups and lids can be mapped to variants and consumed through explicit packaging policies.'],
  ['Customer and loyalty management', 'Customer records and loyalty accrual are included in the local operational workflow.'],
  ['Reporting', 'Sales, inventory, and operational summaries support review of the local system state.'],
] as const

const engineeringChallenges = [
  ['Variant-specific pricing', 'The system keeps product variants as first-class records and recomputes the authoritative price during checkout.', 'This prevents a display-only size choice from becoming an ambiguous or client-controlled amount.'],
  ['Inventory consistency during checkout', 'Checkout runs inventory updates, sale creation, movement records, loyalty accrual, and audit work inside one SQLite transaction.', 'Failures roll back together, while conditional stock changes and request IDs protect against underflow and duplicate retries.'],
  ['Shared packaging consumption', 'Packaging demand is aggregated from explicit per-variant mappings and selected policies.', 'The approach avoids inferring cup or lid usage and prevents shared balances from being deducted twice.'],
  ['Safe public demonstration', 'The recruiter demo is built as a separate static browser-only experience with fictional fixture data.', 'It can demonstrate the interface without exposing operational SQLite data, private APIs, accounts, or live business transactions.'],
] as const

export function PosCaseStudyPage() {
  const [activeImage, setActiveImage] = useState<(typeof posProject.gallery)[number] | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!activeImage) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setActiveImage(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeImage])

  return (
    <main className="case-study-page">
      <div className="case-study-shell">
        <a className="case-study-back" href="/#project"><ArrowLeft size={17} /> Back to Projects</a>

        <header className="case-study-hero">
          <div>
            <p className="case-study-eyebrow">Featured Project 03 / {posProject.context}</p>
            <h1>{posProject.title}</h1>
            <p className="case-study-lede">A café-focused POS and inventory system designed around variant-level pricing, branch-aware stock, shared packaging, and dependable local checkout workflows.</p>
            <div className="case-study-actions">
              <a className="action-link action-link--primary" href={posProject.liveDemo} target="_blank" rel="noreferrer"><ExternalLink size={17} /><span>Explore Live Demo</span></a>
              <a className="action-link action-link--secondary" href={posProject.github} target="_blank" rel="noreferrer"><GitFork size={17} /><span>View GitHub Repository</span></a>
            </div>
          </div>
          <figure className="case-study-hero__media">
            <img src={posProject.gallery[0].image} alt={posProject.gallery[0].alt} width={posProject.gallery[0].width} height={posProject.gallery[0].height} />
            <figcaption>Isolated fictional QA screenshot from the POS project.</figcaption>
          </figure>
        </header>

        <section className="case-study-snapshot" aria-label="Project snapshot">
          <div><span>Project type</span><strong>Full-stack web application</strong></div>
          <div><span>Operational model</span><strong>Local Express API + SQLite</strong></div>
          <div><span>Public demo</span><strong>Static isolated simulation</strong></div>
          <div><span>Primary focus</span><strong>Checkout and inventory rules</strong></div>
        </section>

        <section className="case-study-section" aria-labelledby="overview-title">
          <p className="case-study-eyebrow">01 / Project overview</p>
          <h2 id="overview-title">A practical system for café operations.</h2>
          <div className="case-study-columns">
            <div><h3>Business problem</h3><p>The project brings ordering, product configuration, branch stock, packaging, customer records, and reporting into one focused operational workflow.</p></div>
            <div><h3>Intended users</h3><p>Local café staff and managers who need clear catalog, checkout, inventory, customer, and reporting interfaces without relying on a remote production service.</p></div>
            <div><h3>Project goals</h3><p>Keep pricing and stock rules explicit, make checkout changes auditable, and provide a realistic recruiter demo without exposing private operational data.</p></div>
          </div>
        </section>

        <section className="case-study-section" aria-labelledby="architecture-title">
          <p className="case-study-eyebrow">02 / Technology & architecture</p>
          <h2 id="architecture-title">A local full-stack application with a separate public demo.</h2>
          <div className="architecture-flow"><span>React / TypeScript / Vite</span><MoveRight size={18} /><span>Node.js / Express</span><MoveRight size={18} /><span>Prisma / SQLite</span></div>
          <p className="case-study-note">The operational POS is intended for local development and runs as a full-stack application. The public recruiter demo is an isolated static interactive simulation; it does not connect to the operational SQLite database or private APIs.</p>
        </section>

        <section className="case-study-section" aria-labelledby="features-title">
          <p className="case-study-eyebrow">03 / Key features</p>
          <h2 id="features-title">Capabilities organized around real operational rules.</h2>
          <div className="case-study-feature-grid">{featureGroups.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section className="case-study-section" aria-labelledby="challenges-title">
          <p className="case-study-eyebrow">04 / Engineering challenges</p>
          <h2 id="challenges-title">Making system rules visible and testable.</h2>
          <div className="case-study-challenges">{engineeringChallenges.map(([title, approach, result]) => <article key={title}><h3>{title}</h3><p><strong>Approach:</strong> {approach}</p><p><strong>Result:</strong> {result}</p></article>)}</div>
        </section>

        <section className="case-study-section" aria-labelledby="qa-title">
          <p className="case-study-eyebrow">05 / Quality assurance</p>
          <h2 id="qa-title">Verified locally, with limitations stated clearly.</h2>
          <p>The POS repository documents passing TypeScript, ESLint, production build, and 55 automated unit/API/integration tests. Its Chromium regression suite records 42 passing checks, with a focused packaging suite recording 7 checks. These results cover the local full-stack application and disposable fictional fixtures; the static recruiter demo is tested separately and does not prove operational backend behavior.</p>
          <p className="case-study-note">No production deployment, load test, public business transaction, or operational database exposure is claimed. Safari, Firefox, manual screen-reader interaction, and physical printer validation remain outside the documented verification scope.</p>
        </section>

        <section className="case-study-section" aria-labelledby="gallery-title">
          <p className="case-study-eyebrow">06 / Project gallery</p>
          <h2 id="gallery-title">Selected screens from isolated fictional fixtures.</h2>
          <div className="case-study-gallery">{posProject.gallery.map((item) => <figure key={item.title}><button className="case-study-gallery__trigger" type="button" onClick={() => setActiveImage(item)} aria-label={`Enlarge ${item.title} screenshot`}><img src={item.image} alt={item.alt} width={item.width} height={item.height} loading="lazy" /><span aria-hidden="true"><Maximize2 size={16} /> Enlarge</span></button><figcaption><strong>{item.title}</strong><span>{item.caption}</span></figcaption></figure>)}</div>
        </section>

        <footer className="case-study-footer">
          <a className="action-link action-link--primary" href={posProject.liveDemo} target="_blank" rel="noreferrer"><ExternalLink size={17} /><span>Explore Live Demo</span></a>
          <a className="action-link action-link--secondary" href={posProject.github} target="_blank" rel="noreferrer"><GitFork size={17} /><span>View GitHub Repository</span></a>
          <a className="action-link action-link--quiet" href="/#project"><ArrowLeft size={17} /><span>Back to Projects</span></a>
        </footer>

        {activeImage && <div className="case-study-lightbox" role="dialog" aria-modal="true" aria-labelledby="case-study-lightbox-title" aria-describedby="case-study-lightbox-caption" onMouseDown={(event) => { if (event.target === event.currentTarget) setActiveImage(null) }}>
          <figure className="case-study-lightbox__content">
            <button className="case-study-lightbox__close" type="button" ref={closeButtonRef} onClick={() => setActiveImage(null)} aria-label="Close enlarged screenshot"><X size={20} /><span>Close</span></button>
            <img src={activeImage.image} alt={activeImage.alt} width={activeImage.width} height={activeImage.height} />
            <figcaption><strong id="case-study-lightbox-title">{activeImage.title}</strong><span id="case-study-lightbox-caption">{activeImage.caption}</span></figcaption>
          </figure>
        </div>}
      </div>
    </main>
  )
}
