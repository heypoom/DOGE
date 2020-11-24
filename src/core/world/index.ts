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

import type { IComponentType } from '../@types/components'
import type { ISystemHandler } from '../@types/ISystemHandler'

export class World {
  entities: IEntity[] = []
  systems: ISystem[] = []

  setup() {
    const systems = this.systems.filter((s) => s.runOn === 'setup')
    console.log(`[Setup] Found ${systems.length} startup system.`)

    this.run(systems, this.entities)
  }

  tick() {
    const systems = this.systems.filter((s) => s.runOn === 'tick')

    this.run(systems, this.entities)
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

  addSystem<T extends IComponentType[]>(
    process: ISystemHandler<T>,
    deps?: T,
    options?: Partial<Pick<ISystem, 'runOn'>>,
  ) {
    const system: ISystem<T> = {
      deps,
      process,
      runOn: options?.runOn ?? 'tick',
    }

    this.systems.push(system)
  }

  addSetupSystem<T extends IComponentType[]>(
    process: ISystemHandler<T>,
    deps?: T,
  ) {
    this.addSystem(process, deps, { runOn: 'setup' })
  }

  run(systems: ISystem[], entities: IEntity[]) {
    systems.forEach((system) => {
      if (!system.deps) return system.process([], this)

      const filtered =
        system.deps.length === 0
          ? entities
          : entities.filter((e) => {
              const keys = Object.keys(e.data)

              return system.deps?.every((dep) => keys.includes(dep))
            })

      system.process(filtered as IEntityOf[], this)
    })
  }

  loop = () => {
    this.tick()

    requestAnimationFrame(this.loop)
  }

  act<T extends IActionType, E extends IEntityType = IEntityType>(
    type: T,
    data: IRootActionMap[T],
    entity: IEntity<E>,
  ) {
    console.log(`${entity.type}(${type}):`, data)

    const action = RootActions[type]
    if (action) action(data as never, entity as never, this)
  }

  start() {
    this.setup()

    this.loop()
  }
}
