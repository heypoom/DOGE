import type { World } from '../world'
import type { IEntityType } from './entities'
import type { IEntity } from './IEntity'

export type IActionHandler<Data, E extends IEntityType> = (
  data: Data,
  entity: IEntity<E>,
  world: World,
) => void

export type IActionGroup<ActionMap, E extends IEntityType = IEntityType> = {
  [K in keyof ActionMap]: IActionHandler<ActionMap[K], E>
}
