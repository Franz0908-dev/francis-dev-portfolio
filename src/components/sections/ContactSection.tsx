import { ArrowUpRight, BookOpen, Download, GitFork, Mail } from 'lucide-react'
import { profile } from '../../data/portfolio'
import { ActionLink } from '../ui/ActionLink'

export function ContactSection() {
  return (
    <section id="contact" className="contact-section section-card" aria-labelledby="contact-title">
      <div>
        <p className="section-eyebrow">05 / Contact</p>
        <h2 id="contact-title">Let’s start a professional conversation.</h2>
        <p>
          For opportunities or project discussions, email is the most direct way to get in touch. You can also review my public GitHub profile and resume.
        </p>
      </div>
      <div className="contact-links">
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
