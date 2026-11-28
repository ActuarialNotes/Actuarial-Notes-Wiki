import { useRef } from 'react'
import { getAnimalPalette } from '@/lib/cosmetics'
import { parseAvatarUrl } from '@/lib/avatar'
import { AnimalIcon } from '@/components/AnimalIcon'

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
    const palette = getAnimalPalette(parsed.value, parsed.variant)
    return (
      <span
        className={className}
        style={{ display: 'inline-flex', width: size, height: size, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}
      >
        <AnimalIcon animal={parsed.value} palette={palette} size={size} />
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
