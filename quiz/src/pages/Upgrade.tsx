import { useState } from 'react'
import { useBack } from '@/hooks/useBack'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Loader2, Lock, Tag } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ProBadge } from '@/components/ProBadge'
import { CheckMark } from '@/components/CheckMark'
import { FundArt, ProgressArt, ProjectArt, StrategyArt, StudyPlanArt } from '@/components/ProBenefitArt'
import { trackUpgradeClicked } from '@/lib/analytics'
import { cn } from '@/lib/utils'

// What Pro unlocks — each one a thing the app actually gates on `isPro`
// today, told as what it does for the reader. Keep this list honest: a
// benefit belongs here only once a surface checks for it (natural-voice
// Listen and Cowork are off it until they ship). The copy follows the
// app-copy skill (.claude/skills/app-copy/).
const HEADLINE_BENEFITS = [
  'A study plan for every day until your exam',
  'Study in syllabus order, or the heaviest topics first',
  'See which concepts you know and which are slipping',
  'Rehearse the PCPA project from start to finish',
]

// Every card is the same shape and the same width: a picture of the surface,
// a title, a line or two.
const BENEFITS: { title: string; body: string; Art: () => React.JSX.Element }[] = [
  {
    title: 'Follow a Daily Study Plan',
    body: 'Set your exam date and the syllabus is split into daily lists, sized to the time you have left. Fall behind or start forgetting something, and the plan changes to match.',
    Art: StudyPlanArt,
  },
  {
    title: 'Choose a Study Strategy',
    body: 'Work through the syllabus from the first reading, or start with the topics worth the most marks. You can change your mind later in your plan settings.',
    Art: StrategyArt,
  },
  {
    title: 'Track Learning Progress',
    body: 'Each concept moves up from New to Level 3 as you answer questions on it, and you can see which questions moved it. Leave one too long and it drops back a level, so you find out in time to review it.',
    Art: ProgressArt,
  },
  {
    title: 'Rehearse the PCPA Project',
    body: 'Pick a case, get a data set and build your model in R or Python in the browser. Write the report under the real 1,250-word limit, then see how your model does on data it hasn\'t seen.',
    Art: ProjectArt,
  },
  {
    title: 'Fund New Exams and Questions',
    body: 'Your subscription pays for the hours that go into adding exams, writing questions and checking them against the source material.',
    Art: FundArt,
  },
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
        You're on Pro. Thank you for supporting the site.
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
          Pro tells you what to study each day until your exam, and keeps track of
          what you've learned and what you're starting to forget.
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
        <h2 className="text-center text-xl font-semibold">What you get</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {BENEFITS.map(({ title, body, Art }, i) => (
            // An odd card out at the end is centred on its row, still one
            // column wide, rather than leaving a hole beside it.
            <Card
              key={title}
              className={cn(
                'overflow-hidden',
                BENEFITS.length % 2 === 1 && i === BENEFITS.length - 1 &&
                  'sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.5rem)]',
              )}
            >
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

      </section>

      {!isPro && !subLoading && (
        <Card className="mx-auto max-w-md ring-1 ring-primary/10 shadow-sm">
          <CardContent className="p-6 space-y-4 text-center">
            <div className="space-y-1">
              <p className="text-lg font-semibold">Try it for a month</p>
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
                That worked. You have Pro now.
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
