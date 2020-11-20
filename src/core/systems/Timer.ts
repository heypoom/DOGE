import type { IEntityOf } from '../@types/entities'

type ITimerEntity = IEntityOf<['timer']>

export function Timer(entities: ITimerEntity[]) {
  entities.forEach((e) => {
    const { timer } = e.data
    const { enabled } = timer

    if (!enabled) return

    timer.deltaTime++
  })
}
