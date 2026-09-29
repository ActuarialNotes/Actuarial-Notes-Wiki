// Vercel serverless function — the raid's server marking (docs/actuaria-online.md
// §7.7, §8.3). A raid is solo answering against a crew's shared boss, and the
// boss is shared state, so the client never says what it was served or whether
// it was right:
//
//   POST /api/raid   Authorization: Bearer <the player's Supabase access token>
//     { "action": "draw", "crew": "<uuid>" }
//        → { "draw": "<uuid>", "questions": ["p-012", …], "phase": "open" }
//     { "action": "answer", "draw": "<uuid>", "question": "p-012", "choice": "C" }
//        → { "correct": true, "damage": 138, "healed": 0, "boss_health": 2862, "boss_max": 3000, "phase": "open" }
//
// The draw is made here, from the vault export the AI connector reads
// (_mcp/load.js), on the crew's weak spots; the answer is marked here with the
// connector's own marking (`markChoice`, check_answer's); and both are written
// through service-role RPCs no client may call (actuaria_raid_draw,
// actuaria_raid_hit), which time the answer by the database's clock. Anything
// else in a request body — a "correct" or a "damage" — is never read.
//
// Environment:
//   SUPABASE_URL / VITE_SUPABASE_URL             the project
//   SUPABASE_ANON_KEY / VITE_SUPABASE_ANON_KEY   to check the player's session
//   SUPABASE_SERVICE_ROLE_KEY                    to write draws and hits
//   MCP_KB_URL                                   (optional) as for api/mcp.js

import { knowledgeBaseUrl, loadIndex } from './_mcp/load.js'
import { markChoice } from './_mcp/server.js'
import { drawRaidQuestions, isRaidQuestion, kbExamKey, raidPaceSeconds } from './_raid/rules.js'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

class RaidError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

export function raidConfig(env = process.env) {
  const url = env.SUPABASE_URL || env.VITE_SUPABASE_URL
  const anon = env.SUPABASE_ANON_KEY || env.VITE_SUPABASE_ANON_KEY
  const service = env.SUPABASE_SERVICE_ROLE_KEY
  return url && anon && service ? { url: String(url).replace(/\/+$/, ''), anon, service } : null
}

function bearer(headers) {
  const raw = headers?.authorization ?? headers?.Authorization
  const m = typeof raw === 'string' ? /^Bearer\s+(\S+)$/i.exec(raw.trim()) : null
  return m ? m[1] : null
}

async function readJson(res) {
  const text = await res.text()
  try {
    return text ? JSON.parse(text) : null
  } catch {
    return null
  }
}

/** A Supabase RPC, as the player (their token) or as the function (the service key). */
async function rpc(cfg, fetchImpl, name, args, { token, service = false }) {
  const key = service ? cfg.service : cfg.anon
  const res = await fetchImpl(`${cfg.url}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${service ? cfg.service : token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(args),
  })
  const body = await readJson(res)
  if (!res.ok) {
    const message = typeof body?.message === 'string' ? body.message : `${name} failed`
    throw new RaidError(res.status === 401 || res.status === 403 ? 403 : 409, message)
  }
  return body
}

/** The player behind a session token, asked of Supabase Auth — never taken from the body. */
async function playerId(cfg, fetchImpl, token) {
  const res = await fetchImpl(`${cfg.url}/auth/v1/user`, {
    headers: { apikey: cfg.anon, Authorization: `Bearer ${token}` },
  })
  if (!res.ok) return null
  const user = await readJson(res)
  return typeof user?.id === 'string' && UUID.test(user.id) ? user.id : null
}

const str = (x, max) => (typeof x === 'string' && x.length > 0 && x.length <= max ? x : null)

/**
 * One request, framework-free: `{ status, json }`. `deps` are the fetch, the
 * knowledge-base loader and the environment, injectable for the tests.
 */
export async function handleRaid({ method, headers, body }, deps = {}) {
  const env = deps.env ?? process.env
  const fetchImpl = deps.fetchImpl ?? fetch
  const loadKb = deps.loadKb ?? (() => loadIndex(knowledgeBaseUrl(headers, env)))
  const random = deps.random ?? Math.random

  if (method !== 'POST') return { status: 405, json: { error: 'POST only' } }
  const cfg = raidConfig(env)
  if (!cfg) return { status: 503, json: { error: 'Raids are not configured on this deployment' } }
  const token = bearer(headers)
  if (!token) return { status: 401, json: { error: 'Sign in to raid' } }
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { status: 400, json: { error: 'Expected a JSON body' } }

  try {
    const user = await playerId(cfg, fetchImpl, token)
    if (!user) return { status: 401, json: { error: 'Sign in to raid' } }

    if (body.action === 'draw') {
      const crew = str(body.crew, 36)
      if (!crew || !UUID.test(crew)) return { status: 400, json: { error: 'Which cohort?' } }
      // Membership, the boss's phase, the weak spots and what this player has
      // already hit, as the player: the RPC answers only a member.
      const raid = await rpc(cfg, fetchImpl, 'actuaria_get_raid', { p_crew: crew }, { token })
      if (raid?.status !== 'active') return { status: 409, json: { error: raid?.status === 'defeated' ? 'The boss is already defeated' : 'The raid opens at three members' } }
      const ix = await loadKb()
      const picked = drawRaidQuestions(ix.kb.questions, {
        exam: kbExamKey(raid.exam),
        weakSpots: Array.isArray(raid.weak_spots) ? raid.weak_spots.map(w => w?.concept).filter(c => typeof c === 'string') : [],
        answered: Array.isArray(raid.answered) ? raid.answered.filter(q => typeof q === 'string') : [],
        phase: raid.raid?.phase,
        random,
      })
      if (picked.length === 0) return { status: 409, json: { error: 'No questions left for this raid' } }
      const ids = picked.map(q => q.id)
      const draw = await rpc(cfg, fetchImpl, 'actuaria_raid_draw', { p_user: user, p_crew: crew, p_question_ids: ids }, { service: true })
      return { status: 200, json: { draw, questions: ids, phase: raid.raid?.phase ?? 'open' } }
    }

    if (body.action === 'answer') {
      const draw = str(body.draw, 36)
      const question = str(body.question, 80)
      const choice = str(body.choice, 40)
      if (!draw || !UUID.test(draw) || !question || !choice) return { status: 400, json: { error: 'Expected a draw, a question and a choice' } }
      const ix = await loadKb()
      const q = ix.question(question)
      if (!q || !isRaidQuestion(q)) return { status: 400, json: { error: 'Not a raid question' } }
      const { letter, correct } = markChoice(q, choice)
      if (letter === null) return { status: 400, json: { error: 'Not one of the options' } }
      const hit = await rpc(cfg, fetchImpl, 'actuaria_raid_hit', {
        p_user: user,
        p_draw: draw,
        p_question: q.id,
        p_correct: correct,
        p_pace_seconds: raidPaceSeconds(q.exam),
      }, { service: true })
      return { status: 200, json: { ...hit, correct } }
    }

    return { status: 400, json: { error: 'Unknown action' } }
  } catch (err) {
    if (err instanceof RaidError) return { status: err.status, json: { error: err.message } }
    console.error('[raid]', err)
    return { status: 502, json: { error: 'The raid could not be reached' } }
  }
}

export default async function handler(req, res) {
  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    body = null
  }
  const out = await handleRaid({ method: req.method, headers: req.headers ?? {}, body })
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  return res.status(out.status).end(JSON.stringify(out.json))
}
