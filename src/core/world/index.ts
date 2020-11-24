import { createEntity } from './createEntity'

import type { ISystem } from '../@types/ISystem'

import type {
  IEntity,
  IEntityDataOf,
  IEntityOf,
  IEntityType,
} from '../@types/entities'

import { RootActions } from '../actions'
import type { IActionType, IRootActionMap } from '../actions/@types'

import { pixi } from '../../gfx/pixi'

import type { IComponentType } from '../@types/components'

function filterEntities(entities: IEntity[], deps: IComponentType[]) {
  if (deps.length === 0) return entities as IEntityOf[]

  return entities.filter((e) => {
    const keys = Object.keys(e.data)

    return deps?.every((dep) => keys.includes(dep))
  }) as IEntityOf[]
}

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

  addSystem(system: ISystem) {
    this.systems.push(system)
  }

  async run(lifecycle: 'setup' | 'tick') {
    for (const system of this.systems) {
      const { deps, onTick, onSetup } = system
      const process = lifecycle === 'setup' ? onSetup : onTick

      if (!deps) {
        if (process) await process([], this)
        continue
      }

      const entities = filterEntities(this.entities, deps)
      if (process) await process(entities, this)
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
