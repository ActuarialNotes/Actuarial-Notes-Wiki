---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:032236477982957f7065cfe3dc3cacffaec0a1b807041962dddce14a6e8c2151
  sources: []
  open_findings: 0
  log: .verify/Concepts/Tree Pruning.md
---

**Tree pruning** grows a [[Decision Tree]] deliberately too large, then cuts it back to the subtree that minimizes a penalized error. Cost-complexity pruning indexes the candidate subtrees by a single parameter $\alpha$, turning "which of the many subtrees?" into a one-dimensional tuning problem.

> $$\sum_{m=1}^{\lvert T\rvert} \sum_{x_i \in R_m}\left(y_i - \hat{y}_{R_m}\right)^{2} + \alpha\,\lvert T \rvert$$
>
> $$\lvert T \rvert = \text{number of terminal nodes}$$

- **Grow first, prune second.** Stopping early on a "no split improves RSS enough" rule is short-sighted — a weak split can unlock a strong one below it
- $\alpha = 0$ keeps the full tree; raising $\alpha$ makes leaves progressively too expensive, collapsing the tree from the bottom up to a single node
- The sequence of subtrees as $\alpha$ increases is **nested and finite**, so [[Cross-Validation]] over $\alpha$ picks the size and the tree is refit on the full data at that $\alpha$
- For classification the loss is the misclassification rate, [[Gini Index]] or [[Entropy]]; Gini and entropy are preferred for *growing* because they are sensitive to node purity, misclassification rate for *pruning*
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
