import { Suspense, Component, useEffect, type ReactNode, type ErrorInfo } from 'react'
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
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
import OnboardingTour from '@/components/OnboardingTour'
import SoundEffects from '@/components/SoundEffects'
import MathFocus from '@/components/MathFocus'
import PaperRouter from '@/components/PaperRouter'
import ImageFocus from '@/components/ImageFocus'
import PdfReaderHost from '@/components/PdfReaderHost'
import FlashcardSync from '@/components/FlashcardSync'
import Toast from '@/components/Toast'
import { AuthProvider } from '@/contexts/AuthContext'
import { ExamProgressProvider } from '@/contexts/ExamProgressContext'
import { useAuth } from '@/hooks/useAuth'
import { useSubscription } from '@/hooks/useSubscription'
import { canEnterMode, modeDestination, type AppMode } from '@/lib/appMode'
import { COWORK_ENABLED, RESEARCH_TAB_ENABLED, TOUR_ENABLED } from '@/lib/featureFlags'
import { pageHostsNavButton } from '@/lib/mobileNavHost'
import { captureError } from '@/lib/errorMonitoring'
import { lazyRoute } from '@/lib/lazyRoute'

// Each lazy page is a `lazyRoute`, which hands back its preloader beside the
// component. `React.lazy` alone suspends on a page's first render even when
// its chunk is already here, and a page change drawn as a view transition
// would capture that frame's spinner (see lib/lazyRoute.ts).
const { Component: Research, preload: loadResearch } = lazyRoute(() => import('@/pages/Research'))
// Cowork is the app's second product (see `lib/appMode.ts`). Lazy, because a
// reader in Study mode should never pay for its catalogue or its xlsx writer.
const { Component: Cowork, preload: loadCowork } = lazyRoute(() => import('@/pages/Cowork'))
// The PCPA project simulator (docs/pcpa-project.md). Lazy: its editor, its
// spreadsheet and its data generator are for the candidates who open it.
const { Component: Project, preload: loadProject } = lazyRoute(() => import('@/pages/Project'))

const { Component: WikiLayout, preload: loadWikiLayout } = lazyRoute(() => import('@/components/wiki/WikiLayout'))
const { Component: WikiHome, preload: loadWikiHome } = lazyRoute(() => import('@/pages/wiki/WikiHome'))
const { Component: WikiExam, preload: loadWikiExam } = lazyRoute(() => import('@/pages/wiki/WikiExam'))
const { Component: WikiConcept, preload: loadWikiConcept } = lazyRoute(() => import('@/pages/wiki/WikiConcept'))
const { Component: WikiResource, preload: loadWikiResource } = lazyRoute(() => import('@/pages/wiki/WikiResource'))

/**
 * Warm the chunks a path needs before navigating to it, or null when it needs
 * none. `PaperRouter` waits on this: a view transition snapshots the page as
 * soon as the route has rendered, so flushing straight into a lazy route would
 * slide its Suspense spinner in instead of the page. Returning null is the
 * common case — every eagerly imported page.
 */
function preloadRoute(path: string): Promise<unknown> | null {
  const route = path.split('?')[0].split('#')[0]
  if (route === '/research' || route.startsWith('/research/')) return loadResearch()
  if (route === '/cowork' || route.startsWith('/cowork/')) return loadCowork()
  if (route.startsWith('/project/')) return loadProject()
  if (route === '/wiki') return Promise.all([loadWikiLayout(), loadWikiHome()])
  if (route.startsWith('/wiki/exam/')) return Promise.all([loadWikiLayout(), loadWikiExam()])
  if (route.startsWith('/wiki/concept/')) return Promise.all([loadWikiLayout(), loadWikiConcept()])
  if (route.startsWith('/wiki/resource/')) return Promise.all([loadWikiLayout(), loadWikiResource()])
  return null
}

/**
 * Study Guides is one tap from every page, and its chunk carries the whole
 * wiki bundle — the slowest route to open cold. Once the app is idle, fetch
 * it, so the first switch to it moves at once instead of holding the old page
 * on screen while it downloads. Skipped for a reader who has asked the browser
 * to save data.
 */
function WarmStudyGuides() {
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (connection?.saveData) return
    const warm = () => { preloadRoute('/wiki')?.catch(() => { /* fetched again on the click */ }) }
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(warm, { timeout: 5000 })
      return () => window.cancelIdleCallback(id)
    }
    const timer = window.setTimeout(warm, 3000)
    return () => window.clearTimeout(timer)
  }, [])
  return null
}

function WikiFallback() {
  return (
    <div className="flex items-center gap-2 p-8 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" /> Loading…
    </div>
  )
}

interface ErrorBoundaryState { error: Error | null }

interface ErrorBoundaryProps {
  children: ReactNode
  // When provided, this is rendered instead of the full-page crash screen. Used
  // for app-level portals that live outside a route
  // boundary — a crash there would otherwise unmount the whole tree and leave a
  // blank screen. `null` degrades gracefully by simply removing the failed UI.
  fallback?: ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    captureError(error, { source: 'error-boundary', fatal: true, componentStack: info.componentStack ?? undefined })
  }

  render() {
    if (this.state.error) {
      if (this.props.fallback !== undefined) return this.props.fallback
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

// Below lg the app header is fixed, so the content reserves its height — but
// only on the routes that get one. A route whose own top bar carries the nav
// button has no header above it and starts at the top of the viewport; the
// decision is `lib/mobileNavHost.ts`, read here and in `Sidebar.tsx` so the two
// can't disagree about whether that row exists.
function Main({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  return (
    <main className={`flex-1 min-w-0 lg:pt-0 ${pageHostsNavButton(pathname) ? '' : 'pt-14'}`}>
      {children}
    </main>
  )
}

function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/auth" replace />
  return <>{children}</>
}


/**
 * A route that belongs to a gated mode. The rule is the mode's own
 * (`canEnterMode` in `lib/appMode.ts`), and a viewer it keeps out goes where
 * `modeDestination` sends them — the same place the mode pill would — so the
 * pill and the URL can never disagree about who gets in or where a locked
 * mode leads. For a Preview mode that means an account that isn't approved
 * lands back on the dashboard, as if the route didn't exist.
 *
 * `loading` matters: subscription state resolves asynchronously, and bouncing
 * an entitled viewer away for the frame before their row arrives is a bug
 * they would see every time they open the app.
 */
function RequireMode({ mode, children }: { mode: AppMode; children: ReactNode }) {
  const { user } = useAuth()
  const { isPro, loading } = useSubscription()
  const viewer = { signedIn: !!user, isPro, email: user?.email }
  if (canEnterMode(mode, viewer)) return <>{children}</>
  if (user && loading) return <WikiFallback />
  return <Navigate to={modeDestination(mode, viewer)} replace />
}

function CoworkRoute() {
  if (!COWORK_ENABLED) return <Navigate to="/dashboard" replace />
  return (
    <RequireMode mode="cowork">
      <ErrorBoundary>
        <Suspense fallback={<WikiFallback />}>
          <Cowork />
        </Suspense>
      </ErrorBoundary>
    </RequireMode>
  )
}

function ProjectRoute() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<WikiFallback />}>
        <Project />
      </Suspense>
    </ErrorBoundary>
  )
}

export default function App({ initialSession }: { initialSession: Session | null }) {
  return (
    // Every change of page slides like paper on a desk rather than cutting —
    // see components/PaperRouter.tsx and lib/viewTransition.ts.
    <PaperRouter preload={preloadRoute}>
      <PageTracker />
      <WarmStudyGuides />
      <GlobalKeyHandler />
      <SoundEffects />
      <AuthProvider initialSession={initialSession}>
        <FlashcardSync />
        <ExamProgressProvider>
          <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar />
            <Main>
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
                  RESEARCH_TAB_ENABLED ? (
                    <RequireAuth>
                      <ErrorBoundary>
                        <Suspense fallback={<WikiFallback />}>
                          <Research />
                        </Suspense>
                      </ErrorBoundary>
                    </RequireAuth>
                  ) : (
                    <Navigate to="/wiki" replace />
                  )
                } />
                {/* Cowork — in Preview, open to approved accounts only. The
                    three paths are one page: the tab and the open deliverable
                    live in the URL so a deliverable can be linked to and Back
                    walks the loop. `RequireMode` is what keeps the mode's own
                    rule (`canEnterMode`) true of the route and not only of the
                    pill. */}
                <Route path="/cowork" element={<CoworkRoute />} />
                <Route path="/cowork/:tab" element={<CoworkRoute />} />
                <Route path="/cowork/:tab/:id" element={<CoworkRoute />} />
                {/* The PCPA project simulator: the portal, and one attempt. */}
                <Route path="/project" element={<Navigate to="/project/pcpa" replace />} />
                <Route path="/project/pcpa" element={<ProjectRoute />} />
                <Route path="/project/pcpa/:attemptId" element={<ProjectRoute />} />
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
            </Main>
            {TOUR_ENABLED && <OnboardingTour />}
            <MathFocus />
            <ImageFocus />
            {/* The app's one PDF reader. Root-level so a document opened from a
                dialog, a sheet or a card clears it and outlives it. */}
            <PdfReaderHost />
            <Toast />
          </div>
        </ExamProgressProvider>
      </AuthProvider>
    </PaperRouter>
  )
}
