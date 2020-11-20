import { systemMap } from '../index'

import type { IEntity } from '../../@types/entities'

export function run(entities: IEntity[]) {
  Object.entries(systemMap).forEach(([system, [process, deps]]) => {
    // console.log(`system(${system}): requires [${deps.join(' ')}]`)

    const filteredEntity = entities.filter((e) => {
      const keys = Object.keys(e.data)

      return deps.every((dep) => keys.includes(dep))
    })

    // console.log(`system(${system}): ${filteredEntity.length} entities`)

    process(filteredEntity)
  })
}
