import { Schema } from './utils/schema'

const ActorSchema = Schema(
  'position',
  'movement',
  'texture',
  'collider',
  'inventory',
)

export type IActor = typeof ActorSchema
