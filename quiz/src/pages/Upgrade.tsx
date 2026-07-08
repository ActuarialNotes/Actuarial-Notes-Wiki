import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Info, Loader2, Tag } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { trackUpgradeClicked } from '@/lib/analytics'

export default function Upgrade() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { isPremium, loading: subLoading } = useSubscription()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [betaCode, setBetaCode] = useState('')
  const [betaSubmitting, setBetaSubmitting] = useState(false)
  const [betaError, setBetaError] = useState<string | null>(null)
  const [betaSuccess, setBetaSuccess] = useState(false)
  const [showDiscountInfo, setShowDiscountInfo] = useState(false)

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

  return (
    <div className="container max-w-xl mx-auto px-4 py-12 space-y-6">
      <div className="text-center space-y-3">
        <h1 className="text-xl font-semibold">
          Actuarial Notes Premium
        </h1>
        <p className="text-muted-foreground">
          Unlock custom Study Plans.
        </p>
      </div>

      <Card className="ring-1 ring-primary/10 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">$10</span>
            <span className="text-muted-foreground text-sm">/ month</span>
            <span className="ml-2 text-2xl text-muted-foreground line-through">$20</span>
          </CardTitle>
          <CardDescription>Cancel anytime.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <div className="flex items-center gap-2 rounded-md bg-green-50 dark:bg-green-950/20 px-3 py-2 text-xs">
              <span className="flex-1 text-green-700 dark:text-green-300">
                <strong>Launch discount:</strong> Offer valid until June 30, 2026.
              </span>
              <button
                type="button"
                onClick={() => setShowDiscountInfo(v => !v)}
                className="flex items-center justify-center h-5 w-5 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/70 transition-colors shrink-0"
                aria-label="About this discount"
              >
                <Info className="h-3 w-3" />
              </button>
            </div>
            {showDiscountInfo && (
              <div className="mt-1.5 rounded-md bg-green-50 dark:bg-green-950/30 px-3 py-2 text-xs text-green-700 dark:text-green-300">
                If you subscribe before the offer expires, your price is locked in at $10/month forever — even after the launch discount ends.
              </div>
            )}
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
              <span>
                <span className="font-medium">Custom Study Plans</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
              <span>Help fund new content and features.</span>
            </li>
          </ul>

          {error && (
            <div className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          {subLoading ? (
            <Button disabled className="w-full">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Loading…
            </Button>
          ) : isPremium ? (
            <div className="space-y-2">
              <div className="rounded-md bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-400">
                You're already a Premium member. Thanks for your support!
              </div>
              <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
            </div>
          ) : (
            <Button onClick={handleUpgrade} disabled={submitting} className="w-full">
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Redirecting to Stripe…
                </>
              ) : user ? (
                'Upgrade now'
              ) : (
                'Sign in to upgrade'
              )}
            </Button>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Secure checkout via Stripe. You can cancel from your account at any time.
          </p>
        </CardContent>
      </Card>

      {!isPremium && !subLoading && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Tag className="h-4 w-4 text-muted-foreground" />
              Have a beta tester code?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {betaSuccess ? (
              <div className="rounded-md bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-400">
                Code redeemed! You now have Premium access. Welcome aboard.
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
