// The pieces of a battle's chrome a skin swaps (lib/battleSkin.ts): the logo
// and the frame round the question. Under Quiz Battle's own skin they are the
// split sky/fuchsia tile and nothing; under Actuaria's, the orbit mark and a HUD
// frame with signal corner ticks (docs/actuaria-online.md §4.2, §6.8). Nothing
// here touches a player's colours — the frame is round the question, not them.

import type { ReactNode } from 'react'
import { ActuariaMark } from '@/components/actuaria/ActuariaMark'
import { HudFrame } from '@/components/actuaria/HudFrame'
import { BattleLogo } from '@/components/battle/BattleLogo'
import { logoTileEdge, type LogoTileSize } from '@/components/LogoTile'
import { useBattleSkin } from '@/hooks/useBattleSkin'

export function SkinLogo({ size = 'lg' }: { size?: LogoTileSize }) {
  const skin = useBattleSkin()
  if (skin.id === 'actuaria') return <ActuariaMark size={logoTileEdge(size)} surface="card" />
  return <BattleLogo size={size} />
}

export function SkinQuestionFrame({ children }: { children: ReactNode }) {
  const skin = useBattleSkin()
  if (skin.id !== 'actuaria') return <>{children}</>
  return <HudFrame radius="lg" surface={false} data-testid="battle-hud-frame">{children}</HudFrame>
}
