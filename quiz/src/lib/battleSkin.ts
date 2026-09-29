// **Battle skins** — the words and the few pieces of chrome that differ between
// Quiz Battle on its own page (`/battle`) and Monte Carlo Station, the same page
// under Actuaria Online's skin (`/actuaria/battle`, docs/actuaria-online.md §6.8).
//
// A skin changes chrome and words, never the game: the reducer, the scoring, the
// sessions, the lobby and its handshake, the sounds, the music and the rule that
// nothing is saved are the same under both. A room's code is its channel's name,
// so the two skins play each other — only the invite link says which page to
// open it on. The battle components read the active skin from context
// (`hooks/useBattleSkin.ts`), so they gain no `if (actuaria)` branches beyond it.

import { BATTLE_WORDS, LEXICON } from './actuaria/lexicon'

export type BattleSkinId = 'plain' | 'actuaria'

/** A way into a battle: its name, and the plain name it stands for under a skin. */
export interface WayWords {
  title: string
  /** Quiz Battle's own name for it, when the skin calls it something else. */
  plain: string | null
}

export interface BattleSkin {
  id: BattleSkinId
  /** The page's title. */
  title: string
  lobby: WayWords
  local: WayWords
  friend: WayWords
  /** The page's own screens: the two setups, the lobby and the join form. */
  screens: { localSetup: string; hostSetup: string; lobby: string; join: string }
  /** A small label over the results' headline, or null. */
  resultsLabel: string | null
  /** Where the way back from the page leads, and what it says. */
  home: { path: string; label: string }
  /** The path an invite link opens a room on. */
  joinBase: string
  /** The results' question-by-question list. */
  review: string
  /** What a penalty is called — the scoring panel's word for a wrong buzz. */
  claim: string
  /** What the join form's hint tells a friend to open. */
  joinHint: string
  /** The share sheet's line, before the room code. */
  invite: string
  /**
   * Offer a private room the *Abilities* setting (docs/actuaria-online.md §7.2).
   * Never in the lobby or on one screen, under any skin.
   */
  abilities: boolean
  /** Where the station's Simulation card leads — a timed practice exam (§6.10) — or null. */
  simulation: string | null
  /** Offer *Review my misses* on the results — a quiz of this player's misses (§6.9). */
  reviewMisses: boolean
  /**
   * Where the scoreboard sticks: under the app header on a phone and at the top
   * on a desktop for Quiz Battle; under the Actuaria HUD row at every width.
   */
  scoreboardTop: string
}

export const PLAIN_SKIN: BattleSkin = {
  id: 'plain',
  title: 'Quiz Battle',
  lobby: { title: 'Random opponent', plain: null },
  local: { title: 'Same screen', plain: null },
  friend: { title: 'A friend, online', plain: null },
  screens: { localSetup: 'Same-screen battle', hostSetup: 'Create a room', lobby: 'Find an opponent', join: 'Join a battle' },
  resultsLabel: null,
  home: { path: '/', label: 'Back' },
  joinBase: '/battle',
  review: 'Question by question',
  claim: 'a wrong buzz',
  joinHint: 'Quiz Battle → Join with a code',
  invite: 'Join my Quiz Battle',
  simulation: null,
  abilities: false,
  reviewMisses: false,
  scoreboardTop: 'top-14 lg:top-0',
}

export const ACTUARIA_SKIN: BattleSkin = {
  id: 'actuaria',
  title: BATTLE_WORDS.title,
  lobby: { title: BATTLE_WORDS.lobby, plain: BATTLE_WORDS.lobbyPlain },
  local: { title: BATTLE_WORDS.local, plain: BATTLE_WORDS.localPlain },
  friend: { title: BATTLE_WORDS.friend, plain: BATTLE_WORDS.friendPlain },
  screens: {
    localSetup: BATTLE_WORDS.local,
    hostSetup: `Open a ${BATTLE_WORDS.friend.toLowerCase()}`,
    lobby: BATTLE_WORDS.lobby,
    join: `Join a ${BATTLE_WORDS.friend.toLowerCase()}`,
  },
  resultsLabel: `${LEXICON.duel.term} complete`,
  home: { path: '/actuaria/map', label: BATTLE_WORDS.exit },
  joinBase: '/actuaria/battle',
  review: LEXICON.claimsReview.term,
  claim: `a ${LEXICON.claim.term.toLowerCase()} — a wrong buzz`,
  joinHint: `${BATTLE_WORDS.title} → ${BATTLE_WORDS.friend} → Join with a code`,
  invite: `Join my duel at ${BATTLE_WORDS.title}`,
  simulation: '/actuaria/simulation',
  abilities: true,
  reviewMisses: true,
  scoreboardTop: 'top-14',
}

export function battleSkin(id: BattleSkinId | undefined): BattleSkin {
  return id === 'actuaria' ? ACTUARIA_SKIN : PLAIN_SKIN
}

/** The link that opens the Battle page straight onto joining a room, on this skin's page. */
export function skinJoinPath(skin: Pick<BattleSkin, 'joinBase'>, code: string): string {
  return `${skin.joinBase}?join=${encodeURIComponent(code)}`
}

/** The ordinary quiz a claims review opens: this player's misses, by id. */
export function claimsReviewPath(questionIds: readonly string[]): string {
  return `/quiz?ids=${questionIds.map(encodeURIComponent).join(',')}`
}
