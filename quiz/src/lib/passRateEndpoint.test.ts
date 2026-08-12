import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
// Exercises the serverless handler itself (api/pass-rates.js) with the network
// stubbed — the fetch, the source config and the failure paths, none of which
// the parser suite covers. Vercel runs this file as ESM; vitest transforms it
// the same way.
import handler from '../../../api/pass-rates.js'

const TABLE = `
  <table>
    <tr><th>Sitting</th><th>Exams Taken</th><th>Pass Ratio</th><th>Effective Pass Ratio</th></tr>
    <tr><td>Spring 2019</td><td>1,234</td><td>42.0%</td><td>46.2%</td></tr>
  </table>
`

function mockRes() {
  const res = {
    statusCode: 0,
    body: undefined as unknown,
    headers: {} as Record<string, string>,
    status(code: number) { res.statusCode = code; return res },
    json(payload: unknown) { res.body = payload; return res },
    setHeader(key: string, value: string) { res.headers[key] = value },
    end() { return res },
  }
  return res
}

const call = async (req: Record<string, unknown>) => {
  const res = mockRes()
  await handler({ method: 'GET', query: {}, ...req }, res)
  return res
}

describe('GET /api/pass-rates', () => {
  beforeEach(() => {
    vi.stubEnv('PASS_RATE_SOURCES', JSON.stringify({
      'Exam 5': { url: 'https://example.test/exam5', format: 'html' },
    }))
  })
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.unstubAllGlobals()
  })

  it('returns the parsed records for a configured exam', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(TABLE, { status: 200 })))
    const res = await call({ query: { exam: 'Exam 5' } })

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({
      exam: 'Exam 5',
      configured: true,
      source: 'https://example.test/exam5',
      records: [{ year: 2019, session: 'Spring', candidates: 1234, passRate: 42, effectivePassRate: 46.2 }],
    })
  })

  it('lets the CDN hold the answer — one origin fetch serves everybody', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(TABLE, { status: 200 })))
    const res = await call({ query: { exam: 'Exam 5' } })
    expect(res.headers['Cache-Control']).toMatch(/s-maxage=\d+/)
  })

  it('reports an unconfigured exam as an empty success, not an error', async () => {
    const fetchSpy = vi.fn()
    vi.stubGlobal('fetch', fetchSpy)
    const res = await call({ query: { exam: 'Probability' } })

    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ configured: false, records: [] })
    expect(fetchSpy).not.toHaveBeenCalled()
  })

  it('fails loudly when the source is unreachable, so a bad URL is visible', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('nope', { status: 404 })))
    const res = await call({ query: { exam: 'Exam 5' } })

    expect(res.statusCode).toBe(502)
    expect(res.body).toMatchObject({ records: [] })
    expect((res.body as { error: string }).error).toMatch(/404/)
  })

  it('fails loudly when the page loads but holds no pass-rate table', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('<p>redesigned</p>', { status: 200 })))
    const res = await call({ query: { exam: 'Exam 5' } })

    expect(res.statusCode).toBe(502)
    expect((res.body as { error: string }).error).toMatch(/No pass-rate table/)
    expect(res.headers['Cache-Control']).toBeUndefined()
  })

  it('survives a network throw', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('ECONNREFUSED') }))
    const res = await call({ query: { exam: 'Exam 5' } })
    expect(res.statusCode).toBe(502)
  })

  it('ignores a malformed PASS_RATE_SOURCES rather than crashing', async () => {
    vi.stubEnv('PASS_RATE_SOURCES', '{not json')
    vi.stubGlobal('fetch', vi.fn())
    const res = await call({ query: { exam: 'Exam 5' } })
    expect(res.statusCode).toBe(200)
    expect(res.body).toMatchObject({ configured: false })
  })

  it('rejects a missing exam and a non-GET method', async () => {
    expect((await call({ query: {} })).statusCode).toBe(400)
    expect((await call({ method: 'POST', query: { exam: 'Exam 5' } })).statusCode).toBe(405)
    expect((await call({ method: 'OPTIONS' })).statusCode).toBe(204)
  })
})
