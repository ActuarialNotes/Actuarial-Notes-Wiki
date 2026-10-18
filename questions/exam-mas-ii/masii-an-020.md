---
id: "masii-an-020"
exam: "Exam MAS-II"
topic: "Double Lift Chart"
learning_objective: "Statistical Learning"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Double+Lift+Chart
  - Concepts/Predictive+Accuracy
answer: "A"
points: 2
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:a3dba3e5eba77df7dff97e2d0c5e6cfcbb839912e36ac01aa31d8858f7acb9f0
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2020), §7.2.2 Double Lift Charts, printed pp.78-79 (PDF 88-89): sort ratio Model A / Model B; first quantile 'those risks which Model A thinks are best relative to Model B'; winner matches actual pure premium in each quantile, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-020.md
---

An actuary builds a double lift chart on holdout data to compare a proposed model with the current rating plan. The sort ratio is (proposed model predicted loss cost) / (current plan predicted loss cost), the data are bucketed into deciles, and each quantity is divided by its overall average. The first and last deciles are:

| Decile | Proposed model | Current plan | Actual |
| :--- | ---: | ---: | ---: |
| 1 | 0.75 | 0.98 | 0.72 |
| 10 | 1.12 | 0.96 | 1.35 |

Which of the following conclusions is best supported?

- A) Decile 1 holds the risks the proposed model rates best relative to the current plan, and the actuals there bear the proposed model out
- B) The current plan is better, because its predictions stay close to 1.00 across the deciles and are therefore more stable
- C) Decile 1 holds the risks with the lowest predicted loss cost under the proposed model, so it shows that model's best risks
- D) Neither model can be judged, because the two models' predictions differ in the deciles being compared
- E) The proposed model over-predicts the worst risks in decile 10, so the current plan is the more accurate there

## Explanation

Sorting on the ratio of the two models' predictions puts the risks on which they **disagree most** at the two ends. Decile 1 holds the risks the proposed model thinks are best *relative to the current plan*; decile 10, those it thinks are worst relative to it.

In decile 1 the actual (0.72) is close to the proposed model (0.75) and far below the current plan (0.98). In decile 10 both models under-predict the actual (1.35), but the proposed model (1.12) is much nearer than the current plan (0.96). The winning model is the one that tracks the actuals where the two disagree, so the proposed model wins. The answer is **A**.

**Why not the others**

- **B** — in a double lift chart the winning model is the one that more closely matches the actual pure premium in each quantile, not the one whose predictions stay near 1.00. Here the current plan is the further from the actuals in both deciles (0.98 against 0.72, and 0.96 against 1.35).
- **C** — that describes a simple quantile plot, sorted on one model's prediction. A double lift chart sorts on the ratio, so decile 1 is "best relative to the current plan", not best in absolute terms.
- **D** — disagreement between the models is exactly what the chart is built to examine.
- **E** — in decile 10 the proposed model *under*-predicts (1.12 against 1.35), and by less than the current plan does.
