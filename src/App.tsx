import { useMemo } from 'react'
import { MobileHeader } from './components/layout/MobileHeader'
import { MobileNav } from './components/layout/MobileNav'
import { ProfileSidebar } from './components/layout/ProfileSidebar'
import { ContactSection } from './components/sections/ContactSection'
import { CertificationsSection } from './components/sections/CertificationsSection'
import { EducationSection } from './components/sections/EducationSection'
import { HeroSection } from './components/sections/HeroSection'
import { ProjectSection } from './components/sections/ProjectSection'
import { TechStackSection } from './components/sections/TechStackSection'
import { navigation } from './data/portfolio'
import { useActiveSection } from './hooks/useActiveSection'

export default function App() {
  const sectionIds = useMemo(() => navigation.map((item) => item.id), [])
  const activeSection = useActiveSection(sectionIds)

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <MobileHeader activeSection={activeSection} />
      <div className="site-shell">
        <ProfileSidebar activeSection={activeSection} />
        <main id="main-content" tabIndex={-1}>
          <HeroSection />
          <ProjectSection />
          <TechStackSection />
          <EducationSection />
          <CertificationsSection />
          <ContactSection />
        </main>
      </div>
      <MobileNav activeSection={activeSection} />
    </>
  )
}
