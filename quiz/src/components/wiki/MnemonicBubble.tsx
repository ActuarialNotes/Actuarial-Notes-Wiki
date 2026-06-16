import { AvatarDisplay, serializeAvatar, ANIMAL_LABELS, type AnimalType } from '@/components/AvatarDisplay'
import { MNEMONICS } from '@/data/mnemonics'
import { Lightbulb } from 'lucide-react'

interface MnemonicBubbleProps {
  conceptName: string
  animal: AnimalType
}

export function MnemonicBubble({ conceptName, animal }: MnemonicBubbleProps) {
  const mnemonic = MNEMONICS[conceptName]?.[animal]
  const avatarUrl = serializeAvatar({ type: 'animal', value: animal })

  return (
    <div className="flex flex-col gap-5 py-6">
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
        <Lightbulb className="h-3.5 w-3.5" />
        <span>{ANIMAL_LABELS[animal]}'s Mnemonic</span>
      </div>

      {mnemonic ? (
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
              {mnemonic}
              <span className="italic opacity-60 ml-0.5">"</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 gap-3 text-muted-foreground">
          <Lightbulb className="h-8 w-8 opacity-30" />
          <span className="text-sm">No mnemonic yet for this concept.</span>
        </div>
      )}
    </div>
  )
}
