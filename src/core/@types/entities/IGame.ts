import { Schema } from './utils/schema'

const GameSchema = Schema('keypress', 'timer')

export type IGame = typeof GameSchema
