// The client half of the Amazon price on a resource card's "Get a copy" menu.
// `quiz/api/amazon-price.js` asks Amazon's Creators API (the only way Amazon
// lets a site show its prices); this module reads what it returns, refuses
// anything malformed, and says when the price was read.
//
// Nothing here is stored: Amazon's licence forbids a client application from
// caching its content, so a price lives in the menu's state while the page is
// open and is fetched again when the menu is reopened (the CDN answers that).
// The endpoint's own cache is an hour, Amazon's TTL for offers.

import { isbnDigits } from './resourceMeta'

export interface AmazonPrice {
  amount: number
  currency: string
  /** As Amazon formats it — "$148.99". */
  display: string
  /**
   * The detail-page link Amazon vended with the site's partner tag. The row
   * links here untouched: Amazon credits a sale only to the link it handed out.
   */
  url: string
  /** When Amazon was asked — printed beside the price. */
  asOf: Date
}

/**
 * The wording Amazon's licence requires wherever one of its prices is shown,
 * transcribed from the Associates Program IP License, §(i) and §(k), and the
 * Operating Agreement's disclosure. Not paraphrased: the licence says to
 * include *these* statements. The associate disclosure may be "substantially
 * similar", which is what lets it name the site rather than say "I".
 */
export const AMAZON_PRICE_DISCLAIMER =
  'Product prices and availability are accurate as of the date/time indicated and are subject to change. ' +
  'Any price and availability information displayed on Amazon.com at the time of purchase will apply to the purchase of this product.'
export const AMAZON_CONTENT_DISCLAIMER =
  'CERTAIN CONTENT THAT APPEARS ON THIS SITE COMES FROM AMAZON. ' +
  "THIS CONTENT IS PROVIDED 'AS IS' AND IS SUBJECT TO CHANGE OR REMOVAL AT ANY TIME."
export const AMAZON_ASSOCIATE_DISCLOSURE =
  'As an Amazon Associate, Actuarial Notes earns from qualifying purchases.'

/** Where the endpoint lives, asked about the bare ISBN (one CDN entry per book). */
export function amazonPriceEndpoint(isbn: string): string | null {
  const digits = isbnDigits(isbn)
  return digits ? `/api/amazon-price?isbn=${digits}` : null
}

function isAmazonUrl(raw: string): boolean {
  try {
    const url = new URL(raw)
    return url.protocol === 'https:' && (url.hostname === 'amazon.com' || url.hostname.endsWith('.amazon.com'))
  } catch {
    return false
  }
}

/**
 * The endpoint's answer, if it is a price: a positive amount, a currency, the
 * text to print, an https link onto amazon.com and a real timestamp. Anything
 * else — `price: null`, a field missing, a link anywhere but Amazon — is no
 * price at all, and the row shows none.
 */
export function sanitizeAmazonPrice(payload: unknown): AmazonPrice | null {
  if (!payload || typeof payload !== 'object') return null
  const { price, url, asOf } = payload as Record<string, unknown>
  if (!price || typeof price !== 'object') return null
  const { amount, currency, display } = price as Record<string, unknown>
  if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) return null
  if (typeof currency !== 'string' || !/^[A-Z]{3}$/.test(currency)) return null
  if (typeof display !== 'string' || !display.trim() || display.length > 24) return null
  if (typeof url !== 'string' || !isAmazonUrl(url)) return null
  if (typeof asOf !== 'string') return null
  const when = new Date(asOf)
  if (Number.isNaN(when.getTime())) return null
  return { amount, currency, display: display.trim(), url, asOf: when }
}

/**
 * When a price was read, the way Amazon's licence shows it: the time and zone
 * ("3:10 PM EDT"), with the date in front once it is no longer today
 * ("Sep 26, 11:58 PM EDT") — the licence lets the date go only on the day the
 * price was read.
 */
export function priceStamp(asOf: Date, now: Date = new Date(), timeZone?: string): string {
  const time = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
    timeZone,
  }).format(asOf)
  const day = (d: Date) =>
    new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone }).format(d)
  if (day(asOf) === day(now)) return time
  const date = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone }).format(asOf)
  return `${date}, ${time}`
}

/** Amazon's current price for a book, or null — never throws. */
export async function fetchAmazonPrice(isbn: string): Promise<AmazonPrice | null> {
  const endpoint = amazonPriceEndpoint(isbn)
  if (!endpoint) return null
  try {
    const res = await fetch(endpoint, { cache: 'no-store' })
    if (!res.ok) return null
    return sanitizeAmazonPrice(await res.json())
  } catch {
    return null
  }
}
