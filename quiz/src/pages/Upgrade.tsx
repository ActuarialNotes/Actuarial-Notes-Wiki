import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Loader2, Sparkles } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function Upgrade() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { isPremium, loading: subLoading } = useSubscription()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        console.error('upgrade: invoke error:', invokeError)
        throw new Error(invokeError.message)
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
          Unlock the custom Study Plan and support continued development.
        </p>
      </div>

      <Card className="border-primary/30 ring-1 ring-primary/10 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">$10</span>
            <span className="text-muted-foreground text-sm">/ month</span>
            <span className="ml-2 text-xs text-muted-foreground line-through">$20</span>
          </CardTitle>
          <CardDescription>Cancel anytime.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
              <span>
                <span className="font-medium">Custom Study Plan</span> — a daily concept list paced
                to your exam date and target strength level.
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
    </div>
  )
}
