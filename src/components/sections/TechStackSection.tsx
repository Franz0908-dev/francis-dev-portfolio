import { Sparkles } from 'lucide-react'
import { aiTools, technologies } from '../../data/portfolio'
import type { Technology } from '../../types/portfolio'
import { assetUrl } from '../../lib/assetUrl'
import { SectionHeading } from '../ui/SectionHeading'

function TechnologyCard({ technology }: { technology: Technology }) {
  return (
    <li className="technology-card">
      <img src={assetUrl(technology.icon)} alt="" aria-hidden="true" width="38" height="38" loading="lazy" />
      <span>{technology.name}</span>
      {technology.iconKind === 'neutral' && <small>Neutral symbol</small>}
    </li>
  )
}

export function TechStackSection() {
  return (
    <section id="skills" className="content-section section-card" aria-labelledby="skills-title">
      <SectionHeading
        id="skills-title"
        number="02"
        title="Skills & technologies"
        description="Laravel, React, and TypeScript in team work; ASP.NET Core MVC, C#, EF Core, and SQLite in the laboratory prototype."
      />

      <div className="skills-panel">
        <div>
          <h3>Development technologies</h3>
          <ul className="technology-grid">
            {technologies.map((technology) => <TechnologyCard key={technology.name} technology={technology} />)}
          </ul>
        </div>

        <div className="ai-panel">
          <div className="ai-panel__heading">
            <Sparkles aria-hidden="true" size={19} />
            <div>
              <h3>AI-assisted development tools</h3>
              <p>Used for explanations, code generation, and debugging. Project case studies describe my involvement and review scope.</p>
            </div>
          </div>
          <ul className="technology-grid technology-grid--ai">
            {aiTools.map((technology) => <TechnologyCard key={technology.name} technology={technology} />)}
          </ul>
          <p className="icon-disclosure">Neutral symbols identify these tools and are not official vendor logos.</p>
        </div>
      </div>
    </section>
  )
}
