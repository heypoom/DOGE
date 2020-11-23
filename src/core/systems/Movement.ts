import type { IEntityOf } from '../@types/entities'
import type { World } from '../world'

type IMovableEntity = IEntityOf<['position', 'movement', 'collider']>

const screenW = window.innerWidth * 2
const screenH = window.innerHeight * 2

const keymap: Record<string, (e: IMovableEntity) => void> = {
  ArrowUp(e) {
    const { position, movement, collider } = e.data

    if (position.y > 0) {
      position.y -= movement.speed
    }
  },

  ArrowDown(e) {
    const { position, movement, collider } = e.data

    if (position.y < screenH - movement.speed - 50) {
      position.y += movement.speed
    }
  },

  ArrowLeft(e) {
    const { position, movement, collider } = e.data

    if (position.x > 0) {
      position.x -= movement.speed
    }
  },

  ArrowRight(e) {
    const { position, movement, collider } = e.data

    if (position.x < screenW - movement.speed) {
      position.x += movement.speed
    }
  },
}

export function Movement(entities: IMovableEntity[], world: World) {
  const { keyState } = world.get('game').data

  entities.forEach((e) => {
    Object.entries(keyState).forEach(([key, state]) => {
      if (state) {
        const handle = keymap[key]
        if (handle) handle(e)
      }
    })
  })
}
