import asciiGeneratorImage from '~/assets/projectPictures/asciiGenerator.webp'
import fuklaImage from '~/assets/projectPictures/fukla.webp'
import surveyGeneratorImage from '~/assets/projectPictures/surveyGenerator.webp'

import posterIDO from '@/assets/projectPictures/posters/idoGroupBgPoster.webp'
import posterInvoice from '@/assets/projectPictures/posters/invoiceAndGoPoster.webp'
import posterWatchmaker from '@/assets/projectPictures/posters/theWatchMakerPoster.webp'
import posterSamCreations from '@/assets/projectPictures/posters/samCreationsPoster.webp'

import alpineIcon from '~/assets/icons/techIcons/Alpine.js.svg'
import canvasApiIcon from '~/assets/icons/techIcons/Canvas-Api.svg'
import cloudflareIcon from '~/assets/icons/techIcons/Cloudflare.svg'
import cloudflarePagesIcon from '~/assets/icons/techIcons/Cloudflare-Pages.svg'
import cssIcon from '~/assets/icons/techIcons/CSS3.svg'
import debianIcon from '~/assets/icons/techIcons/Debian.svg'
import expressIcon from '~/assets/icons/techIcons/Express.svg'
import firebaseIcon from '~/assets/icons/techIcons/Firebase.svg'
import githubIcon from '~/assets/icons/techIcons/GitHub.svg'
import goIcon from '~/assets/icons/techIcons/Go.svg'
import gsapIcon from '~/assets/icons/techIcons/gsapIcon.svg'
import htmlIcon from '~/assets/icons/techIcons/HTML5.svg'
import javascriptIcon from '~/assets/icons/techIcons/JavaScript.svg'
import matplotlibIcon from '~/assets/icons/techIcons/Matplotlib.svg'
import nextIcon from '~/assets/icons/techIcons/Next.js.svg'
import nginxIcon from '~/assets/icons/techIcons/NGINX.svg'
import nodeIcon from '~/assets/icons/techIcons/Node.js.svg'
import oauthIcon from '~/assets/icons/techIcons/OAuth2.svg'
import pythonIcon from '~/assets/icons/techIcons/Python.svg'
import pythonDocxIcon from '~/assets/icons/techIcons/python-docx.svg'
import reactIcon from '~/assets/icons/techIcons/React.svg'
import resendIcon from '~/assets/icons/techIcons/Resend.svg'
import sqliteIcon from '~/assets/icons/techIcons/SQLite.svg'
import svgIcon from '~/assets/icons/techIcons/svgIcon.svg'
import supabaseIcon from '~/assets/icons/techIcons/Supabase.svg'
import tailwindIcon from '~/assets/icons/techIcons/TailwindCSS.svg'
import viteIcon from '~/assets/icons/techIcons/Vite.js.svg'
import vueIcon from '~/assets/icons/techIcons/Vue.js.svg'

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
    fukla: fuklaImage,
    invoiceAndGo: posterInvoice,
    samCreations: posterSamCreations,
    surveyGenerator: surveyGeneratorImage,
    watchMaker: posterWatchmaker,
    carPPF: posterIDO,
}

const techIcons = {
    'Alpine.js': alpineIcon,
    'Canvas API': canvasApiIcon,
    Cloudflare: cloudflareIcon,
    'Cloudflare Pages': cloudflarePagesIcon,
    'Cloudflare Pages Functions': cloudflarePagesIcon,
    CSS3: cssIcon,
    Express: expressIcon,
    Firebase: firebaseIcon,
    'GitHub Actions': githubIcon,
    Go: goIcon,
    GSAP: gsapIcon,
    HTML5: htmlIcon,
    JavaScript: javascriptIcon,
    Linux: debianIcon,
    Matplotlib: matplotlibIcon,
    Next: nextIcon,
    'Next.js': nextIcon,
    Nginx: nginxIcon,
    Node: nodeIcon,
    'Node.js': nodeIcon,
    OAuth: oauthIcon,
    OAuth2: oauthIcon,
    Python: pythonIcon,
    'python-docx': pythonDocxIcon,
    React: reactIcon,
    Resend: resendIcon,
    SQL: sqliteIcon,
    SQLite: sqliteIcon,
    Supabase: supabaseIcon,
    SVG: svgIcon,
    Tailwind: tailwindIcon,
    TailwindCSS: tailwindIcon,
    'Tailwind CSS': tailwindIcon,
    Vite: viteIcon,
    'Vite.js': viteIcon,
    ViteSSG: viteIcon,
    Vue: vueIcon,
    'Vue.js': vueIcon,
    VueJS: vueIcon,
} as const

export function getTechIcon(name: string) {
    return techIcons[name as keyof typeof techIcons] ?? null
}

export const portfolioContent = {
    hero: {
        eyebrow: ['Full-stack developer', 'years of shipping'],
        subheadline:
            'Vue & React UIs with Go or Node backends, built and deployed to run reliably in production.',
        primaryCta: 'Featured work',
        secondaryCta: 'Contact',
        stack: ['Vue', 'React', 'Go', 'Node'],
    },

    featuredProjects: [
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
            summary:
                'A production invoicing app built to replace manual templates with a proper finance workflow.',
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
            summary:
                'A fast business website for a car PPF and detailing company, built around trust, speed, and enquiries.',
            outcome:
                'The business gets a sharp public presence, reliable enquiry delivery, and low hosting overhead.',
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
            summary:
                'A production-style website for a watch repair business with admin, content, image, and email workflows.',
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
            summary:
                'A polished business website for a garment manufacturer, designed to present services clearly and drive enquiries.',
            outcome:
                'The business gets a credible public presence with a direct enquiry route and a maintainable frontend foundation.',
            build: 'Built with Next.js, React, Tailwind CSS, SEO-focused page content, and Resend email delivery.',
            stack: ['Next.js', 'React', 'TailwindCSS', 'Resend', 'Cloudflare'],
            responsibilities: ['Frontend', 'Content', 'Email', 'Deployment'],
        },
    ] satisfies FeaturedProject[],
    capabilities: [
        {
            title: 'Product UI',
            signal: 'Interface systems',
            summary:
                'Fast, responsive interfaces with component structure, motion, and user-first flow.',
            skills: ['Vue.js', 'React', 'TailwindCSS', 'SVG', 'GSAP'],
        },
        {
            title: 'Backend & Data',
            signal: 'Application core',
            summary:
                'Practical APIs, schemas, persistence, and integrations for products that need real state.',
            skills: ['Node.js', 'Express', 'SQLite', 'Supabase', 'SQL'],
        },
        {
            title: 'Auth & Security',
            signal: 'Trust layer',
            summary:
                'Login flows, sessions, OAuth, rate limits, and logging built into the system early.',
            skills: ['OAuth2', 'Supabase', 'Node.js', 'Nginx'],
        },
        {
            title: 'Deployment & Ops',
            signal: 'Ship and maintain',
            summary:
                'Linux hosting, reverse proxies, Cloudflare, and CI habits that make software stay online.',
            skills: ['Linux', 'Nginx', 'Cloudflare', 'GitHub Actions'],
        },
    ],
    processSteps: [
        {
            step: '01',
            title: 'Clarify the workflow',
            body: 'Find the real user job, the repeated pain, and the smallest useful product shape.',
            signal: 'Discovery',
        },
        {
            step: '02',
            title: 'Prototype the product',
            body: 'Build the interface path quickly, test the awkward parts, and keep the design honest.',
            signal: 'Prototype',
        },
        {
            step: '03',
            title: 'Connect the data',
            body: 'Add the API, database, auth, and integrations that make the product dependable.',
            signal: 'Systems',
        },
        {
            step: '04',
            title: 'Harden the edges',
            body: 'Handle validation, errors, security, performance, and the work users should never notice.',
            signal: 'Hardening',
        },
        {
            step: '05',
            title: 'Deploy and iterate',
            body: 'Put it online, check the production path, and improve it from real usage.',
            signal: 'Launch',
        },
    ],
    archiveProjects: [
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
            summary:
                'Canvas API image-to-ASCII utility with live controls for density, contrast, and brightness.',
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
            seoTitle: 'FUKLA',
            seoDescription:
                'A React and Firebase salon website with gallery management, caching, Cloudflare Pages deployment, and Tailwind styling.',
            summary:
                'React and Firebase salon site with gallery management, caching, and Cloudflare Pages deployment.',
            stack: ['React', 'Firebase', 'Cloudflare Pages', 'TailwindCSS'],
        },
    ] satisfies ArchiveProject[],
    journey: [
        {
            year: '2022',
            title: 'Automation spark',
            body: 'Started with Python scripts that removed repetitive admin work from spreadsheets and reports.',
        },
        {
            year: '2023',
            title: 'First product thinking',
            body: 'Turned invoice templates into a paid production tool and learned the difference between code that runs and software people can use.',
        },
        {
            year: '2024',
            title: 'Full-stack shift',
            body: 'Rebuilt around Node, Express, SQLite, auth, hosting, and the production habits needed to keep client apps alive.',
        },
        {
            year: '2025',
            title: 'Creative engineering',
            body: 'Kept shipping live project work while pushing deeper into Vue, GSAP, SVG systems, backend depth, Go, and product craft.',
        },
        {
            year: '2026',
            title: 'Sharper production focus',
            body: 'Building more polished Nuxt interfaces, cleaner backend boundaries, and client-ready workflows with a stronger eye for maintainability.',
        },
    ],
    contact: {
        heading: 'Got a product, workflow, or idea that needs turning into software?',
        body: "Get in touch. I'll reply with the first sensible next step.",
        actions: ['Direct Message', 'GitHub', 'My Resume'],
    },
}

const archiveFallbackResponsibilities = ['Frontend', 'Implementation']

function createFeaturedProject(project: FeaturedProject): PortfolioProject {
    return {
        ...project,
        category: 'Featured work',
    }
}

function createArchiveProject(project: ArchiveProject): PortfolioProject {
    return {
        ...project,
        category: 'Project archive',
        responsibilities: project.responsibilities ?? archiveFallbackResponsibilities,
    }
}

export const allProjects: PortfolioProject[] = [
    ...portfolioContent.featuredProjects.map(createFeaturedProject),
    ...portfolioContent.archiveProjects.map(createArchiveProject),
]

export function getProjectById(id: string) {
    return allProjects.find((project) => project.id === id) ?? null
}
