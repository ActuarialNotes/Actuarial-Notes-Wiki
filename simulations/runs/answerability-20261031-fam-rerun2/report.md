# Answerability: Exam FAM (SOA)

Run `answerability-20261031-fam-rerun2` · 1 questions checked of 1 attempted · cost $0.02

Each question's official solution was broken into the knowledge it uses (by a model that saw no study page), and each item was looked for on the pages the vault gives for the question. An item counts as taught only if a quote of the teaching passage is really on the page; the check is done in code. *Answerable* is necessary, not sufficient: a page can hold the formula and still not teach it well.

| Verdict | Questions | Share |
|---|---|---|
| **Answerable** — everything taught on a tagged page, one link away, on the exam's syllabus or on a prerequisite exam's page | 0 | 0% |
| **Untagged** — everything is in the vault, but some of it on a page neither tagged nor linked | 1 | 100% |
| **Gap** — something the solution uses is taught on no page | 0 | 0% |

Requirements: 5 — tagged 3 (60%), linked 1 (20%), syllabus 0 (0%), prerequisite 0 (0%), elsewhere 1 (20%), missing 0 (0%)

## By sitting

A paper whose gaps far outrun the rest may test a reading the syllabus has since dropped.

| Sitting | Questions | Answerable | Untagged | Gap |
|---|---|---|---|---|
| Undated (samples and the vault's own) | 1 | 0 | 1 | 0 (0%) |

## Gaps, by the page that should teach them

Ranked by how many questions each page's gaps cost. The page is the one named for the item's concept; "no page" means the vault has no page by that name.

No gaps found.
## Tagging and linking gaps

The vault teaches what these questions need, but on a page the question isn't tagged with and its tagged pages don't link to. Adding the page to the question's `wiki_link` (or linking it from the tagged page) puts it in reach.

| Question | Pages that teach what it needs |
|---|---|
| `faml-4-12` | Linear Combinations of Random Variables |

## Taught only in a collapsed section

The passage that teaches these items sits inside a folded callout (a worked example, a table behind a toggle). A reader who skims never opens it.

None.

## Every question

<details><summary><code>faml-4-12</code> · untagged</summary>

Tagged pages: Whole Life Insurance, Term Life Insurance, Covariance, Variance

| Item | Kind | Status | Where |
|---|---|---|---|
| A whole life insurance equals a n-year term insurance plus an n-year deferred whole life insurance, so the present value random variable of… | fact | tagged | Term Life Insurance: “The last block splits a [[Whole Life Insurance\\|whole life]] insurance into term cover for $n$ year…” |
| For random variables X and Y and constants a and b, Var(aX + bY) = a^2 Var(X) + b^2 Var(Y) + 2ab Cov(X, Y). | formula | elsewhere | Linear Combinations of Random Variables: “$$\text{Var}(L) = \sum_{i=1}^{n} c_i^2\,\text{Var}(X_i) + 2\sum_{i < j} c_i c_j\,\text{Cov}(X_i, X_…” |
| Cov(X, Y) = E[XY] - E[X]E[Y]. | formula | tagged | Covariance: “$$\text{Cov}(X, Y) = E[XY] - E[X] \cdot E[Y]$$” |
| The present value random variables of an n-year term insurance and an n-year deferred insurance on the same life have product zero, because… | fact | linked | Endowment Insurance: “They can never both be positive, so $E[Z_1 Z_2] = 0$ and $\text{Cov}(Z_1, Z_2) = -A^{1}_{x:\overlin…” |
| Multiplying a random variable by a constant c scales its present value (benefit amount), so a benefit of c units has present value c times … | fact | tagged | Variance: “$\text{Var}(aX + b) = a^2 \text{Var}(X)$ — scaling changes variance, shifts do not” |

</details>

Nothing here edits the vault. A gap is fixed from the syllabus reading, in general form — never by copying the question's own numbers onto the page — and the edited page is fact checked again (docs/verification.md).
