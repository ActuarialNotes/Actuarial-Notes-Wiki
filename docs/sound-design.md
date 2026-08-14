# Sound design

Every interaction in the quiz app makes a sound. All of it is synthesized at
runtime with the Web Audio API — there are no audio files, so the whole system
costs zero bytes of assets and every cue is tunable from one table.

## The rules

1. **Interface feedback is quiet and short.** A press is ~30 ms and sits an
   order of magnitude below the celebratory cues.
2. **Only weighty presses are thumpy.** The press transient has two halves: a
   high tick, and a low body under it. Ordinary controls — the vast majority —
   get the high end alone (`click`). The body belongs to `press`, which the
   solid `Button` variants (the committing actions: start, finish, save,
   delete) opt into. Stacked under every control instead, an afternoon of
   studying sounds like knocking on a desk.
3. **Panels and cards move on filtered noise, not tones.** The `open` / `close`
   / `page` family is a bandpass sweep over white noise with a slow swell — it
   reads as a sheet of paper sliding, not as a beep.
4. **Success is struck, not beeped.** Every reward cue is a mallet hitting a
   tuned bar (see "Anatomy of a reward cue" below). It ascends, the notes ring
   far longer than the gap between them so they pile into a chord rather than a
   countdown, it *lands* on its loudest note, it has a low root under it for
   weight, and it rings in a room.
5. **Mistakes are silent.** There is deliberately no `wrong` cue. A wrong
   answer is already obvious on screen, and buzzing at someone who is studying
   is punishment, not feedback. `soundConfig.test.ts` pins this so it can't
   drift back in by accident. What a miss does instead is end the `correct`
   combo — the next right answer comes back at the pitch the run started from.
6. **Loudness is the hierarchy.** `correct` fires forty times to `complete`'s
   one, so it sits below the ceremonies; the ceremonies sit below the
   session fanfare; the interface sits below all of it. Pinned by a test, along
   with a headroom check — a three-note fanfare is a dozen-plus oscillators in
   one bus, and it still has to clear the ceiling at full volume.
7. **Beginnings are shaped differently from endings.** `begin` and `study` are
   the only cues that open something instead of closing it, so neither resolves:
   see "The two cues that start something" below.

## The pieces

| File | Role |
| --- | --- |
| `quiz/src/lib/soundConfig.ts` | The catalogue: every cue as plain data (tones, noise sweeps, envelopes, levels). Edit sounds here. |
| `quiz/src/lib/soundEngine.ts` | One AudioContext for the app, the synth that renders a recipe, the shared reverb, the combo counters, and the enabled/volume store (localStorage-backed). |
| `quiz/src/lib/soundInteractions.ts` | Pure decision table: given a description of the pressed element, which cue plays. |
| `quiz/src/components/SoundEffects.tsx` | Mounted once in `App`. One delegated listener gives every control its press cue; also unlocks the AudioContext on the first gesture. |
| `quiz/src/hooks/useSoundEffects.ts` | `useSoundEffects()` (settings + `play`), plus `useSoundOnMount` / `useSoundOnToggle` for surfaces whose sound belongs to the surface. |
| `quiz/src/components/SoundSettingsCard.tsx` | Settings → Sound: on/off, volume, and previews. |
| `quiz/src/components/SoundPopover.tsx` | The sidebar popout beside the theme picker: mute + volume, reachable from any page. |

## Anatomy of a reward cue

The difference between a chime that feels like a reward and one that feels like
a notification is almost never the notes. It's five things underneath them, and
the reward family in `soundConfig.ts` is built from all five:

- **Struck, not faded in.** `bell(freq, …)` renders one note as three
  oscillators — the fundamental, an octave, and a twelfth — where the partials
  are scaled to die in a fraction of the fundamental's time. The spectrum
  narrows as the note rings, which is what a real struck metal bar does and
  what a lone sine can never do. Both partials are exact harmonics, so
  stacking several of these stays consonant instead of clanging like an actual
  (inharmonic) bell.
- **A mallet.** `mallet()` puts ~20 ms of bandpassed noise at the moment of the
  strike. You don't hear it as its own event; without it the notes bloom out of
  nowhere and the cue loses its impact.
- **A landing.** Cues accent *toward* the last note and give it a `hold` — the
  arrival stays at full level before it decays. An even run at even volume is a
  scale exercise; a run into a held arrival is an announcement. Two of them
  (`levelUp`, `complete`) go further and re-strike the landing note, so the cue
  is a fast pickup and then an arrival rather than one continuous climb.
- **A low root.** A quiet sine an octave or two under the chord. Mostly felt
  rather than heard, and inaudible on a laptop speaker, but it's the difference
  between weight and a beep on headphones.
- **A room.** `space` sends the cue to a shared convolution reverb (a
  synthesized impulse response — decaying, lowpassed, per-channel noise, built
  once). Dry synthesis always sounds like a phone UI. Reward cues use it;
  interface and paper cues stay dry, because a tail on something pressed forty
  times an hour is mud.

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
them gets one struck note per card instead, a rung higher each time — the
climb itself is the ceremony. Same pentatonic rungs, same reason as
`fileAway`, and the same `resetSoundCombo` call before the run starts so a
two-concept ceremony and a ten-concept one both climb from the root.

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
| `page` | A flick within one surface — popup prev/next, a flashcard turning over, a swipe |
| `shuffle` | Riffling the flashcard deck into a new order |
| `fileAway` | One finished card going green and collapsing into itself during "Clear Completed Flashcards". Climbs across the sweep — see "The combo" |
| `correct` | A right answer, anywhere: quiz, comprehension check, flashcard "Got it". Climbs endlessly across a run — see "The combo" |
| `addToDeck` | A card filed into the study deck ("Add to Flashcards") |
| `collect` | A flashcard landing in the deck via the collect ceremony |
| `levelUp` | A concept climbing the mastery ladder — a lone one, on the quiz-completion ceremony |
| `levelUpStep` | One card in a *run* of concepts leveling up on the same ceremony — a rung higher per card instead of repeating `levelUp`. Climbs — see "The combo" |
| `reward` | Gems paid out — quest collect, study-plan bonus, a store purchase |
| `streak` | The daily streak growing |
| `complete` | A quiz or study session finishing |
| `begin` | Launching a quiz — every button in the app that starts one |
| `study` | Opening the flashcard study view: the Study toggle, a card's "Study" action, "Study again" |
| `unlock` | The locked comprehension-check screen gating a flashcard's collection |

## The two cues that start something

Everything else in the catalogue marks a thing that already happened, which is
why everything else can be a chime. `begin` and `study` mark a thing about to
happen, and that needs a different shape.

**`begin` needs a run-up.** Momentum can only be heard over time, so nothing
built like a 200 ms acknowledgement will ever feel like a launch. The cue spends
its first quarter-second on anticipation and no melody at all: a sub spinning up
an octave from D2 to D3 under a noise sweep opening from rumble to air, with
three ticks counting in over the top — 90 ms apart, then 65, then 45. The
tightening is the trick. An even count-in tells you exactly when the launch will
land; an accelerating one arrives a beat before you expect it, and that surprise
is what reads as being fired out of something. Then the bugle: up a fourth, up a
whole tone, struck on the way and held on arrival. It stops on the **fifth**, not
the octave — a quiz is being opened, not concluded, and resolving home is
`complete`'s shape. The unresolved fifth is the entire reason it leans forward.

**`study` needs to not be a reward.** The tempting move is to reuse a
celebration cue for the Study button, and it's wrong twice over: opening your own
deck is not an achievement, and a cue that congratulates you for a press you make
twenty times a session wears out fast. So `study` has no triad and no third in
it — just an open fifth, the interval with no mood attached — pulled warm (the
partials are scaled down via `bell`'s `sparkle`, and the lowpass is the darkest
in the catalogue outside `unlock`). It begins on paper, like the rest of the
flashcard family, and it *opens* rather than arriving: a slow A5 fades in over
the held fifth across a fifth of a second, a lamp coming up over a desk.

Both are pinned by tests — the run-up and its accelerating count-in, the
unresolved fifth, the missing third, and the loudness window that keeps them
above the interface and under `complete`.

## Wiring a new interaction

Most of the time you don't: a `<button>` gets `click` for free from the
delegated listener, and a `role="checkbox"` gets `tick`. Beyond that,

- **A different cue for one control** — add `data-sound="page"` (any cue name).
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
