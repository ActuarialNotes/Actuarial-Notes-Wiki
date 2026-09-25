import { useState } from 'react'
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
import { CoworkArt, ListenArt, ProgressArt, StrategyArt, StudyPlanArt } from '@/components/ProBenefitArt'
import { trackUpgradeClicked } from '@/lib/analytics'

// What Pro unlocks — each one a thing the app actually gates on `isPro`
// today. Keep this list honest: a benefit belongs here only once a surface
// checks for it.
const HEADLINE_BENEFITS = [
  'A daily study plan paced to your exam date',
  'Choose how your plan orders the syllabus',
  'Full learning history for every concept',
  'Natural-voice Listen for every page',
]

const BENEFITS: { title: string; body: string; Art: () => React.JSX.Element }[] = [
  {
    title: 'Your plan for today, every day',
    body: 'Set your exam date and get the day\'s concepts laid out — sized to your pace, and re-planned as you learn and forget.',
    Art: StudyPlanArt,
  },
  {
    title: 'Study your way',
    body: 'Work through the syllabus in order, or put the key concepts the rest of the exam builds on first.',
    Art: StrategyArt,
  },
  {
    title: 'See how each concept is sticking',
    body: 'A concept\'s full history — every level gained, every slip to Forgotten, and the questions behind each one.',
    Art: ProgressArt,
  },
  {
    title: 'Listen with a natural voice',
    body: 'Have any page read aloud in a natural, human-sounding voice, with each passage highlighted as it\'s spoken.',
    Art: ListenArt,
  },
]

const EXTRAS: { text: string; Icon: LucideIcon }[] = [
  { text: 'Pro-only Custom Badge in the Store', Icon: BadgeCheck },
  { text: 'Fund new exams, questions and features', Icon: Heart },
]

export default function Upgrade() {
  const navigate = useNavigate()
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
      <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
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
          Know exactly what to study today.
        </h1>
        <p className="mx-auto max-w-md text-muted-foreground text-balance">
          Pro turns your syllabus into a daily plan paced to your exam date — and gives you
          the tools to see it through.
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
          {BENEFITS.map(({ title, body, Art }) => (
            <Card key={title} className="overflow-hidden">
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

        <Card className="overflow-hidden ring-1 ring-violet-500/20">
          <CardContent className="p-4 grid gap-4 sm:grid-cols-2 sm:items-center">
            <div className="space-y-1 sm:order-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">Cowork</h3>
                <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                  Coming soon
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                A second workspace for the job itself: follow the regulators and publishers you
                work from, build analyses and reports on their documents, and export them to
                Excel. Included with Pro when it launches.
              </p>
            </div>
            <CoworkArt />
          </CardContent>
        </Card>

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
              <p className="text-lg font-semibold">Start today's plan in a minute.</p>
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
