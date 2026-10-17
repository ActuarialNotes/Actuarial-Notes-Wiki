import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * One-click launch from the dashboard (`/?topic=…&autostart=1`): as soon as
 * the plan + question bank are ready, jump straight into a quiz sized to
 * complete today's plan. Falls back to the normal config screen if the user
 * is not Pro or has no plan.
 *
 * While this is pending the quiz builder renders a brief loading state (the
 * returned `isAutostarting`) instead of the config screen — the dashboard's
 * launch animation flows straight into the quiz's concept list with no flash
 * of the config UI in between. `autostartFailed` flips it back to the config
 * screen only once we know autostart can't proceed (not Pro / no plan / no
 * questions).
 */
export function useDashboardAutostart({
  signedIn,
  isQuiz,
  topic,
  loading,
  eligible,
  launch,
}: {
  signedIn: boolean
  /** The format is Quiz — a practice exam is never autostarted. */
  isQuiz: boolean
  topic: string
  /** Mastery, concepts, the study plan or the subscription is still loading. */
  loading: boolean
  /** Studying this exam, Pro, with a plan that has concepts and a bank to draw on. */
  eligible: boolean
  /**
   * Launch the plan's quiz (replacing the address that asked for it); false,
   * having launched nothing, when the plan has no questions to draw.
   */
  launch: () => boolean
}): boolean {
  const [searchParams] = useSearchParams()
  const didAutostartRef = useRef(false)
  const [autostartFailed, setAutostartFailed] = useState(false)
  const requested = searchParams.get('autostart') === '1'

  useEffect(() => {
    if (didAutostartRef.current) return
    if (!requested) return
    if (!signedIn || !isQuiz || !topic) return
    if (loading) return
    // Everything the autostart decision depends on has loaded. If we're not
    // eligible, reveal the config screen instead of holding the spinner forever.
    if (!eligible) {
      setAutostartFailed(true)
      return
    }
    // Marked before launching, since the launch navigates away.
    didAutostartRef.current = true
    if (!launch()) {
      didAutostartRef.current = false
      setAutostartFailed(true)
    }
  },[requested, signedIn, isQuiz, topic, loading, eligible, launch])

  // True while a dashboard-initiated autostart is still resolving (loading data
  // or navigating into the quiz). Suppresses the config screen so the launch is
  // seamless; `autostartFailed` ends it if we can't autostart after all.
  return requested && !autostartFailed && isQuiz && signedIn && !!topic
}
