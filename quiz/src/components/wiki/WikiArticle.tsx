import { createContext, useCallback, useContext, useMemo, useRef, type ReactNode, type RefObject } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import type { Components } from 'react-markdown'
import { calloutComponents } from '@/components/calloutComponents'
import { codeComponents } from '@/components/codeComponents'
import { DistributionSimulator } from '@/components/wiki/DistributionSimulator'
import { SourceMaterialGallery } from '@/components/wiki/SourceMaterialGallery'
import { examPillLabel } from '@/lib/resourceExams'
import { CredentialPath } from '@/components/wiki/CredentialPath'
import { readCredentialPathMarker } from '@/data/credentialPaths'
import { extractSourceMaterial, parseSyllabusObjectives, SOURCE_MATERIAL_MARKER } from '@/lib/sourceMaterial'
import { hrefToEntryRef, wikiRoute, type WikiEntryRef } from '@/lib/wikiRoutes'
import { isInWikiIndex } from '@/lib/wikiIndex'
import { distributionForImage } from '@/lib/distributions'
import { normalizeVaultMath } from '@/lib/vaultMath'
import { themedFigureSrc } from '@/lib/figureTheme'
import { useTheme } from '@/hooks/useTheme'
import { refKey, useConceptHighlight } from '@/hooks/useConceptHighlight'
import { BREADCRUMB_RE, rewriteWikilinks, stripFrontmatter } from '@/lib/wikiMarkdown'

export interface WikiArticleProps {
  markdown: string
  // Called for every internal wiki link click — return true to suppress the
  // default React Router navigation (e.g. the popup swaps its body instead).
  onWikiLink?: (ref: WikiEntryRef, event: React.MouseEvent<HTMLAnchorElement>) => boolean | void
  // Repo path of the file this article was built from. When the concept popup
  // is open with a matching `sourcePath`, the active wikilink on this page is
  // highlighted and scrolled into view.
  sourcePath?: string
  // When true, images are not rendered inline (used when a gallery button is shown instead).
  hideImages?: boolean
  className?: string
  /** Optional node rendered inline after the H1 title (e.g. an exam status badge). */
  titleBadge?: React.ReactNode
  /**
   * Makes the H1 title a control: pressing it opens the page's action menu,
   * the way the concept popup's title does (the exam study guide passes its
   * menu here). The host owns the menu; the article only draws the trigger.
   */
  titleAction?: WikiTitleAction
}

export interface WikiTitleAction {
  /** The trigger — the host anchors its menu to this element's box. */
  ref: RefObject<HTMLButtonElement>
  open: boolean
  onToggle: () => void
  /** Accessible name, e.g. "Exam 9 — page actions". */
  label: string
}

// The title action reaches the H1 through context rather than through the
// `components` map: react-markdown treats a new component function as a new
// element type, so a map rebuilt every time the menu opened or closed would
// remount the whole article.
const TitleActionContext = createContext<WikiTitleAction | null>(null)

/**
 * The H1's text, as the page's action-menu trigger when the host gave it one.
 * Underlined to say so — the same underline the concept popup's title wears.
 */
function ArticleTitle({ children }: { children: ReactNode }) {
  const action = useContext(TitleActionContext)
  if (!action) return <>{children}</>
  return (
    <button
      ref={action.ref}
      type="button"
      data-play-menu-trigger
      onClick={action.onToggle}
      aria-haspopup="menu"
      aria-expanded={action.open}
      aria-label={action.label}
      className="action-title-underline text-left"
    >
      {children}
    </button>
  )
}

// Insert a blank blockquote line before a numbered-list item that immediately
// follows a paragraph line in the same blockquote, so remark-gfm creates <ol>
// instead of treating the number as continuation text.
function fixBlockquoteOrderedLists(md: string): string {
  return md.replace(
    /^(> *(?!\d+\. )[^\n]+)\n(> *\d+\. )/gm,
    '$1\n>\n$2',
  )
}

// Strip block-level HTML divs that publish.js embeds for metadata / layout.
// react-markdown renders them as literal text without rehype-raw, so they must
// be removed before parsing.
function stripHtmlBlocks(md: string): string {
  return md
    // Multi-line block divs at line start (exam-nav, concept-nav, SVG wrappers …)
    .replace(/^<div\b[\s\S]*?<\/div> *\n?/gm, '')
    // Single-line divs inside blockquote lines (highlight-upcoming)
    .replace(/^> *<div\b.*?<\/div> *\n?/gm, '')
}

export function WikiArticle({ markdown, onWikiLink, sourcePath, hideImages, className, titleBadge, titleAction }: WikiArticleProps) {
  const navigate = useNavigate()
  const articleRef = useRef<HTMLDivElement | null>(null)
  const { theme } = useTheme()
  const { processed, sourceMaterial, objectives } = useMemo(() => {
    // Math delimiters first: the vault is written for Obsidian, whose parser is
    // looser than remark-math's. See lib/vaultMath.ts.
    const stripped = normalizeVaultMath(stripFrontmatter(markdown).replace(BREADCRUMB_RE, ''))
    // An exam page's source-material callout becomes a gallery of resource
    // cards; lift its entries out before the wikilinks are rewritten.
    const { markdown: body, entries, objectiveFilter } = extractSourceMaterial(stripped)
    return {
      processed: stripHtmlBlocks(fixBlockquoteOrderedLists(rewriteWikilinks(body))),
      sourceMaterial: entries,
      // The learning objectives name the shelf's filter — read only where
      // there is a shelf to filter, and the page hasn't switched it off.
      objectives: entries.length > 0 && objectiveFilter ? parseSyllabusObjectives(body) : [],
    }
  }, [markdown])

  // The exam a study guide is for, as a resource's `exams` name it — what
  // the shelf's Vintage filter looks the syllabus editions up by.
  const sourceExam = useMemo(() => {
    const file = sourcePath?.split('/').pop()?.replace(/\.md$/i, '')
    return file && /^Exam\b/i.test(file) && sourceMaterial.length > 0 ? examPillLabel(file) : null
  }, [sourcePath, sourceMaterial])

  // One place decides what a wiki reference does when clicked: the article's own
  // links and the source-material cards both go through it.
  const openRef = useCallback((ref: WikiEntryRef, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const suppressed = onWikiLink?.(ref, e)
    if (suppressed === true) return
    navigate(wikiRoute(ref))
  }, [navigate, onWikiLink])

  const components = useMemo<Components>(() => ({
    ...calloutComponents,
    ...codeComponents,
    h1({ children, ...rest }) {
      const title = <ArticleTitle>{children}</ArticleTitle>
      if (!titleBadge) return <h1 {...rest}>{title}</h1>
      return (
        <h1 {...rest} className="flex items-center gap-2 flex-wrap">
          <span>{title}</span>
          {titleBadge}
        </h1>
      )
    },
    // A paragraph whose only content is a marker or a distribution illustration
    // becomes a <div> — unwrap the <p> so it isn't invalid nesting.
    p({ node, children, ...rest }) {
      const kids = (node?.children ?? []).filter(
        child => !(child.type === 'text' && child.value.trim() === ''),
      )
      const only = kids.length === 1 ? kids[0] : null
      if (only && only.type === 'text' && only.value.trim() === SOURCE_MATERIAL_MARKER) {
        return <SourceMaterialGallery entries={sourceMaterial} objectives={objectives} exam={sourceExam} onOpen={openRef} />
      }
      // The SOA/CAS credential path — on the general study guide, and on each
      // designation page opened at that designation. The vault writes it as an
      // Obsidian comment, so Obsidian shows nothing there.
      const credentialPath = only && only.type === 'text' ? readCredentialPathMarker(only.value) : null
      if (credentialPath) {
        const { at } = credentialPath
        return <CredentialPath key={at ? `${at.body}-${at.stage}` : 'reader'} onOpen={openRef} start={at} />
      }
      if (
        !hideImages &&
        only &&
        only.type === 'element' &&
        only.tagName === 'img' &&
        distributionForImage(String(only.properties?.src ?? ''))
      ) {
        return <>{children}</>
      }
      return <p {...rest}>{children}</p>
    },
    img({ src, alt }) {
      if (hideImages) return null
      const distribution = distributionForImage(src)
      // The vault's distribution plots are static snapshots of four parameter
      // choices; swap them for the live thing.
      if (distribution) return <DistributionSimulator spec={distribution} className="my-3" />
      // A generated concept figure carries both palettes and is told which one
      // applies through the URL — see `lib/figureTheme.ts`.
      return <img src={themedFigureSrc(src, theme)} alt={alt ?? ''} className="max-w-full" onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
    },
    a({ href, children, ...rest }) {
      if (!href) return <a {...rest}>{children}</a>
      const ref = hrefToEntryRef(href)
      if (!ref) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
            {children}
          </a>
        )
      }
      const route = wikiRoute(ref)
      const exists = isInWikiIndex(ref.kind, ref.name)
      // A `#repeat` fragment (added by rewriteWikilinks for the 2nd+ mention of
      // a concept within a learning objective) marks a dimmer, secondary link.
      const isRepeat = href.includes('#repeat')
      return (
        <a
          href={route}
          data-wikiref={refKey(ref)}
          {...rest}
          className={isRepeat ? 'wiki-link--repeat' : undefined}
          style={exists ? undefined : { textDecorationLine: 'none' }}
          onClick={e => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
            openRef(ref, e)
          }}
        >
          {children}
        </a>
      )
    },
  }), [openRef, hideImages, titleBadge, sourceMaterial, objectives, sourceExam, theme])

  // Active-concept highlight: when the popup is open and its sourcePath
  // matches this article's sourcePath, the matching wikilink is flagged and
  // scrolled into view (hooks/useConceptHighlight.ts).
  useConceptHighlight(articleRef, sourcePath)

  return (
    <div
      ref={articleRef}
      data-source-page={sourcePath}
      // One article is one set of equations for math focus mode. Surfaces that
      // stack several articles (the popup body, a flashcard back) mark their
      // own wrapper, and the outermost scope wins — see lib/mathFocus.ts.
      data-math-scope=""
      className={
        'prose dark:prose-invert max-w-none ' +
        'prose-headings:mt-6 prose-headings:mb-2 prose-headings:font-semibold ' +
        'prose-h3:text-base prose-h3:font-medium ' +
        'prose-p:my-2.5 prose-p:leading-relaxed ' +
        'prose-a:text-primary prose-a:underline ' +
        'prose-li:my-0.5 prose-ul:my-2 prose-ol:my-2 ' +
        'prose-strong:font-semibold ' +
        '[&_li::marker]:text-muted-foreground ' +
        (className ?? '')
      }
    >
      <TitleActionContext.Provider value={titleAction ?? null}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={components}
        >
          {processed}
        </ReactMarkdown>
      </TitleActionContext.Provider>
    </div>
  )
}
