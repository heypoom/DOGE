import { ctx } from './context'

const ImageCache: Record<string, HTMLImageElement> = {}

export function image(
  x = 0,
  y = 0,
  w = 0,
  h = 0,
  src: string,
  glowColor = '#fff',
) {
  const cache = ImageCache[src]

  if (cache) {
    if (!ctx) return

    ctx.shadowBlur = 50
    ctx.shadowColor = glowColor

    ctx.drawImage(cache, x, y, w, h)
    return
  }

  const img = new Image()

  img.onload = () => {
    if (!ctx) return
    ctx.imageSmoothingEnabled = false

    ImageCache[src] = img
    ctx.drawImage(img, x, y, w, h)
  }

  img.src = src
}
