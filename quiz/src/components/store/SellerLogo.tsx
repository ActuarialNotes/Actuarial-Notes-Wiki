import { useState } from 'react'
import { LogoTile, logoTileEdge, type LogoTileSize } from '@/components/LogoTile'
import type { StoreSeller } from '@/lib/store'
import { cn } from '@/lib/utils'

/**
 * A seller's mark on the app's logo tile — the Cowork publisher logo's
 * treatment (`components/cowork/EntityLogo.tsx`): the seller's own icon on a
 * white plate in both themes, since every one is drawn for a light page, and a
 * monogram when there is no icon or it fails to load. The icon is a copy in
 * `quiz/public/store-sellers/`, never a hotlink, so browsing the Store sends
 * nothing to the sellers on it.
 *
 * Branding, not information: the seller is named beside every tile, which is
 * why `LogoTile` hides it from assistive technology.
 */
export function SellerLogo({ seller, size = 'sm', className }: { seller: StoreSeller; size?: LogoTileSize; className?: string }) {
  const [failed, setFailed] = useState(false)
  const edge = logoTileEdge(size)

  if (seller.logo && !failed) {
    return (
      <LogoTile size={size} className={cn('overflow-hidden bg-white ring-1 ring-black/5', className)}>
        <img
          src={seller.logo}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          style={{ width: Math.round(edge * 0.8), height: Math.round(edge * 0.8) }}
          className="object-contain"
        />
      </LogoTile>
    )
  }

  const fontSize = Math.round(edge * (seller.short.length > 3 ? 0.26 : seller.short.length > 2 ? 0.3 : 0.38))
  return (
    <LogoTile size={size} className={cn('bg-muted font-extrabold tracking-tight text-muted-foreground', className)}>
      <span style={{ fontSize, lineHeight: 1 }}>{seller.short}</span>
    </LogoTile>
  )
}
