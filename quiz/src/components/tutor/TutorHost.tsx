import { lazy, Suspense } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { TUTOR_ENABLED, TUTOR_OPEN_TO_ALL } from '@/lib/featureFlags'
import { TUTOR_STAGE, canUseTutor, isTutorApproved, tutorPreviewRequested } from '@/lib/tutor/access'

// The Tutor's gate, and the only part of it in the entry bundle
// (docs/tutor.md §10). To an account the rollout stage leaves out the Tutor
// doesn't exist: nothing is drawn and its chunk is never fetched.

const TutorApp = lazy(() => import('@/components/tutor/TutorApp'))

function Tutor() {
  return (
    <Suspense fallback={null}>
      <TutorApp />
    </Suspense>
  )
}

/** In Beta the gate is Pro as well as approval — the only stage that needs the subscription read. */
function BetaGate({ email }: { email: string | null | undefined }) {
  const { isPro } = useSubscription()
  return canUseTutor({ signedIn: true, email, isPro }, 'beta') ? <Tutor /> : null
}

export function TutorHost() {
  const { user } = useAuth()
  if (!TUTOR_ENABLED) return null
  // The e2e build's override, for a page that asks (see TUTOR_OPEN_TO_ALL).
  if (TUTOR_OPEN_TO_ALL && tutorPreviewRequested(typeof window === 'undefined' ? null : window.localStorage)) return <Tutor />
  if (!user) return null
  if (TUTOR_STAGE === 'beta' && !isTutorApproved(user.email)) return <BetaGate email={user.email} />
  return canUseTutor({ signedIn: true, email: user.email }) ? <Tutor /> : null
}
