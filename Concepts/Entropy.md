**Entropy** (in the context of [[Statistical Learning]]) is a measure of **node impurity** in a classification [[Decision Tree]], derived from information theory. Like the [[Gini Index]], it equals zero for a pure node and is maximized when classes are equally represented.

> $$D = -\sum_{k=1}^K \hat{p}_{mk} \log(\hat{p}_{mk})$$
>
> $$\text{(using natural log or base-2 log; base-2 gives entropy in bits)}$$

- $\hat{p}_{mk}$ = proportion of class $k$ in node $m$
- For **binary classification** ($K = 2$): $D = -\hat{p}\log\hat{p} - (1-\hat{p})\log(1-\hat{p})$, maximized at $\hat{p} = 0.5$
- Entropy and Gini give numerically similar results and generally lead to the same tree structure
- **Information gain** = reduction in entropy from a split: $\Delta D = D_{\text{parent}} - \frac{n_L}{n}D_L - \frac{n_R}{n}D_R$
- The split that **maximizes information gain** (minimizes child entropy) is chosen

> [!example]- Entropy of a Decision Tree Node {Example}
> A node contains 40 claims that are large losses and 60 that are small losses (100 total). Calculate the entropy.
>
> > [!answer]-
> > $\hat{p}_{\text{large}} = 0.40$, $\hat{p}_{\text{small}} = 0.60$.
> > $$D = -(0.40\ln 0.40 + 0.60\ln 0.60) = -(0.40(-0.916) + 0.60(-0.511)) = 0.366 + 0.307 = 0.673$$

> [!example]- Comparing Entropy Before and After a Split {Example}
> A parent node has entropy $D_{\text{parent}} = 0.693$. After a split: left child ($n_L = 60$) has $D_L = 0.5$ and right child ($n_R = 40$) has $D_R = 0.2$. Find the information gain.
>
> > [!answer]-
> > $$\Delta D = 0.693 - \frac{60}{100}(0.5) - \frac{40}{100}(0.2) = 0.693 - 0.300 - 0.080 = 0.313$$
> > This split reduces entropy by 0.313 — a substantial information gain.
