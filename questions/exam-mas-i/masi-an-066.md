---
id: "masi-an-066"
exam: "Exam MAS-I"
topic: "Empirical Distribution"
learning_objective: "Statistics"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Empirical+Distribution
  - Concepts/Loss+Elimination+Ratio
  - Concepts/Limited+Expected+Value
  - Concepts/Deductible
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:cfd269533fa5f8ee39af626a6f879beaaba64602aa0a9b5d79455a2355b21c26
  sources:
    - "Frees et al., Loss Data Analytics (open text), ch.3 Modeling Loss Severity, 3.4.1 loss elimination ratio = [E(X) - E(Y^L)]/E(X) = E(X^d)/E(X), sha256:263021bf543b04b2881284b38b7dcbd0586b78daec371b88a1eefcd362dff732 — https://openacttexts.github.io/Loss-Data-Analytics/ChapSeverity.html"
    - "CAS Exam MAS-I Content Outline 2026, Domain B tasks 1-9 and readings (Hogg, Tse), PDF p.4; text references (Hogg B sections incl. 2.8; Tse 2.2-2.5, 10.1, 10.2, 11.1, 12.1, 12.3, 13.2), PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-066.md
---

Twelve ground-up losses, all fully observed, are:

$$
150,\ 300,\ 300,\ 450,\ 700,\ 1{,}000,\ 1{,}000,\ 1{,}400,\ 2{,}200,\ 3{,}100,\ 5{,}000,\ 8{,}200
$$

Using the empirical distribution of these losses, estimate the loss elimination ratio of an ordinary deductible of 1,000.

- A) Less than 0.25
- B) At least 0.25, but less than 0.40
- C) At least 0.40, but less than 0.50
- D) At least 0.50, but less than 0.60
- E) At least 0.60

## Explanation

The empirical distribution puts probability 1/12 on each loss, so every expectation is a plain average over the twelve. The loss elimination ratio is

$$
\text{LER}(1{,}000) = \frac{E[X \wedge 1{,}000]}{E[X]}
$$

Every loss is capped at 1,000 in the numerator — the five losses above the deductible each contribute 1,000:

$$
\begin{align*}
\widehat{E}[X] &= \frac{23{,}800}{12} \\
&= 1{,}983.33 \\
\widehat{E}[X \wedge 1{,}000] &= \frac{150 + 300 + 300 + 450 + 700 + 1{,}000 + 1{,}000 + 5 \times 1{,}000}{12} \\
&= \frac{8{,}900}{12} \\
&= 741.67 \\
\widehat{\text{LER}} &= \frac{741.67}{1{,}983.33} \\
&= 0.374
\end{align*}
$$

This is at least 0.25 but less than 0.40, answer **B**.

**Why not the others**

- **A** — 0.164 comes from summing only the losses at or below 1,000, forgetting that every larger loss also has its first 1,000 eliminated.
- **C** — 0.417 is 5/12, the proportion of losses strictly below the deductible: a count of claims eliminated, not a share of dollars.
- **D** — 0.583 is $F_{12}(1{,}000) = 7/12$, the same count confusion including the two losses of exactly 1,000.
- **E** — 0.626 is one minus the LER, the share of expected losses the insurer still pays.
