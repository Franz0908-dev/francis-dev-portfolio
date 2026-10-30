import { Building2, CalendarDays, Check, Clock3 } from 'lucide-react'
import { internship } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'

export function ExperienceSection() {
  return (
    <section id="experience" className="content-section section-card" aria-labelledby="experience-title">
      <SectionHeading
        eyebrow="01 / Internship experience"
        title="Learning through practical team development."
        description="A focused internship experience covering the connected layers of a modern web application."
      />

      <div className="experience-card">
        <div className="experience-card__header">
          <div className="icon-tile"><Building2 aria-hidden="true" /></div>
          <div>
            <h3 id="experience-title">{internship.company}</h3>
            <p>{internship.role}</p>
          </div>
          <span className="status-pill"><Clock3 size={14} /> {internship.hours}</span>
        </div>
        <div className="experience-meta">
          <span><CalendarDays size={16} /> {internship.period}</span>
          <span><Building2 size={16} /> {internship.project}</span>
        </div>
        <p className="experience-summary">{internship.summary}</p>
        <ul className="contribution-grid" aria-label="Relevant internship work">
          {internship.contributions.map((item) => (
            <li key={item}><Check aria-hidden="true" size={16} /> {item}</li>
          ))}
        </ul>
        <p className="evidence-note">
          Completion of 300 internship hours is supported by a company-issued completion certificate.
        </p>
      </div>
    </section>
  )
}
