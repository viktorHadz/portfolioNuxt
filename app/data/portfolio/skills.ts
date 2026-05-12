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
        blurb: 'Product logic, persistence and integrations behind real user flows.',
        what: 'I build the parts that make an interface survive real use: records that can change, files that need handling, forms that need storing, and data that has to stay consistent.',
        how: 'I keep backend work boring in the best way — clear request boundaries, simple schemas, and data paths that are easy to trace when something breaks.',
        tech: ['Go', 'Node.js', 'Express', 'SQLite', 'Supabase', 'SQL'],
        proofStories: [
            {
                projectId: 'invoice-and-go',
                title: 'Finance workflow backend',
                body: 'Invoice and Go puts client records, invoice revisions, payments, exports, and workspace logic behind one connected product flow.',
            },
            {
                projectId: 'watch-maker',
                title: 'Content and upload handling',
                body: 'The Watchmaker applies the same thinking to a content app: SQLite-backed posts, image uploads, email delivery, and admin publishing.',
            },
        ],
    },
    {
        id: 'auth-security',
        order: 2,
        eyebrow: 'Trust layer',
        title: ['auth &', 'security'],
        blurb: 'Sign-in, sessions and permission checks for protected product areas.',
        what: 'I add trust around the actions that need it: who can sign in, what they can access, which routes need protection, and which inputs need validating.',
        how: 'I prefer explicit checks over clever magic. Auth should support the main user path without turning the codebase into a guessing game.',
        tech: ['Go', 'OAuth2', 'Supabase', 'Node.js', 'Nginx', 'Linux'],
        proofStories: [
            {
                projectId: 'invoice-and-go',
                title: 'Product sign-in and workspace access',
                body: 'Invoice and Go uses Google sign-in as part of the product flow, tying access into workspace-level behaviour rather than treating auth as an afterthought.',
            },
            {
                projectId: 'watch-maker',
                title: 'Protected admin publishing',
                body: 'The Watchmaker protects its admin area with Google auth, allowed-email checks, signed sessions, rate limiting, and upload validation.',
            },
        ],
    },
    {
        id: 'deployment-ops',
        order: 3,
        eyebrow: 'Ship & maintain',
        title: ['deployment &', 'ops'],
        blurb: 'Hosting, build checks and server setup that keep projects maintainable.',
        what: 'I handle the practical work around shipping: static hosting, server deployment, reverse proxies, environment setup, and release checks.',
        how: 'I choose setups that are easy to understand, cheap to run where possible, and boring enough that updating the project does not feel dangerous.',
        tech: ['Linux', 'Nginx', 'Cloudflare', 'GitHub Actions'],
        proofStories: [
            {
                projectId: 'ido-group-bg',
                title: 'Low-overhead static delivery',
                body: 'IDO Elite Protection uses static generation on Cloudflare Pages with a single serverless contact endpoint instead of dragging in a full backend.',
            },
            {
                projectId: 'invoice-and-go',
                title: 'Traditional app deployment',
                body: 'Invoice and Go shows the heavier side: Debian hosting, Nginx, systemd, same-origin frontend delivery, and CI checks before changes ship.',
            },
        ],
    },
    {
        id: 'interface-ux',
        order: 4,
        eyebrow: 'Interface systems',
        title: ['interface &', 'UX'],
        blurb: 'Component-led interfaces with clear flow, motion and visual identity.',
        what: 'I build interfaces that help people understand what to do next: clear hierarchy, responsive layouts, useful motion, and visual systems that support the product instead of decorating it.',
        how: 'I start with the user journey, then keep the component structure lean enough that the frontend can keep evolving after the first version ships.',
        tech: ['Vue.js', 'React', 'Tailwind', 'SVG', 'GSAP', 'Canvas'],
        proofStories: [
            {
                projectId: 'sam-creations',
                title: 'Editorial marketing flow',
                body: 'S.A.M. Creations turns a studio-style service into a structured page journey, with content sections that feel designed rather than dumped onto the page.',
            },
            {
                projectId: 'watch-maker',
                title: 'Brand-led service experience',
                body: 'The Watchmaker combines visual identity, service trust, content browsing, and admin-managed posts inside a more stateful app experience.',
            },
        ],
    },
] satisfies SkillCardContent[]
