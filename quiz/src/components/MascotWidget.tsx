import { useCallback, useEffect, useRef, useState } from 'react'
import { parseAvatarUrl, type AnimalType } from '@/components/AvatarDisplay'

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

  const phrases = animalType ? PHRASES[animalType] : DEFAULT_PHRASES
  const [phraseIdx, setPhraseIdx] = useState(() => Math.floor(Math.random() * phrases.length))
  const [visible, setVisible] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const advance = useCallback(() => {
    setVisible(false)
    setTimeout(() => {
      setPhraseIdx(i => (i + 1) % phrases.length)
      setVisible(true)
    }, 250)
  }, [phrases.length])

  // Reset phrase index if avatar/animal changes
  useEffect(() => {
    setPhraseIdx(Math.floor(Math.random() * phrases.length))
    setVisible(true)
  }, [animalType, phrases.length])

  // Auto-cycle
  useEffect(() => {
    timerRef.current = setTimeout(advance, CYCLE_MS)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [phraseIdx, advance])

  const handleClick = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    advance()
  }

  const currentPhrase = phrases[phraseIdx](context)

  // Render the character icon — animal SVG or color/initial circle
  const iconSize = 48
  const icon = (() => {
    if (parsed.type === 'animal') {
      // Re-use the SVG inline rather than importing the component map to
      // avoid a circular dependency; we delegate rendering via AvatarDisplay.
      return null // handled below via AvatarDisplay
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
      aria-label="Mascot — click for a new phrase"
      className="flex items-center gap-3 group outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
    >
      {/* Character icon */}
      <div className="relative shrink-0 transition-transform duration-150 group-active:scale-90">
        {parsed.type === 'animal'
          ? <MascotAnimalIcon animal={parsed.value} size={iconSize} />
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
          <p className="text-xs text-foreground leading-snug">{currentPhrase}</p>
        </div>
      </div>
    </button>
  )
}

// ── Animal icon (avoids importing the whole AvatarDisplay map) ────────────────

// We inline the same SVG components from AvatarDisplay to keep the bubble-icon
// rendering self-contained without a circular module dependency.

function MascotAnimalIcon({ animal, size }: { animal: AnimalType; size: number }) {
  switch (animal) {
    case 'fox':    return <FoxMascot size={size} />
    case 'koala':  return <KoalaMascot size={size} />
    case 'frog':   return <FrogMascot size={size} />
    case 'owl':    return <OwlMascot size={size} />
    case 'wolf':   return <WolfMascot size={size} />
    case 'octopus': return <OctopusMascot size={size} />
  }
}

function FoxMascot({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><clipPath id="mc-fox"><circle cx="16" cy="16" r="16" /></clipPath></defs>
      <circle cx="16" cy="16" r="16" fill="#D9622C" />
      <g clipPath="url(#mc-fox)">
        <polygon points="7,18 4,0 15,10" fill="#D9622C" />
        <polygon points="8,16 6,4 13,10" fill="#F8A07A" />
        <polygon points="25,18 28,0 17,10" fill="#D9622C" />
        <polygon points="24,16 26,4 19,10" fill="#F8A07A" />
        <ellipse cx="16" cy="23" rx="8" ry="6" fill="#F5DEB3" />
        <circle cx="11" cy="17" r="2.8" fill="#1C1B1B" />
        <circle cx="21" cy="17" r="2.8" fill="#1C1B1B" />
        <circle cx="11.9" cy="16.1" r="1" fill="white" />
        <circle cx="21.9" cy="16.1" r="1" fill="white" />
        <ellipse cx="16" cy="22" rx="1.4" ry="1" fill="#1C1B1B" />
      </g>
    </svg>
  )
}

function KoalaMascot({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><clipPath id="mc-koala"><circle cx="16" cy="16" r="16" /></clipPath></defs>
      <circle cx="16" cy="16" r="16" fill="#7A9BB5" />
      <g clipPath="url(#mc-koala)">
        <circle cx="5" cy="10" r="7" fill="#6389A6" />
        <circle cx="5" cy="10" r="4.5" fill="#A8C4D8" />
        <circle cx="27" cy="10" r="7" fill="#6389A6" />
        <circle cx="27" cy="10" r="4.5" fill="#A8C4D8" />
        <circle cx="16" cy="16" r="16" fill="#7A9BB5" />
        <ellipse cx="16" cy="22" rx="7" ry="5" fill="#9DBDD4" />
        <ellipse cx="16" cy="19" rx="3.5" ry="2.5" fill="#2D3A42" />
        <circle cx="11" cy="15" r="2.5" fill="#1C1B1B" />
        <circle cx="21" cy="15" r="2.5" fill="#1C1B1B" />
        <circle cx="11.8" cy="14.2" r="0.9" fill="white" />
        <circle cx="21.8" cy="14.2" r="0.9" fill="white" />
      </g>
    </svg>
  )
}

function FrogMascot({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><clipPath id="mc-frog"><circle cx="16" cy="16" r="16" /></clipPath></defs>
      <circle cx="16" cy="16" r="16" fill="#3E9C6A" />
      <g clipPath="url(#mc-frog)">
        <circle cx="9" cy="10" r="6" fill="#3E9C6A" />
        <circle cx="23" cy="10" r="6" fill="#3E9C6A" />
        <ellipse cx="16" cy="23" rx="9" ry="7" fill="#C8EDD8" />
        <circle cx="9" cy="10" r="4" fill="#F5F5F0" />
        <circle cx="23" cy="10" r="4" fill="#F5F5F0" />
        <circle cx="9" cy="10" r="2.5" fill="#1C1B1B" />
        <circle cx="23" cy="10" r="2.5" fill="#1C1B1B" />
        <circle cx="9.8" cy="9.2" r="0.9" fill="white" />
        <circle cx="23.8" cy="9.2" r="0.9" fill="white" />
        <path d="M11 21 Q16 25 21 21" stroke="#2D7A50" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}

function OwlMascot({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><clipPath id="mc-owl"><circle cx="16" cy="16" r="16" /></clipPath></defs>
      <circle cx="16" cy="16" r="16" fill="#7C5C2E" />
      <g clipPath="url(#mc-owl)">
        <polygon points="10,14 8,2 14,10" fill="#5C3E18" />
        <polygon points="22,14 24,2 18,10" fill="#5C3E18" />
        <ellipse cx="16" cy="20" rx="11" ry="13" fill="#C8A876" />
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

function WolfMascot({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><clipPath id="mc-wolf"><circle cx="16" cy="16" r="16" /></clipPath></defs>
      <circle cx="16" cy="16" r="16" fill="#5B6E8A" />
      <g clipPath="url(#mc-wolf)">
        <polygon points="7,16 4,0 15,9" fill="#5B6E8A" />
        <polygon points="8,14 6,3 13,9" fill="#8AABCC" />
        <polygon points="25,16 28,0 17,9" fill="#5B6E8A" />
        <polygon points="24,14 26,3 19,9" fill="#8AABCC" />
        <ellipse cx="16" cy="22" rx="7" ry="5.5" fill="#8AABCC" />
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

function OctopusMascot({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs><clipPath id="mc-octopus"><circle cx="16" cy="16" r="16" /></clipPath></defs>
      <circle cx="16" cy="16" r="16" fill="#7C3AED" />
      <g clipPath="url(#mc-octopus)">
        <path d="M7 24 Q5 30 7 34" stroke="#6025C0" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M11 26 Q10 32 12 36" stroke="#6025C0" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M16 27 Q16 33 16 37" stroke="#6025C0" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M21 26 Q22 32 20 36" stroke="#6025C0" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M25 24 Q27 30 25 34" stroke="#6025C0" strokeWidth="3" strokeLinecap="round" fill="none" />
        <ellipse cx="16" cy="16" rx="12" ry="13" fill="#9D5FF5" />
        <circle cx="11.5" cy="15" r="3.5" fill="#F5F0FF" />
        <circle cx="20.5" cy="15" r="3.5" fill="#F5F0FF" />
        <circle cx="11.5" cy="15" r="2" fill="#1C1B1B" />
        <circle cx="20.5" cy="15" r="2" fill="#1C1B1B" />
        <circle cx="12.2" cy="14.2" r="0.7" fill="white" />
        <circle cx="21.2" cy="14.2" r="0.7" fill="white" />
        <path d="M13 19.5 Q16 22 19 19.5" stroke="#6025C0" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  )
}
