// @seq: 4

import { action } from '../../actions'
import type { World } from '../../core'
import { getItem, IItemType } from '../items'

import type { IPosition } from '../../@types/components/IPosition'
import { missingItemSprite } from '../../constants/missingItemSprite'

export function createItemDrop(w: World) {
  const sharedItemComponents: Partial<Record<IItemType, string[]>> = {}

  /** Create a "shared data component" that is shared across entities */
  const itemColliderId = w.addComponent('collider', {
    enabled: true,
    size: 15,
    role: 'target',
    onCollision: action('@actor/pickup'),
  })

  function addItemDrop(type: IItemType, position: IPosition) {
    /** Create a shared data component once for an item type, then memoize it. */
    if (!sharedItemComponents[type]) {
      sharedItemComponents[type] = [
        w.addComponent('item', { type, quantity: 1 }),
        w.addComponent('texture', getItem(type)?.sprite ?? missingItemSprite),
      ]
    }

    /** Add an entity that links to these data component ids. */
    return w.addEntityByIds('droppedItem', [
      w.addComponent('position', position),
      itemColliderId,
      ...(sharedItemComponents[type] ?? []),
    ])
  }

  return addItemDrop
}
