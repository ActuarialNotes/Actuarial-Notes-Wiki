---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:f7acb858cbd26e222c711b932249378ed0b59b32d952ddccc64c62456ca88b23
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.1, printed pp.327-340 (PDF pp.335-348; printed = PDF - 8), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Tree Pruning.md
---

**Tree pruning** grows a [[Decision Tree]] deliberately too large, then cuts it back to the subtree that minimizes a penalized error. Cost-complexity pruning indexes the candidate subtrees by a single parameter $\alpha$, turning "which of the many subtrees?" into a one-dimensional tuning problem.

> $$\sum_{m=1}^{\lvert T\rvert} \sum_{x_i \in R_m}\left(y_i - \hat{y}_{R_m}\right)^{2} + \alpha\,\lvert T \rvert$$
>
> $$\lvert T \rvert = \text{number of terminal nodes}$$

- **Grow first, prune second.** Stopping early on a "no split improves RSS enough" rule is short-sighted — a weak split can unlock a strong one below it
- $\alpha = 0$ keeps the full tree; raising $\alpha$ makes leaves progressively too expensive, collapsing the tree from the bottom up to a single node
- The sequence of subtrees as $\alpha$ increases is **nested and finite**, so [[Cross-Validation]] over $\alpha$ picks the size and the tree is refit on the full data at that $\alpha$
- For classification the loss is the misclassification rate, [[Gini Index]] or [[Entropy]]; Gini and entropy are preferred for *growing* because they are sensitive to node purity, misclassification rate for *pruning* when prediction accuracy of the final pruned tree is the goal
- Pruning is the single-tree answer to variance; [[Bagging]] and [[Random Forest]] attack the same problem by averaging instead, and their trees are typically left unpruned

![[Media/Figures/Tree_Pruning.svg|340]]

> [!example]- Pruning by Cost Complexity {Example}
> A regression tree has candidate subtrees with (leaves, RSS): (1, 520), (3, 340), (5, 285), (8, 262). At $\alpha = 25$, which subtree is chosen?
>
> > [!answer]-
> > Score each as $\mathrm{RSS} + \alpha\lvert T\rvert$:
> > $$1: 520 + 25 = 545 \qquad 3: 340 + 75 = 415$$
> > $$5: 285 + 125 = 410 \qquad 8: 262 + 200 = 462$$
> > The **5-leaf** subtree wins at 410. Raising $\alpha$ to 40 would flip the answer to the 3-leaf tree ($340+120=460$ vs $285+200=485$).
