---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:5eccd7094778456e7cd793a3689a8440868401d0afaa7bf58301c369b9ca589f
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted, §4.4.2 pp.148-152 (Tables 4.4-4.7, Fig. 4.8) and §8.1.2 pp.336-338 (eqs 8.6-8.7); §2.2 pp.30, 37 (test MSE, test error rate), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §§1-4, pp.1-12 (whole note), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Gini Index.md
---

![[Media/Figures/Gini_Index.svg|340]]

The **Gini Index** of a node in a classification [[Decision Tree|decision tree]] is a measure of the node's [[Node Impurity|impurity]]:

> $$G = \sum_{k=1}^{K}\hat{p}_{mk}(1 - \hat{p}_{mk})$$

> $$G = 1 - \sum_{k=1}^{K}\hat{p}_{mk}^{2}$$

- $\hat{p}_{mk}$ is the share of node $m$'s training observations in class $k$.
- $K$ is the number of classes.

The Gini index is $0$ for a pure node and $1 - 1/K$ when the classes are evenly mixed. For two classes it is $G = 2\hat{p}(1 - \hat{p})$, largest at $\hat{p} = 0.5$ with $G = 0.5$. The Gini index and the [[Entropy|entropy]] are numerically similar, and either is used to judge a split, because both are more sensitive to node purity than the classification error rate.

> [!example]- A node holds 30 fraud and 70 legitimate claims. What is its Gini index? {Example}
> - The class shares are $0.30$ and $0.70$.
> - $G = 1 - (0.30^2 + 0.70^2) = 1 - 0.58 = 0.42$.

## Gini index of a rating model

The Gini index also names a separate measure of the lift of a rating model, built from a Lorenz curve. Sort the holdout data by predicted loss cost, lowest first, and plot the cumulative share of exposure $x$ against the cumulative share of actual losses $L(x)$. The Gini index is twice the area between that Lorenz curve and the line of equality:

> $$\text{Gini} = 1 - 2\int_0^1 L(x)\,dx$$

The line of equality is the 45-degree line from $(0, 0)$ to $(1, 1)$, with area $0.5$ under it. A model that ranks nothing puts losses in proportion to exposure, so $L(x) = x$ and Gini $= 0$. The better the model separates low-cost from high-cost risks, the further the curve bows below the diagonal and the higher the Gini index.

The Gini index measures ranking only, not calibration. Multiplying every prediction by $1.2$ leaves the sort order, and so the Gini index, unchanged, so it is paired with a [[Quantile Plot|quantile plot]]. Gini indices of different models are compared on the same holdout data, because on training data the more flexible model always wins.

> [!example]- A holdout set is sorted by predicted pure premium into four equal-exposure groups, holding 10%, 20%, 30% and 40% of actual losses from lowest prediction to highest. Estimate the Gini index using the trapezoid rule. {Example}
> - The cumulative loss shares at $x = 0.25, 0.50, 0.75, 1$ are $L = 0.10, 0.30, 0.60, 1$.
> - Each trapezoid's area is its width times the average of its two heights, so the area under the curve is $0.25(0.05 + 0.20 + 0.45 + 0.80) = 0.375$.
> - $\text{Gini} = 1 - 2(0.375) = 0.25$.

## Normalized Gini index

For a binary model, the data are sorted by predicted probability, and cumulative risks are plotted against cumulative occurrences of the event. The normalized Gini index is the model's Gini index divided by that of a perfect model, and it is tied to the [[AUROC]]:

> $$\text{normalized Gini} = 2\,\text{AUROC} - 1$$

One can be derived from the other, so the two are not separate validation metrics.

> [!example]- A logistic model has an AUROC of $0.78$. What is its normalized Gini index? {Example}
> - $\text{normalized Gini} = 2(0.78) - 1 = 0.56$.
> - A model with no predictive power has an AUROC of $0.5$ and a normalized Gini index of $0$.

> [!trap] Two different Gini indices
> The Gini index of a tree node and the Gini index of a rating model share a name and nothing else. A node's Gini index is small when the node is pure, while a rating model's is large when the model ranks risks well.
