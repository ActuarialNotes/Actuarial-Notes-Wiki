import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useEffect } from 'react'

type Mode = 'signin' | 'signup'

interface LocationState {
  from?: string
}

export default function Auth() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, loading } = useAuth()
  const [mode, setMode] = useState<Mode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)

  const searchParams = new URLSearchParams(location.search)
  const isPopup = searchParams.get('popup') === '1'
  const popupOrigin = searchParams.get('origin') ?? ''

  const returnTo = (location.state as LocationState)?.from ?? '/dashboard'

  useEffect(() => {
    if (loading) return

    if (isPopup && user && window.opener) {
      if (!popupOrigin) {
        // No trusted origin provided — refuse to broadcast session data.
        window.close()
        return
      }
      supabase.auth.getSession().then(({ data }) => {
        window.opener.postMessage({ type: 'SUPABASE_SESSION', session: data.session }, decodeURIComponent(popupOrigin))
        window.close()
      })
      return
    }

    if (!isPopup && user) {
      navigate(returnTo, { replace: true })
    }
  }, [user, loading, navigate, returnTo, isPopup, popupOrigin])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setSubmitting(true)
    try {
      if (mode === 'signin') {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
        if (authError) throw authError
        // Let the useEffect above handle the transition: in popup mode it posts
        // the session to window.opener and closes; otherwise it navigates to returnTo.
      } else {
        const { error: authError } = await supabase.auth.signUp({ email, password })
        if (authError) throw authError
        setSignupSuccess(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleOAuthSignIn(provider: 'google' | 'apple') {
    setError(null)
    const redirectTo =
      `${window.location.origin}${window.location.pathname}` +
      (isPopup ? `?popup=1${popupOrigin ? `&origin=${popupOrigin}` : ''}` : '')
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo },
    })
    if (authError) setError(authError.message)
  }

  if (signupSuccess) {
    if (isPopup) {
      return (
        <div className="container max-w-md mx-auto px-4 py-12">
          <Card>
            <CardHeader>
              <CardTitle>Check your email</CardTitle>
              <CardDescription>
                We sent a confirmation link to <strong>{email}</strong>. Click it to activate your
                account, then return here and sign in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={() => window.close()}>
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )
    }
    return (
      <div className="container max-w-md mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" onClick={() => setMode('signin')}>
              Back to Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-md mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>{mode === 'signin' ? 'Sign In' : 'Create Account'}</CardTitle>
          <CardDescription>
            {mode === 'signin'
              ? 'Sign in to track your quiz progress'
              : 'Create an account to save results'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-6">
            <Button
              type="button"
              variant="outline"
              className="w-full gap-3"
              onClick={() => handleOAuthSignIn('google')}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"/>
                <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332Z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 6.294C4.672 4.169 6.656 3.58 9 3.58Z"/>
              </svg>
              Continue with Google
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full gap-3"
              onClick={() => handleOAuthSignIn('apple')}
            >
              <svg width="16" height="18" viewBox="0 0 814 1000" aria-hidden="true" fill="currentColor">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-42.3-150.3-109.3c-52.7-78.2-99-201.3-99-320.4 0-199.3 131.2-305.2 261.6-305.2 63.2 0 118.2 43.6 158.1 43.6 38.1 0 98.3-46.3 169.3-46.3 27.4 0 109.7 2.6 166.1 98.4zm-189.5-97.9c-20.8 24.6-54.7 42.6-90.9 42.6-0.3-2.7-0.5-5.4-0.5-8.3 0-49.6 35.7-101.5 63.3-131.7 20.5-23.1 54.4-43.3 90.2-45.8 1.1 3.7 1.5 7.3 1.5 10.6 0 51.9-32.3 102.3-63.6 132.6z"/>
              </svg>
              Continue with Apple
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                minLength={8}
              />
            </div>

            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  minLength={8}
                />
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting
                ? 'Please wait…'
                : mode === 'signin'
                  ? 'Sign In'
                  : 'Create Account'}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            {mode === 'signin' ? (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => { setMode('signup'); setError(null) }}
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => { setMode('signin'); setError(null) }}
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
