import type { IComponentType, PickComponents } from '../@types/components'

export function Schema<T extends IComponentType[]>(...v: T) {
  type Entity = PickComponents<T>

  return {} as Entity
}
