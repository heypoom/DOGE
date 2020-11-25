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

import type { ITexture } from './@types/components/ITexture'
import type { IPosition } from './@types/components/IPosition'

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
    enabled: false,
    role: 'target',
    size: 150,
  },
})

function addItemDrop(type: IItemType, position: IPosition, quantity = 1) {
  const item = getItem(type)
  if (!item) return

  const missingItemSprite: ITexture = {
    src: '/assets/minions.png',
    width: 60,
    height: 90,
  }

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

for (let i = 0; i < 1000; i += 50) {
  addItemDrop('lateKingPhoto', { x: i + 5, y: i })
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
