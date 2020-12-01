import type { World } from '../../core'

export function spawnGame(world: World) {
  world.addEntity('game', {
    keypress: {
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    },

    timer: {
      enabled: true,
      deltaTime: 0,
      initialTime: Date.now(),
    },
  })
}
