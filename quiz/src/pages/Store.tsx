import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Gem, Loader2, Lock, Star } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { useGems } from '@/hooks/useGems'
import { useSubscription } from '@/hooks/useSubscription'
import { useExamProgress } from '@/contexts/ExamProgressContext'
import { supabase } from '@/lib/supabase'
import { AvatarDisplay, serializeAvatar, ANIMAL_LABELS, type AnimalType } from '@/components/AvatarDisplay'
import { COSMETICS, type Cosmetic, type CosmeticRarity } from '@/lib/cosmetics'
import { CHARACTERS, type CharacterDefinition, type CharacterRarity } from '@/lib/characters'
import {
  DESIGNATION_BANNERS,
  CUSTOM_BANNER_PRICE,
  CUSTOM_BANNER_PURCHASE_ID,
  CUSTOM_BANNER_MAX_CHARS,
  isBannerEarned,
  bannerProgress,
  serializeBanner,
  parseBanner,
  type BannerEquip,
} from '@/lib/banners'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type StoreTab = 'characters' | 'skins' | 'banners'

type AnyRarity = CharacterRarity | CosmeticRarity

const RARITY_STYLES: Record<AnyRarity, string> = {
  free:   'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  common: 'bg-slate-400/15 text-slate-500 dark:text-slate-400',
  rare:   'bg-violet-500/15 text-violet-600 dark:text-violet-400',
  mythic: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
}

function RarityBadge({ rarity }: { rarity: AnyRarity }) {
  const label = rarity === 'free' ? 'Free' : rarity.charAt(0).toUpperCase() + rarity.slice(1)
  return (
    <span className={cn('inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest', RARITY_STYLES[rarity])}>
      {label}
    </span>
  )
}

export default function Store() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { isPremium, isBetaTester, loading: subLoading } = useSubscription()
  const { balance, loading: gemsLoading, refresh: refreshGems } = useGems()
  const { progress } = useExamProgress()

  const [activeTab, setActiveTab] = useState<StoreTab>('characters')
  const [skinAnimalFilter, setSkinAnimalFilter] = useState<AnimalType | null>(null)

  // All owned IDs from user_cosmetics (characters + paints + banner:custom)
  const [ownedIds, setOwnedIds] = useState<Set<string>>(new Set())
  // Free banner ownership from user_banners
  const [ownedBanners, setOwnedBanners] = useState<Set<string>>(new Set())

  // Equipped state parsed from user metadata
  const [equippedAnimal, setEquippedAnimal] = useState<AnimalType | null>(null)
  const [equippedPaint, setEquippedPaint] = useState<string | null>(null)
  const [equippedBanner, setEquippedBanner] = useState<BannerEquip | null>(null)

  const [busyId, setBusyId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [customBannerText, setCustomBannerText] = useState('')

  const userId = user?.id
  const actionsReady = !subLoading

  // Parse avatar from user metadata
  useEffect(() => {
    const raw = user?.user_metadata?.avatar_url as string | undefined
    if (!raw?.startsWith('{')) { setEquippedAnimal(null); setEquippedPaint(null); return }
    try {
      const parsed = JSON.parse(raw)
      if (parsed.type === 'animal') {
        setEquippedAnimal(parsed.value as AnimalType)
        setEquippedPaint(parsed.variant ? `${parsed.value}:${parsed.variant}` : null)
      }
    } catch {
      setEquippedAnimal(null); setEquippedPaint(null)
    }
  }, [user])

  // Parse banner from user metadata
  useEffect(() => {
    const raw = user?.user_metadata?.banner_data as string | undefined
    const b = parseBanner(raw)
    setEquippedBanner(b)
    if (b?.id === 'custom' && b.text && !customBannerText) setCustomBannerText(b.text)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const fetchOwned = useCallback(async () => {
    if (!userId) { setOwnedIds(new Set()); setOwnedBanners(new Set()); return }
    const [cosmResult, bannerResult] = await Promise.all([
      supabase.from('user_cosmetics').select('cosmetic_id').eq('user_id', userId),
      supabase.from('user_banners').select('banner_id').eq('user_id', userId),
    ])
    if (!cosmResult.error) setOwnedIds(new Set((cosmResult.data ?? []).map((r: { cosmetic_id: string }) => r.cosmetic_id)))
    if (!bannerResult.error) setOwnedBanners(new Set((bannerResult.data ?? []).map((r: { banner_id: string }) => r.banner_id)))
  }, [userId])

  useEffect(() => { void fetchOwned() }, [fetchOwned])

  // ── Character actions ──────────────────────────────────────────────────────

  async function handleBuyCharacter(char: CharacterDefinition) {
    if (!userId) { navigate('/auth', { state: { from: '/store' } }); return }
    setBusyId(char.purchaseId); setError(null)
    const { error: rpcError } = await supabase.rpc('purchase_cosmetic', {
      p_cosmetic_id: char.purchaseId,
      p_price: char.priceGems,
    })
    if (rpcError) { setError(rpcError.message); setBusyId(null); return }
    await Promise.all([refreshGems(), fetchOwned()])
    setBusyId(null)
  }

  async function handleEquipCharacter(animal: AnimalType) {
    if (!userId) return
    setBusyId(`equip-char:${animal}`); setError(null)
    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: serializeAvatar({ type: 'animal', value: animal }) },
    })
    if (updateError) { setError(updateError.message); setBusyId(null); return }
    setEquippedAnimal(animal)
    setEquippedPaint(null)
    setBusyId(null)
  }

  // ── Paint actions ──────────────────────────────────────────────────────────

  async function handleBuyPaint(cosmetic: Cosmetic) {
    if (!userId) { navigate('/auth', { state: { from: '/store' } }); return }
    setBusyId(cosmetic.id); setError(null)
    const { error: rpcError } = await supabase.rpc('purchase_cosmetic', {
      p_cosmetic_id: cosmetic.id,
      p_price: cosmetic.priceGems,
    })
    if (rpcError) { setError(rpcError.message); setBusyId(null); return }
    await Promise.all([refreshGems(), fetchOwned()])
    setBusyId(null)
  }

  async function handleEquipPaint(cosmetic: Cosmetic) {
    if (!userId) return
    setBusyId(cosmetic.id); setError(null)
    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        avatar_url: serializeAvatar({ type: 'animal', value: cosmetic.animal!, variant: cosmetic.variantKey! }),
      },
    })
    if (updateError) { setError(updateError.message); setBusyId(null); return }
    setEquippedAnimal(cosmetic.animal!)
    setEquippedPaint(cosmetic.id)
    setBusyId(null)
  }

  // ── Banner actions ─────────────────────────────────────────────────────────

  async function handleEquipBanner(equip: BannerEquip) {
    if (!userId) return
    setBusyId(`equip-banner:${equip.id}`); setError(null)
    const { error: updateError } = await supabase.auth.updateUser({
      data: { banner_data: serializeBanner(equip) },
    })
    if (updateError) { setError(updateError.message); setBusyId(null); return }
    setEquippedBanner(equip)
    setBusyId(null)
  }

  async function handleUnlockBanner(bannerId: string) {
    if (!userId) return
    setBusyId(`unlock-banner:${bannerId}`); setError(null)
    const { error: insertError } = await supabase
      .from('user_banners')
      .insert({ user_id: userId, banner_id: bannerId })
    if (insertError && insertError.code !== '23505') {
      setError(insertError.message); setBusyId(null); return
    }
    setOwnedBanners(prev => new Set([...prev, bannerId]))
    const equip: BannerEquip = { id: bannerId as BannerEquip['id'] }
    const { error: updateError } = await supabase.auth.updateUser({
      data: { banner_data: serializeBanner(equip) },
    })
    if (!updateError) setEquippedBanner(equip)
    setBusyId(null)
  }

  async function handleBuyCustomBanner() {
    if (!userId) { navigate('/auth', { state: { from: '/store' } }); return }
    const text = customBannerText.trim()
    if (!text) { setError('Enter text for your banner first'); return }
    setBusyId(CUSTOM_BANNER_PURCHASE_ID); setError(null)
    const { error: rpcError } = await supabase.rpc('purchase_cosmetic', {
      p_cosmetic_id: CUSTOM_BANNER_PURCHASE_ID,
      p_price: CUSTOM_BANNER_PRICE,
    })
    if (rpcError) { setError(rpcError.message); setBusyId(null); return }
    await refreshGems()
    setOwnedIds(prev => new Set([...prev, CUSTOM_BANNER_PURCHASE_ID]))
    const equip: BannerEquip = { id: 'custom', text }
    const { error: updateError } = await supabase.auth.updateUser({
      data: { banner_data: serializeBanner(equip) },
    })
    if (!updateError) setEquippedBanner(equip)
    setBusyId(null)
  }

  async function handleUpdateCustomBanner() {
    const text = customBannerText.trim()
    if (!text) { setError('Banner text cannot be empty'); return }
    await handleEquipBanner({ id: 'custom', text })
  }

  // ── Main render ────────────────────────────────────────────────────────────

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8 space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Store</h1>
        {user && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold">
            <Gem className="h-4 w-4" />
            {gemsLoading ? '—' : balance.toLocaleString()}
          </div>
        )}
      </div>

      <p className="text-muted-foreground">
        Earn 1 gem for every correct answer. Unlock characters, skins, and banners.
      </p>

      {error && (
        <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive flex items-center justify-between gap-2">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="opacity-60 hover:opacity-100 shrink-0">✕</button>
        </div>
      )}

      {/* Tab bar */}
      <div className="flex border-b border-border">
        {(['characters', 'skins', 'banners'] as StoreTab[]).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px',
              activeTab === tab
                ? 'border-foreground text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground',
            )}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ── Characters ────────────────────────────────────────────────────────── */}
      {activeTab === 'characters' && (
        <div className="space-y-4">
          <div>
            <h2 className="font-semibold">Characters</h2>
            <p className="text-sm text-muted-foreground">Fox, Koala, and Frog are free. Rare characters cost 50 gems.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {CHARACTERS.map(char => {
              const isOwned = char.free || ownedIds.has(char.purchaseId)
              const isEquipped = equippedAnimal === char.animal && !equippedPaint
              const isBusy = busyId === char.purchaseId || busyId === `equip-char:${char.animal}`
              const canAfford = balance >= char.priceGems
              const previewUrl = serializeAvatar({ type: 'animal', value: char.animal })

              return (
                <Card key={char.animal}>
                  <CardContent className="p-4 flex flex-col items-center gap-3">
                    <AvatarDisplay avatarUrl={previewUrl} initials="" size={72} />
                    <div className="text-center space-y-1.5">
                      <p className="text-sm font-semibold">{char.label}</p>
                      <RarityBadge rarity={char.rarity} />
                      <p className="text-xs text-muted-foreground italic leading-snug">"{char.quote}"</p>
                    </div>

                    {isEquipped ? (
                      <Button size="sm" variant="outline" disabled className="w-full gap-1.5">
                        <Check className="h-4 w-4" />Equipped
                      </Button>
                    ) : isOwned ? (
                      <Button size="sm" variant="outline" onClick={() => handleEquipCharacter(char.animal)} disabled={isBusy} className="w-full">
                        {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Equip'}
                      </Button>
                    ) : !actionsReady ? (
                      <Button size="sm" variant="outline" disabled className="w-full">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </Button>
                    ) : !user ? (
                      <Button size="sm" variant="outline" onClick={() => navigate('/auth', { state: { from: '/store' } })} className="w-full gap-1.5">
                        <Lock className="h-3.5 w-3.5" />Sign in to buy
                      </Button>
                    ) : canAfford ? (
                      <Button size="sm" onClick={() => handleBuyCharacter(char)} disabled={isBusy} className="w-full gap-1.5">
                        {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                          <>{char.priceGems} <Gem className="h-3.5 w-3.5" /></>
                        )}
                      </Button>
                    ) : (
                      <Button size="sm" disabled className="w-full gap-1.5 opacity-35">
                        {char.priceGems} <Gem className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {/* ── Skins ─────────────────────────────────────────────────────────────── */}
      {activeTab === 'skins' && (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">Real-world color variants. Common skins cost 10 gems; Rare cost 50.</p>

          {/* Character filter bubbles */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            <button
              onClick={() => setSkinAnimalFilter(null)}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors',
                skinAnimalFilter === null
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              All
            </button>
            {CHARACTERS.map(char => {
              const isCharOwned = char.free || ownedIds.has(char.purchaseId)
              const isActive = skinAnimalFilter === char.animal
              const previewUrl = serializeAvatar({ type: 'animal', value: char.animal })
              return (
                <button
                  key={char.animal}
                  onClick={() => setSkinAnimalFilter(isActive ? null : char.animal)}
                  className={cn(
                    'shrink-0 flex flex-col items-center gap-1 p-2 rounded-xl border transition-colors',
                    isActive
                      ? 'bg-foreground/10 border-foreground'
                      : 'border-border hover:border-foreground/50',
                    !isCharOwned && 'opacity-40',
                  )}
                >
                  <AvatarDisplay avatarUrl={previewUrl} initials="" size={36} />
                  <span className="text-[10px] font-medium leading-none">{char.label}</span>
                </button>
              )
            })}
          </div>

          {/* Skins grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {COSMETICS
              .filter(c => skinAnimalFilter ? c.animal === skinAnimalFilter : true)
              .map(cosmetic => {
                const isOwned = ownedIds.has(cosmetic.id)
                const isEquipped = equippedPaint === cosmetic.id
                const isBusy = busyId === cosmetic.id
                const canAfford = balance >= cosmetic.priceGems
                const previewUrl = cosmetic.type === 'variant'
                  ? serializeAvatar({ type: 'animal', value: cosmetic.animal!, variant: cosmetic.variantKey! })
                  : ''
                const charDef = CHARACTERS.find(c => c.animal === cosmetic.animal)
                const isCharOwned = charDef ? (charDef.free || ownedIds.has(charDef.purchaseId)) : true

                return (
                  <Card key={cosmetic.id}>
                    <CardContent className="p-4 flex flex-col items-center gap-3">
                      {cosmetic.type === 'badge' ? (
                        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-amber-400/15">
                          <Star className="h-9 w-9 text-amber-500" />
                        </div>
                      ) : (
                        <AvatarDisplay avatarUrl={previewUrl} initials="" size={72} />
                      )}
                      <div className="text-center space-y-1.5">
                        <p className="text-sm font-semibold">{cosmetic.variantName}</p>
                        <p className="text-xs text-muted-foreground">
                          {cosmetic.type === 'badge' ? 'Profile badge' : ANIMAL_LABELS[cosmetic.animal!]}
                        </p>
                        <RarityBadge rarity={cosmetic.rarity} />
                      </div>

                      {isOwned ? (
                        cosmetic.type === 'badge' ? (
                          <Button size="sm" variant="outline" disabled className="w-full gap-1.5">
                            <Check className="h-4 w-4" />Unlocked
                          </Button>
                        ) : isEquipped ? (
                          <Button size="sm" variant="outline" disabled className="w-full gap-1.5">
                            <Check className="h-4 w-4" />Equipped
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" onClick={() => handleEquipPaint(cosmetic)} disabled={isBusy} className="w-full">
                            {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Equip'}
                          </Button>
                        )
                      ) : !actionsReady ? (
                        <Button size="sm" variant="outline" disabled className="w-full">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </Button>
                      ) : !user ? (
                        <Button size="sm" variant="outline" onClick={() => navigate('/auth', { state: { from: '/store' } })} className="w-full gap-1.5">
                          <Lock className="h-3.5 w-3.5" />Sign in to buy
                        </Button>
                      ) : !isCharOwned ? (
                        <Button size="sm" variant="outline" onClick={() => setActiveTab('characters')} className="w-full gap-1.5 text-xs">
                          <Lock className="h-3.5 w-3.5" />Get {charDef?.label} first
                        </Button>
                      ) : cosmetic.premiumOnly && !isPremium ? (
                        <Button size="sm" variant="outline" onClick={() => navigate('/upgrade')} className="w-full gap-1.5">
                          <Lock className="h-3.5 w-3.5" />Upgrade to buy
                        </Button>
                      ) : canAfford ? (
                        <Button size="sm" onClick={() => handleBuyPaint(cosmetic)} disabled={isBusy} className="w-full gap-1.5">
                          {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                            <>{cosmetic.priceGems} <Gem className="h-3.5 w-3.5" /></>
                          )}
                        </Button>
                      ) : (
                        <Button size="sm" disabled className="w-full gap-1.5 opacity-35">
                          {cosmetic.priceGems} <Gem className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </div>
      )}

      {/* ── Banners ─────────────────────────────────────────────────────────── */}
      {activeTab === 'banners' && (
        <div className="space-y-8">
          {!user ? (
            <p className="text-sm text-muted-foreground">
              <button
                onClick={() => navigate('/auth', { state: { from: '/store' } })}
                className="underline font-medium"
              >
                Sign in
              </button>{' '}to unlock and equip banners.
            </p>
          ) : (
            <>
              {/* Designation Banners */}
              <section className="space-y-3">
                <div>
                  <h2 className="font-semibold">Designation Banners</h2>
                  <p className="text-sm text-muted-foreground">Complete all exam requirements to unlock for free.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DESIGNATION_BANNERS.map(banner => {
                    const { done, total } = bannerProgress(banner, progress)
                    const earned = isBannerEarned(banner, progress)
                    const owned = ownedBanners.has(banner.id)
                    const isEquipped = equippedBanner?.id === banner.id
                    const isBusy =
                      busyId === `unlock-banner:${banner.id}` ||
                      busyId === `equip-banner:${banner.id}`

                    return (
                      <Card key={banner.id}>
                        <CardContent className="p-4 space-y-3">
                          {/* Preview */}
                          <div
                            className="rounded-md px-6 py-5 text-center select-none"
                            style={{
                              background: banner.colors.bg,
                              color: banner.colors.text,
                              border: `1px solid ${banner.colors.border}`,
                            }}
                          >
                            <div className="text-xl font-semibold tracking-[0.25em]">{banner.label}</div>
                            <div className="mt-1.5 h-px w-8 mx-auto opacity-20" style={{ background: 'currentColor' }} />
                            <div className="mt-1.5 text-[11px] tracking-wider uppercase font-medium opacity-60">{banner.fullName}</div>
                          </div>

                          {/* Progress */}
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Requirements</span>
                              <span className={cn(earned && 'text-emerald-600 dark:text-emerald-400 font-medium')}>
                                {done}/{total}
                              </span>
                            </div>
                            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className={cn(
                                  'h-full rounded-full transition-all',
                                  earned ? 'bg-emerald-500' : 'bg-primary/60',
                                )}
                                style={{ width: `${(done / total) * 100}%` }}
                              />
                            </div>
                          </div>

                          {/* Action */}
                          {isEquipped ? (
                            <Button size="sm" variant="outline" disabled className="w-full gap-1.5">
                              <Check className="h-4 w-4" />Equipped
                            </Button>
                          ) : owned ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEquipBanner({ id: banner.id })}
                              disabled={isBusy}
                              className="w-full"
                            >
                              {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Equip'}
                            </Button>
                          ) : earned ? (
                            <Button
                              size="sm"
                              onClick={() => handleUnlockBanner(banner.id)}
                              disabled={isBusy}
                              className="w-full"
                            >
                              {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Unlock & Equip'}
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" disabled className="w-full gap-1.5 text-xs">
                              <Lock className="h-3.5 w-3.5" />
                              Complete requirements ({done}/{total})
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </section>

              {/* Special Banners */}
              <section className="space-y-3">
                <div>
                  <h2 className="font-semibold">Special Banners</h2>
                  <p className="text-sm text-muted-foreground">Granted for special achievements.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div className="rounded-lg px-4 py-4 text-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white select-none">
                        <div className="text-2xl font-bold">Beta Tester</div>
                        <div className="text-xs mt-0.5 opacity-80">Early adopter</div>
                      </div>

                      {isBetaTester ? (
                        equippedBanner?.id === 'beta_tester' ? (
                          <Button size="sm" variant="outline" disabled className="w-full gap-1.5">
                            <Check className="h-4 w-4" />Equipped
                          </Button>
                        ) : ownedBanners.has('beta_tester') ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEquipBanner({ id: 'beta_tester' })}
                            disabled={busyId === 'equip-banner:beta_tester'}
                            className="w-full"
                          >
                            {busyId === 'equip-banner:beta_tester'
                              ? <Loader2 className="h-4 w-4 animate-spin" />
                              : 'Equip'
                            }
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => handleUnlockBanner('beta_tester')}
                            disabled={busyId === 'unlock-banner:beta_tester'}
                            className="w-full"
                          >
                            {busyId === 'unlock-banner:beta_tester'
                              ? <Loader2 className="h-4 w-4 animate-spin" />
                              : 'Unlock & Equip'
                            }
                          </Button>
                        )
                      ) : (
                        <Button size="sm" variant="outline" disabled className="w-full gap-1.5 text-xs">
                          <Lock className="h-3.5 w-3.5" />Available to beta testers
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Custom Banner */}
              <section className="space-y-3">
                <div>
                  <h2 className="font-semibold">Custom Banner</h2>
                  <p className="text-sm text-muted-foreground">
                    {ownedIds.has(CUSTOM_BANNER_PURCHASE_ID)
                      ? 'Your custom slot is unlocked — update the text for free anytime.'
                      : `Purchase a custom banner for ${CUSTOM_BANNER_PRICE} gems. Up to ${CUSTOM_BANNER_MAX_CHARS} characters.`}
                  </p>
                </div>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    {/* Live preview */}
                    <div className="rounded-lg px-4 py-4 min-h-[72px] flex items-center justify-center bg-gradient-to-r from-violet-600 to-purple-600 text-white select-none">
                      <div className="text-2xl font-bold tracking-wide">
                        {customBannerText.trim() || (
                          <span className="opacity-40 italic text-lg font-normal">Your text here</span>
                        )}
                      </div>
                    </div>

                    {/* Text input */}
                    <div className="flex items-center gap-2">
                      <Input
                        value={customBannerText}
                        onChange={e => setCustomBannerText(e.target.value.slice(0, CUSTOM_BANNER_MAX_CHARS))}
                        placeholder={`Up to ${CUSTOM_BANNER_MAX_CHARS} characters`}
                        maxLength={CUSTOM_BANNER_MAX_CHARS}
                        className="flex-1"
                      />
                      <span className="text-xs text-muted-foreground shrink-0 w-10 text-right">
                        {customBannerText.length}/{CUSTOM_BANNER_MAX_CHARS}
                      </span>
                    </div>

                    {/* Action */}
                    {ownedIds.has(CUSTOM_BANNER_PURCHASE_ID) ? (
                      isCustomBannerEquipped(equippedBanner, customBannerText) ? (
                        <Button size="sm" variant="outline" disabled className="w-full gap-1.5">
                          <Check className="h-4 w-4" />Equipped
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={handleUpdateCustomBanner}
                          disabled={busyId === 'equip-banner:custom' || !customBannerText.trim()}
                          className="w-full"
                        >
                          {busyId === 'equip-banner:custom'
                            ? <Loader2 className="h-4 w-4 animate-spin" />
                            : equippedBanner?.id === 'custom' ? 'Update & Equip' : 'Equip'
                          }
                        </Button>
                      )
                    ) : balance >= CUSTOM_BANNER_PRICE ? (
                      <Button
                        size="sm"
                        onClick={handleBuyCustomBanner}
                        disabled={busyId === CUSTOM_BANNER_PURCHASE_ID || !customBannerText.trim()}
                        className="w-full gap-1.5"
                      >
                        {busyId === CUSTOM_BANNER_PURCHASE_ID
                          ? <Loader2 className="h-4 w-4 animate-spin" />
                          : <><span>{CUSTOM_BANNER_PRICE}</span> <Gem className="h-3.5 w-3.5" /></>
                        }
                      </Button>
                    ) : (
                      <Button size="sm" disabled className="w-full gap-1.5 opacity-35">
                        {CUSTOM_BANNER_PRICE} <Gem className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </section>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function isCustomBannerEquipped(equipped: BannerEquip | null, text: string): boolean {
  return equipped?.id === 'custom' && equipped.text === text.trim()
}
