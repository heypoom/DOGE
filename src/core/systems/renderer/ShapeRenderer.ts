import type { ISystemHandler } from '../../@types/ISystemHandler'

type IDep = ['position', 'shape']

export const ShapeRenderer: ISystemHandler<IDep> = (es, w) => {
  // if (!ctx) return

  // ctx.fillStyle = '#111'
  // ctx.fillRect(0, 0, window.innerWidth * 2, window.innerHeight * 2)

  es.forEach((entity) => {
    const { position, shape } = entity.data

    const { x, y } = position
    const { color, size } = shape

    // if (shape.type === 'square') return square(x, y, size, color)
    // if (shape.type === 'circle') return circle(x, y, size, color)
  })
}
