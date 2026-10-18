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
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:689dbb11d195184ade3a11f1db52dd29adc2cd3f9e78a97b5d18ad65933ad0a5
  sources: []
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

- **B** — a flat line near 1.00 in a double lift chart is the signature of the *losing* model: the risks it fails to separate are the ones the other model has identified.
- **C** — that describes a simple quantile plot, sorted on one model's prediction. A double lift chart sorts on the ratio, so decile 1 is "best relative to the current plan", not best in absolute terms.
- **D** — disagreement between the models is exactly what the chart is built to examine.
- **E** — in decile 10 the proposed model *under*-predicts (1.12 against 1.35), and by less than the current plan does.
