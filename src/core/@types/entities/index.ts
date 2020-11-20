import type { IBooster } from './IBooster'
import type { IPlayer } from './IPlayer'

export interface IEntityMap {
  player: IPlayer
  booster: IBooster
}

export type IEntityType = keyof IEntityMap
export type IEntityDataOf<T extends keyof IEntityMap> = IEntityMap[T]

export type { IEntity } from './IEntity'
