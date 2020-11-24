import type { IComponentType } from './components'
import type { ISystemHandler } from './ISystemHandler'

export interface ISystem<T extends IComponentType[] = IComponentType[]> {
  /** Name of the system */
  name?: string

  /** Which components does this system need? */
  deps?: T

  /** Run this system handler on setup */
  onSetup?: ISystemHandler<T>

  /** Run this handler on tick (update) */
  onTick?: ISystemHandler<T>
}
