import { WallActions } from './wall'
import { ActorActions, ActorPickupAction } from './actor'

export const RootActions = {
  ...ActorActions,
  ...WallActions,
  ...ActorPickupAction,
}

export { action } from './utils/createAction'
