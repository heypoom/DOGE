import { MoveAction } from './movement'

import type { IActionGroup } from '../../@types/core'
import type { IActorAction, IPickupAction } from '../../@types/actions'

import { action } from '../index'
import { getItem } from '../../game/items'

import { missingItemSprite } from '../../constants/missingItemSprite'

export const ActorActions: IActionGroup<IActorAction, 'actor'> = {
  '@actor/move': (a, e) => MoveAction[a.direction]?.(e),
  '@actor/paint': () => {},
  '@actor/use': () => {},
  '@actor/place': (a, e, w) => {
    const player = e.data
    const { inventory } = player

    const inventoryItem = inventory.items.find((i) => i.type === a.item.type)
    if (!inventoryItem) return

    inventoryItem.quantity = (inventoryItem.quantity ?? 0) - 1

    const item = getItem(a.item.type)

    w.addEntity('droppedItem', {
      position: player.position,
      item: { type: a.item.type, quantity: 1 },

      collider: {
        enabled: true,
        size: 15,
        role: 'target',
        onCollision: action('@actor/pickup'),
      },

      texture: item.sprite ?? missingItemSprite,
    })

    if (inventoryItem.quantity <= 0) {
      inventory.items = inventory.items.filter((i) => i.type !== a.item.type)
    }
  },
  '@effect/apply': () => {},
}

export const ActorPickupAction: IActionGroup<IPickupAction, 'droppedItem'> = {
  '@actor/pickup': (a, e, w) => {
    const { item } = e.data

    const { inventory } = w.get('player')!.data

    const targetItem = inventory.items.find((i) => i.type === item.type)

    if (targetItem) {
      targetItem.quantity = (targetItem?.quantity ?? 0) + 1
    } else {
      inventory.items.push(item)
    }

    const b = getItem(item.type)
    console.log(`pickup(${b.name}): x${item.quantity ?? 1}`, { ...item, ...b })

    w.removeEntity(e.id)
  },
}
