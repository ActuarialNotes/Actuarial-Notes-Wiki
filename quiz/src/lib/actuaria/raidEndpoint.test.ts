import { describe, expect, it } from 'vitest'
import { handleRaid, raidConfig } from '../../../api/raid.js'

// Exercises quiz/api/raid.js with Supabase and the vault export stubbed. The
// rule it exists for (docs/actuaria-online.md §8.3): no client-reported
// correctness moves the boss. The player's session is checked with Supabase
// Auth, the answer is marked here with the AI connector's marking, and the
// hit is written with the service key — nothing a request body says about
// who, whether or how much is read.

const ENV = {
  SUPABASE_URL: 'https://proj.supabase.co',
  SUPABASE_ANON_KEY: 'anon-key',
  SUPABASE_SERVICE_ROLE_KEY: 'service-key',
}
const PLAYER = '11111111-1111-4111-8111-111111111111'
const CREW = '22222222-2222-4222-8222-222222222222'
const DRAW = '33333333-3333-4333-8333-333333333333'

const QUESTIONS = [
  { id: 'p-001', exam: 'P', type: 'multiple-choice', options: [{ key: 'A', text: '0.2' }, { key: 'B', text: '0.3' }, { key: 'C', text: '20' }], answer: 'C', concepts: ['Bayes Theorem'], difficulty: 'medium', offSyllabus: false },
  { id: 'p-002', exam: 'P', type: 'multiple-choice', options: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }], answer: 'A', concepts: ['Variance'], difficulty: 'hard', offSyllabus: false },
  { id: 'fm-001', exam: 'FM', type: 'multiple-choice', options: [{ key: 'A', text: '1' }, { key: 'B', text: '2' }], answer: 'B', concepts: ['Present Value'], difficulty: 'easy', offSyllabus: false },
  { id: '5-001', exam: '5', type: 'multi-part', options: [], answer: '', concepts: [], difficulty: 'hard', offSyllabus: false },
]
const KB = {
  kb: { questions: QUESTIONS },
  question: (id: string) => QUESTIONS.find(q => q.id.toLowerCase() === String(id).toLowerCase()) ?? null,
}

interface Call { url: string; headers: Record<string, string>; body: unknown }

function supabase(opts: { raid?: unknown; user?: string | null; rpcStatus?: number } = {}) {
  const calls: Call[] = []
  const fetchImpl = async (url: string, init: { headers?: Record<string, string>; body?: string } = {}) => {
    const call = { url, headers: init.headers ?? {}, body: init.body ? JSON.parse(init.body) : undefined }
    calls.push(call)
    const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status })
    if (url.endsWith('/auth/v1/user')) {
      return call.headers.Authorization === 'Bearer player-token' && opts.user !== null
        ? json(200, { id: opts.user ?? PLAYER })
        : json(401, { message: 'invalid JWT' })
    }
    if (opts.rpcStatus) return json(opts.rpcStatus, { message: 'not a member of this cohort' })
    if (url.endsWith('/rpc/actuaria_get_raid')) {
      return json(200, opts.raid ?? {
        status: 'active', exam: 'P', members: 3,
        raid: { id: 'r1', boss_max: 3000, boss_health: 3000, phase: 'open' },
        weak_spots: [{ concept: 'Bayes Theorem', z: 0.1 }], answered: [],
      })
    }
    if (url.endsWith('/rpc/actuaria_raid_draw')) return json(200, DRAW)
    if (url.endsWith('/rpc/actuaria_raid_hit')) {
      const b = call.body as { p_correct: boolean }
      return json(200, { correct: b.p_correct, damage: b.p_correct ? 140 : 0, healed: 0, boss_health: b.p_correct ? 2860 : 3000, boss_max: 3000, phase: 'open' })
    }
    return json(404, {})
  }
  return { calls, fetchImpl }
}

const post = (body: unknown, token: string | null = 'player-token') => ({
  method: 'POST',
  headers: token ? { authorization: `Bearer ${token}` } : {},
  body,
})

async function run(req: ReturnType<typeof post>, sb = supabase()) {
  const out = await handleRaid(req, { env: ENV, fetchImpl: sb.fetchImpl, loadKb: async () => KB, random: () => 0.5 })
  return { ...out, calls: sb.calls }
}

describe('api/raid.js', () => {
  it('needs its configuration, a POST and a session', async () => {
    expect(raidConfig({})).toBeNull()
    expect((await handleRaid({ method: 'POST', headers: {}, body: {} }, { env: {} })).status).toBe(503)
    expect((await run({ ...post({}), method: 'GET' })).status).toBe(405)
    expect((await run(post({ action: 'draw', crew: CREW }, null))).status).toBe(401)
    const bad = await run(post({ action: 'draw', crew: CREW }, 'forged-token'))
    expect(bad.status).toBe(401)
    expect(bad.calls.some(c => c.url.includes('/rpc/'))).toBe(false)
  })

  it('draws on the crew’s weak spots, as the player, and records the draw with the service key', async () => {
    const out = await run(post({ action: 'draw', crew: CREW, user: 'someone-else' }))
    expect(out.status).toBe(200)
    expect(out.json).toMatchObject({ draw: DRAW, phase: 'open' })
    expect((out.json as { questions: string[] }).questions).toEqual(['p-001', 'p-002'])

    const [, getRaid, draw] = out.calls
    expect(getRaid.url).toBe('https://proj.supabase.co/rest/v1/rpc/actuaria_get_raid')
    expect(getRaid.headers).toMatchObject({ apikey: 'anon-key', Authorization: 'Bearer player-token' })
    expect(draw.url).toBe('https://proj.supabase.co/rest/v1/rpc/actuaria_raid_draw')
    expect(draw.headers).toMatchObject({ apikey: 'service-key', Authorization: 'Bearer service-key' })
    // Who is drawing is the session's player, never the body's.
    expect(draw.body).toEqual({ p_user: PLAYER, p_crew: CREW, p_question_ids: ['p-001', 'p-002'] })
  })

  it('refuses a draw while the crew forms or once the boss is down', async () => {
    const forming = await run(post({ action: 'draw', crew: CREW }), supabase({ raid: { status: 'forming', needed: 1 } }))
    expect(forming.status).toBe(409)
    const down = await run(post({ action: 'draw', crew: CREW }), supabase({ raid: { status: 'defeated' } }))
    expect(down.status).toBe(409)
    expect(down.calls.some(c => c.url.endsWith('actuaria_raid_draw'))).toBe(false)
  })

  it('marks the answer itself — a body claiming "correct" moves nothing', async () => {
    const out = await run(post({ action: 'answer', draw: DRAW, question: 'p-001', choice: 'A', correct: true, damage: 9999 }))
    expect(out.status).toBe(200)
    const hit = out.calls.find(c => c.url.endsWith('/rpc/actuaria_raid_hit'))!
    expect(hit.headers).toMatchObject({ apikey: 'service-key' })
    expect(hit.body).toEqual({ p_user: PLAYER, p_draw: DRAW, p_question: 'p-001', p_correct: false, p_pace_seconds: 360 })
    expect(out.json).toMatchObject({ correct: false, damage: 0 })
  })

  it('reads an answer the way check_answer does', async () => {
    for (const choice of ['C', '(c)', 'C) 20', '20']) {
      const out = await run(post({ action: 'answer', draw: DRAW, question: 'p-001', choice }))
      expect(out.json, choice).toMatchObject({ correct: true, damage: 140 })
    }
  })

  it('times a question at its own exam’s pace', async () => {
    const out = await run(post({ action: 'answer', draw: DRAW, question: 'fm-001', choice: 'B' }))
    expect(out.calls.find(c => c.url.endsWith('actuaria_raid_hit'))!.body).toMatchObject({ p_pace_seconds: 300, p_correct: true })
  })

  it('refuses what it cannot mark, before touching the boss', async () => {
    for (const body of [
      { action: 'answer', draw: DRAW, question: 'p-001', choice: 'Z' },
      { action: 'answer', draw: DRAW, question: 'nope', choice: 'A' },
      { action: 'answer', draw: DRAW, question: '5-001', choice: 'A' },
      { action: 'answer', draw: 'not-a-uuid', question: 'p-001', choice: 'A' },
      { action: 'answer', draw: DRAW, question: 'p-001' },
      { action: 'fight' },
    ]) {
      const out = await run(post(body))
      expect(out.status, JSON.stringify(body)).toBe(400)
      expect(out.calls.some(c => c.url.endsWith('actuaria_raid_hit'))).toBe(false)
    }
  })

  it('passes a refusal from the database on', async () => {
    const out = await run(post({ action: 'draw', crew: CREW }), supabase({ rpcStatus: 400 }))
    expect(out).toMatchObject({ status: 409, json: { error: 'not a member of this cohort' } })
  })
})
