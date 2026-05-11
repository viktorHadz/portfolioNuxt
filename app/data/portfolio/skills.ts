export type SkillCardContent = {
    id: 'backend-data' | 'auth-security' | 'deployment-ops' | 'interface-ux'
    order: number
    eyebrow: string
    title: [string, string]
    blurb: string
    what: string
    how: string
    tech: string[]
    proof: string[]
}

export const skillCards = [
    {
        id: 'backend-data',
        order: 1,
        eyebrow: 'Application core',
        title: ['backend &', 'data'],
        blurb: 'APIs, databases, schemas and integrations that power my software.',
        what: 'I build the application logic behind real workflows: APIs, validation, persistence, reporting, and the data shape that keeps products reliable.',
        how: 'I keep the backend readable and practical first. Clear boundaries, sensible schemas, and boring debugging paths matter more to me than clever architecture.',
        tech: ['Node.js', 'Express', 'SQLite', 'Supabase', 'SQL'],
        proof: ['invoice-and-go', 'survey-generator'],
    },
    {
        id: 'auth-security',
        order: 2,
        eyebrow: 'Trust layer',
        title: ['auth &', 'security'],
        blurb: 'Authentication, authorization, sessions and data protection patterns.',
        what: 'I handle login flows, access control, rate limits, security logging, and the small production details that stop auth from becoming fragile.',
        how: 'I prefer simple, auditable flows with good failure handling. Security work is strongest when it is built into the product path early rather than added late.',
        tech: ['OAuth2', 'Supabase', 'Node.js', 'Nginx'],
        proof: ['watch-maker', 'invoice-and-go'],
    },
    {
        id: 'deployment-ops',
        order: 3,
        eyebrow: 'Ship & maintain',
        title: ['deployment &', 'ops'],
        blurb: 'CI/CD, testing, servers, monitoring and logging that keep production stable.',
        what: 'I ship sites and apps to real environments, wire domains and proxies, and put enough operational guard rails in place that the software stays usable.',
        how: 'My focus is dependable delivery over ceremony: clear deploy steps, measurable production paths, and infrastructure choices that are easy to reason about.',
        tech: ['Linux', 'Nginx', 'Cloudflare', 'GitHub Actions'],
        proof: ['ido-group-bg', 'watch-maker'],
    },
    {
        id: 'interface-ux',
        order: 4,
        eyebrow: 'Interface systems',
        title: ['interface &', 'UX'],
        blurb: 'Component-driven UI/UX optimized for performance and user-first flow.',
        what: 'I design and build interfaces that feel intentional, fast, and easy to move through, from marketing pages to product workflows with more state.',
        how: 'I care about layout rhythm, readable hierarchy, motion with purpose, and keeping components simple enough that future edits stay cheap.',
        tech: ['Vue.js', 'React', 'TailwindCSS', 'SVG', 'GSAP'],
        proof: ['sam-creations', 'ascii-generator'],
    },
] satisfies SkillCardContent[]
