import type { ConditionalExcept } from 'type-fest'

import type { IComponentType, IComponentMap } from '..'

export type IComponentOfKey<
  T extends IComponentType[],
  K extends IComponentType
> = T extends (infer U)[] ? (K extends U ? IComponentMap[K] : never) : never

export type PickComponents<
  T extends IComponentType[],
  R = {
    [K in IComponentType]: IComponentOfKey<T, K>
  }
> = ConditionalExcept<R, never>
