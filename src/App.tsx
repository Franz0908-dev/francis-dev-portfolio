import { useMemo } from 'react'
import { MobileHeader } from './components/layout/MobileHeader'
import { MobileNav } from './components/layout/MobileNav'
import { ProfileSidebar } from './components/layout/ProfileSidebar'
import { ContactSection } from './components/sections/ContactSection'
import { EducationSection } from './components/sections/EducationSection'
import { ExperienceSection } from './components/sections/ExperienceSection'
import { HeroSection } from './components/sections/HeroSection'
import { ProjectSection } from './components/sections/ProjectSection'
import { TechStackSection } from './components/sections/TechStackSection'
import { navigation } from './data/portfolio'
import { useActiveSection } from './hooks/useActiveSection'
import { PosCaseStudyPage } from './components/pages/PosCaseStudyPage'

export default function App() {
  const sectionIds = useMemo(() => navigation.map((item) => item.id), [])
  const activeSection = useActiveSection(sectionIds)

  if (window.location.pathname === '/projects/1128-pos-v3') {
    return <PosCaseStudyPage />
  }

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <MobileHeader activeSection={activeSection} />
      <div className="site-shell">
        <ProfileSidebar activeSection={activeSection} />
        <main id="main-content">
          <HeroSection />
          <ExperienceSection />
          <ProjectSection />
          <TechStackSection />
          <EducationSection />
          <ContactSection />
        </main>
      </div>
      <MobileNav activeSection={activeSection} />
    </>
  )
}
