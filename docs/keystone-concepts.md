# Keystone Concepts

A **keystone concept** is one of the ~10–15 concepts per exam that the rest of the syllabus is
built on. The name is literal: the keystone is the wedge at the crown of an arch, and pulling
it brings the arch down. These are the concepts that turn up *inside other concepts'
definitions*, that half the question bank quietly assumes, and that repay over-learning more
than anything else on the syllabus.

The feature has two halves:

1. **An authored catalogue** — which concepts are keystones, and one sentence each on what
   leans on them.
2. **A gold visual material** — so a keystone is recognisable everywhere it appears, without
   the student having to remember a list.

---

## Where the data lives

`quiz/src/data/keystoneConcepts.ts` — a plain table, grouped by exam:

```ts
export const KEYSTONE_EXAMS: KeystoneExam[] = [
  { id: 'P', label: 'Exam P', concepts: [
      { name: 'Bayes Theorem', why: 'The standard "given the result, which cause?" question — …' },
      …
  ]},
  …
]
```

`id` is the exam-progress key (`P`, `FM`, `MAS-I`, `5`) — the same key `concept_mastery`,
`daily_completions` and `exam_progress` rows use, so progress roll-ups need no translation.

**Editing rules** (each is pinned by `quiz/src/lib/keystone.test.ts`):

- **8–15 per exam.** The gold treatment only means something while it stays rare. If a concept
  is merely *frequent*, it is not a keystone — a keystone is what other concepts depend on.
- **`name` must match a real `Concepts/<name>.md` page** and be linked from that exam's
  syllabus page (`Exam *.md`). A keystone pointing at nothing would render a gold marker on a
  dead link.
- **One exam per concept.** The lookup index is keyed globally by concept name, so claiming the
  same concept for two exams would silently collapse to one entry.
- **`why` is one sentence about consequences**, addressed to a student — what breaks, or what
  becomes easy, because of this concept. It is not a definition; the concept page already has
  one, and the test rejects a `why` that opens by restating the concept's own name.

## The read side

`quiz/src/lib/keystone.ts` is the single lookup every surface goes through:

| Export | Use |
|---|---|
| `findKeystone(name \| ConceptIdentity)` | The entry + which exam it anchors, or `null` |
| `isKeystone(…)` | Yes/no, for surfaces that only decorate |
| `keystonesForExam(examId)` | The exam's list, in authored (teaching) order |
| `keystoneProgress(examId, lookup, now)` | Mastery roll-up: total / mastered / started / forgotten |
| `keystoneKey(raw)` | The normalisation everything above shares |

Matching is forgiving about *shape* and strict about *identity*. A concept reaches these
functions as a display name (`Bayes Theorem`), a wiki-link path (`Concepts/Bayes+Theorem`), a
file name (`Bayes Theorem.md`), or an aliased syllabus link (`[[Bond Price|Price]]` → name
`Price`, target `Bond Price`) — all normalise to the same key. Nothing fuzzy-matches:
`Bayes` is not `Bayes Theorem`. A near miss must miss, or gold leaks onto concepts nobody
marked.

`keystoneProgress` takes the shared `buildMasteryLookup` map and decays records at read time,
exactly like the rest of the app (see `docs/concept-learning-progression.md`) — a Level 3
keystone left alone for a month counts as decayed here too.

## The gold material

Defined in `quiz/src/index.css` under "Keystone concepts", and summarised in
`docs/style-guide.md` §4.4.

| Class | What it does |
|---|---|
| `.keystone-ring` | Gold gradient edge, via the same padding + `mask-composite: exclude` ring trick as the foil border. `--keystone-ring-width` tunes thickness |
| `.keystone-ring--hero` | Thicker edge + a permanently travelling shine, for a hero surface |
| `.keystone-wash` | Warm gold wash behind a keystone surface |
| `.wiki-link--keystone` | A keystone mentioned in wiki prose: gold underline + a small gold lozenge |
| `@keyframes keystone-shine` | The one sweep animation, used on hover/focus |

**Gold is not foil, and the two must not be confused:**

- **Rainbow foil** (`.flashcard-collected`, `.lock-foil-ring`, `.designation-foil`) is *earned*
  — you collected the card, you reached Level 3, you passed the exam.
- **Gold** is *intrinsic* — this concept was always one of the load-bearing few, whether or not
  you have touched it.

Because gold is intrinsic, it never animates on its own: the shine sweeps on hover/focus, or on
a deliberate hero surface, so a syllabus page carrying a dozen keystone links stays calm.
Where a surface could wear both materials (a collected flashcard tile, the collect card), the
**edge belongs to foil** and the keystone signal is a glyph or chip inside — the two never
fight for the same border.

`prefers-reduced-motion: reduce` disables every keystone animation.

## Where keystones surface

| Surface | Treatment |
|---|---|
| Exam study guide (`pages/wiki/WikiExam.tsx`) | `components/wiki/KeystoneStrip.tsx` — the collapsible gold panel that *introduces* the idea, lists all of the exam's keystones with per-concept mastery dots and a mastered-count bar, and opens any of them in the concept popup |
| Concept popup header (`components/wiki/ConceptPopup.tsx`) | `KeystoneBadge` — the gold glyph beside the title; tapping it explains what a keystone is, why *this* one qualifies, and the exam's mastered count |
| Wiki prose (`components/wiki/WikiArticle.tsx`) | `.wiki-link--keystone` on concept links — dimmed repeat mentions stay dim, so one marker per idea |
| Flashcard tiles (`pages/Flashcards.tsx`) | The gold glyph beside the card name (glyph only — the tile edge belongs to the collected-foil material) |
| Collect modal (`components/collect/CollectCard3D.tsx`) | A gold `KEYSTONE` chip + wash on the card being collected |
| Wiki search results (`components/wiki/WikiSearchPanel.tsx`) | The keystone glyph replaces the generic concept file icon |
| Standalone concept page (`pages/wiki/WikiConcept.tsx`) | The `chip` variant of the badge next to the title |

`components/KeystoneBadge.tsx` exports both `KeystoneIcon` (the drawn glyph — a gold arch
block, deliberately not a lucide icon so it can carry the gradient and never reads as the
gem/quest currency) and `KeystoneBadge` (glyph + explainer popover). The badge resolves the
concept itself and renders **nothing** for a non-keystone, so call sites can drop it in
unconditionally.

## Adding an exam

1. Add a `{ id, label, concepts }` block to `KEYSTONE_EXAMS`, using the exam-progress key as
   `id`.
2. Add the exam's syllabus file to `SYLLABUS_FILE` in `keystone.test.ts` so the "is it actually
   on the syllabus?" check covers it.
3. Nothing else — every surface reads the catalogue through `lib/keystone.ts`, and the strip
   appears on that exam's study guide automatically.

## Deliberately not done

- **Keystones do not change scheduling.** The study plan (`docs/study-plan-generation.md`)
  still paces by mastery and syllabus weight; keystones are a *signal to the student*, not a
  hidden reordering. If that changes, it belongs in `studyPlan.ts` with its own doc section.
- **No per-user keystone lists.** The catalogue is authored and shared; personal "important to
  me" marking would be a different feature (and a different colour).
