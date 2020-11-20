import type { IEntity } from '../@types/entities'
import type { IComponentType } from '../@types/components'

import { renderer } from './renderer'
import { KeyVisualizer } from './KeyVisualizer'

type ISystem = [(entities: IEntity[]) => void, IComponentType[]]

export const systemMap: Record<string, ISystem> = {
  Renderer: [renderer, ['shape', 'position']],
  KeyVisualizer: [KeyVisualizer, ['keyState']],
}

export { run } from './utils/run'
