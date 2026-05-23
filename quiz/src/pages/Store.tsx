import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, Gem, Loader2, Lock } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useGems } from '@/hooks/useGems'
import { useSubscription } from '@/hooks/useSubscription'
import { supabase } from '@/lib/supabase'
import { AvatarDisplay, serializeAvatar, ANIMAL_LABELS } from '@/components/AvatarDisplay'
import { COSMETICS, type Cosmetic } from '@/lib/cosmetics'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function Store() {
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()
  const { isPremium, loading: subLoading } = useSubscription()
  const { balance, loading: gemsLoading, refresh: refreshGems } = useGems()
  const [owned, setOwned] = useState<Set<string>>(new Set())
  const [equipped, setEquipped] = useState<string | null>(null) // cosmetic_id of the currently equipped avatar
  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const userId = user?.id

  // Derive currently equipped cosmetic from user_metadata.avatar_url.
  useEffect(() => {
    const raw = user?.user_metadata?.avatar_url as string | undefined
    if (!raw || !raw.startsWith('{')) { setEquipped(null); return }
    try {
      const parsed = JSON.parse(raw)
      if (parsed.type === 'animal' && parsed.variant) {
        setEquipped(`${parsed.value}:${parsed.variant}`)
      } else {
        setEquipped(null)
      }
    } catch {
      setEquipped(null)
    }
  }, [user])

  const fetchOwned = useCallback(async () => {
    if (!userId) { setOwned(new Set()); return }
    const { data, error: queryError } = await supabase
      .from('user_cosmetics')
      .select('cosmetic_id')
      .eq('user_id', userId)
    if (queryError) {
      console.warn('Store: failed to load cosmetics:', queryError.message)
      return
    }
    setOwned(new Set((data ?? []).map((r: { cosmetic_id: string }) => r.cosmetic_id)))
  }, [userId])

  useEffect(() => { void fetchOwned() }, [fetchOwned])

  async function handleBuy(cosmetic: Cosmetic) {
    if (!userId) { navigate('/auth', { state: { from: '/store' } }); return }
    setBusyId(cosmetic.id)
    setError(null)
    const { error: rpcError } = await supabase.rpc('purchase_cosmetic', {
      p_cosmetic_id: cosmetic.id,
      p_price: cosmetic.priceGems,
    })
    if (rpcError) {
      setError(rpcError.message)
      setBusyId(null)
      return
    }
    await Promise.all([refreshGems(), fetchOwned()])
    setBusyId(null)
  }

  async function handleEquip(cosmetic: Cosmetic) {
    if (!userId) return
    setBusyId(cosmetic.id)
    setError(null)
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        avatar_url: serializeAvatar({
          type: 'animal',
          value: cosmetic.animal,
          variant: cosmetic.variantKey,
        }),
      },
    })
    if (updateError) {
      setError(updateError.message)
      setBusyId(null)
      return
    }
    setEquipped(cosmetic.id)
    setBusyId(null)
  }

  if (authLoading || (user && subLoading)) {
    return (
      <div className="container max-w-3xl mx-auto px-4 py-8 flex items-center justify-center min-h-[40vh]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Store</h1>
        {user && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
            <Gem className="h-4 w-4" />
            {gemsLoading ? '—' : balance.toLocaleString()}
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground">
        Earn 1 gem for every correct answer. Spend them here on color variants of your favorite animal.
      </p>

      {user && !isPremium && (
        <div className="rounded-md border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-400">
          You&apos;re on the free plan.{' '}
          <Link to="/upgrade" className="underline font-medium">Upgrade to Premium</Link>
          {' '}to spend your gems in the store.
        </div>
      )}

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {COSMETICS.map(cosmetic => {
          const isOwned = owned.has(cosmetic.id)
          const isEquipped = equipped === cosmetic.id
          const canAfford = balance >= cosmetic.priceGems
          const isBusy = busyId === cosmetic.id
          const previewUrl = serializeAvatar({ type: 'animal', value: cosmetic.animal, variant: cosmetic.variantKey })

          return (
            <Card key={cosmetic.id}>
              <CardContent className="p-4 flex flex-col items-center gap-3">
                <AvatarDisplay avatarUrl={previewUrl} initials="" size={72} />
                <div className="text-center space-y-0.5">
                  <p className="text-sm font-semibold">{cosmetic.variantName}</p>
                  <p className="text-xs text-muted-foreground">{ANIMAL_LABELS[cosmetic.animal]}</p>
                </div>
                {!user ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate('/auth', { state: { from: '/store' } })}
                    className="w-full gap-1.5"
                  >
                    <Lock className="h-3.5 w-3.5" />
                    Sign in to buy
                  </Button>
                ) : !isPremium ? (
                  isOwned ? (
                    isEquipped ? (
                      <Button size="sm" variant="outline" disabled className="w-full gap-1.5">
                        <Check className="h-4 w-4" />
                        Equipped
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEquip(cosmetic)}
                        disabled={isBusy}
                        className="w-full"
                      >
                        {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Equip'}
                      </Button>
                    )
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => navigate('/upgrade')}
                      className="w-full gap-1.5"
                    >
                      <Lock className="h-3.5 w-3.5" />
                      Upgrade to buy
                    </Button>
                  )
                ) : isOwned ? (
                  isEquipped ? (
                    <Button size="sm" variant="outline" disabled className="w-full gap-1.5">
                      <Check className="h-4 w-4" />
                      Equipped
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEquip(cosmetic)}
                      disabled={isBusy}
                      className="w-full"
                    >
                      {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Equip'}
                    </Button>
                  )
                ) : canAfford ? (
                  <Button
                    size="sm"
                    onClick={() => handleBuy(cosmetic)}
                    disabled={isBusy}
                    className="w-full gap-1.5"
                  >
                    {isBusy ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Buy — {cosmetic.priceGems}
                        <Gem className="h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" disabled className="w-full gap-1.5">
                    <Lock className="h-3.5 w-3.5" />
                    Need {cosmetic.priceGems - balance} more
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
