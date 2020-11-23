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

  collider: {
    enabled: true,
    role: 'target',
    isColliding: false,
    collidingAt: {},
    onCollision: () => {},
  },
})

world.addEntity('wall', {
  position: { x: 500, y: 800 },
  shape: { shape: 'square', size: 300, color: '#fc5c65' },

  collider: {
    enabled: true,
    role: 'target',
    isColliding: false,
    collidingAt: {},

    onCollision() {
      const wall = world.get('wall').data
      const player = world.get('player').data

      wall.shape.color = '#2bcbba'

      player.movement.speed = 100
      player.shape.color = '#2bcbba'

      setTimeout(() => {
        wall.shape.color = '#eb3b5a'

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
world.addSystem(Movement, ['position', 'movement', 'collider'])
world.addSystem(Collider, ['position', 'collider', 'shape'])
world.addSystem(Timer, ['timer'])

world.addSystem((e, w) => {
  const wall = w.get('wall').data
  const game = w.get('game').data

  const { deltaTime } = game.timer

  if (deltaTime > window.innerWidth * 2) return
  if (deltaTime > window.innerHeight * 2) return

  wall.position.x = deltaTime
  wall.position.y = deltaTime / 2
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
