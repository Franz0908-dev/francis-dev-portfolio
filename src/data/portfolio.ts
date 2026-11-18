import type { Certification, NavigationItem, Technology } from '../types/portfolio'
import { assetUrl } from '../lib/assetUrl'

export const profile = {
  name: 'Francis Lee Recanil',
  role: 'Junior Full Stack Web Developer',
  headline: 'Junior Full Stack Web Developer',
  introduction:
    'I build practical web applications with Laravel, React, and TypeScript. My experience includes a 300-hour internship at Chimes Consulting and a solo academic laboratory reservation prototype.',
  email: 'francislee.0908@gmail.com',
  github: 'https://github.com/Franz0908-dev',
  linkedin: 'https://www.linkedin.com/in/francis-lee-recanil-53b77a402/',
  resume: assetUrl('/documents/francis-lee-recanil-resume-updated.pdf'),
  portrait: assetUrl('/assets/images/portrait-160.webp'),
  portraitLarge: assetUrl('/assets/images/portrait-320.webp'),
  hero: assetUrl('/assets/images/hero-1280.webp'),
  heroSmall: assetUrl('/assets/images/hero-768.webp'),
  heroLarge: assetUrl('/assets/images/hero-1672.webp'),
} as const

export const navigation: NavigationItem[] = [
  { id: 'introduction', label: 'Introduction', shortLabel: 'Home' },
  { id: 'project', label: 'Featured Projects', shortLabel: 'Projects' },
  { id: 'skills', label: 'Skills & technologies', shortLabel: 'Skills & technologies' },
  { id: 'education', label: 'Education', shortLabel: 'Education' },
  { id: 'certifications', label: 'Certifications', shortLabel: 'Certifications' },
  { id: 'contact', label: 'Contact', shortLabel: 'Contact' },
]

export const internship = {
  company: 'Chimes Consulting',
  role: 'Full Stack Web Developer Intern',
  period: 'July 18 – August 5, 2026',
  hours: '300 internship hours',
  project: 'Sales and Inventory System',
  summary:
    'Contributed to frontend and backend work on a team-built Sales and Inventory System, including implementation, testing, and debugging across product, stock, sales, order, invoice, and reporting workflows.',
  contributions: [
    'Frontend and backend implementation with the team',
    'Product, inventory, sales, and order workflows',
    'Testing changes in the running application',
    'Reviewing generated code and debugging issues',
  ],
} as const

export const featuredProject = {
  title: 'Sales and Inventory System',
  context: 'Chimes Consulting Internship',
  badge: 'Team-developed project',
  description:
    'A team-built application that brings product records, stock levels, sales, orders, invoices, suppliers, and reporting into one workspace.',
  problem: 'Sales and stock workflows need connected records so staff can review orders, monitor inventory, and check sales reports.',
  contribution: 'Contributed to frontend and backend implementation and debugging across product, inventory, sales, order, invoice, and reporting workflows. Reviewed generated code and tested changes in the running application; individual module ownership is not documented.',
  technologies: ['Laravel 13', 'PHP', 'React 19', 'TypeScript', 'Inertia.js', 'Tailwind CSS 4', 'SQLite', 'Vite'],
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
  badge: 'Solo academic prototype',
  description:
    'A web-based academic laboratory reservation and management system featuring calendar-based scheduling, reservation requests, administrative analytics, and equipment management.',
  developmentContext:
    'Directed implementation and tested the reservation, calendar, dashboard, and equipment features in the running prototype. Used AI coding tools extensively; manual source-code review was limited.',
  problem: 'Laboratory bookings need a shared view of availability and a structured way to request time and manage equipment.',
  history: 'The original academic proposal, titled School Laboratory Reservation System, proposed SQL Server. The later BCP prototype uses SQLite with ASP.NET Core MVC and EF Core. The screenshots show the prototype; they do not establish a production rollout.',
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
  status: 'Undergraduate studies — degree not completed',
  school: 'Bestlink College of the Philippines',
  period: '2022–2025',
} as const

export const certifications: Certification[] = [
  {
    title: '300-Hour Internship Certificate',
    issuer: 'Chimes Consulting',
    detail: 'Certificate of Completion',
    date: 'August 5, 2026',
    publicFile: '/certificates/chimes-300-hour-internship.pdf',
    preview: { image: '/certificates/chimes-300-hour-internship.webp', width: 960, height: 720 },
  },
  {
    title: 'Programming (Java) NC III',
    issuer: 'TESDA',
    detail: 'Certificate of Training',
    date: 'October 11, 2023',
    publicFile: '/certificates/tesda-programming-java-nc-iii-training.pdf',
    preview: { image: '/certificates/tesda-programming-java-nc-iii-training.webp', width: 960, height: 708 },
  },
  {
    title: 'Computer Security Incident Handling Level I',
    issuer: 'TESDA',
    detail: 'Certificate of Training',
    date: 'September 3, 2026',
    publicFile: '/certificates/tesda-computer-security-incident-handling-level-i-training.pdf',
    preview: { image: '/certificates/tesda-computer-security-incident-handling-level-i-training.webp', width: 960, height: 708 },
  },
  {
    title: 'The Complete Full-Stack Web Development Bootcamp',
    issuer: 'Udemy',
    detail: 'Certificate of Completion · 62 hours',
    date: 'April 13, 2026',
    publicFile: '/certificates/udemy-complete-full-stack-web-development-bootcamp.pdf',
    preview: { image: '/certificates/udemy-complete-full-stack-web-development-bootcamp.webp', width: 960, height: 714 },
  },
  {
    title: 'Artistic Graphics Editing Workshop',
    event: 'Project UnCAGE 1.0: Unravel Communication through Artistic Graphics Editing',
    issuer: 'Technological University of the Philippines – Manila, in partnership with Sangguniang Kabataan, Barangay Punturin',
    detail: 'Certificate of Participation',
    date: 'June 18, 2022',
    note: 'The supplied workshop document has a blank recipient field.',
    documentLabel: 'View workshop document',
    publicFile: '/certificates/artistic-graphics-editing-workshop.pdf',
    preview: {
      image: '/certificates/artistic-graphics-editing-workshop.webp',
      width: 960,
      height: 722,
      alt: 'Artistic Graphics Editing Workshop document preview, with blank recipient field',
    },
  },
]
