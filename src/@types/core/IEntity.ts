// @seq: 6

import type { IEntityDataOf, IEntityType } from '../../@types/entities'

/**
 * Entity stores an identifier,
 * and which component ids have been referenced to by this entity.
 *
 * For example, "texture" and "position" components may be linked to a player.
 **/
export interface IEntity<Type extends IEntityType = IEntityType> {
  id: string
  type: Type

  /** It does not store the data directly, only the reference to the component cache. */
  componentIds?: string[]
}

/**
 * Injected Entity has a `data` field containing the actual component data.
 **/
export type InjectedEntity<
  T extends IEntityType = IEntityType,
  Data = IEntityDataOf<T>
> = IEntity<T> & {
  data: Data
}
