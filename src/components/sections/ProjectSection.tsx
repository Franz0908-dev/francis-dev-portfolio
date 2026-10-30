import { Boxes, ChartNoAxesCombined, PackageSearch, TriangleAlert, UsersRound } from 'lucide-react'
import { featuredProject } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'

const moduleIcons = [PackageSearch, Boxes, UsersRound, ChartNoAxesCombined, ChartNoAxesCombined, TriangleAlert]

export function ProjectSection() {
  return (
    <section id="project" className="content-section section-card" aria-labelledby="project-title">
      <SectionHeading
        eyebrow="02 / Featured project"
        title="A practical system shaped by collaboration."
        description="Presented as a text-first case study until authentic project media is available and approved."
      />

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
        <div className="module-map" aria-label="Contributed project areas">
          <p>Contributed areas</p>
          <div className="module-map__grid">
            {featuredProject.areas.map((area, index) => {
              const Icon = moduleIcons[index]
              return <span key={area}><Icon aria-hidden="true" size={19} /> {area}</span>
            })}
          </div>
        </div>
      </article>
    </section>
  )
}
