import {
  Award,
  Briefcase,
  CalendarDays,
  CloudLightning,
  Cpu,
  GraduationCap,
  HeartPulse,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { topicById, type TopicId } from '@/lib/community/topics'

/** Each top-level topic's glyph; an exam under Exams borrows its parent's. */
const TOPIC_ICON: Partial<Record<TopicId, LucideIcon>> = {
  exams: GraduationCap,
  careers: Briefcase,
  reforms: Scale,
  'ai-tech': Cpu,
  pc: ShieldCheck,
  'life-health': HeartPulse,
  climate: CloudLightning,
  credentials: Award,
  events: CalendarDays,
}

export function topicIcon(id: TopicId): LucideIcon {
  const topic = topicById(id)
  return TOPIC_ICON[id] ?? (topic?.parent ? TOPIC_ICON[topic.parent] : undefined) ?? GraduationCap
}
