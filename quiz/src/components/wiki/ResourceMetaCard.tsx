import { Download, ExternalLink } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { ResourceMeta } from '@/lib/resourceMeta'

export function ResourceMetaCard({ meta, compact }: { meta: ResourceMeta; compact?: boolean }) {
  return (
    <div className={cn('flex gap-4 rounded-lg bg-card p-4 not-prose', compact ? 'mb-3' : 'mb-4')}>
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
        {meta.getCopyUrl && (
          <div className="mt-auto pt-1">
            {/\.pdf$/i.test(meta.getCopyUrl) ? (
              <a
                href={meta.getCopyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
              >
                <Download className="h-3.5 w-3.5 mr-1.5" />
                Download PDF
              </a>
            ) : (
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
          </div>
        )}
      </div>
    </div>
  )
}
