export type SectionId =
  | 'introduction'
  | 'experience'
  | 'project'
  | 'skills'
  | 'education'
  | 'contact'

export interface NavigationItem {
  id: SectionId
  label: string
  shortLabel: string
}

export interface Technology {
  name: string
  icon: string
  iconKind: 'brand' | 'official' | 'neutral'
}

export interface Certification {
  title: string
  issuer: string
  detail?: string
}
