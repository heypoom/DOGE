import type { IEntityDataOf, IEntityType } from '../../@types/entities'

export interface IEntity<
  Type extends IEntityType = IEntityType,
  Data = IEntityDataOf<Type>
> {
  id: string
  type: Type
  data: Data
}
