import { useState } from 'react'
import { ChevronDown, Maximize2 } from 'lucide-react'
import { featuredCaseStudies } from '../../data/featuredProjects'
import type { FeaturedCaseStudy } from '../../data/featuredProjects'
import { assetUrl } from '../../lib/assetUrl'
import { ScreenshotViewer } from '../ui/ScreenshotViewer'
import type { GalleryImage } from '../ui/ScreenshotViewer'
import { SectionHeading } from '../ui/SectionHeading'

interface ActiveImage {
  images: readonly GalleryImage[]
  index: number
  trigger: HTMLButtonElement
}

type OpenImage = (images: readonly GalleryImage[], index: number, trigger: HTMLButtonElement) => void

interface CaseStudyProps {
  project: FeaturedCaseStudy
  onOpen: OpenImage
}

function ProjectScreenshot({ images, index, cover = false, onOpen }: {
  images: readonly GalleryImage[]
  index: number
  cover?: boolean
  onOpen: OpenImage
}) {
  const image = images[index]
  return (
    <figure className={cover ? 'project-screenshot case-study__cover' : 'project-screenshot'}>
      <button className="project-screenshot__trigger" type="button" aria-label={`Enlarge ${image.title} screenshot`} onClick={event => onOpen(images, index, event.currentTarget)}>
        <img src={assetUrl(image.image)} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
        <span aria-hidden="true"><Maximize2 size={15} /> Enlarge</span>
      </button>
      <figcaption>
        <strong>{image.title}</strong>
        {!cover && <span>{image.caption}</span>}
      </figcaption>
    </figure>
  )
}

function CaseStudy({ project, onOpen }: CaseStudyProps) {
  const { id, context, workflow, contribution, coverIndex } = project
  const [expanded, setExpanded] = useState(false)
  return (
    <article className="case-study" aria-labelledby={`${id}-title`}>
      <div className="case-study__overview">
        <div className="case-study__summary">
          <h3 id={`${id}-title`}>{project.title}</h3>
          <p className="case-study__context">{context}</p>
          <p className="case-study__workflow">{workflow}</p>
          <p className="case-study__contribution"><strong>My contribution:</strong> {contribution}</p>
          <ul className="case-study__technologies" aria-label={`${project.title} key technologies`}>
            {project.technologies.slice(0, 4).map(technology => <li key={technology}>{technology}</li>)}
          </ul>
        </div>
        <ProjectScreenshot images={project.gallery} index={coverIndex} cover onOpen={onOpen} />
        <button
          id={`${id}-toggle`}
          className="case-study__toggle"
          type="button"
          aria-expanded={expanded}
          aria-controls={`${id}-details`}
          aria-label={`${expanded ? 'Hide' : 'View'} project details: ${project.title}`}
          onClick={() => setExpanded(current => !current)}
        >
          {expanded ? 'Hide project details' : 'View project details'}
          <ChevronDown aria-hidden="true" size={17} />
        </button>
      </div>
      <div id={`${id}-details`} className="case-study__details" role="region" aria-label={`${project.title} details`} hidden={!expanded}>
        {project.details.map(group => (
          <section className="case-study__detail-group" aria-label={group.title} key={group.title}>
            <h4>{group.title}</h4>
            <p className="case-study__context">{group.context}</p>
            <dl className="case-study__facts">
              {group.facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{fact.text}</dd></div>)}
            </dl>
            <div className="case-study__screenshots">
              {group.screenshotIndices.map(index => <ProjectScreenshot key={project.gallery[index].image} images={project.gallery} index={index} onOpen={onOpen} />)}
            </div>
          </section>
        ))}
      </div>
    </article>
  )
}

export function ProjectSection() {
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null)
  const openImage: OpenImage = (images, index, trigger) => setActiveImage({ images, index, trigger })
  return (
    <section id="project" className="content-section section-card" aria-labelledby="project-title">
      <SectionHeading id="project-title" number="01" title="Featured projects" description="Selected applications and my role in each." />
      <div className="case-study-list">
        {featuredCaseStudies.map(project => <CaseStudy key={project.id} project={project} onOpen={openImage} />)}
      </div>
      {activeImage && <ScreenshotViewer images={activeImage.images} initialIndex={activeImage.index} trigger={activeImage.trigger} onClose={() => setActiveImage(null)} />}
    </section>
  )
}
