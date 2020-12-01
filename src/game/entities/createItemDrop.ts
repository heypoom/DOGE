import { action } from '../../actions'
import type { World } from '../../core'
import { getItem, IItemType } from '../items'

import type { IPosition } from '../../@types/components/IPosition'
import { missingItemSprite } from '../../constants/missingItemSprite'

export function createItemDrop(w: World) {
  const sharedItemComponents: Partial<Record<IItemType, string[]>> = {}

  const itemColliderId = w.addComponent('collider', {
    enabled: true,
    size: 15,
    role: 'target',
    onCollision: action('@actor/pickup'),
  })

  function addItemDrop(type: IItemType, position: IPosition) {
    if (!sharedItemComponents[type]) {
      sharedItemComponents[type] = [
        w.addComponent('item', { type, quantity: 1 }),
        w.addComponent('texture', getItem(type)?.sprite ?? missingItemSprite),
      ]
    }

    return w.addEntityByIds('droppedItem', [
      w.addComponent('position', position),
      itemColliderId,
      ...(sharedItemComponents[type] ?? []),
    ])
  }

  return addItemDrop
}
