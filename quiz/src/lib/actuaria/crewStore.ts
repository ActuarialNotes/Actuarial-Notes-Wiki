// Sync glue for cohorts and raids (docs/actuaria-online.md §7.6, §7.7). All of
// it is server-side behind SECURITY DEFINER RPCs
// (supabase/migrations/20260930_actuaria_crews.sql) because a cohort is
// cross-user: the client never reads the member table, never writes a crew
// row, and never tells the boss whether an answer was right — raid hits go
// through quiz/api/raid.js (raidClient.ts). Signed-in only, like leagues, so
// there is no localStorage side.
//
// Fail-soft like leagueStore: every function resolves, never throws, and says
// what went wrong in words a screen can show. A CREW_EVENT is dispatched after
// each successful change so every hook reading the crew refetches.

import { supabase } from '@/lib/supabase'
import { parseCrew, parseThreads, type CrewView, type Thread } from './crews'
import { parseRaid, type RaidView } from './raid'

export const CREW_EVENT = 'actuarial_crew_updated'

export function dispatchCrewUpdated(): void {
  try {
    window.dispatchEvent(new CustomEvent(CREW_EVENT))
  } catch {
    /* non-browser */
  }
}

export interface Outcome<T> {
  data: T | null
  error: string | null
}

/** The message a database refusal carries — they are written to be shown. */
function reason(error: { message?: string } | null | undefined, fallback: string): string {
  const message = error?.message?.trim()
  return message && message.length < 160 ? message.replace(/^[a-z]/, c => c.toUpperCase()) : fallback
}

async function call<T>(fn: string, args: Record<string, unknown>, read: (raw: unknown) => T, fallback: string): Promise<Outcome<T>> {
  try {
    const { data, error } = await supabase.rpc(fn, args)
    if (error) return { data: null, error: reason(error, fallback) }
    return { data: read(data), error: null }
  } catch (err) {
    console.warn(`${fn} threw:`, err)
    return { data: null, error: fallback }
  }
}

async function mutate<T>(fn: string, args: Record<string, unknown>, read: (raw: unknown) => T, fallback: string): Promise<Outcome<T>> {
  const out = await call(fn, args, read, fallback)
  if (!out.error) dispatchCrewUpdated()
  return out
}

const asString = (raw: unknown) => (typeof raw === 'string' ? raw : null)
const asBool = (raw: unknown) => raw === true
const asInt = (raw: unknown) => (typeof raw === 'number' && Number.isFinite(raw) ? raw : 0)

export function fetchCrew(exam: string): Promise<Outcome<CrewView | null>> {
  return call('actuaria_get_crew', { p_exam: exam }, parseCrew, 'Couldn’t reach your cohort.')
}

export function createCrew(p: { exam: string; sitting: string; name: string; displayName: string; avatarUrl: string }) {
  return mutate('actuaria_create_crew', {
    p_exam: p.exam, p_sitting: p.sitting, p_name: p.name, p_display_name: p.displayName, p_avatar_url: p.avatarUrl,
  }, asString, 'Couldn’t start the cohort.')
}

export function joinCrew(code: string, displayName: string, avatarUrl: string) {
  return mutate('actuaria_join_crew', { p_code: code, p_display_name: displayName, p_avatar_url: avatarUrl }, asString, 'Couldn’t join that cohort.')
}

export function leaveCrew(crewId: string) {
  return mutate('actuaria_leave_crew', { p_crew: crewId }, () => true, 'Couldn’t leave the cohort.')
}

/** What a member shares of their progress; quiet — no event, it only refreshes a snapshot. */
export function shareProgress(p: { crewId: string; sectorZ: number; conceptZ: Record<string, number>; displayName: string; avatarUrl: string }) {
  return call('actuaria_share_progress', {
    p_crew: p.crewId, p_sector_z: p.sectorZ, p_concept_z: p.conceptZ, p_display_name: p.displayName, p_avatar_url: p.avatarUrl,
  }, () => true, 'Couldn’t share your progress.')
}

export function setGuide(crewId: string, passed: boolean) {
  return mutate('actuaria_set_guide', { p_crew: crewId, p_passed: passed }, () => true, 'Couldn’t change your role.')
}

export function nudge(crewId: string, memberId: string) {
  return mutate('actuaria_nudge', { p_crew: crewId, p_member: memberId }, asBool, 'Couldn’t send the nudge.')
}

export function challenge(crewId: string, memberId: string, code: string) {
  return mutate('actuaria_challenge', { p_crew: crewId, p_member: memberId, p_code: code }, asBool, 'Couldn’t send the challenge.')
}

export function fetchThreads(crewId: string): Promise<Outcome<Thread[]>> {
  return call('actuaria_get_threads', { p_crew: crewId }, parseThreads, 'Couldn’t load the questions.')
}

export function ask(crewId: string, body: string, concept: string | null) {
  return mutate('actuaria_ask', { p_crew: crewId, p_body: body, p_concept: concept }, asString, 'Couldn’t post the question.')
}

export function reply(threadId: string, body: string) {
  return mutate('actuaria_reply', { p_thread: threadId, p_body: body }, asString, 'Couldn’t post the reply.')
}

/** Returns the gems it paid the reply's author. */
export function acceptReply(replyId: string) {
  return mutate('actuaria_accept_reply', { p_reply: replyId }, asInt, 'Couldn’t accept the reply.')
}

export function fetchRaid(crewId: string): Promise<Outcome<RaidView | null>> {
  return call('actuaria_get_raid', { p_crew: crewId }, parseRaid, 'Couldn’t reach the raid.')
}
