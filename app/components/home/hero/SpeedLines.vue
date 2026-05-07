<script setup>
const props = defineProps({
  active: {
    type: Boolean,
    default: true,
  },
})

const root = useTemplateRef('root')
const canvas = useTemplateRef('canvas')

const colorVars = ['--acc-primary', '--acc-secondary', '--acc-tertiary']

const streaks = Array.from({ length: 24 }, (_, i) => ({
  x: (12 + ((i * 19) % 78)) / 100,
  y: (6 + ((i * 29) % 88)) / 100,
  length: 72 + (i % 7) * 16,
  color: i % colorVars.length,
  delay: (i % 9) * 350,
  duration: 1900 + (i % 6) * 350,
  height: 1 + (i % 4 ? 1 : 0),
  opacity: 0.18 + (i % 4) * 0.14,
  shift: 32 + (i % 5) * 10,
}))

let ctx
let dpr = 1
let rafId = 0
let running = false
let startedAt = 0
let elapsed = 0
let resizeObserver
let motionQuery
let colors = []

const size = {
  width: 0,
  height: 0,
}

function alphaColor(color, alpha) {
  if (!color) return `rgba(0, 0, 0, ${alpha})`
  if (color.startsWith('hsl(')) return `hsla(${color.slice(4, -1)}, ${alpha})`
  if (color.startsWith('rgb(')) return `rgba(${color.slice(4, -1)}, ${alpha})`
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    const full = hex.length === 3 ? hex.split('').map((char) => char + char).join('') : hex.slice(0, 6)
    const int = Number.parseInt(full, 16)
    return `rgba(${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}, ${alpha})`
  }
  return color
}

function setColors() {
  const style = getComputedStyle(document.documentElement)
  colors = colorVars.map((name) => style.getPropertyValue(name).trim())
}

function visibleStreaks() {
  return size.width >= 1024 ? streaks : streaks.slice(0, 12)
}

function getOpacity(progress, max) {
  if (progress < 0.18) return max * (progress / 0.18)
  if (progress < 0.72) return max
  return max * (1 - (progress - 0.72) / 0.28)
}

function drawStreak(streak, ms, staticDraw = false) {
  const color = colors[streak.color]
  const opacity = staticDraw ? streak.opacity * 0.7 : getOpacity(((ms + streak.delay) % streak.duration) / streak.duration, streak.opacity)

  if (!color || opacity <= 0.01) return

  const progress = staticDraw ? 0.45 : ((ms + streak.delay) % streak.duration) / streak.duration
  const shift = staticDraw ? 0 : -streak.shift + streak.shift * 2 * progress
  const x = size.width * streak.x + shift
  const y = size.height * streak.y
  const gradient = ctx.createLinearGradient(x - streak.length / 2, y, x + streak.length / 2, y)

  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
  gradient.addColorStop(0.24, alphaColor(color, opacity * 0.12))
  gradient.addColorStop(0.58, alphaColor(color, opacity))
  gradient.addColorStop(0.78, alphaColor(color, opacity * 0.3))
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

  ctx.strokeStyle = gradient
  ctx.lineWidth = streak.height
  ctx.lineCap = 'round'
  ctx.beginPath()
  ctx.moveTo(x - streak.length / 2, y)
  ctx.lineTo(x + streak.length / 2, y)
  ctx.stroke()
}

function render(now = performance.now()) {
  if (!ctx || !size.width || !size.height) return

  ctx.clearRect(0, 0, size.width, size.height)

  const staticDraw = motionQuery?.matches
  const ms = staticDraw ? 0 : elapsed + (running ? now - startedAt : 0)

  visibleStreaks().forEach((streak) => drawStreak(streak, ms, staticDraw))
}

function frame(now) {
  if (!running) return
  render(now)
  rafId = requestAnimationFrame(frame)
}

function stop() {
  if (!running) return
  elapsed += performance.now() - startedAt
  running = false
  cancelAnimationFrame(rafId)
  rafId = 0
}

function syncPlayback() {
  if (!ctx || !size.width || !size.height) return

  if (motionQuery?.matches) {
    stop()
    render()
    return
  }

  if (props.active && !document.hidden) {
    if (!running) {
      startedAt = performance.now()
      running = true
      rafId = requestAnimationFrame(frame)
    }
    return
  }

  stop()
  render()
}

function resizeCanvas() {
  const rect = root.value?.getBoundingClientRect()

  if (!ctx || !canvas.value || !rect?.width || !rect?.height) {
    size.width = 0
    size.height = 0
    stop()
    return
  }

  size.width = rect.width
  size.height = rect.height
  dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.value.width = Math.round(size.width * dpr)
  canvas.value.height = Math.round(size.height * dpr)
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  setColors()
  render()
  syncPlayback()
}

function handleMotionChange() {
  elapsed = 0
  startedAt = 0
  syncPlayback()
}

onMounted(() => {
  ctx = canvas.value?.getContext('2d')

  if (!ctx || !root.value) return

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  resizeObserver = new ResizeObserver(resizeCanvas)
  resizeObserver.observe(root.value)
  motionQuery.addEventListener('change', handleMotionChange)
  document.addEventListener('visibilitychange', syncPlayback)
  resizeCanvas()
  syncPlayback()
})

watch(() => props.active, syncPlayback)

onUnmounted(() => {
  stop()
  resizeObserver?.disconnect()
  motionQuery?.removeEventListener('change', handleMotionChange)
  document.removeEventListener('visibilitychange', syncPlayback)
})
</script>

<template>
  <div
    ref="root"
    class="pointer-events-none absolute inset-0 overflow-hidden"
    aria-hidden="true"
  >
    <canvas
      ref="canvas"
      class="block h-full w-full"
    />
  </div>
</template>
