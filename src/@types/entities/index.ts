// @seq: 6

import type { IWall } from './IWall'
import type { IGame } from './IGame'
import type { IPlayer } from './IPlayer'
import type { IActor } from './IActor'
import type { IDroppedItem } from './IDroppedItem'

import type { IComponentType, WithComponent } from '../components'

import type { InjectedEntity } from '../core'

/** Create a mapping between entity name and the components it may link to. */
export interface IEntityMap {
  player: IPlayer
  wall: IWall
  game: IGame
  actor: IActor
  droppedItem: IDroppedItem
}

/** Which entities can we spawn? */
export type IEntityType = keyof IEntityMap

export type IEntityOf<
  T extends IComponentType = IComponentType
> = InjectedEntity<IEntityType, WithComponent<T>>

export type IEntityDataOf<T extends keyof IEntityMap> = IEntityMap[T]

export { IEntity } from '../core'
