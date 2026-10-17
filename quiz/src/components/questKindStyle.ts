import { BookOpen, HeartPulse, Sparkles, Target, TrendingUp, Zap } from 'lucide-react'
import type { QuestKind } from '@/data/quests'

// Per-kind icon + accent so the daily quests read at a glance. Colors echo the
// surfaces they relate to: hard questions burn amber, revivals use the
// mastery-decay red, level-ups the readiness green.
export const KIND_STYLE: Record<QuestKind, { Icon: typeof Target; accent: string; chip: string }> = {
  correct: { Icon: Target, accent: 'text-sky-500', chip: 'bg-sky-500/10' },
  hard_correct: { Icon: Zap, accent: 'text-amber-500', chip: 'bg-amber-500/10' },
  revive: { Icon: HeartPulse, accent: 'text-rose-500', chip: 'bg-rose-500/10' },
  level_up: { Icon: TrendingUp, accent: 'text-green-500', chip: 'bg-green-500/10' },
  perfect_quiz: { Icon: Sparkles, accent: 'text-violet-500', chip: 'bg-violet-500/10' },
  concept_correct: { Icon: BookOpen, accent: 'text-primary', chip: 'bg-primary/10' },
}
