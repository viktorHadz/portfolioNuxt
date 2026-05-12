import type { Component } from 'vue'
import { featuredProjects } from '~/data/portfolio/projects'
import CarPpf from './previews/CarPpf.vue'
import Invoice from './previews/Invoice.vue'
import SamCreations from './previews/SamCreations.vue'
import WatchMaker from './previews/WatchMaker.vue'

type PreviewVariant = 'rings' | 'scan' | 'radial' | 'grid'

const previews: Record<string, Component> = {
    'ido-group-bg': CarPpf,
    'invoice-and-go': Invoice,
    'sam-creations': SamCreations,
    'watch-maker': WatchMaker,
}

const previewVariants: Record<string, PreviewVariant> = {
    'invoice-and-go': 'rings',
    'ido-group-bg': 'scan',
    'watch-maker': 'radial',
    'sam-creations': 'grid',
}

export const tvProjects = featuredProjects.map((project) => ({
    id: project.id,
    path: project.path,
    liveUrl: project.liveUrl,
    gitHub: project.gitHub,
    channel: project.featuredTeaser.channel,
    eyebrow: project.eyebrow,
    title: project.name,
    blurb: project.featuredTeaser.blurb,
    highlights: project.featuredTeaser.highlights,
    stack: project.stack.slice(0, 3),
    preview: previews[project.id],
    previewVariant: previewVariants[project.id] ?? 'rings',
}))
