// The navigation (docs/redesign-spec.md R2, §8 Phase F): four places in the
// order of the path, Today, Learn, Practice and Apply. On a phone they are a
// bar at the bottom of the screen (`PlaceBar`) under a top row holding the exam
// in focus and the profile button (`PlaceTopRow`, `PlaceHeader`); on a wide
// screen they are a rail down the left (`PlaceRail`) with the exam at its head
// and You at its foot. Which place a path is in, and where the bar is drawn,
// is `lib/places.ts`.

import { useEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown, Plus } from 'lucide-react'
import { ExamLogo } from '@/components/ExamLogo'
import { ExamSwitcherButton } from '@/components/switcher/ExamSwitcherButton'
import { ProBadge, NAME_PILL } from '@/components/ProBadge'
import { ProfileButton, ProfileRing, useProfileName } from '@/components/nav/ProfileButton'
import { useAuth } from '@/hooks/useAuth'
import { useExamInFocus } from '@/hooks/useExamInFocus'
import { useSubscription } from '@/hooks/useSubscription'
import { useExamSwitcher } from '@/stores/examSwitcher'
import { parseBanner, DESIGNATION_BANNERS } from '@/lib/banners'
import { PLACES, isSessionRoute, learnTarget, placeOf, showsPlaceBar, type PlaceId } from '@/lib/places'
import { wikiRoute } from '@/lib/wikiRoutes'
import { YOU_PATH } from '@/lib/you'
import { cn } from '@/lib/utils'

const FOCUS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

/** A place's icon: outlined at rest, filled for the place the reader is in. */
function PlaceIcon({ place, filled = false, className }: { place: PlaceId; filled?: boolean; className?: string }) {
  const shape = {
    today: (
      <>
        <rect x="4" y="5" width="16" height="15" rx="3" fill={filled ? 'currentColor' : 'none'} />
        <path d="M8 3v4M16 3v4" fill="none" />
      </>
    ),
    learn: (
      <>
        <path d="M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2z" fill={filled ? 'currentColor' : 'none'} />
        <path d="M12 6v14" fill="none" stroke={filled ? 'hsl(var(--background))' : 'currentColor'} />
      </>
    ),
    practice: <path d="M7 4l13 8-13 8z" fill={filled ? 'currentColor' : 'none'} />,
    apply: (
      <>
        <path d="M9 3h6" fill="none" />
        <path d="M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" fill={filled ? 'currentColor' : 'none'} />
      </>
    ),
  }[place]
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {shape}
    </svg>
  )
}

function lastLearnPath(): string | null {
  try { return sessionStorage.getItem('wiki:last-path') } catch { return null }
}

/** Each place with where it leads from the page showing, and whether the reader is in it. */
function usePlaceLinks() {
  const { pathname } = useLocation()
  const { active } = useExamInFocus()
  const current = placeOf(pathname)
  const learnHome = active?.fileName ? wikiRoute({ kind: 'exam', name: active.fileName }) : null
  return PLACES.map(place => ({
    ...place,
    to: place.id === 'learn' ? learnTarget(pathname, lastLearnPath(), learnHome) : place.to,
    current: place.id === current,
  }))
}

/** The app's name, where there is no exam to show in its place. */
function Wordmark({ className }: { className?: string }) {
  return (
    <Link to="/dashboard" className={cn('flex h-11 min-w-0 items-center gap-2 rounded-xl text-[17px] font-semibold', FOCUS, className)}>
      <img src="/favicon.png" alt="" className="h-6 w-6 shrink-0 brightness-0 dark:invert" />
      <span className="truncate">Actuarial Notes</span>
    </Link>
  )
}

/**
 * The top row of a place on a phone: the exam showing at the left (the
 * switcher), the profile button at the right, and whatever the page adds
 * before it. With no exam to name, the app's name stands at the left.
 */
export function PlaceTopRow({
  examKey, label, visiting = null, testId, desk = false, profile = true, claimable, className, children, lead,
}: {
  /** Stands in for the exam at the left: a page's own exam control (Learn's exam page). */
  lead?: ReactNode
  /** The exam the page shows (its exam_progress key), or null when it shows none. */
  examKey?: string | null
  label?: string
  visiting?: string | null
  testId?: string
  /** Keep the exam on a wide screen too, where the rail already names the exam in focus. */
  desk?: boolean
  profile?: boolean
  claimable?: number
  className?: string
  /** The page's own controls, drawn before the profile button at every width. */
  children?: ReactNode
}) {
  return (
    <div className={cn('flex items-center gap-2', !desk && !children && 'lg:hidden', className)}>
      {lead
        ? <span className="paper-chrome-lead flex min-w-0 items-center lg:hidden">{lead}</span>
        : examKey && label
        ? <ExamSwitcherButton examKey={examKey} label={label} visiting={visiting} testId={testId} className={cn('paper-chrome-lead', !desk && 'lg:hidden')} />
        : <Wordmark className="paper-chrome-lead lg:hidden" />}
      <span className="flex-1" />
      {children}
      {profile && <ProfileButton claimable={claimable} className="lg:hidden" />}
    </div>
  )
}

/**
 * The app's own top row on a phone, for a page that draws none
 * (`drawsOwnTopRow` in lib/places.ts): the exam in focus and the profile
 * button. The sign-in screens get the app's name alone.
 */
export function PlaceHeader({ lead }: { lead?: ReactNode } = {}) {
  const { pathname } = useLocation()
  const { active, activeKey } = useExamInFocus()
  const signingIn = pathname === '/auth' || pathname.startsWith('/auth/')
  return (
    <PlaceTopRow
      examKey={signingIn ? null : activeKey}
      label={active?.examLabel}
      profile={!signingIn}
      lead={lead}
      className="px-5 pt-3"
    />
  )
}

/** Publishes the bar's height while it is drawn, so anything parked on the bottom edge rides above it (index.css). */
function usePlaceBarFlag(shown: boolean) {
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('has-place-bar', shown)
    return () => root.classList.remove('has-place-bar')
  }, [shown])
}

/** The four places as a bar at the bottom of a phone. */
export function PlaceBar() {
  const { pathname } = useLocation()
  const links = usePlaceLinks()
  const shown = showsPlaceBar(pathname)
  usePlaceBarFlag(shown)
  if (!shown) return null
  return (
    <nav
      aria-label="Places"
      data-testid="place-bar"
      className="paper-chrome-bar fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 border-t border-border bg-background px-2 pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-2 lg:hidden"
    >
      {links.map(place => (
        <Link
          key={place.id}
          to={place.to}
          aria-current={place.current ? 'page' : undefined}
          data-tour={place.id === 'practice' ? 'nav-quiz' : undefined}
          className={cn(
            'flex flex-col items-center gap-1 rounded-xl py-1.5 text-[13px] leading-4',
            place.current ? 'font-bold' : 'font-medium',
            FOCUS,
          )}
        >
          <PlaceIcon place={place.id} filled={place.current} className="h-6 w-6" />
          {place.label}
        </Link>
      ))}
    </nav>
  )
}

/** The exam at the head of the rail: the switcher, or the way to add a first exam. */
function RailExam() {
  const { active, activeKey, loading } = useExamInFocus()
  const open = useExamSwitcher(s => s.open)
  const openAdd = useExamSwitcher(s => s.openAdd)
  if (active && activeKey) {
    return (
      <button
        type="button"
        onClick={() => open(null)}
        aria-haspopup="dialog"
        aria-label={`Switch exam, ${active.examLabel}`}
        data-testid="rail-exam"
        className={cn('mb-[18px] flex h-[52px] w-full min-w-0 items-center gap-2.5 rounded-xl px-2 text-left hover:bg-foreground/10', FOCUS)}
      >
        <ExamLogo examKey={activeKey} size="md" />
        <span className="min-w-0 flex-1 truncate text-[17px] font-semibold">{active.examLabel}</span>
        <ChevronDown className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
      </button>
    )
  }
  return (
    <div className="mb-[18px] flex flex-col gap-2 px-2">
      <Wordmark className="h-[52px]" />
      {!loading && (
        <button
          type="button"
          onClick={() => openAdd()}
          data-testid="rail-add-exam"
          className={cn('flex h-11 items-center gap-2 rounded-full border-[1.5px] border-foreground px-4 text-[15px] font-semibold hover:bg-foreground/10', FOCUS)}
        >
          <Plus className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
          Add an exam
        </button>
      )}
    </div>
  )
}

/** You at the foot of the rail: the character, the name and what the account carries. */
function RailYou() {
  const { user } = useAuth()
  const { isPro, isBetaTester } = useSubscription()
  const { name } = useProfileName()
  const { pathname } = useLocation()
  const banner = parseBanner(user?.user_metadata?.banner_data as string | undefined)
  const designation = DESIGNATION_BANNERS.find(b => b.id === banner?.id)
  const bannerLabel = banner?.id === 'custom'
    ? (banner.text ?? '').slice(0, 10) || null
    : banner?.id === 'beta_tester'
    ? 'Beta'
    : banner
    ? banner.id.toUpperCase()
    : null
  return (
    <div className="mt-auto flex items-center gap-2">
      <Link
        to={YOU_PATH}
        aria-label={user ? `You, ${name}` : 'You'}
        aria-current={pathname === YOU_PATH ? 'page' : undefined}
        data-testid="rail-you"
        className={cn('flex h-[52px] min-w-0 flex-1 items-center gap-3 rounded-xl px-2 text-base font-medium hover:bg-foreground/10', FOCUS)}
      >
        <ProfileRing size={34} />
        <span className="truncate">{name}</span>
        {user && bannerLabel && (
          <span title={designation?.fullName} className={cn(NAME_PILL, designation ? 'designation-foil' : 'border border-foreground')}>
            {bannerLabel}
          </span>
        )}
        {user && isPro && <ProBadge title={isBetaTester ? 'Beta Tester' : undefined} />}
      </Link>
      {!user && (
        <Link
          to="/auth"
          state={{ from: pathname }}
          className={cn('flex h-10 shrink-0 items-center rounded-full border-[1.5px] border-foreground px-3.5 text-[15px] font-semibold hover:bg-foreground/10', FOCUS)}
        >
          Sign in
        </Link>
      )}
    </div>
  )
}

/** The four places as a rail down the left of a wide screen. */
export function PlaceRail() {
  const { pathname } = useLocation()
  const links = usePlaceLinks()
  if (isSessionRoute(pathname)) return null
  return (
    <nav
      aria-label="Places"
      data-testid="place-rail"
      className="paper-chrome-rail sticky top-0 hidden h-screen w-[var(--sidebar-width)] shrink-0 flex-col gap-1.5 overflow-y-auto border-r border-border bg-background px-4 py-5 lg:flex"
    >
      <RailExam />
      {links.map(place => (
        <Link
          key={place.id}
          to={place.to}
          aria-current={place.current ? 'page' : undefined}
          data-tour={place.id === 'practice' ? 'nav-quiz' : undefined}
          className={cn(
            'flex h-[46px] shrink-0 items-center gap-3 rounded-xl px-3 text-base',
            place.current ? 'bg-foreground font-bold text-background' : 'font-medium hover:bg-foreground/10',
            FOCUS,
          )}
        >
          <PlaceIcon place={place.id} className="h-5 w-5 shrink-0" />
          {place.label}
        </Link>
      ))}
      <RailYou />
    </nav>
  )
}
