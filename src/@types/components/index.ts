import type { IPosition } from './IPosition'
import type { IMovement } from './IMovement'
import type { IShape } from './IShape'
import type { ICollider } from './ICollider'
import type { ITimer } from './ITimer'
import type { ITexture } from './ITexture'
import type { IInventory } from './IInventory'

import type { IItemInstance as Item } from '../IItem'
import type { IHealth } from './IHealth'
import type { IBattleStat } from './IBattleStat'

/** Do the same thing with components. */
export interface IComponentMap {
  position: IPosition
  movement: IMovement
  shape: IShape
  texture: ITexture
  collider: ICollider
  inventory: IInventory
  item: Item

  timer: ITimer
  keypress: Record<string, boolean>

  health: IHealth
  battle: IBattleStat
}

export type IComponentType = keyof IComponentMap

export type { WithComponent } from './utils/PickComponents'
