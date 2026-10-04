---
target: Concepts/Probability Distributions.md
created: 2026-10-04
---

## [F-001] Relationships bullets are a pasted mix of rendered and raw LaTeX
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: Relationships, lines 32-34
- claim: Binomial -> Poisson: "As n→∞,p→0,np=λn \to \infty, p \to 0, np = \lambdan→∞,p→0,np=λ."; Binomial -> Normal: "As n→∞,np and $n(1−p)n \to \infty$, np \text{ and } n(1-p)n→∞,np and n(1−p) are large."; Poisson -> Normal: "As λ\lambdaλ becomes large."
- evidence: Each line holds the same condition three times: the rendered text, its LaTeX source outside any math delimiters (so \to, \infty, \text and \lambda print literally), and the rendered text again; the middle line wraps a fragment as $n(1−p)n \to \infty$, which renders as the wrong statement n(1-p)n -> infinity. The conditions the LaTeX source states are the ones the sources give: Binomial -> Poisson as n -> infinity, p -> 0, np = lambda (Grinstead & Snell §5.1 p.189; Siegrist, Poisson distribution); Binomial -> Normal when np and n(1-p) are large (Siegrist, rule of thumb both >= 5; Grinstead & Snell §9.1; Tse §1.3.1 PDF p.25); Poisson -> Normal as the parameter grows (Siegrist, Normal Approximation). Fix is mechanical: keep the LaTeX source each line already contains, delete the two rendered copies, and put the source in $...$.
- source_rank: 2
- proposed_action: Replace the three lines with: As $n \to \infty, p \to 0, np = \lambda$. / As $n \to \infty, np \text{ and } n(1-p)$ are large. / As $\lambda$ becomes large.
- applied: true
- fingerprint: 37aad1cf49b4

## [F-001/R] Correction applied
- entry_type: resolution
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- resolves: F-001
- status: resolved
- note: Applied in this change: each line now carries only the LaTeX source it already contained, in $...$ (no new wording). Renders as: n -> infinity, p -> 0, np = lambda; n -> infinity, np and n(1-p) are large; lambda becomes large.

## [F-002] Binomial labelled as a single coin flip
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: minor
- status: open
- locus: Probability Distributions list, 'Binomial (a Coin Flip)'
- claim: Binomial (a Coin Flip)
- evidence: A single coin flip is a Bernoulli trial; the binomial counts successes in n independent trials. Tse §1.3.1 eq. 1.17 (PDF p.25): BN(n, theta) is 'the probability of obtaining x successes in n independent trials each with probability of success theta'. Grinstead & Snell §9.1 (PDF p.333): S_n, the number of successes in n Bernoulli trials, has the binomial distribution b(n, p, j). The page's own '### Binomial' section says the same ('Tossing a coin n times, how likely to get k heads?'), so the list label contradicts the page. The neighbouring labels are loose analogies rather than definitions (Poisson as 'N Coins Flips', Normal as 'Many Coin Flips') and are not filed separately.
- source_rank: 2
- proposed_action: Relabel the binomial as n coin flips (number of heads), or name a single flip as Bernoulli.
- applied: false
- fingerprint: a8fcf0f5c837

## [F-003] Placeholder text and empty sections
- entry_type: finding
- author: agent:validate-v1
- run_id: 2026-10-04T20:47Z/8861
- date: 2026-10-04
- severity: nit
- status: open
- locus: list items 'Exponential ()', 'Gamma ()'; headings Poisson, Normal, Exponential
- claim: '- **Exponential** ()', '- **Gamma** ()', and the '### Poisson', '### Normal', '### Exponential' headings with nothing under them.
- evidence: Empty parentheses and empty sections are unfinished-draft placeholders: they state nothing to check and render as blank headings. The page is linked from Exam MAS-I (CAS).md five times (Domain A 'the named distributions', 'Distributions that arise', Domain B task 2, Domain C task 11 'distribution for the dependent variable'), so a MAS-I reader lands on it. Filling the sections is authoring and is not done here.
- source_rank: 4
- proposed_action: Fill in the analogies and sections, or remove the empty parentheses and empty headings.
- applied: false
- fingerprint: 200ae7526a20
