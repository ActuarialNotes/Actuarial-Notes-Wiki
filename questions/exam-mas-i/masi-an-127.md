---
id: "masi-an-127"
exam: "Exam MAS-I"
topic: "Model Fit"
learning_objective: "Extended Linear Models"
difficulty: easy
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Model+Fit
  - Concepts/Holdout+Sample
answer: "E"
points: 1
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:55c3d836205209c43795461386ae9a619ff88ad0559cd19a829649b0ebcc3f01
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §7.2.1 Simple Quantile Plots, PDF p.87 (sort by predicted, equal-exposure quantiles, actual vs predicted; criteria predictive accuracy, monotonicity, vertical distance between first and last quantiles = lift), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-127.md
---

A pure premium GLM is tested on a holdout sample. The holdout policies are sorted by predicted pure premium and split into five groups of equal exposure. Predicted and actual losses (in thousands) are:

| Quintile | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Predicted | 200 | 300 | 400 | 520 | 780 |
| Actual | 240 | 297 | 392 | 530 | 702 |

Calculate the actual-to-predicted ratio for the quintile in which the model fits worst, measured by how far that ratio is from 1.

- A) 0.83
- B) 0.90
- C) 0.98
- D) 1.11
- E) 1.20

## Explanation

Divide actual by predicted in each quintile:

$$
\begin{align*}
\text{Q1} &: 240 / 200 = 1.200 \\
\text{Q2} &: 297 / 300 = 0.990 \\
\text{Q3} &: 392 / 400 = 0.980 \\
\text{Q4} &: 530 / 520 = 1.019 \\
\text{Q5} &: 702 / 780 = 0.900
\end{align*}
$$

The ratio farthest from 1 is quintile 1's, **1.20**: actual losses in the lowest-risk group run 20% above what the model predicts. The answer is **E**.

**Why not the others**

- **A** — inverts the ratio (predicted ÷ actual). Then quintile 1 gives 200/240 = 0.83, the value farthest from 1 on that scale; it is the same quintile, misreported.
- **B** — picks the quintile with the largest *dollar* gap (quintile 5, 78 thousand). A gap in dollars grows with the size of the group's losses; fit is judged on the ratio, where quintile 5 is off by 10%, not 20%.
- **C** — the overall ratio, 2,161 / 2,200 = 0.98, measures balance in total, which can hide offsetting misfits in the quintiles.
- **D** — predicted ÷ actual for quintile 5, 780 / 702 = 1.11: both the inverted ratio and the dollar-gap choice.
