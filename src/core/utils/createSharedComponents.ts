import shortid from 'shortid'

import type { IComponentMap, IComponentType } from '../../@types/components'

import type { ISharedComponentBlock } from '../../@types/core'

export const createComponent = <T extends IComponentType>(
  type: T,
  data: Partial<IComponentMap[T]>,
): [string, ISharedComponentBlock] => [
  `shared-${type}-${shortid()}`,
  [type, data],
]
