import { Schema } from './utils/schema'

const DroppedItemSchema = Schema('position', 'collider', 'item', 'texture')

export type IDroppedItem = typeof DroppedItemSchema
