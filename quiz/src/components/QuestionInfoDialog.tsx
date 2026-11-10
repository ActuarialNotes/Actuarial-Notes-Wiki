import { useEffect, useState } from 'react'
import { BookOpen, ChevronDown, ExternalLink, Info } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { githubBlobUrl } from '@/lib/github'
import { conceptLabel } from '@/lib/questionFilters'
import { hrefToEntryRef, wikiRoute } from '@/lib/wikiRoutes'
import { questionFigures, questionSource, questionTitle } from '@/lib/questionSource'
import { useSoundOnMount } from '@/hooks/useSoundEffects'
import { BannerTile, EXAM_BANNER, InfoBanner, InfoFinePrint, InfoSheet, NEUTRAL_BANNER, Stat } from '@/components/ui/InfoSheet'
import { GROUP_ACTION_ROW, RowChevron, RowTile } from '@/components/ui/infoRows'
import { Group, GroupRow } from '@/components/ui/GroupedList'
import { ExamLogo } from '@/components/ExamLogo'
import { examAccentStyle } from '@/lib/examColors'
import { FACT_CHECK_UI_ENABLED } from '@/lib/featureFlags'
import { FACT_CHECK_TONE_CLASSES, FACT_CHECK_ICONS } from '@/lib/factCheckTone'
import { factCheckBadge, formatCheckedDate } from '@/lib/verification'
import { FactCheckDialog } from '@/components/FactCheckBadge'
import { PdfLinkButton } from '@/components/PdfLinkButton'
import type { Question } from '@/lib/parser'
import { EXAM_LABEL_TO_ID } from '@/lib/examIds'
import { ConceptPageIcon } from '@/components/ConceptPageIcon'

/**
 * **Question info** — where the question on screen came from.
 *
 * Sits beside the flag in the quiz's question bar, because that is the moment
 * the question gets asked: a candidate who half-recognises a question wants to
 * know which paper it was sat on, and one who thinks the answer is wrong wants
 * the file to report or fix. Neither is on screen anywhere else mid-quiz. Every
 * list of questions carries it too, on each row (`QuestionSearchRow`), so a
 * question's source and fact check can be read before it is ever drawn.
 *
 * It is also where a question's **fact check** is read from. A concept page
 * carries that on its action menu and a resource page on its own, but a
 * question is only ever met inside a quiz — so the record of what has been
 * checked about *this* question, and anything known to be wrong with it, hangs
 * off the same button as the rest of its provenance.
 *
 * What it deliberately does *not* show while the question is unanswered is the
 * study metadata — topic, learning objective, difficulty. `QuestionCard` hides
 * those during a live quiz for the same reason (`showMeta`): "hard, Bayes
 * Theorem" narrows four options down to two. They appear once the answer is in.
 */

export interface QuestionInfoDialogProps {
  question: Question
  showStudyMeta?: boolean
  onOpenConcept?: (links: string[], index: number) => void
  onClose: () => void
}

export function QuestionInfoDialog({
  question,
  showStudyMeta = false,
  onOpenConcept,
  onClose,
}: QuestionInfoDialogProps) {
  const [showFactCheck, setShowFactCheck] = useState(false)
  // Paper: the panel sliding in, same as the shortcuts sheet next to it.
  useSoundOnMount('open')
  useEffect(() => {
    // The fact-check sheet opens on top of this one and binds Esc itself, so
    // this panel hands the keys over while it is up — otherwise one Esc closed
    // the record *and* the panel it was opened from.
    if (showFactCheck) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key === 'i') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, showFactCheck])

  const source = questionSource(question)
  const factCheck = factCheckBadge(question.verification)
  const FactCheckIcon = FACT_CHECK_ICONS[factCheck.kind]
  // The record is addressed by the question's own vault path, which only the
  // `verification:` block carries (`contentPathFromVerification`). With no
  // block there is nothing to open and nothing to report against.
  const factCheckPath = question.verification ? source.path : null
  const showFactCheckRow = FACT_CHECK_UI_ENABLED && !!factCheckPath
  const examKey = EXAM_LABEL_TO_ID[question.exam]
  const figures = questionFigures(question)

  return (
    <InfoSheet
      onClose={onClose}
      label="Question info"
      // z-[130], the record sheets' layer: a question list that opens this
      // can itself be a z-[130] modal (the concept questions modal, the
      // learning-progress modal), and a later sibling at the same layer
      // paints on top.
      layer="z-[130]"
      style={examKey ? examAccentStyle(examKey) : undefined}
    >
      <InfoBanner
        tile={examKey
          ? <ExamLogo examKey={examKey} size="md" />
          : <BannerTile><Info className="h-5 w-5" /></BannerTile>}
        eyebrow={source.label}
        title={questionTitle(question)}
        titleId="question-info-title"
        onClose={onClose}
        tint={examKey ? EXAM_BANNER : NEUTRAL_BANNER}
        stats={figures.map(f => (
          <Stat key={f.key} value={f.value} label={f.label} accent={f.key === 'points'} />
        ))}
      />

      <Group footer={source.movedTo ? <p>Now on the {source.movedTo} syllabus.</p> : undefined}>
        {/* Where the question came from: the paper it was sat on, the
            publisher's sample set, or the vault's own. */}
        <GroupRow label="Source" detail={source.origin} />
        {source.document && (
          // The publisher's own paper, read in the app like every other PDF.
          // This panel closes as it hands over: once the document is up, the
          // only thing behind it worth returning to is the question.
          <PdfLinkButton
            variant="row"
            url={source.document.url}
            label={source.document.label}
            subtitle={source.label}
            onOpen={onClose}
          />
        )}
        {showFactCheckRow && (
          <button
            type="button"
            onClick={() => setShowFactCheck(true)}
            data-sound="tap"
            aria-label={`Fact check: ${factCheck.label}. ${factCheck.detail}`}
            className={GROUP_ACTION_ROW}
          >
            <RowTile className={FACT_CHECK_TONE_CLASSES[factCheck.tone]}>
              <FactCheckIcon className="h-3.5 w-3.5" />
            </RowTile>
            <span className="min-w-0 flex-1">{factCheckRowLabel(factCheck.label)}</span>
            {factCheckDate(question) && (
              <span className="shrink-0 tabular-nums text-muted-foreground">{factCheckDate(question)}</span>
            )}
            <RowChevron />
          </button>
        )}
        <QuestionConcepts
          links={question.wiki_link}
          exam={examKey}
          onOpen={onClose}
          onRead={onOpenConcept && ((i: number) => { onClose(); onOpenConcept(question.wiki_link, i) })}
        />
      </Group>

      {showStudyMeta && (
        // Topic, objective and difficulty wait for the answer (`showMeta`).
        <Group>
          <GroupRow label="Topic" detail={question.topic} />
          {question.learning_objective && <GroupRow label="Learning objective" detail={question.learning_objective} />}
          <GroupRow label="Difficulty" value={<span className="capitalize">{question.difficulty}</span>} />
        </Group>
      )}

      <InfoFinePrint>
        <span className="min-w-0 break-all font-mono">
          {question.id}
          {question.author && <span className="font-sans"> · {question.author}</span>}
        </span>
        {source.path && (
          <a
            href={githubBlobUrl(source.path)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1 transition-colors hover:text-foreground"
          >
            <ExternalLink className="h-3 w-3" aria-hidden />
            GitHub
          </a>
        )}
      </InfoFinePrint>

      {factCheckPath && (
        <FactCheckDialog
          open={showFactCheck}
          onClose={() => setShowFactCheck(false)}
          verification={question.verification}
          contentPath={factCheckPath}
          contentName={source.sitting ? `${source.exam} · ${source.sitting}` : question.id}
        />
      )}
    </InfoSheet>
  )
}

/** "Fact checked · 23 Oct 2026" was one label; the row puts the date at its right. */
function factCheckRowLabel(label: string): string {
  return label.split(' · ')[0]
}

function factCheckDate(question: Question): string | null {
  return formatCheckedDate(question.verification?.lastChecked ?? null)
}

/**
 * The concepts the question is tagged with (`wiki_link`), folded shut. Closed
 * by default for the reason the study metadata waits for the answer: a list of
 * concepts narrows a question down. Opening it is the reader's choice. Each
 * row goes to the concept's page — the quiz outlives the page
 * (`lib/quizResume.ts`), so the Return pill brings the reader back to it.
 */
function QuestionConcepts({
  links,
  exam,
  onOpen,
  onRead,
}: {
  links: string[]
  /** The question's exam (progress key): each concept's icon is its colour. */
  exam?: string
  onOpen: () => void
  /** Read the concept at this index in the popup, rather than going to its page. */
  onRead?: (index: number) => void
}) {
  const [open, setOpen] = useState(false)
  if (links.length === 0) return null
  const names = links.map(conceptLabel)
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        data-sound="tap"
        className={GROUP_ACTION_ROW}
      >
        <RowTile><BookOpen className="h-3.5 w-3.5" /></RowTile>
        <span className="min-w-0 flex-1">Concepts</span>
        <span className="shrink-0 tabular-nums text-muted-foreground">{links.length}</span>
        <ChevronDown
          className={cn('h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')}
          aria-hidden
        />
      </button>
      {open && links.map((link, i) => {
        const name = names[i]
        const body = (
          <>
            <ConceptPageIcon concept={link} exam={exam} />
            <span className="min-w-0 flex-1 truncate">{name}</span>
            <RowChevron />
          </>
        )
        return onRead ? (
          <button key={link} type="button" data-sound="tap" onClick={() => onRead(i)} className={cn(GROUP_ACTION_ROW, 'pl-6')}>
            {body}
          </button>
        ) : (
          <Link
            key={link}
            to={wikiRoute(hrefToEntryRef(link) ?? { kind: 'concept', name })}
            onClick={onOpen}
            className={cn(GROUP_ACTION_ROW, 'pl-6')}
          >
            {body}
          </Link>
        )
      })}
    </>
  )
}
