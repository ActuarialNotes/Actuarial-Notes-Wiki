---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:checker-islr-a
  content_hash: sha256:6a26425ecd2f51483adda82f2597ee3edc8883271690ce8c82bf900564500eee
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.1.1 incl. 'Tree Pruning' eq. (8.4) and Algorithm 8.1, printed pp.331-333 (PDF pp.339-341), §8.1.2 printed pp.335-336, §8.2.1 printed p.343, sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Klusowski, J. M., 'Sparse Learning with CART', NeurIPS 2020, arXiv:2006.04266, §2 p.3 (a pruned subtree is obtained by merging internal nodes; weakest-link pruning successively collapses the internal node that increases the error least), sha256:f3a445d99ff3fd14569958486963c74793308e94017451b94843f10a23ac451a — https://arxiv.org/pdf/2006.04266"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tree Pruning.md
---

![[Media/Figures/Tree_Pruning.svg|340]]

**Tree Pruning** is the cutting back of a large [[Decision Tree|decision tree]] to a subtree that predicts better on test data. A tree with more splits has lower bias but higher variance. Cost complexity pruning grows a large tree $T_0$ and, for a tuning parameter $\alpha \ge 0$, chooses the subtree $T$ that minimizes

> $$\sum_{m=1}^{\lvert T\rvert} \sum_{x_i \in R_m}\left(y_i - \hat{y}_{R_m}\right)^{2} + \alpha\,\lvert T \rvert$$

- $\lvert T \rvert$ is the number of terminal nodes of $T$.
- $R_m$ is the region of the $m$th terminal node, and $\hat{y}_{R_m}$ its mean response.

When $\alpha = 0$ there is no penalty, so the subtree minimizing the criterion is the full tree $T_0$. Raising $\alpha$ makes each terminal node more expensive, and the tree collapses from the bottom up to a single node.

> [!example]- Candidate subtrees have (terminal nodes, RSS) of $(1, 520)$, $(3, 340)$, $(5, 285)$ and $(8, 262)$. Which is chosen at $\alpha = 25$, and which at $\alpha = 40$? {Example}
> - At $\alpha = 25$ the criteria are $545$, $415$, $410$ and $462$, so the 5-node subtree is chosen.
> - At $\alpha = 40$ they are $560$, $460$, $485$ and $582$, so the 3-node subtree is chosen.

## Pruning an internal node

Pruning at an internal node collapses the subtree below it into one terminal node. That node's RSS replaces the summed RSS of the leaves it absorbs, and $\lvert T \rvert$ falls by the number of those leaves minus one. So pruning a node lowers the criterion exactly when the RSS it adds is less than $\alpha$ times the number of terminal nodes it removes.

> [!example]- A tree with 10 terminal nodes has RSS 50. Pruning it to 4 terminal nodes raises the RSS to 80. At $\alpha = 5$, which tree is preferred? {Example}
> - The full tree's criterion is $50 + 5(10) = 100$.
> - The pruned tree's criterion is $80 + 5(4) = 100$.
> - The two tie, so the smaller, more interpretable pruned tree is preferred.

## Choosing $\alpha$ by cross-validation

As $\alpha$ increases, the chosen subtrees form a nested, finite sequence. [[Cross-Validation|Cross-validation]] chooses the $\alpha$, and so the subtree size, that minimizes the cross-validation estimate of the test error, such as the MSE. The tree is then pruned at that $\alpha$ on the full training data.

The tree is grown large first and pruned afterwards. Stopping early when no split reduces the RSS enough is short-sighted, because a weak split can lead to a strong split below it. For a classification tree, the [[Node Impurity|classification error rate]] is preferred for pruning when prediction accuracy of the final tree is the goal.

> [!example]- Ten-fold cross-validation gives estimated test MSEs of $48$, $41$, $39$ and $44$ for subtrees with 2, 4, 6 and 9 terminal nodes. Which subtree is used? {Example}
> - The smallest cross-validation MSE is $39$, at 6 terminal nodes.
> - The tree is pruned to the 6-node subtree at the corresponding $\alpha$, fitted on all the training data.

> [!trap] The full tree wins on training error
> At $\alpha = 0$ the full tree always has the smallest training RSS. The size of the tree is chosen by cross-validated error, never by training error.
