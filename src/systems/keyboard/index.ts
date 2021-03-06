import { movementKeymap } from './movement'

import { createSystem } from '../utils/createSystem'

export const KeyboardSystem = createSystem({
  deps: ['keypress'],

  onSetup([e]) {
    const game = e.data

    document.addEventListener('keydown', (e) => {
      game.keypress[e.key] = true
    })

    document.addEventListener('keyup', (e) => {
      game.keypress[e.key] = false
    })
  },

  async onTick([e], w) {
    const { keypress } = e.data
    const player = w.get('player')

    Object.entries(keypress).forEach(([key, state]) => {
      if (!state) return

      // Handles movement keys (wasd, arrow keys)
      const direction = movementKeymap[key]
      if (direction) return w.act('@actor/move', { direction }, player)
    })
  },
})
