// OSFI's filings, installed into the tools engine (docs/osfi-tools-design.md).
//
// The engine never carries them (the connector's engine is a committed bundle,
// and the file is ~400 KB): the app fetches the file the first time a card
// needs it and installs it, as `lib/toolBank.ts` installs the Assumptions Bank.
// It is a hashed asset of its own, so a reader who never opens Insurer Return
// or a filed MCT Ratio never downloads it.

import { filedRef, filingsInstalled, installFilings, type FilingsFile, type ToolSpec } from '@/lib/tools'
// A URL, not a module: the file is fetched as a hashed asset, cached by the browser.
import filingsUrl from '@/lib/tools/data/filings/osfi-pc4-summary.json?url'

/** The tools that read OSFI's filings whatever their input. */
export const FILING_TOOLS: ReadonlySet<string> = new Set(['data.insurer_return'])

let loading: Promise<void> | null = null

/** Fetch and install the filings, once; a failed fetch is forgotten so the next call retries. */
export function loadFilings(): Promise<void> {
  if (filingsInstalled()) return Promise.resolve()
  loading ??= fetch(filingsUrl)
    .then(r => {
      if (!r.ok) throw new Error(`OSFI's filings answered ${r.status}`)
      return r.json() as Promise<FilingsFile>
    })
    .then(file => installFilings(file))
    .catch(err => {
      loading = null
      throw err
    })
  return loading
}

/** Whether a card needs the filings: a tool that reads them, or a draft holding a filed value. */
export function needsFilings(spec: ToolSpec, draft: Record<string, unknown>): boolean {
  return FILING_TOOLS.has(spec.id) || Object.values(draft).some(v => filedRef(v) !== null)
}
