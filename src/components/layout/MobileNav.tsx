import { useEffect, useRef } from 'react'
import { Award, BriefcaseBusiness, CodeXml, GraduationCap, House, Layers3, Mail } from 'lucide-react'
import { navigation } from '../../data/portfolio'
import type { SectionId } from '../../types/portfolio'

const icons = {
  introduction: House, experience: BriefcaseBusiness, project: CodeXml,
  skills: Layers3, education: GraduationCap, certifications: Award, contact: Mail,
}

export function MobileNav({ activeSection }: { activeSection: SectionId }) {
  const navRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const nav = navRef.current
    const active = nav?.querySelector<HTMLElement>('[aria-current]')
    if (nav && active) nav.scrollTo?.({ left: active.offsetLeft - (nav.clientWidth - active.offsetWidth) / 2, behavior: 'instant' })
  }, [activeSection])
  return (
    <nav ref={navRef} className="mobile-nav" aria-label="Mobile navigation">
      {navigation.map(item => {
        const Icon = icons[item.id]
        return (
          <a key={item.id} href={`#${item.id}`} aria-current={activeSection === item.id ? 'location' : undefined}>
            <Icon aria-hidden="true" size={19} />
            <span>{item.shortLabel}</span>
          </a>
        )
      })}
    </nav>
  )
}
