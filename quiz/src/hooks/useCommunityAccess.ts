import { useAuth } from '@/hooks/useAuth'
import { canEnterCommunity } from '@/lib/community/access'
import { COMMUNITY_ENABLED, COMMUNITY_OPEN_TO_ALL } from '@/lib/featureFlags'

/** Whether this viewer may open the Community tab (lib/community/access.ts). */
export function useCommunityAccess(): boolean {
  const { user } = useAuth()
  return COMMUNITY_ENABLED && canEnterCommunity({ signedIn: !!user, email: user?.email }, COMMUNITY_OPEN_TO_ALL)
}
