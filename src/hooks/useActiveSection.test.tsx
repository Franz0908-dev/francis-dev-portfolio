import { act, renderHook } from '@testing-library/react'
import { useActiveSection } from './useActiveSection'
import type { SectionId } from '../types/portfolio'

const ids: SectionId[] = ['introduction', 'project', 'education', 'certifications', 'contact']

describe('active section tracking', () => {
  let scroll = 0
  let frames: FrameRequestCallback[] = []
  beforeEach(() => {
    scroll = 0
    frames = []
    document.body.innerHTML = '<header class="mobile-header"></header>' + ids.map(id => `<section id="${id}"></section>`).join('')
    document.querySelector('.mobile-header')!.getBoundingClientRect = () => ({ bottom: 70 } as DOMRect)
    for (const [index, id] of ids.entries()) {
      document.getElementById(id)!.getBoundingClientRect = () => ({ top: index * 1000 - scroll } as DOMRect)
    }
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => { frames.push(callback); return frames.length })
    vi.stubGlobal('cancelAnimationFrame', vi.fn())
    vi.spyOn(window, 'scrollY', 'get').mockImplementation(() => scroll)
    Object.defineProperty(document.documentElement, 'scrollHeight', { configurable: true, value: 5000 })
    Object.defineProperty(window, 'innerHeight', { configurable: true, value: 800 })
  })
  afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); document.body.innerHTML = '' })
  const flush = () => act(() => { const callbacks = frames.splice(0); callbacks.forEach(callback => callback(0)) })
  const go = (position: number) => { scroll = position; act(() => window.dispatchEvent(new Event('scroll'))); flush() }

  it('tracks long sections, both short end sections, and upward scrolling', () => {
    const { result } = renderHook(() => useActiveSection(ids))
    flush()
    expect(result.current).toBe('introduction')
    go(1200)
    expect(result.current).toBe('project')
    go(1900)
    expect(result.current).toBe('education')
    go(2900)
    expect(result.current).toBe('certifications')
    go(4200)
    expect(result.current).toBe('contact')
    go(2050)
    expect(result.current).toBe('education')
    go(0)
    expect(result.current).toBe('introduction')
  })

  it('updates on resize and restored scroll, without IntersectionObserver', () => {
    scroll = 3000
    const { result, unmount } = renderHook(() => useActiveSection(ids))
    flush()
    expect(result.current).toBe('certifications')
    scroll = 1000
    act(() => window.dispatchEvent(new Event('resize')))
    flush()
    expect(result.current).toBe('project')
    unmount()
    expect(cancelAnimationFrame).toHaveBeenCalled()
  })
})
