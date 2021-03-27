import type { IEntity, ISharedComponentMap } from '../../@types/core'
import type { IEntityType, IEntityDataOf } from '../../@types/entities'

export function injectComponentData<T extends IEntityType>(
  e: IEntity<T>,
  components: ISharedComponentMap,
): IEntityDataOf<T> {
  type EntityData = IEntityDataOf<T>
  type Keys = keyof EntityData

  const entityData = {} as EntityData

  e.componentIds?.forEach((id) => {
    const [type, data] = components[id]
    entityData[type as Keys] = data as EntityData[Keys]
  })

  return entityData
}
