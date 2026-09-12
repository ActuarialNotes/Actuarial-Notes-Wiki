import fm from 'front-matter'
import { rawGithubUrl } from '@/lib/github'

const IMAGE_EXT_RE = /\.(png|jpe?g|gif|svg|webp|avif)$/i

export interface ResourceMeta {
  title?: string
  author?: string
  year?: string
  edition?: string
  publisher?: string
  isbn?: string
  type?: string
  code?: string
  coverImageUrl?: string
  getCopyUrl?: string
}

function extractUrl(value: string): string | undefined {
  const m = value.match(/\(([^)]+)\)/)
  return m ? m[1] : (value.startsWith('http') ? value : undefined)
}

/**
 * A library-catalogue search for a book, built from the ISBN its page already
 * transcribes.
 *
 * This exists because the alternative kept being wrong. WorldCat's
 * `/title/<n>` paths take an OCLC control number, so a title-and-author slug
 * written into that position ("…/title/mathematical-interest-theory-vaaler")
 * is a guess, and every one of those guesses 404s. Even a real control number
 * is a poor thing to author by hand: it pins one manifestation, so it can
 * quietly point at a different edition than the page describes.
 *
 * An ISBN search cannot be wrong in either way — it is derived from a number
 * taken off the book itself, and it names a search rather than claiming a
 * record exists. The URL shape is the one OCLC documents for deep links
 * (`worldcat.org/isbn/<isbn>`, which redirects here).
 *
 * Returns nothing unless the ISBN is a well-formed 10- or 13-character one:
 * no button at all beats a button onto an empty result page.
 */
export function librarySearchUrl(isbn?: string): string | undefined {
  if (!isbn) return undefined
  const digits = isbn.replace(/[\s-]/g, '').toUpperCase()
  if (!/^(?:\d{9}[\dX]|\d{13})$/.test(digits)) return undefined
  return `https://search.worldcat.org/search?q=bn%3A${digits}`
}

export function parseResourceMeta(raw: string): ResourceMeta {
  let attrs: Record<string, unknown> = {}
  try {
    attrs = fm<Record<string, unknown>>(raw).attributes ?? {}
  } catch {
    return {}
  }
  const str = (v: unknown) => (v != null ? String(v).trim() || undefined : undefined)

  const isbn = str(attrs['ISBN'])
  // An authored link is where the source actually *is* — a publisher's PDF, a
  // standards body's page. Only when a page names no such place (a textbook
  // that is simply for sale) does the card fall back to finding it in a
  // library.
  const linkStr = str(attrs['Find at your local library at']) ?? str(attrs['Available from'])
  const getCopyUrl = (linkStr ? extractUrl(linkStr) : undefined) ?? librarySearchUrl(isbn)

  const body = raw.replace(/^---\n[\s\S]*?\n---\n?/, '')
  const imgMatch = /!\[\[([^\]|]+)\]\]/.exec(body)
  let coverImageUrl: string | undefined
  if (imgMatch) {
    const imgPath = imgMatch[1].trim()
    if (IMAGE_EXT_RE.test(imgPath)) {
      const resolved = imgPath.includes('/') ? imgPath : `Media/Attachments/${imgPath}`
      coverImageUrl = rawGithubUrl(resolved)
    }
  }

  return {
    title: str(attrs['Title']),
    author: str(attrs['Authors']) ?? str(attrs['Author']),
    year: str(attrs['Year']),
    edition: str(attrs['Edition']),
    publisher: str(attrs['Publisher']),
    isbn,
    type: str(attrs['Type']),
    code: str(attrs['Code']),
    coverImageUrl,
    getCopyUrl,
  }
}

// Remove the first cover image embed — it is shown in the metadata card instead.
export function stripFirstCoverImage(md: string): string {
  return md.replace(/!\[\[[^\]|]+\.(png|jpe?g|gif|svg|webp|avif)\]\][ \t]*\n?/i, '')
}

export function preprocessResourceMarkdown(raw: string): string {
  return stripFirstCoverImage(raw)
}

const LIST_ITEM_RE = /^\s*[-*+]\s+\S/
// "1", "1.4", "1.4.2", "0.1", "1.01", "A.2" — a chapter/section label.
const SECTION_LABEL_RE = /^\s*[-*+]\s+(?:\d+|[A-Z])(?:\.\d+)*\.?\s+\S/

// A book's table of contents already numbers itself ("1.4.2 Accumulated Value…"),
// so list markers next to those lines are a second, conflicting numbering.
// Detect that shape here; the outline styling below hides the markers and lets
// the indent carry the hierarchy. Prose pages (the ASOPs, whose lists are real
// bullets) fall through and keep their discs.
export function isNumberedOutline(md: string): boolean {
  const items = md.split('\n').filter(line => LIST_ITEM_RE.test(line))
  if (items.length < 3) return false
  const labelled = items.filter(line => SECTION_LABEL_RE.test(line)).length
  return labelled / items.length >= 0.6
}

// Applied to the WikiArticle of a resource page whose body is a numbered
// outline: no list markers, tighter rows, and chapter headings sized closer to
// the entries they head.
export const OUTLINE_ARTICLE_CLASS =
  'prose-h2:text-lg prose-h2:mt-5 prose-h2:mb-1 ' +
  'prose-ul:list-none prose-ul:pl-0 prose-ul:my-1.5 ' +
  'prose-li:my-1 prose-li:pl-0 prose-li:leading-snug ' +
  '[&_li>ul]:mt-1 [&_li>ul]:pl-4'
