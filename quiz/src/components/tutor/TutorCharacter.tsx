import { AvatarDisplay } from '@/components/AvatarDisplay'

// The Tutor's face (docs/tutor.md §9): the reader's own character, drawn by the
// same `AvatarDisplay` the Gem Shop draws (see lib/tutor/character.ts). Its
// moods are what is done *to* the drawing — a small hop, a slow breath, a
// greyed-out doze — so a bought skin is shown exactly as it was bought.

export type TutorMood = 'idle' | 'thinking' | 'quiet' | 'pleased'

interface Props {
  /** The character to draw — `tutorCharacter(...).avatarUrl`. */
  avatarUrl: string
  size?: number
  mood?: TutorMood
  className?: string
}

export function TutorCharacter({ avatarUrl, size = 40, mood = 'idle', className }: Props) {
  return (
    <span className={`tutor-character tutor-character--${mood} inline-flex shrink-0 ${className ?? ''}`} aria-hidden="true">
      <AvatarDisplay avatarUrl={avatarUrl} initials="" size={size} />
    </span>
  )
}
