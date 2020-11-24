import { MoveAction } from '../move'

import type { IActionGroup } from '../../@types/IActionGroup'
import type { IActorAction } from '../@types/IActorAction'

export const ActorActions: IActionGroup<IActorAction, 'actor'> = {
  '@actor/move': (a, e) => MoveAction[a.direction]?.(e),
  '@actor/paint': () => {},
  '@actor/use': () => {},
}
