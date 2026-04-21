import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Landing from '@/pages/Landing'
import Auth from '@/pages/Auth'
import Quiz from '@/pages/Quiz'
import Review from '@/pages/Review'
import Dashboard from '@/pages/Dashboard'
import Browse from '@/pages/Browse'
import Settings from '@/pages/Settings'
import WikiHome from '@/pages/wiki/WikiHome'
import WikiExam from '@/pages/wiki/WikiExam'
import WikiConcept from '@/pages/wiki/WikiConcept'
import WikiResource from '@/pages/wiki/WikiResource'
import { WikiLayout } from '@/components/wiki/WikiLayout'
import Sidebar from '@/components/Sidebar'

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
            <Route path="/wiki" element={<WikiLayout><WikiHome /></WikiLayout>} />
            <Route path="/wiki/exam/:slug" element={<WikiLayout><WikiExam /></WikiLayout>} />
            <Route path="/wiki/concept/:slug" element={<WikiLayout><WikiConcept /></WikiLayout>} />
            <Route path="/wiki/resource/:slug" element={<WikiLayout><WikiResource /></WikiLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
