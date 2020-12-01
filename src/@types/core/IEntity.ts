import type { IEntityDataOf, IEntityType } from '../../@types/entities'

export interface IEntity<Type extends IEntityType = IEntityType> {
  id: string
  type: Type

  componentIds?: string[]
}

export type InjectedEntity<
  T extends IEntityType = IEntityType,
  Data = IEntityDataOf<T>
> = IEntity<T> & {
  data: Data
}
