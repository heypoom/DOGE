import { canvas } from './canvas/context'

import { World } from './core/world'
import { Collider } from './core/systems/Collider'
import { KeyVisualizer, Renderer, Movement } from './core/systems'
import { Timer } from './core/systems/Timer'

export const world = new World()

world.addEntity('player', {
  position: { x: 100, y: 100 },
  movement: { speed: 10 },
  shape: { shape: 'circle', size: 40, color: '#fed330' },
})

world.addEntity('booster', {
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

world.addEntity('game', {
  keyState: {
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

world.addSystem(Renderer, ['position', 'shape'])
world.addSystem(KeyVisualizer, ['keyState'])
world.addSystem(Movement, ['position', 'movement'])
world.addSystem(Collider, ['position', 'collider', 'shape'])
world.addSystem(Timer, ['timer'])

world.addSystem((e, w) => {
  const booster = w.get('booster').data
  const game = w.get('game').data

  const { deltaTime } = game.timer

  if (deltaTime > window.innerWidth * 2) return
  if (deltaTime > window.innerHeight * 2) return

  booster.position.x = deltaTime
  booster.position.y = deltaTime / 2
}, [])

world.loop()

if (canvas) {
  canvas.width = window.innerWidth * 2
  canvas.height = window.innerHeight * 2
}

const game = world.get('game').data

document.addEventListener('keydown', (e) => {
  game.keyState[e.key] = true
})

document.addEventListener('keyup', (e) => {
  game.keyState[e.key] = false
})
