import { Schema } from './utils/schema'

const GameSchema = Schema('keyState', 'timer')

export type IGame = typeof GameSchema
