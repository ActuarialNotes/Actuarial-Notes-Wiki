import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { guidesForExam, type ExamGuide } from '@/data/examGuides'
import { hrefToEntryRef, wikiRoute } from '@/lib/wikiRoutes'
import { playSound } from '@/lib/soundEngine'

/**
 * The two orientation cards above an exam page's learning objectives, and the
 * paged popup each one opens.
 *
 * The cards borrow the Dashboard insight-card shell (`rounded-lg bg-card p-4
 * shadow-[var(--shadow-card)]`, two-up grid) and the popup borrows the
 * Dashboard help modal's paging chrome, so the whole thing reads as the same
 * component family. Type runs one step larger than those originals — this is
 * reading material, not a stat tile.
 *
 * Content lives in `data/examGuides.ts`; `WikiArticle` decides where the grid
 * lands (the `<div class="exam-guides"></div>` marker in the exam markdown).
 */

const WIKI_LINK_RE = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g

/**
 * Turn `[[Concept]]` / `[[Target|Display]]` into ordinary markdown links to the
 * in-app route. Kept local rather than reusing `WikiArticle.rewriteWikilinks`:
 * WikiArticle imports this module, and a cycle back would be fragile for one
 * regex. There are no image embeds or learning-objective repeats to handle here.
 */
export function rewriteGuideLinks(body: string): string {
  return body.replace(WIKI_LINK_RE, (_full, target: string, display?: string) => {
    const t = target.trim()
    const label = (display ?? '').trim() || (t.includes('/') ? t.split('/').pop()! : t)
    const ref = hrefToEntryRef(t) ?? { kind: 'concept' as const, name: t }
    return `[${label}](${wikiRoute(ref)})`
  })
}

interface CardProps {
  guide: ExamGuide
  onOpen: () => void
}

function ExamGuideCard({ guide, onOpen }: CardProps) {
  const { Icon, title, pages } = guide
  const Cover = pages[0].Graphic
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full flex-col rounded-lg bg-card p-4 text-left text-card-foreground shadow-[var(--shadow-card)] transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {/* max-h keeps the banner from dominating the card at desktop widths —
          the SVG letterboxes inside the plate rather than stretching. */}
      <Cover className="mb-3 max-h-36" />
      {/* Title only: the cover carries the subject, so a blurb and a page
          count just crowded a card that is two-up on a phone. */}
      <div className="flex items-start gap-2">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <h3 className="min-w-0 text-base font-semibold leading-snug tracking-tight">{title}</h3>
      </div>
    </button>
  )
}

interface ModalProps {
  guide: ExamGuide
  onClose: () => void
}

function ExamGuideModal({ guide, onClose }: ModalProps) {
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [touchStart, setTouchStart] = useState(0)

  // Paper: the panel sliding in, then back out. This modal is mounted only
  // while it's open (unlike the Dashboard help modal, which self-nulls), so the
  // cues hang off mount/unmount rather than useSoundOnToggle.
  useEffect(() => {
    playSound('open')
    return () => playSound('close')
  }, [])

  const total = guide.pages.length
  const safe = Math.min(page, total - 1)
  const { title, Graphic, body } = guide.pages[safe]
  // `step` is relative and `goTo` absolute; both clamp inside the updater so the
  // keyboard handler below can stay mounted once without going stale.
  const step = (delta: number) => setPage(p => {
    const nextPage = Math.max(0, Math.min(total - 1, p + delta))
    if (nextPage !== p) playSound('page')
    return nextPage
  })
  const goTo = (to: number) => setPage(p => {
    if (to !== p) playSound('page')
    return to
  })
  const prev = () => step(-1)
  const next = () => step(1)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- the handlers only touch setState and onClose
  }, [total, onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-background/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={guide.title}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="my-12 flex w-full max-w-lg flex-col rounded-xl bg-card shadow-2xl">
        {/* Header — the guide, then the page within it */}
        <div className="flex h-12 shrink-0 items-center gap-2 px-4">
          <guide.Icon className="h-4 w-4 shrink-0 text-primary" />
          <span className="flex-1 truncate text-sm font-semibold">{guide.title}</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className="px-5 pb-1 pt-1"
          onTouchStart={e => setTouchStart(e.touches[0].clientX)}
          onTouchEnd={e => {
            const diff = touchStart - e.changedTouches[0].clientX
            if (Math.abs(diff) > 40) { diff > 0 ? next() : prev() }
          }}
        >
          <Graphic />
          <h2 className="mt-4 text-lg font-semibold tracking-tight">{title}</h2>
          {/* data-math-scope: this page's equations step together in math focus mode. */}
          <div
            data-math-scope=""
            className="mt-2 text-base leading-relaxed [&_a]:text-primary [&_a]:underline [&_em]:italic [&_li]:my-1 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2.5 [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_li::marker]:text-muted-foreground/60"
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                a({ href, children, ...rest }) {
                  if (!href) return <a {...rest}>{children}</a>
                  return (
                    <a
                      href={href}
                      {...rest}
                      onClick={e => {
                        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
                        e.preventDefault()
                        onClose()
                        navigate(href)
                      }}
                    >
                      {children}
                    </a>
                  )
                },
              }}
            >
              {rewriteGuideLinks(body)}
            </ReactMarkdown>
          </div>
        </div>

        {/* Footer: prev / dots / next-or-got-it */}
        <div className="flex items-center justify-between px-5 pb-5 pt-4">
          <button
            type="button"
            onClick={prev}
            disabled={safe === 0}
            className="rounded-full bg-muted/40 p-2.5 text-foreground shadow-sm transition-colors hover:bg-muted disabled:opacity-30 disabled:hover:bg-muted/40"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-1.5">
            {guide.pages.map((p, i) => (
              <button
                key={p.title}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to page ${i + 1}: ${p.title}`}
                aria-current={i === safe}
                className={`rounded-full transition-all duration-200 ${i === safe ? 'h-1.5 w-4 bg-primary' : 'h-1.5 w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60'}`}
              />
            ))}
          </div>
          {safe < total - 1 ? (
            <button
              type="button"
              onClick={next}
              className="rounded-full bg-muted/40 p-2.5 text-foreground shadow-sm transition-colors hover:bg-muted"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Got it
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

export function ExamGuideCards({ examId }: { examId: string }) {
  const guides = guidesForExam(examId)
  const [openId, setOpenId] = useState<string | null>(null)
  if (guides.length === 0) return null
  const open = guides.find(g => g.id === openId) ?? null

  return (
    <div className="not-prose my-5">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {guides.map(guide => (
          <ExamGuideCard key={guide.id} guide={guide} onOpen={() => setOpenId(guide.id)} />
        ))}
      </div>
      {open && <ExamGuideModal key={open.id} guide={open} onClose={() => setOpenId(null)} />}
    </div>
  )
}
