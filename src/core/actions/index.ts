import { WallActions } from './wall'
import { ActorActions } from './actor'

export const RootActions = { ...ActorActions, ...WallActions }
