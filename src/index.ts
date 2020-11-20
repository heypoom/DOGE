const canvas = document.querySelector('canvas')
const ctx = canvas?.getContext('2d')

const [sw, sh] = [window.innerWidth * 2, window.innerHeight * 2]

if (canvas) {
  canvas.width = sw
  canvas.height = sh
}

let size = 100

const keystate: Record<string, boolean> = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
}

const state = {
  x: 100,
  y: 100,
  playerColor: '#fed330',
  moveSpeed: 10,
}

function square(x: number, y: number, size: number, color: string) {
  if (!ctx) return

  ctx.fillStyle = color
  ctx.fillRect(x, y, size, size)
}

function SquareCollider(
  cx: number,
  cy: number,
  size: number,
  color: string,
  toColor: string,
  cb: () => void,
) {
  const { x, y } = state

  const isColliding = x > cx && x < cx + size && y > cy && y < cy + size

  square(cx, cy, size, isColliding ? toColor : color)

  if (isColliding && cb) cb()
}

function gameLoop() {
  if (!ctx) return

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

  SquareCollider(500, 800, 300, '#fc5c65', '#ff8c6f', () => {
    state.playerColor = '#ff8c6f'
  })

  square(state.x, state.y, size, state.playerColor)

  requestAnimationFrame(gameLoop)
}

const keymap: Record<string, () => void> = {
  ArrowUp: () => state.y > 0 && (state.y -= state.moveSpeed),

  ArrowDown: () =>
    state.y < sh - state.moveSpeed - 50 && (state.y += state.moveSpeed),

  ArrowLeft: () => state.x > 0 && (state.x -= state.moveSpeed),

  ArrowRight: () =>
    state.x < sw - state.moveSpeed && (state.x += state.moveSpeed),
}

document.addEventListener('keydown', (e) => {
  keystate[e.key] = true
})

document.addEventListener('keyup', (e) => {
  keystate[e.key] = false
})

gameLoop()
