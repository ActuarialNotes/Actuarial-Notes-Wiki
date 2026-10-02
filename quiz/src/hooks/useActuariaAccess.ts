import { useAuth } from '@/hooks/useAuth'
import { canEnterActuaria, type ActuariaViewer } from '@/lib/actuaria/access'
import { ACTUARIA_ENABLED, ACTUARIA_OPEN_TO_ALL } from '@/lib/featureFlags'

export interface ActuariaAccess {
  /** This viewer may enter Actuaria now. */
  allowed: boolean
  viewer: ActuariaViewer
}

/** Whether this viewer may enter Actuaria (lib/actuaria/access.ts). */
export function useActuariaAccess(): ActuariaAccess {
  const { user } = useAuth()
  const viewer = { signedIn: !!user, email: user?.email }
  return {
    allowed: ACTUARIA_ENABLED && canEnterActuaria(viewer, ACTUARIA_OPEN_TO_ALL),
    viewer,
  }
}
