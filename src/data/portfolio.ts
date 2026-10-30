import type { Certification, NavigationItem, Technology } from '../types/portfolio'

export const profile = {
  name: 'Francis Lee Recanil',
  role: 'Junior Full Stack Web Developer',
  headline: 'Junior Full Stack Developer. Focused on Practical Solutions.',
  introduction:
    '300-hour full-stack internship experience at Chimes Consulting, with interests in building useful and maintainable web applications.',
  email: 'francislee.0908@gmail.com',
  github: 'https://github.com/Franz0908-dev',
  resume: '/documents/francis-lee-recanil-resume.pdf',
  portrait: '/assets/images/profile-approved-neon-avatar.png',
  hero: '/assets/images/hero-purple-workspace.png',
} as const

export const navigation: NavigationItem[] = [
  { id: 'introduction', label: 'Introduction', shortLabel: 'Home' },
  { id: 'experience', label: 'Internship Experience', shortLabel: 'Experience' },
  { id: 'project', label: 'Featured Project', shortLabel: 'Project' },
  { id: 'skills', label: 'Tech Stack', shortLabel: 'Skills' },
  { id: 'education', label: 'Education', shortLabel: 'Education' },
  { id: 'contact', label: 'Contact', shortLabel: 'Contact' },
]

export const internship = {
  company: 'Chimes Consulting',
  role: 'Full Stack Web Developer Intern',
  period: 'July 18 – August 5, 2026',
  hours: '300 internship hours',
  project: 'Sales and Inventory System',
  summary:
    'Worked with a development team on a Sales and Inventory System, contributing across interface, application, database, testing, and debugging tasks.',
  contributions: [
    'Inventory and product management',
    'Supplier management',
    'Dashboard and reporting functionality',
    'Low-stock alerts',
    'Frontend UI and React components',
    'Backend and database integration',
    'Debugging, testing, and collaboration',
  ],
} as const

export const featuredProject = {
  title: 'Sales and Inventory System',
  context: 'Chimes Consulting Internship',
  badge: 'Team-developed project',
  description:
    'Collaborated with a development team to build and improve features for a Sales and Inventory System. Contributed to inventory, product, and supplier management modules, dashboard and reporting functionality, and low-stock alerts. Supported frontend, backend, database, and debugging tasks.',
  areas: ['Inventory', 'Products', 'Suppliers', 'Dashboard', 'Reports', 'Low-stock alerts'],
} as const

export const technologies: Technology[] = [
  { name: 'React', icon: '/assets/icons/react.svg', iconKind: 'brand' },
  { name: 'TypeScript', icon: '/assets/icons/typescript-official.svg', iconKind: 'official' },
  { name: 'JavaScript', icon: '/assets/icons/javascript.svg', iconKind: 'brand' },
  { name: 'HTML5', icon: '/assets/icons/html5.svg', iconKind: 'brand' },
  { name: 'CSS3', icon: '/assets/icons/css3.svg', iconKind: 'brand' },
  { name: 'Tailwind CSS', icon: '/assets/icons/tailwind-css-official.svg', iconKind: 'official' },
  { name: 'Bootstrap', icon: '/assets/icons/bootstrap.svg', iconKind: 'brand' },
  { name: 'PHP', icon: '/assets/icons/php.svg', iconKind: 'brand' },
  { name: 'Laravel', icon: '/assets/icons/laravel.svg', iconKind: 'brand' },
  { name: 'MySQL', icon: '/assets/icons/mysql-neutral-database.svg', iconKind: 'neutral' },
  { name: 'Git', icon: '/assets/icons/git.svg', iconKind: 'brand' },
  { name: 'GitHub', icon: '/assets/icons/github.svg', iconKind: 'brand' },
  { name: 'Visual Studio Code', icon: '/assets/icons/visual-studio-code-neutral.svg', iconKind: 'neutral' },
]

export const aiTools: Technology[] = [
  { name: 'ChatGPT', icon: '/assets/icons/chatgpt-neutral-messages.svg', iconKind: 'neutral' },
  { name: 'Google Gemini', icon: '/assets/icons/gemini-neutral-sparkles.svg', iconKind: 'neutral' },
  { name: 'OpenAI Codex', icon: '/assets/icons/codex-neutral-terminal.svg', iconKind: 'neutral' },
  { name: 'Claude', icon: '/assets/icons/claude-neutral-messages.svg', iconKind: 'neutral' },
]

export const education = {
  program: 'Bachelor of Science in Computer Engineering',
  status: 'Undergraduate — Completed Third Year',
  school: 'Bestlink College of the Philippines',
  period: '2022–2025',
} as const

export const certifications: Certification[] = [
  { title: '300-Hour Internship Certificate', issuer: 'Chimes Consulting', detail: '2026' },
  { title: 'Java Programming NC III', issuer: 'TESDA' },
  { title: 'Full Stack Web Development', issuer: 'Udemy', detail: 'Course Completion' },
  { title: 'Graphic Design Workshop', issuer: 'Sangguniang Kabataan' },
]
