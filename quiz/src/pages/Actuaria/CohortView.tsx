import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Bell, Copy, Loader2, LogOut, MessageSquare, Swords } from 'lucide-react'
import { AvatarDisplay } from '@/components/AvatarDisplay'
import { CheckMark } from '@/components/CheckMark'
import { CredibilityBar } from '@/components/actuaria/CredibilityBar'
import { StatusChip } from '@/components/actuaria/StatusChip'
import { Term } from '@/components/actuaria/Term'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getSittingsForExam, sittingVersionLabel } from '@/data/examSittings'
import { useAuth } from '@/hooks/useAuth'
import type { ActuariaWorld } from '@/hooks/useActuariaWorld'
import { useCrew, useCrewThreads } from '@/hooks/useCrew'
import { useLeague } from '@/hooks/useLeague'
import { formatZ } from '@/lib/actuaria/credibility'
import {
  CREW_MAX,
  CREW_MIN,
  GUIDE_PAY,
  challengeLive,
  guides,
  isInviteCode,
  normalizeInviteCode,
  poolThreshold,
  progressSnapshot,
  type CrewMember,
  type CrewView,
  type Thread,
} from '@/lib/actuaria/crews'
import * as crewStore from '@/lib/actuaria/crewStore'
import { uniqueLandmarks, sectorRegions } from '@/lib/actuaria/landmarks'
import { sectorName } from '@/lib/actuaria/lexicon'
import { PHASE_LABEL } from '@/lib/actuaria/raid'
import type { Sector } from '@/lib/actuaria/sectors'
import { examAccentStyle } from '@/lib/examColors'
import { LEAGUES_ENABLED } from '@/lib/featureFlags'
import { cn } from '@/lib/utils'
import { useCrewSector } from './useCrewSector'

/**
 * The **Cohort** screen (docs/actuaria-online.md §6.11): a study group for one
 * exam sitting — its risk pool, its members, the week's raid, Cohort Clash,
 * its guides and Ask the cohort. Signed-in only, and opt-in: nothing is shared
 * until the player starts or joins a cohort, and leaving deletes it all.
 */
export function CohortView({ world }: { world: ActuariaWorld }) {
  const sector = useCrewSector(world)
  const { crew, loading, error, signedIn } = useCrew(sector?.key ?? null)

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 px-4 py-4 sm:px-6 lg:py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="actuaria-display text-xl sm:text-2xl"><Term id="cohort" /></h1>
        <SectorPicker world={world} selected={sector} />
      </div>

      {!signedIn ? (
        <SignInCard />
      ) : !sector ? (
        <section className="rounded-xl bg-card p-5 text-sm text-muted-foreground">
          A cohort studies one sector. <Link to="/actuaria/map" className="underline">Chart one on the map</Link> first.
        </section>
      ) : loading ? (
        <p className="flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Hailing your cohort…</p>
      ) : crew ? (
        <CrewHome crew={crew} sector={sector} world={world} />
      ) : (
        <>
          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
          <NoCrew sector={sector} />
        </>
      )}
    </div>
  )
}

function SectorPicker({ world, selected }: { world: ActuariaWorld; selected: Sector | null }) {
  const [params, setParams] = useSearchParams()
  const studying = world.sectors.filter(s => s.status === 'in_progress')
  if (studying.length < 2) return null
  return (
    <div role="radiogroup" aria-label="Sector" className="flex flex-wrap gap-1.5">
      {studying.map(s => {
        const on = s.key === selected?.key
        return (
          <button
            key={s.key}
            type="button"
            role="radio"
            aria-checked={on}
            style={examAccentStyle(s.key)}
            onClick={() => {
              const next = new URLSearchParams(params)
              next.set('exam', s.key)
              setParams(next, { replace: true })
            }}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium transition-colors',
              on ? 'bg-[var(--exam-accent-soft)] ring-1 ring-[var(--exam-accent-muted)]' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {sectorName(s.key)}
          </button>
        )
      })}
    </div>
  )
}

function SignInCard() {
  return (
    <section className="space-y-3 rounded-xl bg-card p-5">
      <p className="text-sm">A cohort is other candidates sitting the same exam — so it needs an account.</p>
      <Link to="/auth" state={{ from: '/actuaria/cohort' }} className={buttonVariants({ size: 'sm' })}>Sign in</Link>
    </section>
  )
}

/** The identity a player shares on joining — the leagues' derivation. */
function useIdentity() {
  const { user } = useAuth()
  const name = (user?.user_metadata?.display_name as string | undefined) ?? user?.email?.split('@')[0] ?? 'You'
  const avatar = (user?.user_metadata?.avatar_url as string | undefined) ?? ''
  return { name, avatar }
}

// ── No cohort yet: start one, or join one ────────────────────────────────────

function NoCrew({ sector }: { sector: Sector }) {
  const me = useIdentity()
  const sittings = useMemo(() => {
    const labels = getSittingsForExam(sector.key).map(sittingVersionLabel)
    return [...new Set(labels)]
  }, [sector.key])
  const [name, setName] = useState('')
  const [sitting, setSitting] = useState(sittings[0] ?? '')
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState<'create' | 'join' | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function create(e: FormEvent) {
    e.preventDefault()
    setBusy('create')
    setError(null)
    const out = await crewStore.createCrew({ exam: sector.key, sitting: sitting || 'Next sitting', name: name.trim(), displayName: me.name, avatarUrl: me.avatar })
    if (out.error) setError(out.error)
    setBusy(null)
  }

  async function join(e: FormEvent) {
    e.preventDefault()
    setBusy('join')
    setError(null)
    const out = await crewStore.joinCrew(normalizeInviteCode(code), me.name, me.avatar)
    if (out.error) setError(out.error)
    setBusy(null)
  }

  const codeOk = isInviteCode(normalizeInviteCode(code))

  return (
    <div className="space-y-4" data-testid="actuaria-cohort-empty">
      <div className="grid gap-4 md:grid-cols-2">
        <form onSubmit={create} className="space-y-3 rounded-xl bg-card p-5" aria-labelledby="cohort-start">
          <h2 id="cohort-start" className="actuaria-display text-[11px] text-muted-foreground">Start a cohort · {sectorName(sector.key)}</h2>
          <label className="block space-y-1 text-sm">
            <span className="text-muted-foreground">Name</span>
            <Input value={name} maxLength={40} onChange={e => setName(e.target.value)} placeholder="The Bayesians" data-testid="cohort-name" />
          </label>
          <label className="block space-y-1 text-sm">
            <span className="text-muted-foreground">Sitting</span>
            <select
              value={sitting}
              onChange={e => setSitting(e.target.value)}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              data-testid="cohort-sitting"
            >
              {sittings.length === 0 && <option value="">Next sitting</option>}
              {sittings.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
          <Button type="submit" disabled={!name.trim() || busy !== null} className="w-full" data-testid="cohort-create">
            {busy === 'create' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Start the cohort'}
          </Button>
        </form>

        <form onSubmit={join} className="space-y-3 rounded-xl bg-card p-5" aria-labelledby="cohort-join">
          <h2 id="cohort-join" className="actuaria-display text-[11px] text-muted-foreground">Join with an invite code</h2>
          <label className="block space-y-1 text-sm">
            <span className="text-muted-foreground">Invite code</span>
            <Input
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="AB2C3D"
              className="font-mono uppercase tracking-widest"
              autoCapitalize="characters"
              data-testid="cohort-code"
            />
          </label>
          <Button type="submit" variant="secondary" disabled={!codeOk || busy !== null} className="w-full" data-testid="cohort-join">
            {busy === 'join' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Join'}
          </Button>
        </form>
      </div>
      {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
      <div className="flex items-center gap-2.5 rounded-xl bg-muted/40 p-3 text-xs text-muted-foreground">
        <AvatarDisplay avatarUrl={me.avatar} initials={me.name.slice(0, 2).toUpperCase()} size={32} />
        <p>
          You’ll appear as <span className="font-medium text-foreground">{me.name}</span>. A cohort sees your name, avatar,
          Credibility on this sector and whether you studied today — never your email. Leave anytime and it’s deleted.
        </p>
      </div>
    </div>
  )
}

// ── A cohort ─────────────────────────────────────────────────────────────────

function CrewHome({ crew, sector, world }: { crew: CrewView; sector: Sector; world: ActuariaWorld }) {
  useShareProgress(crew, sector, world)
  const league = useLeague(LEAGUES_ENABLED ? crew.crew.exam : null)
  const { crew: c, pool } = crew

  return (
    <div className="space-y-5" data-testid="actuaria-cohort">
      <header className="flex flex-wrap items-end justify-between gap-3 rounded-xl bg-card p-5" style={examAccentStyle(c.exam)}>
        <div className="min-w-0 space-y-1">
          <p className="actuaria-display text-[11px] text-muted-foreground">{sectorName(c.exam)} · {c.sitting}</p>
          <h2 className="truncate text-lg font-semibold">{c.name}</h2>
          <p className="text-xs text-muted-foreground">
            {c.members} of {CREW_MAX} members{league.selfRank ? ` · League rank ${league.selfRank}` : ''}
          </p>
        </div>
        <div className="w-full max-w-[14rem] space-y-1">
          <p className="text-xs text-muted-foreground">Cohort <Term id="sectorCredibility" /></p>
          <CredibilityBar z={c.cohortZ ?? 0} label={c.cohortZ === null ? '—' : formatZ(c.cohortZ)} size="sm" ariaLabel="Cohort Credibility, the members’ mean" />
        </div>
      </header>

      <Messages crew={crew} />

      <div className="grid gap-5 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5">
          <RiskPool crew={crew} />
          <Members crew={crew} bankLabel={sector.bankLabel ?? null} />
          <AskTheCohort crew={crew} />
        </div>
        <aside className="space-y-5">
          <RaidMiniCard crew={crew} />
          <Guides crew={crew} />
          <Invite code={c.inviteCode} full={c.members >= CREW_MAX} />
          <LeaveCrew crewId={c.id} />
        </aside>
      </div>
      {pool.members < CREW_MIN && (
        <p className="sr-only">This cohort needs {CREW_MIN - pool.members} more members to open its risk pool and its raid.</p>
      )}
    </div>
  )
}

/** Keep what this member shares current: refreshed each time the screen opens on the cohort. */
function useShareProgress(crew: CrewView, sector: Sector, world: ActuariaWorld) {
  const me = useIdentity()
  const sent = useRef<string | null>(null)
  useEffect(() => {
    if (world.loading || sent.current === crew.crew.id) return
    sent.current = crew.crew.id
    const landmarks = uniqueLandmarks(sectorRegions(sector.syllabus, world.recordsFor(sector.key), new Date()))
    const readiness = world.readiness.get(sector.key)?.overallPct ?? 0
    const snap = progressSnapshot(landmarks.map(l => ({ name: l.concept.name, z: l.z })), readiness)
    void crewStore.shareProgress({ crewId: crew.crew.id, ...snap, displayName: me.name, avatarUrl: me.avatar })
  }, [crew.crew.id, sector, world, me.name, me.avatar])
}

function Messages({ crew }: { crew: CrewView }) {
  const now = new Date()
  const challenges = crew.challenges.filter(c => challengeLive(c.at, now))
  if (crew.nudges.length === 0 && challenges.length === 0) return null
  return (
    <section className="space-y-2" aria-label="For you" data-testid="cohort-messages">
      {crew.nudges.length > 0 && (
        <p className="flex items-center gap-2 rounded-xl bg-card px-4 py-3 text-sm">
          <Bell className="h-4 w-4 text-muted-foreground" aria-hidden />
          {crew.nudges.map(n => n.from).join(', ')} nudged you — the pool is waiting on today’s study.
          <Link to="/actuaria/daily" className="ml-auto shrink-0 underline">Daily</Link>
        </p>
      )}
      {challenges.map(ch => (
        <p key={`${ch.from}-${ch.code}`} className="flex items-center gap-2 rounded-xl bg-card px-4 py-3 text-sm">
          <Swords className="h-4 w-4 text-muted-foreground" aria-hidden />
          {ch.from} challenged you to a duel.
          <Link
            to={`/actuaria/battle?join=${encodeURIComponent(ch.code)}`}
            className={cn(buttonVariants({ size: 'sm' }), 'ml-auto shrink-0')}
            data-testid="cohort-accept-challenge"
          >
            Join room {ch.code}
          </Link>
        </p>
      ))}
    </section>
  )
}

/** The risk pool: one segment per member, filled when they studied today (§7.6). */
function RiskPool({ crew }: { crew: CrewView }) {
  const { pool, members } = crew
  const need = poolThreshold(pool.members)
  const forming = pool.members < CREW_MIN
  return (
    <section className="space-y-3 rounded-xl bg-card p-5" aria-labelledby="cohort-pool" data-testid="cohort-pool">
      <div className="flex items-center justify-between gap-3">
        <h3 id="cohort-pool" className="actuaria-display text-[11px] text-muted-foreground"><Term id="riskPool" /></h3>
        {pool.active && <StatusChip variant="cleared">Bonus active · +25% gems</StatusChip>}
      </div>
      <div className="flex gap-1" role="img" aria-label={`${pool.covered} of ${pool.members} covered today`}>
        {members.map(m => (
          <span key={m.memberId} className={cn('h-2 flex-1 rounded-full', m.coveredToday ? 'bg-orange-500' : 'bg-muted')} />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        {forming
          ? `Forming — ${CREW_MIN - pool.members} more ${CREW_MIN - pool.members === 1 ? 'member opens' : 'members open'} the pool and the raid.`
          : pool.active
          ? `${pool.covered} / ${pool.members} covered today. Every gem you earn today pays a quarter more.`
          : `${pool.covered} / ${pool.members} covered today — ${need - pool.covered} more and every gem pays a quarter more.`}
      </p>
    </section>
  )
}

function Members({ crew, bankLabel }: { crew: CrewView; bankLabel: string | null }) {
  const navigate = useNavigate()
  const [sent, setSent] = useState<Set<string>>(new Set())
  const [busy, setBusy] = useState<string | null>(null)

  async function sendNudge(m: CrewMember) {
    setBusy(m.memberId)
    const out = await crewStore.nudge(crew.crew.id, m.memberId)
    if (!out.error) setSent(prev => new Set(prev).add(m.memberId))
    setBusy(null)
  }

  // Cohort Clash: open a private room at the station, and hand the member its code.
  const clash = (m: CrewMember) => {
    const params = new URLSearchParams({ host: '1', crew: crew.crew.id, challenge: m.memberId })
    if (bankLabel) params.set('exam', bankLabel)
    navigate(`/actuaria/battle?${params.toString()}`)
  }

  return (
    <section className="space-y-3 rounded-xl bg-card p-5" aria-labelledby="cohort-members">
      <h3 id="cohort-members" className="actuaria-display text-[11px] text-muted-foreground">Members</h3>
      <ul className="grid gap-2 sm:grid-cols-2" data-testid="cohort-members">
        {crew.members.map(m => (
          <li key={m.memberId} className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
            <AvatarDisplay avatarUrl={m.avatar} initials={m.name.slice(0, 2).toUpperCase()} size={36} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {m.name}{m.isSelf && <span className="text-muted-foreground"> (you)</span>}
              </p>
              <p className="text-xs text-muted-foreground">
                {m.sectorZ === null ? 'Z —' : `Z ${formatZ(m.sectorZ)}`}{m.role === 'guide' ? ' · Guide (self-reported)' : ''}
              </p>
            </div>
            {m.coveredToday ? (
              <CheckMark className="h-5 w-5" label="Covered today" />
            ) : !m.isSelf ? (
              <Button
                size="sm"
                variant="outline"
                disabled={m.nudgedToday || sent.has(m.memberId) || busy === m.memberId}
                onClick={() => void sendNudge(m)}
                data-testid={`cohort-nudge-${m.name}`}
              >
                {m.nudgedToday || sent.has(m.memberId) ? 'Nudged' : 'Nudge'}
              </Button>
            ) : null}
            {!m.isSelf && (
              <Button size="sm" variant="ghost" aria-label={`Challenge ${m.name} to a duel`} title="Cohort Clash" onClick={() => clash(m)}>
                <Swords className="h-4 w-4" aria-hidden />
              </Button>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}

function RaidMiniCard({ crew }: { crew: CrewView }) {
  const raid = crew.raid
  return (
    <Link
      to={`/actuaria/raid?exam=${encodeURIComponent(crew.crew.exam)}`}
      className="block space-y-2 rounded-xl bg-card p-5 transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      data-testid="cohort-raid-card"
    >
      <p className="actuaria-display text-[11px] text-muted-foreground">This week’s raid</p>
      <p className="font-semibold"><Term id="boss" /></p>
      {raid ? (
        <>
          <div className="h-1.5 overflow-hidden rounded-full bg-muted" aria-hidden>
            <div className="h-full rounded-full bg-destructive" style={{ width: `${(raid.bossHealth / raid.bossMax) * 100}%` }} />
          </div>
          <p className="text-xs text-muted-foreground">
            {raid.bossHealth.toLocaleString('en-US')} / {raid.bossMax.toLocaleString('en-US')} · {PHASE_LABEL[raid.phase]}
          </p>
        </>
      ) : (
        <p className="text-xs text-muted-foreground">Opens when the cohort has {CREW_MIN} members.</p>
      )}
      {crew.me.lastLoot !== null && crew.me.lastLoot > 0 && (
        <p className="text-xs text-muted-foreground">Last week’s loot: {crew.me.lastLoot} gems</p>
      )}
    </Link>
  )
}

function Guides({ crew }: { crew: CrewView }) {
  const list = guides(crew.members)
  const amGuide = crew.me.role === 'guide'
  const [busy, setBusy] = useState(false)
  return (
    <section className="space-y-3 rounded-xl bg-card p-5" aria-labelledby="cohort-guides">
      <h3 id="cohort-guides" className="actuaria-display text-[11px] text-muted-foreground"><Term id="guide">Guides</Term></h3>
      {list.length === 0 ? (
        <p className="text-sm text-muted-foreground">No guides yet.</p>
      ) : (
        <ul className="space-y-1.5 text-sm">
          {list.map(g => (
            <li key={g.memberId} className="flex items-center justify-between gap-2">
              <span className="truncate">{g.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">{g.explanations} explained</span>
            </li>
          ))}
        </ul>
      )}
      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          className="mt-0.5"
          checked={amGuide}
          disabled={busy}
          onChange={async e => {
            setBusy(true)
            await crewStore.setGuide(crew.crew.id, e.target.checked)
            setBusy(false)
          }}
          data-testid="cohort-guide-toggle"
        />
        <span>I’ve passed this exam and will guide. Shown as self-reported; an accepted explanation pays {GUIDE_PAY} gems.</span>
      </label>
    </section>
  )
}

function Invite({ code, full }: { code: string; full: boolean }) {
  const [copied, setCopied] = useState(false)
  return (
    <section className="space-y-2 rounded-xl bg-card p-5" aria-labelledby="cohort-invite">
      <h3 id="cohort-invite" className="actuaria-display text-[11px] text-muted-foreground">Invite code</h3>
      <div className="flex items-center gap-2">
        <code className="flex-1 font-mono text-lg tracking-[0.3em]" data-testid="cohort-invite-code">{code}</code>
        <Button
          size="sm"
          variant="ghost"
          aria-label="Copy the invite code"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code)
              setCopied(true)
            } catch { /* no clipboard */ }
          }}
        >
          {copied ? <CheckMark className="h-4 w-4" /> : <Copy className="h-4 w-4" aria-hidden />}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">{full ? 'The cohort is full.' : `Up to ${CREW_MAX} members.`}</p>
    </section>
  )
}

function LeaveCrew({ crewId }: { crewId: string }) {
  const [confirming, setConfirming] = useState(false)
  const [busy, setBusy] = useState(false)
  if (!confirming) {
    return (
      <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={() => setConfirming(true)}>
        <LogOut className="mr-2 h-4 w-4" aria-hidden /> Leave the cohort
      </Button>
    )
  }
  return (
    <div className="space-y-2 rounded-xl bg-card p-4 text-sm">
      <p>Leave? What you shared — your name, avatar, Credibility, questions, replies and raid damage — is deleted.</p>
      <div className="flex gap-2">
        <Button size="sm" variant="destructive" disabled={busy} onClick={async () => { setBusy(true); await crewStore.leaveCrew(crewId); setBusy(false) }} data-testid="cohort-leave">
          Leave
        </Button>
        <Button size="sm" variant="ghost" onClick={() => setConfirming(false)}>Stay</Button>
      </div>
    </div>
  )
}

// ── Ask the cohort ───────────────────────────────────────────────────────────

function AskTheCohort({ crew }: { crew: CrewView }) {
  const { threads, loading } = useCrewThreads(crew.crew.id)
  const [body, setBody] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    if (!body.trim()) return
    setBusy(true)
    const out = await crewStore.ask(crew.crew.id, body.trim(), null)
    if (!out.error) setBody('')
    setBusy(false)
  }

  return (
    <section className="space-y-3 rounded-xl bg-card p-5" aria-labelledby="cohort-ask">
      <h3 id="cohort-ask" className="actuaria-display text-[11px] text-muted-foreground">Ask the cohort</h3>
      <form onSubmit={submit} className="flex gap-2">
        <Input value={body} maxLength={1000} onChange={e => setBody(e.target.value)} placeholder="What’s tripping you up?" aria-label="Your question" data-testid="cohort-ask-input" />
        <Button type="submit" disabled={!body.trim() || busy}>Ask</Button>
      </form>
      {loading ? null : threads.length === 0 ? (
        <p className="text-sm text-muted-foreground">No questions yet.</p>
      ) : (
        <ul className="space-y-3">
          {threads.map(t => <ThreadItem key={t.id} thread={t} />)}
        </ul>
      )}
    </section>
  )
}

function ThreadItem({ thread }: { thread: Thread }) {
  const [open, setOpen] = useState(false)
  const [reply, setReply] = useState('')
  const [busy, setBusy] = useState(false)
  const accepted = thread.replies.some(r => r.accepted)
  return (
    <li className="space-y-2 rounded-lg bg-muted/30 p-3">
      <p className="text-sm"><span className="font-medium">{thread.from}</span>{thread.concept ? <span className="text-muted-foreground"> · {thread.concept}</span> : null}</p>
      <p className="whitespace-pre-wrap text-sm">{thread.body}</p>
      {thread.replies.length > 0 && (
        <ul className="space-y-2 border-l border-border pl-3">
          {thread.replies.map(r => (
            <li key={r.id} className="space-y-1 text-sm">
              <p className="text-xs text-muted-foreground">
                {r.from}{r.guide ? ' · Guide' : ''}{r.accepted ? ' · Accepted' : ''}
              </p>
              <p className="whitespace-pre-wrap">{r.body}</p>
              {thread.isSelf && !accepted && !r.isSelf && (
                <Button size="sm" variant="outline" onClick={() => void crewStore.acceptReply(r.id)}>Accept</Button>
              )}
            </li>
          ))}
        </ul>
      )}
      {open ? (
        <form
          className="flex gap-2"
          onSubmit={async e => {
            e.preventDefault()
            if (!reply.trim()) return
            setBusy(true)
            const out = await crewStore.reply(thread.id, reply.trim())
            if (!out.error) { setReply(''); setOpen(false) }
            setBusy(false)
          }}
        >
          <Input value={reply} maxLength={2000} onChange={e => setReply(e.target.value)} aria-label="Your reply" autoFocus />
          <Button type="submit" size="sm" disabled={!reply.trim() || busy}>Reply</Button>
        </form>
      ) : (
        <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
          <MessageSquare className="mr-1.5 h-3.5 w-3.5" aria-hidden /> Reply
        </Button>
      )}
    </li>
  )
}
