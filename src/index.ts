import { World } from './core'

import {
  ShapeRendererSystem,
  TextureRendererSystem,
  KeyboardSystem,
  ColliderSystem,
} from './systems'

import { action } from './actions'

import { pixi } from './gfx'
import { getItem, IItemType } from './game/items'

import type { IPosition } from './@types/components/IPosition'

import { missingItemSprite } from './constants/missingItemSprite'

export const world = new World()

// @ts-ignore
window.w = world

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

const sharedItemComponents: Partial<Record<IItemType, string[]>> = {}

const itemColliderId = world.addComponent('collider', {
  enabled: true,
  size: 15,
  role: 'target',
  onCollision: action('@actor/pickup'),
})

function addItemDrop(type: IItemType, position: IPosition) {
  if (!sharedItemComponents[type]) {
    sharedItemComponents[type] = [
      world.addComponent('item', { type, quantity: 1 }),
      world.addComponent('texture', getItem(type)?.sprite ?? missingItemSprite),
    ]
  }

  return world.addEntityByIds('droppedItem', [
    world.addComponent('position', position),
    itemColliderId,
    ...(sharedItemComponents[type] ?? []),
  ])
}

for (let i = 0; i < 10; i++) {
  addItemDrop(i % 2 ? 'StunGun' : 'DogeCoin', { x: i * 60, y: i * 60 })
}

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
