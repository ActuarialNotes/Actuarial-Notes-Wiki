---
id: "pa-an-015"
exam: "Exam PA"
topic: "Feature Engineering"
learning_objective: "Data Transformations and Unsupervised Learning Techniques"
difficulty: hard
type: multiple-choice
bloom: evaluate
wiki_link:
  - Concepts/Feature+Engineering
  - Concepts/Train-Test+Split
answer: "E"
points: 1
---

An insurer wants a model that predicts, at first notice of loss, the eventual severity of each new auto claim, so that adjusters can set initial reserves. The team proposes features for it. Determine which of the following statements are true.

- I. The number of days between the accident date and the date the claim was reported may be used as a feature.
- II. The claim's total payment at closing must be left out, because it is known only after the outcome.
- III. Each territory's average severity may be used as a feature if it is computed from the training data alone and applied to the other data sets.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

A feature must be computable from information available when the prediction is made.

**I is true.** Both dates are known at first notice of loss, so the reporting lag is available when the model is used.

**II is true.** The total payment at closing is recorded only after the outcome, and it is close to the outcome itself. It would leak the target: it looks excellent in testing and is useless at first notice of loss.

**III is true.** A territory's average severity is built from the target. Computed on all the data, it would include the held-out claims' own outcomes and leak them into the fit. Computed from the training data alone and then applied to the other sets, it is valid (preferably with thin territories combined or credibility-weighted).

All three statements are true. No option from (A) to (D) includes all three, so the answer is **E**.

**Why not the others**

- **A** rejects II and III: it misses the leak from a value recorded after the outcome, and it treats every feature built from the target as leakage, even one computed from the training data alone.
- **B** rejects III, treating a target-based feature as leakage even when the held-out data play no part in computing it.
- **C** rejects II, missing that a value recorded after the outcome leaks the target.
- **D** rejects I, although both dates are known at first notice of loss.
