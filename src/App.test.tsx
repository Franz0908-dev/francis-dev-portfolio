import { fireEvent, render, screen, within } from '@testing-library/react'
import App from './App'
import { navigation } from './data/portfolio'
import { assetUrl } from './lib/assetUrl'

describe('portfolio application', () => {
  it('shows the name, projects action, credentials, and all navigation destinations', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Francis Lee Recanil')
    expect(screen.getByRole('link', { name: 'View projects' })).toHaveAttribute('href', '#project')
    expect(document.querySelector('#experience')).not.toBeInTheDocument()
    expect(screen.queryByText('01 / Internship experience')).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Full Stack Web Development Internship' })).not.toBeInTheDocument()
    expect(document.querySelectorAll('a[href="#experience"]')).toHaveLength(0)
    expect([...document.querySelectorAll('main > section')].map(section => section.id)).toEqual(['introduction', 'project', 'skills', 'education', 'certifications', 'contact'])
    const sectionHeadings = ['01 / Featured projects', '02 / Skills & technologies', '03 / Education', '04 / Certifications & training', '05 / Contact']
    expect(screen.getAllByRole('heading', { level: 2 }).map(heading => heading.textContent)).toEqual(sectionHeadings)
    for (const title of sectionHeadings) expect(screen.getByRole('heading', { level: 2, name: title })).toBeVisible()
    expect([...document.querySelectorAll('.section-eyebrow')].every(label => label.closest('h2'))).toBe(true)
    expect(document.querySelectorAll('.section-eyebrow')).toHaveLength(5)
    expect(screen.getByRole('link', { name: 'Explore projects' })).toHaveAttribute('href', '#project')
    expect(screen.getByText('For roles and web projects')).toBeVisible()
    expect(screen.getByText('Selected applications and my role in each.')).toBeVisible()
    const projects = document.getElementById('project')!
    expect(within(projects).getAllByRole('article').map(card => within(card).getByRole('heading').textContent)).toEqual([
      '1128 Tea & Café Point of Sale & Inventory System', 'Chimes Sales and Inventory System', 'BCP Laboratory Reservation System',
    ])
    for (const heading of within(projects).getAllByRole('heading', { level: 3 })) expect(heading).toBeVisible()
    expect(within(projects).getAllByText('Chimes Consulting · Team internship project')[0]).toBeVisible()
    expect(screen.getByText('Undergraduate studies — degree not completed')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '04 / Certifications & training' })).toBeInTheDocument()
    expect(document.querySelectorAll('.certification-card')).toHaveLength(5)
    for (const label of ['Primary navigation', 'Tablet navigation', 'Mobile navigation']) {
      const links = within(screen.getByRole('navigation', { name: label })).getAllByRole('link')
      expect(links.map(link => link.getAttribute('href'))).toEqual(navigation.map(item => `#${item.id}`))
      expect(within(screen.getByRole('navigation', { name: label })).getByRole('link', { name: 'Skills & technologies' })).toHaveAttribute('href', '#skills')
    }
    for (const link of screen.getAllByRole('link', { name: /view resume/i })) {
      expect(link).toHaveAttribute('href', assetUrl('/documents/francis-lee-recanil-resume-updated.pdf'))
    }
    expect(screen.getAllByRole('link', { name: /LinkedIn/ })[0]).toHaveAttribute('href', 'https://www.linkedin.com/in/francis-lee-recanil-53b77a402/')
    expect(screen.getAllByRole('link', { name: /view certificate/i })).toHaveLength(4)
    expect(document.querySelectorAll('.certification-card__preview img')).toHaveLength(5)
  })

  it('labels the supplied TESDA documents as training and keeps local PDFs independent of external verification', () => {
    render(<App />)
    const entries = [
      ['300-Hour Internship Certificate', 'August 5, 2026', 'chimes-300-hour-internship.pdf'],
      ['Programming (Java) NC III', 'October 11, 2023', 'tesda-programming-java-nc-iii-training.pdf'],
      ['Computer Security Incident Handling Level I', 'September 3, 2026', 'tesda-computer-security-incident-handling-level-i-training.pdf'],
      ['The Complete Full-Stack Web Development Bootcamp', 'April 13, 2026', 'udemy-complete-full-stack-web-development-bootcamp.pdf'],
    ]
    for (const [title, date, file] of entries) {
      const card = screen.getByRole('heading', { name: title }).closest('article')!
      expect(within(card).getByText(`Issued ${date}`)).toBeInTheDocument()
      expect(within(card).getByRole('link', { name: `View certificate: ${title}` })).toHaveAttribute('href', assetUrl(`/certificates/${file}`))
      const preview = within(card).getByRole('img', { name: /certificate preview/ })
      expect(preview).toHaveAttribute('src', assetUrl(`/certificates/${file.replace('.pdf', '.webp')}`))
      expect(preview).toHaveAttribute('loading', 'eager')
      expect(preview.closest('a')).toHaveAttribute('href', assetUrl(`/certificates/${file}`))
      expect(preview.compareDocumentPosition(within(card).getByRole('heading')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
      if (title.includes('NC III') || title.includes('Incident Handling')) {
        expect(within(card).getByText('Certificate of Training')).toBeInTheDocument()
      }
    }
    expect(screen.getByText('Certificate of Completion · 62 hours')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /official verification/i })).not.toBeInTheDocument()
  })

  it('presents the workshop as a supplied document with its recipient left blank', () => {
    render(<App />)
    const title = 'Artistic Graphics Editing Workshop'
    const card = screen.getByRole('heading', { name: title }).closest('article')!
    expect(within(card).getByText('Project UnCAGE 1.0: Unravel Communication through Artistic Graphics Editing')).toBeInTheDocument()
    expect(within(card).getByText('Technological University of the Philippines – Manila, in partnership with Sangguniang Kabataan, Barangay Punturin')).toBeInTheDocument()
    expect(within(card).getByText('Certificate of Participation')).toBeInTheDocument()
    expect(within(card).getByText('Issued June 18, 2022')).toBeInTheDocument()
    expect(within(card).getByText('The supplied workshop document has a blank recipient field.')).toBeInTheDocument()
    const pdf = assetUrl('/certificates/artistic-graphics-editing-workshop.pdf')
    expect(within(card).getByRole('link', { name: `View workshop document: ${title}` })).toHaveAttribute('href', pdf)
    const preview = within(card).getByRole('img', { name: /document preview, with blank recipient field/ })
    expect(preview).toHaveAttribute('loading', 'eager')
    expect(preview.closest('a')).toHaveAttribute('href', pdf)
    expect(screen.queryByRole('heading', { name: 'Graphic Design Workshop' })).not.toBeInTheDocument()
  })

  it('portals the native modal outside sections and returns focus to each original trigger', () => {
    render(<App />)
    for (const button of screen.getAllByRole('button', { name: /^View project details:/ })) fireEvent.click(button)
    const triggers = screen.getAllByRole('button', { name: /Enlarge .+ screenshot/ })
    expect(triggers).toHaveLength(13)
    document.body.style.overflow = 'auto'
    for (const trigger of triggers) {
      fireEvent.click(trigger)
      const dialog = screen.getByRole('dialog')
      expect(dialog.parentElement).toBe(document.body)
      expect(dialog.closest('.section-card')).toBeNull()
      expect(screen.getByRole('button', { name: 'Close enlarged screenshot' })).toHaveFocus()
      expect(document.body.style.overflow).toBe('hidden')
      fireEvent.keyDown(dialog, { key: 'Escape' })
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      expect(trigger).toHaveFocus()
      expect(document.body.style.overflow).toBe('auto')
    }
    document.body.style.overflow = ''
  })

  it('browses only the selected gallery by arrows, controls and swipe, then closes with the button', () => {
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: 'View project details: 1128 Tea & Café Point of Sale & Inventory System' }))
    const trigger = screen.getByRole('button', { name: 'Enlarge POS Workspace screenshot' })
    fireEvent.click(trigger)
    const dialog = screen.getByRole('dialog')
    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true })
    expect(screen.getByRole('button', { name: 'Next' })).toHaveFocus()
    fireEvent.keyDown(dialog, { key: 'Tab' })
    expect(screen.getByRole('button', { name: 'Close enlarged screenshot' })).toHaveFocus()
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' })
    expect(screen.getByRole('dialog', { name: 'Sales Reports' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByRole('dialog', { name: 'POS Workspace' })).toBeInTheDocument()
    fireEvent.keyDown(dialog, { key: 'ArrowRight' })
    expect(screen.getByRole('dialog', { name: 'Product Catalog' })).toBeInTheDocument()
    const image = within(dialog).getByRole('img')
    fireEvent.touchStart(image, { touches: [{ clientX: 250, clientY: 100 }] })
    fireEvent.touchEnd(image, { changedTouches: [{ clientX: 100, clientY: 105 }] })
    expect(screen.getByRole('dialog', { name: 'Inventory Stock' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Close enlarged screenshot' }))
    expect(trigger).toHaveFocus()
  })

  it('closes on a backdrop tap or native cancel event', () => {
    render(<App />)
    const trigger = screen.getByRole('button', { name: 'Enlarge Reports & Analytics screenshot' })
    fireEvent.click(trigger)
    fireEvent.click(screen.getByRole('dialog'))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    fireEvent.click(trigger)
    fireEvent(screen.getByRole('dialog'), new Event('cancel', { bubbles: false, cancelable: true }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })
})
