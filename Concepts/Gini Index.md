The **Gini Index** has two distinct uses in actuarial statistics:

**1. Decision tree node impurity** — measures the purity of a node in a classification [[Decision Tree]]. A pure node (all one class) has Gini = 0.

> $$G = \sum_{k=1}^K \hat{p}_{mk}(1 - \hat{p}_{mk}) = 1 - \sum_{k=1}^K \hat{p}_{mk}^2$$

**2. Model predictive accuracy** — a ranking-based performance metric for binary classifiers (related to the [[AUROC]]):

> $$\text{Gini} = 2 \cdot \text{AUROC} - 1$$

**For decision trees:**
- $\hat{p}_{mk}$ = proportion of class $k$ in node $m$; $K$ = number of classes
- Gini = 0: perfectly pure node (only one class)
- Gini = $1 - 1/K$: maximally impure (uniform class proportions)
- For **binary classification** ($K=2$): $G = 2\hat{p}(1-\hat{p})$, maximized at $\hat{p}=0.5$ with $G=0.5$
- Gini is preferred over [[Entropy]] in practice as it is computationally simpler

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
