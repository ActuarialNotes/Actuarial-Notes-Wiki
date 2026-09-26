import { useEffect, useRef } from 'react'
import { EditorState, type Extension } from '@codemirror/state'
import {
  EditorView,
  drawSelection,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
  placeholder as placeholderExt,
} from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import { bracketMatching, HighlightStyle, indentOnInput, StreamLanguage, syntaxHighlighting } from '@codemirror/language'
import { python } from '@codemirror/lang-python'
import { markdown } from '@codemirror/lang-markdown'
import { r } from '@codemirror/legacy-modes/mode/r'
import { tags as t } from '@lezer/highlight'

/**
 * The workspace's code editor: CodeMirror 6 with R, Python or Markdown
 * highlighting, and the run keys an R or Python user already has in their
 * fingers — Ctrl/⌘+Enter runs the current line or selection and steps to the
 * next line (RStudio's *Run*), Ctrl/⌘+Shift+Enter runs the whole file (*Source*).
 *
 * Mount one per file (`key={path}`) so each keeps its own undo history. A
 * change to `value` from outside — a run rewriting the file — replaces the
 * document without remounting.
 */

export type EditorLanguage = 'r' | 'python' | 'markdown' | 'text'

interface CodeEditorProps {
  value: string
  language: EditorLanguage
  onChange?: (value: string) => void
  onRunSelection?: (code: string) => void
  onRunFile?: () => void
  readOnly?: boolean
  wrap?: boolean
  placeholder?: string
  ariaLabel: string
}

// Token classes, coloured in index.css ("PCPA workspace") for both themes.
const highlight = HighlightStyle.define([
  { tag: [t.keyword, t.controlKeyword, t.operatorKeyword, t.definitionKeyword, t.moduleKeyword], class: 'cm-tok-keyword' },
  { tag: [t.string, t.special(t.string), t.regexp], class: 'cm-tok-string' },
  { tag: [t.number, t.bool, t.null, t.atom], class: 'cm-tok-number' },
  { tag: [t.comment, t.lineComment, t.blockComment], class: 'cm-tok-comment' },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], class: 'cm-tok-function' },
  { tag: [t.heading, t.strong], class: 'cm-tok-heading' },
  { tag: t.emphasis, class: 'cm-tok-emphasis' },
  { tag: [t.link, t.url], class: 'cm-tok-link' },
])

const theme = EditorView.theme({
  '&': { height: '100%', fontSize: '13px', backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--foreground))' },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', lineHeight: '1.55' },
  '.cm-content': { caretColor: 'hsl(var(--foreground))', paddingBottom: '40vh' },
  '.cm-gutters': { backgroundColor: 'hsl(var(--card))', color: 'hsl(var(--muted-foreground))', border: 'none' },
  '.cm-activeLine': { backgroundColor: 'hsl(var(--muted) / 0.55)' },
  '.cm-activeLineGutter': { backgroundColor: 'hsl(var(--muted) / 0.55)' },
  '.cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection': { backgroundColor: 'hsl(var(--accent)) !important' },
  '.cm-cursor': { borderLeftColor: 'hsl(var(--foreground))' },
  '.cm-placeholder': { color: 'hsl(var(--muted-foreground))' },
})

function languageExtension(language: EditorLanguage): Extension {
  if (language === 'r') return StreamLanguage.define(r)
  if (language === 'python') return python()
  if (language === 'markdown') return markdown()
  return []
}

/** The current selection, or — with nothing selected — the cursor's line. */
function selectionOrLine(view: EditorView): { code: string; lineEnd: number | null } {
  const sel = view.state.selection.main
  if (!sel.empty) return { code: view.state.sliceDoc(sel.from, sel.to), lineEnd: null }
  const line = view.state.doc.lineAt(sel.head)
  return { code: line.text, lineEnd: line.number }
}

export function CodeEditor({
  value,
  language,
  onChange,
  onRunSelection,
  onRunFile,
  readOnly = false,
  wrap = false,
  placeholder,
  ariaLabel,
}: CodeEditorProps) {
  const host = useRef<HTMLDivElement>(null)
  const view = useRef<EditorView | null>(null)
  // Handlers change every render; the editor reads them through refs.
  const handlers = useRef({ onChange, onRunSelection, onRunFile })
  handlers.current = { onChange, onRunSelection, onRunFile }

  useEffect(() => {
    if (!host.current) return
    const runKeys = keymap.of([
      {
        key: 'Mod-Enter',
        preventDefault: true,
        run: v => {
          const { code, lineEnd } = selectionOrLine(v)
          if (code.trim()) handlers.current.onRunSelection?.(code)
          // Step to the next line, as RStudio does, so repeated presses walk a script.
          if (lineEnd !== null && lineEnd < v.state.doc.lines) {
            const next = v.state.doc.line(lineEnd + 1)
            v.dispatch({ selection: { anchor: next.from }, scrollIntoView: true })
          }
          return true
        },
      },
      { key: 'Mod-Shift-Enter', preventDefault: true, run: () => { handlers.current.onRunFile?.(); return true } },
      { key: 'Mod-s', preventDefault: true, run: () => true },
    ])
    const state = EditorState.create({
      doc: value,
      extensions: [
        runKeys,
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightActiveLine(),
        history(),
        drawSelection(),
        indentOnInput(),
        bracketMatching(),
        keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
        languageExtension(language),
        syntaxHighlighting(highlight),
        theme,
        wrap ? EditorView.lineWrapping : [],
        placeholder ? placeholderExt(placeholder) : [],
        EditorState.readOnly.of(readOnly),
        EditorView.editable.of(!readOnly),
        EditorView.contentAttributes.of({ 'aria-label': ariaLabel }),
        EditorView.updateListener.of(update => {
          if (update.docChanged) handlers.current.onChange?.(update.state.doc.toString())
        }),
      ],
    })
    view.current = new EditorView({ state, parent: host.current })
    return () => {
      view.current?.destroy()
      view.current = null
    }
    // The editor is built once per mount; `value` changes are applied below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, readOnly, wrap])

  useEffect(() => {
    const v = view.current
    if (!v) return
    const current = v.state.doc.toString()
    if (current !== value) v.dispatch({ changes: { from: 0, to: current.length, insert: value } })
  }, [value])

  return <div ref={host} className="h-full min-h-0 overflow-hidden" data-math-magnify="none" />
}

/** Runs the selection or current line of the focused editor — for a toolbar button. */
export function editorSelection(container: HTMLElement | null): string | null {
  const dom = container?.querySelector('.cm-editor') as HTMLElement | null
  if (!dom) return null
  const v = EditorView.findFromDOM(dom)
  if (!v) return null
  const { code } = selectionOrLine(v)
  return code
}
