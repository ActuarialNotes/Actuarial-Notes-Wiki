import { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, GraduationCap, Layers, LayoutDashboard, Microscope, Play } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { AvatarDisplay } from '@/components/AvatarDisplay'

function getLastWikiPath(): string {
  try { return sessionStorage.getItem('wiki:last-path') || '/wiki' } catch { return '/wiki' }
}

const NAV_ITEMS = [
  { to: '/flashcards', label: 'Flashcards', icon: Layers,          end: false, authRequired: false },
  { to: '/',           label: 'Quiz',       icon: Play,            end: true,  authRequired: false },
  { to: '/dashboard',  label: 'Dashboard',  icon: LayoutDashboard, end: false, authRequired: true  },
] as const

export default function BottomNav() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [studyGuidesOpen, setStudyGuidesOpen] = useState(false)

  const profileName =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.display_name as string | undefined) ||
    user?.email?.split('@')[0] ||
    ''
  const profileInitials = profileName.slice(0, 2).toUpperCase()
  const avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) ?? ''

  const items = NAV_ITEMS.filter(item => !item.authRequired || !!user)

  const isStudyGuidesActive =
    location.pathname.startsWith('/wiki') || location.pathname.startsWith('/research')

  // Close the sub-menu on route change
  useEffect(() => {
    setStudyGuidesOpen(false)
  }, [location.pathname])

  function handleStudyGuidesTab() {
    setStudyGuidesOpen(v => !v)
  }

  function navigateTo(path: string) {
    setStudyGuidesOpen(false)
    navigate(path)
  }

  return (
    <>
      {/* Study Guides sub-menu panel */}
      {studyGuidesOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[44] md:hidden"
            onClick={() => setStudyGuidesOpen(false)}
            aria-hidden="true"
          />
          {/* Panel */}
          <div className="fixed bottom-14 left-0 right-0 z-[46] md:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <div className="flex">
              <button
                type="button"
                onClick={() => navigateTo(getLastWikiPath())}
                className={`flex flex-1 flex-col items-center justify-center gap-2 py-6 transition-colors ${
                  location.pathname.startsWith('/wiki') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <GraduationCap className="h-7 w-7 shrink-0" />
                <span className="text-sm font-medium">Actuarial Exams</span>
              </button>
              {user && (
                <button
                  type="button"
                  onClick={() => navigateTo('/research')}
                  className={`flex flex-1 flex-col items-center justify-center gap-2 py-6 transition-colors ${
                    location.pathname.startsWith('/research') ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Microscope className="h-7 w-7 shrink-0" />
                  <span className="flex items-center gap-1 text-sm font-medium">
                    Research
                    <span className="text-[9px] font-semibold px-1 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 leading-none">
                      Beta
                    </span>
                  </span>
                </button>
              )}
            </div>
          </div>
        </>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-[45] flex md:hidden bg-background/95 backdrop-blur-md border-t border-border h-14">
        {/* Study Guides tab */}
        <button
          type="button"
          onClick={handleStudyGuidesTab}
          className={`flex flex-1 flex-col items-center justify-center gap-0.5 transition-colors ${
            isStudyGuidesActive || studyGuidesOpen ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <BookOpen className="h-5 w-5 shrink-0" />
          <span className="text-[10px] font-medium">Guides</span>
        </button>

        {items.map(item => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              data-tour={item.to === '/' ? 'nav-quiz' : undefined}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center justify-center gap-0.5 transition-colors ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          )
        })}

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center justify-center gap-0.5 transition-colors ${
              isActive
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`
          }
        >
          {user ? (
            <span className="shrink-0">
              <AvatarDisplay avatarUrl={avatarUrl} initials={profileInitials} size={20} />
            </span>
          ) : (
            <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 shrink-0">
              <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3.5 2.5" />
            </svg>
          )}
          <span className="text-[10px] font-medium">You</span>
        </NavLink>
      </nav>
    </>
  )
}
