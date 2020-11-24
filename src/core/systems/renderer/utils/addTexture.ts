import { Texture, SCALE_MODES } from 'pixi.js'

import { pixi } from '../../../../gfx/pixi'

export const addTexture = (src: string) =>
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
