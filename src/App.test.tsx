import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

describe('portfolio application', () => {
  it('renders every required section and verified resume actions', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Junior Full Stack Developer. Focused on Practical Solutions.',
    )
    expect(screen.getByRole('heading', { name: 'Chimes Consulting' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Sales and Inventory System' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'BCP Laboratory Reservation System' })).toBeInTheDocument()
    expect(screen.getByText('Solo Academic Project')).toBeInTheDocument()
    expect(screen.getByText('AI-Assisted Development')).toBeInTheDocument()
    expect(screen.getByText('ASP.NET Core MVC')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Development technologies' })).toBeInTheDocument()
    expect(screen.getByText('Undergraduate Studies — Through Third Year, First Semester')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /view resume/i })[0]).toHaveAttribute(
      'href',
      '/documents/francis-lee-recanil-resume.pdf',
    )
  })

  it('opens and closes the project screenshot lightbox accessibly', () => {
    render(<App />)

    expect(
      screen.getAllByRole('button', { name: /Enlarge .+ screenshot/ }).map((button) => button.getAttribute('aria-label')),
    ).toEqual([
      'Enlarge Reports & Analytics screenshot',
      'Enlarge Inventory Management screenshot',
      'Enlarge Product Management screenshot',
      'Enlarge Orders Workflow screenshot',
      'Enlarge Administrator Dashboard screenshot',
      'Enlarge Availability Calendar screenshot',
      'Enlarge Create Reservation screenshot',
      'Enlarge Equipment Management screenshot',
    ])

    const trigger = screen.getByRole('button', { name: 'Enlarge Reports & Analytics screenshot' })
    fireEvent.click(trigger)

    expect(screen.getByRole('dialog', { name: 'Reports & Analytics' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close enlarged screenshot' })).toHaveFocus()
    expect(document.body.style.overflow).toBe('hidden')

    fireEvent.keyDown(window, { key: 'Escape' })

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(document.body.style.overflow).toBe('')

    const academicTrigger = screen.getByRole('button', { name: 'Enlarge Administrator Dashboard screenshot' })
    fireEvent.click(academicTrigger)

    expect(screen.getByRole('dialog', { name: 'Administrator Dashboard' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close enlarged screenshot' })).toHaveFocus()

    fireEvent.click(screen.getByRole('button', { name: 'Close enlarged screenshot' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(academicTrigger).toHaveFocus()
  })
})
