import { Sprite, Texture, TextureLoader, settings, SCALE_MODES } from 'pixi.js'

import { pixi } from '../../../gfx/pixi'

import type { ISystemHandler } from '../../@types/ISystemHandler'

type IDep = ['position', 'texture']

const addTexture = (src: string) =>
  new Promise<Texture>((resolve) => {
    if (pixi.loader.resources?.[src]?.texture) {
      return resolve(pixi.loader.resources[src].texture)
    }

    pixi.loader.add(src).load(() => {
      const texture = pixi.loader.resources[src].texture
      texture.baseTexture.scaleMode = SCALE_MODES.NEAREST

      resolve(texture)
    })
  })

export const TextureRendererSetup: ISystemHandler<IDep> = async (es, w) => {
  for (const entity of es) {
    const { position, texture } = entity.data

    const tex = await addTexture(texture.src)

    const sprite = new Sprite(tex)
    sprite.x = position.x
    sprite.y = position.y
    sprite.width = texture.width
    sprite.height = texture.height
    sprite.name = entity.id

    pixi.stage.addChild(sprite)
  }
}

export const TextureRenderer: ISystemHandler<IDep> = (es, w) => {
  es.forEach((entity) => {
    const { position } = entity.data

    const sprite = pixi.stage.getChildByName(entity.id)
    if (!sprite) return

    sprite.x = position.x
    sprite.y = position.y
  })
}
