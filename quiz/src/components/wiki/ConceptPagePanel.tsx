import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { Headphones, ImageIcon, Loader2, X } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath, type WikiEntryRef } from '@/lib/wikiRoutes'
import { recallPageScroll, rememberPageScroll } from '@/lib/pageScrollMemory'
import { WikiArticle } from '@/components/wiki/WikiArticle'
import { extractImages } from '@/lib/wikiMarkdown'
import { ResourceReferenceCard } from '@/components/wiki/ResourceReferenceCard'
import { openAncestorDetails } from '@/lib/resourceContents'
import { parseVerification } from '@/lib/verification'
import { extractSyllabusAssignments, parseResourceMeta, RESOURCE_ARTICLE_CLASS, preprocessResourceMarkdown } from '@/lib/resourceMeta'
import { ListenView } from '@/components/wiki/ListenView'
import { listenCarriesOver, setListenReading } from '@/hooks/useListenCarry'
import { ImageGalleryModal } from '@/components/wiki/ImageGalleryModal'
import { ConceptImageBanner } from '@/components/wiki/ConceptImageBanner'
import { ConceptActionMenu } from '@/components/ConceptActionMenu'
import type { PdfReaderDoc } from '@/hooks/usePdfReader'
import { useFiguresCollapsed } from '@/hooks/useFiguresCollapsed'
import { figureLabel, pictureImages } from '@/lib/conceptFigures'

// The Assumptions Bank's card for a resource page (docs/assumptions-bank.md),
// fetched with the bank only when a resource page is opened: the popup is in
// the first-paint bundle, and the bank isn't something every reader needs.
const ResourceAssumptionsCard = lazy(() =>
  import('@/components/wiki/ResourceAssumptionsCard').then(m => ({ default: m.ResourceAssumptionsCard })),
)

// A section heading is drawn at the pane title's size (text-lg, sm:text-xl
// in the header above), so a page's `##` never reads bigger than its name.
const POPUP_HEADING_CLASS = 'prose-h2:text-lg sm:prose-h2:text-xl'

/**
 * The open page of the concept popup's stack: its header (the title, which is
 * the action menu's one trigger, plus the figures toggle and Listen) and its body (the article or the
 * Listen view), with the gallery it opens.
 *
 * The actions themselves are `components/ConceptActionMenu.tsx` — the same menu
 * every flashcard surface opens — so this file is only the page.
 *
 * Mounted per page, keyed by the ref, so opening another page of the stack is a
 * remount rather than a reset of a dozen pieces of state. What a reader would
 * expect to survive that — how far down the page they had read — is kept in
 * `lib/pageScrollMemory.ts` and restored when the page comes back, which is
 * what makes a folded page's title bar a way *back* to it rather than a way to
 * load it again.
 *
 * The chrome shared by the whole popup — the resize handle, the Previous/Next
 * footer, focus mode — stays in `ConceptPopup`.
 */
export interface ConceptPagePanelProps {
  entry: WikiEntryRef
  /** True while the popup fills the viewport — drops the page's extra chrome. */
  focusMode: boolean
  /** Called when a link on this page is followed, to stack the target on top. */
  onOpenLink: (ref: WikiEntryRef) => void
  /**
   * Called when a document this page offers is opened (a resource card's Read
   * PDF), to stack it on top the same way — rather than covering the popup with
   * the app's reader.
   */
  onOpenPdf: (doc: PdfReaderDoc) => void
  /** Close this page. The popup closes when its last page does. */
  onClose: () => void
  /** Popup-level controls (the focus-mode toggle), shown on the active panel. */
  trailing?: React.ReactNode
  /**
   * Set when the footer's Previous / Next was pressed while the gallery was
   * open: this page should open its own gallery once loaded, and report back
   * so the walk can keep stepping when the page has no images at all.
   */
  gallerySeek?: 0 | 1 | -1
  onGallerySeekResolved?: (hadImages: boolean) => void
  /** Reports the gallery opening and closing, so the footer can hand it over. */
  onGalleryOpenChange?: (open: boolean) => void
}

const HEADER_BUTTON = 'inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 transition-colors'
const HEADER_BUTTON_IDLE = 'text-muted-foreground hover:text-foreground hover:bg-accent'

export function ConceptPagePanel({
  entry,
  focusMode,
  onOpenLink,
  onOpenPdf,
  onClose,
  trailing,
  gallerySeek = 0,
  onGallerySeekResolved,
  onGalleryOpenChange,
}: ConceptPagePanelProps) {
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  // Whether the action menu — the whole of the page's actions, hung off the
  // title — is open. Everything on it lives in ConceptActionMenu.
  const [showPlayMenu, setShowPlayMenu] = useState(false)
  const [images, setImages] = useState<Array<{ src: string; alt: string; caption: string }>>([])
  const [showGallery, setShowGallery] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  // A page opened while the last one was being read aloud opens in Listen and
  // reads on — see hooks/useListenCarry.ts.
  const [listenView, setListenView] = useState(listenCarriesOver)
  const [figuresCollapsed, setFiguresCollapsed] = useFiguresCollapsed()
  const titleBtnRef = useRef<HTMLButtonElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  // Fetch this page's markdown. The panel is keyed by its ref, so this runs
  // once per page rather than on every step of the walk.
  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    fetchWikiFile(entryRefToRepoPath(entry))
      .then(raw => {
        if (cancelled) return
        // A resource page's first embed is its cover, and the cover is already
        // the jacket on the metadata card — it is not one of the page's
        // figures. Reading the images off the same cover-stripped markdown the
        // article renders keeps the banner, its pager and the gallery walk
        // agreeing with what's actually on the page (a book with nothing but a
        // jacket then has no figure banner at all, rather than a "Show figure"
        // strip that reveals the cover a second time).
        const imgs = extractImages(
          entry.kind === 'resource' ? preprocessResourceMarkdown(raw) : raw,
        )
        setContent(raw)
        setImages(imgs)
        setStatus('idle')
        // Stepping with the gallery open: reopen it here, or tell the walk this
        // page had nothing to show so it can carry on in the same direction.
        if (gallerySeek !== 0) {
          if (imgs.length > 0) {
            setGalleryIndex(0)
            setShowGallery(true)
          }
          onGallerySeekResolved?.(imgs.length > 0)
        }
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry.kind, entry.name])

  // Put the reader back where they were when this page is opened again from its
  // bar. The restore waits for the article to be laid out — before that the body
  // has nothing to scroll through. See lib/pageScrollMemory.ts.
  useEffect(() => {
    if (content === null) return
    // A link to a heading (`[[Page#Heading]]`) opens the page at that heading.
    if (entry.heading) {
      const heading = entry.heading
      const frame = requestAnimationFrame(() => requestAnimationFrame(() => {
        const body = bodyRef.current
        const target = body?.querySelector<HTMLElement>(`[id="${CSS.escape(heading)}"]`)
        // A resource's chapter may be folded (lib/resourceContents.ts): open it first.
        if (target) openAncestorDetails(target, body)
        if (body && target) {
          body.scrollTop += target.getBoundingClientRect().top - body.getBoundingClientRect().top - 8
        }
      }))
      return () => cancelAnimationFrame(frame)
    }
    const saved = recallPageScroll(entry)
    if (saved <= 0) return
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => {
      if (bodyRef.current) bodyRef.current.scrollTop = saved
    }))
    return () => cancelAnimationFrame(frame)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content === null])

  useEffect(() => {
    onGalleryOpenChange?.(showGallery)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showGallery])

  const resourceMeta = useMemo(() => {
    if (!content || entry.kind !== 'resource') return null
    return parseResourceMeta(content)
  }, [content, entry.kind])

  // The resource's "On the syllabus" callout, drawn as a card under its
  // metadata card — `preprocessResourceMarkdown` takes it out of the article.
  const syllabusAssignments = useMemo(
    () => (content && entry.kind === 'resource' ? extractSyllabusAssignments(content).assignments : []),
    [content, entry.kind],
  )

  const resourceVerification = useMemo(
    () => (content && entry.kind === 'resource' ? parseVerification(content) : null),
    [content, entry.kind],
  )

  const processedContent = useMemo(() => {
    if (!content) return content
    if (entry.kind !== 'resource') return content
    return preprocessResourceMarkdown(content)
  }, [content, entry.kind])

  const sourcePath = entryRefToRepoPath(entry)
  // A resource's header names the document by its own title, not the vault's
  // file name ("A First Course in Probability (Ross - 2019)" was cut off at the
  // bracket on a phone).
  const headerTitle = resourceMeta?.title ?? entry.name

  // A guide page (an exam's "How to Study" tip) has no action menu at all:
  // quizzing, keeping a card and tracking mastery are all about a concept being
  // learned, and a tip is advice about the exam. Listen stays — it is a way of
  // reading the page.
  const hasActions = entry.kind !== 'guide'

  // The figures toggle only means something on a page that has a picture to
  // fold (a distribution illustration is the simulator card, always shown), and
  // not in Listen, where the article — and its figure — isn't on screen.
  const figureCount = pictureImages(images).length
  const figuresShown = !figuresCollapsed
  const figuresName = figureLabel(figureCount)

  return (
    <>
      {/* Header. Focus mode spans the full viewport, so the header and the body
          below share a max-width reading column to keep line lengths sane on
          desktop and stay aligned with each other. */}
      <div className={`flex items-center gap-2 h-16 shrink-0 ${focusMode ? 'w-full max-w-4xl mx-auto px-4 sm:px-6' : 'px-3'}`}>
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* The title is the page's one control: pressing the concept's own
              name opens the action menu, so the largest thing in the header is
              the way into the page's actions rather than decoration — there is
              no ▶ button beside it. It is underlined to say so, in the text's
              own colour. The menu survives focus mode — the page filling the
              screen is when its actions are most wanted. */}
          {hasActions ? (
            <button
              ref={titleBtnRef}
              type="button"
              data-play-menu-trigger
              data-tour="concept-action"
              onClick={() => setShowPlayMenu(v => !v)}
              aria-haspopup="menu"
              aria-expanded={showPlayMenu}
              title={entry.name}
              aria-label={`Actions for ${entry.name}`}
              className="truncate text-left font-semibold text-lg sm:text-xl min-w-0 action-title-underline"
            >
              {headerTitle}
            </button>
          ) : (
            <span className="truncate font-semibold text-lg sm:text-xl min-w-0">
              {headerTitle}
            </span>
          )}
          {hasActions && (
            <ConceptActionMenu
              entry={entry}
              open={showPlayMenu}
              onClose={() => setShowPlayMenu(false)}
              anchorRef={titleBtnRef}
              content={content}
            />
          )}
        </div>
        {/* Figures toggle — the page's picture, folded away until asked for
            (hooks/useFiguresCollapsed, shared by every page). A header button
            like Listen, and for the same reason: it is a view switch, not an
            action. Glows rainbow while the figures are showing. */}
        {figureCount > 0 && !listenView && (
          <button
            type="button"
            data-sound={figuresShown ? 'toggleOff' : 'toggleOn'}
            onClick={() => setFiguresCollapsed(!figuresCollapsed)}
            aria-pressed={figuresShown}
            className={`${HEADER_BUTTON} ${figuresShown ? 'rainbow-glow text-foreground' : HEADER_BUTTON_IDLE}`}
            title={figuresShown ? `Hide ${figuresName}` : `Show ${figuresName}`}
            aria-label={figuresShown ? `Hide ${figuresName}` : `Show ${figuresName}`}
          >
            <ImageIcon className="h-5 w-5" />
          </button>
        )}
        {/* Listen toggle — a permanent control, sitting left of the expand
            toggle rather than on the action menu, since it's a view switch like
            focus mode, not an action. Survives focus mode for the same reason
            that toggle does: Listen is most useful with the page full-screen,
            so there has to be a way in and out of it there. Glows rainbow while
            Listen is on. */}
        <button
          type="button"
          onClick={() => {
            if (listenView) setListenReading(false)
            setListenView(!listenView)
          }}
          aria-pressed={listenView}
          className={`${HEADER_BUTTON} ${listenView ? 'rainbow-glow text-foreground' : HEADER_BUTTON_IDLE}`}
          title={listenView ? 'Exit Listen' : 'Listen'}
          aria-label={listenView ? 'Exit Listen' : 'Listen'}
        >
          <Headphones className="h-5 w-5" />
        </button>
        {trailing}
        {!focusMode && (
          <button
            type="button"
            onClick={onClose}
            data-sound="none"
            className={`${HEADER_BUTTON} ${HEADER_BUTTON_IDLE}`}
            title="Close page"
            aria-label={`Close ${entry.name}`}
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Body — overflow-y:scroll (not auto) keeps this a scroll container even when
          content is short, so overscroll-contain traps wheel events and the dashboard
          behind never scrolls. Scrollbar is hidden via CSS. */}
      <div
        ref={bodyRef}
        onScroll={e => rememberPageScroll(entry, e.currentTarget.scrollTop)}
        // The body is one math-focus scope: tapping any equation on the page
        // steps through all of them. See lib/mathFocus.ts.
        data-math-scope=""
        className={`flex-1 min-h-0 w-full overflow-y-scroll overscroll-contain px-4 sm:px-6 pb-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none] ${focusMode ? 'max-w-4xl mx-auto' : ''} ${listenView ? 'pt-0' : 'pt-4'}`}
      >
        {status === 'loading' && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading…
          </div>
        )}
        {status === 'error' && (
          <div className="text-sm text-muted-foreground">
            Couldn't load <span className="font-medium">{entry.name}</span>.
          </div>
        )}
        {content !== null && (
          listenView ? (
            <ListenView markdown={content} recordingFor={entry.kind === 'concept' ? entry.name : undefined} />
          ) : (
            <>
              {/* The concept's figure leads the page — see ConceptImageBanner. */}
              <ConceptImageBanner
                images={images}
                onOpen={i => { setGalleryIndex(i); setShowGallery(true) }}
              />
              {/* The reference card: what the document is, how to get it, and the
                  exams it is a reading for (docs/resource-page-v2.md). */}
              {resourceMeta && (
                <ResourceReferenceCard
                  meta={resourceMeta}
                  assignments={syllabusAssignments}
                  verification={resourceVerification}
                  contentPath={sourcePath}
                  contentName={entry.name}
                  onOpen={onOpenLink}
                  // Its document opens as the next page of the stack, with
                  // this one folded into a bar above it — a link, not a lid.
                  onReadPdf={onOpenPdf}
                  compact
                  className="mb-4"
                >
                  {entry.kind === 'resource' && (
                    <Suspense fallback={null}>
                      <ResourceAssumptionsCard resource={entry.name} compact />
                    </Suspense>
                  )}
                </ResourceReferenceCard>
              )}
              <WikiArticle
                markdown={processedContent ?? content}
                className={`${POPUP_HEADING_CLASS} ${resourceMeta ? RESOURCE_ARTICLE_CLASS : '[--sticky-heading-top:-1rem]'}`}
                outlineItems={!!resourceMeta}
                // A concept's section headings pin to the top of the pane while
                // their section is read — flush with its edge, over the body's
                // pt-4, so no text shows above them.
                stickyHeadings={entry.kind === 'concept'}
                sourcePath={sourcePath}
                hideImages
                onReadPdf={onOpenPdf}
                onWikiLink={ref => {
                  // Stay inside the popup, and keep this page: the target opens
                  // as a new panel stacked on top of it.
                  onOpenLink(ref)
                  return true
                }}
              />
            </>
          )
        )}
      </div>

      {showGallery && (
        <ImageGalleryModal
          images={images}
          initialIndex={galleryIndex}
          placement={focusMode ? 'popup-focus' : 'popup'}
          onClose={() => setShowGallery(false)}
        />
      )}
    </>
  )
}
