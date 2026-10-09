/**
 * A run's input in a URL fragment (`/tools/chain-ladder#input=…`), so a share
 * link, a Send to… and an agent's `app_url` all open the same run — and,
 * being a fragment, the input never reaches a server (R7).
 */

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'

function toBase64Url(bytes: Uint8Array): string {
  let out = ''
  for (let i = 0; i < bytes.length; i += 3) {
    const n = (bytes[i] << 16) | ((bytes[i + 1] ?? 0) << 8) | (bytes[i + 2] ?? 0)
    const chars = i + 2 < bytes.length ? 4 : i + 1 < bytes.length ? 3 : 2
    for (let k = 0; k < chars; k++) out += ALPHABET[(n >> (18 - 6 * k)) & 63]
  }
  return out
}

function fromBase64Url(text: string): Uint8Array | null {
  const bytes: number[] = []
  let buffer = 0
  let bits = 0
  for (const ch of text) {
    const v = ALPHABET.indexOf(ch)
    if (v < 0) return null
    buffer = (buffer << 6) | v
    bits += 6
    if (bits >= 8) {
      bits -= 8
      bytes.push((buffer >> bits) & 255)
    }
  }
  return new Uint8Array(bytes)
}

export const INPUT_FRAGMENT = 'input'

export function encodeRunInput(input: unknown): string {
  return toBase64Url(new TextEncoder().encode(JSON.stringify(input)))
}

/** The input a fragment carries, or null when it carries none that can be read. */
export function decodeRunInput(hash: string): unknown {
  const match = new RegExp(`(?:^#?|&)${INPUT_FRAGMENT}=([A-Za-z0-9_-]+)`).exec(hash)
  if (!match) return null
  const bytes = fromBase64Url(match[1])
  if (!bytes) return null
  try {
    return JSON.parse(new TextDecoder().decode(bytes))
  } catch {
    return null
  }
}

/** The app path that opens a run: `/tools/<slug>#input=…`. */
export function runPath(slug: string, input?: unknown): string {
  return input === undefined ? `/tools/${slug}` : `/tools/${slug}#${INPUT_FRAGMENT}=${encodeRunInput(input)}`
}
