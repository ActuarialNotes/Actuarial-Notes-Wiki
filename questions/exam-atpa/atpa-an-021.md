---
id: "atpa-an-021"
exam: "Exam ATPA"
topic: "Predictive Accuracy"
learning_objective: "Advanced Predictive Analytics Models"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Predictive+Accuracy
  - Concepts/AUROC
  - Concepts/Gini+Index
answer: "0.60"
points: 1
---

A claims-fraud model is scored on a holdout sample of eight claims. The three fraudulent claims score 0.90, 0.60 and 0.35. The five legitimate claims score 0.70, 0.50, 0.30, 0.20 and 0.10.

Calculate the model's normalized Gini on this holdout sample. Give your answer to two decimal places.

## Explanation

The AUROC is the share of fraudulent–legitimate pairs in which the fraudulent claim scores higher. There are 3 × 5 = 15 pairs.

- 0.90 scores above all 5 legitimate claims.
- 0.60 scores above 0.50, 0.30, 0.20 and 0.10, which is 4.
- 0.35 scores above 0.30, 0.20 and 0.10, which is 3.

$$
\text{AUROC} = \frac{5 + 4 + 3}{15} = 0.80
$$

From $\text{AUROC} = 0.5 \times \text{normalized Gini} + 0.5$,

$$
\text{normalized Gini} = 2(0.80) - 1 = \mathbf{0.60}
$$

**Common wrong entries**

- **0.80** — the AUROC itself, stopping one step short.
- **0.30** — halves the excess over 0.5, which is 0.80 - 0.50, instead of doubling it.
- **0.40** — works from the 3 of 15 pairs ranked the wrong way, 2(1 - 0.80), instead of the 12 ranked the right way.
