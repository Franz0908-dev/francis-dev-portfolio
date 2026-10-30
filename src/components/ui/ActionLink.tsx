import type { AnchorHTMLAttributes, ReactNode } from 'react'

interface ActionLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  icon?: ReactNode
  variant?: 'primary' | 'secondary' | 'quiet'
}

export function ActionLink({
  children,
  icon,
  variant = 'secondary',
  className = '',
  ...props
}: ActionLinkProps) {
  return (
    <a className={`action-link action-link--${variant} ${className}`} {...props}>
      {icon}
      <span>{children}</span>
    </a>
  )
}
