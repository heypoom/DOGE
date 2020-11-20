import { ctx, circle, square } from '../../../canvas'

import type { IEntity } from '../../@types/entities'

export function renderer(entities: IEntity[]) {
  if (!ctx) return

  ctx.fillStyle = '#111'
  ctx.fillRect(0, 0, window.innerWidth * 2, window.innerHeight * 2)

  entities.forEach((entity) => {
    const { x, y } = entity.data.position
    const { shape, color, size } = entity.data.shape

    if (shape === 'square') square(x, y, size, color)
    if (shape === 'circle') circle(x, y, size, color)
  })
}
