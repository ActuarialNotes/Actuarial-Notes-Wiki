---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:8ff7f5cb806130fd7aafbf164b7f3bc2600d774b22f7982cec6567cadde98bc3
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §8.1.4 Advantages and Disadvantages of Trees, pp.339-340 (PDF 347-348), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Decision Tree.md
---

A **Decision Tree** is a [[Statistical Learning]] method that partitions the predictor space into rectangular regions by applying a sequence of binary splits, then predicts a constant value (regression) or class (classification) within each region.

> **Regression tree prediction:** $\hat{y} = \frac{1}{|R_m|}\sum_{i \in R_m} y_i$ for region $R_m$
>
> **Split criterion (regression):** minimize $\text{RSS} = \sum_{m}\sum_{i \in R_m}(y_i - \hat{y}_{R_m})^2$

**Classification tree split criteria** (choose split minimizing):

| Criterion | Formula |
| :--- | :--- |
| [[Gini Index]] | $G = \sum_{k=1}^K \hat{p}_{mk}(1-\hat{p}_{mk})$ |
| [[Entropy]] | $D = -\sum_{k=1}^K \hat{p}_{mk}\log\hat{p}_{mk}$ |

- $\hat{p}_{mk}$ = proportion of class $k$ observations in region $m$
- Trees are grown by **greedy, top-down recursive binary splitting** until a stopping criterion is met (e.g., minimum node size)
- **Pruning** uses **cost-complexity pruning**: minimize $\sum_m \text{RSS}(R_m) + \alpha |T|$, where $|T|$ is the number of terminal nodes and $\alpha \geq 0$ is a complexity penalty tuned by cross-validation
- Decision trees are **highly interpretable** but have high variance — small data changes can produce very different trees
- **Advantages and disadvantages** (James et al., §8.1.4). For: trees are very easy to explain, even easier than linear regression; some believe they mirror human decision-making more closely than regression and classification methods do; they can be **displayed graphically as a tree diagram and are easily interpreted even by a non-expert**, especially when small; and they handle qualitative predictors without dummy variables. Against: they generally predict less accurately than other regression and classification approaches, and they are non-robust, a small change in the data causing a large change in the final tree
- [[Tree Ensemble]] methods (bagging, random forests, boosting) reduce variance

![[Media/Figures/Decision_Tree.svg|340]]

> [!example]- Pruning a Decision Tree {Example}
> A fully grown tree has 10 terminal nodes and training RSS = 50. After pruning to 4 terminal nodes, training RSS = 80. With $\alpha = 5$, which tree is preferred?
>
> > [!answer]-
> > Cost-complexity criterion: $C(\alpha, T) = \text{RSS} + \alpha|T|$.
> > Full tree: $50 + 5(10) = 100$. Pruned tree: $80 + 5(4) = 100$.
> > Both have the same criterion value; in practice, the **simpler (pruned) tree** would be preferred for its interpretability and lower overfitting risk.
