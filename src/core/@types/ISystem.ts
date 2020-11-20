import type { IEntityOf } from './entities'
import type { IComponentType } from './components'

import type { World } from '../world'

export interface ISystem<T extends IComponentType[] = IComponentType[]> {
  process: (entities: IEntityOf<T>[], world: World) => void
  deps: T
}
