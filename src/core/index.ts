import { pixi } from '../gfx'

// Actions
import { RootActions } from '../actions'
import type { IActionType, IRootActionMap } from '../@types/actions'

// Systems
import type { ISharedComponentMap, ISystem } from '../@types/core'
import type { ISystemLifecycle } from '../@types/core'

import { getSystemLifecycleHandle } from './utils/getSystemLifecycleHandle'

// Entities
import { createEntity } from './utils/createEntity'
import { filterEntities } from './utils/filterEntities'

import type {
  IEntity,
  IEntityDataOf,
  IEntityOf,
  IEntityType,
} from '../@types/entities'

import { createComponent } from './utils/createSharedComponents'
import {
  createEntityWithComponentIds,
  createEntityWithSharedComponents,
} from './utils/createEntityWithSharedComponent'

import type { IComponentMap, IComponentType } from '../@types/components'

export class World {
  entities: IEntity[] = []
  systems: ISystem[] = []

  components: ISharedComponentMap = {}

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

  addEntityByComponents<T extends IEntityType>(
    type: T,
    componentIds: string[],
  ): IEntity<T> {
    const entity = createEntityWithComponentIds(type, componentIds)
    this.entities.push(entity)

    return entity
  }

  addSharedEntity<T extends IEntityType>(
    type: T,
    data: IEntityDataOf<T>,
  ): IEntity<T> {
    const [entity, components] = createEntityWithSharedComponents(type, data)

    components.forEach(([id, block]) => {
      this.components[id] = block
    })

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

  addComponent<T extends IComponentType>(type: T, data: IComponentMap[T]) {
    const [id, block] = createComponent(type, data)
    this.components[id] = block

    return id
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
      const filteredEntities = deps
        ? filterEntities(entities, deps, this.components)
        : []

      await handle(filteredEntities as IEntityOf[], this)
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
