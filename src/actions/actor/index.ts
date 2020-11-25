import { MoveAction } from './movement'

import type { IActorAction, IPickupAction } from '../@types/IActorAction'
import type {
  IActionGroup,
  IActionHandler,
} from '../../@types/core/IActionGroup'

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

    console.log(`pickup(${item.name}):`, item)

    w.removeEntity(e.id)
  },
}
