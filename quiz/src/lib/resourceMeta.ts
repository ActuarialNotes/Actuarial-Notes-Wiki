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

export function parseResourceMeta(raw: string): ResourceMeta {
  let attrs: Record<string, unknown> = {}
  try {
    attrs = fm<Record<string, unknown>>(raw).attributes ?? {}
  } catch {
    return {}
  }
  const str = (v: unknown) => (v != null ? String(v).trim() || undefined : undefined)

  const linkStr = str(attrs['Find at your local library at']) ?? str(attrs['Available from'])
  const getCopyUrl = linkStr ? extractUrl(linkStr) : undefined

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
    isbn: str(attrs['ISBN']),
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

// Convert unordered list items (- …) to ordered list items (1. …) at every indent level.
export function convertBulletsToOrdered(md: string): string {
  return md.replace(/^(\s*)-(\s)/gm, '$11.$2')
}

export function preprocessResourceMarkdown(raw: string): string {
  return convertBulletsToOrdered(stripFirstCoverImage(raw))
}
