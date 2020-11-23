import type { World } from '../world'

import type { IEntityOf } from '../@types/entities'

import { ctx } from '../../canvas'

type ICollidable = IEntityOf<['position', 'collider', 'shape']>

export function Collider(entities: ICollidable[], world: World) {
  entities.forEach((e) => {
    const target = e.data
    const { enabled, role, onCollision } = target.collider

    if (!enabled || role !== 'target') return

    const player = world.get('player').data
    if (!player) return

    const { x, y } = player.position
    const { x: cx, y: cy } = target.position

    const isLeft = x < cx + target.shape.size
    const isRight = x > cx - player.shape.size
    const isTop = y > cy - player.shape.size
    const isBottom = y < cy + target.shape.size

    target.collider.collidingAt = {
      left: isLeft,
      right: isRight,
      top: isTop,
      bottom: isBottom,
    }

    const collisionData = [isLeft, isRight, isTop, isBottom]

    collisionData.forEach((state, i) => {
      if (!ctx) return

      ctx.fillStyle = state ? '#26de81' : '#eb3b5a'
      ctx.fillRect(i * 10, 15, 10, 10)
    })

    const isColliding = isLeft && isRight && isTop && isBottom

    if (isColliding) onCollision()

    target.collider.isColliding = isColliding
    player.collider.isColliding = isColliding
  })
}
