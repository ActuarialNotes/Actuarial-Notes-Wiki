---
Title: "Measures of Predictive Accuracy: Study Note for MAS-II"
Authors: "Anthony T. Salis"
Publisher: "Casualty Actuarial Society"
Year: "2025"
date: "2025"
Type: "Study Note"
Available from: "[casact.org](https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf)"
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:9d4f319a5d7932b47be28c6378f837b681d5707c9fb6c5abe5fc267c192e590f
  sources:
    - "Salis, Measures of Predictive Accuracy: Study Note for MAS-II (CAS, updated November 6, 2025), 12 pp., PDF pp.1-12, sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf"
    - "CAS, Exam Content Outline — Modern Actuarial Statistics II (MAS-II), 2026 (MASII_CO_S_2026 v06), PDF pp.3-4 (Domain C tasks and readings; Complete Text References) incl. link annotations, sha256:babf0548b7d674e02d2cffdaee11e5063f8e8c03b3461b8ba2bdfdbc0f90ea1b — https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Resources/Books/Measures of Predictive Accuracy (Salis - 2025).md
---
![[Measures of Predictive Accuracy (Salis - 2025) - Cover.svg]]

A study note clarifying how some measures of predictive accuracy tested on the CAS Modern Actuarial Statistics II (MAS-II) exam are calculated. It introduces nothing the content outline's text references do not cover, but clarifies details of the calculations that are implied but not outrightly stated in them, and assumes the reader already knows Chapter 8 of James et al. and Chapter 7 of the GLM monograph. It covers the Gini index for node purity, entropy, lift, the Gini index for lift, confusion matrix ratios and the AUROC. The copy CAS hosts is marked "Updated: November 6, 2025".

> [!info] On the syllabus
> - [[Exam MAS-II (CAS)|Exam MAS-II]] — objectives C3, C10 (the outline prints "C3 & C10"); the whole study note (CAS Study Note, November 2025).

## 1 Introduction
- Statistical models may be evaluated using a variety of measures of predictive accuracy; the note clarifies the calculation of some of them as tested on MAS-II.
- The measures covered: the [[Gini Index]] (for node purity), [[Entropy|entropy]], [[Lift|lift]], the Gini index (for lift), [[Confusion Matrix|confusion matrix]] ratios and the area under the receiver operator characteristic curve ([[AUROC]]).

## 2 Measures of Node Purity
- Section 8.1.2 of James et al. describes two measures of [[Node Impurity|node purity]] for [[Classification Tree|classification trees]], the Gini index and entropy; this section clarifies their calculation and how they measure the quality of a split.
- 2.1 Gini Index (for Node Purity)
    - The Gini index for node purity is separate and independent from the Gini index for lift (Section 3.2): it is used only in classification trees, while the Gini index for lift can measure the segmentation power of any type of predictive model.
- 2.2 Entropy
    - The natural logarithm is assumed in entropy calculations for the MAS-II exam, the normal interpretation of James et al., corroborated by its comparison of entropy to [[Deviance|deviance]]; the choice of base changes the result only by a constant factor.
    > $$D_m = -\sum_{k=1}^{K} \hat{p}_{mk} \log(\hat{p}_{mk})$$
    - A class with $\hat{p}_{mk} = 0$ contributes nothing to the sum, since $p \log(p) \to 0$ as $p \to 0^+$.
- 2.3 Split Quality
    - The Gini index can be rewritten as a weighted average of the "impurity" $(1 - \hat{p}_{mk})$ of each class; after a split into regions $m_1$ and $m_2$, the original node's Gini index is the average of the new terminal nodes' Gini indices weighted by their numbers of observations.
    > $$G_m' = \frac{1}{n_m}\left(n_{m_1} G_{m_1} + n_{m_2} G_{m_2}\right)$$
    - The difference between the Gini indices (or entropies) of the node before and after the split is one measure of the split's quality; Table 1's example of a three-class target shows a split that leaves the classification error rate at 40% but lowers both the Gini index and the entropy.

## 3 Measures of Model Lift
- Section 7.2 of the GLM text describes measures of model lift, ways of quantifying the "economic value" of a model; the note clarifies the calculation of two of them.
- 3.1 Lift
    - Lift is "the vertical distance between the first and last quantiles" (GLM p. 77); in insurance it is usually measured as the ratio of the actual target rates in the last and first quantiles; for a binary target it can also be the odds ratio; and in some contexts the difference is used.
    > $$L_{ratio} = \frac{Y_Q}{Y_1}$$
    - The MAS-II exam will not directly test the calculation of lift as a metric.
- 3.2 Gini Index (for Lift)
    - For the exam, the Gini index is calculated by the trapezoidal method on an empirical sample: the target's denominator (exposure, claim count or premium) gives the x-coordinate of the Lorenz curve and its numerator (claim count or loss amount) the y-coordinate.
    - Exposures and losses are first aggregated by predicted value, since observations tied on the prediction would otherwise give cumulative percentages that depend on their sort order.
    > $$G = 1 - \sum_{j=1}^{J} (x_j - x_{j-1})(y_{j-1} + y_j)$$
    - In a modelling context the Lorenz curve can rise above the line of equality through random variation, as in the note's example (a Gini index of 0.27); that area contributes negatively, penalising the model for the reversal.

## 4 Measures for Binary Models
- Section 7.3 of the GLM text describes the confusion matrix and the ROC curve; this section adds the confusion matrix material of James et al. Section 4.4.2 and clarifies the calculation of the AUROC.
- 4.1 Confusion Matrix Ratios
    - Table 7 names the ratios derived from a confusion matrix: the error rate; the true positive rate (sensitivity, recall, power); the false negative rate ([[Type II Error|Type II error]]); the true negative rate (specificity); the false positive rate ([[Type I Error|Type I error]], 1 – specificity); the positive predicted value (precision); the false discovery proportion; and the negative predicted value.
- 4.2 AUROC
    - Each point on the ROC curve is the (1 – specificity, sensitivity) pair at one discrimination threshold; in the note's example, 8 unique predicted probabilities give 9 unique discriminations, seven thresholds between adjacent unique probabilities and one above and one below them all.
    - The AUROC is the area under the curve, a sum of trapezoids; the line of equality is not used.
    > $$AUROC = \sum_{j=1}^{J} \frac{1}{2}(x_j - x_{j-1})(y_{j-1} + y_j)$$
    - An equivalent formulation aggregates rows by unique predicted value in descending order, with $N$ and $P$ the numbers of actual negatives and positives; the note's example gives 0.74 either way.
    > $$AUROC = \frac{1}{2NP}\sum_{i=1}^{I} n_i (c_{i-1} + c_i)$$

## Related readings
- [[An Introduction to Statistical Learning (James et al. - 2021)]] — the note assumes its Chapter 8 and clarifies its Sections 8.1.2 and 4.4.2; assigned with it for MAS-II Domain C
- [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)]] — the note assumes its Chapter 7 and clarifies its Sections 7.2 and 7.3; assigned with it for objective C10

## Sources
- [Measures of Predictive Accuracy: Study Note for MAS-II (Casualty Actuarial Society, 2025)](https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf) — the document (12 pp., "Updated: November 6, 2025"): title, author, section headings and the points and formulas under them
- [CAS Exam MAS-II Content Outline, v06 (January 2026)](https://www.casact.org/sites/default/files/2026-01/MASII_Content_Outlines_2026.pdf) — the citation (Salis, A., "Measures of Predictive Accuracy," CAS Study Note, November 2025), the tasks it is assigned to (C3 & C10) and the link to the study note
