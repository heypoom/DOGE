import type { IPosition } from './IPosition'
import type { IMovement } from './IMovement'
import type { IShape } from './IShape'
import type { ICollider } from './ICollider'

export interface IComponentMap {
  position: IPosition
  movement: IMovement
  shape: IShape
  collider: ICollider
}

export type IComponentType = keyof IComponentMap

export type { PickComponents } from './utils/PickComponents'
