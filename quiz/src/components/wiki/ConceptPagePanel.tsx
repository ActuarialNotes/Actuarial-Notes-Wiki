import { useEffect, useMemo, useRef, useState } from 'react'
import { Headphones, Loader2, X } from 'lucide-react'
import { fetchWikiFile } from '@/lib/github'
import { entryRefToRepoPath, type WikiEntryRef } from '@/lib/wikiRoutes'
import { recallPageScroll, rememberPageScroll } from '@/lib/pageScrollMemory'
import { WikiArticle, extractImages } from '@/components/wiki/WikiArticle'
import { ResourceMetaCard } from '@/components/wiki/ResourceMetaCard'
import { isNumberedOutline, OUTLINE_ARTICLE_CLASS, parseResourceMeta, preprocessResourceMarkdown } from '@/lib/resourceMeta'
import { ListenView } from '@/components/wiki/ListenView'
import { ImageGalleryModal } from '@/components/wiki/ImageGalleryModal'
import { ConceptImageBanner } from '@/components/wiki/ConceptImageBanner'
import { ConceptActionMenu } from '@/components/ConceptActionMenu'
import { findKeystone } from '@/lib/keystone'

/**
 * The open page of the concept popup's stack: its header (the title, which is
 * the action menu's one trigger, plus Listen) and its body (the article or the
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
  /**
   * Reports the PDF reader (a resource page's "Read PDF") opening and closing,
   * so the popup can hand it the keys it binds too. Kept apart from the gallery
   * flag above: that one also makes the footer's Previous / Next carry the
   * gallery to the next concept, which a document being read must not do.
   */
  onReaderOpenChange?: (open: boolean) => void
}

export function ConceptPagePanel({
  entry,
  focusMode,
  onOpenLink,
  onClose,
  trailing,
  gallerySeek = 0,
  onGallerySeekResolved,
  onGalleryOpenChange,
  onReaderOpenChange,
}: ConceptPagePanelProps) {
  const [content, setContent] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  // Whether the action menu — the whole of the page's actions, hung off the
  // title — is open. Everything on it lives in ConceptActionMenu.
  const [showPlayMenu, setShowPlayMenu] = useState(false)
  const [images, setImages] = useState<Array<{ src: string; alt: string; caption: string }>>([])
  const [showGallery, setShowGallery] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [listenView, setListenView] = useState(false)
  const titleBtnRef = useRef<HTMLButtonElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  // Whether this concept is a keystone — which underline the title wears. The
  // roll-up it used to open is the action menu's own first block now.
  const keystoneMatch = useMemo(() => findKeystone(entry.name), [entry.name])

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

  const processedContent = useMemo(() => {
    if (!content) return content
    if (entry.kind !== 'resource') return content
    return preprocessResourceMarkdown(content)
  }, [content, entry.kind])

  const sourcePath = entryRefToRepoPath(entry)

  // A guide page (an exam's "How to Study" tip) has no action menu at all:
  // quizzing, keeping a card and tracking mastery are all about a concept being
  // learned, and a tip is advice about the exam. Listen stays — it is a way of
  // reading the page.
  const hasActions = entry.kind !== 'guide'

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
              no ▶ button beside it. It is underlined to say so: white (the
              text's own colour) for an ordinary concept, and the keystone
              marker's gold where that means something, since a name can only
              carry one underline. The menu survives focus mode — the page
              filling the screen is when its actions are most wanted. */}
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
              aria-label={`${entry.name} — page actions`}
              className={`truncate text-left font-semibold text-lg sm:text-xl min-w-0 ${keystoneMatch ? 'keystone-underline' : 'action-title-underline'}`}
            >
              {entry.name}
            </button>
          ) : (
            <span className={`truncate font-semibold text-lg sm:text-xl min-w-0 ${keystoneMatch ? 'keystone-underline' : ''}`}>
              {entry.name}
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
        {/* Listen toggle — a permanent control, sitting left of the expand
            toggle rather than on the action menu, since it's a view switch like
            focus mode, not an action. Survives focus mode for the same reason
            that toggle does: Listen is most useful with the page full-screen,
            so there has to be a way in and out of it there. */}
        <button
          type="button"
          onClick={() => setListenView(!listenView)}
          aria-pressed={listenView}
          className={`inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 transition-colors ${listenView ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground hover:text-foreground hover:bg-accent'}`}
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
            className="inline-flex items-center justify-center h-10 w-10 rounded-lg shrink-0 text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
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
            <ListenView markdown={content} />
          ) : (
            <>
              {/* The concept's figure leads the page — see ConceptImageBanner. */}
              <ConceptImageBanner
                images={images}
                onOpen={i => { setGalleryIndex(i); setShowGallery(true) }}
              />
              {resourceMeta && (
                <ResourceMetaCard
                  meta={resourceMeta}
                  compact
                  // The reader opens over this page, and in focus mode this
                  // page *is* the screen — so it has no chrome to keep clear of.
                  hostFullScreen={focusMode}
                  onViewerOpenChange={onReaderOpenChange}
                />
              )}
              <WikiArticle
                markdown={processedContent ?? content}
                className={
                  resourceMeta && isNumberedOutline(processedContent ?? content)
                    ? OUTLINE_ARTICLE_CLASS
                    : undefined
                }
                sourcePath={sourcePath}
                hideImages
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
