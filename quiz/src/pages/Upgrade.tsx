import { useState } from 'react'
import { useBack } from '@/hooks/useBack'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, BadgeCheck, Heart, Loader2, Lock, Tag, type LucideIcon } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ProBadge } from '@/components/ProBadge'
import { CheckMark } from '@/components/CheckMark'
import { ProgressArt, StrategyArt, StudyPlanArt } from '@/components/ProBenefitArt'
import { trackUpgradeClicked } from '@/lib/analytics'

// What Pro unlocks — each one a thing the app actually gates on `isPro`
// today, told as what it does for the reader. Keep this list honest: a
// benefit belongs here only once a surface checks for it (natural-voice
// Listen and Cowork are off it until they ship).
const HEADLINE_BENEFITS = [
  'Walk into the exam knowing you\'ve covered it all',
  'A plan for every day, paced to your exam date',
  'Study in the order that works for you',
  'Watch every concept go from new to mastered',
]

const BENEFITS: { title: string; body: string; Art: () => React.JSX.Element }[] = [
  {
    title: 'Open the app, know what\'s next',
    body: 'No more staring at a syllabus wondering where to start. Set your exam date and each day\'s concepts are waiting — sized to your pace, and re-planned as you learn and forget.',
    Art: StudyPlanArt,
  },
  {
    title: 'Learn the way that suits you',
    body: 'Build up from the first chapter, or bank the topics the exam weights most first. Either way, every day moves you closer.',
    Art: StrategyArt,
  },
  {
    title: 'Feel your progress',
    body: 'Watch each concept climb from New to mastered — every level gained, every slip caught before it costs you marks, and the questions behind each one.',
    Art: ProgressArt,
  },
]

const EXTRAS: { text: string; Icon: LucideIcon }[] = [
  { text: 'Pro-only Custom Badge in the Gem Shop', Icon: BadgeCheck },
  { text: 'Fund new exams, questions and features', Icon: Heart },
]

export default function Upgrade() {
  const navigate = useNavigate()
  const back = useBack({ to: '/dashboard', label: 'Dashboard' })
  const { user } = useAuth()
  const { isPro, loading: subLoading } = useSubscription()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [betaCode, setBetaCode] = useState('')
  const [betaSubmitting, setBetaSubmitting] = useState(false)
  const [betaError, setBetaError] = useState<string | null>(null)
  const [betaSuccess, setBetaSuccess] = useState(false)

  async function handleBetaCode() {
    if (!user) {
      navigate('/auth', { state: { from: '/upgrade' } })
      return
    }
    const code = betaCode.trim()
    if (!code) return
    setBetaSubmitting(true)
    setBetaError(null)
    try {
      const { data, error: invokeError } = await supabase.functions.invoke<{ success?: boolean; error?: string }>(
        'redeem-beta-code',
        { body: { code } },
      )
      if (invokeError) {
        let msg = invokeError.message
        const ctx = (invokeError as { context?: Response }).context
        if (ctx) {
          try { const body = await ctx.json(); if (typeof body?.error === 'string') msg = body.error } catch {}
        }
        throw new Error(msg)
      }
      if (data?.error) throw new Error(data.error)
      if (!data?.success) throw new Error('Redemption failed')
      setBetaSuccess(true)
    } catch (err) {
      setBetaError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setBetaSubmitting(false)
    }
  }

  async function handleUpgrade() {
    if (!user) {
      navigate('/auth', { state: { from: '/upgrade' } })
      return
    }
    trackUpgradeClicked()
    setSubmitting(true)
    setError(null)
    try {
      const { data, error: invokeError } = await supabase.functions.invoke<{ url?: string; error?: string }>(
        'stripe-create-checkout',
        { body: {} },
      )
      if (invokeError) {
        let msg = invokeError.message
        const ctx = (invokeError as { context?: Response }).context
        if (ctx) {
          try { const body = await ctx.json(); if (typeof body?.error === 'string') msg = body.error } catch {}
        }
        console.error('upgrade: invoke error:', invokeError)
        throw new Error(msg)
      }
      if (data?.error) throw new Error(data.error)
      if (!data?.url) throw new Error('Missing checkout URL')
      window.location.assign(data.url)
    } catch (err) {
      console.error('upgrade: checkout failed:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  // The one action on the page, drawn twice — beside the price up top, and
  // again once the reader has scrolled through what they'd be paying for.
  const cta = subLoading ? (
    <Button disabled size="lg" className="w-full">
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
      Loading…
    </Button>
  ) : isPro ? (
    <div className="space-y-2">
      <div className="rounded-md bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-400">
        You're already a Pro member. Thanks for your support!
      </div>
      <Button variant="outline" className="w-full" onClick={back.go}>
        Back to {back.label}
      </Button>
    </div>
  ) : (
    <div className="space-y-2">
      <Button onClick={handleUpgrade} disabled={submitting} size="lg" className="w-full gap-2 text-base">
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Redirecting to Stripe…
          </>
        ) : (
          <>
            {user ? 'Get Pro' : 'Sign in to get Pro'}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="h-3 w-3" />
        Secure checkout via Stripe · Cancel anytime
      </p>
    </div>
  )

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10 sm:py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
          Actuarial Notes
          <ProBadge size="md" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-balance">
          Pass exams and have fun doing it.
        </h1>
        <p className="mx-auto max-w-md text-muted-foreground text-balance">
          Pro turns the syllabus into a little progress every day, so you walk into the
          exam room confident you know it.
        </p>
      </div>

      <Card className="mx-auto max-w-md ring-1 ring-primary/10 shadow-sm">
        <CardContent className="p-6 space-y-5">
          <div className="flex items-baseline justify-center gap-1.5">
            <span className="text-5xl font-bold tracking-tight">$10</span>
            <span className="text-muted-foreground">/ month</span>
          </div>
          <ul className="space-y-2 text-sm">
            {HEADLINE_BENEFITS.map(b => (
              <li key={b} className="flex items-start gap-2.5">
                <CheckMark className="h-4 w-4 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          {error && (
            <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}
          {cta}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-center text-xl font-semibold">Everything in Pro</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {BENEFITS.map(({ title, body, Art }, i) => (
            // Three cards in two columns: the last spans both rather than
            // leaving a hole beside it.
            <Card key={title} className={i === BENEFITS.length - 1 ? 'overflow-hidden sm:col-span-2' : 'overflow-hidden'}>
              <CardContent className="p-4 space-y-3">
                <Art />
                <div className="space-y-1">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{body}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ul className="grid gap-2 text-sm sm:grid-cols-2">
          {EXTRAS.map(({ text, Icon }) => (
            <li key={text} className="flex items-center gap-2.5 rounded-lg bg-muted/40 px-3 py-2.5">
              <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </section>

      {!isPro && !subLoading && (
        <Card className="mx-auto max-w-md ring-1 ring-primary/10 shadow-sm">
          <CardContent className="p-6 space-y-4 text-center">
            <div className="space-y-1">
              <p className="text-lg font-semibold">Start studying with confidence today.</p>
              <p className="text-sm text-muted-foreground">$10 / month. Cancel anytime.</p>
            </div>
            {cta}
          </CardContent>
        </Card>
      )}

      {!isPro && !subLoading && (
        <Card className="mx-auto max-w-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Tag className="h-4 w-4 text-muted-foreground" />
              Have a beta tester code?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {betaSuccess ? (
              <div className="rounded-md bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-400">
                Code redeemed! You now have Pro access. Welcome aboard.
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter code"
                    value={betaCode}
                    onChange={e => setBetaCode(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleBetaCode()}
                    disabled={betaSubmitting}
                    className="font-mono"
                  />
                  <Button
                    variant="outline"
                    onClick={handleBetaCode}
                    disabled={betaSubmitting || !betaCode.trim()}
                  >
                    {betaSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Redeem'}
                  </Button>
                </div>
                {betaError && (
                  <p className="text-sm text-destructive">{betaError}</p>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
