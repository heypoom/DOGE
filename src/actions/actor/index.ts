import { MoveAction } from './movement'

import type { IActionGroup } from '../../@types/core'
import type { IActorAction, IPickupAction } from '../../@types/actions'

import { getItem } from '../../game/items'

export const ActorActions: IActionGroup<IActorAction, 'actor'> = {
  '@actor/move': (a, e) => MoveAction[a.direction]?.(e),
  '@actor/paint': () => {},
  '@actor/use': () => {},
}

export const ActorPickupAction: IActionGroup<IPickupAction, 'droppedItem'> = {
  '@actor/pickup': (a, e, w) => {
    const { item } = e.data

    const player = w.get('player').data
    player.inventory.items.push(item)

    const b = getItem(item.type)
    console.log(`pickup(${b.name}): x${item.quantity ?? 1}`, { ...item, ...b })

    w.removeEntity(e.id)
  },
}
