---
id: "pa-an-033"
exam: "Exam PA"
topic: "Bagging"
learning_objective: "Tree-Based Models"
difficulty: medium
type: multiple-choice
bloom: understand
wiki_link:
  - Concepts/Bagging
  - Concepts/Out-of-Bag+Error
  - Concepts/Hyperparameter
answer: "D"
points: 1
---

An analyst is building a bagged tree model for workers' compensation claim severity on 10,000 claims.

Determine which of the following statements are true.

- I. Each tree should be pruned by cross-validation before the trees are averaged, because an unpruned tree has high variance.
- II. Raising the number of trees from 300 to 3,000 does not cause overfitting, so the number of trees only needs to be large enough for the error to settle.
- III. Each claim's out-of-bag prediction averages roughly a third of the trees, the ones whose bootstrap samples left that claim out.

- A) I only
- B) I and II only
- C) I and III only
- D) II and III only
- E) The answer is not given by (A), (B), (C), or (D)

## Explanation

**I is false.** In bagging the trees are grown deep and left unpruned. Each has low bias and high variance, and averaging them cuts the variance while leaving the bias essentially unchanged. Pruning each tree would add bias that averaging cannot remove.

**II is true.** The number of trees $B$ is not a tuning parameter in bagging. The error flattens as $B$ grows and never increases, so $B$ is set large enough for the error to settle.

**III is true.** A bootstrap sample leaves out a given claim with probability $(1 - 1/n)^n \approx 0.368$, so each claim is out of bag for about a third of the trees. Its out-of-bag prediction uses only those trees, which never saw it.

II and III are true, so the answer is **D**.

**Why not the others**

- **A**, **B** and **C** accept I, applying the advice for a single tree to the trees of an ensemble.
- **E** would need another combination, but II and III are true and I is false.
