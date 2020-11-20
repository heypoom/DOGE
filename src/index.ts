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

const canvas = document.querySelector('canvas')
const ctx = canvas?.getContext('2d')

const [sw, sh] = [window.innerWidth * 2, window.innerHeight * 2]

if (canvas) {
  canvas.width = sw
  canvas.height = sh
}

const keystate: Record<string, boolean> = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
}

function square(x: number, y: number, size: number, color: string) {
  if (!ctx) return

  ctx.shadowBlur = 50
  ctx.shadowColor = color

  ctx.fillStyle = color
  ctx.fillRect(x, y, size, size)
}

function circle(x: number, y: number, size: number, color: string) {
  if (!ctx) return

  ctx.beginPath()
  ctx.arc(x, y, size, 0, Math.PI * 2, true)

  ctx.shadowBlur = 50
  ctx.shadowColor = color

  ctx.fillStyle = color
  ctx.fill()
}

function Booster() {
  const booster = world.get('booster').data
  const { x: cx, y: cy } = booster.position

  square(cx, cy, booster.shape.size, booster.shape.color)

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

  const player = world.get('player').data

  ctx.fillStyle = '#111'
  ctx.fillRect(0, 0, sw, sh)

  Object.entries(keystate).map(([key, state], i) => {
    const debugSize = 10

    // Debug Squares
    ctx.fillStyle = state ? '#26de81' : '#eb3b5a'
    ctx.fillRect(i * debugSize, 0, debugSize, debugSize)

    if (state) {
      const handle = keymap[key]
      if (handle) handle()
    }
  })

  Booster()

  // Render player
  circle(
    player.position.x,
    player.position.y,
    player.shape.size,
    player.shape.color,
  )

  requestAnimationFrame(gameLoop)
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

    if (position.y < sh - movement.speed - 50) {
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

    if (position.x < sw - movement.speed) {
      position.x += movement.speed
    }
  },
}

document.addEventListener('keydown', (e) => {
  keystate[e.key] = true
})

document.addEventListener('keyup', (e) => {
  keystate[e.key] = false
})

gameLoop()
