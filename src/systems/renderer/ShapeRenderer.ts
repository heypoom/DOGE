import { Graphics, DisplayObject } from 'pixi.js'

import { pixi } from '../../gfx'

import { createSystem } from '../utils/createSystem'

export const ShapeRendererSystem = createSystem({
  query: ['position', 'shape'],

  onSetup(es, w) {
    es.forEach((entity) => {
      const { position, shape } = entity.data

      const { x, y } = position
      const { type, color, size } = shape

      if (type === 'square') {
        const r = new Graphics()
        r.beginFill(color)
        r.drawRect(x, y, size, size)
        r.endFill()

        r.name = entity.id

        pixi.stage.addChild(r)

        console.log(`square(${x}, ${y}): {size: ${size}}`)
      }
    })
  },

  onTick(es, w) {
    es.forEach((entity) => {
      const { position, shape } = entity.data

      const { x, y } = position
      const { color, size } = shape

      const g = getGraphic(entity.id)
      if (!g) return

      g.x = x
      g.y = y

      // g.beginFill(color)
      // g.drawRect(x, y, size, size)
      // g.endFill()
    })
  },
})

const asGraphics = (o: DisplayObject) => (o as unknown) as Graphics
const getGraphic = (id: string) => asGraphics(pixi.stage.getChildByName(id))
