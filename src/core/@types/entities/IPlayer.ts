import { Schema } from './utils/schema'

import type { IActor } from './IActor'

const PlayerSchema = Schema()

export type IPlayer = IActor & typeof PlayerSchema
