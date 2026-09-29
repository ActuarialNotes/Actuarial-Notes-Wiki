import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { canEnterActuaria, type ActuariaViewer } from '@/lib/actuaria/access'
import { ACTUARIA_ENABLED, ACTUARIA_OPEN_TO_ALL } from '@/lib/featureFlags'

export interface ActuariaAccess {
  /** This viewer may enter Actuaria now. */
  allowed: boolean
  /** A signed-in viewer's Pro status is still being read. */
  loading: boolean
  viewer: ActuariaViewer
}

/** Whether this viewer may enter Actuaria (lib/actuaria/access.ts). */
export function useActuariaAccess(): ActuariaAccess {
  const { user } = useAuth()
  const { isPro, loading } = useSubscription()
  const viewer = { signedIn: !!user, isPro }
  return {
    allowed: ACTUARIA_ENABLED && canEnterActuaria(viewer, ACTUARIA_OPEN_TO_ALL),
    loading: !!user && loading,
    viewer,
  }
}
