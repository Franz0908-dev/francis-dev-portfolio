import { render, screen } from '@testing-library/react'
import App from './App'

describe('portfolio application', () => {
  it('renders every required section and verified resume actions', () => {
    render(<App />)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Junior Full Stack Developer. Focused on Practical Solutions.',
    )
    expect(screen.getByRole('heading', { name: 'Chimes Consulting' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Sales and Inventory System' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Development technologies' })).toBeInTheDocument()
    expect(screen.getByText('Undergraduate — Completed Third Year')).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: /view resume/i })[0]).toHaveAttribute(
      'href',
      '/documents/francis-lee-recanil-resume.pdf',
    )
  })
})
