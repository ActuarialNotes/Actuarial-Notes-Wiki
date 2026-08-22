# Stacked pages

*The concept popup's Obsidian-style page stack.*

## The problem

The concept popup (`components/wiki/ConceptPopup.tsx`) is where most reading happens: a
split pane over the study guide, the dashboard or the flashcards page, showing one wiki
page with Previous / Next through the concepts of whatever opened it.

Wiki pages are dense with `[[links]]`, and following one inside the popup used to **swap
the panel's body**. Read *An Introduction to Statistical Learning*, tap **Cross-Validation**
to check what it means, and the book is gone — the section you were half-way through, the
scroll position, the whole reason you opened it. The only way back was Previous, which
walks a different sequence entirely.

## The model

A followed link now **stacks**. The page you were reading stays open behind the new one,
collapsed to a spine at the left edge, one tap from being expanded again exactly as you
left it. This is Obsidian's stacked-tabs behaviour, and the mental model transfers:

```
┌──┬──┬────────────────────────────┐
│IS│Bi│  Mean Square Error         │   ← phone: one panel, its trail as spines
│L │as│  ─────────────────────     │
│  │  │  The MSE of an estimator…  │
└──┴──┴────────────────────────────┘

┌──┬─────────────┬─────────────┬─────────────┐
│IS│ Bias        │ Mean Square │ Sample Space│   ← desktop: as many expanded as fit
│L │ ──────      │ Error       │ ──────      │
└──┴─────────────┴─────────────┴─────────────┘
```

Rules, all of them in `lib/pageStack.ts` and unit-tested there:

- **Following a link from page *i* drops everything opened from it.** Pages to the right
  of *i* were reached *through* it; taking another link from the same page starts a new
  branch rather than burying the old one. This is what makes a spine safe to tap: going
  back and reading on doesn't leave a pile of dead ends.
- **A page appears once.** A link back to a page already in the stack focuses it instead
  of opening a second copy.
- **The stack caps at `MAX_STACK_PAGES` (6).** Past that the oldest page drops off. Every
  spine costs width the page being read needs, and a trail that long has stopped being a
  trail.
- **Closing a page falls back to the page it was opened from**, and closing the last one
  closes the popup — so at depth 1 the header's ✕ behaves exactly as it always did.
- **Esc unwinds one layer at a time**: the page just opened, then focus mode, then the
  popup. A link followed by mistake costs one key, not the reading position.

### How many panels are expanded

`stackSlots(count, index, { width })` decides. The expanded panels are a run *ending at the
focused page*, so the newest page is always the rightmost expanded one and pages stepped
back past collapse to the right. The run is as long as fits:

```
k · MIN_PANEL_WIDTH + (count − k) · SPINE_WIDTH ≤ width
```

A phone fits one panel; a desktop window fits two or three, which is the point — reading a
concept beside the source that cites it is the case this feature exists for. The focused
page is always expanded, however cramped. The width comes from a `ResizeObserver` on the
stack row, not from `window.innerWidth`: the popup is inset by the sidebar on desktop.

## The stack vs. the walk

Two sequences share the panel and they are not the same thing:

| | drives | moves with |
|---|---|---|
| **the walk** | the Previous / Next footer, the progress bar, the "N of M" readout, the active-link highlight on the page behind | prev/next, the bar's scrub, the syllabus filter |
| **the stack** | which pages are on screen | following a link, tapping a spine, closing a page |

The walk is over the *source page's* concepts; the stack is a side-branch hanging off
wherever the walk currently stands. So **every move of the walk rebuilds the stack from the
single page it landed on** (`stackState` in `hooks/useConceptPopup.ts`) — stepping to the
next concept is leaving the page the trail hung from, and keeping the trail there would
strand pages that no longer descend from anything. `jumpTo` (a link followed on a flashcard
back, where the popup is re-aimed rather than stacked) does the same.

The footer deliberately does **not** walk the stack. A stack of 3 inside a syllabus of 45
concepts would make "2 of 45" a lie, and the bar is a position readout for the walk.

## Where the code lives

| file | holds |
|---|---|
| `lib/pageStack.ts` | the pure decision layer: push / focus / close, and the panel-vs-spine layout maths |
| `hooks/useConceptPopup.ts` | `pages` + `pageIndex` in the store, and the reset-on-walk rule |
| `components/wiki/ConceptPopup.tsx` | the shell: resize handle, the stack row, the footer, focus mode |
| `components/wiki/ConceptPagePanel.tsx` | **one page** — its header (title, mastery, the action menu behind the collect gate, Listen) and its body (article / Math View / Listen), plus the gallery and modals it opens |
| `components/wiki/PageStackSpine.tsx` | a collapsed page |
| `index.css` (`.page-spine`, `.page-panel`) | the spine's vertical title and the new page's slide-in |

`ConceptPagePanel` is mounted **per page**, keyed by its ref. That is what gives each page
its own scroll position, view mode and gallery for free, and it means stepping the walk is
a remount rather than a reset of a dozen pieces of state. The consequence to remember: any
state a page should keep belongs *in* the panel, and anything shared by the whole popup
(focus mode, the split height, the gallery hand-off across a prev/next step) belongs in
`ConceptPopup` and is passed down.

`SPINE_WIDTH` in `lib/pageStack.ts` and `.page-spine`'s width in `index.css` are the same
number written twice — the layout maths can't read CSS. Keep them in step.

## Sound

The paper family already had the right cues (`docs/sound-design.md`): a new page slides
**out** from under the one it came from (`open`), a link back to a page already open is a
**flick** through the sheets already there (`page`), and tapping a spine is the same flick.
Nothing new was added to the catalogue.
