import { ctx, image } from '../../../canvas'

import type { IEntityOf } from '../../@types/entities'

type TexturedEntity = IEntityOf<['position', 'texture']>

export function TextureRenderer(entities: TexturedEntity[]) {
  if (!ctx) return

  entities.forEach((entity) => {
    const { position, texture } = entity.data

    image(
      position.x,
      position.y,
      texture.width,
      texture.height,
      texture.src,
      texture.glowColor,
    )
  })
}
