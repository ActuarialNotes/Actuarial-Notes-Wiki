# Quiz Battle

Two players, the same questions, one scoreboard. A battle is a short race — 3,
5, 7 or 10 questions from one exam's bank — where a fast right answer scores
more than a slow one, a run of right answers scores more again, and the final
question counts double so a battle is never over before its last question.

It lives at **`/battle`**, opened from the **Quiz Battle** card at the top of the
Quiz tab (the same slot, grid and 48px tile the Study Guides tab gives its
general guide, so the two tabs' exam lists still line up). The route is a sheet
laid over the Quiz tab (`deskPlace` in `lib/viewTransition.ts`) and lights the
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
| Controls | buzz with **A** (left) / **L** (right) or the big buttons; answer with **1–5** or the answer pad | answer with **1–5**, the options, or the answer pad; **Enter** for the next question |

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
| Time per question | *Blitz* 1:00, *Standard* 2:00, or *Exam pace* — the sitting's own time per question, from the table the timed quiz reads (`lib/quizTiming.ts`: 6:00 on Exam P) |

A **streak** is right answers in a row by one player: a round they don't get
right (a miss, a pass, the other player taking it) ends it. Three in a row puts
the flame on the scoreboard. A **draw** is a draw — equal scores name no winner.

## Nothing is saved

A battle writes no mastery, no XP, no streak day, no quest progress and no
attempt history. On one screen the second player's answers are not the account's
answers, and online the other device's player may not have an account at all; a
battle is played, not studied. What is remembered is the setup
(`lib/battleSetup.ts`, localStorage): the exam, the length, the pace, the
difficulty, the names and the exam last asked for in the lobby, so the next
battle opens where the last one left off — and the music switch
(`actuarial-notes-battle-music`).

## How it's built

| Piece | File |
|---|---|
| The game: rules, scoring, reducer, summary, question draw — pure, tested | `quiz/src/lib/battle.ts` |
| Colours, names and the words a round is told in — pure, tested | `quiz/src/lib/battleDisplay.ts` |
| The setup form's state and its localStorage — pure, tested | `quiz/src/lib/battleSetup.ts` |
| Room codes, the wire protocol and its validation — pure, tested | `quiz/src/lib/battleRoom.ts` |
| The host and guest sessions — framework-free, tested over an in-memory channel | `quiz/src/lib/battleSession.ts` |
| The channel itself: Supabase Realtime broadcast (and presence, for the lobby), or BroadcastChannel | `quiz/src/lib/battleTransport.ts` |
| The lobby's rules: entries, the queue, the pairing, the handshake messages — pure, tested | `quiz/src/lib/battleLobby.ts` |
| One player's end of the lobby, and presence over a plain broadcast — framework-free, tested over an in-memory channel | `quiz/src/lib/battleMatchmaking.ts` |
| The music, as notes — pure, tested | `quiz/src/lib/battleMusic.ts` |
| The music, played on the app's audio graph | `quiz/src/lib/battleMusicPlayer.ts` |
| Hooks: the local battle's clock, an online session, a lobby session, the music, `useNow` | `quiz/src/hooks/useBattle.ts` |
| The page: the way in, the setup, joining, the lobby, and which battle to show | `quiz/src/pages/Battle.tsx` (lazy) |
| The screens | `quiz/src/components/battle/` (the lobby is `Matchmaking.tsx`) |

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

The device that creates the room **hosts**. It draws the questions, runs the
reducer on its own clock, and is the only copy of the battle that counts. The
device that joins sends what its player does — an answer, Ready, a rematch
request, a reaction — and draws the last room the host sent it. There is no
server logic and no table: the two devices talk over a broadcast channel named
after the code, and when both leave, the room is gone.

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
- **Answers and Ready are re-sent** with each heartbeat until the host's room
  shows them — a broadcast has no receipt — and the host ignores a repeat.
- **Versions.** Messages carry `PROTOCOL_VERSION`, and a guest refuses a room
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
`quiz-battle:lobby` — with the exam they want to play, or *Any exam*. Everyone
in it sees everyone else (name, avatar, exam, how long they've waited), and the
first compatible player to arrive is the match. Nothing about it is stored
either: the lobby is presence on a channel, and a matched pair go on to an
ordinary room with a code nobody had to type.

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
- **A matched battle has fixed settings** — five questions, 2:00 each, a mixed
  draw (`MATCH_ROUNDS`, `matchSettings` in `lib/battleSetup.ts`). Two strangers
  can't negotiate a length. Nobody presses Start either: both screens show the
  two players (`MatchIntro`) for 1.8 s and the count-in follows. A host whose
  opponent hasn't walked into the room in 15 s is told so and offered someone
  else. At the end, *Find another opponent* goes straight back to the lobby.
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

- **The way in** (`pages/Battle.tsx`): *Random opponent* first, with how many
  are waiting (or that nobody is); then *Same screen* and *A friend online*
  (create a room, or join with a code); and the rules. An invite link,
  `/battle?join=CODE`, opens straight onto joining.
- **The lobby** (`Matchmaking`): the player's own tile under a radar pulse in
  their colour, what they're looking for and how long they've waited, the exam
  pills (*Any exam* first), and who else is here — or the empty state. The name
  they appear under is editable above it; the account's name is the default.
- **Setup** (`BattleSetupForm`): the names (the account's own name and avatar
  for the first player), the exam, the length, the pace, the difficulty.
- **The battle**: the scoreboard pinned at the top (`BattleScoreboard`) — each
  player's tile, name, score (counting up), streak flame and what they're doing
  ("Buzzed in!", "Locked in", "Thinking…"), the round clock as a ring between
  them, and a tug-of-war bar underneath that is each player's share of the
  points. The question (`BattleQuestionCard`) in the middle. And a bar pinned to
  the foot (`BattleActionBar`): the two buzzers; the **answer pad** — the options
  as big letters in the answering player's colour, because on a phone a long
  stem pushes option E below the fold and a 10-second window is no time to
  scroll; and, once the round is over, what happened and the way on.
- **The results** (`BattleResults`): the winner, in their colour, wearing the
  rainbow foil a Level 3 card wears (earned, so the foil — style guide §4.3);
  paper confetti; both players' right answers, fastest and average right answer,
  best streak and steals; Rematch; and the battle **question by question** — who
  took each one, and the question itself, with both players' picks and the
  solution, a tap away. The battle is over, but the questions are still study.

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
| `opponentIn` | the other player locked in — two soft knocks, no pitch, so it can't be mistaken for a verdict |
| `correct` | a right answer, climbing with a run — on one screen anyone's, online your own |
| `steal` | a steal: a rising line that tops `correct`, because it's the best moment in a buzzer battle |
| `clockTick` | each of the last five seconds of a round — noise only, throttled |
| `reaction` | the other player's emoji arriving |
| `matchFound` | the lobby found an opponent |
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
| **Play** (1) | a count-in, a question up | a soft pulse on beats one and three; the line fills in |
| **Pressure** (2) | the final question, the last 10 s, someone holding the floor | the pulse on every beat, a busier line, a shaker on the off-beats |

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

`index.css`, "Quiz Battle": the count-in pops, won or lost points float off the
score, a buzz flares a ring in the player's colour, a wrong buzz shakes the
player's tile once, reactions float up, confetti falls once. Each marks a thing
that happened; under reduced motion each has a static end state, and no
information is carried by movement alone.

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
  so they have no `if (actuaria)` branches of their own. Player colours are
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

## Testing

- `lib/battle.test.ts` — the rules: the clock's boundaries, buzzing, the answer
  window, steals and their minimum, simultaneous lock-ins, the grace period,
  Ready, runs, the final-round doubling, the summary, redaction, the clock shift.
- `lib/battleRoom.test.ts` — codes, and that every malformed message is dropped
  rather than thrown on.
- `lib/battleSession.test.ts` — a host and a guest over an in-memory channel with
  a JSON round trip: joining, a full room, a code nobody hosts, a version
  mismatch, redaction on the wire, latency compensation, a lost answer resent,
  Ready, forfeits, a dropped player, a reload keeping its seat, rematches,
  reactions.
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
- `e2e/battle.spec.ts` — a same-screen battle played to the end (buzz, miss,
  steal on the pad, results, rematch), an online battle between two pages
  over BroadcastChannel (invite link, lobby, hidden lock-ins, reveals on both
  screens, Ready, results, a rematch asked for and started), the empty lobby
  said so on the way in and inside it, and two strangers matched from the lobby
  into a battle and sent back to it with *Find another opponent*; and a battle across
  the two skins — hosted at Monte Carlo Station, joined from Quiz Battle — with the
  claims review on the station only and nothing saved on either, and the lobby
  pairing a player on each page. It runs with
  the app muted: a headless browser with no audio device can trap in its audio
  output thread under a battle's run of cues, and nothing it asserts is about
  sound.

## Next

Ideas deliberately left out so far: more than two players (the engine's seats
are a pair throughout); a battle on the written CAS papers (it would need
self-grading both players can trust); sudden death on a draw; power-ups (a
"double down" armed before answering); a battle history; and a rating for
matchmaking to pair on — the lobby pairs on the exam alone, because a rating
would have to be stored, and nothing about a battle is.
