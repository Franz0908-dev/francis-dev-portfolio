import { ArrowDown, BookOpen, Download, Mail } from 'lucide-react'
import { profile } from '../../data/portfolio'
import { ActionLink } from '../ui/ActionLink'

export function HeroSection() {
  return (
    <section id="introduction" className="hero section-card" aria-labelledby="hero-title">
      <div className="hero__art" aria-hidden="true">
        <img src={profile.hero} srcSet={`${profile.heroSmall} 768w, ${profile.hero} 1280w, ${profile.heroLarge} 1672w`} sizes="(min-width: 1024px) 78vw, 100vw" alt="" width="1672" height="941" fetchPriority="high" />
      </div>
      <div className="hero__content">
        <p className="hero__kicker">Web applications / Valenzuela, Philippines</p>
        <h1 id="hero-title">{profile.name}</h1>
        <p className="hero__role">{profile.headline}</p>
        <p className="hero__intro">{profile.introduction}</p>
        <div className="hero__actions" aria-label="Primary portfolio actions">
          <ActionLink href="#project" icon={<ArrowDown size={18} />} variant="primary">
            View projects
          </ActionLink>
          <ActionLink href={`mailto:${profile.email}`} icon={<Mail size={18} />}>
            Email me
          </ActionLink>
          <ActionLink href={profile.resume} target="_blank" rel="noreferrer" icon={<BookOpen size={18} />}>
            View resume
          </ActionLink>
          <ActionLink href={profile.resume} download="Francis-Lee-Recanil-Resume.pdf" icon={<Download size={18} />}>
            Download resume
          </ActionLink>
        </div>
      </div>
      <a className="hero__scroll" href="#project">
        <span>Explore projects</span>
        <ArrowDown aria-hidden="true" size={16} />
      </a>
    </section>
  )
}
