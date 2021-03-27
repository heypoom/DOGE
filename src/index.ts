// @seq: 1

import { pixi } from './gfx'
import { World } from './core'

/** Import the systems to use in our game. */
import {
  KeyboardSystem,
  ColliderSystem,
  ShapeRendererSystem,
  TextureRendererSystem,
} from './systems'

/** Import the entities to use in our game. */
import {
  spawnPlayer,
  spawnWall,
  spawnGame,
  createItemDrop,
} from './game/entities'

/** Create an instance of the world. */
export const world = new World()

/** Spawn the entities. */
spawnPlayer(world)
spawnWall(world)
spawnGame(world)

/** Spawn the item drops. */
const spawnItemDrop = createItemDrop(world)

for (let i = 0; i < 10; i++) {
  spawnItemDrop(i % 2 ? 'StunGun' : 'DogeCoin', { x: i * 60, y: i * 60 })
}

/** Registers the systems to use with our game. */
world.addSystem(TextureRendererSystem)
world.addSystem(ShapeRendererSystem)
world.addSystem(ColliderSystem)
world.addSystem(KeyboardSystem)

/** Systems are just functions! */
world.addSystem({
  onSetup: () => {
    if (!pixi) return

    document.body.appendChild(pixi.view)
    pixi.renderer.backgroundColor = 0x2d2d30
  },
})

/** Initiate the game loop. */
world.start()

// @ts-ignore
window.w = world
