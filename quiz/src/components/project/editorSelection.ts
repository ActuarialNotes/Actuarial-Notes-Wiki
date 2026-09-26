import { EditorView } from '@codemirror/view'

/** The current selection, or — with nothing selected — the cursor's line. */
export function selectionOrLine(view: EditorView): { code: string; lineEnd: number | null } {
  const sel = view.state.selection.main
  if (!sel.empty) return { code: view.state.sliceDoc(sel.from, sel.to), lineEnd: null }
  const line = view.state.doc.lineAt(sel.head)
  return { code: line.text, lineEnd: line.number }
}
/** The selection or current line of the editor inside `container` — for a toolbar Run button. */
export function editorSelection(container: HTMLElement | null): string | null {
  const dom = container?.querySelector('.cm-editor') as HTMLElement | null
  if (!dom) return null
  const v = EditorView.findFromDOM(dom)
  if (!v) return null
  const { code } = selectionOrLine(v)
  return code
}
