import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useLeague } from '@/hooks/useLeague'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

/**
 * Settings card for the weekly XP league opt-in (roadmap P4.1). Mirrors the
 * privacy contract enforced server-side: joining shares only display name,
 * avatar, and weekly XP with the league; leaving deletes the shared copies.
 * The shown name/avatar are the Profile ones — change them there.
 */
export function LeagueSettingsCard() {
  const { user } = useAuth()
  const league = useLeague()
  const [confirmingLeave, setConfirmingLeave] = useState(false)
  const [busy, setBusy] = useState(false)

  // Same identity derivation as the Dashboard header / LeagueCard join view.
  const displayName =
    (user?.user_metadata?.display_name as string | undefined) ??
    user?.email?.split('@')[0] ??
    'You'
  const avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) ?? ''

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
          An optional weekly XP league of up to 30 students, with promotion and relegation
          between leagues. Joining shares only your display name, avatar, and weekly XP with
          your league — never your email or study details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {league.optedIn ? (
          <>
            <p className="text-sm">
              You&apos;re in the <span className="font-semibold">{league.tier.label}</span> league
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
                  Leave the league? Your shared name, avatar, and weekly XP are deleted.
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
                Leave the league
              </Button>
            )}
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">
              {league.lastResult || league.tier.index > 0
                ? `You're not in a league right now — rejoin to pick up at ${league.tier.label}.`
                : 'You’re not in a league. Join from here or from the Dashboard League card.'}
            </p>
            <Button size="sm" disabled={busy || league.loading} onClick={() => void handleJoin()}>
              {busy ? 'Joining…' : 'Join the weekly league'}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
