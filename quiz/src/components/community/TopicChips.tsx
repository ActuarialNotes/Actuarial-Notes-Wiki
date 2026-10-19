import { Link } from 'react-router-dom'
import { Check, Plus } from 'lucide-react'
import { topicById, topicRoute, type TopicId } from '@/lib/community/topics'
import { topicIcon } from './topicIcons'
import { cn } from '@/lib/utils'

const PILL =
  'inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

/** A topic as a pill that goes to its page; a followed one is filled. */
export function TopicLink({ id, followed, active }: { id: TopicId; followed: boolean; active?: boolean }) {
  const topic = topicById(id)
  if (!topic) return null
  const Icon = topicIcon(id)
  return (
    <Link
      to={topicRoute(id)}
      aria-current={active ? 'page' : undefined}
      className={cn(
        PILL,
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : followed
            ? 'border-primary/40 bg-primary/10 text-primary hover:bg-primary/15'
            : 'bg-card hover:bg-accent',
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {topic.label}
    </Link>
  )
}

/** The one control that follows or unfollows a topic. */
export function FollowButton({
  following,
  onToggle,
  label,
  size = 'md',
}: {
  following: boolean
  onToggle: () => void
  /** What is being followed, for the accessible name. */
  label: string
  size?: 'sm' | 'md'
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={following}
      aria-label={following ? `Unfollow ${label}` : `Follow ${label}`}
      data-sound="select"
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full font-semibold transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        size === 'sm' ? 'h-8 px-3 text-xs' : 'h-10 px-4 text-sm',
        following
          ? 'border border-primary/40 bg-primary/10 text-primary hover:bg-primary/15'
          : 'bg-primary text-primary-foreground hover:bg-primary/90',
      )}
    >
      {following ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Plus className="h-3.5 w-3.5" aria-hidden />}
      {following ? 'Following' : 'Follow'}
    </button>
  )
}

/**
 * The first-visit picker: every top-level topic as a big tile that follows it
 * on a tap — the way into a For You feed for a reader who follows nothing yet.
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
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {topics.map(t => {
        const Icon = topicIcon(t.id)
        const on = followed.includes(t.id)
        return (
          <button
            key={t.id}
            type="button"
            aria-pressed={on}
            onClick={() => onToggle(t.id)}
            data-sound="select"
            className={cn(
              'flex items-start gap-3 rounded-xl border p-3 text-left transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              on ? 'border-primary/50 bg-primary/10' : 'bg-card hover:bg-accent/50',
            )}
          >
            <span className={cn('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', on ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground')}>
              {on ? <Check className="h-4 w-4" aria-hidden /> : <Icon className="h-4 w-4" aria-hidden />}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{t.label}</span>
              <span className="block text-xs text-muted-foreground">{t.blurb}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
