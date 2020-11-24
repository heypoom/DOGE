import type { ISystem } from '../../@types/ISystem'
import type { IComponentType } from '../../@types/components'

export const createSystem = <T extends IComponentType[]>(
  config: ISystem<T>,
): ISystem<T> => config
