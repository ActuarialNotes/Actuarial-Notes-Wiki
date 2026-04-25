import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import Landing from '@/pages/Landing'
import Auth from '@/pages/Auth'
import Quiz from '@/pages/Quiz'
import Review from '@/pages/Review'
import Dashboard from '@/pages/Dashboard'
import Browse from '@/pages/Browse'
import Settings from '@/pages/Settings'
import Sidebar from '@/components/Sidebar'

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

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/review" element={<Review />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/settings" element={<Settings />} />
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
      </div>
    </BrowserRouter>
  )
}
