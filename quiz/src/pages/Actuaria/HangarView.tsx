import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, Gem, Shield } from 'lucide-react'
import { ShipBay } from '@/components/actuaria/ShipBay'
import { ShipGlyph } from '@/components/actuaria/ShipGlyph'
import { Term } from '@/components/actuaria/Term'
import { AbilityButton } from '@/components/battle/AbilityButton'
import { MasteryBadge } from '@/components/MasteryBadge'
import { SHIP_SLOT_LABEL, type ShipCosmetic } from '@/data/actuariaShips'
import { useActuariaPrefs } from '@/hooks/useActuariaPrefs'
import type { ActuariaWorld } from '@/hooks/useActuariaWorld'
import { useOwnedShips } from '@/hooks/useOwnedShips'
import { abilityStatuses, toggleEquip, type AbilityStatus } from '@/lib/actuaria/abilities'
import { sectorName } from '@/lib/actuaria/lexicon'
import { SHIP_SLOTS, type ShipSlot } from '@/lib/actuaria/prefs'
import { equipPatch, shipView, slotCosmetics } from '@/lib/actuaria/ship'
import { LOADOUT_MAX, cleanLoadout } from '@/lib/battle'
import { examAccentStyle } from '@/lib/examColors'
import { MASTERY_LABEL } from '@/lib/masteryBadge'
import { cn } from '@/lib/utils'
import { useOpenLandmark } from './useOpenLandmark'

/**
 * The **Hangar** (docs/actuaria-online.md §6.7): the player's ship and its
 * cosmetic slots, and the abilities a private-channel battle can take in.
 * The Store sells the ship's parts; the Hangar only equips them.
 */
export function HangarView({ world }: { world: ActuariaWorld }) {
  const { prefs, update } = useActuariaPrefs()
  const { owned } = useOwnedShips()
  const view = shipView(prefs.ship, owned)

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 px-4 py-4 sm:px-6 lg:py-6">
      <h1 className="actuaria-display text-xl sm:text-2xl"><Term id="hangar" /></h1>

      <section className="space-y-5 rounded-xl bg-card p-4 sm:p-6" aria-labelledby="hangar-ship">
        <h2 id="hangar-ship" className="sr-only">Your ship</h2>
        <ShipBay look={view.look} labels={view.labels} className="mx-auto max-w-xl" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SHIP_SLOTS.map(slot => (
            <ShipSlotPicker
              key={slot}
              slot={slot}
              equipped={prefs.ship[slot]}
              owned={owned}
              signedIn={world.signedIn}
              onEquip={id => {
                const patch = owned && equipPatch(prefs.ship, id, owned)
                if (patch) void update({ ship: { ...prefs.ship, ...patch } })
              }}
            />
          ))}
        </div>
      </section>

      <AbilityLoadout
        world={world}
        equipped={prefs.loadout}
        onChange={loadout => void update({ loadout })}
      />
    </div>
  )
}

// ── The ship ──────────────────────────────────────────────────────────────────

function ShipSlotPicker({
  slot,
  equipped,
  owned,
  signedIn,
  onEquip,
}: {
  slot: ShipSlot
  equipped: string | null
  owned: ReadonlySet<string> | null
  signedIn: boolean
  onEquip: (id: string) => void
}) {
  const items = slotCosmetics(slot, owned ?? new Set())
  return (
    <div className="space-y-2" role="group" aria-labelledby={`hangar-slot-${slot}`}>
      <h3 id={`hangar-slot-${slot}`} className="actuaria-display text-[11px] text-muted-foreground">{SHIP_SLOT_LABEL[slot]}</h3>
      <ul className="space-y-1.5">
        {items.map(item => (
          <li key={item.id}>
            <ShipPartRow item={item} owned={!!owned?.has(item.id)} equipped={equipped === item.id} signedIn={signedIn} onEquip={() => onEquip(item.id)} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function ShipPartRow({
  item,
  owned,
  equipped,
  signedIn,
  onEquip,
}: {
  item: ShipCosmetic
  owned: boolean
  equipped: boolean
  signedIn: boolean
  onEquip: () => void
}) {
  const art = item.slot === 'calculator'
    ? <Calculator className="h-5 w-5 text-muted-foreground" aria-hidden />
    : item.slot === 'decal'
    ? <Shield className="h-5 w-5 text-muted-foreground" aria-hidden />
    : <ShipGlyph look={{ hull: item.hull ?? null, trail: item.trail ?? null }} size={28} />
  const body = (
    <>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center">{art}</span>
      <span className="min-w-0 flex-1 truncate text-sm">{item.name}</span>
    </>
  )

  if (owned) {
    return (
      <button
        type="button"
        onClick={onEquip}
        aria-pressed={equipped}
        data-testid={`hangar-part-${item.id}`}
        className={cn(
          'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          equipped ? 'bg-accent ring-1 ring-border' : 'hover:bg-accent/40',
        )}
      >
        {body}
        <span className="text-xs text-muted-foreground">{equipped ? 'Equipped' : 'Equip'}</span>
      </button>
    )
  }

  // The raid's reward is earned, never sold.
  if (item.raidOnly) {
    return (
      <p className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-muted-foreground" data-testid={`hangar-part-${item.id}`}>
        {body}
        <span className="text-xs">Raid reward</span>
      </p>
    )
  }

  // Not owned: the Store sells it, and only to an account.
  return (
    <Link
      to={signedIn ? '/store?tab=ships' : '/auth'}
      state={signedIn ? undefined : { from: '/store?tab=ships' }}
      data-testid={`hangar-part-${item.id}`}
      className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-muted-foreground transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {body}
      <span className="inline-flex items-center gap-1 text-xs tabular-nums">
        {item.priceGems} <Gem className="h-3 w-3" aria-label="gems" />
      </span>
    </Link>
  )
}

// ── Abilities ─────────────────────────────────────────────────────────────────

interface AbilityGroup {
  key: string
  /** The unlocking concept's exam, for the group's accent; null for the starter. */
  exam: string | null
  label: string
  statuses: AbilityStatus[]
}

function AbilityLoadout({
  world,
  equipped,
  onChange,
}: {
  world: ActuariaWorld
  equipped: string[]
  onChange: (loadout: string[]) => void
}) {
  const openLandmark = useOpenLandmark()
  const groups = useMemo<AbilityGroup[]>(() => {
    const out: AbilityGroup[] = []
    for (const status of abilityStatuses(world.records, new Date())) {
      const key = status.def.exam ?? 'starter'
      let group = out.find(g => g.key === key)
      if (!group) {
        group = { key, exam: status.def.exam, label: status.def.exam ? sectorName(status.def.exam) : 'Starter', statuses: [] }
        out.push(group)
      }
      group.statuses.push(status)
    }
    return out
  }, [world.records])

  const count = cleanLoadout(equipped).length
  const full = count >= LOADOUT_MAX

  return (
    <section className="space-y-4 rounded-xl bg-card p-4 sm:p-6" aria-labelledby="hangar-abilities">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="hangar-abilities" className="actuaria-display text-[11px] text-muted-foreground">
          <Term id="ability">Abilities</Term>
        </h2>
        <span className="text-xs tabular-nums text-muted-foreground" data-testid="hangar-loadout-count">
          {count} of {LOADOUT_MAX} equipped
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        Taken into a <Term id="privateChannel" /> battle when the host turns abilities on. Each works once.
      </p>

      {groups.map(group => (
        <div key={group.key} className="space-y-2" style={group.exam ? examAccentStyle(group.exam) : undefined}>
          <h3 className="actuaria-display text-[11px] text-muted-foreground">{group.label}</h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {group.statuses.map(status => {
              const isOn = equipped.includes(status.def.id)
              return (
                <li key={status.def.id} className="space-y-1.5">
                  <AbilityButton
                    def={status.def}
                    state={status.unlocked ? 'ready' : 'locked'}
                    selected={isOn}
                    disabled={!isOn && (full || !status.unlocked)}
                    onClick={() => onChange(toggleEquip(equipped, status.def.id, status.unlocked))}
                  />
                  <Requirement
                    status={status}
                    onReview={name => openLandmark([name], 0)}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      ))}
      {full && <p className="text-xs text-muted-foreground">Loadout full — take one off to equip another.</p>}
    </section>
  )
}

/** "Bayes Theorem at Level 2", and where the concept stands now. */
function Requirement({ status, onReview }: { status: AbilityStatus; onReview: (concept: string) => void }) {
  const { def } = status
  if (!def.concept || !def.minLevel) {
    return <p className="px-1 text-xs text-muted-foreground">Always available</p>
  }
  const concept = def.concept
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-1 text-xs text-muted-foreground" data-testid={`hangar-requirement-${def.id}`}>
      <span>
        <button
          type="button"
          onClick={() => onReview(concept)}
          className="underline decoration-dotted underline-offset-2 hover:text-foreground"
        >
          {concept}
        </button>{' '}
        at {MASTERY_LABEL[def.minLevel]}
      </span>
      {status.state && <MasteryBadge state={status.state} />}
      {status.lapsed && (
        <span className="w-full text-amber-600 dark:text-amber-400">
          Requirement lapsed: review {concept}
        </span>
      )}
    </div>
  )
}
