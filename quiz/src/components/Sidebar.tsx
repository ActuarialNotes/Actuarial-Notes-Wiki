import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  ChevronsLeft,
  ClipboardList,
  Compass,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Settings2,
  Sun,
  X,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/hooks/useTheme'

const STORAGE_KEY = 'quiz.sidebar.collapsed'

function getInitialCollapsed(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

type ItemProps = {
  to: string
  label: string
  icon: React.ReactNode
  collapsed: boolean
  external?: boolean
  end?: boolean
  onNavigate?: () => void
}

function SidebarItem({ to, label, icon, collapsed, external, end, onNavigate }: ItemProps) {
  const base =
    'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors border-l-2 border-transparent'
  const inactive = 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
  const active = 'bg-accent text-foreground border-l-primary font-medium'

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noreferrer"
        title={collapsed ? label : undefined}
        className={`${base} ${inactive}`}
        onClick={onNavigate}
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center">{icon}</span>
        <span className={`truncate ${collapsed ? 'lg:hidden' : ''}`}>{label}</span>
      </a>
    )
  }

  return (
    <NavLink
      to={to}
      end={end}
      title={collapsed ? label : undefined}
      className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      onClick={onNavigate}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">{icon}</span>
      <span className={`truncate ${collapsed ? 'lg:hidden' : ''}`}>{label}</span>
    </NavLink>
  )
}

export default function Sidebar() {
  const { user, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState<boolean>(getInitialCollapsed)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [collapsed])

  useEffect(() => {
    if (!profileOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [profileOpen])

  const closeMobile = () => setMobileOpen(false)

  const touchStartX = useRef<number | null>(null)

  const profileName =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.display_name as string | undefined) ||
    user?.email?.split('@')[0] ||
    'Profile'

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined

  return (
    <>
      {/* Mobile: persistent top header bar housing the hamburger */}
      <header className="fixed top-0 left-0 right-0 h-14 z-30 flex items-center gap-3 px-3 bg-background border-b lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
          className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-accent transition-colors"
        >
          <Menu className="h-4 w-4" />
        </button>
        <Link
          to="/dashboard"
          className="font-semibold text-foreground text-sm truncate"
        >
          Actuarial Notes
        </Link>
      </header>

      {/* Mobile: backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return
          if (e.changedTouches[0].clientX - touchStartX.current < -60) closeMobile()
          touchStartX.current = null
        }}
        className={[
          'flex flex-col bg-background border-r',
          // Mobile: fixed full-width overlay, slides in/out
          'fixed inset-y-0 left-0 z-50 w-full',
          'transition-transform duration-300',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop: sticky sidebar in document flow
          'lg:relative lg:inset-auto lg:translate-x-0 lg:z-auto',
          'lg:sticky lg:top-0 lg:h-screen lg:shrink-0',
          collapsed ? 'lg:w-14' : 'lg:w-64',
          'lg:transition-[width] lg:duration-200',
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex items-center h-14 border-b px-3 gap-2">
          <Link
            to="/dashboard"
            onClick={closeMobile}
            className={`flex-1 font-semibold text-foreground hover:text-primary transition-colors truncate ${collapsed ? 'lg:hidden' : ''}`}
          >
            Actuarial Notes
          </Link>
          {/* Desktop: collapse/expand toggle */}
          <button
            type="button"
            onClick={() => setCollapsed(v => !v)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`hidden lg:flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground ${collapsed ? 'mx-auto' : 'ml-auto'}`}
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          </button>
          {/* Mobile: close button */}
          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close navigation"
            className="lg:hidden ml-auto h-8 w-8 flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
          {user && (
            <SidebarItem
              to="/dashboard"
              label="Dashboard"
              icon={<LayoutDashboard className="h-4 w-4" />}
              collapsed={collapsed}
              onNavigate={closeMobile}
            />
          )}
          <SidebarItem
            to="/wiki"
            label="Wiki"
            icon={<BookOpen className="h-4 w-4" />}
            collapsed={collapsed}
            onNavigate={closeMobile}
          />
          <SidebarItem
            to="/"
            label="Quiz"
            icon={<ClipboardList className="h-4 w-4" />}
            collapsed={collapsed}
            end
            onNavigate={closeMobile}
          />
          <SidebarItem
            to="/browse"
            label="Browse"
            icon={<Compass className="h-4 w-4" />}
            collapsed={collapsed}
            onNavigate={closeMobile}
          />
        </nav>

        <div className="border-t px-2 py-3 space-y-1">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={collapsed ? (theme === 'dark' ? 'Light mode' : 'Dark mode') : undefined}
            className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </span>
            <span className={`truncate ${collapsed ? 'lg:hidden' : ''}`}>
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </span>
          </button>

          {user ? (
            <div ref={profileRef} className="relative">
              {profileOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-1 rounded-md border bg-popover shadow-md py-1 z-50">
                  <button
                    type="button"
                    onClick={() => { navigate('/settings'); setProfileOpen(false); closeMobile() }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/60 transition-colors"
                  >
                    <Settings2 className="h-4 w-4 shrink-0" />
                    <span>Settings</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { signOut(); setProfileOpen(false); closeMobile() }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/60 transition-colors"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() => setProfileOpen(v => !v)}
                title={collapsed ? profileName : undefined}
                className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={profileName} className="h-5 w-5 rounded-full object-cover" />
                  ) : (
                    <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                      {profileName[0]?.toUpperCase()}
                    </div>
                  )}
                </span>
                <span className={`truncate ${collapsed ? 'lg:hidden' : ''}`}>{profileName}</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => { navigate('/auth'); closeMobile() }}
              title={collapsed ? 'Sign in' : undefined}
              className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <LogIn className="h-4 w-4" />
              </span>
              <span className={`truncate ${collapsed ? 'lg:hidden' : ''}`}>Sign in</span>
            </button>
          )}
        </div>
      </aside>
    </>
  )
}
