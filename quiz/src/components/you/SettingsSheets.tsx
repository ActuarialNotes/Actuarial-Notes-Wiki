// The popups Settings' rows open (docs/redesign-spec.md §7b.3, §8 Phase H).
// Every row is edited in place or in one of these, so Settings is one screen.

import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Copy, Download } from 'lucide-react'
import { TRACKS } from '@/data/tracks'
import { useSoundEffects } from '@/hooks/useSoundEffects'
import { SKILL_ASSET, connectorUrl } from '@/lib/aiConnector'
import { EXAM_ID_TO_LABEL, RESETTABLE_EXAMS } from '@/lib/examIds'
import { fetchExportResponses, responsesToCsv, buildExportFilename, downloadCsv, exportScopeSlug } from '@/lib/exportData'
import { buildProgressReport, generateProgressReportPdf, buildPdfFilename } from '@/lib/exportPdf'
import { CheckMark } from '@/components/CheckMark'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/buttonVariants'
import { Popup, PopupTitle } from '@/components/ui/Popup'
import { ChoiceRow, SwitchRow } from '@/components/you/rows'
import { cn } from '@/lib/utils'

const FIELD = 'h-12 w-full rounded-[14px] border-[1.5px] border-border bg-ground px-3.5 text-base text-foreground focus-visible:border-foreground focus-visible:outline-none disabled:opacity-50'
const PICK_ROW = 'flex min-h-[56px] w-full items-center gap-3.5 rounded-[18px] px-[18px] py-2.5 text-left text-[17px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ground'

function Field({ label, children }: { label: string; children: (id: string) => ReactNode }) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[15px] font-semibold">{label}</label>
      {children(id)}
    </div>
  )
}

function Message({ children, alert }: { children: ReactNode; alert?: boolean }) {
  if (!children) return null
  return <p role={alert ? 'alert' : 'status'} className="text-[15px] font-semibold leading-normal">{children}</p>
}

/** A scope picker: every exam, or one. */
function ExamScope({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  return (
    <Field label="Exam">
      {id => (
        <select id={id} value={value} onChange={e => onChange(e.target.value)} className={FIELD}>
          <option value="all">All exams</option>
          {RESETTABLE_EXAMS.map(({ id: examId, label }) => <option key={examId} value={examId}>{label}</option>)}
        </select>
      )}
    </Field>
  )
}

const scopeLabel = (scope: string) => (scope === 'all' ? 'all exams' : EXAM_ID_TO_LABEL[scope] ?? scope)

// ── Studying ─────────────────────────────────────────────────────────────────

/** One of the reader's exams: its date, and the two ways it leaves the list. */
export function ExamSettingsSheet({
  label, date, onSaveDate, onPassed, onRemove, onClose,
}: {
  label: string
  date: string | null
  onSaveDate: (date: string | null) => Promise<boolean>
  onPassed: () => Promise<boolean>
  onRemove: () => Promise<boolean>
  onClose: () => void
}) {
  const titleId = useId()
  const [value, setValue] = useState(date ?? '')
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)

  const run = async (work: () => Promise<boolean>) => {
    setBusy(true)
    setFailed(false)
    const ok = await work()
    setBusy(false)
    if (ok) onClose()
    else setFailed(true)
  }

  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>{label}</PopupTitle>
      <form
        className="flex flex-col gap-[18px]"
        onSubmit={(e: FormEvent) => { e.preventDefault(); void run(() => onSaveDate(value || null)) }}
      >
        <Field label="Exam date">
          {id => <input id={id} type="date" value={value} onChange={e => setValue(e.target.value)} className={FIELD} />}
        </Field>
        {failed && <Message alert>The change wasn’t saved. Try again in a minute.</Message>}
        <Button type="submit" size="main" className="w-full" disabled={busy || value === (date ?? '')}>Save date</Button>
      </form>
      <div className="flex flex-col gap-2.5">
        <Button variant="edge" size="lg" className="w-full" disabled={busy} onClick={() => void run(onPassed)}>
          Mark as passed
        </Button>
        <Button variant="edge" size="lg" className="w-full" disabled={busy} onClick={() => void run(onRemove)}>
          Remove from my exams
        </Button>
      </div>
    </Popup>
  )
}

/** The credential the reader is working towards. Picking one keeps it. */
export function TrackSheet({ selected, onPick, onClose }: { selected: string; onPick: (key: string) => void; onClose: () => void }) {
  const titleId = useId()
  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>Credential track</PopupTitle>
      <div role="radiogroup" aria-label="Credential track" className="flex flex-col gap-2.5">
        {TRACKS.map(track => {
          const on = track.key === selected
          return (
            <button
              key={track.key}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => { onPick(track.key); onClose() }}
              className={cn(PICK_ROW, on ? 'border-2 border-foreground' : 'border-[1.5px] border-border hover:border-foreground')}
            >
              <span className="min-w-0 flex-1">{track.name}</span>
              {on && <CheckMark className="h-7 w-7 shrink-0 text-foreground" />}
            </button>
          )
        })}
      </div>
    </Popup>
  )
}

// ── App ──────────────────────────────────────────────────────────────────────

/** Sound: on or off, and how loud. The slider plays a click when let go. */
export function SoundSheet({ onClose }: { onClose: () => void }) {
  const titleId = useId()
  const volumeId = useId()
  const { enabled, setEnabled, volume, setVolume, play } = useSoundEffects()
  const pct = Math.round(volume * 100)
  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>Sound</PopupTitle>
      <div className="flex flex-col divide-y divide-border">
        <SwitchRow
          label="Sound effects"
          on={enabled}
          sound="none"
          onChange={next => { setEnabled(next); if (next) play('toggleOn') }}
          testId="sound-switch"
        />
        <div className={cn('flex min-h-[56px] items-center gap-3.5', !enabled && 'opacity-40')}>
          <label htmlFor={volumeId} className="text-[17px] font-medium">Volume</label>
          <input
            id={volumeId}
            type="range"
            min={0}
            max={100}
            step={5}
            value={pct}
            disabled={!enabled}
            onChange={e => setVolume(Number(e.target.value) / 100)}
            // Heard on release, so a drag doesn't repeat the click.
            onPointerUp={() => play('click')}
            onKeyUp={() => play('click')}
            className="h-11 min-w-0 flex-1 accent-[hsl(var(--foreground))]"
          />
          <span className="w-11 text-right text-[15px] font-bold tabular-nums" aria-hidden="true">{pct}%</span>
        </div>
      </div>
      <Button size="main" className="w-full" onClick={onClose}>Done</Button>
    </Popup>
  )
}

/**
 * AI assistants (docs/ai-connector.md): the connector's address for Claude or
 * ChatGPT, and the skill to upload. The address is always the public one; a
 * preview deployment's would be one no assistant can reach.
 */
export function AiAssistantsSheet({ onClose }: { onClose: () => void }) {
  const titleId = useId()
  const url = connectorUrl()
  const [copied, setCopied] = useState(false)
  const addressRef = useRef<HTMLElement>(null)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // No clipboard: select the address so copying by hand is one keystroke.
      const node = addressRef.current
      if (node) window.getSelection()?.selectAllChildren(node)
    }
  }

  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>AI assistants</PopupTitle>
      <p className="text-[17px] leading-normal">
        Study from these notes inside Claude or ChatGPT: syllabi, concept pages, and past exam questions marked
        against the official solutions.
      </p>
      <code ref={addressRef} className="select-all break-all rounded-[14px] border border-border px-3.5 py-3 font-mono text-[15px]">
        {url}
      </code>
      <Button size="main" className="w-full" onClick={() => void copy()} aria-live="polite">
        {copied ? <CheckMark className="h-5 w-5 text-current" /> : <Copy className="h-5 w-5" aria-hidden="true" />}
        {copied ? 'Copied' : 'Copy address'}
      </Button>
      <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2.5 text-[15px] leading-normal">
        <dt className="font-bold">Claude</dt>
        <dd>Customize → Connectors → + → Add custom connector, and paste the address.</dd>
        <dt className="font-bold">ChatGPT</dt>
        <dd>Turn on Developer mode (Settings → Security and login), then add an app for the address with No authentication.</dd>
      </dl>
      <p className="text-[15px] leading-normal">
        The study coach skill has Claude or ChatGPT tutor from the notes. Download it, then upload it there.
      </p>
      {/* Same origin, so `download` saves the file on every deployment. */}
      <a href={`/${SKILL_ASSET}`} download className={cn(buttonVariants({ variant: 'edge', size: 'lg' }), 'w-full gap-2')}>
        <Download className="h-4 w-4" aria-hidden="true" />
        Download skill
      </a>
    </Popup>
  )
}

/** Light or dark, as a row: it is edited in place, so it has no popup. */
export function ThemeRow({ theme, onToggle }: { theme: 'light' | 'dark'; onToggle: () => void }) {
  return (
    <ChoiceRow
      label="Theme"
      value={theme}
      options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]}
      onChange={() => onToggle()}
    />
  )
}

// ── Account ──────────────────────────────────────────────────────────────────

/** One text field and Save: the name, or the email. */
export function TextFieldSheet({
  title, label, type = 'text', initial, autoComplete, note, saved, onSave, onClose,
}: {
  title: string
  label: string
  type?: 'text' | 'email'
  initial: string
  autoComplete?: string
  /** What happens on Save, when it isn't immediate. */
  note?: string
  /** Shown in place of the form once saved; with none the popup closes. */
  saved?: (value: string) => string
  onSave: (value: string) => Promise<boolean>
  onClose: () => void
}) {
  const titleId = useId()
  const [value, setValue] = useState(initial)
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)
  const [done, setDone] = useState<string | null>(null)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    const next = value.trim()
    if (!next || next === initial) return
    setBusy(true)
    setFailed(false)
    const ok = await onSave(next)
    setBusy(false)
    if (!ok) setFailed(true)
    else if (saved) setDone(saved(next))
    else onClose()
  }

  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>{title}</PopupTitle>
      {done ? (
        <>
          <Message>{done}</Message>
          <Button size="main" className="w-full" onClick={onClose}>Done</Button>
        </>
      ) : (
        <form className="flex flex-col gap-[18px]" onSubmit={e => void submit(e)}>
          <Field label={label}>
            {id => (
              <input
                id={id}
                type={type}
                value={value}
                required
                autoComplete={autoComplete}
                onChange={e => setValue(e.target.value)}
                className={FIELD}
              />
            )}
          </Field>
          {note && <p className="text-[15px] leading-normal">{note}</p>}
          {failed && <Message alert>The change wasn’t saved. Try again in a minute.</Message>}
          <Button type="submit" size="main" className="w-full" disabled={busy || !value.trim() || value.trim() === initial}>
            {busy ? 'Saving…' : 'Save'}
          </Button>
        </form>
      )}
    </Popup>
  )
}

export function PasswordSheet({
  error, onSave, onClose,
}: {
  /** Why the last try failed, from the account. */
  error: string | null
  onSave: (current: string, next: string) => Promise<boolean | undefined>
  onClose: () => void
}) {
  const titleId = useId()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [again, setAgain] = useState('')
  const [invalid, setInvalid] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [tried, setTried] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setTried(false)
    if (next.length < 8) { setInvalid('Your new password needs at least 8 characters.'); return }
    if (next !== again) { setInvalid('The two new passwords don’t match.'); return }
    setInvalid(null)
    setBusy(true)
    const ok = await onSave(current, next)
    setBusy(false)
    if (ok) onClose()
    else setTried(true)
  }

  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>Password</PopupTitle>
      <form className="flex flex-col gap-[18px]" onSubmit={e => void submit(e)}>
        <Field label="Current password">
          {id => <input id={id} type="password" required autoComplete="current-password" value={current} onChange={e => setCurrent(e.target.value)} className={FIELD} />}
        </Field>
        <Field label="New password">
          {id => <input id={id} type="password" required autoComplete="new-password" value={next} onChange={e => setNext(e.target.value)} className={FIELD} />}
        </Field>
        <Field label="New password, again">
          {id => <input id={id} type="password" required autoComplete="new-password" value={again} onChange={e => setAgain(e.target.value)} className={FIELD} />}
        </Field>
        <Message alert>{invalid ?? (tried ? error : null)}</Message>
        <Button type="submit" size="main" className="w-full" disabled={busy}>{busy ? 'Saving…' : 'Change password'}</Button>
      </form>
    </Popup>
  )
}

/** A subscriber's Pro: when it renews, and the way to the billing page. */
export function ProSheet({
  renews, onManage, onClose,
}: {
  /** The renewal date, printed; null when the account carries none. */
  renews: string | null
  /** Opens the billing page; resolves false when it couldn't. */
  onManage: () => Promise<boolean>
  onClose: () => void
}) {
  const titleId = useId()
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)
  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>Pro</PopupTitle>
      {renews && <p className="text-[17px] leading-normal">Renews {renews}.</p>}
      <p className="text-[17px] leading-normal">Change your card, switch plans or cancel on the billing page.</p>
      {failed && <Message alert>The billing page didn’t open. Try again in a minute, or contact us from Help.</Message>}
      <Button
        size="main"
        className="w-full"
        disabled={busy}
        onClick={() => {
          setBusy(true)
          setFailed(false)
          void onManage().then(ok => { if (!ok) { setBusy(false); setFailed(true) } })
        }}
      >
        {busy ? 'Opening…' : 'Manage subscription'}
      </Button>
    </Popup>
  )
}

// ── Your data ────────────────────────────────────────────────────────────────

/** Export the reader's answered questions, as a spreadsheet or a report. */
export function ExportSheet({ userId, owner, onClose }: { userId: string; owner: string; onClose: () => void }) {
  const titleId = useId()
  const [scope, setScope] = useState('all')
  const [format, setFormat] = useState<'csv' | 'pdf'>('csv')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState<{ text: string; alert: boolean } | null>(null)

  const run = async () => {
    const examId = scope === 'all' ? null : scope
    setBusy(true)
    setMessage(null)
    try {
      const rows = await fetchExportResponses(userId, examId)
      if (rows.length === 0) {
        setMessage({ text: `There are no answered questions to export for ${scopeLabel(scope)}.`, alert: true })
        return
      }
      if (format === 'pdf') {
        const title = examId ? EXAM_ID_TO_LABEL[examId] ?? examId : 'All exams'
        await generateProgressReportPdf(buildProgressReport(rows), { scopeLabel: title, owner }, buildPdfFilename(exportScopeSlug(examId)))
      } else {
        downloadCsv(buildExportFilename(examId), responsesToCsv(rows))
      }
      setMessage({
        text: `Exported ${rows.length} ${rows.length === 1 ? 'question' : 'questions'} for ${scopeLabel(scope)}.`,
        alert: false,
      })
    } catch (err) {
      console.error('settings: export failed:', err)
      setMessage({ text: 'Your data couldn’t be exported. Try again in a minute.', alert: true })
    } finally {
      setBusy(false)
    }
  }

  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>Export</PopupTitle>
      <p className="text-[17px] leading-normal">
        {format === 'csv'
          ? 'A spreadsheet with a row for every question you’ve answered: the date, exam, topic, your answer, the correct answer, the result and the time taken.'
          : 'A report of your accuracy by exam and by topic.'}
      </p>
      <ExamScope value={scope} onChange={setScope} />
      <ChoiceRow
        label="Format"
        value={format}
        options={[{ value: 'csv', label: 'Spreadsheet' }, { value: 'pdf', label: 'PDF report' }]}
        onChange={setFormat}
      />
      <Message alert={message?.alert}>{message?.text}</Message>
      <Button size="main" className="w-full" disabled={busy} onClick={() => void run()}>
        {busy ? 'Exporting…' : 'Export'}
      </Button>
    </Popup>
  )
}

/** Reset study history, for one exam or all: the choice, then the confirmation. */
export function ResetSheet({ onReset, onClose }: { onReset: (examId: string | null) => Promise<boolean>; onClose: () => void }) {
  const titleId = useId()
  const [scope, setScope] = useState('all')
  const [busy, setBusy] = useState(false)
  const [outcome, setOutcome] = useState<'done' | 'failed' | null>(null)

  const run = async () => {
    setBusy(true)
    const ok = await onReset(scope === 'all' ? null : scope)
    setBusy(false)
    setOutcome(ok ? 'done' : 'failed')
  }

  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>Reset study history</PopupTitle>
      {outcome === 'done' ? (
        <>
          <Message>Study history and concept levels cleared for {scopeLabel(scope)}.</Message>
          <Button size="main" className="w-full" onClick={onClose}>Done</Button>
        </>
      ) : (
        <>
          <ExamScope value={scope} onChange={setScope} />
          <p className="text-[17px] leading-normal">
            This deletes your quiz history, your answers and your concept levels for {scopeLabel(scope)}. It can’t be
            undone.
          </p>
          {outcome === 'failed' && <Message alert>Your study history couldn’t be reset. Try again in a minute.</Message>}
          <div className="flex flex-col gap-2.5">
            <Button size="main" className="w-full" disabled={busy} onClick={() => void run()}>
              {busy ? 'Resetting…' : 'Reset study history'}
            </Button>
            <Button variant="edge" size="lg" className="w-full" disabled={busy} onClick={onClose}>Keep it</Button>
          </div>
        </>
      )}
    </Popup>
  )
}

/** Delete the account. The reader types DELETE before the button will press. */
export function DeleteAccountSheet({ onDelete, onClose }: { onDelete: () => Promise<boolean>; onClose: () => void }) {
  const titleId = useId()
  const [typed, setTyped] = useState('')
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (typed !== 'DELETE') return
    setBusy(true)
    setFailed(false)
    const ok = await onDelete()
    if (!ok) { setBusy(false); setFailed(true) }
  }

  return (
    <Popup onClose={onClose} labelledBy={titleId}>
      <PopupTitle id={titleId}>Delete account</PopupTitle>
      <p className="text-[17px] leading-normal">
        This deletes your account, your quiz history and your exam progress. It can’t be undone.
      </p>
      <form className="flex flex-col gap-[18px]" onSubmit={e => void submit(e)}>
        <Field label="Type DELETE to confirm">
          {id => <input id={id} value={typed} onChange={e => setTyped(e.target.value)} autoComplete="off" autoCapitalize="characters" className={FIELD} />}
        </Field>
        {failed && <Message alert>Your account couldn’t be deleted, and nothing was removed. Try again, or contact us from Help.</Message>}
        <div className="flex flex-col gap-2.5">
          <Button type="submit" size="main" className="w-full" disabled={busy || typed !== 'DELETE'}>
            {busy ? 'Deleting…' : 'Delete account'}
          </Button>
          <Button type="button" variant="edge" size="lg" className="w-full" disabled={busy} onClick={onClose}>Keep my account</Button>
        </div>
      </form>
    </Popup>
  )
}
