---
id: "atpa-an-044"
exam: "Exam ATPA"
topic: "Partial Dependence Plot"
learning_objective: "Model Explainability and Communication"
difficulty: medium
type: multiple-choice
bloom: analyze
wiki_link:
  - Concepts/Partial+Dependence+Plot
  - Concepts/Interaction
answer: "C"
points: 1
---

A GBM predicts claim frequency for a personal auto book. Its partial dependence plot for annual distance driven rises steadily across the range of the data. The individual conditional expectation (ICE) curves for the same variable rise gently for drivers in rural territories and steeply for drivers in urban territories, so the curves fan out as distance increases.

Which conclusion is best supported by the two plots?

- A) Driving more causes more claims, and the effect of driving is strongest in cities
- B) The PDP is in error and should be redrawn by putting the average of the other variables into the model
- C) The model's effect of distance depends on territory, and the PDP's single curve averages that difference away
- D) Distance has the same effect on every record apart from a shift, so the PDP summarizes it well
- E) The fanning shows the GBM has overfit distance, so the variable should be removed from the model

## Explanation

The PDP is the average of the ICE curves. When the ICE curves are parallel, the variable shifts every record's prediction the same way and the PDP describes them all. Here they fan out: the slope for distance differs between rural and urban records. That is an interaction between distance and territory in the model, and the PDP's one curve, whose slope matches neither group, hides it. A two-way partial dependence plot of distance and territory would show it directly. The answer is **C**.

**Why not the others**

- **A** reads a cause into the plots. A rising curve shows that the model's prediction rises with distance, not that distance causes claims.
- **B** confuses the PDP with the model evaluated at the average record. The PDP averages the predictions over every record's other variables, and plugging in averages gives a different curve whenever the model is nonlinear or has interactions.
- **D** is what parallel ICE curves would show. Fanning curves are the opposite case.
- **E** treats an interaction as overfitting. Nothing in the plots says the effect fails on new data; that would need holdout performance.
