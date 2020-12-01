import { v4 } from 'uuid'

import { createComponent } from './createSharedComponents'

import type { IComponentMap, IComponentType } from '../../@types/components'
import type { IEntityType, IEntityDataOf } from '../../@types/entities'

import type { IEntity, ISharedComponentBlock } from '../../@types/core'

export const createEntityByIds = <T extends IEntityType>(
  type: T,
  componentIds: string[],
): IEntity<T> => ({
  id: v4(),
  type,
  componentIds,
})

export const createSharedComponents = <T extends IEntityType>(
  data: Partial<IEntityDataOf<T>>,
) =>
  Object.entries(data).map(([type, block]) =>
    createComponent(
      type as IComponentType,
      block as Partial<IComponentMap[IComponentType]>,
    ),
  )

export const createStandaloneEntity = <T extends IEntityType>(
  type: T,
  data: IEntityDataOf<T>,
): [IEntity<T>, [string, ISharedComponentBlock][]] => {
  const components = createSharedComponents(data)

  const entity: IEntity<T> = {
    id: v4(),
    type,
    componentIds: components.map((c) => c[0]),
  }

  return [entity, components]
}
