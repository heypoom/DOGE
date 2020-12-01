import { action } from '../../actions'
import type { World } from '../../core'

export function spawnWall(world: World) {
  world.addEntity('wall', {
    position: { x: 200, y: 50 },
    shape: { type: 'square', size: 150, color: 0xfc5c65 },

    collider: {
      enabled: true,
      role: 'target',
      size: 100,
      onCollision: action('@wall/interact'),
    },
  })
}
