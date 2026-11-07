---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:b94f6e305537f07252109e0b389783d6213806d21b00d525813f69b0e60af187
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted, §4.4.2 pp.148-152 (Tables 4.4-4.7, Fig. 4.8) and §8.1.2 pp.336-338 (eqs 8.6-8.7); §2.2 pp.30, 37 (test MSE, test error rate), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §§1-4, pp.1-12 (whole note), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/AUROC.md
---

![[Media/Figures/AUROC.svg|340]]

The **AUROC** is the area under the receiver operating characteristic (ROC) curve of a binary classifier. The ROC curve plots the sensitivity (vertical axis) against $1 -$ specificity (horizontal axis) of the [[Confusion Matrix|confusion matrix]], one point for each discrimination threshold. Joining the points with straight lines, the area is a sum of trapezoids:

> $$\text{AUROC} = \sum_{j=1}^{J}\frac{1}{2}\left(x_j - x_{j-1}\right)\left(y_{j-1} + y_j\right)$$

- $x_j$ is $1 -$ specificity and $y_j$ the sensitivity at the $j$th threshold, taken from highest to lowest.
- $x_0 = y_0 = 0$.

A threshold above every predicted probability flags nothing and gives the point $(0, 0)$. A threshold below every predicted probability flags everything and gives $(1, 1)$. Lowering the threshold past each predicted value in turn, from highest to lowest, gives the points between.

> [!example]- Six holdout observations have predicted probabilities $0.9$, $0.7$, $0.6$, $0.4$, $0.3$ and $0.1$, and actual outcomes $1$, $0$, $1$, $0$, $1$, $0$. What is the AUROC? {Example}
> - There are 3 positives and 3 negatives, so each positive moves the curve up $1/3$ and each negative moves it right $1/3$.
> - From the highest score down, the points are $(0, \tfrac13)$, $(\tfrac13, \tfrac13)$, $(\tfrac13, \tfrac23)$, $(\tfrac23, \tfrac23)$, $(\tfrac23, 1)$ and $(1, 1)$.
> - Only the three moves to the right have area under them: $\tfrac13 \cdot \tfrac13 + \tfrac13 \cdot \tfrac23 + \tfrac13 \cdot 1 = \tfrac69$.
> - The AUROC is $0.667$.

## AUROC as a ranking probability

The AUROC is the probability that the model gives a randomly chosen actual positive a higher score than a randomly chosen actual negative, a tie counting half. Grouping the observations by predicted value from highest to lowest, it is

> $$\text{AUROC} = \frac{1}{2NP}\sum_{i=1}^{I} n_i\left(c_{i-1} + c_i\right)$$

- $N$ and $P$ are the numbers of actual negatives and positives.
- $n_i$ is the number of negatives in group $i$, and $c_i$ the cumulative number of positives through group $i$, with $c_0 = 0$.

> [!example]- For the six observations above, what is the AUROC by the counting formula? {Example}
> - The groups with a negative are $0.7$ ($c = 1$ before and after), $0.4$ ($c = 2$) and $0.1$ ($c = 3$).
> - The sum is $1(1 + 1) + 1(2 + 2) + 1(3 + 3) = 12$.
> - The AUROC is $12/(2 \times 3 \times 3) = 0.667$. Each positive is ranked above $3$, $2$ and $1$ negatives, $6$ of the $9$ pairs.

## Reading the AUROC

A model with no predictive power has an ROC curve along the line of equality from $(0, 0)$ to $(1, 1)$, and an AUROC of $0.5$. A perfect model's curve rises straight to $(0, 1)$ and runs across to $(1, 1)$, with an AUROC of $1$. The AUROC summarizes every threshold at once, which makes it useful for comparing classifiers. The threshold itself is a business decision weighing true positives against the cost of false positives. The AUROC is tied to the normalized [[Gini Index|Gini index]]:

> $$\text{normalized Gini} = 2 \times \text{AUROC} - 1$$

- The normalized Gini is the model's Gini index divided by that of a perfect model.

So the two should not be taken as separate validation measures.

> [!example]- Fraud model A has an AUROC of $0.85$ and model B of $0.72$. What are their normalized Gini indices, and which is better? {Example}
> - Model A's normalized Gini is $2(0.85) - 1 = 0.70$.
> - Model B's is $2(0.72) - 1 = 0.44$.
> - Model A ranks a fraudulent claim above a legitimate one 85% of the time against 72% for B, so A is better.
