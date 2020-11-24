import { Schema } from '../index'

const ActorSchema = Schema('position', 'movement', 'texture', 'collider')

export type IActor = typeof ActorSchema
