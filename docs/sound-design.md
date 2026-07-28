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
4. **Success is melodic.** An ascending major triad on round sines under a
   lowpass. The notes ring far longer than the gap between them, so all three
   are still sounding at the end: a chord, not a countdown.
5. **Mistakes are silent.** There is deliberately no `wrong` cue. A wrong
   answer is already obvious on screen, and buzzing at someone who is studying
   is punishment, not feedback. `soundConfig.test.ts` pins this so it can't
   drift back in by accident.

## The pieces

| File | Role |
| --- | --- |
| `quiz/src/lib/soundConfig.ts` | The catalogue: every cue as plain data (tones, noise sweeps, envelopes, levels). Edit sounds here. |
| `quiz/src/lib/soundEngine.ts` | One AudioContext for the app, the synth that renders a recipe, and the enabled/volume store (localStorage-backed). |
| `quiz/src/lib/soundInteractions.ts` | Pure decision table: given a description of the pressed element, which cue plays. |
| `quiz/src/components/SoundEffects.tsx` | Mounted once in `App`. One delegated listener gives every control its press cue; also unlocks the AudioContext on the first gesture. |
| `quiz/src/hooks/useSoundEffects.ts` | `useSoundEffects()` (settings + `play`), plus `useSoundOnMount` / `useSoundOnToggle` for surfaces whose sound belongs to the surface. |
| `quiz/src/components/SoundSettingsCard.tsx` | Settings → Sound: on/off, volume, and previews. |
| `quiz/src/components/SoundPopover.tsx` | The sidebar popout beside the theme picker: mute + volume, reachable from any page. |

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
| `correct` | A right answer, anywhere: quiz, comprehension check, flashcard "Got it" |
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
- Everything degrades to silence: no Web Audio support, a blocked autoplay
  policy or a failed localStorage read never throws into a click handler.
- Sound is on by default and persists in `actuarial-notes-sounds` /
  `actuarial-notes-sound-volume`. `M` toggles it during a quiz.
- To swap a synthesized cue for a real recording, drop the file into
  `quiz/public/sounds/` and add the path to `SOUND_PATHS` in `soundConfig.ts`.
