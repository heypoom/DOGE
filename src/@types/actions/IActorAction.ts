import type {
  IDirection,
  ITeam,
  IItemInstance as IItem,
  IEffectInstance as IEffect,
} from '../index'

export interface IActorAction {
  '@actor/paint': { team: ITeam; color: string }
  '@actor/move': { direction: IDirection }
  '@actor/use': { item: IItem }

  '@effect/apply': { effect: IEffect }
}

export interface IPickupAction {
  '@actor/pickup': null
}
