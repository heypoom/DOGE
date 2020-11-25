import type { IWall } from './IWall'
import type { IGame } from './IGame'
import type { IPlayer } from './IPlayer'
import type { IActor } from './IActor'
import type { IDroppedItem } from './IDroppedItem'

import type { IComponentType, PickComponents } from '../components'

import type { IEntity } from '../core'

export interface IEntityMap {
  player: IPlayer
  wall: IWall
  game: IGame
  actor: IActor
  droppedItem: IDroppedItem
}

export type IEntityType = keyof IEntityMap

export type IEntityOf<T extends IComponentType[] = IComponentType[]> = IEntity<
  IEntityType,
  PickComponents<T>
>

export type IEntityDataOf<T extends keyof IEntityMap> = IEntityMap[T]

export { IEntity } from '../core'
