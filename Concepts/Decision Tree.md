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
- [[Tree Ensemble]] methods (bagging, random forests, boosting) reduce variance

> [!example]- Pruning a Decision Tree {Example}
> A fully grown tree has 10 terminal nodes and training RSS = 50. After pruning to 4 terminal nodes, training RSS = 80. With $\alpha = 5$, which tree is preferred?
>
> > [!answer]-
> > Cost-complexity criterion: $C(\alpha, T) = \text{RSS} + \alpha|T|$.
> > Full tree: $50 + 5(10) = 100$. Pruned tree: $80 + 5(4) = 100$.
> > Both have the same criterion value; in practice, the **simpler (pruned) tree** would be preferred for its interpretability and lower overfitting risk.
