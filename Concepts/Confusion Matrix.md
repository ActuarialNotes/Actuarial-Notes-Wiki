---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:6336fb39cd46634680ab8f9f969914b95088d4df5cc55d12ebab2700e160b15a
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted, §4.4.2 pp.148-152 (Tables 4.4-4.7, Fig. 4.8) and §8.1.2 pp.336-338 (eqs 8.6-8.7); §2.2 pp.30, 37 (test MSE, test error rate), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §§1-4, pp.1-12 (whole note), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Confusion Matrix.md
---

![[Media/Figures/Confusion_Matrix.svg|340]]

A **Confusion Matrix** is a table that cross-tabulates the actual class of each observation against the class a classifier predicts for it, at a chosen threshold. It counts the true positives (TP), false negatives (FN), false positives (FP) and true negatives (TN):

| | Predicted positive | Predicted negative | Total |
| :--- | :---: | :---: | :---: |
| **Actual positive** | TP | FN | $P$ |
| **Actual negative** | FP | TN | $N$ |
| **Total** | $P^*$ | $N^*$ | $T$ |

A true positive is an actual positive flagged positive, a false positive an actual negative flagged positive, and a false negative an actual positive not flagged. Every classification measure is a ratio of these counts.

## Sensitivity and specificity

The sensitivity, or true positive rate, is the proportion of actual positives classified as positive:

> $$\text{Sensitivity} = \frac{TP}{TP + FN}$$

The specificity, or true negative rate, is the proportion of actual negatives classified as negative:

> $$\text{Specificity} = \frac{TN}{TN + FP}$$

The false positive rate is the proportion of actual negatives flagged positive, $FP/(FP + TN) = 1 -$ specificity. Sensitivity is also called recall or power, and the false positive and false negative rates are the Type I and Type II error rates.

> [!example]- On 1,000 claims, 60 are fraudulent. A model flags 90 claims, of which 45 are fraudulent. What are its sensitivity and specificity? {Example}
> - $TP = 45$, $FP = 90 - 45 = 45$, $FN = 60 - 45 = 15$, $TN = 1000 - 45 - 45 - 15 = 895$.
> - Sensitivity is $45/60 = 75.0\%$.
> - Specificity is $895/940 = 95.2\%$, so the false positive rate is $4.8\%$.

## Precision and accuracy

The precision, or positive predicted value, is the share of flagged cases that are actually positive:

> $$\text{Precision} = \frac{TP}{TP + FP}$$

The accuracy is the share of all cases classified correctly:

> $$\text{Accuracy} = \frac{TP + TN}{T}$$

The error rate is $1 -$ accuracy, $(FN + FP)/T$.

> [!example]- For the fraud model above, what are the precision and accuracy? {Example}
> - Precision is $45/90 = 50.0\%$.
> - Accuracy is $(45 + 895)/1000 = 94.0\%$.

## Choice of threshold

The matrix depends on the threshold applied to the predicted probability. Lowering the threshold flags more cases, which raises sensitivity and lowers specificity. When missing a positive is costly and positives are rare, a lower threshold is preferred, because the cost of the extra false-positive investigations is small against the cost of a missed positive. The [[AUROC|ROC curve]] shows every threshold at once.

> [!trap] Accuracy under class imbalance
> In the fraud example, flagging no claims at all scores $940/1000 = 94.0\%$ accuracy, the same as the model, with a sensitivity of zero. When one class is rare, judge a classifier by its sensitivity and specificity, not its accuracy.
