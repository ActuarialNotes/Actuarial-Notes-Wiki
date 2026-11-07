---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:fac561270adef744f75c0d505b493fcc80fe8584e24347e90b9a6c8c88ab3e60
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §§1-4, pp.1-12 (whole note), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted, §4.4.2 pp.148-152 (Tables 4.4-4.7, Fig. 4.8) and §8.1.2 pp.336-338 (eqs 8.6-8.7); §2.2 pp.30, 37 (test MSE, test error rate), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Predictive Accuracy.md
---

**Predictive Accuracy** is how well a model's predictions agree with outcomes it was not fitted to, measured on a [[Holdout Sample|holdout sample]] or by [[Cross-Validation|cross-validation]]. It is judged on three separate questions:

1. **Calibration**: are the predicted levels right?
2. **Discrimination**: does the model rank low risks below high risks?
3. **Classification**: for a classifier, how often is it right at a chosen threshold?

Every measure is computed on holdout data, since on training data the more flexible model always wins, and two models are compared on the same data.

## Overall error

For a numeric response, the overall error is the [[Test Error|test MSE]] (or the holdout [[Deviance|deviance]]):

> $$\text{Test MSE} = \frac{1}{m}\sum_{i \in \text{holdout}}\left(y_i - \hat{f}(x_i)\right)^{2}$$

- $m$ is the number of holdout observations.

For a classifier it is the test error rate. Each is one number that mixes calibration and ranking.

> [!example]- A model predicts $2$, $4$ and $7$ for three holdout observations whose responses are $3$, $4$ and $5$. What is its test MSE? {Example}
> - The errors are $1$, $0$ and $-2$.
> - The test MSE is $(1 + 0 + 4)/3 = 1.67$.

## Measures of discrimination

[[Lift]], the [[AUROC]] and the [[Gini Index|Gini index]] depend only on the order of the predictions, so multiplying every prediction by a constant leaves them unchanged. The normalized Gini is the model's Gini index divided by that of a perfect model, and it gives the AUROC:

> $$\text{AUROC} = 0.5 \times \text{normalized Gini} + 0.5$$

The two are therefore not separate validation measures.

> [!example]- A fraud model scores three fraudulent holdout claims $0.92$, $0.74$ and $0.48$, and seven legitimate ones $0.81$, $0.55$, $0.40$, $0.33$, $0.21$, $0.15$ and $0.08$. What are its AUROC and normalized Gini? {Example}
> - The AUROC is the share of fraudulent–legitimate pairs in which the fraudulent claim scores higher.
> - $0.92$ beats all 7 legitimate claims, $0.74$ beats 6 and $0.48$ beats 5, so the AUROC is $18/21 = 0.857$.
> - The normalized Gini is $2(0.857) - 1 = 0.714$.

## Classification at a threshold

A threshold turns predicted probabilities into classes, and the [[Confusion Matrix|confusion matrix]] counts the results. Accuracy, sensitivity, specificity and precision are read from it, and moving the threshold moves all of them. The ROC curve traces every threshold at once.

> [!example]- At a threshold of $0.5$, what are the sensitivity, specificity and precision of the fraud model above? {Example}
> - Four claims score above $0.5$: two fraudulent and two legitimate, so $TP = 2$, $FP = 2$, $FN = 1$ and $TN = 5$.
> - Sensitivity is $2/3 = 66.7\%$ and specificity is $5/7 = 71.4\%$.
> - Precision is $2/4 = 50\%$, so half the claims sent for investigation are legitimate, even though the model ranks well.

## Measures of calibration

The [[Quantile Plot|quantile plot]] sorts holdout data by predicted value into equal-exposure buckets and compares actual with predicted, so it shows ranking and calibration together. The [[Double Lift Chart|double lift chart]] sorts on the ratio of two models' predictions, showing which model is right where they disagree. Ranking matters for underwriting selection or fraud triage, and calibration for setting a rate level.

> [!example]- Model B's predictions are $1.10$ times Model A's. In four equal-exposure buckets of a holdout set, actual pure premiums are $200$, $300$, $450$ and $650$, and Model A predicts $220$, $310$, $430$ and $640$. How do the models compare? {Example}
> - Model B predicts $242$, $341$, $473$ and $704$, in the same order as A, so the two have identical Gini and lift.
> - Model A's actual-to-predicted ratios are $0.91$, $0.97$, $1.05$ and $1.02$, averaging $1.00$.
> - Model B's are $0.83$, $0.88$, $0.95$ and $0.92$, averaging $0.91$.
> - B over-predicts by about 10% everywhere, which only the quantile plot shows. For setting the rate level, B would overcharge the whole book.
