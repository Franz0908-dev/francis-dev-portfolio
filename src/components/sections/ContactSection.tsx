import { ArrowUpRight, BookOpen, Download, GitFork, UserRound, Mail } from 'lucide-react'
import { profile } from '../../data/portfolio'
import { ActionLink } from '../ui/ActionLink'
import { SectionHeading } from '../ui/SectionHeading'

export function ContactSection() {
  return (
    <section id="contact" className="contact-section section-card" aria-labelledby="contact-title">
      <div>
        <SectionHeading id="contact-title" number="05" title="Contact" description="For roles and web projects" />
        <p>
          For a junior developer role or a web project, email me with the role, scope, and timeline. You can also find me on LinkedIn and GitHub.
        </p>
      </div>
      <div className="contact-links">
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          <span><UserRound aria-hidden="true" /> LinkedIn</span>
          <strong>Francis Lee Recanil</strong>
          <ArrowUpRight aria-hidden="true" />
        </a>
        <a href={`mailto:${profile.email}`}>
          <span><Mail aria-hidden="true" /> Email</span>
          <strong>{profile.email}</strong>
          <ArrowUpRight aria-hidden="true" />
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          <span><GitFork aria-hidden="true" /> GitHub</span>
          <strong>github.com/Franz0908-dev</strong>
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="contact-actions">
        <ActionLink href={profile.resume} target="_blank" rel="noreferrer" icon={<BookOpen size={18} />} variant="primary">
          View resume
        </ActionLink>
        <ActionLink href={profile.resume} download="Francis-Lee-Recanil-Resume.pdf" icon={<Download size={18} />}>
          Download resume
        </ActionLink>
      </div>
      <footer>
        <span>FRANCIS.DEV</span>
        <span>Built with React, TypeScript, and Tailwind CSS.</span>
      </footer>
    </section>
  )
}
