<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * ASCII renderer for images on a canvas + plain text export.
 * - Upload converts image to Base64 data URL (no server required).
 * - Same scan logic powers both canvas draw and text export.
 */

const canvas = ref(null)
const inputSlider = ref(null)
const inputLabel = ref(null)
const uploadInput = ref(null)
const asciiOutput = ref(null)
const previewImg = ref(null)
const previewPlaceholder = ref(null)

let ctx = null
let image1 = null

/** Constants */
const ALPHA_THRESHOLD = 128

/**
 * A single ASCII “cell” (character + draw color).
 */
class Cell {
  /**
   * @param {number} x      - x position (px)
   * @param {number} y      - y position (px)
   * @param {string} symbol - character to draw
   * @param {string} color  - CSS color (e.g. "rgb(r,g,b)")
   */
  constructor(x, y, symbol, color) {
    this.x = x
    this.y = y
    this.symbol = symbol
    this.color = color
  }
  /**
   * Draw this cell’s symbol to the canvas context.
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillText(this.symbol, this.x, this.y)
  }
}

/**
 * Converts canvas image pixels to ASCII characters.
 * Uses same scan for canvas rendering and text export.
 */
class AsciiEffect {
  #cells = [] // Cell[] for canvas draw
  #grid = [] // string[] for text export (one string per row)
  #pixels = null // ImageData
  #ctx
  #width
  #height

  /**
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} width
   * @param {number} height
   * @param {HTMLImageElement} image
   */
  constructor(ctx, width, height, image) {
    this.#ctx = ctx
    this.#width = width
    this.#height = height

    // Paint current image to canvas, then read pixels.
    this.#ctx.drawImage(image, 0, 0, this.#width, this.#height)
    this.#pixels = this.#ctx.getImageData(0, 0, this.#width, this.#height)
  }

  /**
   * Map grayscale brightness to ASCII symbol.
   * @param {number} g - average 0..255
   * @returns {string} ASCII character or empty string
   */
  #convertToSymbol(g) {
    if (g >= 250) return '@'
    else if (g >= 240) return '*'
    else if (g >= 220) return '+'
    else if (g >= 200) return '#'
    else if (g >= 180) return '&'
    else if (g >= 160) return '%'
    else if (g >= 140) return '_'
    else if (g >= 120) return ':'
    else if (g >= 100) return '$'
    else if (g >= 80) return '/'
    else if (g >= 60) return '-'
    else if (g >= 40) return 'X'
    else if (g >= 20) return 'W'
    return '' // very dark -> treat as empty
  }

  /**
   * Scan pixels into both:
   * - #cells: for colored canvas draw
   * - #grid : for plain text export (monochrome)
   * @param {number} cellSize - sampling step in pixels
   */
  #compute(cellSize) {
    this.#cells = []
    this.#grid = []

    const w = this.#pixels.width
    const h = this.#pixels.height
    const data = this.#pixels.data

    // Build one text row per y-step
    for (let y = 0; y < h; y += cellSize) {
      let row = ''

      for (let x = 0; x < w; x += cellSize) {
        const pos = (y * w + x) * 4
        const a = data[pos + 3]

        if (a > ALPHA_THRESHOLD) {
          const r = data[pos]
          const g = data[pos + 1]
          const b = data[pos + 2]

          const avg = (r + g + b) / 3
          const symbol = this.#convertToSymbol(avg)

          // For canvas draw: only push if we have a symbol
          if (symbol) {
            const color = `rgb(${r},${g},${b})`
            this.#cells.push(new Cell(x, y, symbol, color))
            row += symbol // text version
          } else {
            row += ' '
          }
        } else {
          row += ' '
        }
      }
      this.#grid.push(row)
    }
  }

  /**
   * Draw ASCII to canvas.
   * @param {number} cellSize - sampling step in pixels
   */
  draw(cellSize) {
    this.#compute(cellSize) // keep draw + text in sync
    this.#ctx.clearRect(0, 0, this.#width, this.#height)
    for (let i = 0; i < this.#cells.length; i++) {
      this.#cells[i].draw(this.#ctx)
    }
  }

  /**
   * Return ASCII art as plain text (no color).
   * @param {number} cellSize - sampling step in pixels
   * @returns {string} ASCII lines separated by '\n'
   */
  toText(cellSize) {
    this.#compute(cellSize) // reuse the exact same scan
    return this.#grid.join('\n')
  }
}

/** Global effect instance (recreated on each new image load) */
let effect = null

/**
 * Slider handler: render at current resolution.
 * - 1 -> draw original image (no ASCII)
 * - >=2 -> draw ASCII at chosen cell size
 */
function handleSlider() {
  if (!canvas.value || !ctx || !inputSlider.value || !inputLabel.value || !image1) return

  let size = Number(inputSlider.value.value)

  // safety: if too many cells, auto-adjust
  const maxCells = 100000
  if ((canvas.value.width / size) * (canvas.value.height / size) > maxCells) {
    size = Math.ceil(Math.sqrt((canvas.value.width * canvas.value.height) / maxCells))
    inputSlider.value.value = size
  }

  if (size === 1) {
    inputLabel.value.textContent = 'Original image'
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
    ctx.drawImage(image1, 0, 0, canvas.value.width, canvas.value.height)
  } else {
    inputLabel.value.textContent = `Resolution: ${size} px`
    ctx.font = `${Math.max(6, Math.round(size * 1.6))}px monospace`
    ctx.textBaseline = 'top'
    effect?.draw(size)
  }
}

/** Upload -> Base64 -> set as image src */
function handleUpload(e) {
  const file = e.target.files?.[0]
  if (!file || !image1) return

  const reader = new FileReader()
  reader.onload = (event) => {
    if (typeof event.target?.result !== 'string') return
    image1.src = event.target.result // Base64 data URL
  }
  reader.readAsDataURL(file)
}

/** Dump ASCII to textarea (monospace + whitespace preserved via CSS) */
function exportText() {
  if (!effect || !asciiOutput.value || !inputSlider.value) return
  asciiOutput.value.value = effect.toText(Number(inputSlider.value.value))
}

// Image
const MAX_WIDTH = 800
const MAX_HEIGHT = 600
/** Each time an image is set/loaded, resize canvas and rebuild effect */
function initialize() {
  if (!canvas.value || !ctx || !previewImg.value || !previewPlaceholder.value || !image1) return

  let w = image1.width
  let h = image1.height

  // scale down if too big
  const ratio = Math.min(MAX_WIDTH / w, MAX_HEIGHT / h, 1)
  w = Math.round(w * ratio)
  h = Math.round(h * ratio)

  canvas.value.width = w
  canvas.value.height = h

  // show preview
  previewPlaceholder.value.classList.add('hidden')
  previewImg.value.classList.remove('hidden')
  previewImg.value.src = image1.src

  effect = new AsciiEffect(ctx, w, h, image1)
  handleSlider()
}

onMounted(() => {
  if (
    !canvas.value ||
    !inputSlider.value ||
    !inputLabel.value ||
    !uploadInput.value ||
    !asciiOutput.value ||
    !previewImg.value ||
    !previewPlaceholder.value
  ) {
    return
  }

  ctx = canvas.value.getContext('2d')
  if (!ctx) return

  image1 = new Image()
  image1.onload = initialize

  inputSlider.value.addEventListener('input', handleSlider)
  uploadInput.value.addEventListener('change', handleUpload)
  inputLabel.value.textContent = `Resolution: ${inputSlider.value.value} px`
})

onBeforeUnmount(() => {
  inputSlider.value?.removeEventListener('input', handleSlider)
  uploadInput.value?.removeEventListener('change', handleUpload)

  if (image1) image1.onload = null
})
</script>
<template>
  <section
    class="w-full rounded-lg border border-brdr bg-bg-prim p-4 shadow-xl shadow-black/15 sm:p-6"
  >
    <div class="flex flex-col gap-6">
      <header class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-bold text-acc-prim uppercase">ASCII demo</p>
          <h2 class="mt-2 text-2xl font-bold text-fg-prim">ASCII Art Generator</h2>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-fg-sec">
            Upload an image, tune the render density, and export the generated text directly from
            the project page.
          </p>
        </div>
        <span
          class="inline-flex min-h-10 items-center rounded-lg border border-brdr bg-bg-sec px-3 text-tiny font-bold text-fg-ter uppercase"
        >
          Browser tool
        </span>
      </header>

      <div class="grid gap-4 xl:grid-cols-2">
        <section class="rounded-lg border border-brdr bg-bg-sec/70 p-4">
          <h3 class="text-sm font-bold text-acc-sec uppercase">Original</h3>
          <div
            id="previewWrapper"
            class="mt-3 grid min-h-72 place-items-center overflow-hidden rounded-lg border border-dashed border-brdr-strong bg-bg-prim p-4"
          >
            <span
              id="previewPlaceholder"
              ref="previewPlaceholder"
              class="text-center text-sm text-fg-ter"
            >
              No image uploaded yet
            </span>
            <img
              id="previewImg"
              ref="previewImg"
              alt="Original preview"
              class="hidden max-w-full rounded-lg object-contain"
            />
          </div>
        </section>

        <section class="rounded-lg border border-brdr bg-bg-sec/70 p-4">
          <h3 class="text-sm font-bold text-acc-prim uppercase">ASCII</h3>
          <div class="mt-3 overflow-auto rounded-lg border border-brdr-strong bg-bg-prim p-4">
            <canvas id="canvas1" ref="canvas" class="mx-auto block h-auto max-w-full" />
          </div>
        </section>
      </div>

      <div class="rounded-lg border border-brdr bg-bg-sec/70 p-4">
        <div class="flex flex-wrap items-end gap-4">
          <div class="min-w-48 grow">
            <label
              id="resolutionLabel"
              ref="inputLabel"
              for="resolution"
              class="block text-xs font-bold text-fg-ter uppercase"
            >
              Resolution 10px
            </label>
            <input
              id="resolution"
              ref="inputSlider"
              type="range"
              name="resolution"
              min="1"
              max="20"
              value="10"
              class="mt-3 block w-full accent-acc-prim"
            />
          </div>

          <div class="flex min-w-40 flex-col gap-2">
            <span class="text-xs font-bold text-fg-ter uppercase">Upload</span>
            <label
              for="upload"
              class="inline-flex min-h-10 items-center justify-center rounded-xl border-2 border-brdr px-4 py-3 text-sm font-bold tracking-wide text-fg-prim uppercase transition-all duration-200 ease-out hover:border-acc-sec hover:text-acc-sec active:border-acc-sec active:text-acc-sec"
            >
              Upload image
            </label>
            <input id="upload" ref="uploadInput" type="file" accept="image/*" class="hidden" />
          </div>

          <div class="flex min-w-40 flex-col gap-2">
            <span class="text-xs font-bold text-fg-ter uppercase">Export</span>
            <TheButton @click="exportText">Export to Text</TheButton>
          </div>
        </div>
      </div>

      <section class="rounded-lg border border-brdr bg-bg-sec/70 p-4">
        <div class="flex items-center justify-between gap-4">
          <h3 class="text-sm font-bold text-acc-prim uppercase">ASCII output</h3>
          <span class="text-tiny font-bold text-fg-ter uppercase">Text export</span>
        </div>
        <textarea
          id="asciiOutput"
          ref="asciiOutput"
          rows="20"
          cols="80"
          placeholder="Click ‘Export to Text’ to dump ASCII here…"
          class="mt-3 block min-h-72 w-full resize-y rounded-lg border border-brdr bg-bg-prim px-3 py-3 font-mono text-mini leading-none text-fg-prim outline-none placeholder:text-fg-ter focus:border-acc-prim"
        />
      </section>
    </div>
  </section>
</template>
