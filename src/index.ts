import { World } from './core/world'
import { Collider } from './core/systems/Collider'

import {
  KeyVisualizer,
  ShapeRenderer,
  TextureRenderer,
  TextureRendererSetup,
  Movement,
} from './core/systems'

import { pixi } from './gfx/pixi'

import { Timer } from './core/systems/Timer'
import { action } from './core/actions/createAction'

export const world = new World()

world.addEntity('player', {
  position: { x: 100, y: 100 },
  movement: { speed: 10 },

  texture: {
    width: 60,
    height: 90,
    src: '/assets/minions.png',
    glowColor: '#fed330',
  },

  collider: {
    enabled: true,
    role: 'target',
    size: 90,
  },
})

world.addEntity('wall', {
  position: { x: 500, y: 800 },
  shape: { type: 'square', size: 300, color: '#fc5c65' },

  collider: {
    enabled: true,
    role: 'target',
    size: 300,

    // onCollision: action('@wall/speedboost'),
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

world.addSystem(TextureRenderer, ['position', 'texture'])
world.addSetupSystem(TextureRendererSetup, ['position', 'texture'])

world.addSystem(ShapeRenderer, ['position', 'shape'])
world.addSystem(KeyVisualizer, ['keyState'])
world.addSystem(Movement)
world.addSystem(Collider, ['position', 'collider'])
world.addSystem(Timer, ['timer'])

world.addSetupSystem((e, w) => {
  if (!pixi) return

  document.body.appendChild(pixi.view)
  pixi.renderer.backgroundColor = 0x2d2d30
})

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

// if (canvas) {
//   canvas.width = window.innerWidth * 2
//   canvas.height = window.innerHeight * 2
// }

const game = world.get('game').data

document.addEventListener('keydown', (e) => {
  game.keyState[e.key] = true
})

document.addEventListener('keyup', (e) => {
  game.keyState[e.key] = false
})
