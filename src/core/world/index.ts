import type { IEntity, IEntityDataOf, IEntityType } from '../@types/entities'
import { createEntity } from './createEntity'

import { run } from '../systems'

export class World {
  entities: IEntity[] = []

  list<T extends IEntityType>(type: T): IEntity<T>[] {
    return this.entities.filter((e) => e.type === type) as IEntity<T>[]
  }

  get<T extends IEntityType>(type: T): IEntity<T> {
    return this.entities.find((e) => e.type === type) as IEntity<T>
  }

  add<T extends IEntityType>(type: T, data: IEntityDataOf<T>): IEntity<T> {
    const entity = createEntity(type, data)
    this.entities.push(entity)

    return entity
  }

  tick() {
    run(this.entities)
  }

  loop = () => {
    this.tick()

    requestAnimationFrame(this.loop)
  }
}
