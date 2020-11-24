import type { IActionType, IRootActionMap } from '../actions/@types'

export interface IAction<T extends IActionType = IActionType> {
  type: T
  data?: IRootActionMap[T]
}
