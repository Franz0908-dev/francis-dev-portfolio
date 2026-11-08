import { GitFork, Mail } from 'lucide-react'
import { navigation, profile } from '../../data/portfolio'
import type { SectionId } from '../../types/portfolio'

interface MobileHeaderProps {
  activeSection: SectionId
}

export function MobileHeader({ activeSection }: MobileHeaderProps) {
  return (
    <header className="mobile-header">
      <a className="brand" href="#introduction" aria-label="FRANCIS.DEV home">
        FRANCIS<span>.DEV</span>
      </a>
      <nav className="mobile-header__nav" aria-label="Tablet navigation">
        {navigation.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={activeSection === item.id ? 'location' : undefined}
          >
            {item.shortLabel}
          </a>
        ))}
      </nav>
      <div className="mobile-header__actions">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="Open GitHub profile">
          <GitFork aria-hidden="true" size={19} />
        </a>
        <a href={`mailto:${profile.email}`} aria-label="Email Francis Lee Recanil">
          <Mail aria-hidden="true" size={19} />
        </a>
      </div>
    </header>
  )
}
