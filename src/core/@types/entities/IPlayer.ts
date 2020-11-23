import { Schema } from '../index'

const schema = Schema('position', 'movement', 'shape', 'collider')

export type IPlayer = typeof schema
