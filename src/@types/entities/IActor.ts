import type { IPosition } from '../components/IPosition'
import type { WithComponent } from '../core'

interface IPlayer {
  position: IPosition
}

/** WithComponent type help us compose an entity from union of components. */
export type IActor = WithComponent<
  | 'position'
  | 'movement'
  | 'texture'
  | 'collider'
  | 'inventory'
  | 'battle'
  | 'health'
>
