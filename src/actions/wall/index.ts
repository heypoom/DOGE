import type { IActionGroup } from '../../@types/core'
import type { IWallAction } from '../../@types/actions'

export const WallActions: IActionGroup<IWallAction, 'wall'> = {
  '@wall/interact': (a, e, w) => {
    const { shape } = e.data

    shape.color = 0x00fa
  },
}
