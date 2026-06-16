import { lazy, Suspense, Component, useEffect, type ReactNode, type ErrorInfo } from 'react'
import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { usePageTracking } from '@/hooks/usePageTracking'
import { Loader2 } from 'lucide-react'
import type { Session } from '@supabase/supabase-js'
import Landing from '@/pages/Landing'
import Auth from '@/pages/Auth'
import AuthCallback from '@/pages/AuthCallback'
import Quiz from '@/pages/Quiz'
import Review from '@/pages/Review'
import Dashboard from '@/pages/Dashboard'
import Flashcards from '@/pages/Flashcards'
import Search from '@/pages/Search'
import Settings from '@/pages/Settings'
import Upgrade from '@/pages/Upgrade'
import Store from '@/pages/Store'
import Sidebar from '@/components/Sidebar'
import BottomNav from '@/components/BottomNav'
import OnboardingTour from '@/components/OnboardingTour'
import { AuthProvider } from '@/contexts/AuthContext'
import { ExamProgressProvider } from '@/contexts/ExamProgressContext'
import { useAuth } from '@/hooks/useAuth'

const Research    = lazy(() => import('@/pages/Research'))

const WikiLayout  = lazy(() => import('@/components/wiki/WikiLayout'))
const WikiHome    = lazy(() => import('@/pages/wiki/WikiHome'))
const WikiExam    = lazy(() => import('@/pages/wiki/WikiExam'))
const WikiConcept = lazy(() => import('@/pages/wiki/WikiConcept'))
const WikiResource = lazy(() => import('@/pages/wiki/WikiResource'))

function WikiFallback() {
  return (
    <div className="flex items-center gap-2 p-8 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" /> Loading…
    </div>
  )
}

interface ErrorBoundaryState { error: Error | null }

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Error boundary caught:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="container max-w-2xl mx-auto px-4 py-16 space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Something went wrong</h1>
          <p className="text-sm text-muted-foreground">
            The dashboard crashed with the following error. Please report this to the team.
          </p>
          <pre className="text-xs bg-muted rounded p-4 overflow-auto whitespace-pre-wrap break-all">
            {this.state.error.message}
            {'\n\n'}
            {this.state.error.stack}
          </pre>
          <button
            type="button"
            onClick={() => this.setState({ error: null })}
            className="text-sm text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function NotFound() {
  return (
    <div className="container max-w-md mx-auto px-4 py-16 text-center space-y-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      <Link to="/" className="text-primary hover:underline text-sm">
        ← Back to Home
      </Link>
    </div>
  )
}

function PageTracker() {
  usePageTracking()
  return null
}

function GlobalKeyHandler() {
  const navigate = useNavigate()
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        const target = e.target as HTMLElement | null
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return
        e.preventDefault()
        navigate('/search')
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [navigate])
  return null
}

function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/auth" replace />
  return <>{children}</>
}

export default function App({ initialSession }: { initialSession: Session | null }) {
  return (
    <BrowserRouter>
      <PageTracker />
      <GlobalKeyHandler />
      <AuthProvider initialSession={initialSession}>
        <ExamProgressProvider>
          <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar />
            <main className="flex-1 min-w-0 md:pt-14 lg:pt-0 pb-16 md:pb-0">
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/review" element={<Review />} />
                <Route path="/dashboard" element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
                <Route path="/search" element={<Search />} />
                <Route path="/flashcards" element={<ErrorBoundary><Flashcards /></ErrorBoundary>} />
                <Route path="/browse" element={<Navigate to="/search" replace />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/upgrade" element={<Upgrade />} />
                <Route path="/store" element={<ErrorBoundary><Store /></ErrorBoundary>} />
                <Route path="/research" element={
                  <RequireAuth>
                    <ErrorBoundary>
                      <Suspense fallback={<WikiFallback />}>
                        <Research />
                      </Suspense>
                    </ErrorBoundary>
                  </RequireAuth>
                } />
                <Route path="/wiki" element={
                  <Suspense fallback={<WikiFallback />}>
                    <WikiLayout><WikiHome /></WikiLayout>
                  </Suspense>
                } />
                <Route path="/wiki/exam/:slug" element={
                  <Suspense fallback={<WikiFallback />}>
                    <WikiLayout><WikiExam /></WikiLayout>
                  </Suspense>
                } />
                <Route path="/wiki/concept/:slug" element={
                  <Suspense fallback={<WikiFallback />}>
                    <WikiLayout><WikiConcept /></WikiLayout>
                  </Suspense>
                } />
                <Route path="/wiki/resource/:slug" element={
                  <Suspense fallback={<WikiFallback />}>
                    <WikiLayout><WikiResource /></WikiLayout>
                  </Suspense>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <BottomNav />
            <OnboardingTour />
          </div>
        </ExamProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
