// **Actuaria Online's lexicon** — every in-world word, and the plain app term
// it stands for (docs/actuaria-online.md §3).
//
// Actuaria is a skin over systems the app already has, so almost every word a
// player reads in it is a new name for something Study Mode already shows: a
// *sector* is an exam, a *landmark* is a concept, *Credibility* is the mastery
// ladder and the readiness score, *Coverage* is the streak. This module is the
// one place those names live, so a screen never invents a word the next screen
// doesn't use, and the plain term is always at hand for the tooltip that names
// it the first time it appears on a screen (`components/actuaria/Term.tsx`).
//
// In-world words appear only on Actuaria routes. Study Mode and plain `/battle`
// keep their own words — the Actuaria skin of the Battle page reads its labels
// from `BATTLE_WORDS` below, and the plain skin from the page itself.

export interface LexiconEntry {
  /** The in-world word, as a screen prints it. */
  term: string
  /** The plain app term it stands for — the tooltip / `aria-description`. */
  plain: string
  /**
   * The plain meaning in a few words, printed beside the term the first time
   * it appears on a screen (`components/actuaria/Term.tsx`), so a phone, which
   * shows no tooltip, still says what the word means.
   */
  gloss: string
}

export const LEXICON = {
  actuaria: { term: 'Actuaria', plain: 'The game world of Actuarial Notes', gloss: 'study game' },
  sector: { term: 'Sector', plain: 'An exam', gloss: 'exam' },
  region: { term: 'Region', plain: 'A learning objective of the exam', gloss: 'learning objectives' },
  landmark: { term: 'Landmark', plain: 'A concept', gloss: 'concepts' },
  landmarkCredibility: {
    term: 'Credibility',
    plain: 'The concept’s level: 0 when New or Forgotten, 0.33 at Level 1, 0.67 at Level 2, 1.00 at Level 3',
    gloss: 'concept level',
  },
  sectorCredibility: { term: 'Credibility', plain: 'Exam readiness, as a fraction of 1', gloss: 'exam readiness' },
  orbitalDecay: { term: 'Orbital decay', plain: 'A concept not reviewed in time steps down a level', gloss: 'concepts losing a level' },
  uncharted: { term: 'Uncharted sector', plain: 'An exam you aren’t studying yet', gloss: 'exam you aren’t studying' },
  gems: { term: 'Gems', plain: 'Gems', gloss: 'gems' },
  coverage: { term: 'Coverage', plain: 'Your daily streak', gloss: 'daily streak' },
  graceDay: { term: 'Grace day', plain: 'A streak freeze', gloss: 'streak freezes' },
  lapse: { term: 'Lapse', plain: 'A broken streak', gloss: 'broken streak' },
  transmission: {
    term: 'Daily Transmission',
    plain: 'A three-question review quiz of the concepts closest to decaying',
    gloss: '3-question review',
  },
  station: { term: 'Monte Carlo Station', plain: 'Quiz Battle', gloss: 'Quiz Battle' },
  duel: { term: 'Duel', plain: 'A Quiz Battle', gloss: 'Quiz Battle' },
  openChannel: { term: 'Open channel', plain: 'Random opponent', gloss: 'random opponent' },
  privateChannel: { term: 'Private channel', plain: 'A friend online', gloss: 'a friend online' },
  dogfight: { term: 'Dogfight', plain: 'Same screen', gloss: 'same screen' },
  surplus: { term: 'Surplus', plain: 'Battle points', gloss: 'battle points' },
  claim: { term: 'Claim', plain: 'A penalty', gloss: 'penalty' },
  claimsReview: { term: 'Claims review', plain: 'A quiz of the questions you got wrong', gloss: 'review my misses' },
  boss: { term: 'Gambler’s Ruin', plain: 'The weekly raid boss', gloss: 'weekly raid boss' },
  cohort: { term: 'Cohort', plain: 'A study group for one exam sitting', gloss: 'study group' },
  riskPool: { term: 'Risk pool', plain: 'The cohort’s gem bonus on a day most members study', gloss: 'group gem bonus' },
  guide: { term: 'Guide', plain: 'A member who has passed this exam', gloss: 'members who passed' },
  largeNumbers: { term: 'Large Numbers', plain: 'The leaderboard', gloss: 'leaderboard' },
  hangar: { term: 'Hangar', plain: 'Your abilities and ship cosmetics', gloss: 'abilities and ship' },
  ability: { term: 'Ability', plain: 'A once-per-battle power-up', gloss: 'battle power-ups' },
  simulation: { term: 'Simulation', plain: 'A timed Practice Exam', gloss: 'Practice Exam' },
} as const satisfies Record<string, LexiconEntry>

export type LexiconId = keyof typeof LEXICON

/** The in-world word for `id`. */
export function term(id: LexiconId): string {
  return LEXICON[id].term
}

/** The plain app term behind `id`. */
export function plainTerm(id: LexiconId): string {
  return LEXICON[id].plain
}

/**
 * An exam key as a sector's name — `CAS-5` is *Sector 5*, `MAS-I` *Sector
 * MAS-I*: the name the candidate says, the way the exam logo cuts it
 * (`lib/examLogo.ts`).
 */
export function sectorName(examKey: string): string {
  return `${term('sector')} ${examKey.replace(/^CAS-/, '')}`
}

// ── Monte Carlo Station ─────────────────────────────────────────────────────

/**
 * The Battle page's words under the Actuaria skin (§6.8). Each way in carries
 * its plain name as its description, so a player who knows Quiz Battle knows
 * which door is which.
 */
export const BATTLE_WORDS = {
  title: LEXICON.station.term,
  lobby: LEXICON.openChannel.term,
  lobbyPlain: LEXICON.openChannel.plain,
  friend: LEXICON.privateChannel.term,
  friendPlain: LEXICON.privateChannel.plain,
  local: LEXICON.dogfight.term,
  localPlain: LEXICON.dogfight.plain,
  score: LEXICON.surplus.term,
  claim: LEXICON.claim.term,
  claimsReview: LEXICON.claimsReview.term,
  exit: 'Exit to map',
} as const

/**
 * The station's live count — the real number of players in the matchmaking
 * lobby, from an observer session (§6.1). `short` drops the station's name for
 * a label that already sits under it on the map. Null is a count not yet known.
 */
export function stationCountLine(count: number | null, short = false): string {
  const station = LEXICON.station.term
  if (count === null) return short ? 'Tuning in…' : `Tuning in to ${station}…`
  if (count === 0) return short ? 'Quiet right now' : `${station} is quiet right now`
  const pilots = `${count} ${count === 1 ? 'pilot' : 'pilots'} waiting`
  return short ? pilots : `${pilots} at ${station}`
}
