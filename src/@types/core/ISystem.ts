import type { ISystemHandler } from './ISystemHandler'

import type { IComponentType } from '../../@types/components'

export interface ISystem<T extends IComponentType[] = IComponentType[]> {
  /** Name of the system */
  name?: string

  /** Which components does this system need? */
  query?: T

  /** Run this system handler on setup */
  onSetup?: ISystemHandler<T>

  /** Run this handler on tick (update) */
  onTick?: ISystemHandler<T>

  /** Run this system handler on cleanup (removed) */
  onCleanup?: ISystemHandler<T>
}
