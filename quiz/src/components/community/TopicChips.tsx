import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { Check, Plus } from 'lucide-react'
import { topicById, topicRoute, type TopicId } from '@/lib/community/topics'
import { topicAccentStyle } from '@/lib/community/topicColors'
import { topicIcon } from './topicIcons'
import { cn } from '@/lib/utils'

/**
 * A topic as a pill that goes to its page, wearing the topic's hue
 * (`lib/community/topicColors.ts`): the icon sits in a dot of it, a followed
 * topic is washed in it, and the topic whose page this is is filled with it.
 */
export function TopicLink({ id, followed, active }: { id: TopicId; followed: boolean; active?: boolean }) {
  const topic = topicById(id)
  if (!topic) return null
  const Icon = topicIcon(id)
  return (
    <Link
      to={topicRoute(id)}
      aria-current={active ? 'page' : undefined}
      style={topicAccentStyle(id)}
      className={cn(
        'group inline-flex shrink-0 items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-sm font-medium',
        'transition-[background-color,border-color,transform] duration-150 motion-safe:active:scale-[0.97]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        active
          ? 'border-transparent bg-[var(--topic-vivid)] text-white'
          : followed
            ? 'border-[var(--topic-muted)] bg-[var(--topic-soft)] hover:bg-[var(--topic-soft)]'
            : 'border-border bg-card hover:border-[var(--topic-muted)]',
      )}
    >
      <span
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded-full transition-colors',
          active ? 'bg-white/20 text-white' : 'bg-[var(--topic-soft)] topic-ink',
        )}
        aria-hidden
      >
        {followed && !active ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <Icon className="h-3.5 w-3.5" />}
      </span>
      {topic.label}
    </Link>
  )
}

/** The one control that follows or unfollows a topic or a place. */
export function FollowButton({
  following,
  onToggle,
  label,
  size = 'md',
  tone = 'primary',
}: {
  following: boolean
  onToggle: () => void
  /** What is being followed, for the accessible name. */
  label: string
  size?: 'sm' | 'md'
  /** `topic` fills with the surrounding `--topic-vivid` instead of the primary colour. */
  tone?: 'primary' | 'topic'
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={following}
      aria-label={following ? `Unfollow ${label}` : `Follow ${label}`}
      data-sound="select"
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full font-semibold transition-[background-color,transform] duration-150',
        'motion-safe:active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        size === 'sm' ? 'h-8 px-3 text-xs' : 'h-10 px-4 text-sm',
        following
          ? 'border border-border bg-background/60 text-foreground hover:bg-accent'
          : tone === 'topic'
            ? 'bg-[var(--topic-vivid)] text-white shadow-sm hover:brightness-110'
            : 'bg-primary text-primary-foreground shadow-sm hover:bg-primary/90',
      )}
    >
      {following ? <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden /> : <Plus className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />}
      {following ? 'Following' : 'Follow'}
    </button>
  )
}

/**
 * The first-visit picker: every top-level topic as a tile in its own colour
 * that follows it on a tap — the way into a For You feed for a reader who
 * follows nothing yet.
 */
export function TopicPicker({
  topics,
  followed,
  onToggle,
}: {
  topics: readonly { id: TopicId; label: string; blurb: string }[]
  followed: readonly TopicId[]
  onToggle: (id: TopicId) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {topics.map((t, i) => {
        const Icon = topicIcon(t.id)
        const on = followed.includes(t.id)
        return (
          <button
            key={t.id}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(t.id)}
            data-sound="select"
            style={{ ...topicAccentStyle(t.id), '--rise-delay': `${i * 35}ms` } as CSSProperties}
            className={cn(
              'community-rise group relative flex flex-col items-start gap-2 overflow-hidden rounded-2xl border p-3 text-left',
              'transition-[background-color,border-color,transform,box-shadow] duration-200 ease-out',
              'motion-safe:hover:-translate-y-0.5 hover:shadow-md motion-safe:active:scale-[0.98]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              on ? 'border-[var(--topic-muted)] bg-[var(--topic-soft)]' : 'border-border bg-card hover:border-[var(--topic-muted)]',
            )}
          >
            {/* A glow of the topic's colour in the corner, brighter once followed. */}
            <span
              aria-hidden
              className={cn(
                'pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--topic-accent)] blur-2xl transition-opacity duration-300',
                on ? 'opacity-30' : 'opacity-0 group-hover:opacity-20',
              )}
            />
            <span className="flex w-full items-center justify-between">
              <span
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-xl transition-colors',
                  on ? 'bg-[var(--topic-vivid)] text-white' : 'bg-[var(--topic-soft)] topic-ink',
                )}
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden />
              </span>
              <span
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full border transition-colors',
                  on ? 'border-transparent bg-[var(--topic-vivid)] text-white' : 'border-border text-muted-foreground',
                )}
                aria-hidden
              >
                {on ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />}
              </span>
            </span>
            <span className="relative">
              <span className="block text-sm font-semibold leading-tight">{t.label}</span>
              <span className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{t.blurb}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
