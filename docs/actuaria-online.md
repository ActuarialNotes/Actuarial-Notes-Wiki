# Actuaria Online — implementation spec

> **For Claude Code.** This is the build spec for *Actuaria Online*, the sci-fi MMO layer of
> Actuarial Notes. Save it as `docs/actuaria-online.md`. Read `CLAUDE.md` first, then the
> docs listed in §2. Build it phase by phase (§9), one PR per milestone, each behind the
> `ACTUARIA_ENABLED` flag. When this spec and the design canvas disagree, **this spec wins**
> (§11 lists every known difference). Where a decision is still Jordan's to make, §10 gives
> the default to build with; don't block on it.
>
> **Revision 2 · 2026-09-29 · against `main` @ `4337677`.** Quiz Battle (`docs/quiz-battle.md`,
> PRs #1525 and #1528) landed after revision 1, and this revision rebuilds the battle half
> of the spec on it: Actuaria's Battle *is* Quiz Battle, re-skinned and extended, not a
> second engine. The changelog is at the end.

---

## 1. What Actuaria is

Actuaria Online turns the study app into a place players go. Each **exam is a sector** of a
star system, each **concept is a landmark** in that sector, and players raise their
**Credibility** by studying, battling other candidates and fighting weekly bosses together.

It is a **skin and a social layer over systems the app already has**, not a second game.
Almost every number a player sees in Actuaria already exists under another name (§3):

- Credibility is the mastery ladder and the readiness score.
- Coverage is the streak.
- Rewards are gems and XP.
- Battle is Quiz Battle, including its matchmaking lobby, soundtrack and results.

The genuinely new pieces are:

- the in-world screens (title, star map, sector, Daily Transmission, Hangar);
- **abilities** (Quiz Battle power-ups unlocked by mastering keystone concepts);
- **Cohorts** and **raids**.

Tagline (from the site's hero direction): *Pass actuarial exams like it's a game.*

---

## 2. Ground rules (non-negotiable)

These come from the repo's existing design docs. Actuaria must not break any of them.

| # | Rule | Source |
|---|---|---|
| G1 | **One mastery ladder.** Credibility is a *reading* of mastery state through `resolveConceptState` (`lib/conceptMatch.ts`, with decay applied at read time). No second per-concept score, no second decay clock. | `docs/concept-learning-progression.md` |
| G2 | **One readiness number.** A sector's Credibility is `computeExamReadiness(...).overallPct / 100`. Never print `computeReadiness().overallPct` on its own, and do not ship a second "pass probability" (D2). | `docs/exam-readiness.md` |
| G3 | **One currency, one streak, one XP.** Study rewards pay **gems** via `award_gems` and XP via `recordXp`/`recordLeagueXp`. "Coverage" *is* the streak (`lib/streak.ts`), and a "grace day" *is* a streak freeze. | `CLAUDE.md` gamification section |
| G4 | **One battle engine.** Every Actuaria battle runs `battleReducer` (`lib/battle.ts`) and the Quiz Battle sessions, transport and lobby. Extend them (a new event, a new setting), never fork them. Its rules hold: **nothing a battle does is saved** (no mastery, XP, streak, quests or attempts), **the host is the one truth**, **every message is untrusted and parsed field by field**, and **only click-markable multiple choice is raced** (`isBattleQuestion`). | `docs/quiz-battle.md` |
| G5 | **Exam hues come from `examAccentStyle(examKey)`.** Never hard-code an exam hex. Sector tiles use `--exam-accent-vivid`; selected states use `--exam-accent-soft` + `--exam-accent-muted`. | `docs/style-guide.md` §2.3 |
| G6 | **Player colours are Quiz Battle's.** Sky and fuchsia (`playerAccentStyle`) mean *who*, only inside a battle, and are never a verdict. Actuaria adds nothing to a player's tile, buzzer, pad or score, and the Actuaria signal colour (§4.2) never appears on them. | `docs/style-guide.md` §2.3 *Player colours* |
| G7 | **Tokens, not hexes.** Surfaces, text and borders use `bg-background`, `bg-card`, `border-border`, `text-muted-foreground` and so on. The canvas hexes are *reference renders* of those tokens in dark mode. | `docs/style-guide.md` §2.1 |
| G8 | **Semantic state colours keep their meaning.** Green = correct/mastered (Credibility bars use `masteryFill`, gold for keystones), red = incorrect, amber = at risk/decaying, orange = streak, foil = earned. | `docs/style-guide.md` §4 |
| G9 | **The game never gates study content.** Locked sectors, landmarks and abilities are presentation only. Every concept, question and guide stays reachable exactly as in Study Mode. | new |
| G10 | **Stored cross-user state is server-authoritative.** Anything *stored* that another player can see (cohorts, raids, a future rating) is written only through `SECURITY DEFINER` RPCs, as leagues are, and is opt-in with delete-on-leave privacy. Ephemeral battle rooms stay host-authoritative broadcast, as Quiz Battle does. | `docs/leagues.md`, `docs/quiz-battle.md` |
| G11 | **Pure core + tests.** Every rule in §7 lives in a pure module with vitest tests beside it, including the worked examples in this doc as fixtures. Battle extensions go in `lib/battle.ts` / `lib/battleRoom.ts` and their existing test files. Server SQL that duplicates a formula carries leagues' duplication-contract note. | repo convention |
| G12 | **Sound and motion follow the house rules.** Reuse Quiz Battle's cues and soundtrack; a new cue is written to `docs/sound-design.md`'s rules (one key, round and short, mistakes silent). Every animation respects `prefers-reduced-motion`. | `docs/sound-design.md`, `docs/style-guide.md` §9 |

Read before starting: `CLAUDE.md`, **`docs/quiz-battle.md`**, `docs/style-guide.md`,
`docs/concept-learning-progression.md`, `docs/exam-readiness.md`, `docs/keystone-concepts.md`,
`docs/leagues.md`, `docs/sound-design.md`, `docs/mock-exam-browser.md`,
`docs/study-plan-generation.md`.

---

## 3. The lexicon — in-world term ↔ app system

In-world names appear **only on Actuaria routes**. Study Mode and plain `/battle` keep their
own words. Every in-world term has a tooltip or `aria-description` naming the plain app term
the first time it appears on a screen. Implement this table as `lib/actuaria/lexicon.ts`, the
single source for labels. The Actuaria skin of the Battle page (§6.8) reads its words from here.

| In-world | What it is in the app | Code / data |
|---|---|---|
| **Actuaria** | The game world (feature) | `ACTUARIA_ENABLED`, routes `/actuaria/*` |
| **Sector** | An exam | exam_progress key (`P`, `FM`, `CAS-5`, …), `examAccentStyle` |
| **Region** | A learning objective of that exam | syllabus sections from the exam page parser |
| **Landmark** | A concept | concept slug; keystones get authored in-world names (§6.4) |
| **Credibility (Z)** — landmark | Concept credit: 0 / 0.33 / 0.67 / 1.00 for New-or-Forgotten / L1 / L2 / L3 | `resolveConceptState` |
| **Credibility (Z)** — sector | Exam readiness ÷ 100 | `computeExamReadiness().overallPct` |
| **Orbital decay** | Mastery decay (L3→L2 after 30 d, L2→L1 after 14 more, L1→Forgotten after 7 more) | `decayIfStale`; projected decay in `lib/learningHistory.ts` |
| **Uncharted sector** | An exam not on the player's track | `data/tracks.ts`, exam_progress |
| **Gems** (D3) | Gems | `award_gems`, `useGems` |
| **Coverage** | Daily streak | `lib/streak.ts`, `useStreak` |
| **Grace day** | Streak freeze token | `StreakState.freezes` |
| **Lapse** | Streak lapsed | `StreakState.lastBrokenOn` |
| **Daily Transmission** | A 3-question review quiz of the concepts closest to decaying (§7.5) | a normal quiz (`/quiz?ids=…`) |
| **Monte Carlo Station** | Quiz Battle's way in | `pages/Battle.tsx`, mounted at `/actuaria/battle` (§5) |
| **Duel** | A Quiz Battle, any of its three ways in | `battleReducer` |
| **Open channel** | *Random opponent* (the matchmaking lobby) | `Matchmaking.tsx`, `battleLobby.ts` |
| **Private channel** | *A friend online* (room code) | `battleRoom.ts` |
| **Dogfight** | *Same screen* (buzzer rules) | `LocalBattle.tsx` |
| **Surplus** | A player's battle score | `battle.ts` points |
| **Claim** | A penalty: a wrong buzz (−50), or a Double Down miss (§7.2) | `WRONG_BUZZ_PENALTY` |
| **Claims review** | The results' question-by-question list, plus **Review my misses** (§6.9) | `BattleResults.tsx` → `/quiz?ids=…` |
| **Gambler's Ruin** | The weekly raid boss | raid tables (§8) |
| **Cohort** (UI) | A player-made study group for one exam sitting | tables named `actuaria_crews*`, **not** "cohort" in code, because leagues already use *cohort* for their groups of 30 |
| **Risk pool** | Cohort bonus when ≥75% of members study today | §7.6 |
| **Guide** | A member who has passed the exam and helps the cohort | §7.6 |
| **Large Numbers** | The leaderboard | existing per-exam league board (`LeaderboardPanel`) |
| **Hangar** | Ability loadout + ship cosmetics | new loadout (§7.2) + Store cosmetics (§7.3) |
| **Ability** | A once-per-battle power-up, unlocked by mastering a keystone | §7.2 |
| **Simulation** | A timed Practice Exam at Monte Carlo Station + the readiness readout | existing `mock-exam` mode (`docs/mock-exam-browser.md`) |

---

## 4. Visual system

Actuaria looks like the existing app with a thin sci-fi layer. It keeps the black canvas, grey
cards, 12–16 px radii and exam tiles, and adds:

- an orbit logo;
- a dot-grid floor on in-world screens;
- thin orbit lines;
- signal-coloured corner ticks on live HUD overlays.

### 4.1 Scope and theme

- Wrap every `/actuaria/*` route in one scope element, `<div className="actuaria dark">`. **In-world
  screens are always dark** (it is space), so the scope pulls the dark tokens regardless of
  the app theme. Confirm this works with the `.dark` token block in `index.css`, and scope it
  to the route rather than toggling the document class. Quiz Battle's `index.css` motion and
  player-colour styles must keep working inside the scope. Cover it with an e2e check (§9).
- The hub card that links into Actuaria (§6.2) lives in Study Mode and follows the normal
  light/dark theme.
- Add a style-guide section, `§2.6 Actuaria scope`, and a short *Actuaria signal* entry in
  §2.3 beside *Player colours* (§4.2). The style guide is the source of truth once this lands.

### 4.2 Colour

| Role | Token / value | Notes |
|---|---|---|
| Canvas | `bg-background` | Pure black in dark |
| Cards / panels | `bg-card` | The site's #171717 step |
| Hairlines | `border-border` | Sparingly (style guide §2.2) |
| Secondary text | `text-muted-foreground` | |
| **Signal** (new) | `--actuaria-signal: 173 80% 40%` (≈ `#14B8A6`) | Actuaria's single accent, **chrome only**: the logo's ring, "live" indicators, HUD corner ticks, the "you are here" marker. Defined only inside `.actuaria` and exposed as the Tailwind colour `actuaria-signal`. It is the same family as the app's teal (the general-guide tile, `tip` callouts), which is why it reads as the site's own. Never on a verdict, a mastery readout, or a battle player's element (G6). |
| Signal soft | `--actuaria-signal-soft`: signal at ~18% alpha | `live` chip background |
| Credibility | `masteryFill(state, keystone)` (`lib/masteryFill.ts`) | Green ladder; gold for keystones. **Not** signal (G8) |
| Exam hues | `examAccentStyle(examKey)` | Sector tiles, planets, selected states |
| Battle players | `playerAccentStyle(seat)` | Sky / fuchsia, inside a battle only (G6) |
| Decaying / at risk | semantic amber family | Orbital decay, "review due" |
| Raid boss | `--destructive` | The one enemy |

**No Battle brand colour.** The canvas used amber ("Hazard") for Battle. It collides with
amber = at risk and with the site's Beta chip, and Quiz Battle already has its identity (the
split sky/fuchsia `BattleLogo`), so it is dropped.

**Dot grid** (in-world floor): `background-image: radial-gradient(hsl(var(--border)) 1px, transparent 1px); background-size: 22px 22px` on the in-world page canvas only. Never on study pages or cards.

**Selected state** (from the site's selected Exam 9 card): background `var(--exam-accent-soft)`,
1 px border `var(--exam-accent-muted)`. This is the only selection treatment in Actuaria.
Focus rings stay standard (`ring-ring`).

**Corner ticks**: four 16 px L-shapes, 2 px `actuaria-signal`, radius matching the panel's
corner, drawn by `components/actuaria/HudFrame.tsx`. Use them **only** on:

- the selected-sector panel;
- the Battle page's question card under the Actuaria skin;
- the raid boss panel.

Never on plain cards.

### 4.3 Type

- The app's **system UI stack** stays the UI face everywhere. The canvas used Outfit as a stand-in; it is not needed.
- **Oxanium** (Google Fonts, 600/700) is the one new face. Use it for the **wordmark** and **in-world display labels** only: screen titles, sector names ("SECTOR P") and HUD section headers. Always uppercase, `tracking-wide` (~+4%), never body text. It loads only in the Actuaria route chunk.
- **Readouts** (Z values, timers, scores): `font-mono tabular-nums` on the system mono stack. No new mono font.
- Otherwise follow the style guide's shallow scale.

### 4.4 The logo mark

A planet with a tilted orbit ring and a satellite. It echoes the round Actuarial Notes logo.
Build it as `components/actuaria/ActuariaMark.tsx` (`size`, `tone: 'default' | 'mono'`, and
`surface` for the gap colour). The geometry is exact:

```svg
<svg viewBox="0 0 64 64" aria-hidden="true">
  <ellipse cx="32" cy="32" rx="29" ry="9" transform="rotate(-18 32 32)"
           fill="none" stroke="SIGNAL" stroke-width="2.5"/>          <!-- back of ring -->
  <circle cx="32" cy="32" r="14" fill="FOREGROUND"/>                 <!-- planet -->
  <path d="M6.89 36.5 A29 9 0 0 0 57.11 36.5" transform="rotate(-18 32 32)"
        fill="none" stroke="SURFACE" stroke-width="7"/>              <!-- gap -->
  <path d="M3 32 A29 9 0 0 0 61 32" transform="rotate(-18 32 32)"
        fill="none" stroke="SIGNAL" stroke-width="2.5"/>             <!-- front of ring -->
  <circle cx="58.9" cy="26.5" r="3.6" fill="SIGNAL" stroke="SURFACE" stroke-width="2"/>  <!-- satellite -->
</svg>
```

- `SIGNAL` = `hsl(var(--actuaria-signal))`, `FOREGROUND` = `hsl(var(--foreground))`, `SURFACE` = what it sits on (`--background` or `--card`).
- ≤32 px variant: drop the satellite, ring stroke 4, planet r = 15, gap stroke 9.
- One-colour variant: everything `--foreground`, gap = surface.
- Minimum size 24 px. Clear space = one planet radius.

**Wordmark**: "ACTUARIA" in Oxanium 700, tracking +5%, over "ONLINE" in `font-mono`, tracking
~0.7em, in `actuaria-signal`, after a 1–2 px signal rule. Horizontal lockup = mark +
wordmark, gap ≈ 0.35 × mark size.

### 4.5 Components (`components/actuaria/`)

| Component | Notes |
|---|---|
| `ActuariaMark`, `ActuariaWordmark` | §4.4 |
| `HudFrame` | Card with corner ticks (§4.2) |
| `SectorTile` | **Reuse `ExamLogo`/`LogoTile`**, plus an optional orbit-ring overlay (signal ellipse, rx ≈ 0.6 × tile, tilted −12°) once the sector is charted. Uncharted = the same tile at 40% opacity with a small lock disc in the corner. |
| `CredibilityBar` / `CredibilityRing` | Fill from `masteryFill`; mono `Z 0.62` label. Earned bars take no scrub handler (style guide §7.5). |
| `StatusChip` | The site's Beta-chip pattern: tinted fill, coloured text, sentence case, `rounded-full px-2.5 py-1 text-xs font-medium`. Variants: `live` (signal, with dot), `cleared` (green), `decaying` (amber), `locked` (muted), `beta` (existing). |
| `AbilityButton` | Battle power-up (§7.2): glyph tile + name + one-line effect. States: ready, armed, used (dashed, muted), locked. Lives in `components/battle/` because the Battle page renders it. |
| `StarMap` | SVG map (§6.3) |

**Not built:** a Surplus (HP) bar, a second scoreboard, or a second question card. In battles,
`BattleScoreboard`, `BattleQuestionCard` and `BattleActionBar` are used as they are.

Buttons stay the app's `Button` variants, one solid primary per view (style guide §7.1).
`button.tsx` has no pill shape. In-world screens may add `rounded-full` through `className`,
documented in §2.6. Don't add a new variant.

---

## 5. Routes and navigation

| Route | Screen | Phase |
|---|---|---|
| `/actuaria` | Title screen on first visit, then the star map (§6.1) | 1 |
| `/actuaria/map` | Star map + selected-sector panel | 1 |
| `/actuaria/sector/:exam` | Sector detail: regions, landmarks, decay | 1 |
| `/actuaria/daily` | Daily Transmission + coverage | 1 |
| `/actuaria/hangar` | Ability loadout, ship cosmetics | 1 (display), 2 (loadout matters) |
| `/actuaria/battle` | **Monte Carlo Station** = `pages/Battle.tsx` under the Actuaria skin; accepts `?exam=` and `?join=` like `/battle` | 2 |
| `/actuaria/simulation` | Practice Exam launcher + readiness readout | 2 |
| `/actuaria/cohort` | Cohort home | 3 |
| `/actuaria/raid` | Weekly raid | 3 |

- **One Battle page.** `/actuaria/battle` renders the same lazy `Battle` component as `/battle`,
  with a `skin="actuaria"` prop (§6.8). Nothing about the game forks. An invite link made
  inside Actuaria uses `/actuaria/battle?join=CODE`, and the plain `/battle?join=CODE` joins
  the same room (a room code is a channel name, so the two skins play each other).
- **Wiring**: add `/actuaria` to `preloadRoute` in `App.tsx`. Add it to `DESK` in
  `lib/viewTransition.ts`, with its own tab entry, so in-world moves don't borrow the Quiz
  tab's paper motion. `/actuaria/battle` must **not** light the Quiz sidebar item (the
  `forceActive` check in `Sidebar.tsx` is `pathname === '/battle'`; keep it exact).
- **Sidebar**: under the existing items, add a divider, a muted mono `PLAY` label, and an
  **Actuaria** row with a small stroke orbit icon and a `live` StatusChip. It is hidden when
  `ACTUARIA_ENABLED` is false. Actuaria is part of Study Mode, **not** a third mode on the mode
  pill (D6).
- **Mobile**: in-world screens get a 5-tab bottom bar (Map, Battle, Daily, Cohort, Hangar),
  following style guide §5.1. On `/actuaria/battle` it hides while a battle is running, since
  `BattleActionBar` owns the foot of the screen. The Cohort tab is hidden until Phase 3.
- All routes lazy-load (`lib/lazyRoute.ts`), so Oxanium and the map SVG never reach Study
  Mode's bundle.

---

## 6. Screens

Each subsection maps to a board on the design canvas (§12). Everything shown must come from
real data. Where the canvas shows sample values, those were placeholders.

### 6.1 Title screen (`/actuaria`, first visit)

- **Scene**: starfield (static SVG dots), a planet horizon at the bottom with the signal orbit ring, and the centred mark + wordmark + tagline.
- **Actions**: primary **Enter Actuaria**, outline **Back to Study Guides**. Top-left: small Actuarial Notes lockup + "PRESENTS".
- **Bottom bar**: the **live lobby count** from a Quiz Battle *observer* session (`MatchmakingSession` in observer mode, the same one the Battle page's way in uses): "3 pilots waiting at Monte Carlo Station", or "Monte Carlo Station is quiet right now". This is a real count. Don't invent any other number.
- After the first visit, `/actuaria` goes straight to the map. Persist the "seen title" flag with the loadout (§8.1).
- **Music (optional, recommended)**: the title and the map may call `useBattleMusic(0)` (calm), behind Quiz Battle's own ♪ switch. One music player serves the app, and a release waits half a second, so walking from the map into a battle doesn't restart the score.

### 6.2 Hub card in Study Mode

On the Study Guides home (`pages/wiki/WikiHome.tsx`), in the general-guides row (the same
grid and 48 px `LogoTile` the *How to Study* card and the Quiz tab's *Quiz Battle* card use,
so the exam lists still line up), add an **Actuaria Online** card. Its tile is `ActuariaMark`
on `bg-background`, its title is "Actuaria Online", its description is one line, and it
links to `/actuaria`. It follows the app theme and is dismissible, with the dismissal kept
with the loadout (§8.1).

### 6.3 Star map (`/actuaria/map`)

- **Layout**: a full-bleed SVG map on the dot grid, with a HUD overlaid:
  - top-left: player card (the app avatar, display name, active exam's sector Credibility bar);
  - top-right: view tabs (Map / Battle / Cohort / Ranks) and **Exit to Notes**;
  - right: selected-sector panel in a `HudFrame`;
  - bottom-left: legend.
- **Geometry**: a central star with concentric elliptical orbits (ry ≈ 0.42 rx). Orbit 1 holds **Monte Carlo Station**, labelled with the live lobby count (§6.1). Orbit 2 holds charted sectors. Orbit 3 (dashed) holds uncharted ones.
- **Sectors**: one planet per exam on the track, filled `--exam-accent-vivid`, with the `examLogo.ts` monogram and an Oxanium label. Uncharted exams are dashed circles stroked `--exam-accent-muted` with a lock. **Chart this sector** adds the exam through the existing exam-progress flow (G9).
- **Order**: ladder order, so the hue ramp reads around the orbit as it does on the exam grid.
- **Selected-sector panel**: tile + name + exam title in the selected state (§4.2); sector Credibility with the band verdict from `computeExamReadiness`; a **Landmarks** list (keystones first, then the concepts nearest to decaying), each with a StatusChip. Actions:
  - primary **Battle this sector**: shown only when `battleExamCounts` gives the exam at least three raceable questions (today P, FM, MAS-I, MAS-II). It opens `/actuaria/battle?exam=…` with the setup pre-filled. Otherwise the panel says battles need multiple-choice questions on this exam, and the primary becomes **Train in Quiz**;
  - secondary **Open study guide**.
- **Decoration**: the Loss Triangle Nebula is decorative. Gambler's Ruin renders only while a raid is active (Phase 3).
- **Keyboard**: sectors are focusable `<button>`s in DOM order, e.g. `aria-label="Sector P, Probability, Credibility 0.62"`.

### 6.4 Sector detail (`/actuaria/sector/:exam`)

Regions (learning objectives) as sections with their weight (`ExamWeightLabel`). Each lists
its landmarks with a Z chip and a decay readout. **Keystones get in-world names**, authored
in `data/actuariaLandmarks.ts` as `{ exam, concept, name }`:

| Exam | Keystone concept | Landmark name |
|---|---|---|
| P | Bayes Theorem | Bayes Outpost |
| P | Poisson Distribution | Poisson Drift |
| P | Normal Distribution | Normal Ridge |
| P | Central Limit Theorem | Limit Beacon |
| FM | Present Value | Present Value Harbor |
| FM | Annuity Immediate | Annuity Belt |
| FM | Immunization | Immunization Shield Array |

- Non-keystones use the plain concept name. A landmark name always shows the concept name beneath it.
- Add a test that every entry is a real keystone (`findKeystone`).
- A landmark opens the existing concept popup.

### 6.5 Credibility & decay

- **Landmark chart**: the existing `components/ui/LearningProgressGraph.tsx` (step function, answer dots, projected decay dashes), with an `actuaria` presentation prop that labels the y-axis in Z (0, 0.33, 0.67, 1.00). Don't build a second chart.
- **Sector roll-up**: the two readiness criteria (syllabus coverage 60%, keystones 40%) as bars that make up the sector Z. The regions list (§6.4) is where learning-objective-level progress lives.
- **Decaying now**: the three concepts with the soonest projected decay step, with the date and the drop ("L2 → L1 in 3 days"), plus **Repair · Daily Transmission**.

### 6.6 Daily Transmission + Coverage (`/actuaria/daily`)

- **Coverage card**: streak length (via `useStreak`), a shield glyph in place of the flame on Actuaria routes only, and "Grace days: N" from `freezes`.
- **"N landmarks are decaying"**: the transmission set (§7.5), each with Z and a `decaying` chip.
- **Risk-pool strip** (Phase 3): "9 / 12 covered · +25% gems active".
- **Primary: Receive transmission**, with the question count and an estimate from the exam's pace (`lib/quizTiming.ts`). It opens `/quiz?ids=…`, a normal quiz, so XP, the streak, quests (including revive) and mastery all flow through `quizStore` unchanged.
- **Coverage calendar**: a month grid. `StreakState` keeps no per-day history, so derive **studied days** from `quiz_sessions.completed_at` (signed-in; a day with a completed quiz that had at least one correct answer, the same rule the streak banks on). For guests, derive only the current run from `lastActiveDay` and `currentStreak`. Freeze-bridged days aren't recorded anywhere. **Don't draw grace days on specific dates**; show the grace count on the card instead (D5). Ring today. No milestone rewards unless one already exists.

### 6.7 Hangar (`/actuaria/hangar`)

- **Ship bay**: a static top-down ship SVG with callouts for its cosmetic slots: hull paint, trail, calculator bay.
- **Abilities** (§7.2): cards grouped by sector, each showing its effect, the keystone that unlocks it, the requirement ("Bayes Theorem at Level 2") and that concept's current state. States: equipped / unlocked / locked. Equip up to **3**. Reinsurance is always available.
- **Ship cosmetics** (§7.3) are bought in the existing Store with gems; the Hangar only equips.
- Before Phase 2b, the ability section shows "Abilities arrive in private-channel battles soon".

### 6.8 Monte Carlo Station — Quiz Battle under the Actuaria skin (`/actuaria/battle`)

`pages/Battle.tsx` with `skin="actuaria"`. **The skin changes chrome and words, never the
game.**

Changes under the skin:
- The page sits on the dot grid inside `.actuaria`, with Oxanium headings ("MONTE CARLO STATION", the way-in cards, "SECTOR P" on the setup's exam picker).
- Copy comes from `lexicon.ts` (§3). *Random opponent* becomes **Open channel** (with the real lobby count, as now), *A friend online* becomes **Private channel**, and *Same screen* becomes **Dogfight**. Each carries the plain name as its description, e.g. "Random opponent".
- `BattleQuestionCard` is wrapped in a `HudFrame`.
- The top row shows `ActuariaMark` in place of `BattleLogo`, and **Exit to map** in place of the way back to the Quiz tab.
- The setup's exam picker lists sectors with `SectorTile`, pre-selected from `?exam=`. Exams without raceable questions are disabled with a reason, not hidden.
- The **ability tray** (Phase 2b, §7.2) sits in `BattleActionBar` above the answer pad, in private-channel battles only.

Unchanged under the skin: scoring and every rule in `docs/quiz-battle.md`; the scoreboard, its
player colours and tug-of-war bar; the count-in, the reveal, reactions, sounds, the
soundtrack, the lobby and its handshake; and the rule that **nothing is saved**.

Implement the skin as a context (`BattleSkinContext`) the battle components read for labels
and wrappers, so `components/battle/*` gain no `if (actuaria)` branches beyond reading it. Add
the skin to `e2e/battle.spec.ts`: one online battle over `VITE_BATTLE_TRANSPORT=local` with
one page on `/battle` and one on `/actuaria/battle`, to prove the two skins play each other.

### 6.9 Results + claims review

`BattleResults` as it is: the winner in their player colour, wearing the foil; confetti; the
stats; Rematch; and the question-by-question list. Under the Actuaria skin, the heading reads
from the lexicon and one action is added:

- **Review my misses** (the *claims review*). It opens `/quiz?ids=…` with the questions **this
  device's own player** got wrong or didn't answer. Online, that's this device's seat. In a
  Dogfight, that's seat 1 only, the account holder. The battle itself saves nothing; the
  review is an ordinary quiz, so *its* answers save as usual. That keeps G4 intact and turns
  a lost duel into study. Hide the action when there are no misses.

### 6.10 Simulation (`/actuaria/simulation`)

A launcher for the existing **Practice Exam** (`mode=mock-exam`), with the format read from
the exam catalogue and the pace table (30 questions and 3 hours for P), not hard-coded. After
a run, show the score, the time used and the sector's readiness (the one number, G2) with its
band. Then show **Biggest lifts**: the three keystones or regions whose promotion would raise
`computeExamReadiness` most, computed by re-running it with that one concept promoted. The
canvas's 10,000-sitting histogram is deferred (D2).

### 6.11 Cohort (`/actuaria/cohort`, Phase 3)

- **Header**: cohort name, exam + sitting (`data/examSittings.ts`), member count, cohort Z (the mean of members' sector Z, shared only on joining) and league rank if any.
- **Risk-pool card** in a `HudFrame` (§7.6): one segment per member; "Bonus active · +25% gems" at ≥75%.
- **Member grid**: avatar, name, Z, covered-today tick, or **Nudge** (in-app only, rate-limited).
- **Raid mini-card**.
- **Cohort Clash**: members challenge each other through **private channels**. It creates a room and sends the code to the member in-app, and is still a Quiz Battle.
- **Guides**: members who recorded passing this exam, their explanation counts, and **Ask the cohort**.

### 6.12 Raid (`/actuaria/raid`, Phase 3)

- **Boss**: a cracked die (an isometric cube in `--destructive` line art) in a `HudFrame` reticle; "GAMBLER'S RUIN · ENDS IN 2D 14H".
- **Boss bar**: health with phase markers at 50% (**Double or nothing**) and 25% (**All in**), and three rule cards.
- **Right column**: cohort damage (name, bar, damage, share %); "Weak spots the boss is using" (the cohort's lowest-Z concepts); the loot pool; and **Join the raid**.
- A raid is **not** a Quiz Battle. It is solo answering against a shared boss (§7.7).

---

## 7. Game rules

Pure functions with tests. Constants are exported so they can be tuned in one place.

### 7.1 Battle = Quiz Battle

Every duel follows `docs/quiz-battle.md` exactly. Don't restate or re-tune its numbers here or
in code. For reference only:

- **Points**: 100 per right answer, plus up to +50 for speed, plus +20/+40/+60 for a streak.
- **Final question**: ×2.
- **Buzzer rules**: a wrong buzz costs −50.
- **Online**: +25 for the fastest right answer.
- **Paces**: Blitz 1:00, Standard 2:00, Exam pace.
- **Lobby matches**: fixed at 5 questions, 2:00, mixed.

In Actuaria's words, a player's points are their **Surplus** and a penalty is a **claim**.
There are no hit points, no Ruin and no hulls.

### 7.2 Abilities (Quiz Battle power-ups, Phase 2b)

`docs/quiz-battle.md` lists power-ups as "deliberately left out so far". This is that feature,
built into the engine and not beside it.

**Where they're available.** Only in **private-channel** battles (*A friend online*), and only
when the host turns on the room setting **Abilities**, which is off by default. They are
never available in the open-channel lobby (strangers keep the fixed, plain rules) or in a
Dogfight (seat 2 has no account and so no unlocks).

**Loadout and trust.** Each player brings up to **3** equipped abilities. A player's unlocks
are read locally from their own mastery. The guest *declares* its loadout in its join
message, and the host validates only the ids, the count and the charges. Unlock state can't
be verified across devices, so ability trust is social, exactly like the rest of a friend
room. Each ability is usable **once per battle**. Show a used ability as spent on both
screens. Arming happens in the count-in or while the question is open, before locking in.

| Ability | Effect | Rule sets | Unlocked by |
|---|---|---|---|
| **Reinsurance** | Halve your next claim (−50 → −25) | both | Always (starter) |
| **Bayesian Update** | Strike one wrong option from the current question, on your screen only | both | Bayes Theorem (P) ≥ Level 2 |
| **Double Down** | Arm before answering: this round's total ×2. A miss becomes a claim of −50 even under simultaneous rules. Not allowed on the final question, which is already ×2. | both | Expected Value (P) ≥ Level 2 |
| **Time Value** | This round's speed bonus is scored as if you'd answered 30 s sooner (never above +50) | both | Present Value (FM) ≥ Level 2 |
| **Immunization** | A miss this round doesn't break your streak | both | Immunization (FM) ≥ Level 3 |

- Unlocks read the named **keystone** through `resolveConceptState`, so decay can re-lock an ability ("Requirement lapsed: review Bayes Theorem"). An ability equipped when a battle starts stays usable for that battle.
- Catalogue: `data/actuariaAbilities.ts` (`{ id, name, effect, exam, keystone, minLevel }`). A test asserts every `keystone` exists in `data/keystoneConcepts.ts`.

**Engine changes** (all in `lib/battle.ts` / `lib/battleRoom.ts`, tested in their test files):

- **Config**: `BattleConfig.abilities: boolean`, plus a per-seat `loadout: AbilityId[]` and `spent: AbilityId[]` in state.
- **New event**: `{ type: 'power', seat, ability, at }`. It returns the state by identity if the ability is off, not in the seat's loadout, already spent, used out of phase, or is Double Down on the final round.
- **Scoring**: extend `PointsBreakdown` with an `ability` line, so the results and the "How points work" panel can show it. Apply ×2 for Double Down *after* the other parts, and never on top of the final-round multiplier.
- **Bayesian Update**: the struck option is per seat. Add it to what `redactFor` hides from the other seat, so neither player learns which option the other struck.
- **Protocol**: bump `PROTOCOL_VERSION`. Parse the new move and fields in `parseMessage` / `parseBattleState` with caps. An older bundle refuses the room exactly as it does today.
- **Sound**: one new cue, `power` (a short rising latch, softer than `lockIn`), written to the sound rules.

**Worked example** (use it as a fixture). Private channel, simultaneous rules, Standard
(120 s), round 2 of 5, abilities on. Your second right answer in a row, locked in at 30 s,
first right answer of the round:

| | Base | Speed | Streak | Fastest | Ability | Total |
|---|---|---|---|---|---|---|
| No ability | 100 | round(50 × (1 − 30/120)) = 38 | 20 | 25 | — | **183** |
| Time Value | 100 | 38 | 20 | 25 | +12 (speed scored as if at 0 s: 50) | **195** |
| Time Value + Double Down | 100 | 38 | 20 | 25 | +12, then ×2 on the whole round | **390** |

A Double Down miss under simultaneous rules is a claim of −50. With Reinsurance it is −25.

### 7.3 Ship cosmetics (Hangar, bought with gems)

Cosmetic only: no stat changes, nothing that touches scoring. The Store's catalogue
(`lib/cosmetics.ts`) is built around animal palettes today, so add a `kind` to `Cosmetic`
(`'palette' | 'ship'`) or a sibling catalogue `data/actuariaShips.ts` with ids namespaced
`ship:*`. Either way, buy through the existing `purchase_cosmetic` RPC. Prices follow the
existing economy (quests pay ~40–55 gems a day, a basic cosmetic is 10 and a rare one 50):

| Item | Price |
|---|---|
| Hull paints (per colourway) | 10 (basic) / 50 (rare) |
| Engine trails | 10 |
| Calculator skins (BA II Plus, TI-30XS MultiView) | 10 each |
| Stop-Loss Shield decal | raid reward only (§7.7) |

The ship shows in the Hangar and on the map's player card. It is **not** sent over a battle
room: Quiz Battle draws only the app's own avatars, and that rule stays.

### 7.4 Rewards

- **Battles pay nothing** (G4). They are played, not studied.
- Everything Actuaria rewards is study that already pays:
  - Daily Transmission, Simulation and Review my misses are ordinary quizzes, with XP, gems via quests, streak and mastery as today;
  - raids pay gems server-side (§7.7).
- A battle *win* could pay only once battles have a trusted, stored result, which is D8.

### 7.5 Daily Transmission selection

`selectTransmission(masteryRows, now, n = 3)` in `lib/actuaria/transmission.ts`:

1. Candidates are the concepts on the player's active exams whose projected **next decay step is within 7 days**, plus **Forgotten** concepts that were learned before.
2. Sort keystones first, then by the soonest decay step, then by the highest current level.
3. Take `n` concepts and draw one question each through the quiz's own pool (`filterQuestions`, so fact-check and syllabus filters apply), leaning to the concept's level with `drawByDifficulty`.
4. With fewer than `n` candidates, fill from today's study-plan concepts. With none at all, show "No decay today" and offer the study plan.

Completing it is a normal quiz completion.

### 7.6 Cohorts, risk pool, guides (Phase 3)

- A cohort = one exam + one sitting, 3–12 members, created by a player and joined by invite code. At most one cohort per exam per player.
- **Risk pool**: when ≥ 75% of members (rounded up) have banked a streak day *today* (in their own time zone, per `streak.ts`), each member's gem awards that day are ×1.25. This is applied **server-side** in the gem-award path; the client only displays it.
- **Guide**: a member who self-reports passing the exam (shown as self-reported) can take the Guide role. Guides answer "Ask the cohort" threads, and an accepted explanation pays 5 gems (max 25 a day).
- **Nudge**: at most once per member per day, in-app only.

### 7.7 Raid rules (Phase 3)

- **Schedule**: one raid per cohort per week (Monday UTC, like leagues). Boss health = `1000 × members`.
- **Questions**: from the cohort's **lowest-Z concepts** (the member mean) on its exam, drawn like §7.5. Multiple choice only, like battles, because damage must be server-markable.
- **Damage**: a correct answer deals `100 + speed` (Quiz Battle's base and speed, §7.1, on the exam's pace), and misses cost nothing.
  - **Double or nothing** (≤ 50%): hits deal ×2 and misses heal the boss by 50.
  - **All in** (≤ 25%): hard questions only.
- **Marking**: raid answers are the account's own, so they *also* save as normal quiz answers (mastery, XP, streak) through `quizStore`. The **damage** is shared state, so the server marks it (§8.3).
- **Loot**: a 300-gem pool per cohort per week, split **pro rata** by damage (floored, remainder to the top contributor), paid at rollover. Defeating the boss grants the Stop-Loss Shield decal to everyone who dealt damage.

---

## 8. Data model & backend

### 8.1 Phase 1: one small table

`user_actuaria` (`user_id pk, loadout text[] default '{reinsurance}', hub_dismissed bool,
title_seen bool, updated_at`), RLS "own row", with a localStorage fallback for guests (the
`user_xp` pattern). Everything else reads existing state.

### 8.2 Phase 2: no new tables

The skin and abilities ride Quiz Battle's broadcast rooms and lobby. Nothing is stored (G4),
so there is no migration and no server marking for battles.

### 8.3 Phase 3: cohorts and raids

- **Tables**:
  - `actuaria_crews (id, exam, sitting, name, created_by, created_at)`
  - `actuaria_crew_members (crew_id, user_id, role: member|guide, joined_at)`
  - `actuaria_raids (id, crew_id, week, boss_max, boss_health, phase)`
  - `actuaria_raid_hits (raid_id, user_id, question_id, correct, damage, at)`
- **Privacy**: the leagues model. Nothing is shared until joining, leaving deletes the member's rows, and boards are read through RPCs only.
- **Raid marking**: a Vercel function `api/raid.js` marks the chosen option with the **same marking code as the AI connector's `check_answer`** (`quiz/api/_mcp/`, over the build-time vault export), then writes the hit through a `SECURITY DEFINER` RPC. The client never reports "correct" for damage.
- **Rollover**: lazy and idempotent, like leagues'. The SQL mirrors the TS formulas under the duplication-contract comment.

---

## 9. Phased plan

One PR per milestone, with the flag **off** until Jordan turns it on.

**Phase 0: Groundwork**
- `ACTUARIA_ENABLED` in `featureFlags.ts` (default `false`, documented like the others).
- `.actuaria` scope, `--actuaria-signal` tokens, the Tailwind colour, and Oxanium in the route chunk only.
- `ActuariaMark`, `ActuariaWordmark`, `HudFrame`, `StatusChip`, `CredibilityBar`.
- `lib/actuaria/lexicon.ts`.
- Style guide §2.6 and the §2.3 *Actuaria signal* entry. A `CLAUDE.md` entry pointing here.
- *Accept when*: lint, typecheck and tests pass; with the flag off, no Actuaria code is in the main chunk.

**Phase 1: The single-player world**
- Title (with the observer lobby count), the hub card, star map, sector detail + `actuariaLandmarks.ts`, the Credibility views on the existing graph, Daily Transmission + coverage, and a read-only Hangar.
- *Accept when*:
  - sector Z × 100 equals the Dashboard's readiness %;
  - landmark Z matches the concept's level;
  - a transmission extends the streak and advances quests like any quiz;
  - charting adds the exam to the track;
  - the map is keyboard-operable;
  - reduced motion is respected.

**Phase 2a: Monte Carlo Station**
- `/actuaria/battle` with `BattleSkinContext`, the lexicon copy, sector-aware setup, **Review my misses**, and Simulation.
- *Accept when*: the e2e cross-skin battle passes; the lobby still pairs `/battle` and `/actuaria/battle` players; battles still save nothing.

**Phase 2b: Abilities**
- `data/actuariaAbilities.ts`, the `power` event, the `abilities` room setting, redaction, the protocol bump, the `power` cue, `AbilityButton`, and Hangar loadout.
- *Accept when*:
  - every ability and every disallowed use is pinned in `battle.test.ts`;
  - the §7.2 table is a fixture;
  - the lobby never enables abilities;
  - an old bundle refuses the new protocol cleanly.

**Phase 3: Social**
- Cohorts, risk pool, guides, nudges, raids (with `api/raid.js`), and Cohort Clash via private channels.
- *Accept when*:
  - privacy tests match leagues (join/leave/delete);
  - the pool bonus is applied only server-side;
  - raid rollover is idempotent;
  - no client-reported correctness moves the boss.

**Phase 4: Ranked and seasons (optional, D1/D8)**
- Needs a stored, trusted battle result, which Quiz Battle deliberately doesn't have. That means a server-authoritative room (the server draws, marks and scores) in place of host truth, and an explicit change to `docs/quiz-battle.md`'s "nothing is saved". Scope it separately before building. Seasons align to exam sittings.

---

## 10. Open decisions (Jordan)

Build with the **default** unless told otherwise.

| # | Decision | Default |
|---|---|---|
| D1 | **Speed in battles.** Real exam questions take ~6 min. | **Resolved by Quiz Battle**: *Exam pace* exists for anyone who wants it, and the lobby plays Standard 2:00. No change. |
| D2 | **Monte Carlo pass-probability histogram.** It would be a second readiness number (G2). | **Deferred.** If wanted, present it as a distribution of practice-exam scores with no pass line, and update `docs/exam-readiness.md` first. |
| D3 | **Currency name.** The canvas says "Premium"; the app says "gems". | Keep **gems**. Rename app-wide only by explicit decision. Never show two names for one balance. |
| D4 | **Rank ladder.** The canvas shows Cadet → Admiral; the app has Bronze → Diamond leagues. | **Use leagues.** No second ladder. |
| D5 | **Coverage calendar and grace days.** Freeze days aren't recorded. | Draw studied days from `quiz_sessions`; show grace as a count. Recording freeze-bridged days in `streak.ts` would be a separate, small change. |
| D6 | **Placement.** A sidebar item vs a third mode on the mode pill. | **Sidebar item** under a PLAY label. The mode pill stays for products. |
| D7 | **Abilities at all?** Quiz Battle is clean and fair as it is. | **Yes, but opt-in**: private channels only, host toggle off by default (§7.2). |
| D8 | **Should battles ever pay out or be rated?** Quiz Battle saves nothing by design. | **No** until Phase 4 is scoped. Actuaria rewards study, not wins. |

---

## 11. Where the design canvas differs from this spec

The canvas ("Actuaria Online Branding", pages **Brand** and **Game mechanics**) was drawn
before Quiz Battle landed and before the repo was reviewed. Follow the spec where they differ.

| Canvas | Spec |
|---|---|
| **02 Duel**: Surplus as hit-point bars, "hit −21 · speed 1.4×", Ruin | Quiz Battle's points race: `BattleScoreboard`, tug-of-war bar, player colours. Surplus = points (§7.1) |
| **03 Results**: "VICTORY" in teal, Premium and rating rewards | `BattleResults`: the winner in their player colour + foil; no rewards; **Review my misses** (§6.9) |
| **05 Hangar**: hull Mk II/III, Afterburner, "power from mastery, Premium buys stats" | Cosmetics only; abilities are the only power, and only in private channels (§7.2–7.3) |
| Abilities: Poisson Burst, Law of Large Numbers | Replaced by Double Down (Expected Value) to fit the points model (§7.2) |
| Amber "Hazard" as Battle's colour | No Battle brand colour; players are sky/fuchsia; amber only for decay (§4.2) |
| Credibility fills in teal | `masteryFill` (green; gold for keystones) (§4.2) |
| Outfit UI font, JetBrains Mono readouts | System UI stack; system mono `tabular-nums`; Oxanium display only (§4.3) |
| Hex colours (`#171717`, `#0E4FDD`, …) | Tokens and `examAccentStyle` (G5, G7) |
| Z = n / (n + k) (Bühlmann); a half-life that doubles on each review | The existing ladder (0 / 0.33 / 0.67 / 1) and step decay (30 / 14 / 7 days) (§3) |
| Sector roll-up as an LO-weighted average | The two readiness criteria (§6.5) |
| "Premium" currency, ₱100-scale amounts | Gems at the §7.3 scale (D3) |
| Cadet → Admiral ranks, rating +22 | Leagues; no battle rating (D4, D8) |
| Pass probability 71% + histogram | Deferred (D2) |
| "[LIVE COUNT] actuaries in orbit", 12 sample pilots | The real lobby count (§6.1); real data only elsewhere |
| Coverage calendar with a grace day on the 15th | Studied days only; grace as a count (D5) |

## 12. Design references

| Board | Spec |
|---|---|
| Brand board | §4 |
| Title screen | §6.1 |
| In the Actuarial Notes app | §5, §6.2 |
| Star map | §6.3 |
| HUD kit & lexicon | §3, §4.5 |
| 01 Core loop | §1, §7 |
| 02 Duel in progress | §6.8 (layout of the frame only; the game is Quiz Battle's) |
| 03 Results & claims review | §6.9 |
| 04 Raid: Gambler's Ruin | §6.12, §7.7 |
| 05 Hangar & abilities | §6.7, §7.2–7.3 |
| 06 Credibility & decay | §6.5 |
| 07 Cohort | §6.11, §7.6 |
| 08 Simulation & readiness | §6.10 |
| 09–10 Daily Transmission, Coverage (mobile) | §6.6, §7.5 |

The board sources are in `docs/actuaria/design-refs/*.dc.html` if Jordan has added them. Read
them for layout, spacing and copy, not for colour, font, scoring or reward values (§11).

---

## Implementation notes

Where the build settled something this spec left open, or departed from its letter.

- **The flag** is `ACTUARIA_ENABLED = import.meta.env.VITE_ACTUARIA_PREVIEW === 'on'` — a
  build-time constant, `false` in every deployed build (nothing sets the variable), and folded
  away there, so the main chunk carries no Actuaria code. The e2e build turns it on
  (`playwright.config.ts`), which is how the specs reach `/actuaria`.
- **`user_actuaria` has a `ship` column** (`jsonb`, the Hangar's equipped slot per part),
  since §8.1 names no home for the equipped cosmetics. Ownership stays in `user_cosmetics`.
- **The `power` event carries `now`**, as every other `battleReducer` event does, rather than
  `at`. `PROTOCOL_VERSION` is **2**.
- **Abilities are offered at the station only** (`BattleSkin.abilities`): Quiz Battle's own
  page has no Hangar and so no loadout. A player on `/battle` can still join a station room
  with abilities on — they bring none.
- **Double Down with no answer** — the clock runs out on an armed round — is a miss, and so a
  claim (−50, −25 with Reinsurance).
- **Reinsurance stays armed across rounds** until the seat's next claim, and a used
  Reinsurance that never met one is simply spent.
- **Ship cosmetics** are a sibling catalogue, `data/actuariaShips.ts` (`ship:<slot>:<name>`),
  sold on a flag-gated **Ships** tab of the Store through `purchase_cosmetic`. The ship is drawn
  from what is owned: a slot naming something the player doesn't own draws the stock part. The
  Stop-Loss Shield is a fourth slot, **decal**, never sold (`raidOnly`); the database grants it.

Phase 3 (cohorts and raids):

- **Where it lives.** `supabase/migrations/20260930_actuaria_crews.sql` is all of the server
  state and every rule that touches it; `supabase/tests/actuaria_crews.sql` exercises it against
  a throwaway local Postgres (`supabase/tests/run.sh`, which stubs the slice of Supabase it
  needs — roles, `auth.uid()`, and Supabase's default function grants). CI doesn't run it; run it
  after touching the migration. The pure mirrors are `lib/actuaria/crews.ts` and `raid.ts`,
  whose tests also read the migration to hold the duplicated formulas and grants together.
- **Supabase grants EXECUTE on a new function to `anon` and `authenticated` directly**, not
  through PUBLIC, so every internal helper and service-role RPC is revoked from both by name.
  `actuaria_credit_gems`, `actuaria_raid_draw` and `actuaria_raid_hit` are callable by the
  service role alone.
- **The risk pool** is applied inside `award_gems` — every study reward's one way in — ×1.25
  rounded half up, and only for a cohort of three or more (a cohort of one would otherwise be
  a private +25%). Two cohorts don't stack. "Covered today" reads `user_streaks.last_active_day`
  in the member's own time zone (an unreadable zone reads as UTC). That row is the member's own
  to write, as the streak always was, so the pool trusts it as far as the streak does.
- **Raid marking and timing.** `quiz/api/raid.js` draws a run of five (the cohort's weak spots
  first, none already hit this week, hard only when All in), records the draw through the
  service role, and marks each answer with the connector's `markChoice` — the same function
  `check_answer` marks with. The answer is timed by the *database's* clock from the draw (then
  from the previous answer), on the exam's pace — Quiz Battle's *Exam pace*, three minutes for an
  exam with none. A question already hit this week deals nothing; a repeated answer is recorded
  once; only the first answer to a question counts (the quiz lets a reader change theirs).
- **Phases are cumulative.** All in (≤ 25%) keeps Double or nothing's rules and adds hard-only
  draws. A miss that heals can lift the boss back over a line; the phase follows its health.
- **The loot is paid whether or not the boss fell** (the week's work), the decal only for the
  kill. A member who leaves takes their hits, and so their share, with them.
- **A run at the boss is an ordinary quiz** (`/quiz?ids=…&raid=<draw>`), so it saves mastery,
  XP, streak and quests like any quiz; the quiz page's only raid code hands each first answer to
  the function and shows what it did (`RaidHitChip`).
- **The weak spots** are the lowest mean Z across what members shared: opening the Cohort screen
  shares the member's sector Z and each landmark's Z on the cohort's exam
  (`actuaria_share_progress`). Nothing about a member is shared before they join.
- **Guides are paid only for accepted replies**; any member may reply. The 25-gem cap is per UTC
  day. **A nudge** is at most one per member per day (their day), from anyone in the cohort.
  **A Cohort Clash challenge** is the room code, shown to the member for 30 minutes.
- **The risk-pool card is a plain card**, not a `HudFrame` as §6.11 has it: §4.2 keeps the corner
  ticks to three things so they keep meaning "live, and yours to act on".
- **Signed-in e2e without a backend.** `e2e/fixtures/signedIn.ts` plants an unexpired session and
  answers the placeholder project's REST and Auth calls, which is how `e2e/actuaria-cohort.spec.ts`
  plays a cohort and a raid run.

## Changelog

**Revision 2 (2026-09-29, `main` @ `4337677`).** Rebased the battle half on Quiz Battle
(`docs/quiz-battle.md`).

- **Battle**
  - Monte Carlo Station is `pages/Battle.tsx` under a skin (§5, §6.8).
  - HP/Surplus/Ruin became Quiz Battle's points race; Surplus is now just the in-world word for points (§7.1).
  - Removed battle tables, server battle marking, the `'battle'` quiz mode and battle rewards; battles still save nothing (G4, §7.4, §8.2).
  - Claims review became **Review my misses**, an ordinary quiz (§6.9).
- **Abilities**
  - Redesigned as opt-in Quiz Battle power-ups for private channels, with engine and protocol changes specified (§7.2).
  - Double Down replaces Poisson Burst and Law of Large Numbers.
- **Hangar**
  - Stat modules removed; the Hangar is cosmetic-only (§7.3).
- **Colour**
  - Added the player-colour rules (G6).
  - Credibility uses `masteryFill`, not signal (G8).
  - Signal is chrome only, with a style-guide entry (§4.2).
- **Live count**
  - The title and map now show the real lobby count through an observer session (§6.1).
- **Other fixes**
  - The coverage calendar reads `quiz_sessions` because `StreakState` has no per-day history (§6.6).
  - Corrected helper paths: `resolveConceptState` is in `lib/conceptMatch.ts`, the graph is `components/ui/LearningProgressGraph.tsx`, and `button.tsx` has no pill shape.
  - Phases split 2 into 2a/2b; Phase 4 needs a server-authoritative room.
  - Decisions: D1 resolved; D7 and D8 new.

**Revision 1 (2026-09-28, `main` @ `483d9af`).** First version.
