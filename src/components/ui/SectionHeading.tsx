interface SectionHeadingProps {
  id?: string
  number: string
  title: string
  description?: string
}

export function SectionHeading({ id, number, title, description }: SectionHeadingProps) {
  return (
    <header className="section-heading">
      <h2 id={id}><span className="section-eyebrow">{number} /</span> {title}</h2>
      {description && <p>{description}</p>}
    </header>
  )
}
