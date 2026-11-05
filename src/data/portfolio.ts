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
  { id: 'project', label: 'Featured Projects', shortLabel: 'Projects' },
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
    'Worked with a development team on a Sales and Inventory System using AI-assisted coding tools. Personally reviewed AI-generated code, tested changes in the running application, and participated in debugging and refinement.',
  contributions: [
    'AI-assisted coding workflow',
    'Personal review of AI-generated code',
    'Testing changes in the running application',
    'Debugging and refinement',
    'Team collaboration',
  ],
} as const

export const featuredProject = {
  title: 'Sales and Inventory System',
  context: 'Chimes Consulting Internship',
  badge: 'Team-developed project',
  description:
    'Collaborated with a development team on a Sales and Inventory System using AI-assisted coding tools. Personally reviewed AI-generated code, tested changes in the running application, and participated in debugging and refinement. The system screens represent team-developed functionality and do not imply sole or complete module ownership.',
  areas: ['Inventory', 'Products', 'Suppliers', 'Dashboard', 'Reports', 'Low-stock alerts'],
  gallery: [
    {
      title: 'Reports & Analytics',
      caption: 'Sales and channel reporting with date filters and summary metrics.',
      image: '/assets/projects/01-reports-analytics.png',
      alt: 'Sales and Inventory System reports screen showing sales metrics, channel charts, and a monthly sales trend.',
      width: 1072,
      height: 640,
    },
    {
      title: 'Inventory Management',
      caption: 'Inventory records with stock levels, pricing, and low-stock status.',
      image: '/assets/projects/02-inventory-management.png',
      alt: 'Sales and Inventory System inventory screen showing product stock, pricing, stock status, and edit actions.',
      width: 1334,
      height: 744,
    },
    {
      title: 'Product Management',
      caption: 'Product catalogue with search, filters, pricing, and record actions.',
      image: '/assets/projects/03-product-management.png',
      alt: 'Sales and Inventory System products screen showing catalogue search, filters, prices, and product actions.',
      width: 1334,
      height: 744,
    },
    {
      title: 'Orders Workflow',
      caption: 'Order records with payment, fulfillment, and tracking details.',
      image: '/assets/projects/04-orders-workflow.png',
      alt: 'Sales and Inventory System orders screen showing payment status, fulfillment status, tracking numbers, and order actions.',
      width: 1072,
      height: 376,
    },
  ],
} as const

export const academicProject = {
  title: 'BCP Laboratory Reservation System',
  context: 'Solo Academic Project',
  badge: 'AI-Assisted Development',
  description:
    'A web-based academic laboratory reservation and management system featuring calendar-based scheduling, reservation requests, administrative analytics, and equipment management.',
  developmentContext:
    'Solo academic project developed through an AI-assisted workflow. Directed the implementation process and tested features in the running application; manual source-code review was limited.',
  features: ['Calendar scheduling', 'Reservation requests', 'Administrative analytics', 'Equipment management'],
  technologies: [
    'ASP.NET Core MVC',
    'C#',
    'EF Core',
    'SQLite',
    'Razor',
    'JavaScript',
    'Bootstrap',
    'FullCalendar',
    'Chart.js',
  ],
  gallery: [
    {
      title: 'Administrator Dashboard',
      caption: 'Demo dashboard with reservation status summaries and analytics charts.',
      image: '/images/bcp-lab-reservation/01-admin-dashboard.png',
      alt: 'Demo administrator dashboard for the BCP Laboratory Reservation System showing reservation summaries and analytics charts.',
      width: 1359,
      height: 764,
    },
    {
      title: 'Availability Calendar',
      caption: 'Monthly calendar view for reviewing laboratory availability and schedules.',
      image: '/images/bcp-lab-reservation/02-availability-calendar.png',
      alt: 'BCP Laboratory Reservation System monthly availability calendar with month, week, and list view controls.',
      width: 1359,
      height: 663,
    },
    {
      title: 'Create Reservation',
      caption: 'Reservation form for selecting a laboratory, date, time, and request details.',
      image: '/images/bcp-lab-reservation/03-create-reservation.png',
      alt: 'BCP Laboratory Reservation System form for creating a laboratory reservation with schedule and request fields.',
      width: 1350,
      height: 664,
    },
    {
      title: 'Equipment Management',
      caption: 'Equipment list with search, status filtering, quantities, and record controls.',
      image: '/images/bcp-lab-reservation/04-equipment-management.png',
      alt: 'BCP Laboratory Reservation System equipment management screen with search, status filters, quantities, and edit controls.',
      width: 1359,
      height: 764,
    },
  ],
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
  status: 'Undergraduate Studies — Through Third Year, First Semester',
  school: 'Bestlink College of the Philippines',
  period: '2022–2025',
} as const

export const certifications: Certification[] = [
  { title: '300-Hour Internship Certificate', issuer: 'Chimes Consulting', detail: '2026' },
  { title: 'Java Programming NC III', issuer: 'TESDA' },
  { title: 'Full Stack Web Development', issuer: 'Udemy', detail: 'Course Completion' },
  { title: 'Graphic Design Workshop', issuer: 'Sangguniang Kabataan' },
]
