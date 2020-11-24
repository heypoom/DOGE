import type { IEntity } from '../../@types/IEntity'
import type { IDirection } from '../@types/IActorAction'

const screenW = window.innerWidth * 2
const screenH = window.innerHeight * 2

type IHandler = (e: IEntity<'actor'>) => void

export const MoveAction: Record<IDirection, IHandler> = {
  up(e) {
    const { position, movement, collider } = e.data

    if (position.y > 0) {
      position.y -= movement.speed
    }
  },

  down(e) {
    const { position, movement, collider } = e.data

    if (position.y < screenH - movement.speed - 50) {
      position.y += movement.speed
    }
  },

  left(e) {
    const { position, movement, collider } = e.data

    if (position.x > 0) {
      position.x -= movement.speed
    }
  },

  right(e) {
    const { position, movement, collider } = e.data

    if (position.x < screenW - movement.speed) {
      position.x += movement.speed
    }
  },
}
