# Sound design

Every interaction in the quiz app makes a sound. All of it is synthesized at
runtime with the Web Audio API — there are no audio files, so the whole system
costs zero bytes of assets and every cue is tunable from one table.

Synthesized is not the same as *sounding* synthesized, though, and most of the
engine is there to keep the one from becoming the other: see "Why it doesn't
sound synthesized" below.

## The rules

1. **Interface feedback is quiet and short.** A press is ~15 ms and sits an
   order of magnitude below the celebratory cues.
2. **A click is a mouse button, not a note.** `click` is the two sounds a
   switch makes — the snap of the contact (a few milliseconds of bright noise)
   and the knock of the housing (a short hollow resonance around 1 kHz) — and
   nothing else: no oscillator, so no pitch to hear as a tone. It used to carry
   a falling sine "edge", and forty presses an hour of that sounded like a toy.
   `tick` is the same thing smaller and higher, a pen mark. Only weighty
   presses get a thud: a low sine that drops away inside 35 ms, too short to
   carry a pitch, which belongs to `press` — the solid `Button` variants (the
   committing actions: start, finish, save, delete). Stacked under every
   control instead, an afternoon of studying sounds like knocking on a desk.
3. **Panels and cards move on filtered noise, not tones.** The `open` /
   `close` / `page` / `ruffle` / `shuffle` family is a bandpass sweep over
   pink noise with a slow swell — it reads as a sheet of paper sliding, not as
   a beep. The louder a cue in this family is, the fewer times it fires: see
   "Stepping through a sequence".
4. **Success is struck, not beeped.** Every reward cue is a soft mallet on a
   wooden bar (see "Anatomy of a reward cue" below). It ascends, the notes ring
   a few times longer than the gap between them so they pile into a chord
   rather than a countdown, it *lands* on its loudest note, it has a low root
   under it for weight, and it sits in a small room.
5. **Two notes, not three.** Every chime in the catalogue is a pickup and an
   arrival. Nothing here is a melody — a cue is heard a few hundred times a
   week, and the third note is where one stops being a sound and starts being a
   jingle you can hum, which is the point at which it wears out. `levelUp` and
   `complete` used to walk up through the fifth (C–G–C); they now leap the
   octave and let the fifth enter underneath the landing as harmony instead.
   What separates a level-up from finishing a session is width and weight, not
   note count.
6. **Chimes are round, and short.** Between 1 and 3 kHz is where the ear is
   most sensitive, and a tone that *rings* there is what turns a chime from
   sweet to sharp. So nothing in a chime sustains above 1 kHz: the melody sits
   in the middle register (the ceremonies an octave under `correct` — weight is
   register, not brightness), the struck partials last a fifth of their note
   at a tenth of its level, there is no sparkle over the landings, and every
   chime is rolled off at 2.4–3.6 kHz. And they land and get out of the way:
   no chime takes more than a second to die (`correct` is gone in about a
   quarter of one), in a room small enough to be gone before the next
   question. The previous generation used bells — an octave and a twelfth held
   for a third of the note, sine sparkle an octave above, 1.5 s tails — and it
   read as metal. All of it is pinned by tests. Warm and a little subdued
   beats bright: bright is what a notification sounds like.
7. **Mistakes are silent.** There is deliberately no `wrong` cue. A wrong
   answer is already obvious on screen, and buzzing at someone who is studying
   is punishment, not feedback. `soundConfig.test.ts` pins this so it can't
   drift back in by accident. What a miss does instead is end the `correct`
   combo — the next right answer comes back at the pitch the run started from.
   The corollary: a quiz run with the answers held back for /review (reveal
   `'end'`, the builder's "Show answers after each question" unticked) plays no
   `correct` either — a chime on the right answers would give the verdict away
   as surely as the reveal it replaces. `pages/Quiz.tsx` gates it on the reveal.
8. **Loudness is the hierarchy.** `correct` fires forty times to `complete`'s
   one, so it sits below the ceremonies; the ceremonies sit below the
   session fanfare; the interface sits below all of it, and `ruffle` — the most
   repeated cue of all — sits under the interface. Pinned by a test, along with
   a headroom check: a fanfare is a dozen-plus oscillators in one bus, and it
   still has to clear the ceiling at full volume.
9. **Beginnings are shaped differently from endings.** `begin`, `launch` and
   `study` are the only cues that open something instead of closing it, so none
   of them resolves: see "The cues that start something" below.
10. **One moment, one sound.** Two cues for the same event don't read as richer,
   they read as a glitch — and the second chime is what turns a small win into
   something that sounds like it fired twice. A flow gets a cue per *thing that
   happened*, not per function call on the way there: see "Collecting a card".
11. **One key.** Cues overlap all the time — a press lands in a chime's tail, a
   level-up rings out over the session fanfare, a combo climbs over its own
   reverb — and two sounds that are each lovely alone can still be sour
   together. So every note in the catalogue is written from the pentatonic of C
   major (`KEY` in `soundConfig.ts`): C D E G A, the five notes with no
   semitone between any two of them. However the cues stack, no pair can
   clash. That goes for the interface too — a click's 30 ms edge falls D → A,
   the press body E → G — because a tick nobody hears as a *note* is still
   heard as a colour. A climb transposes its cue, so the upper rungs reach the
   rest of C major (`correct`'s fifth, walked up the pentatonic, touches B) but
   never leave it; every climbing cue is rooted on C for that reason. A
   struck note's own partials are exempt — they are its harmonics, consonant
   with it by definition. Pinned by a test, per recipe and per rung.
12. **Nothing plays the same twice.** The surest tell of a synthesizer is that
   it is perfect: the fortieth click of an afternoon used to be bit-for-bit the
   first. See "Why it doesn't sound synthesized".

## The pieces

| File | Role |
| --- | --- |
| `quiz/src/lib/soundConfig.ts` | The catalogue: every cue as plain data (tones, noise sweeps, envelopes, levels). Edit sounds here. |
| `quiz/src/lib/soundEngine.ts` | One AudioContext for the app, the synth that renders a recipe, the pink noise, the shared room, the soft-clipping output stage, the combo counters, and the enabled/volume store (localStorage-backed). The buffers and the output curve are pure functions (`pinkNoise`, `roomImpulse`, `softClipCurve`), tested in `soundEngine.test.ts`. |
| `quiz/src/lib/soundInteractions.ts` | Pure decision table: given a description of the pressed element, which cue plays. |
| `quiz/src/components/SoundEffects.tsx` | Mounted once in `App`. One delegated listener gives every control its press cue (see "When a press counts as a press"); also unlocks the AudioContext on the first gesture. |
| `quiz/src/hooks/useSoundEffects.ts` | `useSoundEffects()` (settings + `play`), plus `useSoundOnMount` / `useSoundOnToggle` for surfaces whose sound belongs to the surface. |
| `quiz/src/components/SoundSettingsCard.tsx` | Settings → Sound: on/off and volume. |
| `quiz/src/components/SoundPopover.tsx` | The sidebar popout beside the theme picker: mute + volume, reachable from any page. |

## Why it doesn't sound synthesized

A chime built from sine waves is a synthesizer whatever notes it plays. What
gives synthesis away is rarely the recipe; it's a handful of things real sounds
never do, and the engine removes each of them.

- **Attacks rise along a rounded curve** (`ATTACK_CURVE`, a squared
  quarter-sine). A Web Audio exponential ramp can't start from zero, so every
  envelope used to ramp up from 0.0001 — and an exponential from there spends
  almost all of its time inaudible, then jumps to full level in the last
  fraction of a millisecond. That was a hidden click on the front of every
  note and every burst of noise, whatever the written attack said. A straight
  line fixed that but still turned sharply where the rise met the decay; the
  curve leaves silence and meets the peak with no slope at either end, the
  soft edge of a felt mallet. Decays stay exponential: that's how anything
  struck dies away.
- **Noise is pink, and never read from the same place twice.** White noise has
  equal energy per hertz, so most of it sits in the top octaves; through a wide
  bandpass it is hiss. Pink has equal energy per octave — the tilt of paper,
  cloth and fingertips — and is far gentler at the same level. It's also read
  from a random point in a two-second buffer on every burst. It used to start
  at sample 0 every time, which made every click in the app the same few
  hundred samples: the machine-gun sameness a UI sounds like when it is a UI.
- **Every play drifts** (`playVariation`, `VARIATION`): up to ±0.8 dB in
  level, ±3 cents in pitch and ±80 cents in where the noise filters sit. The
  tuned part is on a very short leash — three cents is under what anyone hears
  as out of tune, and it moves the whole cue together, so the intervals inside
  a cue stay pure and overlapping cues stay in the key. The headroom test
  budgets for the loudest drift.
- **The room is small, and darkens as it rings** (`roomImpulse`, `ROOM`). An
  8 ms pre-delay, so the strike is heard before the walls answer it; an
  exponential decay (RT60 0.6 s — a study with a rug, not a hall), which is
  what a room does; and damping that closes from ~3.2 kHz to ~350 Hz across
  the tail, because in a real room the top end dies first. A tail with a
  constant spectrum is a plug-in; one that darkens is a place. The
  ConvolverNode scales every impulse response to the same power per sample,
  so a shorter room is also a quieter one — the sends were lowered with it.
- **Overlaps are rounded off, not clipped** (`softClipCurve`). Every cue clears
  the ceiling on its own, but a chime still ringing when the next lands can sum
  past it, and a wave clipped flat is the harshest sound digital audio makes.
  The output stage is a straight wire up to 0.8 of full scale and a tanh
  shoulder above it — not a compressor, so the loudness hierarchy is never
  squashed.

The catalogue was re-levelled around these: pink noise carries more body
through a paper cue's bandpass than white did, so the paper family's noise
gains roughly halved to keep each cue at (or a touch under) its old loudness.
Rendered offline in Chromium and measured against the previous engine, the
paper and press cues lost 3–8 dB above 5 kHz at matched loudness, and two
clicks in a row went from identical to about half-correlated.

## When a press counts as a press

A cue is feedback for something you did, so it may only sound once the press has
actually *done* it. On a mouse that's the same moment: a button-down on a control
has nothing else it can turn into, so the cue fires on `pointerdown` and lands
with the click, which is what makes it feel like a physical button.

A finger is not a mouse. The same touch-down is also how you scroll, drag and
swipe, and on a phone almost every square inch of the app is a control — so
flicking the page up from a syllabus row used to click at you for a row you
never opened. There, the listener holds the cue and asks `pressActivates`
(`lib/soundInteractions.ts`, pure and tested) at `pointerup`: a tap is a release
that lands back on what it pressed, having moved less than the platform's touch
slop (10px). Both halves are needed —

- **moved far, still on target** is a scroll: the content travels *with* the
  finger, so the row it started on is still underneath it at the end.
- **stayed put, released elsewhere** means the element moved or was covered, and
  the browser fires no click either.

A `pointercancel` — the browser taking the gesture over for a scroll,
pull-to-refresh or an edge swipe — drops the pending press outright.

The cost is that a touch cue arrives on release rather than on contact, which is
also where the tap's own effect arrives, so the two still coincide. The click
that follows a sounded tap is swallowed (`CLICK_ECHO_MS`), because browsers
disagree about the `detail` on a tap-synthesised click and that is the flag the
keyboard path is recognised by.

## Anatomy of a reward cue

The difference between a chime that feels like a reward and one that feels like
a notification is almost never the notes. It's five things underneath them, and
the reward family in `soundConfig.ts` is built from all five:

- **Struck, not faded in.** `strike(freq, …)` renders one note the way a soft
  mallet sounds on a marimba bar: a sine fundamental that carries almost
  everything, the octave at a tenth of its level for the first fifth of the
  note, and the double octave — a marimba bar's own overtone, the part the
  ear hears as *wood* — for its first few hundredths of a second. What makes a
  note read as hit rather than generated is its first few milliseconds, so
  that is the only place the partials are allowed; what rings afterwards is a
  plain round tone. Both are exact harmonics, so stacking several notes stays
  consonant.
- **A mallet.** `mallet()` puts ~16 ms of low, wide noise (1.1 kHz falling to
  500 Hz) at the moment of the strike — felt on wood, not a stick on metal. You
  don't hear it as its own event; without it the notes bloom out of nowhere
  and the cue loses its impact.
- **A landing.** Cues accent *toward* the last note and give it a `hold` — the
  arrival stays at full level before it decays. An even run at even volume is a
  scale exercise; a pickup into a held arrival is an announcement. `levelUp`
  and `complete` are the clearest case: one struck pickup, then the octave
  above it struck again and held, with the fifth entering underneath the
  landing as harmony rather than as a third event.
- **A low root.** A quiet sine an octave or two under the chord. Mostly felt
  rather than heard, and inaudible on a laptop speaker, but it's the difference
  between weight and a beep on headphones.
- **A room.** `space` sends the cue to a shared convolution reverb (a
  synthesized impulse response — a small room, pre-delayed, exponentially
  decaying, per-channel noise that darkens as it rings, built once). Dry
  synthesis always sounds like a phone UI; a big room makes every chime ring
  out over the next question. Reward cues use it lightly; interface and paper
  cues stay dry, because a tail on something pressed forty times an hour is
  mud.

## The combo

`correct` climbs. Consecutive right answers walk up `combo.steps`; a long
enough gap, or an explicit `resetSoundCombo('correct')`, drops it back to the
root. This is the app's answer to the oldest problem in game audio: a cue that
fires forty times an hour stops registering. It also quietly does the job a
buzzer would without the punishment — after a miss you *hear* the climb start
over.

**The climb has no top.** A ladder that caps is only a slower version of the
problem it was built to fix: get five in a row and every answer after the fifth
is the same sound again, which is where the old five-step climb ran out. But
you can't just keep going either — walk up far enough and the cue is shrill,
then inaudible.

The way out is that pitch is two things. A note has a *height* (which octave)
and a *chroma* (where in the octave — C, D, E…), and the ear will hear a climb
from chroma alone. So the ladder wraps at the octave and each play is sounded
**twice, an octave apart**, under a loudness window fixed in absolute
frequency: as the run walks up, the upper copy fades out of the top of the
window exactly as fast as the lower one fades in underneath. Chroma marches up
forever; height goes nowhere. This is a **Shepard tone** — the barber's pole,
the endlessly-rising staircase — and it means the twentieth right answer in a
row is still rising, in the same register the first one was in.

Three things keep it pleasant:

- **The rungs are the major pentatonic** (`[0, 2, 4, 7, 9]`) — the scale with no
  wrong notes in it. Every step of a run is consonant with the one before, and
  the wrap from the last rung back to the root is a step like any other.
- **The window is `cos²`**, so the two copies' gains sum to exactly 1 at every
  point of the climb. The cue is never louder than it is written, so the
  headroom the catalogue is tuned for holds all the way up — pinned by a test.
- **The room grows instead of the register.** Pitch can't tell you how long a
  streak is (that's the point of the wrap — every octave sounds the same), so
  `combo.bloom` opens the reverb send up across the first octave and then holds
  it there. It settles *before* the pitch wraps, so the wrap stays seamless. It
  is also what you hear close back down after a miss.

The engine owns the counting (`soundEngine.ts`) and sounds one copy of the cue
per Shepard layer; the decisions are pure and tested (`comboVoicing` /
`comboBloom` / `nextComboIndex` in `soundConfig.ts`). Two call sites end a run:
a wrong answer in `pages/Quiz.tsx` and an "Again" rating in
`pages/Flashcards.tsx`. If a third place ever starts playing `correct`, it
should reset the combo on its failure path too.

`fileAway` climbs for the same reason on a much shorter clock. "Clear Completed
Flashcards" fires it once per card, a couple of hundred milliseconds apart, and
the climb is what turns that from a stutter into a scale: the pitch rises card
after card, all the way down the deck. It uses the same pentatonic rungs as
`correct` — the wrap has to be a step like any other, or a nineteen-card sweep
would hit a seam partway through — but no `bloom`, because the cue is dry and
there is no room to open up.

Its run is a single sweep, so `handleClearCompleted` calls
`resetSoundCombo('fileAway')` before starting one rather than relying on the
(deliberately generous) `resetMs` — the first card off a deck of two has to
sound like the first card off a deck of twenty.

`levelUpStep` climbs for the same reason, on the quiz-completion ceremony
(`ConceptLevelUpCeremony`): when several concepts level up in one sitting,
playing the full `levelUp` fanfare for every card stops sounding like several
wins the moment it repeats. A lone level-up still gets the fanfare; a run of
them pops into one grid and gets one struck note per card as it lands, a rung
higher each time — the climb itself is the ceremony. That holds for a card
being collected too: in the grid its landing is a rung like any other rather
than a `collect` chime, which would be a second cue for the same landing.
Same pentatonic rungs, same reason as `fileAway`, and the same
`resetSoundCombo` call before the run starts so a two-concept ceremony and a
ten-concept one both climb from the root. A long run lands cards faster than
the cue's 150 ms throttle, which thins the climb to every other card or so
rather than bunching notes together.

## The catalogue

| Cue | When |
| --- | --- |
| `click` | Any button, link or menu item — the light press, no thump |
| `press` | A committing action: the solid `Button` variants, or `data-sound="press"` |
| `select` | Picking one of several — an answer option, a tab, a radio |
| `tick` | Ticking an item in a list of choices — a topic, a concept, a question. Same either way: a box is ticked, not flipped |
| `toggleOn` / `toggleOff` | Switches, pitched up or down to match |
| `navigate` | A route change |
| `actions` | Opening a flashcard's own actions menu (the header Play button) |
| `open` / `close` | A panel or modal sliding in or out |
| `page` | A flick within one surface — a flashcard turning over, a page already open being returned to |
| `ruffle` | Stepping through a sequence: a Previous / Next footer, or a drag along the position bar above it. The quietest cue in the app — see "Stepping through a sequence" |
| `shuffle` | Riffling the flashcard deck into a new order |
| `fileAway` | One finished card going green and collapsing into itself during "Clear Completed Flashcards". Climbs across the sweep — see "The combo" |
| `correct` | A right answer in a run: quiz, flashcard "Got it". Climbs endlessly across a run — see "The combo". Not the collect check — see "Collecting a card" |
| `addToDeck` | A card filed into the study deck ("Add to Flashcards") |
| `collect` | A flashcard landing in the deck via the collect ceremony — a lone card; in a grid of several, each landing is a `levelUpStep` rung |
| `levelUp` | A concept climbing the mastery ladder — a lone one, on the quiz-completion ceremony |
| `levelUpStep` | One card landing in the grid when a *run* of concepts levels up on the same ceremony — a rung higher per card instead of repeating `levelUp`. Climbs — see "The combo" |
| `reward` | Gems paid out — quest collect, study-plan bonus, a store purchase |
| `streak` | The daily streak growing |
| `complete` | A quiz or study session finishing |
| `begin` | Pressing Start Quiz — every button in the app that opens one. The count-in and one struck note |
| `launch` | The *second* Start Quiz, on the pre-quiz collect gate: the press that puts a question on screen. Finishes `begin`'s phrase |
| `study` | Opening the flashcard study view: the Study toggle, a card's "Study" action, "Study again" |

## The cues that start something

Everything else in the catalogue marks a thing that already happened, which is
why everything else can be a chime. `begin`, `launch` and `study` mark a thing
about to happen, and that needs a different shape.

**`begin` needs a run-up.** Momentum can only be heard over time, so nothing
built like a 200 ms acknowledgement will ever feel like a launch. The cue spends
its first quarter-second on anticipation and no melody at all: a sub spinning up
an octave from D2 to D3 under a noise sweep opening from rumble to air, with
three ticks counting in over the top — 90 ms apart, then 65, then 45. The
tightening is the trick. An even count-in tells you exactly when the launch will
land; an accelerating one arrives a beat before you expect it, and that surprise
is what reads as being fired out of something. Then one struck D, held — and it
stops there.

**`launch` is the other half of it.** Starting a quiz is two presses, not one:
Start Quiz opens the quiz, and when it covers concepts that are still New the
collect gate's own Start Quiz is what actually puts a question on screen. Two
presses a minute apart played the same fanfare twice, which made the first one
sound like it hadn't worked. So the bugle is split across them. `begin` counts in
and lands on D; `launch` picks the phrase up a fourth higher and finishes it —
G, then A, struck and held. Measured across both halves the launch still stops on
the **fifth**, not the octave: a quiz is being opened, not concluded, and
resolving home is `complete`'s shape. The unresolved fifth is the entire reason
it leans forward.

What `launch` deliberately doesn't have is a second run-up. You were counted in
once already; counting in again would make the gate read as a second beginning
rather than the end of the first, so there's no count-in and no spin-up — one
short sweep under an immediate strike. It carries the same low D as `begin`'s
landing, so the two halves sound like one instrument picked back up rather than
two cues.

A quiz without the gate is one press, and hears only the first half: a count-in
into a single note that doesn't resolve — which is the right shape for a cue
whose answer is the quiz itself.

**`study` needs to not be a reward.** The tempting move is to reuse a
celebration cue for the Study button, and it's wrong twice over: opening your own
deck is not an achievement, and a cue that congratulates you for a press you make
twenty times a session wears out fast. So `study` has no triad and no third in
it — just an open fifth, the interval with no mood attached — pulled warm (the
lowpass is the darkest in the catalogue). It begins on paper, like the rest of the
flashcard family, and it *opens* rather than arriving: a slow A5 fades in over
the held fifth across a fifth of a second, a lamp coming up over a desk.

All three are pinned by tests — the run-up and its accelerating count-in, the
split phrase and the fourth that resumes it, the unresolved fifth across both
halves, the missing third, and the loudness window that keeps them above the
interface and under `complete`.

## Stepping through a sequence

Six surfaces share the same footer — a position bar over Previous / Next — and
all six make the same sound when you move through them: the concept popup,
the exam-PDF reader, flashcard study, the concept detail modal, mistakes
review and math focus.

That sound is `ruffle`, and it is written around one fact: the bar is
*scrubbable*, so it fires **while a finger is still moving**. Dragging through a
423-page examiner's report crosses a stop every few pixels, a dozen-plus times
a second until the throttle catches it. Nothing else in the app is asked to
repeat like that.

So it is built to be survived rather than noticed:

- **The quietest cue in the catalogue** — under the press transient it shares a
  footer with, pinned by a test. If thumbing through a document is the loudest
  thing on screen, the cue is wrong.
- **Three short brushes, not one sweep.** A single burst repeated quickly reads
  as a stutter of the same sound; three fanning past under one small swell read
  as sheets moving against each other. That is the difference between a drag
  sounding like thumbing a stack and sounding like a machine gun.
- **Dark and over in 70 ms**, so consecutive stops overlap into a riffle rather
  than queueing up as separate events.
- **Falling, not arriving.** The brushes drop in pitch and fade as they go.
  Nothing about moving one stop should feel like an event.

The cue lives in `NavProgressBar` itself (`moveTo`), so every scrubbable bar
gets it without opting in, and each footer's own Previous / Next plays the same
cue — stepping one item and dragging past ten are then the same gesture at
different speeds. The bar keeps `data-sound="none"` so the delegated listener
can't stack a press cue on the first stop of a drag.

`page` is what's left over for a single sheet actually turning: a flashcard
flipping over, a stacked page being returned to, an image gallery stepping on.

## Collecting a card

Collecting is the longest ceremony in the app — a modal opens, a check is
answered, a card spins, dissolves and lands — and it is also a flow you run
*five times in a row* off the pre-quiz collect gate. That combination is what
makes rule 10 load-bearing here: every cue stacked onto it is heard five times
before the quiz has even started.

So the whole flow makes four sounds, one per thing that actually happened:

| | |
| --- | --- |
| The modal opens | `open` — the same paper slide every modal in the app gets |
| An option is tapped | `select` — the reader's own press |
| **The card lands** | **`collect` — the one success chime** |
| The modal closes | `close` |

Two cues used to sit on top of that and both are gone:

- **`unlock`**, a 1.5-second drone that swelled under the `open` as the check
  appeared. Two cues for one event (rule 10), and the one carrying the mood was
  the longer of the two, so opening five checks in a row was five overlapping
  drones. The cue is deleted, not just unhooked — nothing else played it.
- **`correct`**, fired the instant the right option was tapped, a beat ahead of
  `collect`. It made passing a one-question gate sound like two separate wins.
  The check is the *door* to the ceremony, not a reward beside it, so the
  landing keeps the chime and the answer keeps only its press.

Dropping `correct` here also fixes something quieter. `correct` climbs a combo,
and a climb only means anything if something ends it — which is why the quiz and
the flashcard rating both call `resetSoundCombo` on their failure paths. The
collect check has no such path: a wrong answer is deliberately silent and shuts
the card behind a lockout. So a collect dropped into the middle of a quiz was
walking the streak's pitch up without being part of the streak.

The reduced-motion path skips the spin and the bloom, so `collect` fires
immediately instead of after the spin — same one chime, just sooner.

## Wiring a new interaction

Most of the time you don't: a `<button>` gets `click` for free from the
delegated listener, and a `role="checkbox"` gets `tick`. Beyond that,

- **A different cue for one control** — add `data-sound="ruffle"` (any cue name).
- **A row in a picker that isn't a checkbox** — the topic and concept lists are
  built from plain `<button>`s, so they carry `data-sound="tick"` to join the
  checkboxes. Do the same for any new list of choices.
- **A press that should land with weight** — `data-sound="press"`. The `Button`
  component already does this for its solid variants, so only raw `<button>`s
  running a committing action need it.
- **Silence one control** — `data-sound="none"`. Use it when something else
  already plays a better cue for that action, so the two don't stack.
- **A cue that belongs to a surface, not a button** — `useSoundOnMount('open')`
  for a conditionally-rendered modal, `useSoundOnToggle(open, 'open', 'close')`
  for one held mounted behind an `open` prop. This is right whenever the
  surface can be opened from several places (the concept popup is reachable
  from wiki links, search, the dashboard and a keyboard shortcut).
- **A cue for a keyboard path** — the delegated listener sees pointer presses
  and Enter/Space activation, but not custom shortcuts. Call
  `playSound(...)` directly there, as Quiz does for its 1–4 answer keys.

Nearest-wins: `data-sound` on a wrapper only applies to presses on the wrapper
itself, so a button inside a `data-sound="none"` card still clicks.

## Notes

- Disabled controls are always silent, whatever their `data-sound` says.
- A press only sounds if it activates something — on touch that is decided at
  release, so a scroll that begins on a button is silent. See "When a press
  counts as a press".
- Each cue has a `throttleMs` so rapid clicking can't machine-gun it.
- A route change normally plays `navigate`, but not in the ~1.4 s after a
  `begin` — starting a quiz navigates, and a second rising sweep landing inside
  the launch's run-up smears the count-in. `msSinceSound` in `soundEngine.ts` is
  what `SoundEffects` asks.
- A cue with a `space` keeps its nodes alive for the length of the reverb tail
  so the decay isn't cut off mid-ring.
- Everything degrades to silence: no Web Audio support, a blocked autoplay
  policy or a failed localStorage read never throws into a click handler.
- Sound is on by default and persists in `actuarial-notes-sounds` /
  `actuarial-notes-sound-volume`. `M` toggles it during a quiz.
- To swap a synthesized cue for a real recording, drop the file into
  `quiz/public/sounds/` and add the path to `SOUND_PATHS` in `soundConfig.ts`.
