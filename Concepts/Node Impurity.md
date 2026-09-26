---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ad902ecd6e76282e2524a773865bf4390befd0f8e2081b9fd80dcf9f09d3014a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Node Impurity.md
---

**Node impurity** measures how mixed the responses in a [[Decision Tree]] node are. The tree grows by choosing, at each step, the split that reduces it most. Classification trees use the classification error rate, the [[Gini Index]] or [[Entropy]]; regression trees use the [[Residual Sum of Squares]].

> $$E_m = 1 - \max_k \hat{p}_{mk}$$
>
> $$G_m = \sum_{k=1}^{K}\hat{p}_{mk}(1 - \hat{p}_{mk})$$
>
> $$D_m = -\sum_{k=1}^{K}\hat{p}_{mk}\ln\hat{p}_{mk}$$
>
> $$\text{RSS}_m = \sum_{i \in R_m}\left(y_i - \bar{y}_{R_m}\right)^{2}$$
>
> $$\Delta I = I_{\text{parent}} - \frac{n_L}{n}I_L - \frac{n_R}{n}I_R$$

- $\hat{p}_{mk}$ is the share of node $m$'s training observations in class $k$, and $\bar{y}_{R_m}$ is the mean response in region $R_m$. $\Delta I$ is the impurity decrease for a split of $n$ observations into $n_L$ and $n_R$. For a regression split, the criterion is the total $\text{RSS}_L + \text{RSS}_R$.
- All three classification measures are $0$ for a pure node and largest when the classes are evenly mixed. For two classes: $E = \min(\hat{p}, 1 - \hat{p})$; $G = 2\hat{p}(1 - \hat{p})$, with maximum $0.5$; and $D$ has maximum $\ln 2 = 0.693$. Base-2 logs rescale every node's entropy by the same factor, so they never change which split wins.
- **Grow with Gini or entropy, prune with the error rate.** Gini and entropy are smooth in $\hat{p}$. They reward a split that makes the nodes purer even when no node's majority class changes. The error rate does not, so it is too insensitive to grow a tree. James et al. recommend Gini or entropy for growing and the error rate for [[Tree Pruning|cost-complexity pruning]] when prediction accuracy is the goal.
- Splitting is **greedy**: each split is the best one available now, with no look-ahead.
- **Summaries across a set of trees.** In [[Bagging]] and [[Random Forest|random forests]], add up the impurity decrease from every split on a predictor and average over the $B$ trees. This is the impurity-based [[Variable Importance|variable importance]].

> [!example]- Why the Error Rate Misses a Good Split {Example}
> A node holds $400$ claims, $100$ of them fraudulent. A split sends $200$ claims left ($80$ fraud, $120$ legitimate) and $200$ right ($20$ fraud, $180$ legitimate). Compute the decrease in each classification measure.
>
> > [!answer]-
> > The fraud shares are $0.25$ in the parent, $0.40$ on the left and $0.10$ on the right. Each child holds half the claims.
> > $$
> > \begin{align*}
> > \Delta E &= 0.25 - \left[0.5(0.40) + 0.5(0.10)\right] \\
> > &= 0 \\
> > \Delta G &= 0.375 - \left[0.5(0.48) + 0.5(0.18)\right] \\
> > &= 0.045 \\
> > \Delta D &= 0.5623 - \left[0.5(0.6730) + 0.5(0.3251)\right] \\
> > &= 0.0633
> > \end{align*}
> > $$
> > Both children still predict "legitimate", so the misclassified count stays at $100$ and the error rate sees nothing. Gini and entropy both register the improvement. The left node is now a $40\%$-fraud pocket worth splitting again.

> [!example]- Choosing a Regression Split by RSS {Example}
> Six claim severities (in $\$000$) are $2, 3, 4, 9, 11, 13$. Split A (attorney involvement) gives $\{2, 3, 4\}$ and $\{9, 11, 13\}$. Split B (region) gives $\{2, 3, 4, 9\}$ and $\{11, 13\}$. Which split does the tree choose?
>
> > [!answer]-
> > The parent mean is $7$, so the parent RSS is $25 + 16 + 9 + 4 + 16 + 36 = 106$.
> > $$
> > \begin{align*}
> > \text{RSS}_A &= (1 + 0 + 1) + (4 + 0 + 4) \\
> > &= 10 \\
> > \text{RSS}_B &= (6.25 + 2.25 + 0.25 + 20.25) + (1 + 1) \\
> > &= 31
> > \end{align*}
> > $$
> > **Split A** reduces the RSS by $96$, against $75$ for split B. The tree splits on attorney involvement.

> [!example]- Impurity-Based Importance Across Bagged Trees {Example}
> Three bagged fraud trees record the total Gini decrease from splits on each predictor:
>
> | Tree | Prior claims | Claim amount | Days to report |
> |---|---|---|---|
> | 1 | $0.060$ | $0.025$ | $0$ |
> | 2 | $0.052$ | $0$ | $0.030$ |
> | 3 | $0.018$ | $0.041$ | $0.012$ |
>
> Rank the predictors.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Prior claims} &= \frac{0.060 + 0.052 + 0.018}{3} = 0.0433 \\
> > \text{Claim amount} &= \frac{0.025 + 0 + 0.041}{3} = 0.0220 \\
> > \text{Days to report} &= \frac{0 + 0.030 + 0.012}{3} = 0.0140
> > \end{align*}
> > $$
> > Rescaled so the largest is $100$: prior claims $100$, claim amount $51$, days to report $32$. Tree 3 alone would have ranked claim amount first. Averaging over the trees is what makes the ranking stable.
