import type { IEntityOf } from '../../@types/entities'
import type { IComponentType } from '../../@types/components'

import type { World } from '../../core'

export type ISystemHandler<T extends IComponentType[] = IComponentType[]> = (
  entities: IEntityOf<T[number]>[],
  world: World,
) => void | Promise<void>

// type B = ['hello', 'world']
// type C = B[number]
