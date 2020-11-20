import { Schema } from '../../utils/schema'

const schema = Schema('position', 'movement', 'shape')
export type IPlayer = typeof schema
