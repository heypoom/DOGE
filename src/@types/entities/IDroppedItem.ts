import { Schema } from './utils/schema'

const DroppedItemSchema = Schema('position', 'texture', 'collider', 'item')

export type IDroppedItem = typeof DroppedItemSchema
