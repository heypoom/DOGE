import type { World } from '../../core'

export function spawnPlayer(world: World) {
  world.addEntity('player', {
    position: { x: 100, y: 100 },
    movement: { speed: 10 },
    inventory: { items: [] },

    health: { health: 10, maxHealth: 10 },
    battle: { baseLuck: 10, baseAttack: 10, baseDefense: 10, effects: [] },

    texture: {
      width: 60,
      height: 90,
      src: '/assets/minions.png',
    },

    collider: {
      enabled: true,
      role: 'target',
      size: 60,
    },
  })
}
