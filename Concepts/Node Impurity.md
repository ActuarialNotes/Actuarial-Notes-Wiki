---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:956a4f253c5b3f485cef502cbe83d7001b7dca6ad9e94e689f20fe508847e0e0
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.1, printed pp.327-340 (PDF pp.335-348; printed = PDF - 8), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.3.3-8.3.4 lab, printed pp.358-360 (PDF pp.366-368), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Node Impurity.md
---

**Node Impurity** is a measure of how mixed the responses in a node of a [[Decision Tree|decision tree]] are. A tree grows by choosing, at each step, the split that reduces it most. A classification tree measures it by the classification error rate, the [[Gini Index|Gini index]] or the [[Entropy|entropy]], and a regression tree by the [[Residual Sum of Squares|residual sum of squares]]. The classification error rate of node $m$ is

> $$E_m = 1 - \max_k \hat{p}_{mk}$$

- $\hat{p}_{mk}$ is the share of node $m$'s training observations in class $k$.

Every classification measure is $0$ for a pure node and largest when the classes are evenly mixed. For two classes with $\hat{p}$ the share of one class, $E = \min(\hat{p}, 1 - \hat{p})$, the Gini index is $G = 2\hat{p}(1 - \hat{p})$, with maximum $0.5$, and the entropy has maximum $\ln 2 = 0.693$. A node's errors are the observations outside its majority class.

> [!example]- A node holds 30 fraud and 70 legitimate claims. What is its classification error rate? {Example}
> - The majority class is legitimate, with share $0.70$.
> - $E = 1 - 0.70 = 0.30$, the share of the 30 fraud claims it misclassifies.

## Impurity decrease of a split

When a split divides a node's $n$ observations into $n_L$ on the left and $n_R$ on the right, the impurity after it is the average of the two nodes' impurities, weighted by their numbers of observations. The decrease in impurity is

> $$\Delta I = I_{\text{parent}} - \frac{n_L}{n}I_L - \frac{n_R}{n}I_R$$

- $I$ is the impurity measure: $E$, $G$ or $D$.

The split with the largest decrease, which is the smallest weighted impurity after the split, is preferred. Splitting is greedy: each split is the best one available now, with no look-ahead.

> [!example]- A node holds 400 claims, 100 of them fraud. A split sends 200 left (80 fraud) and 200 right (20 fraud). What is the decrease in each classification measure? {Example}
> - The fraud shares are $0.25$ in the parent, $0.40$ on the left and $0.10$ on the right.
> - The error rate falls by $0.25 - [0.5(0.40) + 0.5(0.10)] = 0$.
> - The Gini index falls by $0.375 - [0.5(0.48) + 0.5(0.18)] = 0.045$.
> - The entropy falls by $0.5623 - [0.5(0.6730) + 0.5(0.3251)] = 0.0633$.
> - Both children still predict legitimate, so the error rate sees no improvement, while the Gini index and the entropy do.

> [!idea] The idea
> Grow a tree with the Gini index or the entropy, and prune it with the error rate.

The Gini index and the entropy are smooth in $\hat{p}$, so they reward a split that makes the nodes purer even when no node's majority class changes. The error rate does not, so it is too insensitive to grow a tree. James et al. recommend it for [[Tree Pruning|cost complexity pruning]] when prediction accuracy is the goal.

## Impurity of a regression node

A regression tree measures the impurity of node $m$ by its residual sum of squares:

> $$\text{RSS}_m = \sum_{i \in R_m}\left(y_i - \bar{y}_{R_m}\right)^{2}$$

- $\bar{y}_{R_m}$ is the mean response in the node's region $R_m$.

The reduction in RSS from a split is the parent's RSS minus the total $\text{RSS}_L + \text{RSS}_R$ of the two nodes it creates. Summed over every split on a predictor, these reductions give its [[Variable Importance|variable importance]].

> [!example]- Six claim severities (in $\$000$) are $2, 3, 4, 9, 11, 13$. Split A gives $\{2, 3, 4\}$ and $\{9, 11, 13\}$, and split B gives $\{2, 3, 4, 9\}$ and $\{11, 13\}$. Which split does the tree choose? {Example}
> - The parent mean is $7$, so the parent RSS is $25 + 16 + 9 + 4 + 16 + 36 = 106$.
> - Split A leaves RSS $(1 + 0 + 1) + (4 + 0 + 4) = 10$.
> - Split B leaves RSS $(6.25 + 2.25 + 0.25 + 20.25) + (1 + 1) = 31$.
> - Split A reduces the RSS by $96$, against $75$ for split B, so the tree chooses split A.
