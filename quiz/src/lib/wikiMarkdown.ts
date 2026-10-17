// The vault's markdown, made ready for react-markdown and read for its parts:
// Obsidian's `[[wiki links]]` and `![[embeds]]` rewritten as ordinary links and
// images, the frontmatter and Obsidian Publish breadcrumb stripped, and a
// page's images and boxed formulas pulled out (the gallery and the flashcard
// views). Rendered by components/wiki/WikiArticle.tsx.

import { hrefToEntryRef, wikiRoute } from '@/lib/wikiRoutes'
import { vaultMediaUrl } from '@/lib/vaultAssets'

const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO as string
const GITHUB_BRANCH = import.meta.env.VITE_GITHUB_BRANCH as string
const IMAGE_EXT_RE = /\.(png|jpe?g|gif|svg|webp|avif)$/i

function rawGithubUrl(path: string): string {
  // Anything under Media/ is served by the app itself (lib/vaultAssets.ts).
  const own = vaultMediaUrl(path)
  if (own) return own
  const clean = path.replace(/^\/+/, '')
  const encoded = clean.split('/').map(encodeURIComponent).join('/')
  return `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/${encoded}`
}

function escapeMarkdownLabel(label: string): string {
  // Escape markdown-significant punctuation so labels like "Expected *Value*"
  // or "Std. (σ)" don't turn into emphasis/groups inside the generated link.
  return label.replace(/[\\[\]()*_`{}]/g, '\\$&')
}

// CommonMark rule: ordered lists starting with N≠1 cannot interrupt a paragraph.
// Items like "8. Explain…" directly following a paragraph line get swallowed into
// that paragraph as plain text. Fix: insert a blank blockquote line (">") before
// any "> N. " item (N≠1) that immediately follows a non-blank, non-heading,
// non-list blockquote line.
export function ensureListSpacing(md: string): string {
  return md.replace(
    /^(> (?!#{1,6} )(?!\d+\. )(?![-*+] )[^\n]*\S[^\n]*)\n(> (?!1\. )\d+\. )/gm,
    '$1\n>\n$2',
  )
}

// Preprocess the markdown before react-markdown:
//   ![[Path/To/Image.png]]  → standard image with a raw.githubusercontent URL
//   ![[Some Note]]          → "📎 Some Note" link to the wiki route
//   [[Target|Display]]      → [Display](/wiki/concept/Target)
//   [[Target]]              → [Target](/wiki/concept/Target)
// Runs `!` (embeds) first so the inner [[...]] isn't consumed by the second pass.
//
// Within an exam `[!example]` callout (a learning objective), the second and
// later mentions of the *same* concept get a `#repeat` fragment on their href
// so the renderer can style them dimmer — the first (primary) link stands out
// while every instance stays clickable. The "seen" set resets at each callout
// header, so a concept re-used across two learning objectives is primary in
// both (mirroring how the study-plan extractor de-dupes per objective).
export function rewriteWikilinks(md: string): string {
  const embedded = md.replace(/!\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_full, target: string, display?: string) => {
    const t = target.trim()
    const label = (display ?? '').trim() || (t.includes('/') ? t.split('/').pop()! : t)
    if (IMAGE_EXT_RE.test(t)) {
      const src = rawGithubUrl(t)
      return `![${escapeMarkdownLabel(label)}](${src})`
    }
    const ref = hrefToEntryRef(t) ?? { kind: 'concept' as const, name: t }
    return `[📎 ${escapeMarkdownLabel(label)}](${wikiRoute(ref)})`
  })

  const linkRe = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g
  let inExample = false
  let seen = new Set<string>()

  return embedded
    .split('\n')
    .map(line => {
      const header = line.match(/^>\s*\[!(\w+)\]/)
      if (header) {
        inExample = header[1].toLowerCase() === 'example'
        seen = new Set()
      } else if (!line.startsWith('>')) {
        // A non-blockquote line ends the current callout scope.
        inExample = false
      }

      return line.replace(linkRe, (_full, target: string, display?: string) => {
        const t = target.trim()
        const label = (display ?? '').trim() || (t.includes('/') ? t.split('/').pop()! : t)
        const ref = hrefToEntryRef(t) ?? { kind: 'concept' as const, name: t }
        let route = wikiRoute(ref)
        if (inExample) {
          const key = ref.name.toLowerCase()
          if (seen.has(key)) route += '#repeat'
          else seen.add(key)
        }
        return `[${escapeMarkdownLabel(label)}](${route})`
      })
    })
    .join('\n')
}

export function extractImages(markdown: string): Array<{ src: string; alt: string; caption: string }> {
  const raw = stripFrontmatter(markdown).replace(BREADCRUMB_RE, '')
  const lines = raw.split('\n')
  const re = /!\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\][ \t]*(.*)/
  const results: Array<{ src: string; alt: string; caption: string }> = []

  for (let i = 0; i < lines.length; i++) {
    const m = re.exec(lines[i])
    if (!m) continue
    const target = m[1].trim()
    if (!IMAGE_EXT_RE.test(target)) continue
    const display = m[2]?.trim() ?? ''
    const alt = display || (target.includes('/') ? target.split('/').pop()! : target)
    const src = rawGithubUrl(target)
    let caption = m[3].trim()
    // If no inline caption, check the very next line for plain-text caption
    if (!caption && i + 1 < lines.length) {
      const next = lines[i + 1].trim()
      if (
        next &&
        !next.startsWith('#') &&
        !next.startsWith('![[') &&
        !next.startsWith('[[') &&
        !next.startsWith('```') &&
        !next.startsWith('>') &&
        !next.startsWith('---') &&
        !/^[-*+] /.test(next) &&
        !/^\d+\. /.test(next)
      ) {
        // Strip surrounding emphasis markers commonly used for captions
        caption = next.replace(/^\*(.+)\*$/, '$1').replace(/^_(.+)_$/, '$1')
      }
    }
    results.push({ src, alt, caption })
  }

  return results
}

// Breadcrumb navigation lines written by Obsidian Publish (first line of every
// file): [[Actuarial Notes Wiki|Wiki]] / **Exam P-1 (SOA)**
// or [[Wiki]] / [[Concepts]] / **Concept Name**
// These are not wanted in the quiz app and add non-existent "concepts" to popup lists.
export const BREADCRUMB_RE = /^\[\[[^\]|]*(?:\|[^\]]+)?\]\][^\n]* \/ [^\n]*\n?/

export function stripFrontmatter(raw: string): string {
  return raw.replace(/^---\n[\s\S]*?\n---\n?/, '')
}

const CALLOUT_TYPE_RE = /^\s*\[!/

export function extractMathBlockquotes(raw: string): string[] {
  const md = stripFrontmatter(raw).replace(BREADCRUMB_RE, '')
  const lines = md.split('\n')
  const result: string[] = []
  let blockLines: string[] = []

  function flush() {
    if (blockLines.length === 0) return
    const stripped = blockLines.map(l => l.replace(/^>[ \t]?/, '')).join('\n')
    if (!CALLOUT_TYPE_RE.test(stripped) && stripped.includes('$$')) {
      result.push(blockLines.join('\n'))
    }
    blockLines = []
  }

  for (const line of lines) {
    if (line.startsWith('>')) {
      blockLines.push(line)
    } else {
      flush()
    }
  }
  flush()

  return result
}
