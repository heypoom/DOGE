import type { IActionType, IRootActionMap } from '../actions'

export interface IAction<T extends IActionType = IActionType> {
  type: T
  data: IRootActionMap[T] | undefined
}
