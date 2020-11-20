export interface ICollider {
  enabled: boolean
  role: 'source' | 'target'
  onCollision: () => void
}
