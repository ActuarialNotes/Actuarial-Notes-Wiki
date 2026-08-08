// Cross-device persistence for the flashcard state: the collected-card set
// (hooks/useCollectedCards), the study deck + its custom order and the saved
// packs (hooks/useFlashcards). All three were localStorage-only, so a learner
// signing in on a second device saw a different set of collected cards and an
// empty deck — everything else (mastery, XP, streaks, quests) already synced.
//
// This module is the store-agnostic half: pure merge functions plus the
// Supabase reads/writes. hooks/useFlashcardSync.ts is the orchestrator that
// wires it to the two Zustand stores; the stores themselves only call the
// queue* helpers below. Keeping the direction one-way (stores -> this module,
// hook -> both) is what avoids an import cycle.
//
// ── The first-sign-in union ──────────────────────────────────────────────────
// A deck is a *set*, and a learner may have collected cards as a guest, or on
// another device while this one was offline. So the first time a given user
// hydrates on a given device we UNION local into remote, then push the result.
// After that the server is the source of truth for this device and later
// refreshes replace local state, because a permanent union would resurrect
// every card the learner deleted somewhere else. The marker below is what
// distinguishes the two; it is keyed by user id so signing in as someone else
// never merges the previous account's cards into theirs.

import { supabase } from '@/lib/supabase'
import type { WikiEntryKind } from '@/lib/wikiRoutes'
import type { CollectedCard } from '@/hooks/useCollectedCards'
import type { FlashCard, SavedFlashcardPack } from '@/hooks/useFlashcards'

/** Identity used for a card everywhere in the app: the name, lowercased. */
export function cardKey(name: string): string {
  return name.toLowerCase()
}

/** The full flashcard state as it lives on the server (or in a merge result). */
export interface FlashcardSnapshot {
  collected: CollectedCard[]
  cards: FlashCard[]
  order: string[]
  packs: SavedFlashcardPack[]
}

// ── Pure merges ───────────────────────────────────────────────────────────────

/**
 * Union of two collected-card sets, keyed by lowercased name. When both sides
 * know a card the *earliest* collection wins — that's when the learner actually
 * passed the comprehension check, and it keeps the "recently collected" order in
 * the Collected tab honest. Result is oldest-first for determinism.
 */
export function mergeCollected(
  local: readonly CollectedCard[],
  remote: readonly CollectedCard[],
): CollectedCard[] {
  const byKey = new Map<string, CollectedCard>()
  for (const card of [...remote, ...local]) {
    if (!card || typeof card.name !== 'string') continue
    const key = cardKey(card.name)
    const seen = byKey.get(key)
    if (!seen) { byKey.set(key, card); continue }
    byKey.set(key, seen.collectedAt <= card.collectedAt ? seen : card)
  }
  return [...byKey.values()].sort((a, b) => a.collectedAt - b.collectedAt)
}

/**
 * Union of two decks. `addedAt` keeps the earliest add (when the card really
 * entered the deck) and `completedAt` the most recent completion, so a card
 * ticked off on the phone stays ticked on the desktop. Order is server order
 * first, then any local-only names in their local order, then anything neither
 * list placed — mirroring how customOrder is appended to on add.
 */
export function mergeDeck(
  local: { cards: readonly FlashCard[]; order: readonly string[] },
  remote: { cards: readonly FlashCard[]; order: readonly string[] },
): { cards: FlashCard[]; order: string[] } {
  const byKey = new Map<string, FlashCard>()
  for (const card of [...remote.cards, ...local.cards]) {
    if (!card || typeof card.name !== 'string') continue
    const key = cardKey(card.name)
    const seen = byKey.get(key)
    if (!seen) { byKey.set(key, card); continue }
    byKey.set(key, {
      ...(seen.addedAt <= card.addedAt ? seen : card),
      addedAt: Math.min(seen.addedAt, card.addedAt),
      completedAt: latest(seen.completedAt, card.completedAt),
    })
  }

  const order: string[] = []
  const placed = new Set<string>()
  for (const name of [...remote.order, ...local.order]) {
    const key = cardKey(name)
    if (placed.has(key) || !byKey.has(key)) continue
    placed.add(key)
    order.push(byKey.get(key)!.name)
  }
  const cards = [...byKey.values()].sort((a, b) => a.addedAt - b.addedAt)
  for (const card of cards) {
    if (placed.has(cardKey(card.name))) continue
    placed.add(cardKey(card.name))
    order.push(card.name)
  }

  return { cards, order }
}

function latest(a: number | undefined, b: number | undefined): number | undefined {
  if (a === undefined) return b
  if (b === undefined) return a
  return Math.max(a, b)
}

/**
 * Union of two saved-pack lists. Packs are merged **by label**, not by id: the
 * auto-generated "Completed <date>" packs mint an id from Date.now(), so the
 * same day's pack has a different id on each device. clearCompleted already
 * merges same-label packs within a device, and this keeps that promise across
 * devices instead of showing two identically-named packs. The earliest pack
 * keeps its id, concepts are unioned (first appearance order), savedAt is the
 * most recent save.
 */
export function mergePacks(
  local: readonly SavedFlashcardPack[],
  remote: readonly SavedFlashcardPack[],
): SavedFlashcardPack[] {
  const byLabel = new Map<string, SavedFlashcardPack>()
  for (const pack of [...remote, ...local]) {
    if (!pack || typeof pack.label !== 'string') continue
    const seen = byLabel.get(pack.label)
    if (!seen) { byLabel.set(pack.label, { ...pack, concepts: [...pack.concepts] }); continue }
    const base = seen.savedAt <= pack.savedAt ? seen : pack
    const concepts = [...seen.concepts]
    const known = new Set(concepts.map(cardKey))
    for (const name of pack.concepts) {
      if (known.has(cardKey(name))) continue
      known.add(cardKey(name))
      concepts.push(name)
    }
    byLabel.set(pack.label, {
      id: base.id,
      label: pack.label,
      concepts,
      savedAt: Math.max(seen.savedAt, pack.savedAt),
    })
  }
  return [...byLabel.values()].sort((a, b) => a.savedAt - b.savedAt)
}

/** True when the two snapshots would produce identical server rows. */
export function snapshotsEqual(a: FlashcardSnapshot, b: FlashcardSnapshot): boolean {
  return JSON.stringify(normalize(a)) === JSON.stringify(normalize(b))
}

function normalize(s: FlashcardSnapshot) {
  return {
    collected: [...s.collected]
      .map(c => [cardKey(c.name), c.collectedAt] as const)
      .sort((x, y) => x[0].localeCompare(y[0])),
    cards: [...s.cards]
      .map(c => [cardKey(c.name), c.addedAt, c.completedAt ?? null] as const)
      .sort((x, y) => x[0].localeCompare(y[0])),
    order: s.order.map(cardKey),
    packs: [...s.packs]
      .map(p => [p.id, p.label, p.concepts.map(cardKey), p.savedAt] as const)
      .sort((x, y) => x[0].localeCompare(y[0])),
  }
}

// ── Which user this device last synced ────────────────────────────────────────

const SYNCED_USER_KEY = 'actuarial_flashcard_sync_user'

export function readSyncedUser(): string | null {
  try {
    return localStorage.getItem(SYNCED_USER_KEY)
  } catch {
    return null
  }
}

export function writeSyncedUser(userId: string): void {
  try {
    localStorage.setItem(SYNCED_USER_KEY, userId)
  } catch { /* quota exceeded */ }
}

/**
 * How this device should reconcile with the server for `userId`.
 *
 * - `union` — nobody has synced here before, so whatever is in localStorage is
 *   this learner's own guest work. Merge it in rather than wiping it.
 * - `replace` — either this user already unioned on this device (the server is
 *   now the source of truth, and a second union would resurrect cards deleted
 *   elsewhere), or the local state belongs to a *different* account that was
 *   signed in here, which must never be merged into this one.
 */
export function hydrateMode(): 'union' | 'replace' {
  return readSyncedUser() === null ? 'union' : 'replace'
}

// ── Server IO ─────────────────────────────────────────────────────────────────

interface CollectedRow {
  concept_key: string
  concept_name: string
  collected_at: string
}

interface DeckRow {
  concept_key: string
  concept_name: string
  kind: string
  path: string | null
  added_at: string
  completed_at: string | null
  sort_order: number | null
}

interface PackRow {
  pack_id: string
  label: string
  concepts: string[]
  saved_at: string
}

function toMillis(iso: string | null): number {
  if (!iso) return 0
  const ms = Date.parse(iso)
  return Number.isNaN(ms) ? 0 : ms
}

/**
 * Read the user's full flashcard state. Returns null when the read fails —
 * offline, or the migration hasn't been applied yet — which the caller treats as
 * "leave local state alone" rather than "the deck is empty".
 */
export async function fetchRemoteFlashcards(userId: string): Promise<FlashcardSnapshot | null> {
  try {
    const [collectedRes, deckRes, packRes] = await Promise.all([
      supabase.from('user_collected_cards').select('*').eq('user_id', userId),
      supabase.from('user_flashcards').select('*').eq('user_id', userId),
      supabase.from('user_flashcard_packs').select('*').eq('user_id', userId),
    ])
    const error = collectedRes.error ?? deckRes.error ?? packRes.error
    if (error) throw new Error(error.message)

    const collected = ((collectedRes.data ?? []) as CollectedRow[]).map(r => ({
      name: r.concept_name,
      collectedAt: toMillis(r.collected_at),
    }))

    const deckRows = ((deckRes.data ?? []) as DeckRow[]).slice()
    const cards: FlashCard[] = deckRows.map(r => ({
      kind: (r.kind || 'concept') as WikiEntryKind,
      name: r.concept_name,
      ...(r.path ? { path: r.path } : {}),
      addedAt: toMillis(r.added_at),
      ...(r.completed_at ? { completedAt: toMillis(r.completed_at) } : {}),
    }))
    // customOrder covers every card in the client (the Flashcards page appends
    // any that are missing), so rebuild it that way: ordered rows first, then
    // anything with no sort_order, oldest add first.
    const order = [
      ...deckRows
        .filter(r => r.sort_order !== null)
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)),
      ...deckRows
        .filter(r => r.sort_order === null)
        .sort((a, b) => toMillis(a.added_at) - toMillis(b.added_at)),
    ].map(r => r.concept_name)

    const packs = ((packRes.data ?? []) as PackRow[]).map(r => ({
      id: r.pack_id,
      label: r.label,
      concepts: r.concepts ?? [],
      savedAt: toMillis(r.saved_at),
    }))

    return { collected, cards, order, packs }
  } catch (err) {
    console.warn('fetchRemoteFlashcards failed; keeping local flashcards:', err)
    return null
  }
}

/**
 * Replace a table's rows for one user with `rows`, deleting whatever is no
 * longer present. The surviving keys are read back first so the delete can use
 * `.in(...)` — hand-building a `not.in` filter would have to quote concept names
 * containing commas or quotes ("Bayes' Theorem"), which is exactly the kind of
 * escaping bug that silently wipes a deck.
 */
async function replaceRows<Row extends Record<string, unknown>>(
  table: string,
  keyColumn: string,
  userId: string,
  rows: Row[],
): Promise<void> {
  const keys = rows.map(r => String(r[keyColumn]))

  if (rows.length > 0) {
    const { error } = await supabase
      .from(table)
      .upsert(rows, { onConflict: `user_id,${keyColumn}` })
    if (error) throw new Error(error.message)
  }

  const { data, error: readError } = await supabase
    .from(table)
    .select(keyColumn)
    .eq('user_id', userId)
  if (readError) throw new Error(readError.message)

  const keep = new Set(keys)
  const stale = ((data ?? []) as Record<string, unknown>[])
    .map(r => String(r[keyColumn]))
    .filter(k => !keep.has(k))
  if (stale.length === 0) return

  const { error: deleteError } = await supabase
    .from(table)
    .delete()
    .eq('user_id', userId)
    .in(keyColumn, stale)
  if (deleteError) throw new Error(deleteError.message)
}

async function pushCollected(userId: string, collected: readonly CollectedCard[]): Promise<void> {
  await replaceRows('user_collected_cards', 'concept_key', userId, collected.map(c => ({
    user_id: userId,
    concept_key: cardKey(c.name),
    concept_name: c.name,
    collected_at: new Date(c.collectedAt).toISOString(),
  })))
}

async function pushDeck(
  userId: string,
  cards: readonly FlashCard[],
  order: readonly string[],
): Promise<void> {
  const position = new Map(order.map((name, i) => [cardKey(name), i]))
  await replaceRows('user_flashcards', 'concept_key', userId, cards.map(c => ({
    user_id: userId,
    concept_key: cardKey(c.name),
    concept_name: c.name,
    kind: c.kind,
    path: c.path ?? null,
    added_at: new Date(c.addedAt).toISOString(),
    completed_at: c.completedAt ? new Date(c.completedAt).toISOString() : null,
    sort_order: position.get(cardKey(c.name)) ?? null,
  })))
}

async function pushPacks(userId: string, packs: readonly SavedFlashcardPack[]): Promise<void> {
  await replaceRows('user_flashcard_packs', 'pack_id', userId, packs.map(p => ({
    user_id: userId,
    pack_id: p.id,
    label: p.label,
    concepts: p.concepts,
    saved_at: new Date(p.savedAt).toISOString(),
  })))
}

// ── Write queue ───────────────────────────────────────────────────────────────
// Stores call the queue* helpers on every mutation. Writes are debounced so a
// drag-reorder or a burst of "add pack" clicks collapses into one round trip,
// and coalesced per kind (the queued snapshot is always the latest state, so a
// dropped intermediate write loses nothing).

const WRITE_DELAY_MS = 600

let syncUserId: string | null = null

/** Set by useFlashcardSync; null means guest (localStorage only, no writes). */
export function setSyncUser(userId: string | null): void {
  if (userId === syncUserId) return
  syncUserId = userId
  if (!userId) {
    pending.clear()
    for (const timer of timers.values()) clearTimeout(timer)
    timers.clear()
  }
}

export function getSyncUser(): string | null {
  return syncUserId
}

type WriteKind = 'collected' | 'deck' | 'packs'

const pending = new Map<WriteKind, () => Promise<void>>()
const timers = new Map<WriteKind, ReturnType<typeof setTimeout>>()
let inFlight = 0

/** True while a write is queued or running — used to hold off a server refresh. */
export function hasPendingWrites(): boolean {
  return pending.size > 0 || inFlight > 0
}

let generation = 0

/**
 * Counter bumped on every local mutation. A refresh reads it before fetching and
 * again before applying: if it moved, the learner changed something while the
 * request was in flight, so the response is stale and must not overwrite them.
 * `hasPendingWrites` alone doesn't cover this — a fast write can be queued *and*
 * flushed inside the fetch window, leaving nothing pending but a stale response.
 */
export function writeGeneration(): number {
  return generation
}

function queue(kind: WriteKind, write: (userId: string) => Promise<void>): void {
  generation++
  const userId = syncUserId
  if (!userId) return
  pending.set(kind, () => write(userId))
  const existing = timers.get(kind)
  if (existing) clearTimeout(existing)
  timers.set(kind, setTimeout(() => { void run(kind) }, WRITE_DELAY_MS))
}

async function run(kind: WriteKind): Promise<void> {
  timers.delete(kind)
  const write = pending.get(kind)
  if (!write) return
  pending.delete(kind)
  inFlight++
  try {
    await write()
  } catch (err) {
    // Never surface a sync failure into the UI: the local store is already
    // updated, and the next mutation (or the next hydrate) re-pushes the state.
    console.warn(`flashcard sync (${kind}) failed:`, err)
  } finally {
    inFlight--
  }
}

/** Flush every queued write now — on sign-out, and when the tab goes away. */
export async function flushFlashcardWrites(): Promise<void> {
  for (const timer of timers.values()) clearTimeout(timer)
  timers.clear()
  await Promise.all([...pending.keys()].map(kind => run(kind)))
}

export function queueCollectedSync(collected: readonly CollectedCard[]): void {
  const snapshot = [...collected]
  queue('collected', userId => pushCollected(userId, snapshot))
}

export function queueDeckSync(cards: readonly FlashCard[], order: readonly string[]): void {
  const cardsSnapshot = [...cards]
  const orderSnapshot = [...order]
  queue('deck', userId => pushDeck(userId, cardsSnapshot, orderSnapshot))
}

export function queuePacksSync(packs: readonly SavedFlashcardPack[]): void {
  const snapshot = [...packs]
  queue('packs', userId => pushPacks(userId, snapshot))
}

/** Push a whole snapshot at once — used by the first-sign-in union. */
export function queueSnapshotSync(snapshot: FlashcardSnapshot): void {
  queueCollectedSync(snapshot.collected)
  queueDeckSync(snapshot.cards, snapshot.order)
  queuePacksSync(snapshot.packs)
}
