import { Award, GraduationCap } from 'lucide-react'
import { certifications, education } from '../../data/portfolio'
import { SectionHeading } from '../ui/SectionHeading'

export function EducationSection() {
  return (
    <section id="education" className="content-section section-card" aria-labelledby="education-title">
      <SectionHeading
        eyebrow="04 / Education"
        title="A foundation in computer engineering studies."
        description="Education and verified training presented clearly without implying degree completion."
      />

      <div className="education-layout">
        <article className="education-card">
          <div className="education-card__icon"><GraduationCap aria-hidden="true" /></div>
          <p className="education-period">{education.period}</p>
          <h3 id="education-title">{education.program}</h3>
          <p>{education.school}</p>
          <strong>{education.status}</strong>
        </article>

        <div className="training-card">
          <h3><Award aria-hidden="true" size={20} /> Certifications and training</h3>
          <ul>
            {certifications.map((item) => (
              <li key={item.title}>
                <span>{item.title}</span>
                <small>{item.issuer}{item.detail ? ` · ${item.detail}` : ''}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
