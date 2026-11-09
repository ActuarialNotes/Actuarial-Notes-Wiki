# Quiz Battle redesign: the Deck

**Status:** design agreed with the maintainer on 2026-11-08. **Phase 1 is built** (2026-11-09,
see §6); phases 2 and 3 are not. Roadmap item **X10** (`docs/roadmap.md` §3.4); the decision it
needs is **D36** (§6.1).

**The design:** the canvas *Quiz Battle redesign*,
<https://claude.ai/artifact/XkurpjUkA3Xx2WPeFuhgcN> (private to the maintainer until shared).
It holds 14 phone screens at 390 × 844, and every word on them is the agreed copy. When this doc
and the canvas disagree on a rule, this doc wins; when they disagree on a look or a word, the
canvas wins.

`docs/quiz-battle.md` describes the game as it is. This doc describes what changes, in three
phases, each one PR. Each phase updates `quiz-battle.md` to match what it ships.

---

## 1. What changes, and why

Quiz Battle works, but it looks like the rest of the app: settings cards and a list of exam
pills. The redesign makes it feel like a game. Three directions were mocked up (*Versus*, an
arcade fighter; *Radar*, matchmaking as sonar; *Deck*, a card game). The maintainer chose
**Deck**, because the battle already deals concept tiles in its topic pick, so the card idea
runs through the whole flow.

Four things change:

1. **The look.** A card table: your card and theirs, a deck to draw from, a full-screen intro.
2. **The topic pick becomes a draft.** Draw 4, strike 1 of the other player's, and the
   questions are dealt to *pairs*, one card from each hand.
3. **The screens around it.** Lobby, friend room, same screen, the round, and the results.
4. **A record, for signed-in players.** Stats and a tiered leaderboard. This reverses the rule
   that a battle saves nothing (D36).

## 2. The look

- **Ground.** `#0C0A10`. The table is a raised panel (`#14111A`, a 1 px `#241F2D` edge, radius
  28–32). Cards at rest are `#16131C` with a `#2E2838` edge.
- **Type.** Bricolage Grotesque 800 for display: titles, scores, card names, counts. Inter for
  everything else. Titles are 28 px; section labels are 12 px, uppercase, `.08em`, `#B9B1C6`.
- **Players.** Sky and fuchsia, as now (style guide §2.3). Your cards are sky and theirs are
  fuchsia, everywhere. A card that belongs to both is **split diagonally**, sky over fuchsia.
  A player colour is identity, never a verdict.
- **Foil.** The sky → fuchsia → gold border (style guide §4.3) is used in only three places: the
  winner's card, your player card, and the Grandmaster tier. Gold alone marks the final round
  (×2).
- **Levels.** A concept card shows the player's own level the way the flashcard tiles do: New,
  L1, L2, L3, with the same foil edges.
- **Controls.** The primary button is solid white, 58 px tall, radius 18. A secondary button is
  outlined, 50 px, radius 16. Icon buttons are 44 px squares, radius 14. Side margins are 20 px.
- **Before the first question,** every screen carries the same step header, **Draw · Strike ·
  Deal**: the current step solid white, a done step grey, a later one outlined. The timer (or,
  on the deal, the exam's name) sits at the top right.
- **Motion.** Every animation is drawn as paper and cards moving on a table, and each runs once
  in the app (the canvas loops them so they can be watched). With `prefers-reduced-motion`
  each becomes a short fade. Every animation can be skipped with a tap, except the coin flip,
  which is short.
- **Sound.** The battle's existing cues and music (`soundConfig.ts` `BATTLE_RECIPES`,
  `battleMusic.ts`). New moments (a card dealt, a strike, the coin) get cues under
  `docs/sound-design.md`'s rules: one key, round and short, nothing on a loss.

## 3. The screens

The canvas order is: the way in; the battle (6 screens); your record (3 screens).

### 3.1 Intro

Full screen, about 3 seconds, **once per visit** to `/battle`, skipped by a tap. A deck drops
in and fans out, then two cards fly up and flip: yours (your initial, "You") and theirs ("?",
"Rival"). They clash with a flash, and the title comes up: **Quiz Battle**, *Draw four topics
and strike one of theirs.* It ends on the start screen.

### 3.2 Start screen

- **Top bar:** back; a trophy button (the leaderboard); and your initial and record, e.g.
  `23–14` (Stats). A signed-out reader sees neither the record nor the trophy.
- **Title and exam:** *Quiz Battle*, and the exam shown as a deck (its logo tile in the exam's
  accent, with *Change exam* under it).
- **The modes as a hand of three cards:** *Random opponent* raised in the middle, with a moving
  sheen; *Same screen* and *A friend* tilted either side. Tapping a card raises it.
  - Random opponent: *3 questions, each pairing a card from your hand with one of theirs. 2:00
    each.*
  - Same screen: *Two players on one phone. First to buzz answers.*
  - A friend: *Send them a four-character room code.*
- **Lobby status:** *No one's in the lobby right now* (live, as today).
- **The button** follows the raised card: *Find an opponent*, and so on.

### 3.3 Lobby (random opponent)

- **Top bar:** back, *Finding an opponent · 0:18*, and the music toggle.
- **The table:** your card, *vs*, and a face-down fuchsia card shuffling with a sheen. Under it:
  *Exam 5 · 3 questions · 2:00 each*.
- **Browse while you wait:** a row of the exam's concept cards, showing your level, the section
  and the name, with *See all*. Tapping a card opens it in the concept popup above the lobby.
  *Tap a card to read it. If someone joins, you'll go straight back to the table.* When a match
  is made, the popup closes and the battle starts as it would anyway.
- **Deck:** the exam, or *Any exam*.
- *Leave the lobby.*

The existing queue rules are unchanged (`battleLobby.ts`, `battleQueue.ts`). Browsing must not
pause the queue or the presence heartbeat.

### 3.4 Friend room

*Host | Join*. The host sees **Your room code** as four playing cards, each holding one
character (`ROOM_CODE_ALPHABET`, letters and digits), with *Send the code* (the share sheet).
Below that are the two seats (*Jordan · host*; an *Empty seat* blinking), then **Settings**
(questions, time each, exam). The button reads *Waiting for your friend*, disabled, until the
seat fills. *Join* is four empty card slots to type into.

### 3.5 Same screen: seat the players

The phone is split for two people facing each other. The top half is turned 180° for player 2
(fuchsia) and the bottom half is player 1 (sky). Each half has the player's card, a name field,
and *Tap anywhere on this half to buzz*. The middle strip has back, **Deal**, and a settings
chip (exam, length).

Buzzing by tapping your half replaces today's buzz buttons. The **A** / **L** keys stay for a
keyboard.

### 3.6 Draw 4 (step 1)

*Draw 4 topics*, with a 30 s clock (`TOPIC_PICK_MS`, as today). Your hand is four slots at the
top. The other player's progress shows as face-down pips, never what they drew. Below is the
exam's topic list as concept tiles, grouped by the syllabus (`topicCatalogue`), each showing
your level. The button is *Lock in my hand*.

### 3.7 Strike one (step 2)

Both hands are on the table, face up: theirs along the top, yours along the bottom. You **drag
one of theirs onto the discard** in the middle (*Or tap a card, then tap Discard.*), while *Sam
is picking one of yours to strike*. *You'll both see the strikes once both are in.* The clock
is 15 s. If it runs out, a strike is made at random: the other player's highest-levelled card,
ties broken at random (open question O3).

### 3.8 The deal (step 3)

One animation, about 7 s, skippable:

1. **The grid.** Your three cards down the side, theirs across the top, and in each cell how
   strongly the notes connect the two (0–100, Concept Craft's strength). *Each number is how
   closely the notes connect two of the cards. The three strongest pairs are dealt, and no card
   is used twice.*
2. **The pairs light up**, one at a time: Round 1, Round 2, then the Final in gold. A pair that
   no question covers shows **flip** in a dashed cell.
3. **The grid shrinks to the top**, and each chosen pair is **drawn out of its cell as cards**:
   - a pair with a question that tests both concepts becomes **one card in both colours**;
   - a pair with no such question becomes **two separate cards**, yours and theirs, to be
     settled by a coin flip when that round comes up.
4. **The question cards drop on top**, face down, labelled *tests both* or *coin flip*, with the
   pairs tucked behind them. The names show underneath (*Bornhuetter-Ferguson + Chain Ladder*,
   *Benktander or Loss Ratio*). Then *Round 1 in 3*.

The subtitle changes to say who struck what: *Sam struck Pure Premium. You struck Cape Cod
Method.*

### 3.9 A round

Today's simultaneous round, redrawn as a card:

- **The rival's strip** at the top: card, name and score, with *Locked in* and a face-down card
  once they've answered.
- **The question card:** *Round 1 of 3*; the pair as two chips (*BF* × *Chain Ladder*) in the
  players' colours; a fuse along the top for the clock; the stem; and the options as rows, each
  led by a playing-card index (A–D).
- **Your strip** at the bottom (card, score, the streak flame as now), and *Lock in A*.

### 3.10 Coin flip (an unpaired round)

At the start of a round whose pair no question covers: *Coin flip*, *No question covers both of
these, so a coin decides which one this round is on.* The two cards sit either side, and a coin
with one topic on each face is tossed between them. It lands; the winning card lifts and the
other dims. *Round 2 is on* plus the topic, then *Question in 3*. The host tosses the coin and
both screens play the same result.

### 3.11 Results

The winner's card in foil, marked *Winner*, with the score (*473 to 295*). Then each round:
its pair, and the points each player took. Then **the round you lost** as a card, with
**Practice**, which opens a quiz on that topic (the quiz builder's concept launch). When more
than one round was lost, the card shows the weakest topic. Then *Rematch Sam*, *New opponent*,
*Review questions*.

### 3.12 Stats (signed in)

*Your battles*. Exam tabs (*All*, then each exam played). At the top is **your player card**
(small, foil, with your tier) beside the record (`23–14`), *62% won · won the last 4*, and *Your
card ›*. Below that, the last 10 results as W/L cards, newest first, then the list of battles
(opponent, exam, date, *Won*/*Lost*, the score). *Tap a battle to see its questions* opens that
battle's questions in review (phase 3; open question O7).

### 3.13 Your card

The full player card: your record, *62% of battles won*, and your tier and rating
(*Gold · 1,240*). Tiles: best run of wins, fastest right answer, answers right, battles this
week. **Your best topics** (topics with the most correct answers in battles, shown as tiles with
*9 of 10*). **Topics to practice** (the lowest rates, each with a **Practice** button).

### 3.14 Leaderboard (signed in)

Per exam. **Your tier** as a card in the tier's colour, with the rating and a bar to the next
tier (*60 to Platinum*). Then the seven tiers in a row: **Bronze, Silver, Gold, Platinum,
Diamond, Master, Grandmaster** (Grandmaster in foil). *A win against a higher tier counts for
more.* Then **Around you**: the players either side of you, each with their tier and rating.

## 4. The pairs rules (phase 2)

This replaces today's "pick up to 3, drawn in turns" (`drawFromTopics`) for **online** battles.
The same-screen battle keeps no draft (O5).

1. **Draw.** Each player locks in a hand of exactly 4 topics from `topicCatalogue` within
   `TOPIC_PICK_MS`. If the clock runs out on a short hand, it is topped up at random from the
   exam's topics the player hasn't drawn. Hands are hidden until both are in (`redactDraft`).
2. **Strike.** Each player strikes one of the other's four within `STRIKE_MS` (15 s). The
   strikes are hidden until both are in, then revealed together. The same concept in both
   hands is allowed; it can pair with itself (O4).
3. **Pair.** Each player now holds 3. For every cross pair (*a* from one hand, *b* from the
   other), `readPair` in `lib/conceptGraph.ts` gives the strength and the battle questions
   tagged with both (`isBattleQuestion`, not off-syllabus, no open critical finding). Of the 6
   ways to match the two hands one-to-one, choose the one with **the most pairs that have a
   shared question**, then **the highest total strength**. Ties are broken by a seeded coin.
4. **Order.** The final (×2) is the strongest pair with a shared question. The other rounds
   follow in descending strength (O1: the canvas shows the final as the *third* strongest; the
   rule above is the proposal).
5. **Questions.** A paired round draws one question tagged with both, leaning toward the
   battle's difficulty as every battle draw does. An unpaired round is resolved **when it comes
   up**: the host tosses a coin between the two topics, then draws a question on the winner.
   Never the same question twice. If a topic has nothing left, the round falls back to the
   other topic, then to the whole exam (*Any topic*), as `drawFromTopics` does now.
6. **More than 3 rounds** (friend rooms of 5, 7 or 10): the pairs repeat in their order, each
   repeat drawing a new question (O2).
7. **The wire.** The host runs the draft, as it runs the pick today. It needs a draft state
   with hands, strikes, pairs and the coin results, redacted per seat, and new messages for
   `hand`, `strike` and the coin result. Each is validated field by field (`parseMessage`), as
   every message is now. The guest's clock rules (`ONLINE_GRACE_MS`) apply to both deadlines.

How often a round needs the coin depends on the bank. Almost every raceable question is tagged
with two or more concepts (as of 2026-11-08: Exam P 685 of 718, FM 460 of 460, MAS-I 233 of 239,
MAS-II 123 of 124), but a given pair of concepts shares a question far less often. **Measure it
before building:** simulate random draws on each raceable exam and report the share of rounds
that need the coin. If it's high, show the strongest pairs on the draw screen.

Note that the canvas uses Exam 5 for its placeholder hands. Exam 5 has only 6 multiple-choice
questions, so it isn't raceable today, and the build should test on Exam P or MAS-I.

## 5. The record (phase 3)

### 5.1 What is saved

Under D36: **only a battle record, and only for signed-in players.** A battle still writes no
mastery, XP, streak day, quest progress or attempt history (`quiz-battle.md`, *Nothing is
saved*, keeps that part). Same-screen battles save nothing, because the second player isn't an
account.

- `battle_results`: one row per player per online battle. It holds the battle id, the exam, the
  mode (random / friend), win/loss/draw, both scores, the opponent's display name (not their id),
  each round's concepts, and whether this player was right and how fast.
- `battle_ratings`: one row per player per exam, holding the rating and the counts.
- Reads and writes go through SECURITY DEFINER RPCs only, on the XP leagues' privacy model
  (`docs/leagues.md`). A player reads their own results. The leaderboard reads display names,
  tiers and ratings, and only for players who have opted in.

### 5.2 Trust

The host device runs the game, so a client could claim any result. The proposal is that each
player reports the battle through `report_battle(battle_id, …)`, and a rating changes only when
both players' reports agree. A report with no partner within a set window counts in the
reporter's own record but never in the rating. Settle this in phase 3's PR before writing the
migration.

### 5.3 Rating and tiers

Elo per exam: start at 1000, K = 32. Only **random-opponent** battles move the rating, because
friend battles are easy to farm. All online battles count in the record. The tier bands
(placeholders until play data exists, O6):

| Tier | Rating |
|---|---|
| Bronze | below 1000 |
| Silver | 1000–1149 |
| Gold | 1150–1299 |
| Platinum | 1300–1449 |
| Diamond | 1450–1599 |
| Master | 1600–1799 |
| Grandmaster | 1800 and up |

Once ratings exist, the lobby **may** prefer a near rating when two waiting players share an
exam. That is a later change; `planMatches` stays deterministic either way.

### 5.4 What the screens read

- **Stats:** `battle_results` for the account, by exam.
- **Your card:** best topics and topics to practice from the stored per-round concepts. A topic
  needs at least 3 answers before it is listed (the analytics rule of not ranking on thin data).
- **Leaderboard:** `get_battle_board(exam)`, with the reader placed in it.

## 6. Phases

Each phase is one PR off `main`, and each updates `quiz-battle.md` and this doc's status.

1. **The look and the flow, with no rule changes.** ✅ *Built 2026-11-09.* The intro, the start
   screen, the lobby (with browsing), the friend room, same-screen seating, the round, and the
   results with Practice. The topic pick keeps today's rules but takes the deck look. Mostly
   `pages/Battle.tsx` and `components/battle/`, plus a hook for the intro's once-per-visit flag.
   Tests: e2e (`e2e/battle.spec.ts`) through every screen with `VITE_BATTLE_TRANSPORT=local`. The
   view transitions (`moveScreen`) still apply, and nothing on a page gets a `view-transition-name`.

   *What shipped, and where it differs from the canvas:* the screens are `components/battle/deck/`
   under the plain skin only (`BattleSkin.deck`); Monte Carlo Station keeps its look. The trophy
   and the record are left off the start screen (phase 3). The pick's step header shows one
   step, **Pick**, and its hand three slots (today's `MAX_TOPICS`); its title is today's *Pick
   your topics*, since *Draw 4 topics* would describe phase 2. Online, an option is chosen and
   then locked in (*Lock in A*), where it used to lock on the tap. A round's chip is the one
   topic it was drawn for, in its picker's colour (split when both picked it), until phase 2
   pairs them. Entering the lobby is pressing Ready; *Leave the lobby* is Cancel. The intro and
   the start card still say *Draw four topics and strike one of theirs* and *each pairing a card
   from your hand with one of theirs*, word for word from the canvas, though phase 1 has no
   strike and no pairs: phase 2 makes them true. New strings not on the canvas: *Pick an
   answer* (the lock-in before a choice), *{name} is waiting for {exam}* (the lobby, when
   someone waits on another exam), the same-screen settings sheet's labels (*Settings*, *Time
   each*, *Difficulty*), and the buttons reused from today (*Play on this device*, *Create a
   room*, *Start battle*, *Leave room*, *Change settings*).
2. **The pairs draft.** §4 in `lib/battleTopics.ts` (or a new `lib/battleDraft.ts`): draw,
   strike, pair, order and the coin, all pure and tested, plus the vault test that plays random
   drafts on every raceable exam. Session and protocol changes are tested host against guest,
   as `battleSession.ts` is now. The Draw, Strike, Deal and Coin flip screens. Run the
   measurement in §4 first.
3. **The record.** D36 must be decided first. Then the migration, the RPCs (with a
   `supabase/tests` case), `report_battle` and the agreement check, Elo, the Stats, Your card
   and Leaderboard screens, and the trophy and record on the start screen. Update
   `quiz-battle.md` *Nothing is saved* and *Next*, and the roadmap's §6.2 line *"Quiz Battle
   saves nothing."* Actuaria shares the battle engine, so check `docs/actuaria-online.md` §2's
   ground rules too.

## 7. Open questions

Each has a default to build with until the maintainer decides.

| | Question | Default |
|---|---|---|
| O1 | Which pair is the final | The strongest pair with a shared question |
| O2 | Rooms longer than 3 rounds | The pairs repeat, each with a new question |
| O3 | A strike not made in time | The other player's highest-levelled card |
| O4 | The same concept in both hands | Allowed; it may pair with itself |
| O5 | A draft on the same screen | None, as today (each player would see the other's hand) |
| O6 | The tier bands | §5.3's placeholders |
| O7 | *Tap a battle to see its questions* | Phase 3 builds it from the stored question ids; drop the line if it doesn't |
| O8 | Lobby browsing for signed-out readers | Yes, with no levels shown |

## 8. Copy

The words on the canvas are agreed (an app-copy pass on 2026-11-08). The one the maintainer
changed back: *3 questions, each pairing a card from your hand with one of theirs. 2:00 each.*
(recorded in `.claude/skills/app-copy/SKILL.md`'s decisions log). Every name, number and score
on the canvas is a placeholder, including Sam, Jordan, 23–14, 1,240 and the strengths in the
grid.
