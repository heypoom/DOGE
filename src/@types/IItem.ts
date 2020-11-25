import type { IAction } from './core'
import type { ITexture } from './components/ITexture'

import type { IItemType } from '../game/items'

export interface IItemInstance {
  /** Unique id for the item, used to look up the item definition. */
  type: IItemType

  /** How much of this item do we have? */
  quantity?: number
}

export interface IItemBlueprint {
  /** Display name of the item. */
  name?: string

  /** Lore of the item. */
  lore?: string

  /** Description of the item's functionality. */
  description?: string

  // ATK and DEF points for this item.
  attack?: IAttack
  defense?: IDefense

  // Which action to dispatch when this item is used.
  onUse?: IAction

  // Which sprite to use for rendering this item?
  sprite?: ITexture
}

export interface IAttack {
  minDamage: number
  maxDamage: number
}

export interface IDefense {
  armor: number
}
