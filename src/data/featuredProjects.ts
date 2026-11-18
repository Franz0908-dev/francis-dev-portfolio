import { academicProject, featuredProject } from './portfolio'
import type { GalleryImage } from '../components/ui/ScreenshotViewer'

export interface ProjectDetailGroup {
  title: string
  context: string
  facts: readonly { label: string; text: string }[]
  screenshotIndices: readonly number[]
}

export interface FeaturedCaseStudy {
  id: string
  title: string
  context: string
  workflow: string
  contribution: string
  technologies: readonly string[]
  gallery: readonly GalleryImage[]
  coverIndex: number
  details: readonly ProjectDetailGroup[]
}

// POS facts: supplied 1128-pos-v3-main.zip README, docs/architecture/README.md,
// docs/development/README.md and VERIFICATION.md; images: supplied screenshot ZIP.
export const posProject: FeaturedCaseStudy = {
  id: '1128-pos',
  title: '1128 Tea & Café Point of Sale & Inventory System',
  context: 'Full-stack development',
  workflow: 'A café point-of-sale system that connects checkout, product variants, branch inventory, receipts, and sales reporting.',
  contribution: 'Implemented frontend and API features, database design, checkout and inventory workflows, and automated tests.',
  technologies: ['React', 'TypeScript', 'Express', 'Prisma', 'SQLite'],
  coverIndex: 0,
  gallery: [
    {
      title: 'POS Workspace',
      caption: 'Searchable drinks menu, size prices, and the current-order checkout panel.',
      image: '/images/1128-pos/01-cover-pos-workspace.png',
      alt: '1128 café POS workspace with fictional demo drinks, category filters, prices, and a current-order panel.',
      width: 1365, height: 721,
    },
    {
      title: 'Product Catalog',
      caption: 'Products with photos, categories, size variants, prices, and availability.',
      image: '/images/1128-pos/02-gallery-product-catalog.png',
      alt: '1128 product catalog showing demo drink photos, categories, size prices, status, and edit controls.',
      width: 1363, height: 722,
    },
    {
      title: 'Inventory Stock',
      caption: 'Branch-specific variant balances, low-stock status, and stock adjustment controls.',
      image: '/images/1128-pos/03-gallery-inventory-stock.png',
      alt: '1128 inventory screen showing fictional branch stock, variant quantities, low-stock status, and adjustment controls.',
      width: 1440, height: 960,
    },
    {
      title: 'Completed Receipts',
      caption: 'Completed demo sales with receipt references, dates, and totals.',
      image: '/images/1128-pos/04-gallery-completed-receipts.png',
      alt: '1128 completed receipts screen listing fictional demo sales, dates, and totals.',
      width: 1365, height: 722,
    },
    {
      title: 'Sales Reports',
      caption: 'Branch and date filters, sales summaries, revenue charts, and CSV export.',
      image: '/images/1128-pos/05-gallery-sales-reports.png',
      alt: '1128 sales reports screen showing fictional demo totals, branch and date filters, charts, and export controls.',
      width: 1362, height: 723,
    },
  ],
  details: [
    {
      title: 'Checkout and inventory implementation',
      context: 'Local development · fictional demo data',
      facts: [
        { label: 'My contribution', text: 'Frontend and Express API development, relational schema design and additive migrations, checkout and inventory integration, and automated API/integration and browser testing. Development was AI-assisted.' },
        { label: 'Technical approach', text: 'The API validates checkout prices and branch access. Prisma and SQLite connect product variants, branch stock, stock movements, sales, and receipt records; checkout commits stock and sale changes together.' },
        { label: 'Full technology stack', text: 'React · TypeScript · Express · Prisma · SQLite' },
        { label: 'Screenshot context', text: 'The application was developed locally. These screenshots use fictional demo data from isolated test records.' },
      ],
      screenshotIndices: [1, 2, 3, 4],
    },
  ],
}

export const featuredCaseStudies: readonly FeaturedCaseStudy[] = [
  posProject,
  {
    id: 'sales-inventory',
    title: 'Chimes Sales and Inventory System',
    context: 'Chimes Consulting · Team internship project',
    workflow: 'A team-built workspace connecting sales, orders, and stock records.',
    contribution: 'Contributed to frontend and backend implementation and debugging; reviewed generated code and tested changes in the running app.',
    technologies: featuredProject.technologies,
    gallery: featuredProject.gallery,
    coverIndex: 0,
    details: [
      {
        title: 'Sales and inventory implementation',
        context: 'Chimes Consulting · Team internship project',
        facts: [
          { label: 'My work in the team', text: featuredProject.contribution },
          { label: 'Full technology stack', text: featuredProject.technologies.join(' · ') },
        ],
        screenshotIndices: [1, 2, 3],
      },
    ],
  },
  {
    id: 'bcp-lab-reservation',
    title: academicProject.title,
    context: academicProject.badge,
    workflow: academicProject.description,
    contribution: academicProject.developmentContext,
    technologies: academicProject.technologies,
    gallery: academicProject.gallery,
    coverIndex: 1,
    details: [
      {
        title: 'Reservation prototype details',
        context: 'Solo academic prototype',
        facts: [
          { label: 'Workflow', text: academicProject.description },
          { label: 'My prototype work', text: academicProject.developmentContext },
          { label: 'From proposal to prototype', text: academicProject.history },
          { label: 'Prototype technology stack', text: academicProject.technologies.join(' · ') },
        ],
        screenshotIndices: [0, 2, 3],
      },
    ],
  },
]
