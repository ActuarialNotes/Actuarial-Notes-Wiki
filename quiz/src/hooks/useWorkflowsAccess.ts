import { useAuth } from '@/hooks/useAuth'
import { canUseWorkflows } from '@/lib/workflowsAccess'
import { COWORK_ENABLED, COWORK_OPEN_TO_ALL, TOOLS_ENABLED } from '@/lib/featureFlags'

/**
 * Whether this viewer may use Workflows and the Data Sources' publishers and
 * documents (lib/workflowsAccess.ts).
 */
export function useWorkflowsAccess(): boolean {
  const { user } = useAuth()
  return COWORK_ENABLED && TOOLS_ENABLED && canUseWorkflows({ signedIn: !!user, email: user?.email }, COWORK_OPEN_TO_ALL)
}
