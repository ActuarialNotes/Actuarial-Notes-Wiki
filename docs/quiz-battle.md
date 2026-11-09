# Quiz Battle

Two players, the same questions, one scoreboard. A battle is a short race — 3,
5, 7 or 10 questions from one exam's bank — where a fast right answer scores
more than a slow one, a run of right answers scores more again, and the final
question counts double so a battle is never over before its last question.
Online, the players choose what it's played on: each draws four topics, strikes
one of the other's, and the questions are dealt to pairs, one card from each
hand (see *The draft* below).

It lives at **`/battle`**, opened from the **Quiz Battle** row on **Games**
(`/games`, `pages/Games.tsx`), which the Quiz tab's one **Games** row opens from
above its exam list (the same slot and 48px tile the Study Guides tab gives its
general guide, so the two tabs' exam lists still line up). The route is a sheet
laid over Games, itself a sheet over the Quiz tab (`deskPlace` in `lib/viewTransition.ts`) and lights the
Quiz item in the sidebar.

There are three ways in — **Random opponent** (the matchmaking lobby), **Same
screen**, and **A friend online** (a room code) — and two sets of rules, because
a shared screen and a network are different games. A random opponent is an
online battle whose room the lobby chose (see *Matchmaking* below):

| | **Same screen** | **Online** |
|---|---|---|
| Players | two people at one device | one on each device, joined by a 4-character room code — or by the lobby |
| Rules | `'buzzer'` — first to buzz answers; a miss hands the other the steal | `'simultaneous'` — each locks in an answer the other can't see |
| Why | on one screen, whoever claims the question first is visible to both; buzzing *is* the game | over a network, a buzzer race goes to whoever has the shorter ping; locking in doesn't care |
| Controls | buzz with **A** / **L** or by tapping your half of the phone; answer with **1–5** or the answer pad | choose with **1–5** or the options, then **Lock in** (or **Enter**); **Enter** for the next question |

Only questions a click can mark are raced: multiple choice with the answer among
its options (`isBattleQuestion`). Written and multi-part questions are
self-graded, and a self-graded race isn't one — so today a battle can be played on
Exam P, FM, MAS-I and MAS-II, whichever of them has at least three such questions
(`battleExamCounts`). The pool is the quiz's own (`filterQuestions`), so nothing
with an open critical fact-check finding and nothing off the syllabus is drawn;
the draw leans toward the chosen difficulty with the same weighting the quiz
builder's slider uses (`drawByDifficulty`).

## The rules, in numbers

All of these are constants in `quiz/src/lib/battle.ts`, and the "How points work"
panel on the Battle page is written from the same constants.

| | |
|---|---|
| Right answer | **100** |
| Speed | up to **+50**, falling linearly with the round clock used (to the buzz, or to the lock-in) |
| Streak | **+20** for two right in a row, **+40** for three, capped at **+60** |
| Final question | **×2** on everything — every part, a penalty included — in a battle of three or more |
| Buzzer: a wrong buzz (or a buzz with no answer in time) | **−50**, and the player is locked out of that question |
| Buzzer: the steal | the other player gets the time that was left, and never less than **15 s** |
| Buzzer: the answer window | **10 s** from the buzz; the round clock stops while it runs |
| Online: the first right answer | **+25** (a dead heat pays both) |
| Online: a wrong answer | **0** — there is no buzz to punish |
| Count-in | **3 s** before every question, with the question off screen, so nobody reads ahead |
| Online: the draft | a hand of **4** each in **30 s**, then **1** strike each in **15 s**, each hidden from the other player until both are in; the **3** pairs left are dealt (**7 s**), and a pair no question covers is settled by a coin (**2.6 s**) when its round comes up |
| Time per question | *Blitz* 1:00, *Standard* 2:00, or *Exam pace* — the sitting's own time per question, from the table the timed quiz reads (`lib/quizTiming.ts`: 6:00 on Exam P) |

A **streak** is right answers in a row by one player: a round they don't get
right (a miss, a pass, the other player taking it) ends it. Three in a row puts
the flame on the scoreboard. A **draw** is a draw — equal scores name no winner.

### Abilities (a room setting, off by default)

A room hosted with **Abilities** on lets each player bring up to three
once-per-battle power-ups (`docs/actuaria-online.md` §7.2). They are offered only
where a player has a loadout — Monte Carlo Station's *Private channel* — and never
in the lobby (`matchSettings` builds no such room) or on one screen. The rules are
the engine's, in `lib/battle.ts`, driven by one event, `power`, which returns the
state by identity when the setting is off, the ability isn't in the seat's
loadout or is spent, the seat is past arming (arming runs from the count-in until
it locks in — or, under buzzer rules, until it answers or is locked out), or it is
Double Down on the final question.

| Ability | Effect |
|---|---|
| **Reinsurance** | Halves the seat's next claim (−50 → −25), whenever it comes |
| **Bayesian Update** | Strikes one wrong option, on this seat's screen only — `redactFor` hides which from the other |
| **Double Down** | This round ×2, applied after every other part and never on top of the final's ×2; a miss is a claim of −50 even under simultaneous rules |
| **Time Value** | Speed scored as if answered 30 s sooner, never above +50 |
| **Immunization** | A miss this round keeps the streak |

What an ability adds or refunds is the breakdown's own `ability` line, so the
round's chips and the results can show it. The guest declares its loadout in its
join message; the host checks only the ids and the count — unlocks are read from
each player's own mastery and can't be verified across devices, so a friend room's
trust stays social.

## Nothing is saved

A battle writes no mastery, no XP, no streak day, no quest progress and no
attempt history. On one screen the second player's answers are not the account's
answers, and online the other device's player may not have an account at all; a
battle is played, not studied. What is remembered is the setup
(`lib/battleSetup.ts`, localStorage): the exam, the length, the pace, the
difficulty, the names and the exam last asked for in the lobby, so the next
battle opens where the last one left off — and the music switch
(`actuarial-notes-battle-music`).

## The draft: what an online battle is played on

Before an online battle's first question — a room's, a matched one's, and every
rematch's, on either skin — the two players **draft** (`docs/quiz-battle-redesign.md`
§4). A topic is a concept: one the exam's battle questions test (`questionTopics`,
the same resolution a quiz records mastery under, so a topic is the key its flashcard
and its level are filed under). The topics an exam offers are `lib/battleTopics.ts`;
the draft is `lib/battleDraft.ts`. Both pure and tested.

1. **Draw 4** (`TOPIC_PICK_MS`, 30 s). Both screens show the exam's topics as the
   flashcard picker shows an exam: grouped under the syllabus's learning objectives,
   in the syllabus's order (`topicCatalogue`), each drawn as the **same tile** the
   add-flashcards sheet draws (`components/ConceptTile.tsx`), its foil edge the
   player's own level. A search narrows the list. A player draws four into the hand's
   slots and **locks in** (the button waits for the fourth). The other player sees
   only face-down pips filling as cards are drawn — the guest sends its *count* as it
   draws, never the cards — and the hand itself once both are in (`redactDraft`).
   When the clock runs out, each device locks in what it has, the host holds the draw
   open `ONLINE_GRACE_MS` longer for a hand still on its way, and a short hand is
   **topped up at random** from the topics the player hadn't drawn (`topUpHand`). Each
   card carries its holder's level (the guest sends its own with its hand).
2. **Strike one** (`STRIKE_MS`, 15 s). Both hands face up on the table, theirs along
   the top. A player drags one of the other's cards onto the discard — or taps it and
   taps Discard. A strike is hidden until both are in. One not made in time (after
   the grace) is made by the host: the other player's **highest-levelled card**, ties
   at random (`autoStrike`, open question O3).
3. **The deal** (`DEAL_MS`, 7 s). Each player now holds three. For every cross pair,
   `battlePairReader` gives **Concept Craft's strength** (`readPair` in
   `lib/conceptGraph.ts`: what each concept's page says about the other, and the
   questions tagged with both across the bank) and the **battle questions that test
   both**; a concept in both hands pairs with itself, as strongly as can be (O4). Of
   the six one-to-one matchings, the deal takes the one with the **most pairs some
   question tests both of**, then the **highest total strength**, ties broken by the
   host's coin (`dealPairs`). The **final** (×2) is the strongest pair with a shared
   question; the others play first, strongest first (`orderPairs`, O1). A room longer
   than three rounds goes round the pairs again in order, each time with a new
   question, timed so its last round is the final pair (`roundPairs`, O2). Both screens
   play the deal to one clock: the grid of strengths (yours down the side, theirs
   across the top), the three pairs lighting up, the grid shrinking away and each
   pair drawn out of its cell — **one card in both colours** where a question tests
   both, **two cards** where a coin will decide — then the question cards dropping on
   top, the names under them, and who struck what. A tap skips it to its last frame,
   which holds through Round 1's count-in.
4. **The questions.** A paired round's question is drawn at the deal from those
   tagged with both cards, leaning toward the battle's difficulty as every battle draw
   does (`drawRound`). A **coin round** is settled **when it comes up**: the host
   tosses the coin between the two cards, draws a question on the winner (falling back
   to the other card, then to the whole exam — *Any topic*), swaps it in for the
   stand-in the round was created with, and holds the count-in back `COIN_MS` so the
   toss can be watched. Both screens play the same toss and land on the same card.
   Never the same question twice. The round's card shows what it's on as chips: the
   pair in the players' colours (yours first), or the one topic the coin chose.

How often a coin decides depends on the bank: measured, on random hands, most rounds
(71% on Exam P, 89% on MAS-I — `docs/quiz-battle-redesign.md` §4).

The **same-screen** battle has no draft (O5): two players at one device would see
each other's hands, and the buzzer race is drawn from the whole exam as before.

## How it's built

| Piece | File |
|---|---|
| The game: rules, scoring, reducer, summary, question draw — pure, tested | `quiz/src/lib/battle.ts` |
| Colours, names and the words a round is told in — pure, tested | `quiz/src/lib/battleDisplay.ts` |
| The setup form's state and its localStorage — pure, tested | `quiz/src/lib/battleSetup.ts` |
| The topics an exam offers — pure, tested | `quiz/src/lib/battleTopics.ts` |
| The draft: a hand, a strike, the pairing and its order, a round's question, the draft as it travels and its clocks — pure, tested | `quiz/src/lib/battleDraft.ts` |
| The draft's outside reads: the concept pages a pair's strength is read off (the wiki bundle, fetched when a room is hosted) and the player's own levels | `quiz/src/hooks/useBattleDraft.ts` |
| Room codes, the wire protocol and its validation — pure, tested | `quiz/src/lib/battleRoom.ts` |
| The host and guest sessions — framework-free, tested over an in-memory channel | `quiz/src/lib/battleSession.ts` |
| The channel itself: Supabase Realtime broadcast (and presence, for the lobby), or BroadcastChannel | `quiz/src/lib/battleTransport.ts` |
| The lobby's rules: entries, the queue, the pairing, the handshake messages — pure, tested | `quiz/src/lib/battleLobby.ts` |
| One player's end of the lobby, and presence over a plain broadcast — framework-free, tested over an in-memory channel | `quiz/src/lib/battleMatchmaking.ts` |
| The queue away from the lobby: its rules (pure, tested), the store holding the session, and the pill | `quiz/src/lib/battleQueue.ts`, `quiz/src/stores/battleQueueStore.ts`, `quiz/src/components/BattleQueueButton.tsx` |
| The music, as notes — pure, tested | `quiz/src/lib/battleMusic.ts` |
| The music, played on the app's audio graph | `quiz/src/lib/battleMusicPlayer.ts` |
| Hooks: the local battle's clock, an online session, a lobby session, the music, `useNow` | `quiz/src/hooks/useBattle.ts` |
| The page: the way in, the setup, joining, the lobby, and which battle to show | `quiz/src/pages/Battle.tsx` (lazy) |
| The Deck's facts: the hand of modes, a setting stepped on, each round's points, the lost round to practise — pure, tested | `quiz/src/lib/battleDeck.ts` |
| The intro's once-per-visit flag | `quiz/src/hooks/useBattleIntro.ts` |
| The screens — the Deck, Quiz Battle's own look | `quiz/src/components/battle/deck/` (`DeckIntro`, `DeckHome`, `DeckLobby`, `DeckRoom`, `DeckLocal`, `DeckDraft` (draw, strike, deal), `DeckCoinFlip`, `DeckRound`, `DeckQuestionCard`, `DeckResults`, and their parts in `DeckParts`) |
| The screens — Monte Carlo Station's look | `quiz/src/components/battle/` (the lobby is `Matchmaking.tsx`; the draft and the coin are the Deck's, in a Deck scope of their own) |
| The battle's own styles: its motion, the Deck's tokens, and its Tailwind utilities, all in the lazy chunk | `quiz/src/components/battle/battle.css`, `quiz/tailwind.battle.config.ts` |

### The engine

`battleReducer(state, event)` is the whole game. Events are `tick`, `buzz`,
`answer`, `ready`, `next` and `forfeit`, each carrying the time it happened —
the reducer never reads a clock, so every rule is pinned by a test with made-up
times. An event the rules don't allow (a buzz out of turn, a second answer, a
choice the question doesn't offer, anything after the end) returns the state
**by identity**, which is how a caller knows nothing happened and there is
nothing to redraw or send.

A round runs `countdown → open → (buzzed → open …) → revealed`. `deadline` is
always the moment the current phase runs out: the round clock while it's open,
the answer window while someone holds the floor. Buzzer rounds are scored as
they go (a miss is public at once — the option is struck through, so the steal
knows what not to pick); simultaneous rounds are scored together at the reveal,
because the fastest-answer bonus needs both answers.

### Online: one host, one truth

The device that creates the room **hosts**. It runs the draft, deals the
questions and tosses the coins, runs the reducer on its own clock, and is the only copy of the battle
that counts. The device that joins sends what its player does — its hand, its strike, an
answer, Ready, a rematch request, a reaction — and draws the last room the host
sent it. There is no server logic and no table: the two devices talk over a
broadcast channel named after the code, and when both leave, the room is gone.

A room moves through `lobby → drafting → playing → finished`, and a rematch
goes back to `drafting`. `openDraft` opens it (the lobby's Start, a matched
room's intro, a rematch); the host closes the draw and the strikes, deals, and
starts the battle when the deal's clock is up. The room carries the **draft**
(`BattleDraft`: the counts, hands and levels, the strikes, the grid, the pairs
and every round's coin), kept through the battle it dealt so each round can show
its pair; a hand or strike sent for an earlier battle in the room (`game`) is
ignored. A coin round is created with a stand-in question, and the host — after
the reducer, so its rules are untouched — swaps in the question the coin drew
and moves the round's clock on by `COIN_MS`.

- **Every change is sent as the whole room** (`t: 'room'`) — players, settings,
  the battle — and re-sent every 2 s as a heartbeat. A message lost on the way is
  repaired by the next one; there is nothing to replay.
- **The other player's answer is redacted** until the reveal (`redactFor`): the
  room says *locked in*, not *what*. The host's own screen is drawn through the
  same redaction, so neither side can see the other's pick early.
- **Two clocks.** A room carries the host's clock at `sentAt`; the guest moves
  every moment in it onto its own clock by the difference on arrival
  (`shiftClock`). The guest times its own answer from the moment the question
  appeared *there*, so the time a room takes to arrive isn't the player's — and
  the host keeps a round open **1.5 s past its clock** (`ONLINE_GRACE_MS`) for a
  last-second answer still in flight.
- **The guest draws on its own clock** (`displayPhase`): a question opens the
  moment its count-in is up there, and a question whose time is up shows
  "revealing…" until the host's reveal arrives, rather than guessing a result.
- **Nothing sent is trusted.** A broadcast channel is public to whoever knows the
  code, so every message is parsed field by field, with caps on every string
  and array (`parseMessage`, `parseBattleState`), or dropped. Reactions are a
  fixed set of six emoji. An avatar that is an image URL is never fetched from
  the other side — only the app's own animal and colour avatars are drawn.
- **Presence.** Each side pings every 2 s; silence for 8 s is a dropped player.
  The host is offered *End battle* (the absent player forfeits) and can keep
  waiting instead. A player who reloads keeps their seat: a tab's id is kept in
  `sessionStorage`, so the host recognises them and sends the room again.
- **Answers, a hand, a strike and Ready are re-sent** with each heartbeat until
  the host's room shows them — a broadcast has no receipt — and the host ignores a
  repeat. A hand is held to the exam's own topics, four at most (`cleanHand`), and
  a strike to a card in the other player's hand, whatever arrives. The coin's
  result rides in the room like everything else the host decides.
- **Abilities** travel as one more move (`{ kind: 'power', round, ability }`),
  re-sent like an answer until the host's room shows it spent; the loadouts, what
  each seat has spent and a pending Reinsurance ride in the room, capped and
  parsed like the rest.
- **Versions.** Messages carry `PROTOCOL_VERSION` (2 since the topic pick, 3 since
  abilities, 4 since the pairs draft), and a guest refuses a room
  whose questions its own bundle doesn't have (the two devices run different
  deploys): both are told to reload.

### The channel

In production it is a **Supabase Realtime broadcast channel**,
`quiz-battle:<CODE>`, on the client the app already has — no migration, nothing
stored, and a signed-out reader can play (the anon key is enough for a public
broadcast channel). If the project ever turns on Realtime Authorization for
private channels only, online battles stop connecting (the guest is told the
server couldn't be reached); same-screen battles are unaffected.

With **`VITE_BATTLE_TRANSPORT=local`** the channel is the browser's
**BroadcastChannel** instead — two tabs of one browser play each other. That is
how a dev server with no Supabase project plays online, and how the e2e suite
does (`playwright.config.ts` sets it).

Room codes are four characters from a 31-symbol alphabet with no 0/O or 1/I/L
(~920,000 rooms). A third device that tries to join a room with two players is
told it's full.

### Matchmaking: a random opponent

**Random opponent** puts the player in a lobby — one more public channel,
`quiz-battle:lobby` — with the exam they want to play, or *Any exam*. On Monte
Carlo Station, walking in doesn't queue anyone: the player sees who is waiting and
chooses their exam, and joins the queue only by pressing **Ready** (and leaves it
with **Cancel**). On the Deck the start screen's *Find an opponent* is the Ready, and
*Leave the lobby* the Cancel.
Everyone in the queue sees everyone else (name, avatar, exam, how long they've waited), and the
first compatible player to arrive is the match. Nothing about it is stored
either: the lobby is presence on a channel, and a matched pair go on to an
ordinary room with a code nobody had to type.

- **Ready is the queue.** A player who isn't ready watches the lobby like an
  observer — nobody sees them, an offer to them is declined — and pressing
  Ready takes a place at the back of the queue (`since` is the moment it was
  pressed; `setReady` in `lib/battleMatchmaking.ts`). Cancel withdraws any offer
  in flight and takes the entry down. A new name (a new entry) keeps the choice;
  on Monte Carlo Station every fresh way into the lobby, *Find a new opponent*
  included, starts not ready. On the Deck, walking in *is* pressing Ready — *Find an
  opponent* and *New opponent* both queue the player — and *Leave the lobby* is
  Cancel; the rule underneath is the same.
- **The queue outlives the page** (`lib/battleQueue.ts`,
  `stores/battleQueueStore.ts`). The lobby session is held by an app-level
  store, not the lobby screen: a player who leaves the lobby *not* ready leaves
  the lobby with it, as before, but a ready one keeps their place. A **Return
  to lobby** pill (`components/BattleQueueButton.tsx`, in the resume dock beside
  the *Return to quiz* pill) follows them with how long they have waited and
  offers **Return** (the same lobby, still ready — *Find an opponent* and the
  battle page's own mount pick the held session back up) or **Leave**. A match
  found while they are away is kept by the store and fetches them to the battle
  page they queued from, which picks it up once the bank is loaded. Starting any
  other battle — one screen, a room, a code — gives the place up.
- **Nobody picks anybody.** Every device in the lobby computes the same pairing
  from the same list (`planMatches` in `lib/battleLobby.ts`): down the queue,
  oldest first, each player with the next compatible one behind them. Two
  entries are compatible when they ask for the same exam or either says any.
  The **older** of a pair hosts, and the battle is played on the host's exam,
  else the guest's, else one drawn at random.
- **A handshake seals it** (`lib/battleMatchmaking.ts`): the host sends an
  `offer` (a fresh room code, the exam), the guest answers `accept`, the host
  says `go`, and both leave the lobby for the room. Two devices can see the
  lobby differently for a moment, so this is what keeps a player out of two
  rooms: a player holds one offer at a time and `decline`s the rest, a host
  `cancel`s an offer it no longer needs, and the host only opens the room on an
  accept. Every step can lapse — an offer unanswered in 3.5 s, an accept with no
  go — and a lapse just puts the player back in the queue; a player who never
  answers is passed over for 15 s, so a frozen tab can't hold the queue up.
- **A matched battle has fixed settings** — three questions, 2:00 each, a mixed
  draw (`MATCH_ROUNDS`, `matchSettings` in `lib/battleSetup.ts`). Two strangers
  can't negotiate a length — but they do draft. Nobody presses
  Start: both screens show the two players (`MatchIntro`) for 1.8 s and the
  draft follows. A host whose
  opponent hasn't walked into the room in 15 s is told so and offered someone
  else. At the end, *New opponent* (*Find a new opponent* on the station) goes
  straight back to the lobby.
- **An empty lobby says so.** The way in watches the lobby without joining it
  (an *observer* session: it counts, never matches) and the Random opponent
  card reads *No one's in the lobby right now* or *3 players waiting now*.
  Inside, an empty list says *No one else is in the lobby right now*, that the
  player will be matched the moment someone joins, and offers a room for a
  friend instead. Players waiting for a different exam are listed with a
  *Play Exam MAS-I* button that switches to theirs — and changing exam keeps the
  player's place in the queue (`since` is kept).
- **Presence.** In production it is Supabase Realtime's own presence on the
  lobby channel, keyed by the tab's id (`supabaseLobbyTransport`). The
  BroadcastChannel build has none, so `presenceOverBroadcast` emulates it: each
  device re-announces itself every 1.5 s, says goodbye on leaving and forgets
  anyone silent for 5 s. The tests run on the same emulation.
- **Nothing sent is trusted**, as in a room: every entry and handshake message
  is parsed and capped (`parseLobbyEntry`, `parseLobbyMessage`), and an entry
  from another `PROTOCOL_VERSION` is dropped — two deploys that can't play each
  other shouldn't be matched.

## The screens

Quiz Battle's own page is drawn as **the Deck** — a card table on a dark ground
(`docs/quiz-battle-redesign.md`, phase 1, and its canvas). Monte Carlo Station keeps
its own look and the screens it always had (*Skins* below); the skin's `deck` flag
says which.

- **The intro** (`DeckIntro`): full screen, about 3 s, once per visit to `/battle`
  (`useBattleIntro` — a visit is a history entry, so moving between the page's own
  screens, or Back to an entry already seen, doesn't replay it). A deck drops in and
  fans out, two cards fly up and flip — yours and the rival's — clash, and the title
  comes up. A tap skips it; under reduced motion it is a short fade of the title.
- **The start screen** (`DeckHome`): back, the title, the exam shown as a deck
  (*Exam P deck*, *Change exam* opening the exams), and the three ways in as a hand of
  cards — *Random opponent* raised in the middle, *Same screen* and *A friend* tilted
  either side. Tapping a card raises it, and the button under the hand follows it
  (*Find an opponent*, *Play on this device*, *Create a room*). Under it, the lobby's
  count, live, as before. The trophy and the record are phase 3's.
- **The lobby** (`DeckLobby`): *Find an opponent* is the Ready — the player walks in
  queued, and *Leave the lobby* is Cancel. The table shows their card against a
  face-down one shuffling, with *Finding an opponent · 0:18*, the exam, the length and
  the time; the Deck row picks the start screen's exam or *Any exam*; anyone waiting on
  another exam is named with a *Play Exam MAS-I* button. **Browse while you wait**: a
  row of the exam's concept cards (the flashcard tile, its foil the player's level; no
  levels signed out), *See all* for every one, each opening in the concept popup above
  the lobby. Browsing touches nothing about the queue — the lobby stays mounted under
  the popup, heartbeat and all — and a match unmounts the lobby, closing the popup.
- **The friend room** (`DeckRoom`): *Host | Join*. The host's room opens at once — its
  code as four playing cards, *Send the code* (the share sheet, or the link copied),
  the two seats (an empty one blinking), and **Settings**: questions and time each step
  on with a tap, the exam opens the exams (the room's `setConfig`, open until the
  battle starts). The button reads *Waiting for your friend*, disabled, until the seat
  fills, then *Start battle*. *Join* is four empty card slots to type the code into,
  and the name to sit under. The friend's view is the room with its settings, waiting
  for the host.
- **Same screen** (`DeckLocal`): the phone split for two people facing each other —
  player 2's half turned 180° at the top, player 1's at the foot, each with their card
  and name — and a middle strip with back, **Deal**, and the settings chip (exam,
  length, time, difficulty). In the battle each half is that player's buzzer: tap
  anywhere on it to buzz, and it becomes their answer pad, turned to face them. **A**
  and **L** still buzz from a keyboard.
- **Draw 4** (`DeckDraft`): the step header **Draw · Strike · Deal** and the clock;
  *Draw 4 topics* and the other player's hand as face-down pips filling as they draw;
  your hand as four slots (*Your hand · 3 of 4*); the exam's topics as flashcard tiles
  under the syllabus's groups, with a search; and *Lock in my hand*.
- **Strike one** (`DeckDraft`): both hands on the table, theirs along the top fanned
  like a hand of cards, each with its holder's level; the discard in the middle
  (*Drag one of Sam's cards to the discard* — *Or tap a card, then tap Discard.*);
  *Sam is picking one of yours to strike*, then *Sam has struck one of yours*; and
  *You'll both see the strikes once both are in*.
- **The deal** (`DeckDraft`): *The deal*, the grid and its pairs lighting up (*R1*,
  *R2*, gold *×2*, *flip* for a pair no question covers), the pairs drawn out as cards,
  the question cards (*tests both* or *coin flip*) and the names under them, the
  subtitle turning to *Sam struck Pure Premium. You struck Cape Cod Method.*, then
  *Round 1 in 3*. A tap skips to the last frame.
- **The coin flip** (`DeckCoinFlip`): at the start of a coin round, *Coin flip*, the
  two cards either side, the coin tossed between them with a topic on each face; it
  lands, the winning card lifts and the other dims, *Round 2 is on* and the topic, then
  *Question in 3*.
- **A round** (`DeckRound`, `DeckQuestionCard`): the rival's strip at the top (card,
  name, score, *Locked in* with a face-down card once they have answered), the question
  card — *Round 1 of 3* (*Final ×2* in gold), the round's pair as chips in the
  players' colours (or the coin's one topic), a fuse along the top for the clock, the stem, the options as rows each led by
  a playing-card index — and this player's strip and the lock-in at the foot, held in
  reach under a long question. An option is chosen, then locked in (*Lock in A*). At the
  reveal: who got it and what it was worth, the reactions, and the way on.
- **The results** (`DeckResults`): the winner's card in foil, marked *Winner* (both
  cards on a draw), the score (*473 to 295*), each round with its pair and what each
  player took, then **the round you lost** — the weakest topic of the rounds lost (a
  paired round offers either card), by the player's own level (`weakestLostTopic`) — with **Practice**, a quiz
  on it through the quiz builder's concept launch (`practicePath`). Then *Rematch Sam*,
  *New opponent* (a matched battle; *Leave room* in a friend's room, *Change settings*
  on one screen), and *Review questions*, the battle question by question.

Monte Carlo Station's screens are as they were:

- **The way in** (`pages/Battle.tsx`): *Random opponent* first, with how many
  are waiting (or that nobody is); then *Same screen* and *A friend online*
  (create a room, or join with a code); and the rules. An invite link,
  `/battle?join=CODE`, opens straight onto joining (on either skin).
- **The lobby** (`Matchmaking`): the player's own tile under a radar pulse in
  their colour (only once they're ready), what they're looking for and how long
  they've waited, the exam pills (*Any exam* first), the **Ready** button (Cancel
  once pressed), and who else is here — or the empty state.
- **Setup** (`BattleSetupForm`), **the battle**
  (`BattleScoreboard`, `BattleQuestionCard`, `BattleActionBar` with its buzzers and
  answer pad) and **the results** (`BattleResults`: the winner in foil, paper
  confetti, both players' stats, Rematch, and the battle question by question).

Online, both players can send a reaction (🔥 👏 😅 🤯 😤 🎉) at any time; it floats
up off the sender's panel on both screens.

### Colour

The two players are **sky** (first) and **fuchsia** (second) — who, never how it
went. Both stay off the meaning map: green and red are what the options are
painted at the reveal, amber is caution and orange is the streak flame. They are
the two ends of the foil gradient, and `lib/battleDisplay.ts` hands them out the
way `examAccentStyle` hands out an exam's hue (`playerAccentStyle`: `--player`,
`--player-muted`, `--player-soft`, `--player-vivid`). See style guide §2.3, *Player colours*.

### Sound

A battle has its own cues, written into the catalogue by the rules of
`docs/sound-design.md` (one key, round and short, a wrong answer silent) and
pinned by `soundConfig.test.ts`'s *battle cues*:

| Cue | When |
|---|---|
| `begin` | Start |
| `countIn` | each number of the count-in — a dry, level G4, like a clock |
| `launch` / `go` | the first question laid down / every one after (`go` is the count-in's octave, an answer to it) |
| `buzz` | a buzz: a rising fourth over a low glide, the loudest press in the app |
| `select` | an answer on the pad, same screen |
| `lockIn` | your answer locked in, online — a latch, quieter than a right answer |
| `power` | an ability armed — a rising latch, D up to G, softer than `lockIn` |
| `opponentIn` | the other player locked in — two soft knocks, no pitch, so it can't be mistaken for a verdict |
| `correct` | a right answer, climbing with a run — on one screen anyone's, online your own |
| `steal` | a steal: a rising line that tops `correct`, because it's the best moment in a buzzer battle |
| `clockTick` | each of the last five seconds of a round, the draw or the strikes — noise only, throttled |
| `reaction` | the other player's emoji arriving |
| `matchFound` | the lobby found an opponent |
| `deal` / `tick` | a card drawn into your hand / put back; on the deal, each card laid down — paper and a knock, no note |
| `lockIn` / `opponentIn` | your hand locked in / the other player's hand, or strike, in |
| `strike` | a card struck onto the discard — paper sliding off and a low thud, dry, no melody |
| `shuffle` | the deal begins |
| `coinToss` / `coinLand` | the coin flicked up — a click and a brush / landing on a card — a knock and a level G–D, under a right answer, since it picks a topic, not a winner |
| `complete` | the results |

A wrong answer, a missed buzz and a lost round are silent, as everywhere; a miss
only ends the climb.

### Music

A battle has a soundtrack (`lib/battleMusic.ts` writes it, `lib/battleMusicPlayer.ts`
plays it): soft, slow — 84 bpm — and there mostly to be noticed when it changes.
It is generative: an eight-bar harmony (C, Am, Dsus, G6, Am, C, G6, Dsus) under a
marimba line drawn fresh each beat, so a long session never hears the same loop.
It moves between three intensities, chosen by `battleMusicIntensity` in
`lib/battleDisplay.ts`:

| Intensity | When | What plays |
|---|---|---|
| **Calm** (0) | the lobby, a room waiting to start, a reveal | pads, a low bass, a sparse line |
| **Play** (1) | a count-in, a question up, the draw, the strikes, the deal | a soft pulse on beats one and three; the line fills in |
| **Pressure** (2) | the final question, the last 10 s (of a question, the draw or the strikes), someone holding the floor | the pulse on every beat, a busier line, a shaker on the off-beats |

It keeps the catalogue's rules, so a cue landing on it can't clash: every note is
from C major's pentatonic, nothing that sustains sits above 1 kHz, and the bus
sits about 9 dB under a right answer, through a low-pass and into the same room.
It fades in over 2.5 s, stops with the app's mute, for its own switch (the ♪
button in a battle's top row and the lobby — `actuarial-notes-battle-music`),
and while the tab is hidden. One player serves the whole app, driven by one
number: a screen asks for an intensity with `useBattleMusic`, and a screen
handing over to the next (lobby → match → results) doesn't drop it, because a
release waits half a second before it stops. The results are silent but for
`complete`.

### Motion

`components/battle/battle.css` — the battle chunk's own stylesheet, so first paint
doesn't carry it (the confetti it shares with the Pro celebration stays in
`index.css`): the count-in pops, won or lost points float off the
score, a buzz flares a ring in the player's colour, a wrong buzz shakes the
player's tile once, reactions float up, and confetti falls once. Each marks a thing
that happened; under reduced motion each has a static end state, and no
information is carried by movement alone.

The Deck's motion is cards on a table, and each runs once: the intro, a card dealt
onto the table, the raised mode card's float and sheen, the winner's card tilting,
a struck card dragged to the discard, the deal, and the coin. The deal and the coin
are drawn to the round's clock on both screens — each piece rests on its last frame
and animates into it with a negative delay, so a screen that arrives late starts
where the other already is, and skipping the deal just takes the animations away.
The coin can't be skipped; it is short.
Only the waits loop for as long as the wait lasts — the lobby's face-down card
shuffling, an empty seat blinking. Under reduced motion the intro is a short fade and
the rest stand still. The Deck's colours are tokens on its scope (`.battle-deck`, under
`dark`), its Tailwind utilities are generated into the same lazy stylesheet under a
`.battle-css` scope (`tailwind.battle.config.ts`) so they can't override the app's own,
and nothing on the page has a `view-transition-name`: the page's screens move with
`moveScreen`, as before.

## Skins: Monte Carlo Station

The same page is also **Monte Carlo Station**, Actuaria Online's way into a battle
(`/actuaria/battle`, `docs/actuaria-online.md` §6.8): `pages/Battle.tsx` with
`skin="actuaria"`. A skin changes chrome and words, never the game — the reducer,
the scoring, the sessions, the lobby and its handshake, the cues, the music and
*nothing is saved* are the same under both.

- **The words and the chrome are data** (`lib/battleSkin.ts`, read through
  `hooks/useBattleSkin.ts`): the ways in are *Open channel*, *Dogfight* and *Private
  channel*, each carrying Quiz Battle's own name beneath it; the setup's exam picker
  lists sectors, with an exam that has no raceable questions disabled and the
  reason given rather than hidden; the question sits in a HUD frame; the logo is the
  Actuaria mark; the way back leads to the star map. The components read the skin,
  so they have no `if (actuaria)` branches of their own — the one switch is the skin's
  `deck` flag, which draws Quiz Battle's own page as the Deck. Player colours are
  untouched: sky and fuchsia are still the only colours a player's tile, buzzer, pad
  or score wears.
- **The two skins play each other.** A room's code is its channel's name, so a room
  made at the station can be joined from `/battle` and the other way round; only the
  invite link says which page to open it on (`skinJoinPath`). The lobby pairs players
  on either page.
- **Review my misses** (the *claims review*) is the one thing the Actuaria skin adds
  to the results: the questions this device's own player got wrong or left
  unanswered (`missedQuestionIds` — online, this device's seat; on one screen, the
  first seat, the account holder's), opened as an ordinary quiz by id. The battle
  still saves nothing; the review is a quiz, and saves as one.
- **Abilities** are the station's too (`skin.abilities`): the host's setup offers
  the room setting, and the page passes in the Hangar loadout, cut to what the
  concepts that unlock them hold when the battle starts (`battleLoadout` in
  `lib/actuaria/abilities.ts`). The tray (`components/battle/AbilityTray.tsx`)
  sits above the answer pad in `BattleActionBar`. A room made at the station with
  abilities on can still be joined from `/battle`: that player simply brings none.
- **Cohort Clash** is a private room like any other. `?host=1` opens the page on the
  room's setup, and `onRoomOpen(code)` tells the page's owner the code once the room
  exists — the station hands it to the challenged cohort member in-app
  (`actuaria_challenge`). Only the code is stored, for half an hour; the battle, as
  ever, saves nothing.

## Testing

- `lib/battle.test.ts` — the rules: the clock's boundaries, buzzing, the answer
  window, steals and their minimum, simultaneous lock-ins, the grace period,
  Ready, runs, the final-round doubling, the summary, redaction, the clock shift;
  and every ability and every disallowed use of one, with the worked example of
  `docs/actuaria-online.md` §7.2 (183 → 195 → 390) as a fixture.
- `lib/battleTopics.test.ts` — the topics a question tests, and the catalogue in
  the syllabus's order (and without one).
- `lib/battleDraft.test.ts` — a hand cleaned, toggled and topped up; a missed
  strike's card; the pairing (coverage before strength, no card twice, a dead heat
  to the coin), the order and the final, a longer room's rounds, a round's question
  and its fallbacks, the pair reader (and a concept paired with itself), redaction
  of hands and strikes, the clocks, and a round told as chips and topics.
- `lib/battleDraftVault.test.ts` — drafts played on every raceable exam's real bank:
  three pairs from every deal, no question twice over ten rounds; and, with
  `BATTLE_DRAFT_MEASURE=1`, the share of rounds a coin settles
  (`docs/quiz-battle-redesign.md` §4).
- `lib/battleRoom.test.ts` — codes, and that every malformed message is dropped
  rather than thrown on — a draft in each phase (a hand short of four, a strike while drawing, a deal
  before dealing), the hand and strike moves, the old pick, and abilities' moves and
  fields included, and the old protocol refused.
- `lib/battleSession.test.ts` — a host and a guest over an in-memory channel with
  a JSON round trip: joining, a full room, a code nobody hosts, a version
  mismatch, redaction on the wire, latency compensation, a lost answer resent,
  Ready, forfeits, a dropped player, a reload keeping its seat, rematches,
  reactions — and the draft: opened for two, the other's count crossing and their
  cards not, each hand and strike hidden until both are in, the deal, the battle
  started on it, a coin round's coin tossed when it comes up and seen alike on both
  screens, short hands topped up, a last-moment hand given its grace, a missing
  hand dealt and a missed strike made, a hand held to the exam's topics and a strike
  to the other's hand, a lost hand and strike resent, a stale one ignored, a longer
  room round the pairs again, a rematch's fresh draw.
- `lib/battleDisplay.test.ts`, `lib/battleSetup.test.ts` — the words, the music's
  intensity for each moment of a round, and the stored setup, including that both
  player hues keep clear of the meaning map.
- `lib/battleLobby.test.ts` — entries and messages validated or dropped, the
  queue order, compatibility, the pairing (and that every device agrees on it
  however the lobby is listed), the matched exam.
- `lib/battleMatchmaking.test.ts` — sessions over an in-memory channel with the
  emulated presence: an empty lobby, an observer's count, a player leaving or
  going quiet, a change of exam keeping the queue place, two players matched
  into one room with the older hosting, a crowd paired off with nobody in two
  rooms, a frozen tab passed over, a lost offer, an observer never matched.
- `lib/battleMusic.test.ts` — the score's rules: every note in the key, nothing
  sustained above 1 kHz, the form, and each intensity busier than the last.
- `lib/soundConfig.test.ts`, *the battle cues* — round and short, the moments
  louder than what sits under them, no cue for a miss.
- `lib/battleSkin.test.ts` — the two skins' words, and that each invites a friend to
  its own page.
- `lib/battleDeck.test.ts` — the hand of modes and a raised card, a setting stepped on,
  each round's points, the rounds a player lost, the weakest of them by level, the
  Practice address and a round's name.
- `e2e/battle.spec.ts` — every Deck screen: the intro (skipped with a tap, ending on
  its own, not replayed in the same visit, a fade under reduced motion), the start
  screen's hand and its exam, a same-screen battle played to the end on the halves
  (buzz, miss, steal on the pad, the results' rounds, the lost round's Practice,
  Review questions, rematch), a friend room (the code as cards, its settings, Join and
  back to Host) and an online battle between two pages over BroadcastChannel (invite
  link, the full draft — the other's pips, four each, the strikes hidden until both
  are in, a deal of one paired final and two coin rounds read off the vault, the
  deal on both screens and skipped — each coin landing alike on both screens, the
  rounds' chips, hidden lock-ins, reveals, Ready, results, a rematch asked for and
  back to the draw), the empty lobby
  said so on the way in and browsed in — a concept card open in the popup while the
  player stays queued, as another page sees — and two strangers matched from the
  lobby (the popup closing on the match), through the draft, into a three-question
  battle and sent back to it with *New opponent*; a battle
  across the two skins — hosted at Monte Carlo Station, joined from Quiz Battle —
  with the claims review on the station only and nothing saved on either, and the
  lobby pairing a player on each page; and a private room with abilities on. It runs with
  the app muted: a headless browser with no audio device can trap in its audio
  output thread under a battle's run of cues, and nothing it asserts is about
  sound.

## Next

The redesign (`docs/quiz-battle-redesign.md`, roadmap X10) has shipped its first two phases,
the look and the flow and the pairs draft above. Measured on the bank, a coin settles most
rounds (§4 there); marking the strongest pairs on the draw screen is proposed (O9). Next, if
D36 is decided that way, is phase 3's battle record, rating and leaderboard for signed-in
players.

Ideas deliberately left out so far: more than two players (the engine's seats
are a pair throughout); a battle on the written CAS papers (it would need
self-grading both players can trust); sudden death on a draw; a battle history;
and a rating for
matchmaking to pair on — the lobby pairs on the exam alone, because a rating
would have to be stored, and nothing about a battle is.
