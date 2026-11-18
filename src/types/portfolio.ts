export type SectionId =
  | 'introduction'
  | 'experience'
  | 'project'
  | 'skills'
  | 'education'
  | 'certifications'
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
  date?: string
  publicFile?: string
  event?: string
  note?: string
  documentLabel?: string
  preview?: { image: string; width: number; height: number; alt?: string }
  verificationUrl?: string
}
