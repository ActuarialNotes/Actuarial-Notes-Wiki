// What a reader sees when sign-in, sign-up or a password change fails. The
// app never shows Supabase's own wording (rule R5 in the app-copy skill): each
// known error is said as what went wrong and what to do, and anything else
// falls back to a sentence that still says what to do.

/** Supabase Auth's error message, as a sentence for the reader. */
export function authErrorMessage(raw: string, mode: 'signin' | 'signup' | 'password' = 'signin'): string {
  const msg = raw.toLowerCase()
  if (msg.includes('invalid login credentials')) return 'Wrong email or password. Check both and try again.'
  if (msg.includes('email not confirmed')) return 'Your email isn’t confirmed yet. Open the link we sent you, then sign in.'
  if (msg.includes('already registered') || msg.includes('already been registered')) {
    return 'There’s already an account with that email. Sign in instead.'
  }
  if (msg.includes('password should be') || msg.includes('at least')) return 'Your password needs at least 8 characters.'
  if (msg.includes('same as the old') || msg.includes('different from the old')) return 'Choose a password you haven’t used on this account before.'
  if (msg.includes('rate limit') || msg.includes('security purposes') || msg.includes('too many')) {
    return 'Too many tries in a short time. Wait a minute, then try again.'
  }
  if (msg.includes('invalid email') || msg.includes('unable to validate email')) return 'That email address doesn’t look right. Check it and try again.'
  if (msg.includes('failed to fetch') || msg.includes('network')) return 'Couldn’t reach the server. Check your connection and try again.'
  if (mode === 'signup') return 'Your account couldn’t be created just now. Try again in a minute.'
  if (mode === 'password') return 'Your password couldn’t be changed just now. Try again in a minute.'
  return 'You couldn’t be signed in just now. Try again in a minute.'
}
