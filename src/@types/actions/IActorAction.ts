import type { IDirection, ITeam, IItemInstance as IItem } from '../index'

export interface IActorAction {
  '@actor/paint': { team: ITeam; color: string }
  '@actor/move': { direction: IDirection }
  '@actor/use': { item: IItem }
}

export interface IPickupAction {
  '@actor/pickup': null
}