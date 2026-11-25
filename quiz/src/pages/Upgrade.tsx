import { useState } from 'react'
import { backLabel, useBack } from '@/hooks/useBack'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { requestProCelebration } from '@/lib/proCelebration'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { GROUND, OutlineCard, OUTLINE_TILE } from '@/components/ui/OutlineCard'
import { CheckMark } from '@/components/CheckMark'
import { AnalyticsArt, PodcastArt, ProjectArt, StrategyArt, StudyPlanArt } from '@/components/ProBenefitArt'
import { trackUpgradeClicked } from '@/lib/analytics'
import { RESTORE_SCROLL } from '@/lib/routeScrollMemory'
import { cn } from '@/lib/utils'

// The screen is drawn in the redesign's system (docs/style-guide.md §13): the
// one ground, outlined cards, one text colour, and one filled button, Get Pro,
// fixed to the foot. It is a sheet over You, so it opens on a back arrow and
// has no place bar (lib/places.ts).

// What Pro unlocks — each one a thing the app actually gates on `isPro`
// today, told as what it does for the reader. Keep this list honest: a
// benefit belongs here only once a surface checks for it (natural-voice
// Listen and Cowork are off it until they ship), and a reader's own mastery
// levels are free, so they are not on it (docs/pro-proposal.md §3). The daily
// session is free too (docs/redesign-spec.md, R1), and so is starting it: what
// Pro sells of it is the plan that chooses what it learns and reviews, paced to
// the exam date. The copy follows the app-copy skill (.claude/skills/app-copy/).
const HEADLINE_BENEFITS = [
  'A study plan paced to your exam date',
  'Study in syllabus order, or the heaviest topics first',
  'Each day’s list in your inbox, at the time you choose',
  'Listen to each day’s plan as a short episode',
  'Analytics on your accuracy, your pace and the marks you’re losing',
  'Rehearse the PCPA project from start to finish',
]

// Every card is the same shape: a picture of the surface, a title, a line or two.
const BENEFITS: { title: string; body: string; Art: () => React.JSX.Element }[] = [
  {
    title: 'Pace Your Plan to Your Exam Date',
    body: 'Set your exam date and the plan works back from it, choosing what each day’s session learns and reviews. Fall behind or start forgetting something, and the plan changes to match. Turn on the daily email and each day’s list is in your inbox before you open the app.',
    Art: StudyPlanArt,
  },
  {
    title: 'Choose a Study Strategy',
    body: 'Work through the syllabus from the first reading, or start with the topics worth the most marks. You can change your mind later in your plan settings.',
    Art: StrategyArt,
  },
  {
    title: 'Listen to Today’s Plan',
    body: 'Each day’s concepts read aloud as one short episode: the definition, the key formulas and the trap to watch for. Play it from Today, or from the Listen button in the daily email, and keep going with your phone locked.',
    Art: PodcastArt,
  },
  {
    title: 'Read Your Analytics',
    body: 'See how often you get questions right over the last week, month or three months, and how your time per question compares with the exam’s. The syllabus sections costing you the most marks are listed with what each one cost.',
    Art: AnalyticsArt,
  },
  {
    title: 'Rehearse the PCPA Project',
    body: 'Pick a case, get a data set and build your model in R or Python in the browser. Write the report under the real 1,250-word limit, then see how your model does on data it hasn\'t seen.',
    Art: ProjectArt,
  },
]

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground'

// What a reader sees when checkout or a code fails: never the server's own
// words (R5 in the app-copy skill), which can be a config error or "Unauthorized".
const CHECKOUT_FAILED = 'Checkout didn’t open. Try again in a minute, or contact us from Settings if it keeps happening.'

/** The redeem-beta-code function's errors, said the way a reader needs them. */
function betaCodeMessage(raw: string): string {
  const msg = raw.toLowerCase()
  if (msg.includes('invalid or already used')) return 'That code isn’t valid or has already been used. Check it and try again.'
  if (msg.includes('already redeemed')) return 'You’ve already redeemed a code on this account.'
  if (msg.includes('already have a pro')) return 'You already have Pro, so there’s nothing to redeem.'
  if (msg.includes('unauthorized')) return 'Your sign-in has expired. Sign in again, then redeem the code.'
  return 'That code couldn’t be redeemed just now. Try again in a minute.'
}

export default function Upgrade() {
  const navigate = useNavigate()
  const back = useBack({ to: '/you', label: 'You' })
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
      requestProCelebration({ confirmed: true })
    } catch (err) {
      setBetaError(betaCodeMessage(err instanceof Error ? err.message : ''))
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
      setError(CHECKOUT_FAILED)
      setSubmitting(false)
    }
  }

  const waiting = subLoading || submitting

  return (
    <div className={cn(GROUND, 'min-h-dvh')} data-testid="upgrade">
      <div className="mx-auto flex min-h-dvh w-full max-w-[460px] flex-col lg:max-w-[760px] lg:pt-6">
        <div className="flex items-center gap-2 pl-2 pr-5 pt-3">
          <Link
            to={back.to}
            state={RESTORE_SCROLL}
            onClick={back.onLinkClick}
            aria-label={backLabel(back)}
            title={backLabel(back)}
            data-testid="upgrade-back"
            className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-full', FOCUS)}
          >
            <ChevronLeft className="h-[22px] w-[22px]" strokeWidth={2.5} aria-hidden="true" />
          </Link>
          <span className="min-w-0 flex-1 truncate text-[17px] font-semibold">Actuarial Notes</span>
          <span className="shrink-0 rounded-full border-[1.5px] border-foreground px-2.5 py-0.5 text-[13px] font-bold">Pro</span>
        </div>

        <div className="flex flex-1 flex-col gap-9 px-5 pb-8 pt-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-[34px] font-bold leading-[1.1] tracking-[-0.02em] text-balance">
              Know you’re ready before you sit.
            </h1>
            <p className="text-[17px] leading-normal">
              A daily session sized to the time you have is free. Pro paces it to your
              exam date, and changes the plan when you fall behind or start to forget.
            </p>
          </div>

          <OutlineCard className="flex flex-col gap-5">
            <div className="flex items-baseline gap-2.5">
              <span className="text-[64px] font-bold leading-none tracking-[-0.03em]">$10</span>
              <span className="text-[20px] font-medium">a month</span>
            </div>
            <ul className="flex flex-col gap-3 text-[15px] leading-snug">
              {HEADLINE_BENEFITS.map(b => (
                <li key={b} className="flex items-start gap-3">
                  <CheckMark className="mt-px h-[18px] w-[18px] text-foreground" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {isPro && !subLoading && (
              <p className="border-t border-border pt-4 text-[17px] font-semibold" data-testid="upgrade-on-pro">
                You’re on Pro. Thank you.
              </p>
            )}
          </OutlineCard>

          <section className="flex flex-col gap-3" aria-labelledby="upgrade-what">
            <h2 id="upgrade-what" className="text-[22px] font-bold">What you get</h2>
            <div className="grid grid-cols-[minmax(0,1fr)] gap-3 lg:grid-cols-2">
              {BENEFITS.map(({ title, body, Art }) => (
                <OutlineCard key={title} className="flex min-w-0 flex-col gap-4 p-4">
                  <Art />
                  <div className="flex flex-col gap-1.5 px-1 pb-1">
                    <h3 className="text-[17px] font-bold">{title}</h3>
                    <p className="text-[15px] leading-normal">{body}</p>
                  </div>
                </OutlineCard>
              ))}
            </div>
          </section>

          {!isPro && !subLoading && (
            <section className="flex flex-col gap-2" aria-labelledby="upgrade-code">
              <h2 id="upgrade-code" className="text-[15px] font-bold">Have a code?</h2>
              {betaSuccess ? (
                <p className="text-[17px] font-semibold">That worked. You have Pro now.</p>
              ) : (
                <>
                  <div className="flex gap-2">
                    <input
                      aria-labelledby="upgrade-code"
                      placeholder="Enter code"
                      value={betaCode}
                      onChange={e => setBetaCode(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleBetaCode()}
                      disabled={betaSubmitting}
                      autoCapitalize="off"
                      autoCorrect="off"
                      spellCheck={false}
                      className={cn(
                        OUTLINE_TILE,
                        'h-12 min-w-0 flex-1 rounded-full px-5 font-mono text-[15px] placeholder:text-foreground/60',
                        'focus-visible:border-foreground focus-visible:outline-none disabled:opacity-50',
                      )}
                    />
                    <Button
                      variant="edge"
                      size="lg"
                      onClick={handleBetaCode}
                      disabled={betaSubmitting || !betaCode.trim()}
                    >
                      {betaSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-label="Redeeming" /> : 'Redeem'}
                    </Button>
                  </div>
                  {betaError && <p role="alert" className="text-[15px] text-answer-incorrect">{betaError}</p>}
                </>
              )}
            </section>
          )}
        </div>

        {!isPro && (
          <div className="sticky bottom-0 z-30 flex flex-col gap-2 border-t border-border bg-ground px-5 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-3">
            {error && <p role="alert" className="text-[15px] text-answer-incorrect">{error}</p>}
            <Button onClick={handleUpgrade} disabled={waiting} size="main" className="w-full" data-testid="upgrade-get-pro">
              {submitting ? (
                <>
                  <Loader2 className="h-[18px] w-[18px] animate-spin" aria-hidden="true" />
                  Opening checkout…
                </>
              ) : user ? 'Get Pro' : 'Sign in to get Pro'}
            </Button>
            <p className="text-center text-[13px]">Secure checkout with Stripe. Cancel anytime.</p>
          </div>
        )}
      </div>
    </div>
  )
}
