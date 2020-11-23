import type { IPosition } from './IPosition'
import type { IMovement } from './IMovement'
import type { IShape } from './IShape'
import type { ICollider } from './ICollider'
import type { ITimer } from './ITimer'
import type { ITexture } from './ITexture'

export interface IComponentMap {
  position: IPosition
  movement: IMovement
  shape: IShape
  texture: ITexture
  collider: ICollider

  timer: ITimer
  keyState: Record<string, boolean>
}

export type IComponentType = keyof IComponentMap

export type { PickComponents } from './utils/PickComponents'
