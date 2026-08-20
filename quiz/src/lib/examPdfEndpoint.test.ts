import { describe, it, expect, afterEach, vi } from 'vitest'
// Exercises the serverless handler itself (quiz/api/exam-pdf.js) with the network
// stubbed. What matters here is the refusals: this endpoint takes a URL from
// the client, so the allowlist is the only thing between it and an open proxy.
import handler, { resolvePdfTarget } from '../../api/exam-pdf.js'

const REPORT = 'https://www.casact.org/sites/default/files/2021-02/admissions_studytools_exam5_sp19-5.pdf'

function pdfBody(): ArrayBuffer {
  return new TextEncoder().encode('%PDF-1.4\n…').buffer
}

function mockRes() {
  const res = {
    statusCode: 0,
    body: undefined as unknown,
    headers: {} as Record<string, string>,
    status(code: number) { res.statusCode = code; return res },
    json(payload: unknown) { res.body = payload; return res },
    send(payload: unknown) { res.body = payload; return res },
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

afterEach(() => {
  vi.unstubAllEnvs()
  vi.unstubAllGlobals()
})

describe('resolvePdfTarget', () => {
  it('accepts an allowlisted publisher PDF', () => {
    expect(resolvePdfTarget(REPORT)).toMatchObject({ url: REPORT, hostname: 'www.casact.org' })
  })

  it('refuses another host, another scheme, or a non-PDF path', () => {
    expect(resolvePdfTarget('https://example.com/a.pdf').error).toMatch(/Host not allowed/)
    expect(resolvePdfTarget('http://www.casact.org/a.pdf').error).toMatch(/https/)
    expect(resolvePdfTarget('https://www.casact.org/exams').error).toMatch(/not a PDF/)
    expect(resolvePdfTarget('file:///etc/passwd').error).toBeTruthy()
    expect(resolvePdfTarget('').error).toMatch(/Missing/)
  })

  it('takes its allowlist from the operator when one is configured', () => {
    expect(resolvePdfTarget('https://a.test/x.pdf', ['a.test']).url).toBe('https://a.test/x.pdf')
  })
})

describe('GET /api/exam-pdf', () => {
  it('serves the paper inline, cached hard — a past paper never changes', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(pdfBody(), { status: 200 })))
    const res = await call({ query: { url: REPORT } })

    expect(res.statusCode).toBe(200)
    expect(res.headers['Content-Type']).toBe('application/pdf')
    expect(res.headers['Content-Disposition']).toContain('inline')
    expect(res.headers['Content-Disposition']).toContain('admissions_studytools_exam5_sp19-5.pdf')
    expect(res.headers['Cache-Control']).toContain('s-maxage=86400')
  })

  it('serves it as an attachment when the download button asks', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(pdfBody(), { status: 200 })))
    const res = await call({ query: { url: REPORT, download: '1' } })

    expect(res.headers['Content-Disposition']).toContain('attachment')
  })

  it('never fetches a URL outside the allowlist', async () => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    const res = await call({ query: { url: 'https://internal.example/secrets.pdf' } })

    expect(res.statusCode).toBe(400)
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('refuses a redirect that lands off the allowlist', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => {
      const response = new Response(pdfBody(), { status: 200 })
      Object.defineProperty(response, 'url', { value: 'https://elsewhere.test/a.pdf' })
      return response
    }))
    const res = await call({ query: { url: REPORT } })

    expect(res.statusCode).toBe(502)
    expect(res.body).toMatchObject({ error: expect.stringContaining('Redirected off-source') })
  })

  it('passes a missing document through as a 404, not a blank viewer', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('nope', { status: 404 })))
    const res = await call({ query: { url: REPORT } })

    expect(res.statusCode).toBe(404)
  })

  it('rejects an HTML error page dressed as a 200', async () => {
    // Publishers answer 200 with a "page not found" page often enough that
    // serving it as a PDF would just render an empty frame.
    vi.stubGlobal('fetch', vi.fn(async () => new Response('<html>Not found</html>', { status: 200 })))
    const res = await call({ query: { url: REPORT } })

    expect(res.statusCode).toBe(502)
    expect(res.body).toMatchObject({ error: expect.stringContaining('did not return a PDF') })
  })

  it('reports a source that never answers', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => {
      const err = new Error('aborted')
      err.name = 'AbortError'
      throw err
    }))
    const res = await call({ query: { url: REPORT } })

    expect(res.statusCode).toBe(504)
    expect(res.body).toMatchObject({ error: 'Source timed out' })
  })

  it('answers a preflight and turns away a write', async () => {
    expect((await call({ method: 'OPTIONS' })).statusCode).toBe(204)
    expect((await call({ method: 'POST', query: { url: REPORT } })).statusCode).toBe(405)
  })
})
