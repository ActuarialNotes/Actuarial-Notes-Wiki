# Vault mechanics for concept pages

The rules that keep a concept page reachable and rendering in the built app.
None of them is about teaching; all of them fail silently.

## The filename *is* the API

A page's filename is its link target, and the build is unforgiving about it.
These failures are invisible in the markdown and in Obsidian, but break the
built app:

- **The `.md` extension is mandatory.** Every collector in `quiz/vite.config.ts`
  filters on `.endsWith('.md')`. A file saved without it is dropped from the
  bundle — the page vanishes from the wiki and search, and every `[[link]]` to
  it dead-ends. This has happened to core pages (`Concepts/Ratemaking`,
  `Concepts/Loss Reserving`) and is undetectable by reading the file.
- **Filenames use spaces, never underscores or hyphens-for-spaces.**
  `Retrospective_Rating.md` does not answer `[[Retrospective Rating]]`. Keep
  genuine hyphens that belong to the term (`Bornhuetter-Ferguson Method`,
  `On-Leveling`, `Self-Insured Retention`) — but then every inbound link must
  spell them the same way. Hyphen/space drift is the most common broken link in
  this vault.
- **`conceptMatch.ts` resolves display aliases, not filename variants.**
  `[[Bond Price|Price]]` works because the *target* is exact. `[[Bond-Price]]`
  does not. Never rely on fuzzy matching.

`validate_links.py` catches all three.

## Aliases

When a study guide links the page under a different spelling
(`[[Black-Schole]]` for `Black-Scholes Model`), write the spelling as a YAML list
in a frontmatter block of its own; `verify_check.py --sync` appends
`verification:` after it:

```markdown
---
aliases:
  - Black-Schole
  - Black-Scholes
---
**The Black-Scholes Model** …
```

Frontmatter aliases are read by Obsidian and the AI connector — **not by the
app**, which fetches `Concepts/<exact link target>.md`. So an alias also goes in
`scripts/concept_aliases.json` (below), which is what makes the link land in the
app. (A handful of older pages carry other frontmatter keys; don't copy them.)

### Variant spellings on a generated study guide

The in-development exam pages (the SOA's FAM onward, the DISCs, 6U) are
*generated* by `scripts/syllabus_write.py`, which links every noun phrase of an
objective to the page that names it — or to the page that *should* exist, named
by its own rule (Title Case, singular). That rule produces targets that are poor
titles (`[[Black-Schole]]`, `[[Joint Live]]`, `[[Delta]]` for *delta method*) and
cuts terms short (`[[Generalized Linear]] model`). Don't hand-edit those pages
(`syllabus_lint.py` holds them to the extracted syllabus) and don't name a page
after a bad target. Instead:

1. Write the page under its proper title, with the linked spelling in its
   frontmatter `aliases:`.
2. Map the spelling in `scripts/concept_aliases.json` → `aliases` (key written
   lower-case, hyphens as spaces: `"black schole": "Black-Scholes Model"`). When
   the spelling means different pages on different exams, use `namesakes`
   instead, keyed by wiki id (`"governance": {"default": "Corporate Governance",
   "cp-312": "Model Governance"}`). `quiz/src/lib/examCatalog.test.ts` fails if
   a target page doesn't exist, so commit the page before or with the entry.
3. Re-render the affected exam pages — `python3 scripts/syllabus_write.py <wiki
   ids>` then `python3 scripts/verify_check.py --sync` — which re-points the
   links through the alias table and changes nothing else. A target that is
   already a good title needs none of this: name the page exactly as linked.

## Namesake pages — link the one for the right exam

Several terms exist twice with different meanings per exam. Linking the wrong
one is silent: the link resolves, so no validator catches it, but the reader
lands on an unrelated page.

| Term | Exam P/FM page (severity math) | Exam 5 page (pricing procedure) |
|---|---|---|
| Deductible | `Deductible` | `Deductible Rating` |
| Coinsurance | `Coinsurance`, `Coinsurance Percentage` | `Coinsurance Rating` |
| Case reserves | `Case Reserves` (the liability) | `Case Outstanding Development Method` (the technique) |
| Trend | `Trend` (generic) | `Loss Trend`, `Premium Trend`, `Exposure Trend` |

When a syllabus objective says "calculate deductible relativities," it wants the
*rating* page. Check both candidates before linking.

## LaTeX rules (phone readability — same as the question converters)

The app renders with `remark-math` + `rehype-katex`; pages are read on phones.

1. **`align*` for any multi-step derivation.** Never chain evaluation steps as
   separate `$$` blocks, or as several `=` on one line. Each step on its own
   `&=` line:

   ```markdown
   > > $$
   > > \begin{align*}
   > > P[H \mid C] &= \frac{P[C \mid H]\,P[H]}{P[C]} \\
   > >            &= \frac{(0.40)(0.20)}{0.16} \\
   > >            &= 0.50
   > > \end{align*}
   > > $$
   ```

   (Inside an answer callout each line is also prefixed with `> > `.)
2. **`$$` delimiters on their own lines.** Never
   `$$\begin{align*}...\end{align*}$$` on one line — it renders as raw text.
3. **One `=` per line in derivations.** Not `X &= formula = result`; split the
   result onto its own `&=` line. Short decimal→percent pairs
   (`= 0.05127 = 5.127\%`) may stay together.
4. **Clean notation:** `$…$` inline, `$$…$$` display. No smart quotes, no OCR
   dashes (`−` → `-`), no Unicode fractions (`½` → `\frac{1}{2}`) or Greek
   letters typed as Unicode. Use `\times`, `\leq`, `\geq`, `\cdot`. Money goes
   *inside* the math with the dollar escaped — `$\$1{,}000$` — never an escaped
   dollar before the math (`\$$1{,}000$`), which starts with `$$` and can open a
   display block.

`quiz/src/lib/vaultMath.ts` repairs some Obsidian-isms at render time; write
the vault the Obsidian way and these rules on top.

## Notation by exam

Match the neighbouring pages:

- **Exam P:** `f(x)`, `F(x)`, `E[X]`, `\text{Var}(X)`, `P(A \mid B)`.
- **Exam FM:** `i`, `v`, `d`, `\delta`, `a_{\overline{n}|}`, `s_{\overline{n}|}`,
  `\ddot{a}_{\overline{n}|}`.
- **Exam 5:** `\text{CDF}`, age-to-age `f_{n \to n+1}`, loss-ratio and
  pure-premium notation; ratemaking is **prospective**, reserving
  **retrospective** — say which, and keep the vocabularies distinct
  (development *to* ultimate vs trend *forward to* the policy period; conflating
  them double-counts).

## Topic reference

- **Exam P objectives:** General Probability · Univariate Random Variables ·
  Multivariate Random Variables.
- **Exam FM objectives:** Time Value of Money · Annuities/Cash Flows · Loans ·
  Bonds · General Cash Flows, Portfolios & ALM.
- **Exam 5 objectives:** Ratemaking (45–55%) · Estimating Claim Liabilities
  (45–55%). Readings: Werner & Modlin, Friedland, ASOP 12/13/43, CAS Statement
  of Principles.
- The richer topic→concept mapping lives in
  `.claude/skills/soa-exam-converter/SKILL.md`,
  `.claude/skills/cas-exam-converter/SKILL.md` and `scripts/ontology_map.py` —
  consult them to pick canonical concept names consistent with how questions are
  tagged.
