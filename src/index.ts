import { canvas, ctx } from './canvas/context'

import { World } from './core/world'

const world = new World()

world.add('player', {
  position: { x: 100, y: 100 },
  movement: { speed: 10 },
  shape: { shape: 'square', size: 40, color: '#fed330' },
})

world.add('booster', {
  position: { x: 500, y: 800 },
  shape: { shape: 'square', size: 300, color: '#fc5c65' },

  collider: {
    enabled: true,
    role: 'target',

    onCollision() {
      const booster = world.get('booster').data
      const player = world.get('player').data

      booster.shape.color = '#2bcbba'

      player.movement.speed = 100
      player.shape.color = '#2bcbba'

      setTimeout(() => {
        booster.shape.color = '#eb3b5a'

        player.movement.speed = 10
        player.shape.color = '#fed330'
      }, 2000)
    },
  },
})

world.add('debug', {
  keyState: {},
})

world.loop()

const screenW = window.innerWidth * 2
const screenH = window.innerHeight * 2

if (canvas) {
  canvas.width = screenW
  canvas.height = screenH
}

function Booster() {
  const booster = world.get('booster').data
  const { x: cx, y: cy } = booster.position

  if (!booster.collider.enabled) return

  const player = world.get('player').data

  const { x, y } = player.position

  const isColliding =
    x > cx - player.shape.size &&
    y > cy - player.shape.size &&
    x < cx + booster.shape.size &&
    y < cy + booster.shape.size

  if (isColliding) booster.collider.onCollision()
}

function gameLoop() {
  if (!ctx) return

  Booster()
}

const keymap: Record<string, () => void> = {
  ArrowUp() {
    const { position, movement } = world.get('player').data

    if (position.y > 0) {
      position.y -= movement.speed
    }
  },

  ArrowDown() {
    const { position, movement } = world.get('player').data

    if (position.y < screenH - movement.speed - 50) {
      position.y += movement.speed
    }
  },

  ArrowLeft() {
    const { position, movement } = world.get('player').data

    if (position.x > 0) {
      position.x -= movement.speed
    }
  },

  ArrowRight() {
    const { position, movement } = world.get('player').data

    if (position.x < screenW - movement.speed) {
      position.x += movement.speed
    }
  },
}

const debug = world.get('debug').data

document.addEventListener('keydown', (e) => {
  debug.keyState[e.key] = true
})

document.addEventListener('keyup', (e) => {
  debug.keyState[e.key] = false
})
