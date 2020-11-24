import type { IDirection } from '../actions/@types/IActorAction'

import type { ISystemHandler } from '../@types/ISystemHandler'

const keymap: Record<string, IDirection> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}

type IDep = ['position', 'movement', 'collider']

export const Movement: ISystemHandler<IDep> = (e, w) => {
  const { keyState } = w.get('game').data
  const player = w.get('player')

  Object.entries(keyState).forEach(([key, state]) => {
    if (state) {
      const direction = keymap[key]
      if (direction) w.act('@actor/move', { direction }, player)
    }
  })
}
