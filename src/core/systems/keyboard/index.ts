import { movementKeymap } from './movement'

import { createSystem } from '../utils/createSystem'

export const KeyboardSystem = createSystem({
  deps: ['keyState'],

  onSetup([e]) {
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
      if (!state) return

      // Handles movement keys (wasd, arrow keys)
      const direction = movementKeymap[key]
      if (direction) return w.act('@actor/move', { direction }, player)
    })
  },
})
