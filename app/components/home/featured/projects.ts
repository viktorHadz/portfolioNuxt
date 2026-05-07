import CarPpf from './previews/CarPpf.vue'
import Invoice from './previews/Invoice.vue'
import SamCreations from './previews/SamCreations.vue'
import WatchMaker from './previews/WatchMaker.vue'

export const tvProjects = [
    {
        id: 'invoice-and-go',
        channel: '01',
        eyebrow: 'Production finance workflow',
        title: 'Invoice and Go',
        blurb: 'Full-stack invoicing app built to replace manual templates with a proper finance workflow.',
        highlights: [
            'Invoice creation, revisions, and payment tracking.',
            'Client records and persistent business data.',
        ],
        stack: ['Go', 'SQLite', 'Vue'],
        preview: Invoice,
    },
    {
        id: 'ido-group-bg',
        channel: '02',
        eyebrow: 'Client marketing site',
        title: 'IDO Elite Protection',
        blurb: 'Fast business website for a PPF and detailing company, built around trust, speed, and enquiries.',
        highlights: [
            'Strong service-led public presence.',
            'Reliable serverless enquiry delivery.',
        ],
        stack: ['Vue', 'ViteSSG', 'Cloudflare'],
        preview: CarPpf,
    },
    {
        id: 'watch-maker',
        channel: '03',
        eyebrow: 'Production content site',
        title: 'The Watch Maker',
        blurb: 'Business site for watch repair with admin publishing, enquiries, image handling, and email workflows.',
        highlights: [
            'Controlled publishing and content management.',
            'Operational workflows beyond a static brochure site.',
        ],
        stack: ['Vue', 'Supabase', 'Resend'],
        preview: WatchMaker,
    },
    {
        id: 'sam-creations',
        channel: '04',
        eyebrow: 'Client marketing site',
        title: 'S.A.M. Creations',
        blurb: 'Polished garment manufacturer website designed to present services clearly and drive enquiries.',
        highlights: [
            'Clear service-led business presentation.',
            'SEO-minded content with direct enquiry flow.',
        ],
        stack: ['Next.js', 'React', 'Resend'],
        preview: SamCreations,
    },
]
