---
id: "pa-an-037"
exam: "Exam PA"
topic: "Boosting"
learning_objective: "Tree-Based Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Boosting
answer: "1042.5"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b5083f62f344c0d9622ca0c740851f4a8a2b106cbe195f27a6c26dfae309050d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-pa/pa-an-037.md
---

A boosted regression tree model for claim severity uses shrinkage $\lambda = 0.05$ and starts from a model that predicts 0. One claim in the training data has a severity of 1,200. The first three trees, each fitted to the current residuals, predict 1,000, 1,100 and 1,050 for this claim.

Calculate the claim's residual after the third tree. Give your answer to one decimal place.

## Explanation

The residual starts at the response, $r = 1{,}200$, and each tree reduces it by $\lambda$ times its prediction:

$$
r \leftarrow r - \lambda \hat{f}^{b}(x)
$$

$$
1{,}200 - 0.05(1{,}000) = 1{,}150
$$

$$
1{,}150 - 0.05(1{,}100) = 1{,}095
$$

$$
1{,}095 - 0.05(1{,}050) = 1{,}042.5
$$

The answer is **1042.5**. The model's prediction for the claim is $\hat{f}(x) = 0.05(1{,}000 + 1{,}100 + 1{,}050) = 157.5$, and $r = 1{,}200 - 157.5 = 1{,}042.5$. With a small shrinkage the model learns slowly, so many more trees are needed.

**Common wrong entries**

- **1147.5**: subtracts only the third tree's shrunken prediction from the response.
- **157.5**: the model's prediction, not the residual.
- **-1950**: leaves out the shrinkage, subtracting the full predictions of 3,150 from 1,200.
