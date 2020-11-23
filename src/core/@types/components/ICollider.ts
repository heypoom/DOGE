export interface ICollider {
  enabled: boolean
  role: 'source' | 'target'
  isColliding: boolean
  collidingAt: Partial<Record<'left' | 'top' | 'right' | 'bottom', boolean>>
  onCollision: () => void
}
