---
concept: "Principal Components Analysis"
exam: exam-mas-ii
topic: "C. Statistical Learning"
correct: B
---
The first component of a claims dataset accounts for 90% of the variance among the predictors. Does that make it the best single predictor of the response?

- A) Yes — the direction carrying the most variance is the one carrying the most signal
- B) No — the components are derived from the predictors alone, without ever consulting the response
- C) Yes, as long as the predictors were standardized beforehand
- D) No, but only because 90% falls short of the usual 95% retention threshold

<!-- rationale: 0: equates variance in X with predictive power for Y, the central misreading of an unsupervised method · 2: names a real prerequisite but treats it as making the claim true · 3: invents a threshold rule and misses that the issue is not the amount of variance -->
