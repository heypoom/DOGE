import { Schema } from '../index'

const schema = Schema('position', 'movement', 'texture', 'collider')

export type IPlayer = typeof schema
