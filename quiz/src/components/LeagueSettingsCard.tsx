import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useLeague } from '@/hooks/useLeague'
import { RESETTABLE_EXAMS } from '@/lib/examIds'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Settings card for the weekly XP league opt-in (roadmap P4.1). Leagues are
 * per-exam, so it carries a small exam selector; joining/leaving applies to the
 * selected exam. Mirrors the privacy contract enforced server-side: joining
 * shares only display name, avatar, and weekly XP; leaving deletes the shared
 * copies. The shown name/avatar are the Profile ones — change them there.
 */
export function LeagueSettingsCard() {
  const { user } = useAuth()
  const [selectedExam, setSelectedExam] = useState<string>(RESETTABLE_EXAMS[0]?.id ?? '')
  const league = useLeague(selectedExam || null)
  const [confirmingLeave, setConfirmingLeave] = useState(false)
  const [busy, setBusy] = useState(false)

  // Same identity derivation as the Dashboard header / Leaderboard tab.
  const displayName =
    (user?.user_metadata?.display_name as string | undefined) ??
    user?.email?.split('@')[0] ??
    'You'
  const avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) ?? ''

  const examLabel = RESETTABLE_EXAMS.find(e => e.id === selectedExam)?.label ?? selectedExam

  const handleJoin = async () => {
    setBusy(true)
    await league.join(displayName, avatarUrl)
    setBusy(false)
  }

  const handleLeave = async () => {
    setBusy(true)
    await league.leave()
    setBusy(false)
    setConfirmingLeave(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>
          An optional weekly XP league of up to 30 students, separately for each exam, with
          promotion and relegation between leagues. Joining shares only your display name,
          avatar, and weekly XP with your league — never your email or study details. You can
          also manage this from the Level badge on the Dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {RESETTABLE_EXAMS.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            {RESETTABLE_EXAMS.map(e => (
              <button
                key={e.id}
                type="button"
                onClick={() => { setSelectedExam(e.id); setConfirmingLeave(false) }}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                  e.id === selectedExam
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted/50 text-muted-foreground hover:text-foreground',
                )}
              >
                {e.label}
              </button>
            ))}
          </div>
        )}

        {league.optedIn ? (
          <>
            <p className="text-sm">
              You&apos;re in the <span className="font-semibold">{examLabel}</span>
              {' '}<span className="font-semibold">{league.tier.label}</span> league
              {league.selfRank ? (
                <span className="text-muted-foreground"> · currently #{league.selfRank}</span>
              ) : null}
              , shown as <span className="font-semibold">{displayName}</span>.
            </p>
            <p className="text-xs text-muted-foreground">
              Your league sees a copy of the display name and avatar from your Profile above,
              taken when you joined — change them there, then rejoin to share the update.
            </p>
            {confirmingLeave ? (
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs text-muted-foreground">
                  Leave the {examLabel} league? Your shared name, avatar, and weekly XP are deleted.
                </p>
                <Button variant="destructive" size="sm" disabled={busy} onClick={() => void handleLeave()}>
                  {busy ? 'Leaving…' : 'Leave league'}
                </Button>
                <Button variant="outline" size="sm" disabled={busy} onClick={() => setConfirmingLeave(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setConfirmingLeave(true)}>
                Leave the {examLabel} league
              </Button>
            )}
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              {league.lastResult || league.tier.index > 0
                ? `You're not in the ${examLabel} league right now — rejoin to pick up at ${league.tier.label}.`
                : `You’re not in the ${examLabel} league. Join to start competing this week.`}
            </p>
            <Button size="sm" disabled={busy || league.loading} onClick={() => void handleJoin()}>
              {busy ? 'Joining…' : `Join the ${examLabel} league`}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
