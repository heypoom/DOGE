import { World } from './core/world'

import {
  ShapeRendererSystem,
  TextureRendererSystem,
  KeyboardSystem,
  ColliderSystem,
} from './core/systems'

import { pixi } from './gfx/pixi'
import { action } from './core/actions/createAction'

export const world = new World()

// @ts-ignore
window.world = world

world.addEntity('player', {
  position: { x: 100, y: 100 },
  movement: { speed: 10 },
  inventory: { items: [] },

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

world.addEntity('wall', {
  position: { x: 200, y: 50 },
  shape: { type: 'square', size: 150, color: 0xfc5c65 },

  collider: {
    enabled: true,
    role: 'target',
    size: 150,

    onCollision: action('@wall/speedboost'),
  },
})

world.addEntity('droppedItem', {
  position: { x: 50, y: 50 },
  collider: {
    enabled: true,
    size: 15,
    role: 'target',
    onCollision: action('@actor/pickup'),
  },
  texture: {
    width: 60,
    height: 90,
    src: '/assets/minions.png',
  },
  item: {
    id: 'sword-of-the-deceased',
    name: 'Sword of the deceased',
  },
})

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

world.addSystem(TextureRendererSystem)
world.addSystem(ShapeRendererSystem)
world.addSystem(ColliderSystem)
world.addSystem(KeyboardSystem)

world.addSystem({
  onSetup: (e, w) => {
    if (!pixi) return

    document.body.appendChild(pixi.view)
    pixi.renderer.backgroundColor = 0x2d2d30
  },
})

world.start()
