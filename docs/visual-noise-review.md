# Visual-noise review: text as a substitute for design

**Status:** review note — a backlog to execute on, not a description of the app today.
The one part already done is §3.1 (the Exam Readiness popup), which is the worked example
the rest of this note generalises from.

**Companion doc:** `docs/style-guide.md`. Everything here is a proposed tightening of §1
(Design Principles), §3 (Typography) and §7.6 (Empty/loading states) — see §6 below for the
exact edits to fold back into the style guide once the sweep lands.

---

## 1. The problem

The app explains itself in grey text. A number is printed, then a caption says what the
number counts. A control is drawn, then a line underneath says what pressing it does. A
diagram shows a mechanism, then a bullet list restates the mechanism, then a "Tip" paragraph
restates it again.

Each of those lines was individually defensible when it was written. Stacked, they read as
noise: the eye has to sort three tiers of grey before it finds the one number that matters,
and the caption tier is almost never the answer to the question the reader actually arrived
with. Worse, the habit is self-reinforcing — a surface that already carries a caption makes
the *next* caption feel normal.

The style guide is partly responsible. §1.3 says hierarchy comes from "weight and muting",
§3 blesses `text-xs text-muted-foreground` for "captions, counts, timestamps, helper text",
and §7.6 tells empty states to include "one muted explanatory line". None of them says when a
caption has *not* earned its place. There is a licence to add grey text and no budget on it.

## 2. The tests to apply

Before writing a muted line, put it through these. If it fails any one, delete it.

1. **The restatement test.** Does this line say something the reader has already read from
   the number, the label, or the shape directly above it? `0/95 at Level 3 · 95 new` under a
   bar that already reads `0%` fails. So does "Track learning progress" under a **Sign in**
   button attached to a dial reading zero.
2. **The affordance test.** Is this line teaching an interaction the interaction should teach
   itself? "Hover the graph to explore your level at any point in time" fails — a cursor
   change and a hover readout are the instruction. Instructions in prose are what you write
   when the affordance is missing; fix the affordance.
3. **The draw-it test.** Is the fact quantitative, comparative, or proportional? Then draw it.
   Weight, share, progress, rank and count are all shapes. "60% of score" is a bar thickness.
   `3/5 completed` beside a bar that is 60% full is the bar said twice.
4. **The consequence test.** Does the line carry a consequence the control genuinely cannot?
   *Keep it.* "Permanently delete your account and all data. This action cannot be undone."
   passes and should stay. So does the export caption listing what a CSV actually contains.
   This is the exemption that keeps the sweep from stripping Settings bare.
5. **The accessibility relocation.** A fact that fails 1–3 for sighted readers is often still
   needed by a screen reader. Move it to `aria-label` / `title` rather than deleting it. Not
   rendering a fact is not the same as not exposing it.

**Rule of thumb, to add to the style guide:** *one* muted line per block, and only if it
passes the tests. Two stacked greys is a smell; three is a bug.

## 3. The backlog

Ordered roughly by how much noise each removes per unit of work. Line numbers are from the
commit that introduced this note and will drift — grep the quoted string.

### 3.1 Exam Readiness popup — **done**

`components/wiki/ExamReadinessCard.tsx`, `lib/readiness.ts`, `docs/exam-readiness.md`.

The worked example. Four greys removed from one popup:

- `"60% of score"` / `"40% of score"` beside each criterion label → the weight is now **drawn**,
  as the criterion bar's thickness (`4px + 6px × weight`), so the heavier criterion is visibly
  the heavier line. Test 3.
- `criterion.detail` (`"0/95 at Level 3 · 95 new"`, `"0/12 mastered"`) under each bar → deleted,
  along with the `detail` field on `ReadinessCriterion` that existed only to feed it. The
  evidence is the panel the row already expands onto. Test 1.
- `"Track learning progress"` under the **Sign in** button → deleted. Test 1.
- `"{level3Count}/{total} · {pct}%"` on each section row → now the percentage alone. Test 1.

Both surviving facts (weight, criterion tally) moved to the row's `aria-label`. Test 5.

**Take this as the pattern for the rest of the list**: delete the caption, encode what it
carried into the shape if the fact is real, and relocate it to an accessible name if it is
needed but not visual.

### 3.2 The double-explained gem-bonus modal — highest single win

`components/ReadinessCard.tsx` ~L1564–1587. This one surface explains the same mechanic
**four times**: an icon flow (lock → gem, which is genuinely good and does the job), then a
muted paragraph, then a bordered "How it works" box with three bullets, then a "Tip:"
paragraph.

Keep the icon flow and one sentence. The three bullets are the sentence enumerated; the Tip
is a different feature (the **Replace** button) and belongs next to that button, not here.

### 3.3 Locked / premium overlays

- `components/ReadinessCard.tsx` ~L1393 and `components/TodayCard.tsx` ~L331 both render
  "Custom Study Plan" + "A daily plan tailored to you" + **Upgrade**. The subtitle is the
  title paraphrased. Test 1.
- `components/wiki/LearningProgressModal.tsx` ~L107: "Learning Progress" + "Track your mastery
  journey over time". Same shape, same fix.
- These three are near-identical markup in three files. Extract one `LockedFeatureCard`
  (lock tile + name + single action) and let the absence of a subtitle be structural rather
  than a decision three separate authors have to keep making.

### 3.4 Instructions that should be affordances

- `components/wiki/LearningProgressModal.tsx` ~L191: "Hover the graph to explore your level at
  any point in time." Test 2. If discoverability is genuinely weak, the fix is a visible
  crosshair/handle on the graph, not a sentence under it. Note the mobile problem this hides:
  there is no hover on a phone, so the line is *false* for half the audience.
- `components/collect/CollectConceptModal.tsx` ~L494: "Or flip the card for its definition."
  The card should look flippable — a corner peel, a flip affordance — and then the line goes.
- `components/TodayCard.tsx` ~L358: the two-line unconfigured-state paragraph explaining what
  a study plan does. The **Configure study plan** button plus a one-line promise is enough.

### 3.5 Redundant status words beside progress bars

`components/QuestsPanel.tsx` ~L234/236 prints "Collected" or "In progress" next to a bar that
already shows 100% or partial fill, in a row that also prints `earned/target`. Test 3: the bar
is the status. Keep the reward chip (gems/XP) — that is not derivable from the bar — and drop
the word. `KIND_DETAIL` at ~L214 is a second description under `quest.description`; one of the
two should go.

### 3.6 Section captions that restate the cards below them

`pages/Store.tsx` ~L276, L334, L472, L554 each put a pricing/rules sentence under a section
heading ("Fox, Koala, and Frog are free. Rare characters cost 50 gems.") while every card in
that section already shows its own price and rarity badge. Test 1. The one worth keeping is
L472's "Complete all exam requirements to unlock for free" — that is a rule the cards do not
show. Test 4.

### 3.7 Field labels that duplicate their control

`components/ConceptDetailModal.tsx` ~L344 prefixes a `<select>` with a muted "Viewing:". A
select whose current value reads "Entire syllabus" does not need to be told it is what is
being viewed. Sweep for the pattern (`Viewing:`, `Showing:`, `Filter:` beside a populated
control) — the value is the label.

### 3.8 Settings — trim, don't strip

`pages/Settings.tsx` is the most caption-dense file in the app (19 muted lines) and **most of
them should stay** — Test 4 protects the delete-data, delete-account and export captions,
which name consequences and contents a button cannot. Two to cut:

- ~L1072 "Have a question or found a bug? Send us a message." under a row labelled
  **Contact us** with a **Contact** button. Test 1.
- ~L1053, the tour description (currently unreachable — `TOUR_ENABLED` is off). Handle it
  when the tour is rebuilt rather than now.

### 3.9 The dead `blurb`

`lib/readiness.ts` `ReadinessBand.blurb` carries a one-sentence "what to do next" for all five
bands and **nothing renders it** — the doc already records that it was cut for repeating the
band name. It is not visual noise, but it is a loaded gun: the next person to open the file
sees a ready-made caption and a place to put it. Delete the field, or add a comment at the
declaration saying it is deliberately unrendered.

## 4. What *not* to do in this sweep

- **Don't touch loading and error strings.** "Loading concept…", "Couldn't load X",
  "No matches" are not explanation — they are the only content there is. §7.6 stands.
- **Don't strip consequence captions** (§3.8). Deleting a destructive-action warning to reduce
  grey pixels is a strictly worse app.
- **Don't delete a fact without checking test 5.** The screen-reader path is not the visual
  path; a removed caption often needs to reappear as an `aria-label`.
- **Don't widen this into a redesign.** Every item above is a deletion, a relocation, or a
  small encoding change (text → bar/thickness/shape). Nothing here needs a new component
  except the extraction in §3.3.

## 5. How to execute

One PR per group in §3, in the listed order — they are independent, and 3.2 alone is worth
shipping on its own. For each:

1. Delete or relocate the text.
2. If a real fact was carried, encode it (thickness, fill, order, colour) or move it to
   `aria-label`.
3. Update the surface's doc comment to say *why* the caption is absent, in the same voice as
   `ExamReadinessCard.tsx`'s header now does — "Resist adding a grey caption back". A deletion
   with no note is a deletion that gets undone.
4. `npm run build && npm run lint && npm test`. Vitest covers the lib layer, so removing a
   rendered field (as `criterion.detail` was) will surface as a test edit, not a silent break.

## 6. Style-guide edits to land with the sweep

Fold these into `docs/style-guide.md` once §3 is mostly done, so the guide stops licensing
the pattern:

- **§1, new principle:** *"Draw the fact, don't caption it."* Weight, share, progress, rank and
  count are shapes. Prose explaining a number is a sign the number is drawn wrong.
- **§3, Typography guidance:** add the caption budget — one muted line per block, and only if
  it passes the five tests in §2 of this note. Cross-reference here.
- **§7.6, Empty states:** change "one muted explanatory line" to "*at most* one muted
  explanatory line, and none if the heading and the action already say it."
- **§12, Quick Checklist:** add "Every muted line on this screen passes the restatement and
  affordance tests."
