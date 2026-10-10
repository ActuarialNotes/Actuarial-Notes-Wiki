---
id: "discda-an-212"
exam: "Exam DISC-DA"
topic: "Model Training and Evaluation"
learning_objective: "Understanding Fundamental Modeling Concepts"
difficulty: medium
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Model+Training+and+Evaluation
  - Concepts/Train-Test+Split
  - Concepts/Holdout+Sample
answer: "B"
points: 1
---

A homeowners wind model is built on five accident years of policy data, including a year with one large hurricane that produced thousands of claims. The analyst splits the records 70/30 at random into training and test sets, and the test-set lift is excellent. The chief actuary doubts the result. Which concern is most valid, and what should be done?

- A) The test set is too small; switch to a 90/10 random split to get more test claims
- B) Hurricane claims fall in both sets; test on a later period not used for training
- C) Random splits always overstate lift; abandon the test set and judge training fit
- D) The model has too few variables; add predictors until the training error stops falling

## Explanation

When one event causes many losses, a random split puts losses from the same storm in both the training and test sets, so the test set is not truly unseen and the validation is over-optimistic. Goldburd et al. recommend an **out-of-time** test set, such as a later year, for perils driven by common events like wind. The answer is **B**.

**Why not the others**

- **A** — a 90/10 split leaves even fewer test claims and keeps the same storm in both sets; it does not address the leak.
- **C** — training fit is the most optimistic measure of all. The cure is a better holdout, not none.
- **D** — adding predictors until training error stops falling invites overfitting, and the problem here is the evaluation, not the model.
