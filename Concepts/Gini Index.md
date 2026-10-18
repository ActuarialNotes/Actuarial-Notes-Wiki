---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:c085c7bf21935dab6b203126945f03918c5cabb88b18c1969180a15b4d62613a
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted, §4.4.2 pp.148-152 (Tables 4.4-4.7, Fig. 4.8) and §8.1.2 pp.336-338 (eqs 8.6-8.7); §2.2 pp.30, 37 (test MSE, test error rate), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed., Chapter 7, §7.1-7.3.1 incl. fn 17, pp.75-85 (PDF pp.85-95), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Salis, Measures of Predictive Accuracy, CAS Study Note for MAS-II (updated November 6, 2025), §§1-4, pp.1-12 (whole note), sha256:e952ace6ea6cdc1bea50ffcd81e53227de836e9e7b58a85bb13e86885f67a010 — https://www.casact.org/sites/default/files/2026-01/MAS-II_Measures_of_Predictive_Accuracy_Study_Note-1.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Gini Index.md
---

The **Gini index** names two measures that are separate and independent of each other: one for the purity of a node in a classification tree, and one for the lift of any predictive model.

**1. Decision tree node impurity** — measures the purity of a node in a classification [[Decision Tree]]. A pure node (all one class) has Gini = 0.

> $$G = \sum_{k=1}^K \hat{p}_{mk}(1 - \hat{p}_{mk})$$

> $$= 1 - \sum_{k=1}^K \hat{p}_{mk}^2$$

**2. Lift of a rating model** — the Lorenz-curve Gini used to evaluate an insurance [[Generalized Linear Model|GLM]]. Sort the holdout data by predicted loss cost, **lowest first**, and plot the cumulative share of exposure ($x$) against the cumulative share of actual losses, $L(x)$. The Gini index is twice the area between that Lorenz curve and the line of equality:

> $$\text{Gini} = 1 - 2\int_0^1 L(x)\,dx$$

**For decision trees:**
- $\hat{p}_{mk}$ = proportion of class $k$ in node $m$; $K$ = number of classes
- Gini = 0: perfectly pure node (only one class)
- Gini = $1 - 1/K$: maximally impure (uniform class proportions)
- For **binary classification** ($K=2$): $G = 2\hat{p}(1-\hat{p})$, maximized at $\hat{p}=0.5$ with $G=0.5$
- Gini and [[Entropy]] are numerically similar. Either is typically used to evaluate the quality of a split, because both are more sensitive to node purity than the classification error rate

**For a rating model:**
- A model that ranks nothing puts losses in proportion to exposure, so $L(x) = x$ and Gini $= 0$; the better the model separates low-cost from high-cost risks, the further the curve bows below the diagonal and the higher the Gini
- It measures **ranking only**, not calibration: multiplying every prediction by $1.2$ leaves the sort order, and so the Gini, unchanged. Pair it with a [[Quantile Plot]], which shows both
- Compare Gini indices across models **on the same holdout data**; on training data the more flexible model always wins
- For a binary (logistic) model, sort by predicted probability and plot cumulative risks against cumulative occurrences of the event. The **normalized Gini** is the model's Gini divided by that of a perfect model, and it is tied to the [[AUROC]]: $\text{AUROC} = 0.5 \times \text{normalized Gini} + 0.5$, so $\text{normalized Gini} = 2\,\text{AUROC} - 1$. One can be derived from the other, so the two are not separate validation metrics

![[Media/Figures/Gini_Index.svg|340]]

> [!example]- Gini Index for a Decision Tree Node {Example}
> A node in a classification tree contains 30 fraud cases and 70 non-fraud cases (100 total). Calculate the Gini Index.
>
> > [!answer]-
> > $\hat{p}_{\text{fraud}} = 0.30$, $\hat{p}_{\text{non-fraud}} = 0.70$.
> > $$G = 1 - (0.30^2 + 0.70^2) = 1 - (0.09 + 0.49) = 1 - 0.58 = 0.42$$

> [!example]- Gini as a Model Performance Metric {Example}
> A logistic model has an AUROC of 0.78. What is its normalized Gini index?
>
> > [!answer]-
> > $$\text{normalized Gini} = 2(0.78) - 1 = 0.56$$
> > A model with no predictive power has an AUROC of 0.5 and a Gini of 0.

> [!example]- Gini Index from a Lorenz Curve {Example}
> A holdout set is sorted by predicted pure premium and cut into four equal-exposure buckets. From lowest to highest prediction, the buckets hold $10\%$, $20\%$, $30\%$ and $40\%$ of actual losses. Estimate the Gini index using the trapezoid rule.
>
> > [!answer]-
> > The cumulative loss shares at $x = 0.25, 0.50, 0.75, 1.00$ are $L = 0.10, 0.30, 0.60, 1.00$.
> > $$
> > \begin{align*}
> > \int_0^1 L(x)\,dx &\approx 0.25\left[\tfrac{0 + 0.10}{2} + \tfrac{0.10 + 0.30}{2} + \tfrac{0.30 + 0.60}{2} + \tfrac{0.60 + 1.00}{2}\right] \\
> > &= 0.25\,(0.05 + 0.20 + 0.45 + 0.80) \\
> > &= 0.375 \\
> > \text{Gini} &= 1 - 2(0.375) \\
> > &= 0.25
> > \end{align*}
> > $$
> > A model that ranked nothing would put $25\%$ of losses in each bucket and score $0$. This one's best quarter of the book carries only $10\%$ of the losses.
