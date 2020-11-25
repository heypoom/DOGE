import { v4 } from 'uuid'

import type { IEntity, IEntityDataOf, IEntityType } from '../../@types/entities'

export const createEntity = <T extends IEntityType>(
  type: T,
  data: IEntityDataOf<T>,
): IEntity<T> => ({
  id: v4(),
  type,
  data,
})
