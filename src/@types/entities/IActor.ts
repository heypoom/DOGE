import { Schema } from './utils/schema'

const ActorSchema = Schema(
  'position',
  'movement',
  'texture',
  'collider',
  'inventory',
  'battle',
  'health',
)

export type IActor = typeof ActorSchema
