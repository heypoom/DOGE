import { action } from '../../actions'
import type { World } from '../../core'
import { getItem, IItemType } from '../items'

import type { IPosition } from '../../@types/components/IPosition'
import { missingItemSprite } from '../../constants/missingItemSprite'

export function createItemDrop(world: World) {
  const sharedItemComponents: Partial<Record<IItemType, string[]>> = {}

  const itemColliderId = world.addComponent('collider', {
    enabled: true,
    size: 15,
    role: 'target',
    onCollision: action('@actor/pickup'),
  })

  function addItemDrop(type: IItemType, position: IPosition) {
    if (!sharedItemComponents[type]) {
      sharedItemComponents[type] = [
        world.addComponent('item', { type, quantity: 1 }),
        world.addComponent(
          'texture',
          getItem(type)?.sprite ?? missingItemSprite,
        ),
      ]
    }

    return world.addEntityByIds('droppedItem', [
      world.addComponent('position', position),
      itemColliderId,
      ...(sharedItemComponents[type] ?? []),
    ])
  }

  return addItemDrop
}
