import type { IComponentType } from '../components'
import type { IEntityDataOf, IEntityMap, IEntityType } from '../entities'

export type ISharedComponentData = Partial<IEntityDataOf<keyof IEntityMap>>
export type ISharedComponentBlock = [IComponentType, ISharedComponentData]
export type ISharedComponentMap = Record<string, ISharedComponentBlock>
