import { Sparkles } from 'lucide-react'
import { aiTools, technologies } from '../../data/portfolio'
import type { Technology } from '../../types/portfolio'
import { SectionHeading } from '../ui/SectionHeading'

function TechnologyCard({ technology }: { technology: Technology }) {
  return (
    <li className="technology-card">
      <img src={technology.icon} alt="" aria-hidden="true" width="38" height="38" />
      <span>{technology.name}</span>
      {technology.iconKind === 'neutral' && <small>Neutral symbol</small>}
    </li>
  )
}

export function TechStackSection() {
  return (
    <section id="skills" className="content-section section-card" aria-labelledby="skills-title">
      <SectionHeading
        eyebrow="03 / Tech stack"
        title="Tools used to build and improve web applications."
        description="Core development technologies are kept separate from AI-assisted workflow tools."
      />

      <div className="skills-panel">
        <div>
          <h3 id="skills-title">Development technologies</h3>
          <ul className="technology-grid">
            {technologies.map((technology) => <TechnologyCard key={technology.name} technology={technology} />)}
          </ul>
        </div>

        <div className="ai-panel">
          <div className="ai-panel__heading">
            <Sparkles aria-hidden="true" size={19} />
            <div>
              <h3>AI-assisted development tools</h3>
              <p>Used for explanation, ideation, code review, debugging support, and validation—with human review and adaptation.</p>
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
