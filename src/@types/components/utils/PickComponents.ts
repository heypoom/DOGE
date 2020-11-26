import type { ConditionalExcept } from 'type-fest'

import type { IComponentType, IComponentMap } from '..'

export type WithComponent<
  T extends IComponentType,
  R = {
    [K in IComponentType]: K extends T ? IComponentMap[K] : never
  }
> = ConditionalExcept<R, never>
