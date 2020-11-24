import type { IItem } from '../../../core/@types/IItem'

export type ITeam = 'player' | 'enemy'
export type IDirection = 'left' | 'right' | 'up' | 'down'

export interface IActorAction {
  '@actor/paint': { team: ITeam; color: string }
  '@actor/move': { direction: IDirection }
  '@actor/use': { item: IItem }
}
