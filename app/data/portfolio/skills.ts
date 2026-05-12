type SkillProofStory = {
    projectId: string
    title: string
    body: string
}

export type SkillCardContent = {
    id: 'backend-data' | 'auth-security' | 'deployment-ops' | 'interface-ux'
    order: number
    eyebrow: string
    title: [string, string]
    blurb: string
    what: string
    how: string
    tech: string[]
    proofStories: SkillProofStory[]
}

export const skillCards = [
    {
        id: 'backend-data',
        order: 1,
        eyebrow: 'Application core',
        title: ['backend &', 'data'],
        blurb: 'APIs, databases, schemas and integrations that power my software.',
        what: 'APIs, data models, persistence, and integrations that keep real workflows consistent once the UI has more than demo-level state.',
        how: 'I keep backend work boring in the best way: clear request boundaries, simple schemas, and data paths that stay easy to debug as the product grows.',
        tech: ['Node.js', 'Express', 'SQLite', 'Supabase', 'SQL'],
        proofStories: [
            {
                projectId: 'invoice-and-go',
                title: 'Finance workflow backend',
                body: 'Invoice and Go proves this through client records, invoice revisions, payments, exports, and workspace logic sitting behind one product flow.',
            },
            {
                projectId: 'watch-maker',
                title: 'Content and upload handling',
                body: 'The Watchmaker shows the same skill in a different shape: SQLite-backed content, uploads, email delivery, and post management inside one app.',
            },
        ],
    },
    {
        id: 'auth-security',
        order: 2,
        eyebrow: 'Trust layer',
        title: ['auth &', 'security'],
        blurb: 'Authentication, authorization, sessions and data protection patterns.',
        what: 'Sign-in, sessions, access control, and validation around the routes and actions that need trust.',
        how: 'I prefer explicit permission checks, simple session flows, and security work that supports the main user path instead of feeling bolted on afterwards.',
        tech: ['OAuth2', 'Supabase', 'Node.js', 'Nginx'],
        proofStories: [
            {
                projectId: 'invoice-and-go',
                title: 'Product sign-in and billing access',
                body: 'Invoice and Go uses Google sign-in as part of the real product path, with access tied into workspace and billing-aware flows.',
            },
            {
                projectId: 'watch-maker',
                title: 'Protected admin publishing',
                body: 'The Watchmaker uses Google auth, allowed-email checks, signed sessions, rate limiting, and upload validation to protect the admin workflow.',
            },
        ],
    },
    {
        id: 'deployment-ops',
        order: 3,
        eyebrow: 'Ship & maintain',
        title: ['deployment &', 'ops'],
        blurb: 'CI/CD, testing, servers, monitoring and logging that keep production stable.',
        what: 'The work that gets software online and keeps it understandable once it is live: hosting, proxies, build checks, and release flow.',
        how: 'I choose infrastructure that is easy to reason about, cheap to run when possible, and clear enough that shipping changes does not feel risky.',
        tech: ['Linux', 'Nginx', 'Cloudflare', 'GitHub Actions'],
        proofStories: [
            {
                projectId: 'ido-group-bg',
                title: 'Low-overhead static delivery',
                body: 'IDO Elite Protection shows this through static generation on Cloudflare Pages with one serverless contact endpoint instead of a full server stack.',
            },
            {
                projectId: 'invoice-and-go',
                title: 'Traditional app deployment',
                body: 'Invoice and Go shows the other side of the work: Debian hosting, Nginx, systemd, same-origin frontend delivery, and shared verification in CI.',
            },
        ],
    },
    {
        id: 'interface-ux',
        order: 4,
        eyebrow: 'Interface systems',
        title: ['interface &', 'UX'],
        blurb: 'Component-driven UI/UX optimized for performance and user-first flow.',
        what: 'Interfaces that guide people through a task quickly, with clear hierarchy, responsive layouts, and enough personality to feel intentional.',
        how: 'I start from the user journey, then keep components lean so the frontend still feels easy to change after the first version ships.',
        tech: ['Vue.js', 'React', 'TailwindCSS', 'SVG', 'GSAP'],
        proofStories: [
            {
                projectId: 'sam-creations',
                title: 'Editorial marketing flow',
                body: 'S.A.M. Creations proves this through a clear studio narrative, structured page journeys, and a frontend built to support content without clutter.',
            },
            {
                projectId: 'watch-maker',
                title: 'Brand-led service experience',
                body: 'The Watchmaker shows the same strength in a more stateful app, where visual identity, trust, and content browsing all have to work together.',
            },
        ],
    },
] satisfies SkillCardContent[]
