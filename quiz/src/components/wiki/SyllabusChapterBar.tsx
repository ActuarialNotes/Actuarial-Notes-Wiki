import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NavProgressBar } from '@/components/NavProgressBar'
import {
  buildSyllabusChapters,
  chapterAtPosition,
  chapterPositionForScroll,
  scrollForChapterPosition,
  SYLLABUS_BAR_UNITS,
  type MeasuredObjective,
  type SyllabusChapter,
} from '@/lib/syllabusChapters'

/**
 * The chapter bar along the bottom of a study guide's sticky header.
 *
 * An exam page is a syllabus: three to six **main learning objectives** and the
 * reading list under them. This is those objectives, as the same chaptered bar
 * the exam-PDF reader carries — one segment per objective, the one you are
 * reading filled, its name and its share of the exam in the bubble, and a press
 * or a drag scrolls there. The syllabus you are studying should be one glance,
 * not a scroll and a squint.
 *
 * Two deliberate differences from the PDF's bar, both explained in
 * `lib/syllabusChapters.ts`: the segments are sized by **exam weight** rather
 * than by page extent (the objective callouts collapse to identical strips, so
 * page extent would say nothing, while the weights say what the exam is made
 * of), and the keys step chapter-to-chapter, since one position here is a
 * thousandth of an exam.
 *
 * The objectives are found in the DOM rather than re-parsed out of the
 * markdown: `MarkdownCallout` marks each weighted `[!example]` callout with
 * `data-objective`, which is exactly a syllabus learning objective and nothing
 * else in the vault. A page with fewer than two renders no bar at all.
 */
export function SyllabusChapterBar() {
  const location = useLocation()
  const [chapters, setChapters] = useState<SyllabusChapter[]>([])
  const [position, setPosition] = useState(1)
  // How far under the top of the document the reading line sits: the sticky
  // header covers that much of the page, so it is both what "you are here"
  // means and where a jump has to land for the objective's title to be visible.
  const headerRef = useRef(0)
  // Set while a drag is moving the page, so the scroll events it causes don't
  // recompute the position under the finger and fight it by a rounding step.
  const scrubUntilRef = useRef(0)

  const measure = useCallback(() => {
    const header = document.querySelector<HTMLElement>('[data-floating-search]')
    headerRef.current = header ? header.getBoundingClientRect().height : 0

    const objectives: MeasuredObjective[] = Array.from(
      document.querySelectorAll<HTMLElement>('[data-objective]'),
    ).map(el => {
      const box = el.getBoundingClientRect()
      return {
        title: el.dataset.objective ?? '',
        weight: el.dataset.objectiveWeight ?? '',
        top: box.top + window.scrollY,
        bottom: box.bottom + window.scrollY,
      }
    })

    const next = buildSyllabusChapters(objectives)
    setChapters(prev => (sameChapters(prev, next) ? prev : next))
  }, [])

  // Re-measure on anything that can move an objective: the page arriving, a
  // callout being expanded or collapsed, the window being resized, a font
  // finally loading. A ResizeObserver on the body catches all of them, since
  // every one of them changes the document's height.
  useEffect(() => {
    measure()
    const observer = new ResizeObserver(() => measure())
    observer.observe(document.body)
    window.addEventListener('resize', measure)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [measure, location.pathname])

  useEffect(() => {
    if (chapters.length === 0) return
    const onScroll = () => {
      if (performance.now() < scrubUntilRef.current) return
      setPosition(chapterPositionForScroll(chapters, window.scrollY + headerRef.current))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [chapters])

  const marks = useMemo(
    () => chapters.map(chapter => ({ start: chapter.start, label: chapter.title })),
    [chapters],
  )

  const scrubTo = useCallback((next: number) => {
    setPosition(next)
    // The scroll below lands a frame or two later and arrives as events of its
    // own; this holds them off until it has settled.
    scrubUntilRef.current = performance.now() + 200
    window.scrollTo({
      top: Math.max(0, scrollForChapterPosition(chapters, next) - headerRef.current),
      behavior: 'instant' as ScrollBehavior,
    })
  }, [chapters])

  if (chapters.length < 2) return null

  const here = chapterAtPosition(chapters, position)

  return (
    <NavProgressBar
      current={position}
      total={SYLLABUS_BAR_UNITS}
      segments={marks}
      keyStep="segment"
      onScrub={scrubTo}
      // The bar's own number is a share of the exam, which is no use said out
      // loud ("position 412"). The objective's weight is the reading that
      // belongs beside its name — it is what the segment's width *is*.
      formatValue={n => {
        const chapter = chapterAtPosition(chapters, n)
        return chapter?.weight ? `${chapter.weight} of the exam` : ''
      }}
      label={here ? `Learning objectives — ${here.title}` : 'Learning objectives'}
      className="border-t border-border/60"
    />
  )
}

/** Whether a fresh measurement changed anything the bar draws. */
function sameChapters(a: SyllabusChapter[], b: SyllabusChapter[]): boolean {
  if (a.length !== b.length) return false
  return a.every((chapter, i) =>
    chapter.title === b[i].title &&
    chapter.start === b[i].start &&
    chapter.end === b[i].end &&
    chapter.top === b[i].top &&
    chapter.bottom === b[i].bottom)
}
