import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { ChevronDown, Keyboard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { KEYPAD_ROWS, type Entry, type KeypadKey } from '@/lib/sheetKeypad'

/**
 * **The spreadsheet keypad** (lib/sheetKeypad.ts): on a phone, the cell's
 * entry line, a row of functions and a number pad, in place of the phone's own
 * keyboard. The entry line is a real text field that asks for no keyboard
 * (`inputMode="none"`), so a tap still places the caret in it; the keyboard button brings
 * the phone’s keyboard up for a label. Its type is 18px, past the 16px below
 * which a phone zooms in on a field it focuses.
 *
 * Keys act on pointer down and keep the focus where it was, so a key never
 * steals the caret or raises the keyboard.
 */

export interface SheetKeypadProps {
  /** The selected cell's address, `B3`. */
  address: string | null
  entry: Entry
  /** The functions offered, those the exam-day rules allow. */
  functions: readonly string[]
  /** The phone's own keyboard is up. */
  typing: boolean
  onType: (text: string) => void
  onFunction: (name: string) => void
  onKey: (action: NonNullable<KeypadKey['action']>) => void
  /** The entry line changed under the phone's keyboard, or its caret moved. */
  onEntry: (text: string, caret: number) => void
  onTyping: (typing: boolean) => void
  onHide: () => void
}

/** Act on press, and keep the focus where it is. */
function press(fn: () => void) {
  return (e: ReactPointerEvent) => {
    e.preventDefault()
    fn()
  }
}

export default function SheetKeypad({
  address, entry, functions, typing, onType, onFunction, onKey, onEntry, onTyping, onHide,
}: SheetKeypadProps) {
  const input = useRef<HTMLInputElement>(null)

  // Keep the field's caret where the entry says it is.
  useEffect(() => {
    const el = input.current
    if (!el || document.activeElement !== el) return
    if (el.selectionStart !== entry.caret || el.selectionEnd !== entry.caret) el.setSelectionRange(entry.caret, entry.caret)
  }, [entry])

  // Raising or lowering the phone's keyboard needs the field refocused.
  useEffect(() => {
    const el = input.current
    if (!el) return
    if (typing) {
      el.focus()
    } else if (document.activeElement === el) {
      el.blur()
    }
  }, [typing])

  const keyClass = 'flex h-11 select-none items-center justify-center rounded-lg text-lg font-medium active:bg-muted-foreground/25'

  return (
    <div className="shrink-0 border-t border-border bg-muted/60 px-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] pt-1.5" data-sound="none" aria-label="Keypad" role="group">
      <div className="flex items-center gap-1.5">
        <span className="w-12 shrink-0 text-center text-sm font-semibold tabular-nums">{address ?? '—'}</span>
        <input
          ref={input}
          aria-label={address ? `Contents of ${address}` : 'Cell contents'}
          inputMode={typing ? 'text' : 'none'}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="enter"
          value={entry.text}
          onChange={e => onEntry(e.target.value, e.target.selectionStart ?? e.target.value.length)}
          onSelect={e => {
            const el = e.currentTarget
            if (el.selectionStart !== null && el.selectionStart !== entry.caret) onEntry(el.value, el.selectionStart)
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') { e.preventDefault(); onKey('down') }
            else if (e.key === 'Tab') { e.preventDefault(); onKey('right') }
          }}
          className={cn(
            'h-10 min-w-0 flex-1 rounded-lg border border-border bg-background px-2.5 font-mono text-[18px] outline-none focus:border-[var(--exam-accent,hsl(var(--primary)))]',
            entry.mode === 'ready' && 'text-muted-foreground',
          )}
        />
        <button
          type="button"
          aria-label={typing ? 'Number pad' : 'Keyboard'}
          aria-pressed={typing}
          onPointerDown={press(() => onTyping(!typing))}
          className={cn('flex h-10 w-11 shrink-0 items-center justify-center rounded-lg text-sm font-semibold', typing ? 'bg-pick text-pick-foreground' : 'hover:bg-muted')}
        >
          {typing ? '123' : <Keyboard className="h-5 w-5" aria-hidden="true" />}
        </button>
        <button
          type="button"
          aria-label="Hide keypad"
          onPointerDown={press(onHide)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg hover:bg-muted"
        >
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {!typing && (
        <>
          <div className="-mx-1.5 mt-1.5 flex gap-1.5 overflow-x-auto px-1.5 pb-0.5 [scrollbar-width:none]">
            {functions.map(name => (
              <button
                key={name}
                type="button"
                onPointerDown={press(() => onFunction(name))}
                className="h-8 shrink-0 rounded-full border border-border bg-background px-3 font-mono text-[13px] font-semibold active:bg-muted"
              >
                {name}
              </button>
            ))}
          </div>
          <div className="mt-1.5 grid grid-cols-6 gap-1">
            {KEYPAD_ROWS.flat().map(key => (
              <button
                key={key.label}
                type="button"
                aria-label={key.name ?? key.label}
                onPointerDown={press(() => (key.action ? onKey(key.action) : onType(key.insert!)))}
                className={cn(
                  keyClass,
                  key.action === 'down' ? 'bg-[var(--exam-accent-vivid,hsl(var(--primary)))] text-white'
                    : /\d/.test(key.label) ? 'bg-background shadow-sm' : 'bg-background/60',
                )}
              >
                {key.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

