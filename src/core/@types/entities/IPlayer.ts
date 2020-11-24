import { Schema } from '../index'
import type { IActor } from './IActor'

const PlayerSchema = Schema()

export type IPlayer = IActor & typeof PlayerSchema
