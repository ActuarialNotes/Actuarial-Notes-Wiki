---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b3f58582c30dbdbc26634ff4a87fb37686dbd83303971c6d85233ec0d62d177a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Gini Index.md
---

The **Gini Index** has three distinct uses in actuarial statistics:

**1. Decision tree node impurity** — measures the purity of a node in a classification [[Decision Tree]]. A pure node (all one class) has Gini = 0.

> $$G = \sum_{k=1}^K \hat{p}_{mk}(1 - \hat{p}_{mk})$$

> $$= 1 - \sum_{k=1}^K \hat{p}_{mk}^2$$

**2. Model predictive accuracy** — a ranking-based performance metric for binary classifiers (related to the [[AUROC]]):

> $$\text{Gini} = 2 \cdot \text{AUROC} - 1$$

**3. Ranking power of a rating model** — the Lorenz-curve Gini used to evaluate an insurance [[Generalized Linear Model|GLM]]. Sort the holdout data by predicted loss cost, **lowest first**, and plot the cumulative share of exposure ($x$) against the cumulative share of actual losses, $L(x)$. The Gini index is twice the area between that Lorenz curve and the line of equality:

> $$\text{Gini} = 1 - 2\int_0^1 L(x)\,dx$$

**For decision trees:**
- $\hat{p}_{mk}$ = proportion of class $k$ in node $m$; $K$ = number of classes
- Gini = 0: perfectly pure node (only one class)
- Gini = $1 - 1/K$: maximally impure (uniform class proportions)
- For **binary classification** ($K=2$): $G = 2\hat{p}(1-\hat{p})$, maximized at $\hat{p}=0.5$ with $G=0.5$
- Gini is preferred over [[Entropy]] in practice as it is computationally simpler

**For a rating model:**
- A model that ranks nothing puts losses in proportion to exposure, so $L(x) = x$ and Gini $= 0$; the better the model separates low-cost from high-cost risks, the further the curve bows below the diagonal and the higher the Gini
- It measures **ranking only**, not calibration: multiplying every prediction by $1.2$ leaves the sort order, and so the Gini, unchanged. Pair it with a [[Quantile Plot]], which shows both
- Compare Gini indices across models **on the same holdout data**; on training data the more flexible model always wins

![[Media/Figures/Gini_Index.svg|340]]

> [!example]- Gini Index for a Decision Tree Node {Example}
> A node in a classification tree contains 30 fraud cases and 70 non-fraud cases (100 total). Calculate the Gini Index.
>
> > [!answer]-
> > $\hat{p}_{\text{fraud}} = 0.30$, $\hat{p}_{\text{non-fraud}} = 0.70$.
> > $$G = 1 - (0.30^2 + 0.70^2) = 1 - (0.09 + 0.49) = 1 - 0.58 = 0.42$$

> [!example]- Gini as a Model Performance Metric {Example}
> A predictive model has an AUROC of 0.78. What is the Gini coefficient?
>
> > [!answer]-
> > $$\text{Gini} = 2(0.78) - 1 = 0.56$$
> > A Gini of 0.56 indicates good discriminatory power; a random model would have Gini = 0.

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
