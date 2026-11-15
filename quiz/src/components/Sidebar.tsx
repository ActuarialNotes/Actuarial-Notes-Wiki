import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  Calculator,
  CalendarCheck,
  ChevronsLeft,
  ChevronsRight,
  Database,
  FlaskConical,
  Gamepad2,
  Gem,
  GraduationCap,
  Layers,
  ListChecks,
  LibraryBig,
  LogIn,
  LogOut,
  Microscope,
  Moon,
  Play,
  Settings2,
  ShoppingBag,
  Sparkles,
  Sun,
  Users,
  Workflow,
  Wrench,
  X,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useAttemptNav } from '@/hooks/useAttemptNav'
import { useFlashcards } from '@/hooks/useFlashcards'
import { useCollectGlow } from '@/hooks/useCollectGlow'
import { useMobileNav } from '@/hooks/useMobileNav'
import { MobileNavButton } from '@/components/MobileNavButton'
import { pageHostsNavButton } from '@/lib/mobileNavHost'
import { useGems } from '@/hooks/useGems'
import { getDailyQuizStats, DAILY_QUIZ_EVENT } from '@/lib/dailyProgressStore'
import { useSubscription } from '@/hooks/useSubscription'
import { useTheme } from '@/hooks/useTheme'
import ExamsPopout from '@/components/ExamsPopout'
import { AvatarDisplay } from '@/components/AvatarDisplay'
import { GuestAvatar } from '@/components/GuestAvatar'
import { ProBadge, NAME_PILL } from '@/components/ProBadge'
import { useExamsPopout } from '@/hooks/useExamsPopout'
import { parseBanner, DESIGNATION_BANNERS } from '@/lib/banners'
import { GAMES_ENABLED, RESEARCH_TAB_ENABLED, TOOLS_ENABLED } from '@/lib/featureFlags'
import { useCommunityAccess } from '@/hooks/useCommunityAccess'
import { useWorkflowsAccess } from '@/hooks/useWorkflowsAccess'
import { ATTEMPT_VIEW_ICON, ATTEMPT_VIEW_LABEL, attemptRoute } from '@/lib/attemptViews'
import { pageOf, placeOf, placePages, type PlacePageId } from '@/lib/places'
import { TodayQuizCornerBadge, TodayQuizNavBadge } from '@/components/TodayQuizBadge'
import { useTodayQuizCounts } from '@/hooks/useTodayQuizCount'
import { SoundPopover } from '@/components/SoundPopover'
import { cn } from '@/lib/utils'
import { ExamSwitcher } from '@/components/ExamSwitcher'
import { useExamFocus } from '@/hooks/useExamFocus'
import { guidePath, quizPath } from '@/lib/examFocus'

const STORAGE_KEY = 'quiz.sidebar.collapsed'

/** Where Study Guides was left this visit, else the study guide of the exam in focus, else the exam list. */
function getLastWikiPath(fallback: string): string {
  try { return sessionStorage.getItem('wiki:last-path') || fallback } catch { return fallback }
}

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
  badge?: React.ReactNode
  forceActive?: boolean
  dataTour?: string
  dataFlashcardNav?: boolean
  /**
   * Decides the highlight in place of the route match, for a row whose place
   * isn't a pathname — an attempt's view is a search parameter, which a
   * NavLink doesn't match on. `within` is a row one of whose children is the
   * lit one: named, not filled, as a group's heading is.
   */
  state?: 'active' | 'within' | 'idle'
  /** Replace the history entry rather than push one, as switching an attempt's view does. */
  replace?: boolean
}

function SidebarItem({ to, label, icon, collapsed, external, end, onNavigate, badge, forceActive, dataTour, dataFlashcardNav, state, replace }: ItemProps) {
  // Phone-first sizing: below `lg` the drawer *is* the screen, so a row is a
  // full-width 48px target carrying 16px type; at `lg` it narrows back into the
  // 16rem rail at the app's default body size (style guide §3, §11).
  const base =
    'flex items-center gap-3 rounded-lg px-3 py-3 text-base transition-colors lg:rounded-md lg:py-2 lg:text-sm'
  const inactive = 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
  const active = 'bg-card text-foreground font-medium'
  const within = 'text-foreground font-medium hover:bg-accent/60'
  const tone = { active, within, idle: inactive }

  const content = (
    <>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center lg:h-5 lg:w-5">{icon}</span>
      <span className={`flex-1 truncate ${collapsed ? 'lg:hidden' : ''}`}>{label}</span>
      {badge && <span className={`shrink-0 ${collapsed ? 'lg:hidden' : ''}`}>{badge}</span>}
    </>
  )

  if (external) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noreferrer"
        title={collapsed ? label : undefined}
        className={`${base} ${inactive}`}
        onClick={onNavigate}
        data-tour={dataTour}
      >
        {content}
      </a>
    )
  }

  // A plain Link, because a NavLink would mark itself the current page
  // whenever the pathname matches — every view of an attempt at once.
  if (state) {
    return (
      <Link
        to={to}
        replace={replace}
        title={collapsed ? label : undefined}
        aria-current={state === 'active' ? 'page' : undefined}
        className={`${base} ${tone[state]}`}
        onClick={onNavigate}
        data-tour={dataTour}
        data-flashcard-nav={dataFlashcardNav ? '' : undefined}
      >
        {content}
      </Link>
    )
  }

  return (
    <NavLink
      to={to}
      end={end}
      replace={replace}
      title={collapsed ? label : undefined}
      className={({ isActive }) => `${base} ${(isActive || forceActive) ? active : inactive}`}
      onClick={onNavigate}
      data-tour={dataTour}
      data-flashcard-nav={dataFlashcardNav ? '' : undefined}
    >
      {content}
    </NavLink>
  )
}

/**
 * The pages a place lists under itself, indented behind a rule so they read
 * as part of the row above. An open attempt's views sit the same way under
 * Projects.
 */
function SubRows({ collapsed, children }: { collapsed: boolean; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'ml-4 mt-0.5 space-y-0.5 border-l border-border pl-2',
        // The icon-only rail has no room to indent: the rows stand in line under the place's icon.
        collapsed && 'lg:ml-0 lg:border-l-0 lg:pl-0',
      )}
    >
      {children}
    </div>
  )
}

const ICON = 'h-5 w-5 lg:h-4 lg:w-4'

// A row of the You menu, and its icon.
const MENU_ROW = 'w-full flex items-center gap-2.5 px-3 py-2.5 text-base text-foreground hover:bg-accent/60 transition-colors lg:gap-2 lg:py-2 lg:text-sm'
const MENU_ICON = 'h-5 w-5 shrink-0 lg:h-4 lg:w-4'

type NavProps = { collapsed: boolean; onNavigate: () => void }

/** A page's row under its place: filled while the reader is on it. */
function PageRow({
  page, to, label, icon, badge, collapsed, onNavigate,
}: NavProps & { page: PlacePageId; to: string; label: string; icon: React.ReactNode; badge?: React.ReactNode }) {
  const { pathname } = useLocation()
  return (
    <SidebarItem
      to={to}
      label={label}
      icon={icon}
      badge={badge}
      collapsed={collapsed}
      onNavigate={onNavigate}
      state={pageOf(pathname) === page ? 'active' : 'idle'}
    />
  )
}

/**
 * **Learn**: the study guide of the exam in focus (or wherever the reader
 * left off in it this visit), with the exam list and the Resources shelf
 * under it, and the flag-gated Research page for a signed-in reader.
 */
function LearnNav({ collapsed, onNavigate, research }: NavProps & { research: boolean }) {
  const { pathname } = useLocation()
  const { focus } = useExamFocus()
  const icons: Partial<Record<PlacePageId, React.ReactNode>> = {
    exams: <GraduationCap className={ICON} />,
    resources: <LibraryBig className={ICON} />,
    research: <Microscope className={ICON} />,
  }
  return (
    <>
      <SidebarItem
        to={getLastWikiPath(guidePath(focus))}
        label="Learn"
        icon={<BookOpen className={ICON} />}
        collapsed={collapsed}
        onNavigate={onNavigate}
        state={placeOf(pathname) === 'learn' ? 'within' : 'idle'}
      />
      <SubRows collapsed={collapsed}>
        {placePages('learn', { research }).map(p => (
          <PageRow
            key={p.id}
            page={p.id}
            to={p.to}
            label={p.label}
            icon={icons[p.id]}
            collapsed={collapsed}
            onNavigate={onNavigate}
            badge={p.id === 'research' ? (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 leading-none">
                Beta
              </span>
            ) : undefined}
          />
        ))}
      </SubRows>
    </>
  )
}

/**
 * **Practice**: the quiz builder of the exam in focus, the deck, and Games
 * (Quiz Battle and Concept Craft). The place's row carries what is left of
 * today's plan and lights up when a card is collected, since the deck is one
 * of its pages.
 */
function PracticeNav({ collapsed, onNavigate }: NavProps) {
  const { pathname } = useLocation()
  const { focus } = useExamFocus()
  const { cards } = useFlashcards()
  const collectGlow = useCollectGlow()
  const { total: todayQuizTotal, allComplete: todayQuizAllComplete } = useTodayQuizCounts()
  const [dailyQuizStats, setDailyQuizStats] = useState(() => getDailyQuizStats())

  // Keep daily quiz stats fresh after each quiz completion.
  useEffect(() => {
    const refresh = () => setDailyQuizStats(getDailyQuizStats())
    window.addEventListener(DAILY_QUIZ_EVENT, refresh)
    window.addEventListener('quiz-session-saved', refresh)
    return () => {
      window.removeEventListener(DAILY_QUIZ_EVENT, refresh)
      window.removeEventListener('quiz-session-saved', refresh)
    }
  }, [])

  // Questions left in today's plan (the badge the Start button on Today
  // carries) alongside today's answered tally.
  const quizBadge = todayQuizTotal <= 0 && !todayQuizAllComplete && dailyQuizStats.total <= 0 ? null : (
    <span className="flex items-center gap-1.5">
      <TodayQuizNavBadge count={todayQuizTotal} complete={todayQuizAllComplete} />
      {dailyQuizStats.total > 0 && (
        <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground tabular-nums lg:text-[10px]">
          {dailyQuizStats.correct}/{dailyQuizStats.total}
        </span>
      )}
    </span>
  )

  // Re-keyed on every collect so the pop replays each time the count ticks up.
  const deckBadge = cards.length > 0 ? (
    <span
      key={collectGlow}
      className={`text-xs font-semibold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground tabular-nums lg:text-[10px] ${collectGlow > 0 ? 'flashcard-badge-pop' : ''}`}
    >
      {cards.length}
    </span>
  ) : null

  const builder = quizPath(focus)

  return (
    <>
      <SidebarItem
        // The builder of the exam in focus; its back arrow is the exam list.
        to={builder}
        label="Practice"
        icon={
          <span className="relative inline-flex items-center justify-center">
            {collectGlow > 0 && <span key={`ring-${collectGlow}`} className="flashcard-nav-ring" aria-hidden="true" />}
            <Play key={`icon-${collectGlow}`} className={`${ICON} ${collectGlow > 0 ? 'flashcard-nav-glow' : ''}`} />
            {/* The icon-only rail hides the row badge, so the questions left
                ride the icon's corner there. */}
            {collapsed && (
              <span className="hidden lg:block">
                <TodayQuizCornerBadge count={todayQuizTotal} complete={todayQuizAllComplete} size="sm" className="-top-1.5 -right-2" />
              </span>
            )}
          </span>
        }
        collapsed={collapsed}
        onNavigate={onNavigate}
        state={placeOf(pathname) === 'practice' ? 'within' : 'idle'}
        badge={quizBadge}
        dataTour="nav-quiz"
        dataFlashcardNav
      />
      <SubRows collapsed={collapsed}>
        <PageRow page="quiz" to={builder} label="Quiz" icon={<ListChecks className={ICON} />} collapsed={collapsed} onNavigate={onNavigate} />
        <PageRow page="flashcards" to="/flashcards" label="Flashcards" icon={<Layers className={ICON} />} badge={deckBadge} collapsed={collapsed} onNavigate={onNavigate} />
        {GAMES_ENABLED && (
          <PageRow page="games" to="/games" label="Games" icon={<Gamepad2 className={ICON} />} collapsed={collapsed} onNavigate={onNavigate} />
        )}
      </SubRows>
    </>
  )
}

/**
 * **Apply**: where what was learned is used. Tools (the calculators) and Data
 * Sources (published values, tables and documents), Projects (a Pro feature,
 * so its row carries the Pro chip; an open attempt's views are listed under
 * it, as its top bar's switcher lists them) and Workflows, for the accounts
 * its Preview admits (`lib/workflowsAccess.ts`).
 */
function ApplyNav({ collapsed, onNavigate, workflows }: NavProps & { workflows: boolean }) {
  const { pathname } = useLocation()
  const attempt = useAttemptNav(s => s.current)
  const pages = placePages('apply', { tools: TOOLS_ENABLED, workflows })
  const icons: Partial<Record<PlacePageId, React.ReactNode>> = {
    tools: <Calculator className={ICON} />,
    'data-sources': <Database className={ICON} />,
    projects: <FlaskConical className={ICON} />,
    workflows: <Workflow className={ICON} />,
  }

  return (
    <>
      <SidebarItem
        to={pages[0]?.to ?? '/project'}
        label="Apply"
        icon={<Wrench className={ICON} />}
        collapsed={collapsed}
        onNavigate={onNavigate}
        state={placeOf(pathname) === 'apply' ? 'within' : 'idle'}
      />
      <SubRows collapsed={collapsed}>
        {pages.map(p => p.id === 'projects' ? (
          <div key={p.id}>
            <SidebarItem
              to={p.to}
              label={p.label}
              icon={icons[p.id]}
              collapsed={collapsed}
              onNavigate={onNavigate}
              state={attempt ? 'within' : pageOf(pathname) === 'projects' ? 'active' : 'idle'}
              badge={<ProBadge />}
            />
            {attempt && (
              <SubRows collapsed={collapsed}>
                {attempt.views.map(view => {
                  const Icon = ATTEMPT_VIEW_ICON[view]
                  return (
                    <SidebarItem
                      key={view}
                      to={attemptRoute(attempt.attemptId, view)}
                      label={ATTEMPT_VIEW_LABEL[view]}
                      icon={<Icon className={ICON} />}
                      collapsed={collapsed}
                      onNavigate={onNavigate}
                      state={view === attempt.view ? 'active' : 'idle'}
                      // The views are windows of one project, not pages of it.
                      replace
                    />
                  )
                })}
              </SubRows>
            )}
          </div>
        ) : (
          <PageRow key={p.id} page={p.id} to={p.to} label={p.label} icon={icons[p.id]} collapsed={collapsed} onNavigate={onNavigate} />
        ))}
      </SubRows>
    </>
  )
}

export default function Sidebar() {
  const { user, signOut } = useAuth()
  const { balance: gemBalance } = useGems()
  const { isPro, isBetaTester } = useSubscription()
  const showCommunity = useCommunityAccess()
  const showWorkflows = useWorkflowsAccess()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState<boolean>(getInitialCollapsed)
  const { open: mobileOpen, closeNav } = useMobileNav()
  // This route pins a bar of its own to the top of the viewport and carries the
  // menu button on it, so the app header below would be a second row of chrome.
  const navHostedByPage = pageHostsNavButton(location.pathname)
  const [profileOpen, setProfileOpen] = useState(false)
  const { open: examsOpen, openExams, closeExams } = useExamsPopout()
  const [signOutConfirm, setSignOutConfirm] = useState(false)
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

  const closeMobile = closeNav

  /** A row of the You menu that opens a page. */
  const go = (to: string) => { navigate(to); setProfileOpen(false); closeMobile() }

  const touchStartX = useRef<number | null>(null)

  const profileName =
    (user?.user_metadata?.full_name as string | undefined) ||
    (user?.user_metadata?.display_name as string | undefined) ||
    user?.email?.split('@')[0] ||
    'You'

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
      {/* Below lg: the app header — the avatar (the way into this menu) and the
          wordmark. It is the row a page gets when it pins nothing
          to the top of the viewport itself; a page with a floating search bar
          puts the avatar on that bar's line instead and this header is not
          rendered at all, so the phone spends one 3.5rem row on chrome rather
          than two. `lib/mobileNavHost.ts` is the one place that says which is
          which, and `App.tsx` reserves the room from the same call. */}
      {!navHostedByPage && (
        <header className="paper-chrome-header fixed top-0 left-0 right-0 h-14 z-30 flex items-center gap-2 px-3 bg-background border-b lg:hidden">
          <MobileNavButton className="-mr-0.5" />
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 font-semibold text-foreground text-base min-w-0"
            >
              <img src="/favicon.png" alt="" className="h-5 w-5 shrink-0 brightness-0 dark:invert" />
              <span className="truncate">Actuarial Notes</span>
            </Link>
          </div>
        </header>
      )}

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
          // `paper-chrome-rail` keeps the desktop rail still while the page
          // beside it slides (index.css, "Paper on a desk").
          'paper-chrome-rail flex flex-col bg-background border-r',
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
              className="flex min-w-0 items-center gap-1.5 truncate font-semibold text-foreground transition-colors hover:text-primary"
            >
              <img src="/favicon.png" alt="" className="h-5 w-5 shrink-0 brightness-0 dark:invert" />
              Actuarial Notes
            </Link>
          </div>
          {/* Desktop: collapse/expand toggle */}
          <button
            type="button"
            onClick={() => setCollapsed(v => !v)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`hidden lg:flex h-8 w-8 shrink-0 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground ${collapsed ? 'mx-auto' : 'ml-auto'}`}
          >
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
          </button>
          {/* Mobile: close button */}
          <button
            type="button"
            onClick={closeMobile}
            aria-label="Close menu"
            className="lg:hidden ml-auto h-10 w-10 flex items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground"
          >
            <X className="h-5 w-5 lg:h-4 lg:w-4" />
          </button>
        </div>

        {/* The exam in focus, and the way to change it: every tab below opens
            on this exam (docs/design-review.md §5.3). */}
        <ExamSwitcher collapsed={collapsed} onNavigate={closeMobile} />

        <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 py-3 space-y-1 lg:px-2">

          {/* The four places, in the order of the path (lib/places.ts,
              docs/design-review.md §5.2): the day's session, the study guide,
              practice on it, and using it on a real problem. What isn't a
              step on the path, the Store and Community, is in the menu the
              avatar opens at the foot. */}
          <SidebarItem
            to="/dashboard"
            label="Today"
            icon={<CalendarCheck className={ICON} />}
            collapsed={collapsed}
            onNavigate={closeMobile}
          />
          <LearnNav collapsed={collapsed} onNavigate={closeMobile} research={RESEARCH_TAB_ENABLED && !!user} />
          <PracticeNav collapsed={collapsed} onNavigate={closeMobile} />
          <ApplyNav collapsed={collapsed} onNavigate={closeMobile} workflows={showWorkflows} />
        </nav>

        <div className="border-t px-3 py-3 space-y-1 lg:px-2">
          <div className={cn('flex items-stretch gap-1', collapsed && 'lg:flex-col')}>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={collapsed ? (theme === 'dark' ? 'Light mode' : 'Dark mode') : undefined}
              className="flex-1 flex items-center gap-3 rounded-lg px-3 py-3 text-base text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors lg:rounded-md lg:py-2 lg:text-sm"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center lg:h-5 lg:w-5">
                {theme === 'dark' ? <Sun className="h-5 w-5 lg:h-4 lg:w-4" /> : <Moon className="h-5 w-5 lg:h-4 lg:w-4" />}
              </span>
              <span className={`truncate ${collapsed ? 'lg:hidden' : ''}`}>
                {theme === 'dark' ? 'Light mode' : 'Dark mode'}
              </span>
            </button>

            {/* Inline sound popout: mute / volume without leaving for Settings */}
            <SoundPopover collapsed={collapsed} />
          </div>

          {/* You: the avatar and the menu behind it. Everything that isn't a
              step on the path lives here, the Store and Community with the
              account's own rows, for a visitor as for a signed-in reader. */}
          <div ref={profileRef} className="relative">
            {profileOpen && (
              <div role="menu" aria-label="You" className="absolute bottom-full left-0 right-0 mb-1 rounded-md border bg-popover shadow-md py-1 z-50 lg:min-w-[13rem]">
                {/* Real products, each bought on its seller's own page (docs/store.md). */}
                <button type="button" role="menuitem" onClick={() => go('/store')} className={MENU_ROW}>
                  <ShoppingBag className={MENU_ICON} />
                  <span>Store</span>
                </button>
                {/* Where actuaries gather (docs/community.md): approved accounts only while in Preview. */}
                {showCommunity && (
                  <button type="button" role="menuitem" onClick={() => go('/community')} className={MENU_ROW}>
                    <Users className={MENU_ICON} />
                    <span>Community</span>
                  </button>
                )}
                {user && (
                  <button type="button" role="menuitem" onClick={() => go('/store/gems')} className={MENU_ROW}>
                    <Gem className={MENU_ICON} />
                    <span>Gem Shop</span>
                    <span
                      key={gemAnimKey}
                      className={`inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 ${gemAnimKey > 0 ? 'gem-celebrate' : ''}`}
                      aria-label={`${gemBalance} gems`}
                    >
                      <Gem className="h-3 w-3" />
                      {gemBalance}
                    </span>
                  </button>
                )}
                {user && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => { openExams(); setProfileOpen(false); closeMobile() }}
                    className={MENU_ROW}
                  >
                    <GraduationCap className={MENU_ICON} />
                    <span>Exams</span>
                  </button>
                )}
                <button type="button" role="menuitem" onClick={() => go('/settings')} className={MENU_ROW}>
                  <Settings2 className={MENU_ICON} />
                  <span>Settings</span>
                </button>
                {user && !isPro && (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => go('/upgrade')}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-base font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors lg:gap-2 lg:py-2 lg:text-sm"
                  >
                    <Sparkles className={MENU_ICON} />
                    <span>Upgrade to Pro</span>
                  </button>
                )}
                {!user ? (
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => { navigate('/auth', { state: { from: location.pathname } }); setProfileOpen(false); closeMobile() }}
                    className={MENU_ROW}
                  >
                    <LogIn className={MENU_ICON} />
                    <span>Sign in</span>
                  </button>
                ) : signOutConfirm ? (
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
                  <button type="button" role="menuitem" onClick={() => setSignOutConfirm(true)} className={MENU_ROW}>
                    <LogOut className={MENU_ICON} />
                    <span>Sign out</span>
                  </button>
                )}
              </div>
            )}
            <button
              type="button"
              onClick={() => setProfileOpen(v => !v)}
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              title={collapsed ? profileName : undefined}
              data-testid="you-menu"
              className="w-full flex items-center gap-3 rounded-lg px-3 py-3 text-base text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-colors lg:rounded-md lg:py-2 lg:text-sm"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center lg:h-5 lg:w-5">
                {user
                  ? <AvatarDisplay avatarUrl={avatarUrl} initials={profileInitials} size={20} />
                  : <GuestAvatar className="h-5 w-5 lg:h-4 lg:w-4" />}
              </span>
              <span className={`flex items-center gap-1.5 min-w-0 ${collapsed ? 'lg:hidden' : ''}`}>
                <span className="truncate">{profileName}</span>
                {bannerLabel && (
                  <span
                    title={designationBanner?.fullName}
                    className={cn(
                      NAME_PILL,
                      designationBanner
                        ? 'designation-foil text-foreground'
                        : equippedBanner?.id === 'beta_tester'
                        ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                        : 'bg-violet-500/15 text-violet-700 dark:text-violet-300',
                    )}
                  >
                    {bannerLabel}
                  </span>
                )}
                {isPro && (
                  <ProBadge title={isBetaTester ? 'Beta Tester' : undefined} />
                )}
              </span>
            </button>
          </div>
        </div>
      </aside>

      <ExamsPopout open={examsOpen} onClose={closeExams} />
    </>
  )
}
