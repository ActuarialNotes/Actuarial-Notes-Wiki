---
id: "masii-an-009"
exam: "Exam MAS-II"
topic: "Out-of-Bag Error"
learning_objective: "Statistical Learning"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Out-of-Bag+Error
  - Concepts/Bagging
  - Concepts/Bootstrap
answer: "B"
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3da3b245b84573870a43e477d0a8b944d084ba04b291826de28b4cfb2fb232d4
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-009.md
---

An actuary fits a bagged regression tree model with $B = 600$ trees to 4,000 claims and reports its out-of-bag (OOB) error.

Determine which of the following statements are true.

- I. Each claim is out of bag for roughly one-third of the trees, so its OOB prediction averages the predictions of about 200 trees.
- II. With $B$ sufficiently large, the OOB error is virtually equivalent to the leave-one-out cross-validation error.
- III. The OOB error estimate requires a separate validation set, held out before bagging, on which to score the OOB predictions.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

- **I — true.** A bootstrap sample of $n$ drawn with replacement misses a given observation with probability $(1 - 1/n)^n \approx e^{-1} = 0.368$, so on average each tree is fitted to about two-thirds of the observations and each observation is out of bag for about $B/3 \approx 200$ trees. Its OOB prediction averages those trees (a majority vote for classification).
- **II — true.** Each claim is predicted only by trees that never saw it; with many trees this is virtually the leave-one-out cross-validation error, without refitting anything.
- **III — false.** The point of OOB error is that no held-out set is needed. Every claim is scored by the trees fitted without it, and the OOB MSE over all 4,000 claims is a valid estimate of the bagged model's test error.

I and II only, so the answer is **B**.

**Why not the others**

- **A** — misses statement II; the near-equivalence with leave-one-out cross-validation is why OOB error can replace cross-validation for a bagged model.
- **C** and **D** — count statement III as true, treating OOB error like a validation-set estimate that needs data held out in advance.
- **E** — would need all three true; statement III is false.
