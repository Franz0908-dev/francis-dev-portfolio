import { ArrowDown, BookOpen, Download, GitFork, Mail } from 'lucide-react'
import { profile } from '../../data/portfolio'
import { ActionLink } from '../ui/ActionLink'

export function HeroSection() {
  return (
    <section id="introduction" className="hero section-card" aria-labelledby="hero-title">
      <div className="hero__art" aria-hidden="true" />
      <div className="hero__content">
        <p className="hero__kicker">Welcome to my portfolio</p>
        <h1 id="hero-title">{profile.headline}</h1>
        <p className="hero__intro">{profile.introduction}</p>
        <div className="hero__actions" aria-label="Primary portfolio actions">
          <ActionLink href={`mailto:${profile.email}`} icon={<Mail size={18} />} variant="primary">
            Contact me
          </ActionLink>
          <ActionLink href={profile.github} target="_blank" rel="noreferrer" icon={<GitFork size={18} />}>
            GitHub
          </ActionLink>
          <ActionLink href={profile.resume} target="_blank" rel="noreferrer" icon={<BookOpen size={18} />}>
            View resume
          </ActionLink>
          <ActionLink href={profile.resume} download="Francis-Lee-Recanil-Resume.pdf" icon={<Download size={18} />}>
            Download resume
          </ActionLink>
        </div>
      </div>
      <a className="hero__scroll" href="#experience">
        <span>Explore experience</span>
        <ArrowDown aria-hidden="true" size={16} />
      </a>
    </section>
  )
}
