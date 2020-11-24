import type { IEntityOf } from './entities'
import type { IComponentType } from './components'

import type { World } from '../world'

export type ISystemHandler<T extends IComponentType[]> = (
  entities: IEntityOf<T>[],
  world: World,
) => void | Promise<void>
