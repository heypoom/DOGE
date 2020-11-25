import type { IAction } from './core'
import type { IEffectType } from '../game/effects'

export type IEffectMode = 'Direct' | 'AreaOfEffect'
export type IEffectTarget = 'player' | 'enemy' | 'ally'

export interface IEffectInstance {
  type: IEffectType
}

export interface IEffectBlueprint {
  name: string

  action?: IAction
  timing?: IEffectTiming

  mode?: IEffectMode
  target?: IEffectTarget

  description?: string
}

export interface IEffectTiming {
  /** Run the action for n millisec each time. */
  duration?: number

  /** Pause for n millisec each time. */
  delay?: number

  /** Do this for n times in total. */
  iteration?: number
}
