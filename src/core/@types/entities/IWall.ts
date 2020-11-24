import { Schema } from './utils/schema'

const WallSchema = Schema('position', 'shape', 'collider')

export type IWall = typeof WallSchema
