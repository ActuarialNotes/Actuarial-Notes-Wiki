import { useRef } from 'react'
import { getAnimalPalette, type AnimalPalette } from '@/lib/cosmetics'

// ---- Avatar type system ----

export type AvatarData =
  | { type: 'color'; value: string }
  | { type: 'animal'; value: AnimalType; variant?: string }
  | { type: 'custom'; value: string }
  | { type: 'image'; value: string }

export type AnimalType = 'fox' | 'koala' | 'frog' | 'owl' | 'wolf' | 'octopus'

export const ANIMAL_TYPES: AnimalType[] = ['fox', 'koala', 'frog', 'owl', 'wolf', 'octopus']

export function parseAvatarUrl(url: string): AvatarData {
  if (!url) return { type: 'color', value: '#475569' }
  if (url.startsWith('{')) {
    try {
      const parsed = JSON.parse(url)
      if (parsed.type === 'color') return { type: 'color', value: parsed.value }
      if (parsed.type === 'animal') {
        return {
          type: 'animal',
          value: parsed.value as AnimalType,
          variant: typeof parsed.variant === 'string' ? parsed.variant : undefined,
        }
      }
      if (parsed.type === 'custom') return { type: 'custom', value: parsed.value }
    } catch { /* fall through */ }
  }
  return { type: 'image', value: url }
}

export function serializeAvatar(data: AvatarData): string {
  if (data.type === 'color') return JSON.stringify({ type: 'color', value: data.value })
  if (data.type === 'animal') {
    const payload: { type: 'animal'; value: AnimalType; variant?: string } = { type: 'animal', value: data.value }
    if (data.variant) payload.variant = data.variant
    return JSON.stringify(payload)
  }
  if (data.type === 'custom') return JSON.stringify({ type: 'custom', value: data.value })
  return data.value
}

// ---- Animal SVG illustrations ----

function FoxSvg({ size, palette }: { size: number; palette: AnimalPalette }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <clipPath id="av-clip-fox">
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <circle cx="16" cy="16" r="16" fill={palette.primary} />
      <g clipPath="url(#av-clip-fox)">
        {/* Left ear */}
        <polygon points="7,18 4,0 15,10" fill={palette.primary} />
        <polygon points="8,16 6,4 13,10" fill={palette.secondary} />
        {/* Right ear */}
        <polygon points="25,18 28,0 17,10" fill={palette.primary} />
        <polygon points="24,16 26,4 19,10" fill={palette.secondary} />
        {/* Muzzle */}
        <ellipse cx="16" cy="23" rx="8" ry="6" fill={palette.belly} />
        {/* Eyes */}
        <circle cx="11" cy="17" r="2.8" fill="#1C1B1B" />
        <circle cx="21" cy="17" r="2.8" fill="#1C1B1B" />
        <circle cx="11.9" cy="16.1" r="1" fill="white" />
        <circle cx="21.9" cy="16.1" r="1" fill="white" />
        {/* Nose */}
        <ellipse cx="16" cy="22" rx="1.4" ry="1" fill="#1C1B1B" />
      </g>
    </svg>
  )
}

function KoalaSvg({ size, palette }: { size: number; palette: AnimalPalette }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <clipPath id="av-clip-koala">
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <circle cx="16" cy="16" r="16" fill={palette.primary} />
      <g clipPath="url(#av-clip-koala)">
        {/* Left ear */}
        <circle cx="5" cy="10" r="7" fill={palette.secondary} />
        <circle cx="5" cy="10" r="4.5" fill={palette.belly} />
        {/* Right ear */}
        <circle cx="27" cy="10" r="7" fill={palette.secondary} />
        <circle cx="27" cy="10" r="4.5" fill={palette.belly} />
        {/* Face */}
        <circle cx="16" cy="16" r="16" fill={palette.primary} />
        {/* Muzzle */}
        <ellipse cx="16" cy="22" rx="7" ry="5" fill={palette.belly} />
        {/* Nose */}
        <ellipse cx="16" cy="19" rx="3.5" ry="2.5" fill="#2D3A42" />
        {/* Eyes */}
        <circle cx="11" cy="15" r="2.5" fill="#1C1B1B" />
        <circle cx="21" cy="15" r="2.5" fill="#1C1B1B" />
        <circle cx="11.8" cy="14.2" r="0.9" fill="white" />
        <circle cx="21.8" cy="14.2" r="0.9" fill="white" />
      </g>
    </svg>
  )
}

function FrogSvg({ size, palette }: { size: number; palette: AnimalPalette }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <clipPath id="av-clip-frog">
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <circle cx="16" cy="16" r="16" fill={palette.primary} />
      <g clipPath="url(#av-clip-frog)">
        {/* Eye bumps at top */}
        <circle cx="9" cy="10" r="6" fill={palette.primary} />
        <circle cx="23" cy="10" r="6" fill={palette.primary} />
        {/* White belly */}
        <ellipse cx="16" cy="23" rx="9" ry="7" fill={palette.belly} />
        {/* Eyes */}
        <circle cx="9" cy="10" r="4" fill="#F5F5F0" />
        <circle cx="23" cy="10" r="4" fill="#F5F5F0" />
        <circle cx="9" cy="10" r="2.5" fill="#1C1B1B" />
        <circle cx="23" cy="10" r="2.5" fill="#1C1B1B" />
        <circle cx="9.8" cy="9.2" r="0.9" fill="white" />
        <circle cx="23.8" cy="9.2" r="0.9" fill="white" />
        {/* Smile */}
        <path d="M11 21 Q16 25 21 21" stroke={palette.secondary} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}

function OwlSvg({ size, palette }: { size: number; palette: AnimalPalette }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <clipPath id="av-clip-owl">
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <circle cx="16" cy="16" r="16" fill={palette.primary} />
      <g clipPath="url(#av-clip-owl)">
        {/* Ear tufts */}
        <polygon points="10,14 8,2 14,10" fill={palette.secondary} />
        <polygon points="22,14 24,2 18,10" fill={palette.secondary} />
        {/* Face disc */}
        <ellipse cx="16" cy="20" rx="11" ry="13" fill={palette.belly} />
        {/* Large eyes */}
        <circle cx="11" cy="17" r="4.5" fill="#F5F0E8" />
        <circle cx="21" cy="17" r="4.5" fill="#F5F0E8" />
        <circle cx="11" cy="17" r="2.8" fill="#1C1B1B" />
        <circle cx="21" cy="17" r="2.8" fill="#1C1B1B" />
        {/* Iris gold */}
        <circle cx="11" cy="17" r="1.5" fill="#D4A017" />
        <circle cx="21" cy="17" r="1.5" fill="#D4A017" />
        <circle cx="11" cy="17" r="0.7" fill="#1C1B1B" />
        <circle cx="21" cy="17" r="0.7" fill="#1C1B1B" />
        <circle cx="11.6" cy="16.3" r="0.5" fill="white" />
        <circle cx="21.6" cy="16.3" r="0.5" fill="white" />
        {/* Beak */}
        <polygon points="16,19 14,22 18,22" fill="#D4881A" />
      </g>
    </svg>
  )
}

function WolfSvg({ size, palette }: { size: number; palette: AnimalPalette }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <clipPath id="av-clip-wolf">
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <circle cx="16" cy="16" r="16" fill={palette.primary} />
      <g clipPath="url(#av-clip-wolf)">
        {/* Left ear */}
        <polygon points="7,16 4,0 15,9" fill={palette.primary} />
        <polygon points="8,14 6,3 13,9" fill={palette.secondary} />
        {/* Right ear */}
        <polygon points="25,16 28,0 17,9" fill={palette.primary} />
        <polygon points="24,14 26,3 19,9" fill={palette.secondary} />
        {/* Muzzle */}
        <ellipse cx="16" cy="22" rx="7" ry="5.5" fill={palette.belly} />
        {/* Eyes */}
        <circle cx="11.5" cy="17" r="2.8" fill="#1C1B1B" />
        <circle cx="20.5" cy="17" r="2.8" fill="#1C1B1B" />
        {/* Amber iris */}
        <circle cx="11.5" cy="17" r="1.6" fill="#C9831A" />
        <circle cx="20.5" cy="17" r="1.6" fill="#C9831A" />
        <circle cx="11.5" cy="17" r="0.8" fill="#1C1B1B" />
        <circle cx="20.5" cy="17" r="0.8" fill="#1C1B1B" />
        <circle cx="12.1" cy="16.3" r="0.5" fill="white" />
        <circle cx="21.1" cy="16.3" r="0.5" fill="white" />
        {/* Nose */}
        <ellipse cx="16" cy="21" rx="1.5" ry="1" fill="#1C1B1B" />
      </g>
    </svg>
  )
}

function OctopusSvg({ size, palette }: { size: number; palette: AnimalPalette }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <clipPath id="av-clip-octopus">
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <circle cx="16" cy="16" r="16" fill={palette.primary} />
      <g clipPath="url(#av-clip-octopus)">
        {/* Tentacles */}
        <path d="M7 24 Q5 30 7 34" stroke={palette.secondary} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M11 26 Q10 32 12 36" stroke={palette.secondary} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M16 27 Q16 33 16 37" stroke={palette.secondary} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M21 26 Q22 32 20 36" stroke={palette.secondary} strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M25 24 Q27 30 25 34" stroke={palette.secondary} strokeWidth="3" strokeLinecap="round" fill="none" />
        {/* Body */}
        <ellipse cx="16" cy="16" rx="12" ry="13" fill={palette.belly} />
        {/* Eyes */}
        <circle cx="11.5" cy="15" r="3.5" fill="#F5F0FF" />
        <circle cx="20.5" cy="15" r="3.5" fill="#F5F0FF" />
        <circle cx="11.5" cy="15" r="2" fill="#1C1B1B" />
        <circle cx="20.5" cy="15" r="2" fill="#1C1B1B" />
        <circle cx="12.2" cy="14.2" r="0.7" fill="white" />
        <circle cx="21.2" cy="14.2" r="0.7" fill="white" />
        {/* Smile */}
        <path d="M13 19.5 Q16 22 19 19.5" stroke={palette.secondary} strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}

const ANIMAL_SVGS: Record<AnimalType, React.FC<{ size: number; palette: AnimalPalette }>> = {
  fox: FoxSvg,
  koala: KoalaSvg,
  frog: FrogSvg,
  owl: OwlSvg,
  wolf: WolfSvg,
  octopus: OctopusSvg,
}

export const ANIMAL_LABELS: Record<AnimalType, string> = {
  fox: 'Fox',
  koala: 'Koala',
  frog: 'Frog',
  owl: 'Owl',
  wolf: 'Wolf',
  octopus: 'Octopus',
}

// ---- Shared AvatarDisplay component ----

interface AvatarDisplayProps {
  avatarUrl: string
  initials: string
  size?: number
  className?: string
}

export function AvatarDisplay({ avatarUrl, initials, size = 32, className }: AvatarDisplayProps) {
  const parsed = parseAvatarUrl(avatarUrl)

  if (parsed.type === 'animal') {
    const AnimalSvg = ANIMAL_SVGS[parsed.value]
    const palette = getAnimalPalette(parsed.value, parsed.variant)
    return (
      <span
        className={className}
        style={{ display: 'inline-flex', width: size, height: size, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}
      >
        <AnimalSvg size={size} palette={palette} />
      </span>
    )
  }

  if (parsed.type === 'image' || parsed.type === 'custom') {
    return (
      <img
        src={parsed.value}
        alt="Avatar"
        className={className}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
    )
  }

  // color
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: parsed.value,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 600,
        fontSize: Math.round(size * 0.35),
        flexShrink: 0,
      }}
    >
      {initials}
    </span>
  )
}

// ---- Upload button component ----

interface AvatarUploadProps {
  onUpload: (file: File) => Promise<void>
  uploading: boolean
  size?: number
}

export function AvatarUploadButton({ onUpload, uploading, size = 28 }: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    await onUpload(file)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="sr-only"
        onChange={handleChange}
        aria-label="Upload custom avatar"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        title="Upload your own image"
        style={{ width: size, height: size }}
        className="rounded-full border-2 border-dashed border-muted-foreground/40 hover:border-foreground/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-muted/30 hover:bg-muted/60"
      >
        {uploading ? (
          <svg className="animate-spin" width={size * 0.5} height={size * 0.5} viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="28" strokeDashoffset="10" />
          </svg>
        ) : (
          <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </>
  )
}
