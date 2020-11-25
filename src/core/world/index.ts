import { pixi } from '../../gfx/pixi'

// Actions
import { RootActions } from '../actions'
import type { IActionType, IRootActionMap } from '../actions/@types'

// Systems
import type { ISystem } from '../@types/ISystem'
import type { ISystemLifecycle } from '../@types/ISystemLifecycle'

import { getSystemLifecycleHandle } from './utils/getSystemLifecycleHandle'

// Entities
import { createEntity } from './utils/createEntity'
import { filterEntities } from './utils/filterEntities'

import type { IEntity, IEntityDataOf, IEntityType } from '../../@types/entities'

export class World {
  entities: IEntity[] = []
  systems: ISystem[] = []

  setup() {
    this.run('setup').then()
  }

  tick(delta: number) {
    this.run('tick').then()
  }

  list<T extends IEntityType>(type: T): IEntity<T>[] {
    return this.entities.filter((e) => e.type === type) as IEntity<T>[]
  }

  get<T extends IEntityType>(type: T): IEntity<T> {
    return this.entities.find((e) => e.type === type) as IEntity<T>
  }

  addEntity<T extends IEntityType>(
    type: T,
    data: IEntityDataOf<T>,
  ): IEntity<T> {
    const entity = createEntity(type, data)
    this.entities.push(entity)

    return entity
  }

  async removeEntity(id: string) {
    // Get the entity to remove.
    const entity = this.entities.find((e) => e.id === id)
    if (!entity) return

    // Execute the cleanup process.
    await this.run('cleanup', [entity])

    this.entities = this.entities.filter((e) => e.id !== id)
  }

  addSystem(system: ISystem) {
    this.systems.push(system)
  }

  async run(
    lifecycle: ISystemLifecycle,
    entities = this.entities,
    systems = this.systems,
  ) {
    for (const system of systems) {
      const { deps } = system

      // Get the system lifecycle handle (onSetup, onTick, onCleanup)
      const handle = getSystemLifecycleHandle(system, lifecycle)
      if (!handle) continue

      // Run the system handle with the entities that uses that system.
      const objects = deps ? filterEntities(entities, deps) : []
      await handle(objects, this)
    }
  }

  act<T extends IActionType, E extends IEntityType = IEntityType>(
    type: T,
    data: IRootActionMap[T] | undefined,
    entity: IEntity<E>,
  ) {
    console.log(`${entity.type}(${type}):`, data ?? 'no data')

    const action = RootActions[type]
    if (action) action(data as never, entity as never, this)
  }

  start() {
    this.setup()

    pixi.ticker.add((delta) => this.tick(delta))
  }
}
