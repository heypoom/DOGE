import type { IDirection } from '../actions/@types/IActorAction'

import { createSystem } from './utils/createSystem'

const keymap: Record<string, IDirection> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
}

export const MovementSystem = createSystem({
  deps: ['position', 'movement', 'collider'],

  async onTick(e, w) {
    const { keyState } = w.get('game').data
    const player = w.get('player')

    Object.entries(keyState).forEach(([key, state]) => {
      if (state) {
        const direction = keymap[key]
        if (direction) w.act('@actor/move', { direction }, player)
      }
    })
  },
})
