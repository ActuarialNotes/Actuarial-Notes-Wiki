import { createContext, useContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'

// The signed-in account, as the app reads it. Provided by `AuthProvider`
// (contexts/AuthContext.tsx); read through `useAuth` (hooks/useAuth.ts).

export interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider')
  return ctx
}
