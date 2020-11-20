import { createEntity } from './createEntity'

import type { ISystem } from '../@types/ISystem'

import type {
  IEntity,
  IEntityDataOf,
  IEntityOf,
  IEntityType,
} from '../@types/entities'

import type { IComponentType } from '../@types/components'

export class World {
  entities: IEntity[] = []
  systems: ISystem[] = []

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
    process: (entities: IEntityOf<T>[], world: World) => void,
    deps: T,
  ) {
    const system: ISystem<T> = { deps, process }

    this.systems.push(system)
  }

  tick() {
    this.systems.forEach((system) => {
      const filtered = this.entities.filter((e) => {
        const keys = Object.keys(e.data)

        return system.deps.every((dep) => keys.includes(dep))
      })

      system.process(filtered as IEntityOf[], this)
    })
  }

  loop = () => {
    this.tick()

    requestAnimationFrame(this.loop)
  }
}
