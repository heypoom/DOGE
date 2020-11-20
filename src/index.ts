import { createEntity } from './core/world/createEntity'

const entity = createEntity('player', { position: { x: 100, y: 100 } })

// const canvas = document.querySelector('canvas')
// const ctx = canvas?.getContext('2d')

// const [sw, sh] = [window.innerWidth * 2, window.innerHeight * 2]

// if (canvas) {
//   canvas.width = sw
//   canvas.height = sh
// }

// const keystate: Record<string, boolean> = {
//   ArrowUp: false,
//   ArrowDown: false,
//   ArrowLeft: false,
//   ArrowRight: false,
// }

// const state = {
//   x: 100,
//   y: 100,
//   playerSize: 40,
//   playerColor: '#fed330',
//   moveSpeed: 10,
// }

// function square(x: number, y: number, size: number, color: string) {
//   if (!ctx) return

//   ctx.shadowBlur = 50
//   ctx.shadowColor = color

//   ctx.fillStyle = color
//   ctx.fillRect(x, y, size, size)
// }

// function circle(x: number, y: number, size: number, color: string) {
//   if (!ctx) return

//   ctx.beginPath()
//   ctx.arc(x, y, size, 0, Math.PI * 2, true)

//   ctx.shadowBlur = 50
//   ctx.shadowColor = color

//   ctx.fillStyle = color
//   ctx.fill()
// }

// function SquareCollider(
//   cx: number,
//   cy: number,
//   size: number,
//   color: string,
//   toColor: string,
//   cb: (isColliding: boolean) => void,
// ) {
//   const { x, y } = state

//   const isColliding =
//     x > cx - state.playerSize &&
//     y > cy - state.playerSize &&
//     x < cx + size &&
//     y < cy + size

//   square(cx, cy, size, isColliding ? toColor : color)

//   if (cb) cb(isColliding)
// }

// function gameLoop() {
//   if (!ctx) return

//   ctx.fillStyle = '#111'
//   ctx.fillRect(0, 0, sw, sh)

//   Object.entries(keystate).map(([key, state], i) => {
//     const debugSize = 10

//     // Debug Squares
//     ctx.fillStyle = state ? '#26de81' : '#eb3b5a'
//     ctx.fillRect(i * debugSize, 0, debugSize, debugSize)

//     if (state) {
//       const handle = keymap[key]
//       if (handle) handle()
//     }
//   })

//   SquareCollider(500, 800, 300, '#fc5c65', '#2bcbba', (isColliding) => {
//     if (isColliding) {
//       state.moveSpeed = 100
//       state.playerColor = '#2bcbba'

//       setTimeout(() => {
//         state.moveSpeed = 10
//         state.playerColor = '#fed330'
//       }, 2000)
//     }
//   })

//   // Render player
//   circle(state.x, state.y, state.playerSize, state.playerColor)

//   requestAnimationFrame(gameLoop)
// }

// const keymap: Record<string, () => void> = {
//   ArrowUp: () => state.y > 0 && (state.y -= state.moveSpeed),

//   ArrowDown: () =>
//     state.y < sh - state.moveSpeed - 50 && (state.y += state.moveSpeed),

//   ArrowLeft: () => state.x > 0 && (state.x -= state.moveSpeed),

//   ArrowRight: () =>
//     state.x < sw - state.moveSpeed && (state.x += state.moveSpeed),
// }

// document.addEventListener('keydown', (e) => {
//   keystate[e.key] = true
// })

// document.addEventListener('keyup', (e) => {
//   keystate[e.key] = false
// })

// gameLoop()
