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
   with a headroom check — a four-note fanfare is nearly twenty oscillators in
   one bus, and it still has to clear the ceiling at full volume.

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
  what a lone sine can never do. Both partials are exact harmonics, so a triad
  of them stays consonant instead of clanging like an actual (inharmonic) bell.
- **A mallet.** `mallet()` puts ~20 ms of bandpassed noise at the moment of the
  strike. You don't hear it as its own event; without it the notes bloom out of
  nowhere and the cue loses its impact.
- **A landing.** Cues accent *toward* the last note and give it a `hold` — the
  arrival stays at full level before it decays. An even run at even volume is a
  scale exercise; a run into a held arrival is an announcement. Two of them
  (`levelUp`, `complete`) go further and re-strike the landing note, so the cue
  is a fast pickup and then an arrival rather than one continuous climb.
- **A low root.** A quiet sine an octave or two under the triad. Mostly felt
  rather than heard, and inaudible on a laptop speaker, but it's the difference
  between weight and a beep on headphones.
- **A room.** `space` sends the cue to a shared convolution reverb (a
  synthesized impulse response — decaying, lowpassed, per-channel noise, built
  once). Dry synthesis always sounds like a phone UI. Reward cues use it;
  interface and paper cues stay dry, because a tail on something pressed forty
  times an hour is mud.

## The combo

`correct` climbs. Consecutive right answers walk up `combo.steps` — a whole
tone at a time, up a fifth over five in a row — and hold at the top; a long
enough gap, or an explicit `resetSoundCombo('correct')`, drops it back to the
root. This is the app's answer to the oldest problem in game audio: a cue that
fires forty times an hour stops registering. It also quietly does the job a
buzzer would without the punishment — after a miss you *hear* the climb start
over.

The engine owns the counting (`soundEngine.ts`); the decisions are pure and
tested (`comboMultiplier` / `nextComboIndex` in `soundConfig.ts`). Two call
sites end a run: a wrong answer in `pages/Quiz.tsx` and an "Again" rating in
`pages/Flashcards.tsx`. If a third place ever starts playing `correct`, it
should reset the combo on its failure path too.

`fileAway` climbs for the same reason on a much shorter clock. "Clear Completed
Flashcards" fires it once per card, a few hundred milliseconds apart, and the
climb is what turns that from a stutter into a scale: the pitch rises card
after card and the last one off the deck lands an octave up. Its run is a
single sweep, so `handleClearCompleted` calls `resetSoundCombo('fileAway')`
before starting one rather than relying on the (deliberately generous)
`resetMs` — the first card off a deck of two has to sound like the first card
off a deck of twenty.

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
| `fileAway` | One finished card sliding off the deck during "Clear Completed Flashcards". Climbs across the sweep — see "The combo" |
| `correct` | A right answer, anywhere: quiz, comprehension check, flashcard "Got it". Climbs across a run — see "The combo" |
| `addToDeck` | A card filed into the study deck ("Add to Flashcards") |
| `collect` | A flashcard landing in the deck via the collect ceremony |
| `levelUp` | A concept climbing the mastery ladder |
| `reward` | Gems paid out — quest collect, study-plan bonus, a store purchase |
| `streak` | The daily streak growing |
| `complete` | A quiz or study session finishing |
| `begin` | Starting or resuming today's quiz from the Dashboard |
| `unlock` | The locked comprehension-check screen gating a flashcard's collection |

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
- A cue with a `space` keeps its nodes alive for the length of the reverb tail
  so the decay isn't cut off mid-ring.
- Everything degrades to silence: no Web Audio support, a blocked autoplay
  policy or a failed localStorage read never throws into a click handler.
- Sound is on by default and persists in `actuarial-notes-sounds` /
  `actuarial-notes-sound-volume`. `M` toggles it during a quiz.
- To swap a synthesized cue for a real recording, drop the file into
  `quiz/public/sounds/` and add the path to `SOUND_PATHS` in `soundConfig.ts`.
