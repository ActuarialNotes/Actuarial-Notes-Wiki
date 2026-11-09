---
name: actuarial-concept-definitions
description: Write or improve a concept page in Concepts/*.md — its figure, a precise one-paragraph definition, the formula in a box followed by one bullet per term the words before it did not define, a folded worked example (green card, the question as its title; a long question's setup inside and its answer in a box of its own) right under each formula, short `##` sections for each variation of the concept, and an optional "The idea" card and trap card. Use when the user asks to create, write, draft, fill in, explain better, or clean up a Concepts/ page (SOA Exam P / FM / FAM / ALTAM, CAS MAS-I / MAS-II / Exam 5–9, the DISCs, CIA modules), or to standardize existing pages to this shape. Not for Resources/Books pages (resource-pages skill) or for auditing a whole exam's syllabus and coverage (exam-material-review).
---

# Actuarial Concept Page Writer

Writes the markdown pages under `Concepts/`, the pages a candidate reads to
*learn* a concept, usually for the first time, often from a link on a question
they just got wrong. The app opens New concepts in the concept popup before a
quiz, so a page is a first lesson as often as it is a reference card.

A page is **short**: one screen or two on a phone. It says what the concept
is, gives its formula, shows the formula working on one example, and then
does the same for each variation of the concept. Anything else is cut. The
cards it uses read as a set: the violet *idea*, the amber *trap*, and the green
*example* the reader opens when they want the worked answer.

This shape was set by the maintainer on 2026-11-06 from three Exam P pages
they wrote themselves — `Concepts/Probability.md`, `Concepts/Combinatorics.md`
and `Concepts/Permutation.md`. Read those three before writing a page; they
are the standard, and `references/exemplar.md` annotates one of them. **Exam P,
MAS-I and Exam 5 are converted** (for Exam 5, `Concepts/Pure Premium.md`,
`Concepts/Loss Ratio.md` and `Concepts/Exposure Base.md` are the models, the
last for a qualitative concept). The other exams' pages are still in the older
shape (a running example, *Try it*, collapsed *Exam traps*); convert one only
when asked to.

Before writing, read **`references/vault-mechanics.md`** — filenames, aliases,
namesake pages, the LaTeX rules and **the exam's notation table**. Those are
the things that break the built app silently, or make two pages of one exam
disagree.

## The shape of every page

```markdown
![[Media/Figures/<Concept>.svg|340]]        ← if the file exists

A **Term** is <the definition, with [[wiki-links]]>. <Optional second sentence.>

<A sentence leading into the formula, ending in "is">

> $$ <the formula> $$

- <one bullet per term the words above did not define>

<a new term or fact the formula needs, as a sentence — never a bullet>

> [!idea] The idea                          ← optional
> <one sentence: what the definition alone does not say>

<optional plain text expanding it: a worked line, a table>

> [!example]- <the whole question, as the reader would ask it> {Example}
> <optional lead-in sentence, then a table as its own block>
>
> - <one step of the reasoning per bullet>
> - <the last bullet gives the answer>

> [!example]- <a long question: only the question itself> {Example}   ← over 25 words
> <the setup: its facts, sentences and table>
>
> > [!answer]-
> > - <one step of the reasoning per bullet>
> > - <the last bullet gives the answer>

## <A variation: a case, a special case, a related rule>

<A sentence leading into its formula>

> $$ <its formula> $$

- <bullets for its new terms>

> [!example]- <a question this section answers> {Example}
> - …

> [!trap] <name of the slip>                ← optional
> <what the wrong answer looks like, and the fix>
```

There is **no** running example, no `## Try it`, no `> [!warning]- Exam
traps` fold and no `How it appears on the exam` callout. **Every example is
folded** (`[!example]-`), and the idea and trap cards are always open.

### 1. The figure (first line)

`![[Media/Figures/<Concept>.svg|340]]` is the first line of the body when the
file exists (`ls Media/Figures/`; spaces in the concept name are underscores
in the file name, `Sample_Space.svg`). The figures are generated
(`docs/concept-figures.md`): never invent an embed, and never draw one by hand.
A page with no figure starts at the definition. The code that reads a page's
opening (Concept Craft's `pageOpening`, the SEO lead) skips a leading figure,
so it costs nothing there.

### 2. The definition

- Open with the bolded term, written as the page's title: `A **Permutation**
  is …`, `**Combinatorics** is …`.
- **The term is a singular noun.** Pages are named *Permutation*, *Event*,
  *Combination*, never *Permutations*. An uncountable noun (*Combinatorics*,
  *Probability* as a field) is already singular and stays as it is.
- One or two sentences: what it *is*, precisely. No history, no chat, no
  "Formally," or "Recall that".
- Link the concepts the definition leans on (`[[Event|event]]`,
  `[[Sample Space|sample space]]`) the first time each appears; don't
  over-link.
- **To point at a part of another page, link its heading**:
  `[[Combinatorics#The multiplication principle|multiplication principle]]`
  opens Combinatorics at that section (in the concept popup, scrolled to it).
  The target is the heading's words exactly; a heading's anchor is its words in
  lower case with hyphens (`headingSlug` in `quiz/src/lib/wikiRoutes.ts`, math
  dropped). Never write "on [[Page]]" or "(see [[Page]])" to say where a rule
  lives — name the rule and link it there.
- Introduce the symbols the formula will use in these words, so the formula
  needs as few bullets as possible: "the number of permutations of $k$
  objects chosen from $n$ distinct objects, ${}_{n}P_{k}$, is".
- Don't restate another page's formula to set this one up. Link the page
  instead.

### 3. The formula and its bullets

- A sentence leads into the formula and states its condition, ending in "is":
  "If all outcomes in a finite sample space $S$ are equally likely, then the
  probability of an event $E$ is".
- The formula in a box, `> $$ … $$`, one expression per box. Two forms of the
  same quantity (the product and the factorial form of ${}_{n}P_{k}$) are two
  stacked boxes, the more intuitive first.
- **Immediately after the box, one bullet for each term in the formula that
  the words before it did not define.** Nothing else comes between them. A
  term already defined in the lead-in gets no bullet. A bullet is a sentence
  naming the symbol and saying what it is: `- $|S|$ is the number of outcomes
  in the sample space $S$.` A condition on the terms is a bullet too, stated
  bare: `- $k \le n$.`
- **The bullets are for the formula's symbols only.** A new term or fact the
  reader needs next (what it means for an event to *occur*) is a plain sentence
  after the bullets, or after the box when there are none: "The event $E$ is
  said to occur when the outcome of the experiment is in $E$." Never a bullet.
- A bullet may add one fact the formula needs to be read correctly (that it
  reduces to the simpler formula in the equally likely case, that $0! = 1$).
  It never justifies the formula or restates a definition ("because no object
  can be used twice" was cut for exactly that).
- A formula whose terms are all defined in the words before it needs no
  bullets (the multiplication principle's $m_1 \times \cdots \times m_k$).
- Every formula on the page is boxed this way, including the ones in later
  sections.

### 4. The idea — `> [!idea] The idea` (optional)

Only when there is something the definition and formula don't already say: a
decision the reader must make, a relationship between neighbours, the reason a
formula has its shape. Combinatorics has one (order and replacement pick the
formula). Probability doesn't. Permutation's draft had one
("use a permutation when order matters") and it was cut, because it repeated
the definition.

- Title it exactly `The idea`. It goes after the opening bullets, or after the
  definition on a page with no formula.
- **The card is one sentence.** It must not restate the definition.
- Anything that expands the idea (a worked line, the table that applies it)
  goes **directly below the card as plain text**, never inside it and never as
  an example. Combinatorics' card asks the two questions, and the order ×
  replacement table follows it as an ordinary table. Axioms of Probability's
  card says every rule follows from the three, and the complement rule's
  derivation follows it as two sentences.

### 5. Examples — `> [!example]- <the question> {Example}`

An example sits **directly under the formula or section it illustrates**, so
the reader sees the formula used straight away. Usually one per formula.

- **Written `> [!example]- <the question> {Example}`.** The `-` folds it, so the
  reader meets the question and opens the working when they want it. The
  `{Example}` tag at the end of the title is what draws it as a worked example
  — a green card with an *Example* pill (`WORKED_EXAMPLE_STYLE` in
  `quiz/src/components/MarkdownCallout.tsx`). Without the tag an `[!example]` is
  a learning objective, as on the exam pages.
- **The whole question is the title**, on the one header line, as a reader
  would ask it, ending in a question mark: `> [!example]- A fair die is rolled.
  Let $E$ be "an even number is rolled" and $F$ be "at least 4 is rolled". What
  are $E \cap F$, $E \cup F$ and $E^c$? {Example}`. Its setup is part of the
  question, never a first line of the body. Math in a title is fine. No
  "Example:" prefix, and the type written in lower case.
- **A long question is split: the question in the title, the setup in the
  body, the answer in a box of its own.** When the whole question runs past
  **25 words** (count each `$…$` as one word), the title keeps only the
  question the reader is asked, written so it stands alone, with "this"
  pointing at the setup: *Is this commercial auto class of light trucks
  homogeneous?* The setup (every fact, figure and table the question needs)
  is the card's first block, so it shows when the card is opened. The working
  goes in a folded, untitled `> > [!answer]-` box nested under it, which draws
  as a second card titled *Answer*, so the reader can read the setup and try
  it before opening the answer. Data the setup gives by category goes in a
  table rather than a sentence. `Concepts/Homogeneity.md`'s first example is
  the model:

  ```markdown
  > [!example]- Is this commercial auto class of light trucks homogeneous? {Example}
  > A commercial auto class of light trucks is rated at one rate. Its experience by radius of operation is:
  >
  > | Radius | Exposures | Losses ($) |
  > | :--- | ---: | ---: |
  > | Local | 6,000 | 3,600,000 |
  > | Intermediate | 2,500 | 2,125,000 |
  > | Long haul | 1,500 | 2,250,000 |
  >
  > > [!answer]-
  > > - The pure premiums are $\$600$ local, $\$850$ intermediate and $\$1{,}500$ long haul.
  > > - …
  > > - Long-haul risks cost more than twice as much as local ones, so the class is not homogeneous.
  ```

  Every line of the answer box starts with `> > `, and a bare `>` line
  separates it from the setup. A question of 25 words or fewer keeps the whole
  question as its title and its bullets directly in the card.
  `python3 .claude/skills/actuarial-concept-definitions/long_example_titles.py`
  lists every example title over the limit.
- **The body is bullets, one step per bullet**, each saying what is being done
  and why. The last bullet states the answer. A short lead-in sentence may come
  first ("The sample space lists every outcome of the experiment:").
- **Apply the page's own formula without announcing it.** Don't write "By the
  multiplication principle (see [[Combinatorics]])" in front of a calculation
  that is simply this page's formula. Name another page's rule only when the
  step really uses it, and then link the rule to its heading: "by the
  [[Combinatorics#The multiplication principle|multiplication principle]]".
- **Simple and familiar beats actuarial.** Coins, dice, cards, a race, shirts
  and pants are fine. The example's job is to show the formula; a setting the
  reader has to decode first gets in the way. Use an insurance setting when it
  is just as simple.
- Where the page is about counting or a component of a probability, at least
  one example should end in a probability, so the page connects back to what
  the exam asks.
- **Tables are their own block inside the callout.** Every line starts with
  `> `, there is a bare `>` line before and after the table, and the table is
  never written inside a bullet (`> - | a | b |` renders as a line of pipes).
- **Recompute every number in code**, not by eye.

### 6. Sections — `##`

Each `##` section is one variation of the concept: the general case after the
simple one (*When outcomes are not equally likely*), a special case (*Arranging
all $n$ objects*), a related rule (*The multiplication principle*), a twist
(*Arrangements with repeated objects*). A section is built like the opening:
a sentence leading into the formula, the boxed formula, its bullets, then an
example.

- **The heading says what the section is**, in the plain words a textbook
  would use: *Requirements of outcomes in a sample space*, *Types of sample
  spaces*, *The multiplication principle*, *Symmetry of combinations*, *Number
  of subsets of a set*, *Permutations of all $n$ objects*. Name the result or
  the case the section covers, the way a textbook's section title would. Never
  a slogan, a turn of phrase or a description of an action (*Each outcome once,
  none missing*; *Finite, countable or uncountable*; *Choosing who is in is
  choosing who is out*; *Counting every subset*), which reads as written for
  effect rather than to say what is there. A heading may carry math, but a
  heading other pages link to is better without it.
- **A list of named terms in a section links each one** that has a page:
  `**[[Mutually Exclusive Events|mutually exclusive]]**`.
- Sections go simple → general, and stop when the exam stops. Pick what the
  syllabus and the question bank test; leave out what neither does.
- A page linked from another exam's syllabus (Combination from MAS-I) may end
  with a short section for that exam's use.

### 7. Trap — `> [!trap] <the slip>` (optional)

At most one, for the mistake a reader is most likely to make with this
concept. Open, titled with the slip itself in a few words — what gets confused
or done wrong (`Choose the sample space carefully`, `'At least' versus 'more
than'`, `Roles make it a permutation`), never a turn of phrase (*Similar words,
different event*) — the body saying what the wrong answer looks like and how to avoid
it, with a number if one makes it concrete. It goes at the end of the page, or
in the section where the slip happens. Never use `[!warning]` for it: that
draws a different card.

## How every sentence is written

- **One term per thing, across the whole exam.** An event is always $E$ (a
  second event $F$), the sample space always $S$, an outcome always $s$, the
  number of permutations always ${}_{n}P_{k}$. The exam's notation table in
  `references/vault-mechanics.md` is the list. Never switch letters inside a
  page ("an event A … $P(A) = |E|/|S|$" was the slip that set this rule), and
  never introduce a notation that collides with one already in use ($P(n, k)$
  reads like $P(E)$).
- **Keep the terminology.** Use the terms the definition and the syllabus use
  — *probability*, *event*, *outcome*, *sample space* — never a plainer synonym
  ("chance", "result").
- **One idea per sentence.** No semicolons joining two thoughts and no
  dash-asides. Split it into two sentences.
- **Say it once, and cut what doesn't teach.** No sentence that restates the
  definition, justifies the obvious or points somewhere the reader doesn't need
  to go. The maintainer's edits to the first drafts were all cuts of this kind:
  "Formally,", "because no object can be used twice", "so that … can be
  calculated without listing every outcome", a sentence qualifying the
  multiplication principle.
- **Math in math mode.** Every symbol, including a lone event letter, is in
  `$…$`. Literal braces are `\{ \}` (a bare `{A, B}` is LaTeX grouping and
  loses its braces). A pre-subscript needs an empty group in front of it:
  `{}_{n}P_{k}`.
- Bullets are full sentences ending in a period.

## Qualitative concepts

A concept with no formula keeps the same order. In place of the boxed formula
comes its **defining structure** as plain markdown right after the definition:
a numbered list of its criteria or steps, a nested list for a hierarchy, or a
two- or three-column table against the concept it is confused with. Each item
is one line. The examples are scenarios: the title asks the question, and the
bullets answer it, each a claim with its reason.

## Workflow

1. **Find the page.** `ls -b Concepts/ | grep -i "<keyword>"`. Existing →
   rewrite it in place to this shape; missing → create `Concepts/<Exact
   Name>.md` with a singular-noun name. Check for the same concept under
   another name first — an alias beats a duplicate page.
2. **Read the source and the neighbours.** The syllabus reading the concept
   comes from (the exam page's Source Material), the exam's notation table, and
   the pages the definition will link to.
3. **See what is tested.** The exam page's objective, the questions tagged with
   the page, and what the answerability record quotes from the page:

   ```bash
   python3 -I .claude/skills/actuarial-concept-definitions/page_quotes.py "<Page>"
   ```

   lists every requirement the answerability check (G8) quoted from this page.
   A requirement the bank needs must still be taught after the rewrite; that
   decides which sections the page keeps. It does not mean keeping the old
   sentence: once the page settles, the requirement is re-quoted from the new
   wording (step 7).
4. **Write the page** in the shape above. On an existing page, **re-derive each
   formula against the source** rather than copying it.
5. **Wire links**: every `[[Name]]` must resolve to the right namesake for this
   exam (`references/vault-mechanics.md`).
6. **Validate** — not optional:

   ```bash
   python3 .claude/skills/actuarial-concept-definitions/validate_links.py \
       --exam "Exam P-1 (SOA)" --questions exam-p
   python3 scripts/verify_check.py --sync "Concepts/<page>.md"
   python3 scripts/validate_content.py
   ```

   If you added or renamed a file, also `cd quiz && npm run build && npm test`.
7. **Re-quote the answerability record** once the maintainer has approved the
   page: for each requirement `page_quotes.py` lists as `GONE` that the new page
   teaches, `python3 scripts/answerability_lib.py resolve …` with a quote from
   the new page (it refuses a quote that isn't on the page). A requirement the
   page no longer teaches is reported to the maintainer, not silently dropped.
8. **Present the page for review**: per `CLAUDE.md`, no concept content ships
   100% AI-written without human review.

## Writing for readers

Every sentence a reader sees follows `docs/writing-style.md`: true to its source, one name per thing, no code words, things don't act like people, say it once, and none of its tells (an em dash hinging the sentence, a rule of three, a closing aphorism, "not X, it's Y", a colon reveal, inflated words, feelings on the reader's behalf, rhetorical questions, exclamation marks). Read it before writing. On a concept page in particular:

- The definition, bullets and sections are plain statements. A bullet that defines a term is a sentence, not a slogan.
- *The idea* is one sentence that says how the concept works. It is not an aphorism ("Risk is the price of return") and not a rule of three.
- A trap card names the mistake and the right move. No "Don't fall for it!".
- Use the levels and the app's nouns as the app spells them (`.claude/skills/app-copy/`, Glossary) when a page mentions the app.

## Quality checklist (per page)

**Shape**
- [ ] Figure embed first, if `Media/Figures/<Concept>.svg` exists — and only then
- [ ] `A **Term** is …` — a singular noun (or an uncountable one), the page's title
- [ ] Definition: one or two precise sentences, links on first use, no "Formally" / "Recall"
- [ ] Every formula boxed (`> $$ … $$`), introduced by a sentence ending in "is"
- [ ] Immediately after each box: one bullet per term not defined in the words before it, and conditions as bare bullets
- [ ] No bullet that justifies the formula, restates a definition or introduces a new term (that is a sentence)
- [ ] `[!idea] The idea` only if it says something the definition doesn't — one sentence, anything more as plain text below it
- [ ] Each formula followed by `> [!example]- <the whole question> {Example}` — folded, tagged, the setup in the title
- [ ] An example title over 25 words is split: the question alone in the title, the setup as the card's first block, the working in a nested `> > [!answer]-` box (`long_example_titles.py` finds none on the page)
- [ ] Example bodies: one reasoning step per bullet, the answer last; no "By <this page's rule> (see …)"
- [ ] At least one example ends in a probability, where the page is a counting tool or a component of one
- [ ] `##` sections are variations, simple → general, each sentence → box → bullets → example
- [ ] Headings name the result or case plainly, as a textbook section would — no slogans, turns of phrase or actions
- [ ] A trap's title names the slip itself, not a turn of phrase
- [ ] Every named term with a page is linked; a rule on another page is linked at its heading (`[[Page#Heading|rule]]`)
- [ ] At most one `[!trap]`, open
- [ ] Examples folded, idea and trap open; no *Try it*, *Exam traps* fold or *How it appears on the exam*

**Form**
- [ ] Notation matches the exam's table in `references/vault-mechanics.md`; one letter per thing
- [ ] Tables in callouts are their own block, every line `> `-prefixed, never inside a bullet
- [ ] `\{ \}` for literal braces; `{}_{n}P_{k}` for pre-subscripts; all math in `$…$`
- [ ] No long inline `$…$` (a whole set, a chain of fractions): split it or box it, or it clips its card on a phone
- [ ] Worked numbers recomputed in code
- [ ] All `[[links]]` resolve, to the right namesake
- [ ] Frontmatter holds only `aliases:` (if needed) and the synced `verification:`
- [ ] `validate_links.py`, `verify_check.py --sync` and `validate_content.py` pass
- [ ] Answerability requirements on the page checked (`page_quotes.py`), re-quoted after approval

## After bulk additions

`python3 scripts/update_wiki_links.py` rebuilds `wiki_link` arrays and
`Concepts Without Review Questions.md` — but it rewrites *every* bank, so on
work scoped to one exam prefer remapping that exam's links by hand and telling
the user the generated report is stale. Never hand-edit that file.
