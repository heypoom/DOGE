import { action } from '../../actions'

import type { IEffectBlueprint as Effect } from '../../@types'

const immunity: Effect = { name: 'Immunity' }

const gratefulTears: Effect = {
  name: 'Grateful Tears',
  description: '',

  mode: 'AreaOfEffect',
  target: 'enemy',

  timing: {
    duration: 9000,
    iteration: 1,
  },
}

export const EffectRegistry = {
  immunity,
  gratefulTears,
} as const

export type IEffectType = keyof typeof EffectRegistry

export const getEffect = (type: IEffectType): Effect => EffectRegistry[type]
