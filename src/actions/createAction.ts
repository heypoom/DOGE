import type { IAction } from '../@types/core'

import type { IActionType, IRootActionMap } from '../@types/actions'

export const action = <T extends IActionType>(
  type: T,
  data?: IRootActionMap[T],
): IAction<T> => ({ type, data })
