import type { IWallAction } from './IWallAction'
import type { IActorAction } from './IActorAction'

export type IRootActionMap = IActorAction & IWallAction

export type IActionType = keyof IRootActionMap
