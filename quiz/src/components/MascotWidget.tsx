import { useCallback, useEffect, useRef, useState } from 'react'
import { parseAvatarUrl, type AnimalType, ANIMAL_LABELS } from '@/components/AvatarDisplay'
import { getAnimalPalette, getCosmetic, type AnimalPalette } from '@/lib/cosmetics'

// ── Per-character phrase lists ────────────────────────────────────────────────

type PhraseContext = {
  daysRemaining?: number | null
  topicsMastered?: number
  totalTopics?: number
}

type PhraseFn = (ctx: PhraseContext) => string

function days(ctx: PhraseContext) {
  return ctx.daysRemaining != null ? `${ctx.daysRemaining}` : 'a few'
}

const PHRASES: Record<AnimalType, PhraseFn[]> = {
  fox: [
    ctx => `${days(ctx)} days? I've hunted prey with worse odds.`,
    () => 'A fox always knows the answer. Probably.',
    () => 'Outsmart the exam. It\'s what we do.',
    ctx => ctx.topicsMastered ? `${ctx.topicsMastered} topics mastered? Clever.` : 'Stay sharp. Always.',
    () => 'The sly finish first. That\'s you.',
  ],
  koala: [
    () => 'No rush. Eucalyptus first, probability second.',
    () => 'You\'re doing great. I\'d high five you but I\'m very tired.',
    () => 'Sleep on it. Literally.',
    ctx => `${days(ctx)} days left. Plenty of time for a nap or two.`,
    () => 'Slow and steady passes the exam.',
  ],
  frog: [
    () => 'RIBBIT means you passed in frog. Probably.',
    () => 'Flies AND probability theory? Today\'s wild.',
    () => 'Jump to the next topic!! JUMP!!',
    ctx => `${days(ctx)} days?! WE ARE THRIVING!!`,
    () => 'Every correct answer is a lily pad forward!',
  ],
  owl: [
    () => 'Statistically speaking, you will succeed.',
    () => 'I\'ve read every actuarial textbook. You should too.',
    () => 'Wisdom is just flashcards you didn\'t lose.',
    ctx => ctx.totalTopics ? `${ctx.totalTopics} topics in the syllabus. I\'ve memorized them all.` : 'Knowledge is power. Obviously.',
    ctx => `${days(ctx)} days of preparation. Optimal.`,
  ],
  wolf: [
    () => 'THE PACK DOESN\'T QUIT.',
    ctx => `${days(ctx)} days. Run.`,
    () => 'You didn\'t come this far to only come this far.',
    () => 'Every session makes the pack stronger.',
    ctx => ctx.topicsMastered ? `${ctx.topicsMastered} concepts conquered. Keep hunting.` : 'Hunt every concept down.',
  ],
  octopus: [
    () => 'I\'m holding 8 concepts at once. You can hold 2.',
    () => 'Did you know ink helps you think? I made that up.',
    () => 'Three arms studying, two arms snacking, three arms rooting for you.',
    ctx => `${days(ctx)} days?! My ink is literally vibrating with excitement.`,
    () => 'Tentacles crossed for your success!!',
  ],
}

const DEFAULT_PHRASES: PhraseFn[] = [
  () => 'Keep studying! You\'ve got this.',
  ctx => `${days(ctx)} days to go — stay focused!`,
  () => 'Every session counts.',
]

const VARIANT_PHRASES: Partial<Record<string, PhraseFn[]>> = {
  'fox:crimson': [
    () => 'Red Fox energy: fast, fierce, unstoppable.',
    ctx => `${days(ctx)} days? This Red Fox doesn\'t miss.`,
    () => 'The crimson flash always arrives first.',
    ctx => ctx.topicsMastered ? `${ctx.topicsMastered} topics? Red Foxes count in kills.` : 'Red Fox sharpens every edge.',
    () => 'Bold color, bolder results.',
  ],
  'fox:arctic': [
    () => 'Arctic Fox: thrives where others freeze.',
    () => 'Cold climate, cool head. That\'s the Arctic way.',
    ctx => `${days(ctx)} days. The tundra taught patience.`,
    () => 'White as snow, sharp as ice.',
    () => 'Even in a blizzard, the Arctic Fox finds the path.',
  ],
  'koala:rose': [
    () => 'Northern Koalas take it slow. So can you.',
    () => 'Warm tones, warm brain. Study time.',
    ctx => `${days(ctx)} days? A Northern Koala naps between every study session. Take notes.`,
    () => 'Brown and steady wins the race.',
    () => 'The actuarial path is just a very long tree branch.',
  ],
  'koala:slate': [
    () => 'White Koala, rare mind. That\'s you.',
    () => 'In a forest of students, be the White Koala.',
    ctx => `${days(ctx)} days left. Even rare koalas take naps.`,
    () => 'Mastery is just eucalyptus you\'ve already chewed.',
    () => 'Elegantly calm. Devastatingly prepared.',
  ],
  'frog:azure': [
    () => 'Dart Frog: small, brilliant, and slightly toxic to exams.',
    () => 'Blue is the color of probability distributions too.',
    ctx => `${days(ctx)} days?! DART FROGGING THROUGH THE SYLLABUS!!`,
    () => 'Tiny but unmatched. That\'s the Dart Frog way.',
    () => 'Vibrant mind, vivid results.',
  ],
  'frog:tropical': [
    () => 'Tomato Frog: red-hot and ready.',
    () => 'Hot take: you\'re passing this exam.',
    ctx => `${days(ctx)} days?! TROPICAL ENERGY ACTIVATED!!`,
    () => 'Ripe, ready, and absolutely thriving.',
    () => 'Every session is a tropical storm of knowledge.',
  ],
  'owl:emerald': [
    () => 'Barn Owls hunt in silence. So do high scorers.',
    () => 'Golden eyes, golden formulas.',
    ctx => `${days(ctx)} days. The Barn Owl watches, waits, then aces.`,
    ctx => ctx.totalTopics ? `${ctx.totalTopics} items in the syllabus. Catalogued.` : 'The barn is full of knowledge.',
    () => 'Wisdom with a warm glow. That\'s you.',
  ],
  'owl:snowy': [
    () => 'Snowy Owl: rare, wise, and impossible to ignore.',
    () => 'The tundra has no distractions. Neither should your study session.',
    ctx => `${days(ctx)} days. Pure white clarity.`,
    () => 'Impossibly rare. Inevitably prepared.',
    () => 'Silence is the Snowy Owl\'s study playlist.',
  ],
  'wolf:shadow': [
    () => 'Timber Wolf: the classic. The unstoppable.',
    () => 'The Timber Wolf howls at passing marks.',
    ctx => `${days(ctx)} days. The forest trembles.`,
    ctx => ctx.topicsMastered ? `${ctx.topicsMastered} concepts tracked by the pack.` : 'Track every concept down.',
    () => 'Grey, grounded, relentless.',
  ],
  'wolf:ivory': [
    () => 'Arctic Wolf: rare as a perfect score.',
    () => 'The ivory pack runs further than the rest.',
    ctx => `${days(ctx)} days. The Arctic Wolf endures.`,
    () => 'White as snow, unstoppable as winter.',
    () => 'Those who wear white shine brightest on exam day.',
  ],
  'octopus:coral': [
    () => 'Giant Pacific: the biggest brain in the ocean.',
    () => 'Eight arms of actuarial knowledge.',
    ctx => `${days(ctx)} days?! The Giant Pacific is already ten steps ahead.`,
    () => 'Deep red, deep thinker.',
    () => 'You don\'t need to be fast — you need to be right.',
  ],
  'octopus:abyss': [
    () => 'Blue-ringed: tiny, terrifying, and extremely well-read.',
    () => 'Gold rings mean danger. Gold rings mean you\'ve mastered this.',
    ctx => `${days(ctx)} days?! My ink is literally glowing.`,
    () => 'The most dangerous octopus studied actuarial science.',
    () => 'Small but precise. Every tentacle knows its formula.',
  ],
}

// ── MascotWidget ──────────────────────────────────────────────────────────────

interface MascotWidgetProps {
  avatarUrl: string
  initials: string
  context?: PhraseContext
}

const CYCLE_MS = 7000

export function MascotWidget({ avatarUrl, initials, context = {} }: MascotWidgetProps) {
  const parsed = parseAvatarUrl(avatarUrl)
  const animalType = parsed.type === 'animal' ? parsed.value : null
  const variant = parsed.type === 'animal' ? parsed.variant : undefined
  const variantId = animalType && variant ? `${animalType}:${variant}` : null

  const phrases: PhraseFn[] =
    (variantId ? VARIANT_PHRASES[variantId] : undefined) ??
    (animalType ? (PHRASES as Record<string, PhraseFn[] | undefined>)[animalType] : undefined) ??
    DEFAULT_PHRASES

  const [phraseIdx, setPhraseIdx] = useState(() => Math.floor(Math.random() * phrases.length))
  const [visible, setVisible] = useState(true)
  const [showName, setShowName] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nameTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = useCallback(() => {
    setVisible(false)
    setTimeout(() => {
      setPhraseIdx(i => (i + 1) % phrases.length)
      setVisible(true)
    }, 250)
  }, [phrases.length])

  // Reset phrase index and name state if avatar/variant changes
  useEffect(() => {
    setPhraseIdx(Math.floor(Math.random() * phrases.length))
    setShowName(false)
    setVisible(true)
  }, [animalType, variantId, phrases.length])

  // Auto-cycle (paused while showing name)
  useEffect(() => {
    if (showName) return
    timerRef.current = setTimeout(advance, CYCLE_MS)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [phraseIdx, advance, showName])

  const handleClick = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    if (nameTimerRef.current) clearTimeout(nameTimerRef.current)
    setVisible(false)
    setTimeout(() => {
      setShowName(true)
      setVisible(true)
    }, 250)
    nameTimerRef.current = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        setShowName(false)
        setVisible(true)
      }, 250)
    }, 2500)
  }

  const skinName = (() => {
    if (!animalType) return ''
    if (variantId) return getCosmetic(variantId)?.variantName ?? ANIMAL_LABELS[animalType]
    return ANIMAL_LABELS[animalType]
  })()

  const safeIdx = phraseIdx < phrases.length ? phraseIdx : 0
  const currentPhrase = (phrases[safeIdx] ?? phrases[0])?.(context) ?? ''
  const displayText = showName ? skinName : currentPhrase

  // Render the character icon — animal SVG or color/initial circle
  const iconSize = 48
  const icon = (() => {
    if (parsed.type === 'animal') {
      return null // handled below via MascotAnimalIcon
    }
    if (parsed.type === 'image' || parsed.type === 'custom') {
      return (
        <img
          src={parsed.value}
          alt="Mascot"
          style={{ width: iconSize, height: iconSize, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
        />
      )
    }
    // color
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
    <button
      type="button"
      onClick={handleClick}
      aria-label="Mascot — click to see name"
      className="flex items-center gap-3 group outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
    >
      {/* Character icon */}
      <div className="relative shrink-0 transition-transform duration-150 group-active:scale-90">
        {parsed.type === 'animal'
          ? <MascotAnimalIcon animal={parsed.value} variant={variant} size={iconSize} />
          : icon}
      </div>

      {/* Speech bubble */}
      <div className="relative flex items-center">
        {/* Tail pointing left */}
        <div
          className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0"
          style={{
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderRight: '8px solid',
            borderRightColor: 'hsl(var(--card))',
            filter: 'drop-shadow(-1px 0 0 hsl(var(--border)))',
          }}
        />
        <div
          className="rounded-2xl border bg-card px-3 py-2 shadow-sm max-w-[220px] text-left"
          style={{
            transition: 'opacity 250ms ease, transform 250ms ease',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0) scale(1)' : 'translateY(4px) scale(0.97)',
          }}
        >
          <p className={`text-xs leading-snug ${showName ? 'text-muted-foreground font-medium' : 'text-foreground'}`}>
            {displayText}
          </p>
        </div>
      </div>
    </button>
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
