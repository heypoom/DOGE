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
window.world = world

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

world.addSharedEntity('wall', {
  position: { x: 200, y: 50 },
  shape: { type: 'square', size: 150, color: 0xfc5c65 },

  collider: {
    enabled: true,
    role: 'target',
    size: 100,
    onCollision: action('@wall/interact'),
  },
})

function addItemDrop(type: IItemType, position: IPosition, quantity = 1) {
  const item = getItem(type)
  if (!item) return

  return world.addEntity('droppedItem', {
    position,
    item: { type, quantity },

    collider: {
      enabled: true,
      size: 15,
      role: 'target',
      onCollision: action('@actor/pickup'),
    },

    texture: item.sprite ?? missingItemSprite,
  })
}

for (let i = 0; i < 10; i++) {
  addItemDrop(i % 2 ? 'lateKingPhoto' : 'yellowShirt', { x: i * 60, y: i * 60 })
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
