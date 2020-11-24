import { Sprite, TextureLoader, settings, SCALE_MODES } from 'pixi.js'

import { pixi } from '../../../gfx/pixi'

import type { ISystemHandler } from '../../@types/ISystemHandler'

type IDep = ['position', 'texture']

export const TextureRendererSetup: ISystemHandler<IDep> = (es, w) => {
  es.forEach((entity) => {
    const { position, texture } = entity.data

    pixi.loader.add(texture.src).load(() => {
      const tex = pixi.loader.resources[texture.src].texture

      tex.baseTexture.scaleMode = SCALE_MODES.NEAREST

      const sprite = new Sprite(tex)
      sprite.x = position.x
      sprite.y = position.y
      sprite.width = texture.width
      sprite.height = texture.height
      sprite.name = entity.id

      pixi.stage.addChild(sprite)
    })
  })
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
