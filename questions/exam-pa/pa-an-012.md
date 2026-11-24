---
id: "pa-an-012"
exam: "Exam PA"
topic: "Data Visualization"
learning_objective: "Data Exploration and Visualization"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Data+Visualization
  - Concepts/Double+Lift+Chart
  - Concepts/Holdout+Sample
answer: "E"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6100930e6d267a949819de9d26349c7059f1c3a62330f4b41e0791ea3e113f6f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-pa/pa-an-012.md
---

Underwriting management must decide whether to replace the current auto rating plan with a new pricing model. The actuary's report to them can lead with one exhibit. Which exhibit best supports their decision?

- A) A table of the model's 40 coefficients with their standard errors
- B) A QQ plot of the model's deviance residuals on the training data
- C) A histogram of the model's fitted pure premiums
- D) A 3-D bar chart of actual loss cost by decile on training data
- E) A double lift chart against the current plan on holdout data

## Explanation

Management needs to see whether the new model separates good risks from bad better than the current plan does, on data the model has not seen. A double lift chart sorts the holdout policies by the ratio of the two plans' predictions and shows, in each bucket, which plan's prediction is closer to the actual loss cost. It answers the decision directly, so the answer is **E**.

**Why not the others**

- **A** is a table, which suits precise individual values. Forty coefficients with standard errors do not show whether the model segments risks better, and a business audience cannot read that from them.
- **B** is a working diagnostic of the distribution assumption. It belongs in a technical appendix, not at the head of a report to management.
- **C** shows the spread of the predictions but not whether they match actual losses.
- **D** is built on the training data, where a flexible model always looks good, and the 3-D effect adds ink that carries no data and distorts the bar heights.
