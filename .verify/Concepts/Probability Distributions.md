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
