// @seq: 5

import { Sprite } from 'pixi.js'

import { pixi } from '../../gfx'

import { addTexture } from './utils/addTexture'

import { createSystem } from '../utils/createSystem'

export const TextureRendererSystem = createSystem({
  /**
   * Which data component to query?
   *
   * Only the entities that points to the components
   * that matches the query will be passed to this system.
   */
  query: ['position', 'texture'],

  /** Runs once on setup */
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

  /** Runs every single frame! */
  onTick(es) {
    es.forEach((entity) => {
      const { position } = entity.data

      const sprite = pixi.stage.getChildByName(entity.id)
      if (!sprite) return

      sprite.x = position.x
      sprite.y = position.y
    })
  },

  /** Runs right before the entity is removed. */
  async onCleanup(es) {
    es.forEach((entity) => {
      const sprite = pixi.stage.getChildByName(entity.id)
      if (!sprite) return

      console.log(`cleanup(texture): removing sprite ${entity.id}`)

      pixi.stage.removeChild(sprite)
    })
  },
})
