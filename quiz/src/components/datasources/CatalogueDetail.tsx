// One item of the Data Sources catalogue, opened (`pages/DataSources`): what
// it is, what a reader does with it, and where it comes from. The same body
// is drawn in the panel beside the list on a wide screen and in a sheet over
// it on a narrow one, so an item reads the same wherever it is opened.
//
//   value     the figure, what it means in the document's words, the tools
//             that take it, and the page it was read from
//   table     the tool that opens it, or its columns and rows when a
//             workflow is what takes it
//   document  the way to read it, and the values it gives

import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, ExternalLink, Plus } from 'lucide-react'
import { FactCheckBadge } from '@/components/FactCheckBadge'
import { effectiveLabel, formatAssumptionValue } from '@/lib/assumptionBank'
import { figureUses } from '@/lib/toolBank'
import { formatPublished, resourceEntryRef } from '@/lib/coworkSources'
import { detailValue, groupSetRows, type CatalogueItem } from '@/lib/dataCatalogue'
import { publisherPath, resourceTablePath } from '@/lib/dataSources'
import type { AssumptionSet } from '@/lib/assumptionBank'
import { cn } from '@/lib/utils'

export interface CatalogueDetailProps {
  item: CatalogueItem
  /** The sets of values the item's document gives. */
  sets: AssumptionSet[]
  /** The name of the tool a table opens in. */
  toolName: string | null
  inLibrary: boolean
  onToggleLibrary: () => void
  /** Open the item's document in the reader. Null when there is nothing to open. */
  onRead: (() => void) | null
  /** Narrow the list to one set of values. */
  onShowSet: (setId: string) => void
}

const SOLID = 'bg-foreground text-background hover:bg-foreground/90'
const OUTLINE = 'border text-foreground hover:bg-muted'
const ACTION = 'flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2 text-left text-sm font-semibold transition-colors'

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 py-2 text-sm">
      <dt className="w-20 shrink-0 text-muted-foreground">{label}</dt>
      <dd className="min-w-0 flex-1">{children}</dd>
    </div>
  )
}

function CopyValue({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    if (!copied) return
    const t = window.setTimeout(() => setCopied(false), 1500)
    return () => window.clearTimeout(t)
  }, [copied])
  return (
    <button
      type="button"
      onClick={() => { void navigator.clipboard?.writeText(value).then(() => setCopied(true)) }}
      className={cn(ACTION, OUTLINE, 'justify-center')}
    >
      {copied ? 'Copied' : 'Copy value'}
    </button>
  )
}

export function CatalogueDetail({ item, sets, toolName, inLibrary, onToggleLibrary, onRead, onShowSet }: CatalogueDetailProps) {
  const { resource, set, entity } = item
  const row = item.rows[0] ?? null
  const single = item.type === 'value' && item.rows.length === 1 ? row : null
  const uses = single ? figureUses(single) : []
  const value = detailValue(item)
  const table = resource?.table ?? null
  const openable = Boolean(onRead)
  const link = set?.document ?? resource?.url ?? null
  // A document's own sets, and for a value the set it sits in when that set holds more than this.
  const setLinks = item.type === 'value'
    ? set && groupSetRows(set.rows).length > 1 ? [set] : []
    : sets

  return (
    <div className="space-y-4" data-testid="catalogue-detail">
      {single?.kind === 'fact' && single.raw && <p className="text-base font-semibold" data-testid="catalogue-fact">{single.raw}</p>}
      {row?.meaning && <p className="text-sm leading-relaxed text-foreground/90">{row.meaning}</p>}
      {item.type !== 'value' && resource?.summary && <p className="text-sm leading-relaxed text-foreground/90">{resource.summary}</p>}
      {resource?.sample && item.type !== 'value' && (
        <p className="text-sm text-muted-foreground">Sample: a stand-in for this kind of document, not a real one.</p>
      )}

      {item.type === 'value' && item.rows.length > 1 && (
        <dl className="divide-y divide-border/60 overflow-hidden rounded-xl border" data-testid="catalogue-series">
          {item.rows.map(r => (
            <div key={r.id} className="flex items-baseline justify-between gap-3 px-3 py-2 text-sm">
              <dt className="min-w-0 text-foreground/90">{r.label}</dt>
              <dd className={cn('shrink-0 tabular-nums', r.raw ? 'font-semibold' : 'text-muted-foreground')}>{formatAssumptionValue(r) || 'Not entered'}</dd>
            </div>
          ))}
        </dl>
      )}

      {table && (
        <dl className="divide-y divide-border/60 overflow-hidden rounded-xl border px-3">
          <Fact label="Columns">{table.columns.join(', ')}</Fact>
          <Fact label="Rows">{table.rows.map(r => r[0]).join(', ')}</Fact>
        </dl>
      )}

      <div className="space-y-2">
        {uses.map((u, i) => (
          <Link
            key={`${u.tool.id}:${u.field.key}`}
            to={u.path}
            aria-label={`Use ${single!.label} as ${u.field.label} in ${u.tool.name}`}
            className={cn(ACTION, i === 0 ? SOLID : OUTLINE)}
            data-testid="catalogue-use"
          >
            <span className="min-w-0">
              <span className="block">Use in {u.tool.name}</span>
              <span className={cn('block text-xs font-normal', i === 0 ? 'text-background/80' : 'text-muted-foreground')}>
                as {u.field.symbol ? `${u.field.symbol}, ` : ''}{u.field.label}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        ))}
        {item.type === 'table' && resource?.tool && (
          <Link to={resourceTablePath(resource.tool)} className={cn(ACTION, SOLID)} data-testid="catalogue-open-table">
            Open in {toolName ?? 'its table'}
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        )}
        {item.type === 'document' && openable && (
          <button type="button" onClick={onRead!} className={cn(ACTION, SOLID)} data-testid="catalogue-read">
            Read the document
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
          </button>
        )}
        {setLinks.map(s => {
          const count = groupSetRows(s.rows).length
          return (
            <button key={s.id} type="button" onClick={() => onShowSet(s.id)} className={cn(ACTION, OUTLINE)} data-testid="catalogue-show-set">
              <span className="min-w-0">
                <span className="block">{item.type === 'value' ? 'Every value from this document' : `${count} ${count === 1 ? 'value' : 'values'} from this document`}</span>
                {item.type !== 'value' && <span className="block text-xs font-normal text-muted-foreground">{s.title}</span>}
              </span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
            </button>
          )
        })}
        <div className="flex flex-wrap gap-2 [&>*]:min-w-[10rem] [&>*]:flex-1">
          {value && <CopyValue value={value} />}
          {resource && (
            <button
              type="button"
              onClick={onToggleLibrary}
              aria-pressed={inLibrary}
              data-sound="press"
              className={cn(ACTION, 'justify-center gap-1.5', inLibrary ? 'bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/25 dark:text-emerald-300' : OUTLINE)}
              data-testid="catalogue-library"
            >
              {inLibrary ? <Check className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
              {inLibrary ? 'In My Library' : 'Add to My Library'}
            </button>
          )}
        </div>
      </div>

      <section aria-label="Where it comes from" data-testid="catalogue-provenance">
        <h3 className="text-xs font-medium text-muted-foreground">Where it comes from</h3>
        <dl className="mt-1 divide-y divide-border/60">
          <Fact label="Publisher">
            {entity ? (
              <Link to={publisherPath(entity.id)} className="font-semibold underline-offset-2 hover:underline">{entity.name}</Link>
            ) : (
              <span className="font-semibold">{set?.publisher ?? ''}</span>
            )}
          </Fact>
          {item.type === 'value' && (
            <Fact label="Document">
              {openable ? (
                <button type="button" onClick={onRead!} className="text-left font-semibold underline-offset-2 hover:underline" data-testid="catalogue-read">
                  {resource?.title ?? set!.source}
                </button>
              ) : (
                <span className="font-semibold">{resource?.title ?? set!.source}</span>
              )}
            </Fact>
          )}
          {row && <Fact label="Where">{row.locator}</Fact>}
          {table && <Fact label="Where">{table.locator}</Fact>}
          {set && <Fact label="In force">{effectiveLabel(set.effective)}</Fact>}
          {set?.read && <Fact label="Read on">{effectiveLabel(set.read)}</Fact>}
          {!set && resource?.published && <Fact label="Published">{formatPublished(resource.published)}</Fact>}
          {set?.licence && <Fact label="Licence">{set.licence}</Fact>}
        </dl>
      </section>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        {set && <FactCheckBadge verification={set.verification} contentPath={set.path} contentName={set.title} />}
        {item.type === 'table' && openable && resourceEntryRef(resource!) && (
          <button type="button" onClick={onRead!} className="font-medium underline underline-offset-2 hover:no-underline" data-testid="catalogue-read">
            Read the document
          </button>
        )}
        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground">
            The publisher’s copy <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        )}
      </div>
    </div>
  )
}
