import type { World } from '../world'

import type { IEntityOf } from '../@types/entities'

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

    const isColliding =
      x > cx - player.shape.size &&
      y > cy - player.shape.size &&
      x < cx + target.shape.size &&
      y < cy + target.shape.size

    if (isColliding) onCollision()
  })
}
