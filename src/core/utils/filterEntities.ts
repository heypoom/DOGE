import type { IEntityOf } from '../../@types/entities'
import type { IComponentType } from '../../@types/components'

import type { IEntity, ISharedComponentMap } from '../../@types/core'
import { injectComponentData } from './injectComponentData'

export function filterEntities(
  entities: IEntity[],
  deps: IComponentType[],
  components: ISharedComponentMap,
) {
  if (deps.length === 0) return entities as IEntityOf[]

  return entities
    .map((e) => ({ ...e, data: injectComponentData(e, components) }))
    .filter((e) => {
      if (!e.data) return false

      const keys = Object.keys(e.data)

      return deps?.every((dep) => keys.includes(dep))
    })
}
