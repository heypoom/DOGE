import type { IActionGroup } from '../../@types/IActionGroup'
import type { IWallAction } from '../@types/IWallAction'

export const WallActions: IActionGroup<IWallAction, 'wall'> = {
  '@wall/speedboost': (a, e, w) => {},
}
