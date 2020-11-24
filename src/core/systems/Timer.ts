import type { ISystemHandler } from '../@types/ISystemHandler'

export const Timer: ISystemHandler<['timer']> = (es, w) => {
  es.forEach((e) => {
    const { timer } = e.data
    const { enabled } = timer

    if (!enabled) return

    timer.deltaTime++
  })
}
