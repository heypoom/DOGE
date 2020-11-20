import { canvas, ctx } from './canvas/context'
import { KeyVisualizer, Renderer, Movement } from './core/systems'
import { Collider } from './core/systems/Collider'

import { World } from './core/world'

export const world = new World()

world.add('player', {
  position: { x: 100, y: 100 },
  movement: { speed: 10 },
  shape: { shape: 'square', size: 40, color: '#fed330' },
})

world.add('booster', {
  position: { x: 500, y: 800 },
  shape: { shape: 'square', size: 300, color: '#fc5c65' },

  collider: {
    enabled: true,
    role: 'target',

    onCollision() {
      const booster = world.get('booster').data
      const player = world.get('player').data

      booster.shape.color = '#2bcbba'

      player.movement.speed = 100
      player.shape.color = '#2bcbba'

      setTimeout(() => {
        booster.shape.color = '#eb3b5a'

        player.movement.speed = 10
        player.shape.color = '#fed330'
      }, 2000)
    },
  },
})

world.add('game', {
  keyState: {},
})

world.addSystem(Renderer, ['position', 'shape'])
world.addSystem(KeyVisualizer, ['keyState'])
world.addSystem(Movement, ['position', 'movement'])
world.addSystem(Collider, ['position', 'collider', 'shape'])

world.loop()

const screenW = window.innerWidth * 2
const screenH = window.innerHeight * 2

if (canvas) {
  canvas.width = screenW
  canvas.height = screenH
}

const game = world.get('game').data

document.addEventListener('keydown', (e) => {
  game.keyState[e.key] = true
})

document.addEventListener('keyup', (e) => {
  game.keyState[e.key] = false
})
