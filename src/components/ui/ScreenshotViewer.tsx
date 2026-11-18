import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { assetUrl } from '../../lib/assetUrl'

export interface GalleryImage {
  readonly title: string
  readonly caption: string
  readonly image: string
  readonly alt: string
  readonly width: number
  readonly height: number
}

interface ScreenshotViewerProps {
  images: readonly GalleryImage[]
  initialIndex: number
  trigger: HTMLButtonElement
  onClose: () => void
}

export function ScreenshotViewer({ images, initialIndex, trigger, onClose }: ScreenshotViewerProps) {
  const [index, setIndex] = useState(initialIndex)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const image = images[index]
  const move = (direction: number) => setIndex(current => (current + direction + images.length) % images.length)

  useEffect(() => {
    const dialog = dialogRef.current!
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      trigger.focus({ preventScroll: true })
    }
  }, [trigger])

  return createPortal(
    <dialog
      ref={dialogRef}
      className="project-lightbox"
      aria-modal="true"
      aria-labelledby="project-lightbox-title"
      aria-describedby="project-lightbox-caption"
      onCancel={event => { event.preventDefault(); onClose() }}
      onClick={event => { if (event.target === event.currentTarget) onClose() }}
      onKeyDown={event => {
        if (event.key === 'Tab') {
          const buttons = event.currentTarget.querySelectorAll<HTMLButtonElement>('button')
          const first = buttons[0]
          const last = buttons[buttons.length - 1]
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
        }
        if (event.key === 'Escape') { event.preventDefault(); onClose() }
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
      }}
    >
      <figure className="project-lightbox__content">
        <div className="project-lightbox__toolbar">
          <span aria-live="polite">Screenshot {index + 1} of {images.length}</span>
          <button ref={closeRef} className="project-lightbox__close" type="button" onClick={onClose} aria-label="Close enlarged screenshot">
            <X aria-hidden="true" size={20} /> Close
          </button>
        </div>
        <img
          src={assetUrl(image.image)} alt={image.alt} width={image.width} height={image.height} decoding="async"
          onTouchStart={event => { const touch = event.touches[0]; touchStart.current = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null }}
          onTouchEnd={event => {
            const start = touchStart.current
            touchStart.current = null
            const end = event.changedTouches[0]
            if (!start || !end) return
            const dx = end.clientX - start.x
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(end.clientY - start.y) * 1.5) move(dx < 0 ? 1 : -1)
          }}
        />
        <figcaption aria-live="polite">
          <strong id="project-lightbox-title">{image.title}</strong>
          <span id="project-lightbox-caption">{image.caption}</span>
        </figcaption>
        <div className="project-lightbox__navigation">
          <button type="button" onClick={() => move(-1)}><ArrowLeft aria-hidden="true" size={18} /> Previous</button>
          <span>Arrow keys or swipe to browse</span>
          <button type="button" onClick={() => move(1)}>Next <ArrowRight aria-hidden="true" size={18} /></button>
        </div>
      </figure>
    </dialog>,
    document.body,
  )
}
