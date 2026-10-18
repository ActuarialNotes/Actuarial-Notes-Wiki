---
id: "masii-an-018"
exam: "Exam MAS-II"
topic: "Lift"
learning_objective: "Statistical Learning"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Lift
  - Concepts/Quantile+Plot
answer: "D"
points: 2
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:562611316671ae45ef4da2dcbe042f1757c9aa3d45c3cbeff4a90142b2acfba0
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2020), §7.2.1 Simple Quantile Plots, printed p.77 (PDF 87): lift is the difference between actual pure premiums in the first and last quantiles; predicted pure premium rises by definition, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §3.1 Lift, PDF p.4: L_ratio = Y_Q / Y_1 on actual rates, sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-018.md
---

Two pure premium models are compared with simple quintile plots on a holdout data set. Within each quintile, pure premiums are divided by the overall average. The first and last quintiles are:

| | Model A predicted | Model A actual | Model B predicted | Model B actual |
| :--- | ---: | ---: | ---: | ---: |
| Quintile 1 | 0.60 | 0.70 | 0.58 | 0.55 |
| Quintile 5 | 1.55 | 1.40 | 1.45 | 1.50 |

Lift is measured as the ratio of the actual pure premium in the last quintile to that in the first.

Determine which model shows more lift, and the amount of that model's lift.

- A) Model A, with lift 2.58
- B) Model A, with lift 2.00
- C) Model B, with lift 2.50
- D) Model B, with lift 2.73
- E) Model B, with lift 1.50

## Explanation

Lift is the vertical distance between the first and last quantiles, and it is read off the **actual** pure premiums: the question is how well the model separates the risks that actually turn out best from those that turn out worst.

$$
\text{Lift}_A = \frac{1.40}{0.70} = 2.00, \qquad \text{Lift}_B = \frac{1.50}{0.55} = 2.73
$$

Model B shows more lift, **2.73**. The answer is **D**.

**Why not the others**

- **A** — 1.55/0.60 = 2.58 is Model A's spread of *predicted* values. Any model's predictions rise across its own quantiles by construction; only the actuals show whether that spread is real. Model A's actuals (0.70 to 1.40) are flatter than its predictions.
- **B** — Model A's actual lift, but it is the smaller of the two.
- **C** — 1.45/0.58 = 2.50 is Model B's predicted spread, not its actual.
- **E** — the last quintile against the overall average (1.50), not against the first quintile.
