// The client's half of a raid (docs/actuaria-online.md §7.7): ask
// quiz/api/raid.js for a run of questions, and hand it each answer to mark.
// It sends only what was chosen — the function marks it against the vault
// export and the database times it, so nothing here decides a hit.

import { supabase } from '@/lib/supabase'
import { parsePhase, type RaidPhase } from './crews'

/** Fired on the window when an answer has landed on the boss. */
export const RAID_HIT_EVENT = 'actuaria_raid_hit'

export interface RaidHit {
  correct: boolean
  damage: number
  healed: number
  bossHealth: number
  bossMax: number
  phase: RaidPhase
}

async function post(body: Record<string, unknown>): Promise<{ ok: boolean; json: Record<string, unknown> }> {
  const { data } = await supabase.auth.getSession()
  const token = data.session?.access_token
  if (!token) return { ok: false, json: { error: 'Sign in to raid' } }
  const res = await fetch('/api/raid', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  })
  let json: Record<string, unknown> = {}
  try {
    json = (await res.json()) as Record<string, unknown>
  } catch { /* not JSON */ }
  return { ok: res.ok, json }
}

export async function raidDraw(crewId: string): Promise<{ draw: string; questions: string[] } | { error: string }> {
  try {
    const { ok, json } = await post({ action: 'draw', crew: crewId })
    const draw = typeof json.draw === 'string' ? json.draw : null
    const questions = Array.isArray(json.questions) ? json.questions.filter((q): q is string => typeof q === 'string') : []
    if (!ok || !draw || questions.length === 0) return { error: typeof json.error === 'string' ? json.error : 'The raid couldn’t be reached.' }
    return { draw, questions }
  } catch {
    return { error: 'The raid couldn’t be reached.' }
  }
}

/** Hand one answer to the boss. The first answer to a question is the one that counts. */
export async function reportRaidHit(draw: string, question: string, choice: string): Promise<RaidHit | null> {
  try {
    const { ok, json } = await post({ action: 'answer', draw, question, choice })
    if (!ok) return null
    const n = (x: unknown) => (typeof x === 'number' && Number.isFinite(x) ? x : 0)
    const hit: RaidHit = {
      correct: json.correct === true,
      damage: n(json.damage),
      healed: n(json.healed),
      bossHealth: n(json.boss_health),
      bossMax: n(json.boss_max),
      phase: parsePhase(json.phase) ?? 'open',
    }
    try {
      window.dispatchEvent(new CustomEvent<RaidHit>(RAID_HIT_EVENT, { detail: hit }))
    } catch { /* non-browser */ }
    return hit
  } catch {
    return null
  }
}

/** The quiz a run is played as: an ordinary quiz by id, so its answers save as any quiz's do. */
export function raidQuizPath(draw: string, questions: readonly string[]): string {
  const params = new URLSearchParams({ ids: questions.join(','), raid: draw, reveal: 'during' })
  return `/quiz?${params.toString()}`
}
