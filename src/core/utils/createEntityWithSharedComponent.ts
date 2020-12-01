import { v4 } from 'uuid'

import { createComponent } from './createSharedComponents'

import type { IComponentType } from '../../@types/components'
import type { IEntityType, IEntityDataOf } from '../../@types/entities'

import type { IEntity, ISharedComponentBlock } from '../../@types/core'

export const createEntityWithComponentIds = <T extends IEntityType>(
  type: T,
  componentIds: string[],
): IEntity<T> => ({
  id: v4(),
  type,
  componentIds,
})

export const createEntityWithSharedComponents = <T extends IEntityType>(
  type: T,
  data: IEntityDataOf<T>,
): [IEntity<T>, [string, ISharedComponentBlock][]] => {
  const components = Object.entries(data).map(([type, block]) =>
    createComponent(type as IComponentType, block),
  )

  const entity: IEntity<T> = {
    id: v4(),
    type,
    componentIds: components.map((c) => c[0]),
  }

  return [entity, components]
}
