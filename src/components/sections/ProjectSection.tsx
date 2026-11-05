import { useEffect, useRef, useState } from 'react'
import {
  Boxes,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardCheck,
  GraduationCap,
  Maximize2,
  MonitorCog,
  PackageSearch,
  Sparkles,
  TriangleAlert,
  UsersRound,
  X,
} from 'lucide-react'
import { academicProject, featuredProject } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'

interface GalleryImage {
  readonly title: string
  readonly caption: string
  readonly image: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

interface ActiveImage {
  image: GalleryImage
  trigger: HTMLButtonElement
}

interface ProjectGalleryProps {
  id: string
  images: readonly GalleryImage[]
  onOpen: (image: GalleryImage, trigger: HTMLButtonElement) => void
}

const moduleIcons = [PackageSearch, Boxes, UsersRound, ChartNoAxesCombined, ChartNoAxesCombined, TriangleAlert]
const academicFeatureIcons = [CalendarDays, ClipboardCheck, ChartNoAxesCombined, MonitorCog]

function ProjectGallery({ id, images, onOpen }: ProjectGalleryProps) {
  return (
    <div className="project-showcase" aria-labelledby={`${id}-showcase-title`}>
      <div className="project-showcase__heading">
        <p>Project showcase</p>
        <h4 id={`${id}-showcase-title`}>Selected system screens</h4>
        <span>Select any image to view it at a larger size.</span>
      </div>

      <div className="project-gallery">
        {images.map((item) => (
          <figure className="project-gallery__item" key={item.title}>
            <button
              className="project-gallery__trigger"
              type="button"
              onClick={(event) => onOpen(item, event.currentTarget)}
              aria-label={`Enlarge ${item.title} screenshot`}
            >
              <img
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
              />
              <span aria-hidden="true"><Maximize2 size={17} /> Enlarge</span>
            </button>
            <figcaption>
              <strong>{item.title}</strong>
              <span>{item.caption}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

export function ProjectSection() {
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null)
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

      if (event.key === 'Tab') {
        event.preventDefault()
        closeButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      activeImage.trigger.focus()
    }
  }, [activeImage])

  const openImage = (image: GalleryImage, trigger: HTMLButtonElement) => {
    setActiveImage({ image, trigger })
  }

  return (
    <section id="project" className="content-section section-card" aria-labelledby="project-title">
      <SectionHeading
        eyebrow="02 / Featured projects"
        title="Practical systems built through teamwork and independent development."
        description="Two project case studies with selected system screens and clearly separated team and solo development contexts."
      />

      <div className="project-entry">
        <p className="project-entry__number">Project 01</p>
        <article className="project-card">
          <div className="project-card__copy">
            <div className="project-label"><UsersRound size={16} /> {featuredProject.badge}</div>
            <p className="project-context">{featuredProject.context}</p>
            <h3 id="project-title">{featuredProject.title}</h3>
            <p>{featuredProject.description}</p>
            <div className="project-boundary">
              <strong>Contribution context</strong>
              <span>Team functionality and individual contributions are described separately; no sole ownership is claimed.</span>
            </div>
          </div>
          <div className="module-map" aria-label="Team-developed system areas">
            <p>Team-developed system areas</p>
            <div className="module-map__grid">
              {featuredProject.areas.map((area, index) => {
                const Icon = moduleIcons[index]
                return <span key={area}><Icon aria-hidden="true" size={19} /> {area}</span>
              })}
            </div>
          </div>
        </article>

        <ProjectGallery id="sales-inventory" images={featuredProject.gallery} onOpen={openImage} />
      </div>

      <div className="project-entry">
        <p className="project-entry__number">Project 02</p>
        <article className="project-card project-card--academic">
          <div className="project-card__copy">
            <div className="project-label"><Sparkles size={16} /> {academicProject.badge}</div>
            <p className="project-context">{academicProject.context}</p>
            <h3>{academicProject.title}</h3>
            <p>{academicProject.description}</p>
            <div className="project-boundary">
              <strong>Development context</strong>
              <span>{academicProject.developmentContext}</span>
            </div>
          </div>
          <div className="module-map module-map--academic" aria-label="Academic project features and technology stack">
            <p>Core features</p>
            <div className="module-map__grid module-map__grid--compact">
              {academicProject.features.map((feature, index) => {
                const Icon = academicFeatureIcons[index]
                return <span key={feature}><Icon aria-hidden="true" size={19} /> {feature}</span>
              })}
            </div>
            <div className="project-stack">
              <p><GraduationCap aria-hidden="true" size={17} /> Project technology stack</p>
              <ul>
                {academicProject.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            </div>
          </div>
        </article>

        <ProjectGallery id="bcp-lab-reservation" images={academicProject.gallery} onOpen={openImage} />
      </div>

      {activeImage && (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-lightbox-title"
          aria-describedby="project-lightbox-caption"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveImage(null)
          }}
        >
          <figure className="project-lightbox__content">
            <button
              className="project-lightbox__close"
              type="button"
              ref={closeButtonRef}
              onClick={() => setActiveImage(null)}
              aria-label="Close enlarged screenshot"
            >
              <X aria-hidden="true" size={20} />
              <span>Close</span>
            </button>
            <img
              src={activeImage.image.image}
              alt={activeImage.image.alt}
              width={activeImage.image.width}
              height={activeImage.image.height}
              decoding="async"
            />
            <figcaption>
              <strong id="project-lightbox-title">{activeImage.image.title}</strong>
              <span id="project-lightbox-caption">{activeImage.image.caption}</span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
