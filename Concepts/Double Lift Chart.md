---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:b33f9b9ab19cb198b3e0863927e17fdd1fab3560b9757f8547d67a87c45e3135
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Double Lift Chart.md
---

![[Media/Figures/Double_Lift_Chart.svg|340]]

A **Double Lift Chart** is a chart that compares two models directly, by sorting a holdout data set on the ratio of their predictions and plotting each model's average prediction against the actual result in each quantile. The sort ratio for observation $i$ is

> $$r_i = \frac{\hat{y}_i^{\,\text{A}}}{\hat{y}_i^{\,\text{B}}}$$

- $\hat{y}_i^{\,\text{A}}$ and $\hat{y}_i^{\,\text{B}}$ are the two models' predictions, such as a proposed and a current model's.

The chart is built in four steps:

1. Compute the sort ratio for each observation.
2. Sort the observations by the ratio and group them into quantiles of equal exposure.
3. In each quantile, compute each model's average prediction and the average actual result, each divided by its own overall average.
4. Plot the three values in each quantile.

Sorting on the ratio puts the risks the two models disagree about at the ends. With the ratio proposed over current, the lowest quantile holds the risks the proposed model rates best relative to the current one, and the highest the risks it rates worst.

> [!example]- Sorted on the ratio of a new model's predictions to the current one's, the lowest quantile has an actual loss ratio of $0.78$, the new model predicts $0.80$ and the current $1.02$. The highest has actual $1.31$, new $1.28$ and current $1.05$. Which model wins? {Example}
> - In each quantile, compare each model's prediction with the actual.
> - The new model is within $0.03$ of the actual at both ends.
> - The current model stays near $1.0$ at both ends, missing the actual by about $0.24$ and $0.26$.
> - The new model wins: it identifies risks the current model misprices.

## Picking the better model

The better model is the one whose predictions track the actual values more closely across the quantiles. A [[Quantile Plot|simple quantile plot]] sorts on one model's own predictions and so scores one model at a time. The double lift chart compares the two on the same buckets, showing where they differ. The [[AUROC]] and the [[Gini Index|Gini index]] give one number each, with no picture of where.

> [!trap] Stable predictions are not better
> A model whose predictions stay close to the average across the quantiles has not shown that it is accurate. In the example the current model's flat line is what loses: the two models disagree for a real reason, and the model that misses it over-predicts the good risks and under-predicts the bad.
