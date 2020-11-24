import { Schema } from '../index'

const WallSchema = Schema('position', 'shape', 'collider')

export type IWall = typeof WallSchema
