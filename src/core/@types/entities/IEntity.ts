import type { IEntityDataOf, IEntityType } from '.'

export interface IEntity<Type extends IEntityType = IEntityType> {
  id: string
  type: Type
  data: IEntityDataOf<Type>
}
