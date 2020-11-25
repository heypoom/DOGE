import type { IActionType, IRootActionMap } from './@types'

import type { IAction } from '../@types/core/IAction'

export const action = <T extends IActionType>(
  type: T,
  data?: IRootActionMap[T],
): IAction<T> => ({ type, data })
