import gsap from 'gsap'

type SvgFillRevealOptions = {
    selector?: string
    grey?: string
    duration?: number
    ease?: string
    stagger?: number
}

type SvgFillRevealElement = SVGElement & {
    dataset: DOMStringMap & {
        originalFill?: string
    }
}

export function useSvgColourReveal(options: SvgFillRevealOptions = {}) {
    const {
        selector = '.reveal-fill',
        grey = '#6B6B6B',
        duration = 0.7,
        ease = 'power2.out',
        stagger = 0.025,
    } = options

    function prepare(rootEl: Element | null): SvgFillRevealElement[] {
        if (!rootEl) return []

        const parts = gsap.utils.toArray<SvgFillRevealElement>(selector, rootEl)

        parts.forEach((el) => {
            el.dataset.originalFill = el.getAttribute('fill') || 'none'
        })

        gsap.set(parts, {
            fill: grey,
        })

        return parts
    }

    function addToTimeline(
        timeline: gsap.core.Timeline,
        parts: SvgFillRevealElement[],
        position: gsap.Position = 0,
    ) {
        if (!parts.length) return

        timeline.to(
            parts,
            {
                fill: (_index, el: SvgFillRevealElement) => el.dataset.originalFill || 'none',
                duration,
                ease,
                stagger,
            },
            position,
        )
    }

    return {
        prepare,
        addToTimeline,
    }
}
