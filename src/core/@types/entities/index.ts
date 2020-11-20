import type { IComponentType, PickComponents } from '../components'
import type { IBooster } from './IBooster'
import type { IEntity } from './IEntity'
import type { IGame } from './IGame'
import type { IPlayer } from './IPlayer'

export interface IEntityMap {
  player: IPlayer
  booster: IBooster
  game: IGame
}

export type IEntityType = keyof IEntityMap

export type IEntityOf<T extends IComponentType[] = IComponentType[]> = IEntity<
  IEntityType,
  PickComponents<T>
>

export type IEntityDataOf<T extends keyof IEntityMap> = IEntityMap[T]

export type { IEntity } from './IEntity'
