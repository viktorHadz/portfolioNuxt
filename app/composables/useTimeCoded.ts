const yrsCoded = ref(0)
export function useTimeCoded() {
    function calcTimeCoded() {
        const startedCodingAt = new Date(2022, 11, 20)

        const since = Date.now() - startedCodingAt.getTime()

        const y = Math.floor(since / 31536000000)
        // const d = Math.floor(since / 86400000) % 365 // days
        // const h = Math.floor(since / 3600000) % 24 // hours
        // const m = Math.floor(since / 60000) % 60 // minutes
        return y
    }
    const yrs = calcTimeCoded()
    yrsCoded.value = yrs
    return { yrsCoded }
}
