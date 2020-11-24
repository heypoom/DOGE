# DOGE: Data Oriented Game Engine

![DOGE](docs/doge-cover.jpg)

## What is DOGE?

DOGE is a data-oriented game engine built with TypeScript.

This engine is built on the concepts of the Entity-Component-System (ECS) architecture; it uses Pixi.js for graphics and Matter.js for physics.

This is still just a **proof-of-concept**. Please feel free to take a look!

# Key Concepts

## Entities

Entities refer to the objects in the game world, such as the player, enemy, walls, dropped items, lights and so on.

Entities in DOGE are TypeScript types that describe which piece of data (data components) are required by this entity. For example, the `Actor` entity might have the `position`, `movement`, `texture` and `collider` components.

> Therefore, entities are just a "data container" that contains the "data components"

To reduce boilerplate, we use the `Schema` function to compose the data components together.

```ts
// src/core/@types/entities/IActor.ts

const ActorSchema = Schema('position', 'movement', 'texture', 'collider')

type IActor = typeof ActorSchema
```

> We store the entities in `src/core/@types/entities`.

## Components

Components refer to the pieces of data that can be used in the entities in the game world, and can be used by systems to perform computation.

For example: `Position`, `Movement`, `Inventory`, `Shape`, `Texture`, `Timer`, `Collider`, etc.

Components in DOGE are just a plain TypeScript type that describe which data it contains. Here is how `Position` and `Texture` looks like:

```ts
// src/core/@types/components

interface IPosition {
  x: number
  y: number
}

interface ITexture {
  src: string
  width: number
  height: number
}
```

> We store the data components in `src/core/@types/components`.

## Systems

Systems uses the data components in entities to process the game world, using the data as a source of truth. Each system handles the different domains and concerns.

For example: `TextureRendererSystem`, `ColliderSystem`, `MovementSystem`, etc.

Systems in DOGE are an object containing the lifecycle functions (on tick, on setup), and the dependencies aka the data components the system needs.

We use the `createSystem` helper to type-check the data components based on the dependencies.

Here is the entire code for the `TextureRendererSystem`.

```ts
// src/core/systems/renderer/TextureRenderer.ts

const TextureRendererSystem = createSystem({
  deps: ['position', 'texture'],

  async onSetup(es) {
    for (const entity of es) {
      const { position, texture } = entity.data

      const tex = await addTexture(texture.src)

      const sprite = new Sprite(tex)
      sprite.x = position.x
      sprite.y = position.y
      sprite.width = texture.width
      sprite.height = texture.height
      sprite.name = entity.id

      pixi.stage.addChild(sprite)
    }
  },

  onTick(es) {
    es.forEach((entity) => {
      const { position } = entity.data

      const sprite = pixi.stage.getChildByName(entity.id)
      if (!sprite) return

      sprite.x = position.x
      sprite.y = position.y
    })
  },
})
```

> We store the systems in `src/core/systems`.

## Actions

Actions refer to the action that can be performed by the entities in the game world, or triggered from the interaction between systems or entities.

For example, we can use the `@actor/move` action to move the player to the left:

```ts
const player = world.get('player')

world.act('@actor/move', { direction: 'left' }, player)
```

This action is used in the `MovementSystem` to make the player move according to arrow or WASD navigation.

> Therefore, we can extract the logic out of our systems and into the actions to improve code maintainability and ease of debugging.

To implement actions for an entity, we first declare a type that maps the action name to the action input data.

```ts
// src/core/actions/@types/IActorAction.ts

interface IActorAction {
  '@actor/move': { direction: IDirection }
  '@actor/use': { item: IItem }
  '@actor/paint': { team: ITeam; color: string }
}
```

Then, we can implement actions for the actor. We can refactor the action logic into a separate file as well:

```ts
// src/core/actions/actor/index.ts

const ActorActions: IActionGroup<IActorAction, 'actor'> = {
  '@actor/move': (a, e) => MoveAction[a.direction]?.(e),
}

// src/core/actions/actor/movement.ts

type IHandler = (e: IEntity<'actor'>) => void

export const MoveAction: Record<IDirection, IHandler> = {
  up(e) {
    const { position, movement } = e.data

    if (position.y > 0) position.y -= movement.speed
  },
}
```

> We store the actions in `src/core/actions`.
