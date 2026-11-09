// Opening the document a published figure was read from, where its locator
// says (docs/tool-template-v2.md §3.5): the app's PDF reader at the page when
// the document is a PDF the app can read, else the figure's resource page.

import type { BankFigure } from '@/lib/tools'
import { locatorPage } from '@/lib/toolTemplate'
import { isSupportedPdfSource } from '@/lib/examPdf'
import { openPdfReader } from '@/hooks/usePdfReader'
import { openResourcePage } from './openResource'

/** Open a figure's document where the locator says: the app's PDF reader at the page, else the resource page. */
export function readFigure(f: Pick<BankFigure, 'document' | 'title' | 'publisher' | 'locator' | 'resource' | 'pageOffset'>) {
  const page = locatorPage(f.locator)
  if (isSupportedPdfSource(f.document)) {
    openPdfReader({ url: f.document, title: f.title, subtitle: f.publisher, ...(page ? { page: page + (f.pageOffset ?? 0) } : {}) })
  } else {
    void openResourcePage(f.resource)
  }
}

/** What the Read button says: the page it opens at, where the locator cites one. */
export function readLabel(locator: string): string {
  const page = locatorPage(locator)
  return page ? `Read p. ${page}` : 'Read the source'
}

/** The ghost button's classes, shared by the figure notes and the edit sheet. */
export const GHOST = 'inline-flex h-9 flex-1 items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors ring-1 ring-inset ring-border hover:bg-muted'
