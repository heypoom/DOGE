import type { IComponentType, PickComponents } from '../../components'

export function Schema<T extends IComponentType[]>(...v: T) {
  type Entity = PickComponents<T[number]>

  return {} as Entity
}
