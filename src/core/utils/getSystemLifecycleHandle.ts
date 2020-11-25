import type { ISystem } from '../../@types/ISystem'
import type { ISystemLifecycle } from '../../@types/ISystemLifecycle'

export function getSystemLifecycleHandle(
  system: ISystem,
  lifecycle: ISystemLifecycle,
) {
  switch (lifecycle) {
    case 'setup':
      return system.onSetup
    case 'tick':
      return system.onTick
    case 'cleanup':
      return system.onCleanup
  }
}
