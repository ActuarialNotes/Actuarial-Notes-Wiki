import { AvatarDisplay, serializeAvatar, ANIMAL_LABELS, type AnimalType } from '@/components/AvatarDisplay'
import { STORIES } from '@/data/stories'
import { Sparkles } from 'lucide-react'

interface StoryBubbleProps {
  conceptName: string
  animal: AnimalType
}

// Not wired into any menu yet — the mnemonic action button was removed until
// story content exists. Once concepts have stories in data/stories.ts, render
// this the same way MnemonicBubble was rendered.
export function StoryBubble({ conceptName, animal }: StoryBubbleProps) {
  const story = STORIES[conceptName]?.[animal]
  const avatarUrl = serializeAvatar({ type: 'animal', value: animal })

  return (
    <div className="flex flex-col gap-5 py-6">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <Sparkles className="h-3.5 w-3.5" />
        <span>{ANIMAL_LABELS[animal]}'s Story</span>
      </div>

      {story ? (
        <div className="flex items-end gap-4">
          {/* Avatar */}
          <div className="shrink-0 self-end">
            <AvatarDisplay avatarUrl={avatarUrl} initials="" size={72} />
          </div>

          {/* Speech bubble */}
          <div className="relative flex-1 bg-accent rounded-2xl rounded-bl-none px-4 py-3.5">
            {/* Triangle tail pointing toward avatar */}
            <span
              aria-hidden
              className="absolute -left-2 bottom-0 w-0 h-0"
              style={{
                borderRight: '10px solid hsl(var(--accent))',
                borderTop: '10px solid transparent',
              }}
            />
            <p className="text-sm leading-relaxed text-foreground">
              <span className="italic opacity-60 mr-0.5">"</span>
              {story}
              <span className="italic opacity-60 ml-0.5">"</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 gap-3 text-muted-foreground">
          <Sparkles className="h-8 w-8 opacity-30" />
          <span className="text-sm">No story yet for this concept.</span>
        </div>
      )}
    </div>
  )
}
