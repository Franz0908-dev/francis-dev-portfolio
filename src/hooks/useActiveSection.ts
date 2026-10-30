import { useEffect, useState } from 'react'
import type { SectionId } from '../types/portfolio'

export function useActiveSection(sectionIds: SectionId[]) {
  const [activeSection, setActiveSection] = useState<SectionId>(sectionIds[0])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const updateAtPageEnd = () => {
      const pageEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 24
      if (pageEnd) setActiveSection(sectionIds[sectionIds.length - 1])
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) setActiveSection(visible.target.id as SectionId)
      },
      { rootMargin: '-24% 0px -58%', threshold: [0.05, 0.25, 0.5] },
    )

    sectionIds.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    window.addEventListener('scroll', updateAtPageEnd, { passive: true })
    updateAtPageEnd()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateAtPageEnd)
    }
  }, [sectionIds])

  return activeSection
}
