import { ctx, circle, square, image } from '../../../canvas'

import type { IEntityOf } from '../../@types/entities'

type ShapedEntity = IEntityOf<['position', 'shape']>

export function ShapeRenderer(entities: ShapedEntity[]) {
  if (!ctx) return

  ctx.fillStyle = '#111'
  ctx.fillRect(0, 0, window.innerWidth * 2, window.innerHeight * 2)

  entities.forEach((entity) => {
    const { position, shape } = entity.data

    const { x, y } = position
    const { color, size } = shape

    if (shape.type === 'square') return square(x, y, size, color)
    if (shape.type === 'circle') return circle(x, y, size, color)
  })
}
