import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  ChevronsLeft,
  ClipboardList,
  Compass,
  Gem,
  GraduationCap,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Moon,
  Play,
  Settings2,
  ShoppingBag,
  Sun,
  X,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useGems } from '@/hooks/useGems'
import { useSubscription } from '@/hooks/useSubscription'
import { useTheme } from '@/hooks/useTheme'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { useWikiSyllabus } from '@/hooks/useWikiSyllabus'
import { wikiExamIdToProgressKey } from '@/lib/wikiParser'
import type { WikiExamSyllabus } from '@/lib/wikiParser'
import ExamsPopout from '@/components/ExamsPopout'
import { AvatarDisplay } from '@/components/AvatarDisplay'
import { parseBanner, DESIGNATION_BANNERS } from '@/lib/banners'

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

interface ExamPillProps {
  syllabus: WikiExamSyllabus
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}

function ExamPill({ syllabus, isOpen, onToggle, onClose }: ExamPillProps) {
  const navigate = useNavigate()
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null)
  const progressKey = wikiExamIdToProgressKey(syllabus.examId)
  const shortLabel = syllabus.examLabel.replace(/^Exam\s+/i, '')

  // Compute position before paint so there's no layout flash.
  // Guard against width=0: hidden elements (lg:hidden) return zero DOMRects —
  // without this, both the mobile-header and sidebar-header pills would render
  // a portal, causing the duplicate dropdown.
  useLayoutEffect(() => {
    if (!isOpen || !buttonRef.current) { setDropdownPos(null); return }
    const rect = buttonRef.current.getBoundingClientRect()
    if (rect.width === 0) { setDropdownPos(null); return }
    setDropdownPos({ top: rect.bottom + 4, left: rect.left })
  }, [isOpen])

  function handleReadConcepts() {
    onClose()
    navigate('/dashboard', { state: { openConceptsFor: progressKey } })
  }

  function handleStartQuiz() {
    onClose()
    navigate('/dashboard', { state: { autoStartQuiz: progressKey } })
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={onToggle}
        className="rounded-full bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 hover:bg-primary/20 transition-colors shrink-0"
      >
        {shortLabel}
      </button>
      {isOpen && dropdownPos && createPortal(
        <>
          {/* Full-screen backdrop — any tap outside the menu closes it */}
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 9998 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <div
            style={{ position: 'fixed', top: dropdownPos.top, left: dropdownPos.left, zIndex: 9999 }}
            className="rounded-md border bg-popover shadow-md py-1 min-w-[152px]"
          >
            <button
              type="button"
              onClick={handleReadConcepts}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/60 transition-colors"
            >
              <BookOpen className="h-4 w-4 shrink-0" />
              <span>Read Concepts</span>
            </button>
            <button
              type="button"
              onClick={handleStartQuiz}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/60 transition-colors"
            >
              <Play className="h-4 w-4 shrink-0" />
              <span>Start Quiz</span>
            </button>
          </div>
        </>,
        document.body
      )}
    </>
  )
}

export default function Sidebar() {
  const { user, signOut } = useAuth()
  const { balance: gemBalance } = useGems()
  const { isPremium, isBetaTester } = useSubscription()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const { progress: examProgress } = useExamProgress()
  const { syllabi } = useWikiSyllabus()
  const inProgressSyllabi = syllabi.filter(
    s => examProgress[wikiExamIdToProgressKey(s.examId)] === 'in_progress'
  )
  const [collapsed, setCollapsed] = useState<boolean>(getInitialCollapsed)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [examsOpen, setExamsOpen] = useState(false)
  const [signOutConfirm, setSignOutConfirm] = useState(false)
  const [openExamDropdown, setOpenExamDropdown] = useState<string | null>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  // Gem animation: tracks unseen increases and fires when the badge is visible.
  const prevGemBalance = useRef<number | null>(null)
  const pendingGemAnim = useRef(false)
  const [gemAnimKey, setGemAnimKey] = useState(0)

  const fireGemAnim = () => {
    if (!pendingGemAnim.current) return
    pendingGemAnim.current = false
    setGemAnimKey(k => k + 1)
  }

  // Mark pending when balance grows (runs before the visibility effects below).
  useEffect(() => {
    if (prevGemBalance.current !== null && gemBalance > prevGemBalance.current) {
      pendingGemAnim.current = true
    }
    prevGemBalance.current = gemBalance
  }, [gemBalance])

  // Fire immediately if the desktop gem badge is already visible.
  useEffect(() => {
    if (!collapsed) fireGemAnim()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gemBalance, collapsed])

  // Fire when the mobile drawer opens and a balance increase was missed.
  useEffect(() => {
    if (mobileOpen) fireGemAnim()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileOpen])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, collapsed ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [collapsed])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      collapsed ? '3.5rem' : '16rem'
    )
  }, [collapsed])

  useEffect(() => {
    if (!profileOpen) {
      setSignOutConfirm(false)
      return
    }
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

  const avatarUrl = (user?.user_metadata?.avatar_url as string | undefined) ?? ''
  const profileInitials = profileName.slice(0, 2).toUpperCase()

  const equippedBanner = parseBanner(user?.user_metadata?.banner_data as string | undefined)
  const designationBanner = DESIGNATION_BANNERS.find(b => b.id === equippedBanner?.id)
  const bannerLabel = equippedBanner?.id === 'custom'
    ? (equippedBanner.text ?? '').slice(0, 10) || null
    : equippedBanner?.id === 'beta_tester'
    ? 'Beta'
    : equippedBanner
    ? equippedBanner.id.toUpperCase()
    : null

  return (
    <>
      {/* Mobile: persistent top header bar housing the hamburger */}
      <header className="fixed top-0 left-0 right-0 h-14 z-30 flex items-center gap-3 px-3 bg-background border-b lg:hidden">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
          className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-accent transition-colors shrink-0"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <Link
            to="/dashboard"
            className="font-semibold text-foreground text-sm truncate shrink-0"
          >
            Actuarial Notes
          </Link>
          {user && inProgressSyllabi.map(s => {
            const key = wikiExamIdToProgressKey(s.examId)
            return (
              <ExamPill
                key={key}
                syllabus={s}
                isOpen={openExamDropdown === key}
                onToggle={() => setOpenExamDropdown(prev => prev === key ? null : key)}
                onClose={() => setOpenExamDropdown(null)}
              />
            )
          })}
        </div>
      </header>

      {/* Mobile: backdrop — z-[55] so it covers the sticky search bar (z-50) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/50 lg:hidden"
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
          // Mobile: fixed full-width overlay, slides in/out — z-[60] so it sits
          // above the sticky wiki search bar (z-50) and the backdrop (z-[55])
          'fixed inset-y-0 left-0 z-[60] w-full',
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
          <div className={`flex items-center gap-1.5 flex-1 min-w-0 ${collapsed ? 'lg:hidden' : ''}`}>
            <Link
              to="/dashboard"
              onClick={closeMobile}
              className="font-semibold text-foreground hover:text-primary transition-colors truncate shrink-0"
            >
              Actuarial Notes
            </Link>
            {user && inProgressSyllabi.map(s => {
              const key = wikiExamIdToProgressKey(s.examId)
              return (
                <ExamPill
                  key={key}
                  syllabus={s}
                  isOpen={openExamDropdown === key}
                  onToggle={() => setOpenExamDropdown(prev => prev === key ? null : key)}
                  onClose={() => setOpenExamDropdown(null)}
                />
              )
            })}
          </div>
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
            label="Study Guides"
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
            to="/search"
            label="Search"
            icon={<Compass className="h-4 w-4" />}
            collapsed={collapsed}
            onNavigate={closeMobile}
          />
          {user && (
            <NavLink
              to="/store"
              title={collapsed ? `Store — ${gemBalance} gems` : undefined}
              onClick={closeMobile}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors border-l-2 ${
                  isActive
                    ? 'bg-accent text-foreground border-l-primary font-medium'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-accent/60'
                }`
              }
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <ShoppingBag className="h-4 w-4" />
              </span>
              <span className={`truncate flex-1 ${collapsed ? 'lg:hidden' : ''}`}>Store</span>
              <span
                key={gemAnimKey}
                className={`inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 ${collapsed ? 'lg:hidden' : ''} ${gemAnimKey > 0 ? 'gem-celebrate' : ''}`}
                aria-label={`${gemBalance} gems`}
              >
                <Gem className="h-3 w-3" />
                {gemBalance}
              </span>
            </NavLink>
          )}
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
                    onClick={() => { setExamsOpen(true); setProfileOpen(false); closeMobile() }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/60 transition-colors"
                  >
                    <GraduationCap className="h-4 w-4 shrink-0" />
                    <span>Exams</span>
                  </button>
                  {signOutConfirm ? (
                    <div className="px-3 py-2 space-y-2">
                      <p className="text-xs text-muted-foreground">Sign out?</p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => { signOut(); setProfileOpen(false); setSignOutConfirm(false); closeMobile() }}
                          className="flex-1 rounded-md bg-destructive text-destructive-foreground text-xs py-1.5 font-medium hover:bg-destructive/90 transition-colors"
                        >
                          Sign out
                        </button>
                        <button
                          type="button"
                          onClick={() => setSignOutConfirm(false)}
                          className="flex-1 rounded-md border bg-background text-xs py-1.5 font-medium hover:bg-accent transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                  <button
                    type="button"
                    onClick={() => setSignOutConfirm(true)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/60 transition-colors"
                  >
                    <LogOut className="h-4 w-4 shrink-0" />
                    <span>Sign out</span>
                  </button>
                  )}
                </div>
              )}
              <button
                type="button"
                onClick={() => setProfileOpen(v => !v)}
                title={collapsed ? profileName : undefined}
                className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                  <AvatarDisplay avatarUrl={avatarUrl} initials={profileInitials} size={20} />
                </span>
                <span className={`flex items-center gap-1.5 min-w-0 ${collapsed ? 'lg:hidden' : ''}`}>
                  <span className="truncate">{profileName}</span>
                  {bannerLabel && (
                    <span
                      className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-sm tracking-widest leading-none border"
                      style={{
                        background: designationBanner?.colors.bg ?? (equippedBanner?.id === 'beta_tester' ? '#d1fae5' : '#ede9fe'),
                        color: designationBanner?.colors.text ?? (equippedBanner?.id === 'beta_tester' ? '#065f46' : '#4c1d95'),
                        borderColor: designationBanner?.colors.border ?? (equippedBanner?.id === 'beta_tester' ? '#6ee7b7' : '#c4b5fd'),
                      }}
                    >
                      {bannerLabel}
                    </span>
                  )}
                  {isPremium && (
                    <span
                      title={isBetaTester ? 'Beta Tester' : undefined}
                      className="shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 leading-none"
                    >
                      {isBetaTester ? '★ Premium' : 'Premium'}
                    </span>
                  )}
                </span>
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

      <ExamsPopout open={examsOpen} onClose={() => setExamsOpen(false)} />
    </>
  )
}
