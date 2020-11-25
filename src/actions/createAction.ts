import type { IAction } from '../@types/IAction'
import type { IActionType, IRootActionMap } from './@types'

export const action = <T extends IActionType>(
  type: T,
  data?: IRootActionMap[T],
): IAction<T> => ({ type, data })
