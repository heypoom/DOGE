import type { ISystemLifecycleHandlers } from './ISystemLifecycle'

import type { IComponentType } from '../../@types/components'

export type ISystem<T extends IComponentType[] = IComponentType[]> = {
  /** Name of the system */
  name?: string

  /** Which components does this system need? */
  query?: T
} & ISystemLifecycleHandlers<T>
