// Vercel serverless function — the Amazon price on a resource card's "Get a
// copy" menu, read from Amazon's own Creators API.
//
//   GET /api/amazon-price?isbn=9780135189399
//   → { price: { amount, currency, display }, url, asOf }   a price Amazon returned
//   → { price: null }                                      anything else
//
// Why an API and not the product page: Amazon answers automated requests for
// its pages with a 503 that points at its APIs, and its Associates policies let
// a site show an Amazon price only if Amazon serves it (Creators API, which
// replaced the Product Advertising API in May 2026). So the credentials here
// are an Amazon Associates account's, and `url` is the detail-page link the API
// vends with the account's partner tag — returned untouched, because Amazon
// attributes a sale only to the exact link it handed out.
//
// The rule the rest of the app keeps for pass rates and examiner's reports
// holds here too: a figure is transcribed, never constructed. A price is shown
// only for the book the page describes — the item Amazon returns must carry
// the page's ISBN — and only as Amazon states it. Anything short of that (no
// credentials, a book Amazon doesn't carry, no new offer, a price Amazon's MAP
// policy says not to show, a throttle, a timeout) is `price: null`, and the
// menu simply shows no price. It is never an error the reader sees.
//
// Caching follows Amazon's licence: offers may be cached for an hour, and a
// client application may not cache them at all. So the CDN keeps a response for
// an hour (`s-maxage`) and the browser keeps nothing (`max-age=0`); `asOf` is
// when Amazon was actually asked, which the menu prints beside the price.
//
// Environment variables (Vercel project settings, never VITE_*):
//   AMAZON_CREATORS_CREDENTIAL_ID      from Associates Central → Creators API
//   AMAZON_CREATORS_CREDENTIAL_SECRET  shown once, when the credential is made
//   AMAZON_CREATORS_VERSION            the credential's version (default 3.1,
//                                      North America — what www.amazon.com uses)
//   AMAZON_PARTNER_TAG                 the store's tracking id, e.g. yourtag-20
//
// It lives under `quiz/api/` for the reason `exam-pdf.js` gives: the app is its
// own Vercel project, and a function outside it isn't on the app's origin.

const API_BASE = 'https://creatorsapi.amazon/catalog/v1'
const MARKETPLACE = 'www.amazon.com'
const FETCH_TIMEOUT_MS = 8000

// The credential version decides where its token comes from and how it is
// asked for — transcribed from Amazon's Node SDK (src/auth/OAuth2Config.js).
// 3.x is Login with Amazon (a JSON body); 2.x is Cognito (form-encoded, and the
// version rides along in the Authorization header).
const TOKEN_ENDPOINTS = {
  '2.1': 'https://creatorsapi.auth.us-east-1.amazoncognito.com/oauth2/token',
  '2.2': 'https://creatorsapi.auth.eu-south-2.amazoncognito.com/oauth2/token',
  '2.3': 'https://creatorsapi.auth.us-west-2.amazoncognito.com/oauth2/token',
  '3.1': 'https://api.amazon.com/auth/o2/token',
  '3.2': 'https://api.amazon.co.uk/auth/o2/token',
  '3.3': 'https://api.amazon.co.jp/auth/o2/token',
}

// Offers for an hour at the edge (Amazon's TTL for them), nothing in the
// browser. A miss is cached for the same hour so a book Amazon doesn't carry
// isn't asked about on every open; a failure only briefly, so a throttle
// doesn't blank the price for the rest of the hour.
const CACHE_FOUND = 'public, max-age=0, s-maxage=3600'
const CACHE_FAILED = 'public, max-age=0, s-maxage=300'

const PRICE_RESOURCES = [
  'offersV2.listings.price',
  'offersV2.listings.condition',
  'offersV2.listings.isBuyBoxWinner',
]

/** The ISBN with its hyphens and spaces gone, or null if it isn't a valid one. */
export function isbnDigits(raw) {
  if (typeof raw !== 'string') return null
  const digits = raw.replace(/[\s-]/g, '').toUpperCase()
  if (/^\d{9}[\dX]$/.test(digits)) return isbn10CheckDigit(digits.slice(0, 9)) === digits[9] ? digits : null
  if (/^97[89]\d{10}$/.test(digits)) return isbn13CheckDigit(digits.slice(0, 12)) === digits[12] ? digits : null
  return null
}

function isbn10CheckDigit(first9) {
  let sum = 0
  for (let i = 0; i < 9; i++) sum += (10 - i) * Number(first9[i])
  const check = (11 - (sum % 11)) % 11
  return check === 10 ? 'X' : String(check)
}

function isbn13CheckDigit(first12) {
  let sum = 0
  for (let i = 0; i < 12; i++) sum += (i % 2 === 0 ? 1 : 3) * Number(first12[i])
  return String((10 - (sum % 10)) % 10)
}

/**
 * The ISBN-10 of a book, which is also the ASIN Amazon files a printed book
 * under. A 979- ISBN has no ISBN-10 (and so no ASIN to look up directly).
 */
export function toIsbn10(isbn) {
  if (isbn.length === 10) return isbn
  if (!isbn.startsWith('978')) return null
  const first9 = isbn.slice(3, 12)
  return first9 + isbn10CheckDigit(first9)
}

/** The ISBN-13 of a book — how Amazon's `externalIds` usually list it. */
export function toIsbn13(isbn) {
  if (isbn.length === 13) return isbn
  const first12 = '978' + isbn.slice(0, 9)
  return first12 + isbn13CheckDigit(first12)
}

/**
 * Whether an item Amazon returned is the book with this ISBN: its ASIN is the
 * ISBN-10, or its external ids list the ISBN either way round. A search on an
 * ISBN can return other editions and other formats, so nothing is priced until
 * this holds.
 */
export function itemMatchesIsbn(item, isbn) {
  if (!item || typeof item !== 'object') return false
  const isbn10 = toIsbn10(isbn)
  const isbn13 = toIsbn13(isbn)
  if (isbn10 && String(item.asin ?? '').toUpperCase() === isbn10) return true
  const ids = item.itemInfo?.externalIds ?? {}
  const listed = [...(ids.isbns?.displayValues ?? []), ...(ids.eans?.displayValues ?? [])]
    .map(v => String(v).replace(/[\s-]/g, '').toUpperCase())
  return listed.includes(isbn13) || (isbn10 !== null && listed.includes(isbn10))
}

/**
 * The price to show for an item: its new offer, the buy-box winner's when
 * Amazon names one (the price on its own detail page), else the lowest.
 * A listing Amazon flags as violating a minimum-advertised-price agreement is
 * one whose price may not be shown off Amazon, so it is passed over.
 */
export function pickPrice(item) {
  const listings = Array.isArray(item?.offersV2?.listings) ? item.offersV2.listings : []
  const priced = listings.filter(l => {
    const money = l?.price?.money
    const condition = l?.condition?.value
    return (
      money &&
      typeof money.amount === 'number' &&
      Number.isFinite(money.amount) &&
      money.amount > 0 &&
      typeof money.currency === 'string' &&
      l.violatesMAP !== true &&
      (condition === undefined || condition === null || condition === 'New')
    )
  })
  if (priced.length === 0) return null
  const chosen =
    priced.find(l => l.isBuyBoxWinner === true) ??
    priced.reduce((low, l) => (l.price.money.amount < low.price.money.amount ? l : low))
  const { amount, currency, displayAmount } = chosen.price.money
  return {
    amount,
    currency,
    display: typeof displayAmount === 'string' && displayAmount.trim() ? displayAmount.trim() : formatMoney(amount, currency),
  }
}

function formatMoney(amount, currency) {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)
  } catch {
    return `${amount.toFixed(2)} ${currency}`
  }
}

/** The vended detail-page link, if it is one: https, on amazon.com. */
export function detailPageUrl(item) {
  const raw = item?.detailPageURL
  if (typeof raw !== 'string') return null
  try {
    const url = new URL(raw)
    return url.protocol === 'https:' && (url.hostname === 'amazon.com' || url.hostname.endsWith('.amazon.com'))
      ? raw
      : null
  } catch {
    return null
  }
}

/** What the endpoint answers for a book, given the items Amazon returned. */
export function priceFromItems(items, isbn) {
  for (const item of Array.isArray(items) ? items : []) {
    if (!itemMatchesIsbn(item, isbn)) continue
    const price = pickPrice(item)
    const url = detailPageUrl(item)
    if (price && url) return { price, url }
  }
  return null
}

function config() {
  const credentialId = process.env.AMAZON_CREATORS_CREDENTIAL_ID
  const credentialSecret = process.env.AMAZON_CREATORS_CREDENTIAL_SECRET
  const partnerTag = process.env.AMAZON_PARTNER_TAG
  const version = process.env.AMAZON_CREATORS_VERSION || '3.1'
  if (!credentialId || !credentialSecret || !partnerTag || !TOKEN_ENDPOINTS[version]) return null
  return { credentialId, credentialSecret, partnerTag, version }
}

// A token is good for an hour and Amazon asks that it be reused rather than
// fetched per request; a warm instance keeps it here. Refreshed 30 s early, as
// the SDK does.
let cachedToken = null

/** Forget the cached token — for tests. */
export function resetTokenCache() {
  cachedToken = null
}

async function fetchWithTimeout(url, init) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
  try {
    return await fetch(url, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

async function accessToken(cfg, now = Date.now()) {
  if (cachedToken && cachedToken.version === cfg.version && now < cachedToken.expiresAt) {
    return cachedToken.token
  }
  const lwa = cfg.version.startsWith('3.')
  const fields = {
    grant_type: 'client_credentials',
    client_id: cfg.credentialId,
    client_secret: cfg.credentialSecret,
    scope: lwa ? 'creatorsapi::default' : 'creatorsapi/default',
  }
  const res = await fetchWithTimeout(TOKEN_ENDPOINTS[cfg.version], {
    method: 'POST',
    headers: { 'Content-Type': lwa ? 'application/json' : 'application/x-www-form-urlencoded' },
    body: lwa ? JSON.stringify(fields) : new URLSearchParams(fields).toString(),
  })
  if (!res.ok) throw new Error(`Token endpoint responded ${res.status}`)
  const body = await res.json()
  if (typeof body?.access_token !== 'string') throw new Error('No access token in response')
  const lifetime = typeof body.expires_in === 'number' ? body.expires_in : 3600
  cachedToken = { token: body.access_token, version: cfg.version, expiresAt: now + (lifetime - 30) * 1000 }
  return cachedToken.token
}

async function callApi(cfg, operation, payload) {
  const token = await accessToken(cfg)
  const res = await fetchWithTimeout(`${API_BASE}/${operation}`, {
    method: 'POST',
    headers: {
      Authorization: cfg.version.startsWith('3.') ? `Bearer ${token}` : `Bearer ${token}, Version ${cfg.version}`,
      'Content-Type': 'application/json',
      'x-marketplace': MARKETPLACE,
    },
    body: JSON.stringify({ partnerTag: cfg.partnerTag, marketplace: MARKETPLACE, ...payload }),
  })
  if (res.status === 401) cachedToken = null
  if (!res.ok) {
    const detail = (await res.text().catch(() => '')).slice(0, 300)
    throw new Error(`${operation} responded ${res.status}${detail ? `: ${detail}` : ''}`)
  }
  return res.json()
}

/**
 * Look a book up in one call: by ASIN (its ISBN-10) when it has one, which
 * names exactly one item; for a 979- ISBN, which has no ISBN-10, a Books search
 * on the ISBN-13, kept to the result that carries it. One call, never a second
 * as a fallback — a new account is allowed one request a second, and a chained
 * retry is the likeliest way to be throttled.
 */
export async function lookUpPrice(cfg, isbn) {
  const asin = toIsbn10(isbn)
  if (asin) {
    const body = await callApi(cfg, 'getItems', {
      itemIds: [asin],
      itemIdType: 'ASIN',
      condition: 'New',
      resources: PRICE_RESOURCES,
    })
    // The cURL guide and the SDK name this `itemsResult`; the GetItems
    // reference page spells it `itemResults`. Read either.
    return priceFromItems(body?.itemsResult?.items ?? body?.itemResults?.items, isbn)
  }
  const body = await callApi(cfg, 'searchItems', {
    keywords: toIsbn13(isbn),
    searchIndex: 'Books',
    itemCount: 10,
    condition: 'New',
    resources: [...PRICE_RESOURCES, 'itemInfo.externalIds'],
  })
  return priceFromItems(body?.searchResult?.items, isbn)
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const isbn = isbnDigits(req.query?.isbn)
  if (!isbn) return res.status(400).json({ error: 'Missing or invalid ?isbn' })

  const cfg = config()
  // Unconfigured is the state of a deployment with no Associates account —
  // not cached, so adding the keys takes effect on the next open.
  if (!cfg) {
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({ price: null })
  }

  try {
    const found = await lookUpPrice(cfg, isbn)
    res.setHeader('Cache-Control', CACHE_FOUND)
    return res.status(200).json(found ? { ...found, asOf: new Date().toISOString() } : { price: null })
  } catch (err) {
    // The reader sees no price either way; the function log is where a bad
    // credential, a rejected request or a throttle shows up.
    console.error(`amazon-price: ${isbn}: ${err?.message || err}`)
    res.setHeader('Cache-Control', CACHE_FAILED)
    return res.status(200).json({ price: null })
  }
}
