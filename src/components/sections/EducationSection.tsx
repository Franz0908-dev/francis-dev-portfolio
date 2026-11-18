import { GraduationCap } from 'lucide-react'
import { education } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'

export function EducationSection() {
  return (
    <section id="education" className="content-section section-card" aria-labelledby="education-title">
      <SectionHeading id="education-title" number="03" title="Education" />
      <article className="education-card">
        <div className="education-card__icon"><GraduationCap aria-hidden="true" /></div>
        <p className="education-period">{education.period}</p>
        <h3>{education.program}</h3>
        <p>{education.school}</p>
        <strong>{education.status}</strong>
      </article>
    </section>
  )
}
