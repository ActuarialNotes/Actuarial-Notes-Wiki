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
}

function SidebarItem({ to, label, icon, collapsed, external, end }: ItemProps) {
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
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center">{icon}</span>
        {!collapsed && <span className="truncate">{label}</span>}
      </a>
    )
  }

  return (
    <NavLink
      to={to}
      end={end}
      title={collapsed ? label : undefined}
      className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">{icon}</span>
      {!collapsed && <span className="truncate">{label}</span>}
    </NavLink>
  )
}

export default function Sidebar() {
  const { user, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState<boolean>(getInitialCollapsed)
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

  const width = collapsed ? 'w-14' : 'w-64'

  const profileName =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.display_name as string | undefined) ||
    user?.email?.split('@')[0] ||
    'Profile'

  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined

  return (
    <aside
      className={`${width} shrink-0 border-r bg-background sticky top-0 h-screen flex flex-col transition-[width] duration-200`}
    >
      <div className="flex items-center justify-between px-3 h-14 border-b">
        {!collapsed && (
          <Link
            to="/dashboard"
            className="font-semibold text-foreground hover:text-primary transition-colors truncate"
          >
            Actuarial Notes
          </Link>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(v => !v)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground"
        >
          {collapsed ? <Menu className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {user && (
          <SidebarItem
            to="/dashboard"
            label="Dashboard"
            icon={<LayoutDashboard className="h-4 w-4" />}
            collapsed={collapsed}
          />
        )}
        <SidebarItem
          to="/wiki"
          label="Wiki"
          icon={<BookOpen className="h-4 w-4" />}
          collapsed={collapsed}
        />
        <SidebarItem
          to="/"
          label="Quiz"
          icon={<ClipboardList className="h-4 w-4" />}
          collapsed={collapsed}
          end
        />
        <SidebarItem
          to="/browse"
          label="Browse"
          icon={<Compass className="h-4 w-4" />}
          collapsed={collapsed}
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
          {!collapsed && (
            <span className="truncate">
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </span>
          )}
        </button>

        {user ? (
          <div ref={profileRef} className="relative">
            {profileOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-1 rounded-md border bg-popover shadow-md py-1 z-50">
                <button
                  type="button"
                  onClick={() => { navigate('/settings'); setProfileOpen(false) }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/60 transition-colors"
                >
                  <Settings2 className="h-4 w-4 shrink-0" />
                  <span>Settings</span>
                </button>
                <button
                  type="button"
                  onClick={() => { signOut(); setProfileOpen(false) }}
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
              {!collapsed && <span className="truncate">{profileName}</span>}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => navigate('/auth')}
            title={collapsed ? 'Sign in' : undefined}
            className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center">
              <LogIn className="h-4 w-4" />
            </span>
            {!collapsed && <span className="truncate">Sign in</span>}
          </button>
        )}
      </div>
    </aside>
  )
}
