import { Map as MapIcon, Radio, Rocket, Swords, Users, type LucideIcon } from 'lucide-react'
import type { ActuariaTabId } from '@/lib/actuaria/nav'

/** Each in-world tab's icon — one set for the HUD row and the phone's bottom bar. */
export const TAB_ICONS: Record<ActuariaTabId, LucideIcon> = {
  map: MapIcon,
  battle: Swords,
  daily: Radio,
  cohort: Users,
  hangar: Rocket,
}
