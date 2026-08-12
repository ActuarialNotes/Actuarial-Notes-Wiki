// Vercel serverless function — published pass-rate statistics for one exam.
//
// The browser can't fetch these itself: the examining bodies serve no CORS
// headers, so a client-side request is blocked before it starts. This endpoint
// does the fetch server-side, parses whatever table the source publishes (see
// lib/passRates.js) and hands the app plain JSON. The response is cached at the
// CDN edge — pass ratios change twice a year, so one origin fetch serves
// everybody for hours.
//
// Environment variables:
//   PASS_RATE_SOURCES  — optional JSON object overriding the source table
//                        below, e.g.
//                        {"Exam 5":{"url":"https://…","format":"html"}}
//                        Set this to point at whichever page currently carries
//                        the statistics; no redeploy needed to re-aim it.
//
// Sources are operator-configured on purpose. Nothing is fetched unless a URL
// is configured for the exam, and the operator is responsible for confirming
// the source permits automated fetching.

import { extractPassRateRecords } from './lib/passRates.js';

// Ship empty: the app falls back to the authored catalogue in
// quiz/src/data/pastExams.ts until an operator configures a source, so a
// missing/renamed page degrades to "no live figures" rather than wrong ones.
const DEFAULT_SOURCES = {};

const FETCH_TIMEOUT_MS = 10000;
const MAX_BYTES = 5 * 1024 * 1024;
// Edge cache: six hours fresh, a week of stale-while-revalidate. A sitting's
// figures don't move once published, so serving a stale copy while refreshing
// is always better than making the user wait on the origin.
const CACHE_CONTROL = 'public, s-maxage=21600, stale-while-revalidate=604800';

function loadSources() {
  const configured = process.env.PASS_RATE_SOURCES;
  if (!configured) return DEFAULT_SOURCES;
  try {
    const parsed = JSON.parse(configured);
    return parsed && typeof parsed === 'object' ? { ...DEFAULT_SOURCES, ...parsed } : DEFAULT_SOURCES;
  } catch {
    return DEFAULT_SOURCES;
  }
}

async function fetchSource(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        // Identify the fetcher rather than impersonating a browser.
        'User-Agent': 'ActuarialNotesWiki/1.0 (+https://actuarialnotes.com)',
        Accept: 'text/html,text/csv,application/json;q=0.9,*/*;q=0.8',
      },
    });
    if (!response.ok) {
      return { error: `Source responded ${response.status}` };
    }
    const text = await response.text();
    if (text.length > MAX_BYTES) {
      return { error: 'Source response too large' };
    }
    return { text };
  } catch (err) {
    return { error: err?.name === 'AbortError' ? 'Source timed out' : `Fetch failed: ${err?.message || 'unknown error'}` };
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const exam = String(req.query?.exam ?? '').trim();
  if (!exam) return res.status(400).json({ error: 'Missing ?exam' });

  const source = loadSources()[exam];
  if (!source?.url) {
    // Not an error: the app treats "no source configured" as "use the authored
    // catalogue", which is the correct behaviour for an exam nobody publishes
    // per-sitting statistics for.
    res.setHeader('Cache-Control', CACHE_CONTROL);
    return res.status(200).json({ exam, configured: false, records: [], fetchedAt: new Date().toISOString() });
  }

  const { text, error } = await fetchSource(source.url);
  if (error) {
    return res.status(502).json({ exam, configured: true, error, records: [] });
  }

  const records = extractPassRateRecords(text, source.format ?? 'html');
  if (records.length === 0) {
    // The page loaded but nothing matched — a redesign, or the wrong URL. Say
    // so rather than caching an empty result for a week.
    return res.status(502).json({
      exam,
      configured: true,
      error: 'No pass-rate table found at the configured source',
      source: source.url,
      records: [],
    });
  }

  res.setHeader('Cache-Control', CACHE_CONTROL);
  return res.status(200).json({
    exam,
    configured: true,
    source: source.url,
    fetchedAt: new Date().toISOString(),
    records,
  });
}
