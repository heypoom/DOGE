import { ctx, image } from '../../../canvas'

import type { ISystemHandler } from '../../@types/ISystemHandler'

type IDep = ['position', 'texture']

export const TextureRenderer: ISystemHandler<IDep> = (es, w) => {
  if (!ctx) return

  es.forEach((entity) => {
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
