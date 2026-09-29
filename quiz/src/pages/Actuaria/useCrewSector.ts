import { useSearchParams } from 'react-router-dom'
import type { ActuariaWorld } from '@/hooks/useActuariaWorld'
import type { Sector } from '@/lib/actuaria/sectors'

/** The sector a cohort screen is about: `?exam=`, else the one the Dashboard has up. */
export function useCrewSector(world: ActuariaWorld): Sector | null {
  const [params] = useSearchParams()
  const wanted = params.get('exam')
  const studying = world.sectors.filter(s => s.status === 'in_progress')
  return studying.find(s => s.key === wanted) ?? (world.activeSector?.status === 'in_progress' ? world.activeSector : studying[0] ?? null)
}
