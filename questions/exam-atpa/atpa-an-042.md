---
id: "atpa-an-042"
exam: "Exam ATPA"
topic: "Variable Importance"
learning_objective: "Model Explainability and Communication"
difficulty: easy
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Variable+Importance
  - Concepts/Partial+Dependence+Plot
  - Concepts/Explainability
answer: "B"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a05e29541ad26179ac61608e1bace1690221f666c5537cdf6ddd6853e1209b4c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-atpa/atpa-an-042.md
---

A random forest predicts the claim frequency of small commercial property risks. Its variable importance plot, rescaled so the largest is 100, shows building age 100, construction class 62, sprinkler status 35 and territory 12. The underwriting manager reads the plot and asks what it tells her.

Which conclusion does the variable importance plot support on its own?

- A) Older buildings have higher predicted frequency than newer ones, by more than any other variable moves it
- B) The forest relies on building age more than on any other variable, in a direction the plot does not show
- C) Building age causes more of the variation in claim frequency than construction class does
- D) Territory has no effect on the predicted frequency and can be dropped without loss of accuracy
- E) Sprinkler status lowers the predicted frequency by about a third as much as building age raises it

## Explanation

A variable importance plot measures how much the forest's splits on each variable reduce impurity, averaged over the trees and rescaled. It ranks how much the model relies on each variable and says nothing about which way a variable moves the prediction. Building age ranks first, so the plot supports only that the model leans on it most. The direction and shape of its effect need a partial dependence plot or Shapley values. The answer is **B**.

**Why not the others**

- **A** reads a direction (older means higher) into the plot. That needs a partial dependence plot.
- **C** reads a cause into it. An importance describes what the model does with a variable, not that the variable causes losses.
- **D** treats a low importance as proof of no effect. A variable whose credit is taken by a correlated one can look unimportant; refitting without it and comparing out-of-bag error is the test.
- **E** turns the rescaled scores into signed effects. The scores have no sign, and 35 against 100 compares reliance, not the size of a change in frequency.
