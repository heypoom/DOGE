import { ctx } from '../../canvas'

import type { IEntity } from '../@types/entities'

const debugSize = 10

export function KeyVisualizer(entities: IEntity[]) {
  entities.forEach((entity) => {
    const e = entity as IEntity<'debug'>

    Object.entries(e.data.keyState).forEach(([key, state], i) => {
      if (!ctx) return

      // Debug Squares
      ctx.fillStyle = state ? '#26de81' : '#eb3b5a'
      ctx.fillRect(i * debugSize, 0, debugSize, debugSize)
    })
  })
}
