import { fireEvent, render, screen, within } from '@testing-library/react'
import { ProjectSection } from './ProjectSection'
import { academicProject, featuredProject } from '../../data/portfolio'
import { posProject } from '../../data/featuredProjects'
import { assetUrl } from '../../lib/assetUrl'

const sales = 'Chimes Sales and Inventory System'
const bcp = 'BCP Laboratory Reservation System'
const pos = '1128 Tea & Café Point of Sale & Inventory System'
const posScreens = ['POS Workspace', 'Product Catalog', 'Inventory Stock', 'Completed Receipts', 'Sales Reports']

describe('three compact project case studies', () => {
  it('keeps all three titles visible in order with independent collapsed details and requested covers', () => {
    render(<ProjectSection />)
    expect(screen.getAllByRole('article').map(card => within(card).getByRole('heading').textContent)).toEqual([pos, sales, bcp])
    expect(screen.getByText('Selected applications and my role in each.')).toBeVisible()
    expect(screen.getByRole('heading', { level: 2, name: '01 / Featured projects' })).toBeVisible()
    const chimes = screen.getByRole('article', { name: sales })
    const heading = within(chimes).getByRole('heading', { name: sales })
    expect(heading.nextElementSibling).toHaveTextContent('Chimes Consulting · Team internship project')
    expect(document.querySelectorAll('.case-study .section-eyebrow')).toHaveLength(0)
    expect(screen.getAllByText('Chimes Consulting · Team internship project')[0]).toBeVisible()
    expect(screen.getByText('Full-stack development')).toBeVisible()
    expect(screen.getAllByText('My contribution:')).toHaveLength(3)
    expect(screen.getAllByRole('button', { name: /^Enlarge/ }).map(button => button.getAttribute('aria-label'))).toEqual([
      'Enlarge POS Workspace screenshot', 'Enlarge Reports & Analytics screenshot', 'Enlarge Availability Calendar screenshot',
    ])
    for (const title of [sales, pos, bcp]) {
      const card = screen.getByRole('article', { name: title })
      expect(within(card).getByRole('heading', { name: title })).toBeVisible()
      const technologies = within(card).getByRole('list', { name: `${title} key technologies` })
      expect(technologies.children).toHaveLength(4)
      if(title===pos) expect([...technologies.children].map(item=>item.textContent)).toEqual(['React','TypeScript','Express','Prisma'])
      const toggle = within(card).getByRole('button', { name: `View project details: ${title}` })
      expect(toggle).toHaveAttribute('aria-expanded', 'false')
      expect(document.getElementById(toggle.getAttribute('aria-controls')!)).not.toBeVisible()
      const summary = card.querySelector('.case-study__summary')!
      expect(summary.compareDocumentPosition(card.querySelector('.case-study__cover')!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
    }
  })

  it('keeps original team evidence in Sales and restores the solo prototype evidence to BCP', () => {
    render(<ProjectSection />)
    fireEvent.click(screen.getByRole('button', { name: `View project details: ${sales}` }))
    const panel = screen.getByRole('region', { name: `${sales} details` })
    expect(within(panel).getAllByRole('button', { name: /^Enlarge/ })).toHaveLength(3)
    const team = within(panel).getByRole('region', { name: 'Sales and inventory implementation' })
    expect(within(team).getByText('Chimes Consulting · Team internship project')).toBeVisible()
    expect(within(team).getByText(/individual module ownership is not documented/)).toBeVisible()
    expect(within(team).getByText(/Laravel 13.*Inertia.js/)).toBeVisible()
    expect(within(panel).queryByText(bcp)).not.toBeInTheDocument()
    expect(within(panel).queryByText(/SQL Server/)).not.toBeInTheDocument()
    expect(screen.queryByRole('region', { name: `${bcp} details` })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: `View project details: ${bcp}` }))
    const solo = screen.getByRole('region', { name: `${bcp} details` })
    expect(within(solo).getByRole('heading', { level: 4, name: 'Reservation prototype details' })).toBeVisible()
    expect(within(solo).getByText('Solo academic prototype')).toBeVisible()
    expect(within(solo).getByText(academicProject.description)).toBeVisible()
    expect(within(solo).getByText(/manual source-code review was limited/)).toBeVisible()
    expect(within(solo).getByText(/proposed SQL Server.*prototype uses SQLite/)).toBeVisible()
    expect(within(solo).getByText(/ASP.NET Core MVC.*FullCalendar/)).toBeVisible()
    expect(within(solo).getAllByRole('button', { name: /^Enlarge/ }).map(button => button.getAttribute('aria-label'))).toEqual([
      'Enlarge Administrator Dashboard screenshot', 'Enlarge Create Reservation screenshot', 'Enlarge Equipment Management screenshot',
    ])
    const images = [...screen.getByRole('article', { name: sales }).querySelectorAll('img')].map(img => img.getAttribute('src'))
    expect(images).toEqual(featuredProject.gallery.map(image => assetUrl(image.image)))
    const soloImages = [...screen.getByRole('article', { name: bcp }).querySelectorAll('img')].map(img => img.getAttribute('src'))
    expect(soloImages).toEqual([1, 0, 2, 3].map(index => assetUrl(academicProject.gallery[index].image)))
    for (const index of [0, 2, 3]) expect(within(solo).getByText(academicProject.gallery[index].caption)).toBeVisible()
    fireEvent.click(screen.getByRole('button', { name: `Hide project details: ${sales}` }))
    expect(solo).toBeVisible()
    expect(screen.queryByRole('region', { name: `${pos} details` })).not.toBeInTheDocument()
  })

  it('toggles only its own details and keeps every full-size gallery within its project', () => {
    render(<ProjectSection />)
    const galleries = [featuredProject.gallery, posProject.gallery, academicProject.gallery]
    for (const [projectIndex, title] of [sales, pos, bcp].entries()) {
      const card = screen.getByRole('article', { name: title })
      const toggle = within(card).getByRole('button', { name: `View project details: ${title}` })
      fireEvent.click(toggle)
      expect(screen.getAllByRole('region', { name: /System details$/ })).toHaveLength(1)
      const gallery = galleries[projectIndex]
      for (const image of gallery) {
        const trigger = within(card).getByRole('button', { name: `Enlarge ${image.title} screenshot` })
        fireEvent.click(trigger)
        const initialIndex = gallery.findIndex(candidate => candidate.image === image.image)
        for (let step = 0; step <= gallery.length; step++) {
          const expected = gallery[(initialIndex + step) % gallery.length]
          const dialog = screen.getByRole('dialog', { name: expected.title })
          expect(within(dialog).getByRole('img')).toHaveAttribute('src', assetUrl(expected.image))
          expect(within(dialog).getByText(expected.caption)).toBeVisible()
          fireEvent.keyDown(dialog, { key: 'ArrowRight' })
        }
        fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
        expect(trigger).toHaveFocus()
      }
      fireEvent.click(toggle)
      expect(screen.queryByRole('region', { name: `${title} details` })).not.toBeInTheDocument()
    }
  })

  it('shows the POS screenshots in order, with local fictional-data context and SQLite in its full stack', () => {
    render(<ProjectSection />)
    const toggle = screen.getByRole('button', { name: `View project details: ${pos}` })
    fireEvent.click(toggle)
    const card = screen.getByRole('article', { name: pos })
    expect(within(card).getAllByRole('button', { name: /^Enlarge/ }).map(button => button.getAttribute('aria-label'))).toEqual(posScreens.map(title=>`Enlarge ${title} screenshot`))
    const paths = [...card.querySelectorAll('img')].map(img=>img.getAttribute('src')?.split('/').at(-1))
    expect(paths).toEqual(['01-cover-pos-workspace.png','02-gallery-product-catalog.png','03-gallery-inventory-stock.png','04-gallery-completed-receipts.png','05-gallery-sales-reports.png'])
    expect(within(card).getByText('React · TypeScript · Express · Prisma · SQLite')).toBeVisible()
    expect(within(card).getByText(/The application was developed locally.*fictional demo data/)).toBeVisible()
    expect(within(card).getByText(/schema design and additive migrations.*automated API\/integration and browser testing/)).toBeVisible()
    expect(within(card).queryByRole('link')).not.toBeInTheDocument()
    fireEvent.click(toggle)
    expect(screen.queryByRole('region', { name: `${pos} details` })).not.toBeInTheDocument()
  })

  it('opens all five POS images and restores focus to the exact screenshot trigger', () => {
    render(<ProjectSection />)
    const toggle = screen.getByRole('button', { name: `View project details: ${pos}` })
    fireEvent.click(toggle)
    for (const [index,title] of posScreens.entries()) {
      const trigger = screen.getByRole('button', { name: `Enlarge ${title} screenshot` })
      fireEvent.click(trigger)
      const dialog = screen.getByRole('dialog', { name: title })
      expect(within(dialog).getByRole('img')).toHaveAttribute('src', expect.stringContaining('/images/1128-pos/'))
      expect(within(dialog).getByText(`Screenshot ${index+1} of 5`)).toBeVisible()
      if(index%2===0) fireEvent.keyDown(dialog, { key:'Escape' })
      else fireEvent.click(within(dialog).getByRole('button', { name:'Close enlarged screenshot' }))
      expect(trigger).toHaveFocus()
      expect(toggle).toHaveAttribute('aria-expanded','true')
    }
  })
})
