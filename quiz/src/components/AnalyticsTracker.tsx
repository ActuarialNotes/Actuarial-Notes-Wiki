import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { useTheme } from '@/hooks/useTheme'
import { useConceptPopup } from '@/hooks/useConceptPopup'
import { usePdfReader } from '@/hooks/usePdfReader'
import { identifyUser, setUserProperties, trackContentView } from '@/lib/analytics'
import { describeContent } from '@/lib/analyticsPolicy'

/**
 * The analytics that follow app state rather than a page: who is signed in
 * (GA4's `user_id` and the user properties every report can be split by), and
 * what is read in the two places that never change the URL — the concept
 * popup's open page and the PDF reader — as `content_view` events. Mounted
 * once, inside the auth and exam-progress providers. Renders nothing; every
 * call is a no-op on a visit that isn't measured (lib/analytics.ts).
 */
export default function AnalyticsTracker() {
  const { user } = useAuth()
  const { isPro, loading } = useSubscription()
  const { selectedTrack } = useExamProgress()
  const { theme } = useTheme()
  const userId = user?.id ?? null
  const email = user?.email ?? null

  useEffect(() => {
    identifyUser(userId ? { id: userId, email } : null)
  }, [userId, email])

  useEffect(() => {
    // Hold the property back while a signed-in reader's plan is still loading,
    // rather than call a Pro subscriber `free` for a moment.
    if (userId && loading) return
    setUserProperties({ account_type: !userId ? 'guest' : isPro ? 'pro' : 'free' })
  }, [userId, isPro, loading])

  useEffect(() => {
    setUserProperties({ credential_track: selectedTrack })
  }, [selectedTrack])

  useEffect(() => {
    setUserProperties({ theme })
  }, [theme])

  // The page open on screen in the concept popup — one view per page reached,
  // by the walk, a followed link or a stacked document. A page that is open
  // again after the popup closed counts again.
  useEffect(() => {
    let last: string | null = null
    const report = (state: ReturnType<typeof useConceptPopup.getState>) => {
      const page = state.open ? state.pages[state.pageIndex] : undefined
      const key = page ? `${page.kind}\u0000${page.name}\u0000${'url' in page ? page.url : ''}` : null
      if (key === last) return
      last = key
      if (page) trackContentView({ ...describeContent(page), surface: 'popup' })
    }
    report(useConceptPopup.getState())
    return useConceptPopup.subscribe(report)
  }, [])

  // A document opened in the app's PDF reader (examiner's reports, syllabi,
  // a resource's Read PDF) — read in the app, so no outbound click records it.
  useEffect(() => {
    let last: string | null = null
    const report = (state: ReturnType<typeof usePdfReader.getState>) => {
      const doc = state.doc
      const key = doc ? doc.url : null
      if (key === last) return
      last = key
      if (doc) trackContentView({ ...describeContent({ kind: 'pdf', name: doc.title, subtitle: doc.subtitle }), surface: 'reader' })
    }
    report(usePdfReader.getState())
    return usePdfReader.subscribe(report)
  }, [])

  return null
}
