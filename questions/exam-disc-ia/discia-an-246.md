---
id: "discia-an-246"
exam: "Exam DISC-IA"
topic: "Policy Form Regulation"
learning_objective: "16. Insurance Regulation"
difficulty: hard
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Policy+Form+Regulation
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:0eb19005a5100187ff25ac610d6d019cb2808d142907dde0e72c194ee500bae2
  sources:
    - "NAIC Life and Health Insurance Policy Language Simplification Model Act (#575, 1995), s.5A-B, s.7, sha256:f35b42a1540ecf9afa159d13ff31e35c08ffd4be9b6ab75ba5c34edd5da70d10 — https://content.naic.org/sites/default/files/model-law-575.pdf"
    - "N.Y. Insurance Law s.3102, (a), (c)(1), read via WebFetch 2026-10-10 (host refuses scripted fetch, no hash) — https://www.nysenate.gov/legislation/laws/ISC/3102"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-ia/discia-an-246.md
---

An insurer's personal auto policy form for New York has 4,000 words of countable text in 160 sentences, with 6,400 syllables. The Flesch reading ease score is $F = 206.835 - 1.015\,(W/S) - 84.6\,(Y/W)$. New York requires a score of at least 45 for these policies, and the NAIC's life and health model requires at least 40. Which statement is correct?

- A) The score is 46.1, which fails both minimums, since a higher score means harder text
- B) The score is 46.1, which meets both the NAIC's 40 and New York's 45
- C) The score is 46.1, which meets the NAIC's 40 but not New York's 45
- D) The score is 71.5, which meets both minimums by a wide margin

## Explanation

$$
\begin{align*}
F &= 206.835 - 1.015\left(\frac{4{,}000}{160}\right) - 84.6\left(\frac{6{,}400}{4{,}000}\right) \\
&= 206.835 - 25.375 - 135.36 \\
&= \mathbf{46.1}
\end{align*}
$$

A minimum score is a floor on readability, and 46.1 is above both 40 and 45.

- **A** reads the scale backwards. Longer sentences and longer words lower the score, so a higher score means easier text.
- **C** compares the score with the wrong side of 45.
- **D** drops the sentence-length term, $F = 206.835 - 135.36$.
