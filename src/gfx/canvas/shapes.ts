import { ctx } from './context'

export function square(x: number, y: number, size: number, color: string) {
  if (!ctx) return

  ctx.shadowBlur = 50
  ctx.shadowColor = color

  ctx.fillStyle = color
  ctx.fillRect(x, y, size, size)
}

export function circle(x: number, y: number, size: number, color: string) {
  if (!ctx) return

  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2, true)

  ctx.shadowBlur = 50
  ctx.shadowColor = color

  ctx.fillStyle = color
  ctx.fill()
}
