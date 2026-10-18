---
id: "masii-an-017"
exam: "Exam MAS-II"
topic: "AUROC"
learning_objective: "Statistical Learning"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/AUROC
  - Concepts/Confusion+Matrix
answer: "C"
points: 2
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:19a6c2864c2569f626f11d945ae0936b377fae6f942fa49a3484453b3b8940b5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-ii/masii-an-017.md
---

A logistic regression model for claim fraud is scored on a holdout set of eight claims:

| Claim | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Predicted probability | 0.9 | 0.8 | 0.7 | 0.6 | 0.5 | 0.4 | 0.3 | 0.2 |
| Actually fraudulent | Yes | No | Yes | Yes | No | No | Yes | No |

Calculate the area under the receiver operating characteristic curve (AUROC).

- A) Less than 0.40
- B) At least 0.40, but less than 0.55
- C) At least 0.55, but less than 0.70
- D) At least 0.70, but less than 0.85
- E) At least 0.85

## Explanation

Lower the discrimination threshold past each predicted probability in turn and record (1 - specificity, sensitivity), with 4 actual positives and 4 actual negatives:

| Threshold just below | 1 - specificity | Sensitivity |
| :--- | ---: | ---: |
| (above 0.9) | 0.00 | 0.00 |
| 0.9 | 0.00 | 0.25 |
| 0.8 | 0.25 | 0.25 |
| 0.7 | 0.25 | 0.50 |
| 0.6 | 0.25 | 0.75 |
| 0.5 | 0.50 | 0.75 |
| 0.4 | 0.75 | 0.75 |
| 0.3 | 0.75 | 1.00 |
| 0.2 | 1.00 | 1.00 |

Summing the trapezoids $\tfrac12(x_j - x_{j-1})(y_{j-1} + y_j)$ under the curve:

$$
\text{AUROC} = 0.25(0.25) + 0.25(0.75) + 0.25(0.75) + 0.25(1.00) = 0.6875
$$

Equivalently, AUROC is the share of (fraud, non-fraud) pairs in which the fraud scores higher: $(4 + 3 + 3 + 1)/16 = 11/16 = 0.6875$. That is in **C**.

**Why not the others**

- **A** — 2(0.6875) - 1 = 0.375 is the Gini index, not the AUROC; counting the pairs a non-fraud wins, 5/16 = 0.3125, lands here too.
- **B** — 0.5 is a model that ranks no better than chance; this one ranks fraud higher in 11 of 16 pairs.
- **D** — 0.75 is the accuracy, sensitivity and specificity at a threshold of 0.55, a single point of the curve rather than the area under all of it.
- **E** — would require the frauds to outrank nearly every non-fraud; here claim 2 (not fraud) outranks three of the four frauds, and claim 7 (fraud) sits below claims 5 and 6.
