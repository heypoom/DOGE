import { Schema } from '../index'

const GameSchema = Schema('keyState', 'timer')

export type IGame = typeof GameSchema
