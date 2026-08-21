// Vercel serverless function — serves an examining body's PDF from our own
// origin so the app can show it in a viewer instead of throwing the learner out
// to a browser tab.
//
// Three things make the direct URL unusable in-page:
//   • the publishers send no `Access-Control-Allow-Origin`, so the browser can't
//     read the bytes itself (the same reason `api/pass-rates.js` exists);
//   • an origin may refuse to be framed at all (`X-Frame-Options`), which turns
//     an embedded viewer into a blank rectangle;
//   • `<a download>` is ignored cross-origin, so a "download" of a casact.org
//     PDF navigates away rather than saving.
// Proxying the file through this endpoint fixes all three at once, and lets the
// response be cached at the CDN edge — these papers are frozen documents, so
// one origin fetch serves everybody.
//
// Only the examining bodies' own hosts are reachable through here: this takes a
// URL from the client, so without an allowlist it would be an open proxy.
// Override the list with the EXAM_PDF_HOSTS environment variable (a
// comma-separated host list) if a body moves its documents.
//
// It lives under `quiz/api/` rather than the repo-root `api/` because the quiz
// app is its own Vercel project rooted at `quiz/`: a function in the root
// project isn't on the app's origin, and `quiz/vercel.json`'s SPA rewrite would
// answer `/api/exam-pdf` with `index.html` — which the viewer receives as a
// document whose structure is invalid. Same origin, same project, no rewrite.

// The publishers whose PDFs the app links to and can therefore re-serve: the
// two examining bodies, plus the Actuarial Standards Board, whose ASOPs are
// source material on the Exam 5+ syllabi and are read the same way.
const DEFAULT_HOSTS = [
  'casact.org',
  'www.casact.org',
  'soa.org',
  'www.soa.org',
  'actuarialstandardsboard.org',
  'www.actuarialstandardsboard.org',
];

const FETCH_TIMEOUT_MS = 20000;
const MAX_BYTES = 40 * 1024 * 1024;
// A past paper never changes. Cache it hard: a day fresh at the edge, a month
// of stale-while-revalidate.
const CACHE_CONTROL = 'public, s-maxage=86400, stale-while-revalidate=2592000';

function allowedHosts() {
  const configured = process.env.EXAM_PDF_HOSTS;
  if (!configured) return DEFAULT_HOSTS;
  const hosts = configured
    .split(',')
    .map(h => h.trim().toLowerCase())
    .filter(Boolean);
  return hosts.length > 0 ? hosts : DEFAULT_HOSTS;
}

/**
 * The requested URL, if it is one this endpoint is willing to fetch: an https
 * URL to a `.pdf` on an allowlisted host. Anything else — another scheme, a
 * host we don't publish links for, a path that isn't a document — is refused
 * rather than fetched, so this can't be used to reach arbitrary URLs.
 */
export function resolvePdfTarget(rawUrl, hosts = allowedHosts()) {
  if (typeof rawUrl !== 'string' || rawUrl.trim() === '') {
    return { error: 'Missing ?url' };
  }
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { error: 'Malformed url' };
  }
  if (parsed.protocol !== 'https:') return { error: 'Only https sources are allowed' };
  if (!hosts.includes(parsed.hostname.toLowerCase())) {
    return { error: `Host not allowed: ${parsed.hostname}` };
  }
  if (!/\.pdf$/i.test(parsed.pathname)) return { error: 'Source is not a PDF' };
  return { url: parsed.toString(), hostname: parsed.hostname };
}

/** `sp19-5.pdf` from the source URL — what the file is called when saved. */
export function pdfFileName(url) {
  try {
    const name = new URL(url).pathname.split('/').pop();
    return name && /\.pdf$/i.test(name) ? name : 'exam.pdf';
  } catch {
    return 'exam.pdf';
  }
}

export default async function handler(req, res) {
  // The root project's vercel.json adds CORS headers to its own /api/*; this
  // one is in the quiz project, so it carries its own — a split deployment
  // pointing VITE_EXAM_PDF_URL here needs them.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const hosts = allowedHosts();
  const target = resolvePdfTarget(req.query?.url, hosts);
  if (target.error) return res.status(400).json({ error: target.error });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const upstream = await fetch(target.url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        // Identify the fetcher rather than impersonating a browser.
        'User-Agent': 'ActuarialNotesWiki/1.0 (+https://actuarialnotes.com)',
        Accept: 'application/pdf,*/*;q=0.8',
      },
    });

    // A redirect can land anywhere, so the allowlist is re-checked against
    // where the fetch actually ended up, not only where it was aimed.
    const landed = resolvePdfTarget(upstream.url || target.url, hosts);
    if (landed.error) return res.status(502).json({ error: `Redirected off-source: ${landed.error}` });

    if (!upstream.ok) {
      return res.status(upstream.status === 404 ? 404 : 502).json({
        error: `Source responded ${upstream.status}`,
        source: target.url,
      });
    }

    const buffer = Buffer.from(await upstream.arrayBuffer());
    if (buffer.byteLength > MAX_BYTES) {
      return res.status(502).json({ error: 'Source PDF too large' });
    }
    // The publishers occasionally answer 200 with an HTML "not found" page.
    // Serving that as a PDF would render as a blank viewer; saying so is better.
    if (buffer.subarray(0, 5).toString('latin1') !== '%PDF-') {
      return res.status(502).json({ error: 'Source did not return a PDF', source: target.url });
    }

    const fileName = pdfFileName(target.url);
    const disposition = req.query?.download === '1' ? 'attachment' : 'inline';
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `${disposition}; filename="${fileName}"`);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', CACHE_CONTROL);
    if (req.method === 'HEAD') return res.status(200).end();
    return res.status(200).send(buffer);
  } catch (err) {
    const timedOut = err?.name === 'AbortError';
    return res.status(504).json({
      error: timedOut ? 'Source timed out' : `Fetch failed: ${err?.message || 'unknown error'}`,
      source: target.url,
    });
  } finally {
    clearTimeout(timer);
  }
}
