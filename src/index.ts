import { World } from './core/world'

const world = new World()

const entity = world.add('player', {
  position: { x: 100, y: 100 },
  movement: { speed: 10 },
  shape: { shape: 'square', size: 40, color: '#fed330' },
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

function SquareCollider(
  cx: number,
  cy: number,
  size: number,
  color: string,
  toColor: string,
  cb: (isColliding: boolean) => void,
) {
  const player = world.get('player').data

  const { x, y } = player.position

  const isColliding =
    x > cx - player.shape.size &&
    y > cy - player.shape.size &&
    x < cx + size &&
    y < cy + size

  square(cx, cy, size, isColliding ? toColor : color)

  if (cb) cb(isColliding)
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

  SquareCollider(500, 800, 300, '#fc5c65', '#2bcbba', (isColliding) => {
    if (isColliding) {
      const { movement, shape } = world.get('player').data
      movement.speed = 100
      shape.color = '#2bcbba'

      setTimeout(() => {
        movement.speed = 10
        shape.color = '#fed330'
      }, 2000)
    }
  })

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
