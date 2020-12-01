import type { ISystemHandler } from './ISystemHandler'

import type { IComponentType } from '../components'

export type ISystemLifecycle = 'setup' | 'tick' | 'cleanup'

export type ISystemLifecycleHandlers<T extends IComponentType[]> = {
  [x in ISystemLifecycle as `on${Capitalize<x>}`]?: ISystemHandler<T>
}
