import { ctx } from '../../canvas'

import type { ISystemHandler } from '../@types/ISystemHandler'

const debugSize = 10

export const KeyVisualizer: ISystemHandler<['keyState']> = (es, w) => {
  es.forEach((e) => {
    Object.values(e.data.keyState).forEach((state, i) => {
      if (!ctx) return

      // Debug Squares
      ctx.fillStyle = state ? '#26de81' : '#eb3b5a'
      ctx.fillRect(i * debugSize, 0, debugSize, debugSize)
    })
  })
}
