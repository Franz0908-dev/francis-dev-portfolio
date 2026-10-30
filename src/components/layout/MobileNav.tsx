import { BriefcaseBusiness, CodeXml, House, Layers3, Mail } from 'lucide-react'
import { navigation } from '../../data/portfolio'
import type { SectionId } from '../../types/portfolio'

const visibleIds: SectionId[] = ['introduction', 'experience', 'project', 'skills', 'contact']
const icons = {
  introduction: House,
  experience: BriefcaseBusiness,
  project: CodeXml,
  skills: Layers3,
  education: House,
  contact: Mail,
}

interface MobileNavProps {
  activeSection: SectionId
}

export function MobileNav({ activeSection }: MobileNavProps) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {navigation
        .filter((item) => visibleIds.includes(item.id))
        .map((item) => {
          const Icon = icons[item.id]
          const isActive = activeSection === item.id || (item.id === 'contact' && activeSection === 'education')
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={isActive ? 'location' : undefined}
            >
              <Icon aria-hidden="true" size={19} />
              <span>{item.shortLabel}</span>
            </a>
          )
        })}
    </nav>
  )
}
