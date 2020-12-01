import type { IEntity, InjectedEntity } from './IEntity'

import type { World } from '../../core'
import type { IEntityType } from '../../@types/entities'

export type IActionHandler<Data, E extends IEntityType> = (
  data: Data,
  entity: InjectedEntity<E>,
  world: World,
) => void

export type IActionGroup<ActionMap, E extends IEntityType = IEntityType> = {
  [K in keyof ActionMap]: IActionHandler<ActionMap[K], E>
}
