import type { WithComponent } from '../core'

export type IActor = WithComponent<
  | 'position'
  | 'movement'
  | 'texture'
  | 'collider'
  | 'inventory'
  | 'battle'
  | 'health'
>
