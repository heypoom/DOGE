import type { IPosition } from './IPosition'
import type { IMovement } from './IMovement'
import type { IShape } from './IShape'

export interface IComponentMap {
  position: IPosition
  movement: IMovement
  shape: IShape
}

export type IComponentType = keyof IComponentMap

export type { PickComponents } from './utils/PickComponents'
