import type { IEntityOf } from './entities'
import type { IComponentType } from './components'

import type { World } from '../world'

export interface ISystem<T extends IComponentType[] = IComponentType[]> {
  runOn?: 'setup' | 'tick'
  deps?: T
  process: (entities: IEntityOf<T>[], world: World) => void
}
