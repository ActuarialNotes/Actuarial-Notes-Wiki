import type { CSSProperties } from 'react'
import { ArrowUp, Flame, MessageCircle } from 'lucide-react'
import { agoLabel, FEED_SOURCES, type CommunityPost } from '@/lib/community/feed'
import { topicById } from '@/lib/community/topics'
import { hueStyle, nameHue, topicAccentStyle } from '@/lib/community/topicColors'
import { cn } from '@/lib/utils'

/** How busy a thread has to be to wear the flame. */
const HOT_COMMENTS = 25
const HOT_SCORE = 60
/** How fresh a post has to be to wear the "new" dot. */
const NEW_MS = 2 * 3600_000

/**
 * One public post, as posted: who wrote it (an initial in their own colour),
 * its title and the start of its own text, its topics in theirs, and how much
 * it is being talked about. A busy thread wears a flame, a fresh one a dot.
 * The whole row opens the thread on its own site — the conversation lives
 * there, and the app doesn't pretend to host it.
 */
export function PostRow({ post, now, index = 0 }: { post: CommunityPost; now: Date; index?: number }) {
  const source = FEED_SOURCES[post.source]
  const hot = post.comments >= HOT_COMMENTS || post.score >= HOT_SCORE
  const fresh = now.getTime() - post.createdAt.getTime() < NEW_MS
  // The most specific first — an exam says more than Exams — and none the flair already says.
  const tags = [...post.topics]
    .filter(t => topicById(t)?.label.toLowerCase() !== post.flair?.toLowerCase())
    .sort((a, b) => Number(!topicById(a)?.parent) - Number(!topicById(b)?.parent))
    .slice(0, 3)
  const initial = (post.author ?? '?').replace(/^[^a-z0-9]+/i, '').charAt(0).toUpperCase() || '?'

  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ '--rise-delay': `${Math.min(index, 8) * 40}ms` } as CSSProperties}
      className={cn(
        'community-rise group relative flex gap-3 px-4 py-3.5 transition-colors hover:bg-accent/40',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
        "before:pointer-events-none before:absolute before:left-[60px] before:right-0 before:top-0 before:h-px before:bg-border/60 before:content-[''] first:before:hidden",
      )}
      data-testid="community-post"
    >
      <span className="relative shrink-0" style={hueStyle(nameHue(post.author ?? ''))} aria-hidden>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--topic-soft)] text-sm font-bold topic-ink ring-1 ring-[var(--topic-muted)]">
          {initial}
        </span>
        <img src={source.logo} alt="" className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full ring-2 ring-card" />
      </span>

      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-x-1.5 text-xs text-muted-foreground">
          {post.author && <span className="truncate font-medium text-foreground/80">u/{post.author}</span>}
          <span aria-hidden>·</span>
          <time dateTime={post.createdAt.toISOString()} className="shrink-0">{agoLabel(post.createdAt, now)}</time>
          {fresh && (
            <span className="inline-flex shrink-0 items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
              New
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[15px] font-semibold leading-snug group-hover:underline group-hover:decoration-foreground/30 group-hover:underline-offset-2">
          {post.title}
        </span>
        {post.excerpt && <span className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</span>}
        {(post.flair || tags.length > 0) && (
          <span className="mt-2 flex flex-wrap items-center gap-1.5">
            {post.flair && <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{post.flair}</span>}
            {tags.map(t => (
              <span
                key={t}
                style={topicAccentStyle(t)}
                className="rounded-full bg-[var(--topic-soft)] px-2 py-0.5 text-[11px] font-semibold topic-ink"
              >
                {topicById(t)?.label}
              </span>
            ))}
          </span>
        )}
      </span>

      <span className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5 text-xs font-semibold tabular-nums">
        <span
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-2 py-0.5',
            hot ? 'bg-orange-500/15 text-orange-600 dark:text-orange-400' : 'bg-muted text-muted-foreground',
          )}
          aria-label={`${post.comments} comments`}
        >
          {hot ? <Flame className="h-3 w-3" aria-hidden /> : <MessageCircle className="h-3 w-3" aria-hidden />}
          {post.comments}
        </span>
        <span className="inline-flex items-center gap-0.5 px-1 text-muted-foreground" aria-label={`${post.score} points`}>
          <ArrowUp className="h-3 w-3" aria-hidden />
          {post.score}
        </span>
      </span>
    </a>
  )
}
