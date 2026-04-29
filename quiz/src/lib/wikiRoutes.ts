// Internal routing helpers for the wiki section of the quiz app.
// Replaces the old external URL builder (wikiUrl.ts) that pointed at
// wiki.actuarialnotes.com; everything now resolves to /wiki/... routes.

export type WikiEntryKind = 'concept' | 'resource' | 'exam'

export interface WikiEntryRef {
  kind: WikiEntryKind
  name: string
}

// "Expected Value" → "Expected+Value" (matches Obsidian Publish slugs, keeps
// existing `wiki_link` values in question frontmatter working).
function toSlug(name: string): string {
  // encodeURIComponent first (encodes special chars), then swap %20 → +.
  // Doing the space→+ replacement before encodeURIComponent would cause +
  // to be double-encoded as %2B, breaking fromSlug round-trips.
  return encodeURIComponent(name.trim()).replace(/%20/g, '+')
}

export function fromSlug(slug: string): string {
  return decodeURIComponent(slug.replace(/\+/g, ' '))
}

export function wikiRoute(ref: WikiEntryRef): string {
  return `/wiki/${ref.kind}/${toSlug(ref.name)}`
}

// Convert a repo-relative file path ("Concepts/Expected Value.md",
// "Resources/Books/Probability for Risk Management.md",
// "Exam P-1 (SOA).md") to its wiki route and vice versa.
export function pathToEntryRef(path: string): WikiEntryRef | null {
  const p = path.replace(/^\/+/, '').replace(/\.md$/i, '')
  if (p.toLowerCase().startsWith('concepts/')) {
    return { kind: 'concept', name: p.slice('concepts/'.length) }
  }
  if (p.toLowerCase().startsWith('resources/books/')) {
    return { kind: 'resource', name: p.slice('resources/books/'.length) }
  }
  if (/^Exam[ -]/i.test(p)) {
    return { kind: 'exam', name: p }
  }
  return null
}

export function entryRefToRepoPath(ref: WikiEntryRef): string {
  switch (ref.kind) {
    case 'concept':
      return `Concepts/${ref.name}.md`
    case 'resource':
      return `Resources/Books/${ref.name}.md`
    case 'exam':
      return `${ref.name}.md`
  }
}

// Normalise the many forms a wiki reference can take — Obsidian wikilinks,
// plus/encoded slugs, absolute or relative URLs — into a WikiEntryRef.
// Returns null when the href doesn't look like an internal wiki target.
export function hrefToEntryRef(href: string): WikiEntryRef | null {
  if (!href) return null

  // Strip protocol/host for known wiki domains.
  let clean = href
  try {
    const u = new URL(href, 'https://placeholder.local')
    if (
      u.host === 'wiki.actuarialnotes.com' ||
      u.host === 'placeholder.local' // relative
    ) {
      clean = u.pathname + u.search + u.hash
    } else {
      return null
    }
  } catch {
    /* non-URL string, treat as path */
  }

  // Drop fragment / query, trim leading slashes, turn + back into spaces.
  clean = clean.split('#')[0]!.split('?')[0]!.replace(/^\/+/, '').replace(/\+/g, ' ')
  if (!clean) return null

  // Already slugged as concept/resource/exam internal route?
  const internal = clean.match(/^wiki\/(concept|resource|exam)\/(.+)$/i)
  if (internal) {
    return { kind: internal[1].toLowerCase() as WikiEntryKind, name: fromSlug(internal[2]) }
  }

  const decoded = decodeURIComponent(clean)
  const asPath = pathToEntryRef(decoded)
  if (asPath) return asPath

  // Otherwise assume it's a bare concept name (the common [[Expected Value]] case).
  return { kind: 'concept', name: decoded }
}

// Canonical short exam id used as a localStorage key (`actuarial-notes-learned`)
// and as the `?from=` query param on concept routes. Accepts any of:
//   "Exam P-1 (SOA)"   (filename)          → "p-1"
//   "Exam P-1 (SOA).md"                    → "p-1"
//   "Exam P"           (syllabus label)    → "p-1"   (assumes -1 suffix)
//   "P-1"              (raw id)            → "p-1"
// Fills in the -N suffix when missing because publish.js keys always carry it.
export function examIdFromFile(name: string): string {
  const cleaned = name
    .replace(/\.md$/i, '')
    .replace(/^Exam\s+/i, '')
    .replace(/\s*\([^)]*\)\s*$/, '')
    .trim()
  if (!cleaned) return name.toLowerCase()
  const withDash = cleaned.includes('-') ? cleaned : `${cleaned}-1`
  return withDash.toLowerCase()
}
