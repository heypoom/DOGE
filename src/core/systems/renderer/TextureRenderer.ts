import { Sprite } from 'pixi.js'

import { pixi } from '../../../gfx/pixi'

import { addTexture } from './utils/addTexture'

import { createSystem } from '../utils/createSystem'

export const TextureRendererSystem = createSystem({
  name: 'TextureRenderer',
  deps: ['position', 'texture'],

  async onSetup(es) {
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
  },

  onTick(es) {
    es.forEach((entity) => {
      const { position } = entity.data

      const sprite = pixi.stage.getChildByName(entity.id)
      if (!sprite) return

      sprite.x = position.x
      sprite.y = position.y
    })
  },
})
