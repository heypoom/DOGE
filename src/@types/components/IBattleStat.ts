import type { IEffectInstance as IEffect } from '../IEffect'

export interface IBattleStat {
  baseAttack: number
  baseDefense: number
  baseLuck: number

  effects: IEffect[]
}
