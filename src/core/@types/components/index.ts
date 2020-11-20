import type { IPosition } from './IPosition'
import type { IMovement } from './IMovement'

export interface IComponentMap {
  position: IPosition
  movement: IMovement
}

export type IComponentType = keyof IComponentMap

export type { PickComponents } from './utils/PickComponents'
