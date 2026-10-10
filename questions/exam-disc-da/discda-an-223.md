---
id: "discda-an-223"
exam: "Exam DISC-DA"
topic: "Summary Statistics"
learning_objective: "8. Basic Data Analysis"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Summary+Statistics
  - Concepts/Frequency
answer: "B"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:5bedfd786bce9dfc3631ecb34b2503c6c8d414495438353198fdcc6a66927ad6
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.1 Frequency definition PDF p.19, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-disc-da/discda-an-223.md
---

A one-way table of personal auto experience by vehicle use shows:

| Use | Car-years | Claims |
| :--- | ---: | ---: |
| Pleasure | 5,000 | 250 |
| Commute | 3,000 | 240 |
| Business | 2,000 | 200 |

What is the overall claim frequency for the three uses combined?

- A) 0.0500
- B) 0.0690
- C) 0.0749
- D) 0.0767

## Explanation

Frequency is claims divided by exposure, and the overall figure is a ratio of sums:

$$
\begin{align*}
\text{Frequency} &= \frac{250 + 240 + 200}{5{,}000 + 3{,}000 + 2{,}000} \\
&= \frac{690}{10{,}000} \\
&= 0.0690
\end{align*}
$$

The answer is **B**.

**Why not the others**

- **A** — 0.0500 is the Pleasure frequency alone, the base level, not the total.
- **C** — 0.0749 averages the three level frequencies weighted by claim counts; frequencies must be weighted by exposure.
- **D** — 0.0767 is the unweighted average of 0.050, 0.080 and 0.100, which ignores that Pleasure has half the exposure.
