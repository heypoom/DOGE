import { Schema } from './utils/schema'

const ActorSchema = Schema('position', 'movement', 'texture', 'collider')

export type IActor = typeof ActorSchema
