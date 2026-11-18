import { useEffect, useState } from 'react'
import type { SectionId } from '../types/portfolio'

export function useActiveSection(sectionIds: SectionId[]) {
  const [activeSection, setActiveSection] = useState<SectionId>(sectionIds[0])

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const header = document.querySelector('.mobile-header')
      const headerBottom = header?.getBoundingClientRect().bottom ?? 0
      const readingLine = Math.max(0, headerBottom) + Math.min(120, window.innerHeight * 0.2)
      const sections = sectionIds.map(id => document.getElementById(id)).filter((section): section is HTMLElement => !!section)
      let current = sections[0]?.id as SectionId | undefined
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section.id as SectionId
      }
      const atEnd = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      if (atEnd) current = sections.at(-1)?.id as SectionId | undefined
      if (current) setActiveSection(current)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('hashchange', schedule)
    window.addEventListener('pageshow', schedule)
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : undefined
    observer?.observe(document.documentElement)
    schedule()
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('hashchange', schedule)
      window.removeEventListener('pageshow', schedule)
    }
  }, [sectionIds])

  return activeSection
}
