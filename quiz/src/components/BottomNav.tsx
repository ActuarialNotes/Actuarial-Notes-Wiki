import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { BookOpen, LayoutDashboard, Layers, Play } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { AvatarDisplay } from '@/components/AvatarDisplay'

function getLastWikiPath(): string {
  try { return sessionStorage.getItem('wiki:last-path') || '/wiki' } catch { return '/wiki' }
}

const NAV_ITEMS = [
  { to: '/wiki',       label: 'Guides',     icon: BookOpen,        end: false, authRequired: false },
  { to: '/flashcards', label: 'Flashcards', icon: Layers,          end: false, authRequired: false },
  { to: '/',           label: 'Quiz',       icon: Play,            end: true,  authRequired: false },
  { to: '/dashboard',  label: 'Dashboard',  icon: LayoutDashboard, end: false, authRequired: true  },
] as const

export default function BottomNav() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const profileName =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.display_name as string | undefined) ||
    user?.email?.split('@')[0] ||
    ''
  const profileInitials = profileName.slice(0, 2).toUpperCase()
  const avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) ?? ''

  const items = NAV_ITEMS.filter(item => !item.authRequired || !!user)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[45] flex md:hidden bg-background/95 backdrop-blur-md border-t border-border h-14">
      {items.map(item => {
        const Icon = item.icon

        if (item.to === '/wiki') {
          const isActive = location.pathname.startsWith('/wiki')
          return (
            <button
              key={item.to}
              type="button"
              onClick={() => navigate(getLastWikiPath())}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        }

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
  )
}
