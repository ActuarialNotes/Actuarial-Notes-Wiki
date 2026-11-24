---
id: "atpa-an-043"
exam: "Exam ATPA"
topic: "Variable Importance"
learning_objective: "Model Explainability and Communication"
difficulty: hard
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Variable+Importance
  - Concepts/Out-of-Bag+Error
answer: "E"
points: 1
---

A bagged tree model predicts auto physical damage severity. Two of its predictors, vehicle value and vehicle symbol, are strongly correlated. In the impurity-based importance ranking, vehicle value scores 100 and vehicle symbol scores 9. A junior analyst proposes dropping vehicle symbol to simplify the model, on the grounds that its importance shows it adds almost nothing.

Which response to the proposal is most appropriate?

- A) Accept it, because an importance of 9 out of 100 shows that vehicle symbol has almost no effect on predicted severity
- B) Accept it, because impurity-based importance favours predictors with few distinct values, so 9 overstates vehicle symbol's role
- C) Reject it, because a variable's importance score changes very little when a correlated predictor is dropped
- D) Reject it, because every predictor in a bagged model must be kept for its averaged importances to remain valid
- E) Test it first by refitting without vehicle symbol and comparing the out-of-bag error with the current model's

## Explanation

Correlated predictors split the credit for the same information, so either can look unimportant beside the other. A low score is therefore not proof of no effect. The test is to drop the predictor, refit, and compare the out-of-bag error: an unchanged error means vehicle symbol was redundant and can go, and a higher error means its low score hid a real contribution. The answer is **E**.

**Why not the others**

- **A** treats a low importance as proof of no effect, ignoring that vehicle value may be taking its credit.
- **B** reverses the known bias. Impurity-based importance is biased toward predictors with **many** distinct values, which is why permutation importance is sometimes preferred.
- **C** is backwards. Dropping one of two correlated predictors usually makes the other's importance jump, because it inherits the shared credit.
- **D** invents a rule. A predictor can be dropped from a bagged model; the model is then refit and its importances recomputed.
