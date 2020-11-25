import type { IEntity } from '../@types/core/IEntity'

import { createSystem } from './utils/createSystem'

export const ColliderSystem = createSystem({
  deps: ['collider', 'position'],

  onTick(es, w) {
    es.forEach((t) => {
      const target = t.data
      const { enabled, role, onCollision } = target.collider

      if (!enabled || role !== 'target') return

      const player = w.get('player').data
      if (!player) return

      const { x, y } = player.position
      const { x: cx, y: cy } = target.position

      const isLeft = x < cx + target.collider.size
      const isRight = x > cx - player.collider.size
      const isTop = y > cy - player.collider.size
      const isBottom = y < cy + target.collider.size

      target.collider.collidingAt = {
        left: isLeft,
        right: isRight,
        top: isTop,
        bottom: isBottom,
      }

      const isColliding = isLeft && isRight && isTop && isBottom

      if (isColliding && onCollision) {
        const { type, data } = onCollision

        w.act(type, data, t as IEntity)
      }

      target.collider.isColliding = isColliding
      player.collider.isColliding = isColliding
    })
  },
})
