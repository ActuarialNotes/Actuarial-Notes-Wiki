---
id: "masi-an-128"
exam: "Exam MAS-I"
topic: "Model Fit"
learning_objective: "Extended Linear Models"
difficulty: hard
type: multi-part
bloom: evaluate
wiki_link:
  - Concepts/Model+Fit
  - Concepts/Holdout+Sample
  - Concepts/Lift
  - Concepts/Overfitting
points: 3
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:2b50b0cbe54b7b07fffc66a168543fc9a647914dd9723324efa6e28e54175783
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (rank 3 for MAS-I), §7.2.1 Simple Quantile Plots, PDF p.87 (sort by predicted, equal-exposure quantiles, actual vs predicted; criteria predictive accuracy, monotonicity, vertical distance between first and last quantiles = lift), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C 'Extended Linear Models' tasks 1-9 (PDF p.5); Complete Text References: Dobson & Barnett Ch 1-9, Hogg 9.1-9.6, James et al. Ch 1-7 as limited, Larsen (PDF p.6), sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-128.md
---

Two severity GLMs were fitted to the same training data and are compared on a holdout sample. For each model separately, the holdout claims are sorted by **that model's** predicted severity and split into five groups of equal claim count. Average predicted and actual severity (in thousands) are:

| Quintile | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|
| Model 1 predicted | 4.0 | 5.0 | 6.0 | 7.0 | 8.0 |
| Model 1 actual | 5.2 | 5.4 | 6.0 | 6.6 | 6.8 |
| Model 2 predicted | 3.6 | 4.8 | 6.0 | 7.4 | 9.0 |
| Model 2 actual | 3.8 | 4.7 | 6.1 | 7.3 | 9.2 |

The pricing team will prefer the model whose actual-to-predicted ratios are closest to 1 across the quintiles **and** whose actual results separate the low-severity groups from the high-severity groups more. For Model 1, the ratio of actual severity in quintile 5 to that in quintile 1 is 6.8 / 5.2 = 1.31.

## Part a (1 point)
Calculate the same ratio for Model 2: actual severity in quintile 5 divided by actual severity in quintile 1. Give your answer to two decimal places.

### Answer
2.42

### Explanation

$$
\frac{9.2}{3.8} = 2.421
$$

The answer is **2.42**: the claims Model 2 ranks highest really are about 2.4 times as severe as those it ranks lowest.

**Common wrong entries**

- **2.50** — the ratio of the *predicted* severities, 9.0 / 3.6. The predicted spread says how much the model claims to separate risks; only the actual spread shows that it does.
- **5.40** — the difference 9.2 minus 3.8 rather than the ratio.

## Part b (1 point)
Using the team's two criteria, which model should be preferred?

- A) Model 1, since its overall actual-to-predicted ratio is exactly 1
- B) Model 2, since its ratios stay near 1 and its actual spread is wider
- C) Model 1, since its narrower predicted range makes overfitting less likely
- D) Model 2, since a wider predicted range by itself shows a better fit
- E) Neither, since both overall ratios are near 1, so the two fit equally well

### Answer
B

### Explanation

Model 1's ratios run

$$
\frac{5.2}{4.0} = 1.30, \quad 1.08, \quad 1.00, \quad 0.94, \quad \frac{6.8}{8.0} = 0.85
$$

falling steadily from quintile 1 to quintile 5: it over-predicts its high-risk groups and under-predicts its low-risk ones, so its relativities are too steep. Model 2's ratios are 1.06, 0.98, 1.02, 0.99 and 1.02, all close to 1, and its actual spread (2.42) is far wider than Model 1's (1.31). Model 2 wins on both criteria. The answer is **B**.

- **A** and **E** — rest on the overall ratio, which only checks that total predicted equals total actual. Model 1 is balanced in total precisely because its errors at the two ends cancel.
- **C** — Model 1's narrower range has not protected it: its holdout results are flatter still than its predictions, the pattern of a model that does not separate risks well.
- **D** — a wide predicted range is no evidence on its own; an overfit model also predicts a wide range. It counts only because Model 2's *actual* results follow it.

## Part c (1 point)
Explain what Model 1's pattern of actual-to-predicted ratios says about its relativities, and what the pricing team would charge if it adopted Model 1.

### Explanation

A full-credit answer makes these points:

1. Model 1's ratios fall steadily from above 1 in the lowest quintile to below 1 in the highest: it predicts more variation in severity than actually exists on new data, so its relativities are too extreme.
2. Adopting it would **overcharge** the risks it rates highest (actual is 15% below predicted in quintile 5) and **undercharge** those it rates lowest (actual is 30% above predicted in quintile 1), even though total premium would be about right.
3. Model 2's ratios stay within a few percent of 1 in every quintile, so its relativities hold up on data it was not fitted to.

**Sample answer.** Model 1's actual-to-predicted ratio drops from 1.30 to 0.85 across the quintiles, so on holdout data its high predictions are too high and its low predictions too low; its relativities overstate the differences between risks, which is what an overfit or misspecified model does. Priced on Model 1, the risks it rates best would produce losses about 30% above what they are charged for and the risks it rates worst about 15% below, with the errors cancelling in total. Model 2 is accurate in every quintile and separates the risks much more, so it is the better rating model.
