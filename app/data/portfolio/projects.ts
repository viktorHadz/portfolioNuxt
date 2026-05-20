import asciiGeneratorImage from '~/assets/images/projects/ascii-generator.webp'
import fuklaImage from '~/assets/images/projects/fukla.webp'
import surveyGeneratorImage from '~/assets/images/projects/survey-generator.webp'

import posterIDO from '~/assets/images/projects/posters/ido-group-bg-poster.webp'
import posterInvoice from '~/assets/images/projects/posters/invoice-and-go-poster.webp'
import posterSamCreations from '~/assets/images/projects/posters/sam-creations-poster.webp'
import posterWatchmaker from '~/assets/images/projects/posters/watch-maker-poster.webp'
import posterCprint from '~/assets/images/projects/posters/cPrint-poster.webp'

type ProjectBase = {
    id: string
    name: string
    path: string
    gitHub: string
    liveUrl?: string
    date?: string
    year?: string
    eyebrow: string
    image: string | null
    imageAlt: string
    seoTitle: string
    seoDescription: string
    stack: string[]
}

type ProjectFact = { label: string; value: string }

type ProjectStorySection = { title: string; body: string }

type FeaturedTeaser = { channel: string; blurb: string; highlights: string[] }

export type FeaturedProject = ProjectBase & {
    pageVariant: 'product' | 'marketing'
    summary: string
    intro: string
    facts: ProjectFact[]
    storySections: ProjectStorySection[]
    proofPoints: string[]
    featuredTeaser: FeaturedTeaser
    responsibilities: string[]
}

type ArchiveProject = ProjectBase & {
    summary: string
    responsibilities?: string[]
    facts?: ProjectFact[]
    storySections?: ProjectStorySection[]
    proofPoints?: string[]
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
    cprint: posterCprint,
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
        seoTitle: 'Invoice and Go | Go and Vue Invoicing App',
        seoDescription:
            'A full-stack invoicing app with Google sign-in, billing, SQLite persistence, and exports for real finance work.',
        summary:
            'A production invoicing app that turns messy document work into one usable system.',
        intro: 'Invoice and Go replaces manual invoice templates with one workflow for sign-in, client records, invoice creation, revisions, payments, exports, and team-aware billing.',
        facts: [
            { label: 'Type', value: 'Production invoicing app' },
            { label: 'Users', value: 'Small business teams' },
            { label: 'Core stack', value: 'Go, Vue, SQLite' },
            { label: 'Delivery', value: 'Debian, Nginx, systemd' },
        ],
        storySections: [
            {
                title: 'The workflow',
                body: 'The product is built around the day-to-day job of creating invoices, managing revisions, tracking payments, and keeping client records in one place. Instead of jumping between documents and folders, the user moves through one clear finance flow.',
            },
            {
                title: 'What runs behind it',
                body: 'Behind the interface, Go handles the API, workspace logic, team settings, billing, and document generation. SQLite keeps the data model simple and dependable, while Google OAuth handles sign-in and access.',
            },
            {
                title: 'Why it holds up in production',
                body: 'The app is designed for same-origin deployment on a Debian server, with Nginx serving the frontend and proxying the API to a Go service managed by systemd. Shared checks, hooks, and GitHub Actions help keep releases reviewable before they reach production.',
            },
        ],
        proofPoints: [
            'Google sign-in is part of the real product path, not a placeholder auth screen.',
            'Users can manage clients, invoices, revisions, payments, and exports in one tool.',
            'Workspace and billing logic support both solo and team usage.',
            'The frontend and backend are deployed together behind one public domain.',
        ],
        featuredTeaser: {
            channel: '01',
            blurb: 'A real invoicing product built to replace manual templates with one clean business workflow.',
            highlights: [
                'Invoice creation, revisions, and payment tracking live in one flow.',
                'Google sign-in, billing, and persistence are built into the product.',
            ],
        },
        pageVariant: 'product',
        stack: ['Go', 'Vue.js', 'SQLite', 'OAuth2', 'Stripe'],
        responsibilities: ['Frontend', 'Backend', 'Authentication', 'Billing', 'Deployment'],
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
        seoTitle: 'IDO Elite Protection | SEO-first Detailing Website',
        seoDescription:
            'A static-generated business site with SEO-first pages, a validated serverless contact flow, and low-overhead hosting.',
        summary: 'A fast marketing site designed to earn trust and turn visits into enquiries.',
        intro: 'IDO Elite Protection is a statically generated business website for an automotive paint protection and detailing studio, built to stay fast, rank well, and capture enquiries without needing a full server.',
        facts: [
            { label: 'Type', value: 'Static marketing site' },
            { label: 'Visitor goal', value: 'Trust and enquiries' },
            { label: 'Core stack', value: 'Vue, ViteSSG, Cloudflare' },
            { label: 'Ops model', value: 'Serverless contact flow' },
        ],
        storySections: [
            {
                title: 'The brief',
                body: 'The job was to present several services clearly, give the business a stronger public presence, and keep the site simple to maintain. Search visibility, load speed, and trust signals matter more here than product complexity.',
            },
            {
                title: 'How visitors move through it',
                body: 'Visitors land on pre-rendered service and portfolio pages, get route-specific metadata, and move quickly toward the contact path. The site feels modern in use, but the important journeys stay content-led and easy to follow.',
            },
            {
                title: 'What keeps it reliable',
                body: 'Most of the site ships as static output on Cloudflare Pages, so there is no always-on backend or database to maintain. The only dynamic piece is a validated contact endpoint that runs as a Pages Function and sends business and customer emails through Resend.',
            },
        ],
        proofPoints: [
            'Pages are pre-rendered ahead of time for speed and search visibility.',
            'The contact flow validates submissions before sending business and customer emails.',
            'The architecture avoids a traditional server and any persistent backend state.',
            'Sitemap and route-level metadata support the SEO goals of the business site.',
        ],
        featuredTeaser: {
            channel: '02',
            blurb: 'A service-led website built to feel polished, rank well, and keep enquiries dependable.',
            highlights: [
                'Static pages give the business speed, SEO, and low hosting overhead.',
                'One serverless contact path keeps the only dynamic workflow simple.',
            ],
        },
        pageVariant: 'marketing',
        stack: ['Vue.js', 'ViteSSG', 'Tailwind', 'Cloudflare Pages', 'Resend'],
        responsibilities: ['Frontend', 'SEO', 'Contact flow', 'Deployment'],
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
        seoTitle: 'The Watch Maker | Vue and Express Content Site',
        seoDescription:
            'A craft-led service site with a custom blog, protected admin publishing, SQLite content storage, and enquiry handling.',
        summary: 'A craft-led service site with its own publishing workflow, not just a brochure.',
        intro: 'The Watchmaker combines a polished public-facing repair website with a custom workshop blog, gallery, admin publishing flow, and backend services for uploads, authentication, and contact enquiries.',
        facts: [
            { label: 'Type', value: 'Content-managed service site' },
            { label: 'Content', value: 'Custom blog and gallery' },
            { label: 'Core stack', value: 'Vue, Express, SQLite' },
            { label: 'Publishing', value: 'Google sign-in admin' },
        ],
        storySections: [
            {
                title: 'The workflow',
                body: 'For visitors, the site explains the service, builds trust, and makes it easy to send a repair enquiry, including optional images. For the business owner, it also supports publishing workshop posts and gallery content from inside the same app.',
            },
            {
                title: 'What runs behind it',
                body: 'Vue handles the frontend experience while Express, SQLite, file uploads, email delivery, and admin authentication sit behind it. Google sign-in, allowed-email checks, and cookie-backed sessions create a real publishing workflow instead of manual code edits.',
            },
            {
                title: 'Why it holds up in production',
                body: 'The backend includes rate limiting, sanitisation, upload validation, and session checks, so the operational edges are treated as part of the product. In production, Express serves the built frontend and uploaded media together, which keeps the deployment model straightforward.',
            },
        ],
        proofPoints: [
            'Published workshop posts flow into both a gallery view and individual detail pages.',
            'Admin access is restricted by Google sign-in, allowed email addresses, and signed sessions.',
            'The backend handles uploads, email delivery, and SQLite-backed content storage.',
            'Security middleware covers rate limiting, sanitisation, session checks, and upload validation.',
        ],
        featuredTeaser: {
            channel: '03',
            blurb: 'A watch repair site with a light custom built CMS. Not just a static public front end.',
            highlights: [
                'Supports public enquiries and protected content publishing.',
                'Custom blog, gallery, uploads, and authentication.',
            ],
        },
        pageVariant: 'product',
        stack: ['Vue.js', 'Express', 'SQLite', 'Resend', 'Tailwind'],
        responsibilities: ['Frontend', 'Backend', 'Authentication', 'Content system', 'Deployment'],
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
        seoTitle: 'S.A.M. Creations | Next.js Studio Website',
        seoDescription:
            'An editorial marketing site with MDX-driven content, structured visitor journeys, and a production-ready enquiry path.',
        summary:
            'An editorial marketing site that presents a garment studio clearly and keeps content manageable.',
        intro: 'S.A.M. Creations is a content-led Next.js website for a London garment manufacturing studio, designed to tell the studio story, show work, guide visitors through the process, and collect enquiries through one polished frontend.',
        facts: [
            { label: 'Type', value: 'Editorial marketing site' },
            { label: 'Content', value: 'App Router and MDX' },
            { label: 'Core stack', value: 'Next.js, React, Tailwind' },
            { label: 'Enquiries', value: 'Server action and Resend' },
        ],
        storySections: [
            {
                title: 'The brief',
                body: 'The site needed to feel credible and editorial while still explaining services, process, and outcomes in plain terms. The goal was not just to look polished, but to guide potential clients toward confidence and contact.',
            },
            {
                title: 'How visitors move through it',
                body: 'The main journeys cover studio intro, process, work, gallery, and contact, with case studies and gallery content managed through MDX. That keeps the content surface structured without turning the site into a CMS-heavy build.',
            },
            {
                title: 'What keeps it reliable',
                body: 'Next.js App Router provides a clear page structure, reusable UI keeps copy presentation consistent, and the contact form runs through a server action with validation, rate limiting, and Resend delivery. The result is content-first, but still production-aware.',
            },
        ],
        proofPoints: [
            'The content model separates core pages, case studies, and gallery content cleanly.',
            'MDX powers richer work and gallery sections without adding CMS overhead.',
            'The enquiry path validates input and applies a basic rate limit before sending email.',
            'Reusable components keep the presentation system consistent across the site.',
        ],
        featuredTeaser: {
            channel: '04',
            blurb: 'A content-led studio website built to feel editorial while staying easy to maintain.',
            highlights: [
                "A clear visitor journey through the studio's story, process, gallery, and contact.",
                'MDX and reusable UI keep the content system practical behind the scenes.',
            ],
        },
        pageVariant: 'marketing',
        stack: ['Next.js', 'React', 'Tailwind', 'MDX', 'Resend'],
        responsibilities: ['Frontend', 'Content system', 'Enquiry flow', 'Deployment'],
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
        seoTitle: 'ASCII Generator | JavaScript Canvas Tool',
        seoDescription:
            'A browser-based Canvas API image-to-ASCII utility with live controls for density, contrast, and brightness.',
        summary:
            'Canvas API image-to-ASCII utility with live controls for density, contrast, and brightness.',
        stack: ['JavaScript', 'Canvas', 'HTML5', 'CSS3'],
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
        seoTitle: 'Survey Generator | Python Report Automation',
        seoDescription:
            'A Python automation project that turns survey data into Word reports with charts and summaries.',
        summary:
            'Python automation that turns survey data into Word reports with charts and summaries.',
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
        seoTitle: 'FUKLA | React Salon Website',
        seoDescription:
            'A React and Firebase salon website with gallery management, caching, Cloudflare Pages deployment, and Tailwind styling.',
        summary:
            'React and Firebase salon site with gallery management, caching, and Cloudflare Pages deployment.',
        stack: ['React', 'Firebase', 'Cloudflare Pages', 'Tailwind'],
    },
    {
        id: 'cprint',
        name: 'cprint',
        path: '/projects/cprint',
        liveUrl: undefined,
        gitHub: 'https://github.com/viktorHadz/cprint',
        year: '2025',
        eyebrow: 'Go CLI utility',
        image: projectImages.cprint,
        imageAlt: 'cprint command line output.',
        seoTitle: 'cprint | Go CLI File Printer',
        seoDescription:
            'A small Go CLI that prints file contents to stdout from relative or absolute paths, with Cobra-powered help output and simple argument validation.',
        summary:
            'Go CLI utility that prints file contents from a provided path straight to stdout.',
        stack: ['Go', 'Cobra', 'CLI'],
        facts: [
            { label: 'Type', value: 'Single-purpose CLI tool' },
            { label: 'Input', value: 'Relative or absolute file path' },
            { label: 'Core stack', value: 'Go, Cobra' },
            { label: 'Output', value: 'Plain stdout print' },
        ],
        storySections: [
            {
                title: 'Command shape',
                body: 'cprint keeps the interface deliberately small: one command, one file argument, and a direct output path for quick terminal use.',
            },
            {
                title: 'What it does',
                body: 'The tool reads a provided path with Go file I/O and prints the raw file contents to stdout, which makes it a simple fit for quick checks and shell workflows.',
            },
            {
                title: 'Developer touches',
                body: 'The command includes custom help text, ANSI-coloured usage output, and examples for relative and absolute paths, so even a tiny utility still feels intentional to use.',
            },
        ],
        proofPoints: [
            'Accepts both relative and absolute file paths.',
            'Uses Cobra for command wiring and custom help output.',
            'Shows a usage message when no file argument is provided.',
        ],
        responsibilities: ['CLI', 'File I/O', 'Developer tooling'],
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

export function isFeaturedProject(
    project: PortfolioProject | null,
): project is FeaturedProject & { category: 'Featured work' } {
    return Boolean(project && 'pageVariant' in project)
}
