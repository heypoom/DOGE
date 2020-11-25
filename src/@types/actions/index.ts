import type { IWallAction } from './IWallAction'
import type { IActorAction, IPickupAction } from './IActorAction'

export type IRootActionMap = IActorAction & IWallAction & IPickupAction

export type IActionType = keyof IRootActionMap

export * from './IActorAction'
export * from './IWallAction'
