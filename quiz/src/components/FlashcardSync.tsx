import { useFlashcardSync } from '@/hooks/useFlashcardSync'

// Mount point for the flashcard cross-device sync (collected cards + deck +
// saved packs). Renders nothing; it lives at the app root inside AuthProvider so
// there is exactly one hydrate/realtime subscription for the whole app, the same
// shape as SoundEffects / MathFocus.
export default function FlashcardSync(): null {
  useFlashcardSync()
  return null
}
