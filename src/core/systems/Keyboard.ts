import type { IDirection } from '../actions/@types/IActorAction'

import { createSystem } from './utils/createSystem'

const movementKeymap: Record<string, IDirection> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  a: 'left',
  s: 'down',
  d: 'right',
}

export const KeyboardSystem = createSystem({
  deps: ['keyState'],

  onSetup([e], w) {
    const game = e.data

    document.addEventListener('keydown', (e) => {
      game.keyState[e.key] = true
    })

    document.addEventListener('keyup', (e) => {
      game.keyState[e.key] = false
    })
  },

  async onTick([e], w) {
    const { keyState } = e.data

    const player = w.get('player')

    Object.entries(keyState).forEach(([key, state]) => {
      if (state) {
        const direction = movementKeymap[key]
        if (direction) w.act('@actor/move', { direction }, player)
      }
    })
  },
})
