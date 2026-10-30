import {
  BookOpen,
  BriefcaseBusiness,
  CodeXml,
  Download,
  GitFork,
  GraduationCap,
  House,
  Layers3,
  Mail,
} from 'lucide-react'
import { navigation, profile } from '../../data/portfolio'
import type { SectionId } from '../../types/portfolio'
import { ActionLink } from '../ui/ActionLink'

const icons = {
  introduction: House,
  experience: BriefcaseBusiness,
  project: CodeXml,
  skills: Layers3,
  education: GraduationCap,
  contact: Mail,
}

interface ProfileSidebarProps {
  activeSection: SectionId
}

export function ProfileSidebar({ activeSection }: ProfileSidebarProps) {
  return (
    <aside className="profile-sidebar" aria-label="Profile and portfolio navigation">
      <a className="brand" href="#introduction" aria-label="FRANCIS.DEV home">
        FRANCIS<span>.DEV</span>
      </a>

      <div className="profile-summary">
        <div className="portrait-frame">
          <img
            src={profile.portrait}
            alt="AI-enhanced portrait of Francis Lee Recanil"
            width="160"
            height="160"
          />
        </div>
        <p className="profile-name">{profile.name}</p>
        <p className="profile-role">{profile.role}</p>
      </div>

      <nav className="sidebar-nav" aria-label="Primary navigation">
        {navigation.map((item) => {
          const Icon = icons[item.id]
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? 'location' : undefined}
            >
              <Icon aria-hidden="true" size={18} />
              <span>{item.label}</span>
            </a>
          )
        })}
      </nav>

      <div className="sidebar-actions">
        <ActionLink href={`mailto:${profile.email}`} icon={<Mail size={17} />} variant="primary">
          Contact me
        </ActionLink>
        <ActionLink href={profile.github} target="_blank" rel="noreferrer" icon={<GitFork size={17} />}>
          GitHub
        </ActionLink>
        <ActionLink href={profile.resume} target="_blank" rel="noreferrer" icon={<BookOpen size={17} />}>
          View resume
        </ActionLink>
        <ActionLink href={profile.resume} download="Francis-Lee-Recanil-Resume.pdf" icon={<Download size={17} />}>
          Download resume
        </ActionLink>
      </div>
    </aside>
  )
}
