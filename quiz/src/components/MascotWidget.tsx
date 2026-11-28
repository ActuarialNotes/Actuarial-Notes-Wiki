import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Lock } from 'lucide-react'
import { parseAvatarUrl, serializeAvatar, type AnimalType, ANIMAL_TYPES, ANIMAL_LABELS } from '@/lib/avatar'
import { getAnimalPalette, COSMETICS } from '@/lib/cosmetics'
import { AnimalIcon } from '@/components/AnimalIcon'
import { FREE_ANIMALS } from '@/lib/characters'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

// ── MascotWidget ──────────────────────────────────────────────────────────────

interface MascotWidgetProps {
  avatarUrl: string
  initials: string
  /** @deprecated Ignored: the phrase bubble these fed was never drawn and is gone. */
  context?: unknown
  /** @deprecated Ignored: the widget is always the compact button. */
  compact?: boolean
}

/** The reader's character as a small button that opens the character and skin picker. */
export function MascotWidget({ avatarUrl, initials }: MascotWidgetProps) {
  const parsed = parseAvatarUrl(avatarUrl)
  const variant = parsed.type === 'animal' ? parsed.variant : undefined
  const [showSelector, setShowSelector] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowSelector(true)
  }

  const iconSize = 40
  const icon = (() => {
    if (parsed.type === 'animal') return null
    if (parsed.type === 'image' || parsed.type === 'custom') {
      return (
        <img
          src={parsed.value}
          alt="Your character"
          style={{ width: iconSize, height: iconSize, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
        />
      )
    }
    return (
      <span
        style={{
          display: 'inline-flex',
          width: iconSize,
          height: iconSize,
          borderRadius: '50%',
          backgroundColor: parsed.value,
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 600,
          fontSize: Math.round(iconSize * 0.35),
          flexShrink: 0,
        }}
      >
        {initials}
      </span>
    )
  })()

  return (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={handleClick}
        aria-label="Change character or skin"
        className="rounded-full transition-transform duration-150 active:scale-90 outline-none focus-visible:ring-2 focus-visible:ring-primary block"
      >
        {parsed.type === 'animal'
          ? <MascotAnimalIcon animal={parsed.value} variant={variant} size={iconSize} />
          : icon}
      </button>
      {showSelector && (
        <CharacterSkinSelector
          currentAvatarUrl={avatarUrl}
          onClose={() => setShowSelector(false)}
        />
      )}
    </div>
  )
}

// ── Character & Skin Selector Popup ──────────────────────────────────────────

interface CharacterSkinSelectorProps {
  currentAvatarUrl: string
  onClose: () => void
  // When provided, the picker hands the chosen avatar URL back instead of
  // writing it to the user's metadata itself — used by Settings, where the
  // choice is staged locally until "Save Profile".
  onSelect?: (avatarUrl: string) => void
}

export function CharacterSkinSelector({ currentAvatarUrl, onClose, onSelect }: CharacterSkinSelectorProps) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [ownedCosmetics, setOwnedCosmetics] = useState<Set<string>>(new Set())
  const [saving, setSaving] = useState(false)

  const parsed = parseAvatarUrl(currentAvatarUrl)
  const initAnimal: AnimalType = parsed.type === 'animal' ? parsed.value : 'fox'
  const initVariant: string | null = parsed.type === 'animal' ? (parsed.variant ?? null) : null

  // Optimistic local state so selection feels instant
  const [equippedAnimal, setEquippedAnimal] = useState<AnimalType>(initAnimal)
  const [equippedVariant, setEquippedVariant] = useState<string | null>(initVariant)

  // Sync with parent prop when supabase auth propagates the update back
  useEffect(() => {
    const p = parseAvatarUrl(currentAvatarUrl)
    if (p.type === 'animal') {
      setEquippedAnimal(p.value)
      setEquippedVariant(p.variant ?? null)
    }
  }, [currentAvatarUrl])

  useEffect(() => {
    if (!user?.id) return
    let cancelled = false
    supabase
      .from('user_cosmetics')
      .select('cosmetic_id')
      .eq('user_id', user.id)
      .then(({ data, error }: { data: { cosmetic_id: string }[] | null; error: unknown }) => {
        if (cancelled || error || !data) return
        setOwnedCosmetics(new Set(data.map(r => r.cosmetic_id)))
      })
    return () => { cancelled = true }
  }, [user?.id])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const isCharacterOwned = (animal: AnimalType) =>
    FREE_ANIMALS.has(animal) || ownedCosmetics.has(`character:${animal}`)

  const isSkinOwned = (animal: AnimalType, variantKey: string) =>
    ownedCosmetics.has(`${animal}:${variantKey}`)

  const equipAvatar = async (animal: AnimalType, variantKey: string | null) => {
    if (saving) return
    setEquippedAnimal(animal)
    setEquippedVariant(variantKey)
    const url = variantKey
      ? serializeAvatar({ type: 'animal', value: animal, variant: variantKey })
      : serializeAvatar({ type: 'animal', value: animal })
    if (onSelect) { onSelect(url); return }
    setSaving(true)
    try {
      await supabase.auth.updateUser({ data: { avatar_url: url } })
    } finally {
      setSaving(false)
    }
  }

  const handleCharacterClick = (animal: AnimalType) => {
    if (!isCharacterOwned(animal)) {
      navigate('/store/gems')
      onClose()
      return
    }
    if (animal === equippedAnimal && equippedVariant === null) return
    equipAvatar(animal, null)
  }

  const handleSkinClick = (variantKey: string | null) => {
    if (variantKey && !isSkinOwned(equippedAnimal, variantKey)) {
      navigate('/store/gems')
      onClose()
      return
    }
    if (equippedVariant === variantKey) return
    equipAvatar(equippedAnimal, variantKey)
  }

  const skinVariants = COSMETICS.filter(c => c.type === 'variant' && c.animal === equippedAnimal)

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[65] bg-black/50 backdrop-blur-sm paper-fade"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Popup — centered on all screen sizes */}
      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[66] w-[calc(100vw-2rem)] max-w-[340px] bg-card rounded-2xl shadow-2xl p-4 outline-none paper-drop"
        role="dialog"
        aria-modal="true"
        aria-label="Choose character and skin"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-semibold text-sm">Your Character</span>
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Characters grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {ANIMAL_TYPES.map(animal => {
            const owned = isCharacterOwned(animal)
            const active = equippedAnimal === animal
            return (
              <button
                key={animal}
                type="button"
                onClick={() => handleCharacterClick(animal)}
                className={cn(
                  'relative flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl border-2 transition-colors',
                  active
                    ? 'border-primary bg-primary/5'
                    : 'border-transparent hover:bg-muted',
                  !owned && 'opacity-60'
                )}
              >
                <MascotAnimalIcon animal={animal} size={40} />
                <span className="text-[10px] leading-none text-muted-foreground mt-0.5">
                  {ANIMAL_LABELS[animal]}
                </span>
                {!owned && (
                  <span className="absolute top-1.5 right-1.5">
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Skins section */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-muted-foreground">
            Skins · {ANIMAL_LABELS[equippedAnimal]}
          </div>
          <div className="flex gap-2 flex-wrap">
            {/* Default / base skin */}
            <button
              type="button"
              onClick={() => handleSkinClick(null)}
              className={cn(
                'flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl border-2 transition-colors',
                equippedVariant === null
                  ? 'border-primary bg-primary/5'
                  : 'border-transparent hover:bg-muted'
              )}
            >
              <MascotAnimalIcon animal={equippedAnimal} size={36} />
              <span className="text-[10px] leading-none text-muted-foreground">Default</span>
            </button>

            {/* Variant skins */}
            {skinVariants.map(cosmetic => {
              const owned = isSkinOwned(equippedAnimal, cosmetic.variantKey!)
              const active = equippedVariant === cosmetic.variantKey
              return (
                <button
                  key={cosmetic.id}
                  type="button"
                  onClick={() => handleSkinClick(cosmetic.variantKey!)}
                  className={cn(
                    'relative flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl border-2 transition-colors',
                    active
                      ? 'border-primary bg-primary/5'
                      : 'border-transparent hover:bg-muted',
                    !owned && 'opacity-60'
                  )}
                >
                  <MascotAnimalIcon animal={equippedAnimal} variant={cosmetic.variantKey} size={36} />
                  <span className="text-[10px] leading-none text-muted-foreground">{cosmetic.variantName}</span>
                  {!owned && (
                    <span className="absolute top-1.5 right-1.5">
                      <Lock className="h-3 w-3 text-muted-foreground" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Store link */}
        <div className="mt-3 pt-3">
          <button
            type="button"
            onClick={() => { navigate('/store/gems'); onClose() }}
            className="text-xs text-primary hover:underline"
          >
            + More in the Gem Shop
          </button>
        </div>
      </div>
    </>
  )
}

function MascotAnimalIcon({ animal, variant, size }: { animal: AnimalType; variant?: string; size: number }) {
  return <AnimalIcon animal={animal} palette={getAnimalPalette(animal, variant)} size={size} />
}
