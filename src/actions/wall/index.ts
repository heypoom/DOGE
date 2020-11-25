import type { IWallAction } from '../@types/IWallAction'

import type { IActionGroup } from '../../@types/core/IActionGroup'

export const WallActions: IActionGroup<IWallAction, 'wall'> = {
  '@wall/speedboost': (a, e, w) => {},
}
