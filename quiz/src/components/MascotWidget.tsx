import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Lock } from 'lucide-react'
import { parseAvatarUrl, serializeAvatar, type AnimalType, ANIMAL_TYPES, ANIMAL_LABELS } from '@/lib/avatar'
import { getAnimalPalette, COSMETICS, type AnimalPalette } from '@/lib/cosmetics'
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

// ── Animal icon (avoids importing the whole AvatarDisplay map) ────────────────

function MascotAnimalIcon({ animal, variant, size }: { animal: AnimalType; variant?: string; size: number }) {
  const palette = getAnimalPalette(animal, variant)
  switch (animal) {
    case 'fox':     return <FoxMascot size={size} palette={palette} />
    case 'koala':   return <KoalaMascot size={size} palette={palette} />
    case 'frog':    return <FrogMascot size={size} palette={palette} />
    case 'owl':     return <OwlMascot size={size} palette={palette} />
    case 'wolf':    return <WolfMascot size={size} palette={palette} />
    case 'octopus': return <OctopusMascot size={size} palette={palette} />
  }
}

function FoxMascot({ size, palette }: { size: number; palette: AnimalPalette }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><clipPath id="mc-fox"><circle cx="16" cy="16" r="16" /></clipPath></defs>
      <circle cx="16" cy="16" r="16" fill={palette.primary} />
      <g clipPath="url(#mc-fox)">
        <polygon points="7,18 4,0 15,10" fill={palette.primary} />
        <polygon points="8,16 6,4 13,10" fill={palette.secondary} />
        <polygon points="25,18 28,0 17,10" fill={palette.primary} />
        <polygon points="24,16 26,4 19,10" fill={palette.secondary} />
        <ellipse cx="16" cy="23" rx="8" ry="6" fill={palette.belly} />
        <circle cx="11" cy="17" r="2.8" fill="#1C1B1B" />
        <circle cx="21" cy="17" r="2.8" fill="#1C1B1B" />
        <circle cx="11.9" cy="16.1" r="1" fill="white" />
        <circle cx="21.9" cy="16.1" r="1" fill="white" />
        <ellipse cx="16" cy="22" rx="1.4" ry="1" fill="#1C1B1B" />
      </g>
    </svg>
  )
}

function KoalaMascot({ size, palette }: { size: number; palette: AnimalPalette }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><clipPath id="mc-koala"><circle cx="16" cy="16" r="16" /></clipPath></defs>
      <circle cx="16" cy="16" r="16" fill={palette.primary} />
      <g clipPath="url(#mc-koala)">
        <circle cx="5" cy="10" r="7" fill={palette.secondary} />
        <circle cx="5" cy="10" r="4.5" fill={palette.belly} />
        <circle cx="27" cy="10" r="7" fill={palette.secondary} />
        <circle cx="27" cy="10" r="4.5" fill={palette.belly} />
        <circle cx="16" cy="16" r="16" fill={palette.primary} />
        <ellipse cx="16" cy="22" rx="7" ry="5" fill={palette.belly} />
        <ellipse cx="16" cy="19" rx="3.5" ry="2.5" fill="#2D3A42" />
        <circle cx="11" cy="15" r="2.5" fill="#1C1B1B" />
        <circle cx="21" cy="15" r="2.5" fill="#1C1B1B" />
        <circle cx="11.8" cy="14.2" r="0.9" fill="white" />
        <circle cx="21.8" cy="14.2" r="0.9" fill="white" />
      </g>
    </svg>
  )
}

function FrogMascot({ size, palette }: { size: number; palette: AnimalPalette }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><clipPath id="mc-frog"><circle cx="16" cy="16" r="16" /></clipPath></defs>
      <circle cx="16" cy="16" r="16" fill={palette.primary} />
      <g clipPath="url(#mc-frog)">
        <circle cx="9" cy="10" r="6" fill={palette.primary} />
        <circle cx="23" cy="10" r="6" fill={palette.primary} />
        <ellipse cx="16" cy="23" rx="9" ry="7" fill={palette.belly} />
        <circle cx="9" cy="10" r="4" fill="#F5F5F0" />
        <circle cx="23" cy="10" r="4" fill="#F5F5F0" />
        <circle cx="9" cy="10" r="2.5" fill="#1C1B1B" />
        <circle cx="23" cy="10" r="2.5" fill="#1C1B1B" />
        <circle cx="9.8" cy="9.2" r="0.9" fill="white" />
        <circle cx="23.8" cy="9.2" r="0.9" fill="white" />
        <path d="M11 21 Q16 25 21 21" stroke={palette.secondary} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}

function OwlMascot({ size, palette }: { size: number; palette: AnimalPalette }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><clipPath id="mc-owl"><circle cx="16" cy="16" r="16" /></clipPath></defs>
      <circle cx="16" cy="16" r="16" fill={palette.primary} />
      <g clipPath="url(#mc-owl)">
        <polygon points="10,14 8,2 14,10" fill={palette.secondary} />
        <polygon points="22,14 24,2 18,10" fill={palette.secondary} />
        <ellipse cx="16" cy="20" rx="11" ry="13" fill={palette.belly} />
        <circle cx="11" cy="17" r="4.5" fill="#F5F0E8" />
        <circle cx="21" cy="17" r="4.5" fill="#F5F0E8" />
        <circle cx="11" cy="17" r="2.8" fill="#1C1B1B" />
        <circle cx="21" cy="17" r="2.8" fill="#1C1B1B" />
        <circle cx="11" cy="17" r="1.5" fill="#D4A017" />
        <circle cx="21" cy="17" r="1.5" fill="#D4A017" />
        <circle cx="11" cy="17" r="0.7" fill="#1C1B1B" />
        <circle cx="21" cy="17" r="0.7" fill="#1C1B1B" />
        <circle cx="11.6" cy="16.3" r="0.5" fill="white" />
        <circle cx="21.6" cy="16.3" r="0.5" fill="white" />
        <polygon points="16,19 14,22 18,22" fill="#D4881A" />
      </g>
    </svg>
  )
}

function WolfMascot({ size, palette }: { size: number; palette: AnimalPalette }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><clipPath id="mc-wolf"><circle cx="16" cy="16" r="16" /></clipPath></defs>
      <circle cx="16" cy="16" r="16" fill={palette.primary} />
      <g clipPath="url(#mc-wolf)">
        <polygon points="7,16 4,0 15,9" fill={palette.primary} />
        <polygon points="8,14 6,3 13,9" fill={palette.secondary} />
        <polygon points="25,16 28,0 17,9" fill={palette.primary} />
        <polygon points="24,14 26,3 19,9" fill={palette.secondary} />
        <ellipse cx="16" cy="22" rx="7" ry="5.5" fill={palette.belly} />
        <circle cx="11.5" cy="17" r="2.8" fill="#1C1B1B" />
        <circle cx="20.5" cy="17" r="2.8" fill="#1C1B1B" />
        <circle cx="11.5" cy="17" r="1.6" fill="#C9831A" />
        <circle cx="20.5" cy="17" r="1.6" fill="#C9831A" />
        <circle cx="11.5" cy="17" r="0.8" fill="#1C1B1B" />
        <circle cx="20.5" cy="17" r="0.8" fill="#1C1B1B" />
        <circle cx="12.1" cy="16.3" r="0.5" fill="white" />
        <circle cx="21.1" cy="16.3" r="0.5" fill="white" />
        <ellipse cx="16" cy="21" rx="1.5" ry="1" fill="#1C1B1B" />
      </g>
    </svg>
  )
}

function OctopusMascot({ size, palette }: { size: number; palette: AnimalPalette }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><clipPath id="mc-octopus"><circle cx="16" cy="16" r="16" /></clipPath></defs>
      <circle cx="16" cy="16" r="16" fill={palette.primary} />
      <g clipPath="url(#mc-octopus)">
        <path d="M7 24 Q5 30 7 34" stroke={palette.secondary} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M11 26 Q10 32 12 36" stroke={palette.secondary} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M16 27 Q16 33 16 37" stroke={palette.secondary} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M21 26 Q22 32 20 36" stroke={palette.secondary} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M25 24 Q27 30 25 34" stroke={palette.secondary} strokeWidth="3" strokeLinecap="round" fill="none" />
        <ellipse cx="16" cy="16" rx="12" ry="13" fill={palette.belly} />
        <circle cx="11.5" cy="15" r="3.5" fill="#F5F0FF" />
        <circle cx="20.5" cy="15" r="3.5" fill="#F5F0FF" />
        <circle cx="11.5" cy="15" r="2" fill="#1C1B1B" />
        <circle cx="20.5" cy="15" r="2" fill="#1C1B1B" />
        <circle cx="12.2" cy="14.2" r="0.7" fill="white" />
        <circle cx="21.2" cy="14.2" r="0.7" fill="white" />
        <path d="M13 19.5 Q16 22 19 19.5" stroke={palette.secondary} strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}
