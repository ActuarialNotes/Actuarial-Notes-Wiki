import { BookOpen, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { wikiRoute } from '@/lib/wikiRoutes'
import type { ResourceMeta } from '@/lib/resourceMeta'

function examDisplayLabel(examFileName: string): string {
  // "Exam P-1 (SOA)" → "Exam P"
  // "Exam FM-2 (SOA)" → "Exam FM"
  return examFileName
    .replace(/\s*\([^)]*\)\s*$/, '')
    .replace(/-\d+$/, '')
    .trim()
}

function examUrl(examFileName: string, resourceName: string): string {
  const slug = (name: string) => encodeURIComponent(name.trim()).replace(/%20/g, '+')
  return `${wikiRoute({ kind: 'exam', name: examFileName })}?resource=${slug(resourceName)}`
}

export function ResourceMetaCard({
  meta,
  resourceName,
  compact,
}: {
  meta: ResourceMeta
  resourceName?: string
  compact?: boolean
}) {
  return (
    <div className={cn('flex gap-4 rounded-lg border bg-card p-4 not-prose', compact ? 'mb-3' : 'mb-4')}>
      {meta.coverImageUrl && (
        <div className={cn('flex-shrink-0', compact ? 'w-16' : 'w-24 md:w-28')}>
          <img
            src={meta.coverImageUrl}
            alt={meta.title ?? 'Cover'}
            className="w-full rounded object-cover shadow-sm"
            onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      )}
      <div className="flex flex-col gap-1.5 min-w-0">
        {meta.title && (
          <p className={cn('font-semibold leading-snug', compact ? 'text-sm' : 'text-base')}>{meta.title}</p>
        )}
        {meta.author && (
          <p className="text-sm text-muted-foreground leading-snug">{meta.author}</p>
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-sm text-muted-foreground">
          {meta.year && <span>{meta.year}</span>}
          {meta.edition && <span>{meta.edition} ed.</span>}
          {meta.publisher && <span>{meta.publisher}</span>}
        </div>
        {meta.isbn && (
          <p className="text-xs text-muted-foreground">ISBN {meta.isbn}</p>
        )}
        {(meta.type || meta.code) && (
          <p className="text-xs text-muted-foreground">
            {[meta.type, meta.code].filter(Boolean).join(' · ')}
          </p>
        )}
        {(meta.getCopyUrl || (meta.exams && meta.exams.length > 0 && resourceName)) && (
          <div className="mt-auto pt-1 flex flex-wrap gap-2">
            {meta.getCopyUrl && (
              <a
                href={meta.getCopyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
              >
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                Get a Copy
              </a>
            )}
            {meta.exams && resourceName && meta.exams.map(exam => (
              <Link
                key={exam}
                to={examUrl(exam, resourceName)}
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
              >
                <BookOpen className="h-3.5 w-3.5 mr-1.5" />
                Open in {examDisplayLabel(exam)}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
