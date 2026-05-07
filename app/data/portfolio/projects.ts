import asciiGeneratorImage from '~/assets/images/projects/ascii-generator.webp'
import fuklaImage from '~/assets/images/projects/fukla.webp'
import surveyGeneratorImage from '~/assets/images/projects/survey-generator.webp'

import posterIDO from '~/assets/images/projects/posters/ido-group-bg-poster.webp'
import posterInvoice from '~/assets/images/projects/posters/invoice-and-go-poster.webp'
import posterSamCreations from '~/assets/images/projects/posters/sam-creations-poster.webp'
import posterWatchmaker from '~/assets/images/projects/posters/watch-maker-poster.webp'

type ProjectBase = {
  id: string
  name: string
  path: string
  gitHub: string
  liveUrl?: string
  eyebrow: string
  image: string | null
  imageAlt: string
  seoTitle: string
  seoDescription: string
  stack: string[]
}

type FeaturedProject = ProjectBase & {
  summary: string
  outcome: string
  build: string
  responsibilities: string[]
}

type ArchiveProject = ProjectBase & {
  summary: string
  responsibilities?: string[]
}

export type PortfolioProject = (FeaturedProject | ArchiveProject) & {
  category: 'Featured work' | 'Project archive'
  responsibilities: string[]
}

const projectImages = {
  asciiGenerator: asciiGeneratorImage,
  carPPF: posterIDO,
  fukla: fuklaImage,
  invoiceAndGo: posterInvoice,
  samCreations: posterSamCreations,
  surveyGenerator: surveyGeneratorImage,
  watchMaker: posterWatchmaker,
}

export const featuredProjects = [
  {
    id: 'invoice-and-go',
    name: 'Invoice and Go',
    path: '/projects/invoice-and-go',
    gitHub: 'https://github.com/viktorHadz/goInvoice26',
    liveUrl: 'https://invoiceandgo.app',
    eyebrow: 'Production finance workflow',
    image: projectImages.invoiceAndGo,
    imageAlt: 'Invoicing app interface with invoice management controls.',
    seoTitle: 'Invoice and Go',
    seoDescription:
      'A full-stack invoicing app with OAuth, SQLite, invoice generation, and a production finance workflow for a small business.',
    summary: 'A production invoicing app built to replace manual templates with a proper finance workflow.',
    outcome:
      'Active users can create, manage, and track invoices from one business tool instead of stitching documents together by hand.',
    build: 'Built with Go, SQLite, OAuth, invoice generation, persistence, and a lightweight Vue/Tailwind interface.',
    stack: ['Go', 'SQLite', 'OAuth2', 'VueJS', 'TailwindCSS'],
    responsibilities: ['Frontend', 'Backend', 'Auth/Data', 'Payments', 'Deployment'],
  },
  {
    id: 'ido-group-bg',
    name: 'IDO Elite Protection',
    path: '/projects/ido-group-bg',
    gitHub: 'https://github.com/viktorHadz/ppf',
    liveUrl: 'https://idogroupbg.com',
    eyebrow: 'Client marketing site',
    image: projectImages.carPPF,
    imageAlt: 'IDOGroupBg.com generated business website preview.',
    seoTitle: 'Detailing Website IDOGroupBg',
    seoDescription:
      'A static-generated Vue business site using ViteSSG, Cloudflare Pages Functions, Resend, and a serverless enquiry flow.',
    summary: 'A fast business website for a car PPF and detailing company, built around trust, speed, and enquiries.',
    outcome: 'The business gets a sharp public presence, reliable enquiry delivery, and low hosting overhead.',
    build: 'Built with Vue, ViteSSG, Tailwind CSS, Cloudflare Pages Functions, and Resend.',
    stack: ['Vue.js', 'ViteSSG', 'TailwindCSS', 'Cloudflare Pages', 'Resend'],
    responsibilities: ['Frontend', 'Backend', 'Auth/Data', 'Deployment'],
  },
  {
    id: 'watch-maker',
    name: 'The Watch Maker',
    path: '/projects/watch-maker',
    gitHub: 'https://github.com/viktorHadz/watchmaker-express',
    liveUrl: 'https://thewatchmaker.uk',
    eyebrow: 'Production content site',
    image: projectImages.watchMaker,
    imageAlt: 'Watch Maker website interface with product and admin content.',
    seoTitle: 'The Watch Maker',
    seoDescription:
      'A Vue and Supabase product site with admin login, content workflows, Resend email, image compression, and security logging.',
    summary: 'A production-style website for a watch repair business with admin, content, image, and email workflows.',
    outcome:
      'The site supports controlled publishing, enquiries, and stronger operational foundations than a static brochure site.',
    build: 'Built with Vue, Vite, Supabase, Resend, custom image compression, rate limiting, and security logging.',
    stack: ['Vue.js', 'Vite.js', 'Supabase', 'Resend', 'TailwindCSS'],
    responsibilities: ['Frontend', 'Backend', 'Auth/Data', 'Deployment', 'Blog'],
  },
  {
    id: 'sam-creations',
    name: 'S.A.M. Creations',
    path: '/projects/sam-creations',
    liveUrl: 'https://samcreations.uk/',
    gitHub: 'https://github.com/viktorHadz/samCreationsTailorStudio',
    eyebrow: 'Client marketing site',
    image: projectImages.samCreations,
    imageAlt: 'S.A.M. Creations website homepage for a garment manufacturer.',
    seoTitle: 'S.A.M. Creations',
    seoDescription:
      'A Next and React business website with SEO-minded content, Tailwind styling, and Resend-powered mailing.',
    summary: 'A polished business website for a garment manufacturer, designed to present services clearly and drive enquiries.',
    outcome:
      'The business gets a credible public presence with a direct enquiry route and a maintainable frontend foundation.',
    build: 'Built with Next.js, React, Tailwind CSS, SEO-focused page content, and Resend email delivery.',
    stack: ['Next.js', 'React', 'TailwindCSS', 'Resend', 'Cloudflare'],
    responsibilities: ['Frontend', 'Content', 'Email', 'Deployment'],
  },
] satisfies FeaturedProject[]

export const archiveProjects = [
  {
    id: 'ascii-generator',
    name: 'ASCII Generator',
    path: '/projects/ascii-generator',
    liveUrl: undefined,
    gitHub: 'https://github.com/viktorHadz/ascii-generator',
    eyebrow: 'Browser creative tool',
    image: projectImages.asciiGenerator,
    imageAlt: 'Browser-based ASCII generator interface.',
    seoTitle: 'ASCII Generator',
    seoDescription:
      'A browser-based Canvas API image-to-ASCII utility with live controls for density, contrast, and brightness.',
    summary: 'Canvas API image-to-ASCII utility with live controls for density, contrast, and brightness.',
    stack: ['JavaScript', 'Canvas API', 'HTML5', 'CSS3'],
  },
  {
    id: 'survey-generator',
    name: 'Survey Generator',
    path: '/projects/survey-generator',
    liveUrl: undefined,
    gitHub: 'https://github.com/viktorHadz/pythonSurveyGenerator',
    eyebrow: 'Python automation',
    image: projectImages.surveyGenerator,
    imageAlt: 'Python-generated survey report document.',
    seoTitle: 'Survey Generator',
    seoDescription:
      'A Python automation project that turns survey data into Word reports with charts and summaries.',
    summary: 'Python automation that turns survey data into Word reports with charts and summaries.',
    stack: ['Python', 'Matplotlib', 'python-docx'],
  },
  {
    id: 'fukla',
    name: 'FUKLA',
    path: '/projects/fukla',
    liveUrl: 'https://www.fukla.me/',
    gitHub: 'https://github.com/viktorHadz/fukla',
    eyebrow: 'Beauty Salon website',
    image: projectImages.fukla,
    imageAlt: 'FUKLA salon website homepage.',
    seoTitle: 'FUKLA',
    seoDescription:
      'A React and Firebase salon website with gallery management, caching, Cloudflare Pages deployment, and Tailwind styling.',
    summary: 'React and Firebase salon site with gallery management, caching, and Cloudflare Pages deployment.',
    stack: ['React', 'Firebase', 'Cloudflare Pages', 'TailwindCSS'],
  },
] satisfies ArchiveProject[]

const archiveFallbackResponsibilities = ['Frontend', 'Implementation']

function createFeaturedProject(project: FeaturedProject): PortfolioProject {
  return { ...project, category: 'Featured work' }
}

function createArchiveProject(project: ArchiveProject): PortfolioProject {
  return {
    ...project,
    category: 'Project archive',
    responsibilities: project.responsibilities ?? archiveFallbackResponsibilities,
  }
}

export const allProjects: PortfolioProject[] = [
  ...featuredProjects.map(createFeaturedProject),
  ...archiveProjects.map(createArchiveProject),
]

export function getProjectById(id: string) {
  return allProjects.find((project) => project.id === id) ?? null
}
