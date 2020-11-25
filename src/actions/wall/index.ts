import type { IActionGroup } from '../../@types/core'
import type { IWallAction } from '../../@types/actions'

export const WallActions: IActionGroup<IWallAction, 'wall'> = {
  '@wall/speedboost': (a, e, w) => {},
}
