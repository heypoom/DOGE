import { Sprite, Texture, SCALE_MODES } from 'pixi.js'

import { pixi } from '../../../gfx/pixi'

import { createSystem } from '../utils/createSystem'

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

  async onTick(es) {
    es.forEach((entity) => {
      const { position } = entity.data

      const sprite = pixi.stage.getChildByName(entity.id)
      if (!sprite) return

      sprite.x = position.x
      sprite.y = position.y
    })
  },
})
