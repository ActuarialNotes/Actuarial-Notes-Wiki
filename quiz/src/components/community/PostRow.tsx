import { MessageSquare, ArrowUp } from 'lucide-react'
import { agoLabel, FEED_SOURCES, type CommunityPost } from '@/lib/community/feed'
import { topicById } from '@/lib/community/topics'

/**
 * One public post, as posted: its title, the start of its own text, who wrote
 * it and when, and how much it has been discussed. The whole row opens the
 * thread on its own site in a new tab — the conversation lives there, and the
 * app doesn't pretend to host it.
 */
export function PostRow({ post, now }: { post: CommunityPost; now: Date }) {
  const source = FEED_SOURCES[post.source]
  // The most specific first: an exam says more than Exams.
  const tags = [...post.topics]
    .filter(t => topicById(t)?.label.toLowerCase() !== post.flair?.toLowerCase())
    .sort((a, b) => Number(!topicById(a)?.parent) - Number(!topicById(b)?.parent))
    .slice(0, 3)
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex gap-3 px-4 py-3 transition-colors hover:bg-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring before:pointer-events-none before:absolute before:left-4 before:right-0 before:top-0 before:h-px before:bg-border/60 before:content-[''] first:before:hidden"
      data-testid="community-post"
    >
      <span className="flex w-10 shrink-0 flex-col items-center pt-0.5 text-xs font-semibold tabular-nums text-muted-foreground" aria-label={`${post.score} points`}>
        <ArrowUp className="h-3.5 w-3.5" aria-hidden />
        {post.score}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold leading-snug group-hover:underline group-hover:underline-offset-2">{post.title}</span>
        {post.excerpt && <span className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</span>}
        <span className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground">
          <img src={source.logo} alt="" className="h-3.5 w-3.5 rounded-full" />
          <span className="font-medium text-foreground/80">{source.name}</span>
          {post.author && <span>· u/{post.author}</span>}
          <span>· <time dateTime={post.createdAt.toISOString()}>{agoLabel(post.createdAt, now)}</time></span>
          <span className="inline-flex items-center gap-1">
            · <MessageSquare className="h-3 w-3" aria-hidden />
            {post.comments}
          </span>
          {post.flair && <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium">{post.flair}</span>}
          {tags.map(t => (
            <span key={t} className="rounded-full border px-2 py-0.5 text-[11px]">
              {topicById(t)?.label}
            </span>
          ))}
        </span>
      </span>
    </a>
  )
}
