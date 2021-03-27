import type { ConditionalExcept } from 'type-fest'

import type { IComponentType, IComponentMap } from '..'

export type WithComponent<
  T extends IComponentType,
  R = {
    // Use conditional types to check if 'texture' is in 'texture' | 'position'
    // If yes, we get the actual type (i.e. IComponentMap['position'] = IPosition).
    // Otherwise, return never.
    [K in IComponentType]: K extends T ? IComponentMap[K] : never
  }
  // If the field type is `never`, we exclude it from the object.
> = ConditionalExcept<R, never>
