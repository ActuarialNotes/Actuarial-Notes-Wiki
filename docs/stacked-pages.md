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

A followed link now **stacks**. The page you were reading folds up into a title bar above
the new one and stays there, one tap from being opened again exactly as you left it —
same scroll position, same view mode. It is Obsidian's stacked pages, folded along the
pane's short axis:

```
┌────────────────────────────────────┐
│ 📄 An Introduction to Statistical…✕│  ← the trail, folded to bars
│ 📄 Bias-Variance Tradeoff         ✕│
├────────────────────────────────────┤
│ Mean Square Error          ⤢  ✕    │  ← the open page
│ ─────────────────────              │
│ The MSE of an estimator…           │
├────────────────────────────────────┤
│ 📄 Sample Space                   ✕│  ← stepped back past, folded below
└────────────────────────────────────┘
```

**Vertical, not horizontal.** The popup is a pane the width of the phone, so a page folded
to a vertical spine would be a sideways strip of letters — legible only by tilting your
head. Folded along the short axis it keeps its real title, plus room for a full-size close
button. It also means the stack has no layout maths: exactly **one page is open at a
time**, because height is the dimension this pane has least of and two half-height pages
would leave neither readable.

Rules, all of them in `lib/pageStack.ts` and unit-tested there:

- **Following a link from page *i* drops everything opened from it.** The pages below it
  were reached *through* it; taking another link from the same page starts a new branch
  rather than burying the old one. This is what makes a bar safe to tap: going back and
  reading on doesn't leave a pile of dead ends.
- **A page appears once.** A link back to a page already in the stack opens it instead of
  adding a second copy.
- **The stack caps at `MAX_STACK_PAGES` (5).** Past that the oldest page drops off. Every
  bar costs a row of the height the page being read needs, and a trail that long has
  stopped being a trail.
- **Closing a page falls back to the page it was opened from**, and closing the last one
  closes the popup — so at depth 1 the header's ✕ behaves exactly as it always did. A bar
  carries its own ✕, so a page can be dropped from the trail without opening it first.
- **Esc unwinds one layer at a time**: the page just opened, then focus mode, then the
  popup. A link followed by mistake costs one key, not the reading position.

### Keeping a folded page's place

Only the open page is mounted, so folding one unmounts its `ConceptPagePanel` — which is
what keeps each page's state from leaking into the next, but would also throw away how far
down it had been read. The panel therefore records its scroll offset in a module-level
`scrollMemory` map **as it scrolls**, and restores it once the article is laid out. Not on
unmount: by the time a `useEffect` cleanup runs during a deletion React has already
detached the body, and a detached element's `scrollTop` reads 0. The map is cleared when
the popup closes, since the trail those offsets belong to is gone with it.

## The stack vs. the walk

Two sequences share the panel and they are not the same thing:

| | drives | moves with |
|---|---|---|
| **the walk** | the Previous / Next footer, the progress bar, the "N of M" readout, the active-link highlight on the page behind | prev/next, the bar's scrub, the syllabus filter |
| **the stack** | which page is open and what is folded around it | following a link, tapping a bar, closing a page |

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
| `lib/pageStack.ts` | the pure decision layer: push / open / close, and the depth cap |
| `hooks/useConceptPopup.ts` | `pages` + `pageIndex` in the store, and the reset-on-walk rule |
| `components/wiki/ConceptPopup.tsx` | the shell: resize handle, the stack column, the footer, focus mode |
| `components/wiki/ConceptPagePanel.tsx` | **the open page** — its header (title, mastery, the action menu behind the collect gate, Listen) and its body (article / Math View / Listen), plus the gallery, modals and scroll memory |
| `components/wiki/PageStackBar.tsx` | a folded page |
| `index.css` (`.page-bar`, `.page-panel`) | the bar unrolling and the new page rising into place |

`ConceptPagePanel` is mounted **per page**, keyed by its ref, so opening another page is a
remount rather than a reset of a dozen pieces of state. The consequence to remember: any
state a page should keep across a fold belongs in `scrollMemory`-style storage that
outlives the mount, and anything shared by the whole popup (focus mode, the split height,
the gallery hand-off across a prev/next step) belongs in `ConceptPopup` and is passed down.

## Sound

The paper family already had the right cues (`docs/sound-design.md`): a new page slides
**out** from under the one it came from (`open`), a link back to a page already in the
stack is a **flick** through the sheets already there (`page`), tapping a bar is the same
flick, and closing a folded page is the sheet sliding back in (`close`) — except for the
last page, where the popup's own close cue covers it. Nothing new was added to the
catalogue.
