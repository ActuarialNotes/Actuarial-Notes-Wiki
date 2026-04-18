import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Sun, Moon, Settings2 } from 'lucide-react'
import Landing from '@/pages/Landing'
import Auth from '@/pages/Auth'
import Quiz from '@/pages/Quiz'
import Review from '@/pages/Review'
import Dashboard from '@/pages/Dashboard'
import Browse from '@/pages/Browse'
import Settings from '@/pages/Settings'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'
import { buildWikiUrl } from '@/lib/wikiUrl'

function NavBar() {
  const { user, session, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-10">
      <div className="container max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-semibold text-foreground hover:text-primary transition-colors">
          Actuarial Quiz
        </Link>
        <nav className="flex items-center gap-4">
          <a
            href={buildWikiUrl('', session?.access_token, session?.refresh_token)}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Wiki
          </a>
          <Link to="/browse" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Browse
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </Link>
              <Link
                to="/settings"
                aria-label="Settings"
                className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Settings2 className="h-4 w-4" />
              </Link>
              <button
                type="button"
                onClick={signOut}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => navigate('/auth')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </button>
          )}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="h-9 w-9 flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </nav>
      </div>
    </header>
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
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/review" element={<Review />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
