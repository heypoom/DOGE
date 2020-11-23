import { canvas, ctx } from './canvas/context'

import { World } from './core/world'
import { Collider } from './core/systems/Collider'

import {
  KeyVisualizer,
  ShapeRenderer,
  TextureRenderer,
  Movement,
} from './core/systems'

import { Timer } from './core/systems/Timer'

export const world = new World()

world.addEntity('player', {
  position: { x: 100, y: 100 },
  movement: { speed: 10 },
  // shape: {
  //   shape: 'circle',
  //   size: 40,
  //   color: '#fed330',
  // },

  texture: {
    width: 160,
    height: 240,
    src: '/assets/minions.png',
    glowColor: '#fed330',
  },

  collider: {
    enabled: true,
    role: 'target',
    size: 40,
    isColliding: false,
    collidingAt: {},
    onCollision: () => {},
  },
})

world.addEntity('wall', {
  position: { x: 500, y: 800 },
  shape: { type: 'square', size: 300, color: '#fc5c65' },

  collider: {
    enabled: true,
    role: 'target',
    isColliding: false,
    collidingAt: {},
    size: 300,

    onCollision() {
      const wall = world.get('wall').data
      const player = world.get('player').data

      wall.shape.color = '#2bcbba'

      player.movement.speed = 100
      // player.shape.color = '#2bcbba'

      setTimeout(() => {
        wall.shape.color = '#eb3b5a'

        player.movement.speed = 10
        // player.shape.color = '#fed330'
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

world.addSystem(ShapeRenderer, ['position', 'shape'])
world.addSystem(TextureRenderer, ['position', 'texture'])
world.addSystem(KeyVisualizer, ['keyState'])
world.addSystem(Movement, ['position', 'movement', 'collider'])
world.addSystem(Collider, ['position', 'collider'])
world.addSystem(Timer, ['timer'])

world.addSetupSystem((e, w) => {}, [])

world.addSystem((e, w) => {
  const wall = w.get('wall').data
  const game = w.get('game').data

  const { deltaTime } = game.timer

  if (deltaTime > window.innerWidth * 2) return
  if (deltaTime > window.innerHeight * 2) return

  wall.position.x = deltaTime
  wall.position.y = deltaTime / 2
}, [])

world.start()

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
