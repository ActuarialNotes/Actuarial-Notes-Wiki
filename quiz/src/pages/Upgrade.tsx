import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Info, Loader2, Sparkles, Tag } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

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
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
          <Sparkles className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold">Actuarial Notes Premium</h1>
        <p className="text-muted-foreground">
          Unlock custom Study Plans and support continued development.
        </p>
      </div>

      <Card className="border-primary/30 ring-1 ring-primary/10 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">$10</span>
            <span className="text-muted-foreground text-sm">/ month</span>
            <span className="ml-2 text-2xl text-muted-foreground line-through">$20</span>
          </CardTitle>
          <CardDescription>Cancel anytime.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-50 dark:bg-amber-950/20 px-3 py-2 text-xs">
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <span className="text-amber-700 dark:text-amber-300">
              <strong>Launch discount:</strong> 50% off, locked in forever. Offer valid until June 30, 2026.
            </span>
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
            <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
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
              <div className="rounded-md border border-green-500/40 bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-400">
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
        <Card className="border-dashed">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Tag className="h-4 w-4 text-muted-foreground" />
              Have a beta tester code?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {betaSuccess ? (
              <div className="rounded-md border border-green-500/40 bg-green-500/10 px-3 py-2 text-sm text-green-700 dark:text-green-400">
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
