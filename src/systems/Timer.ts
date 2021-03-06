import { createSystem } from './utils/createSystem'

export const TimerSystem = createSystem({
  deps: ['timer'],

  async onTick(es, w) {
    es.forEach((e) => {
      const { timer } = e.data
      const { enabled } = timer

      if (!enabled) return

      timer.deltaTime++
    })
  },
})
