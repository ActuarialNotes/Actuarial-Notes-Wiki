---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:41f4bc63d9a93598309bde001c4aac44ef0e7fd0f729eabec1f496a3b52df1df
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §8.1.4 Advantages and Disadvantages of Trees, pp.339-340 (PDF 347-348), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Decision Tree.md
---

![[Media/Figures/Decision_Tree.svg|340]]

A **Decision Tree** is a [[Statistical Learning|statistical learning]] method that divides the predictor space into rectangular regions $R_1, \ldots, R_J$ by a sequence of binary splits, and predicts the same value for every observation in a region. Each split tests one predictor against a cutoff, such as $X_j < s$, and divides one existing region into two. In a [[Regression Tree|regression tree]] the prediction for region $R_j$ is

> $$\hat{y}_{R_j} = \frac{1}{n_j}\sum_{i \in R_j} y_i$$

- $n_j$ is the number of training observations in $R_j$.

An observation is predicted by following its predictor values down the splits until it reaches a terminal node, or leaf. Observations in the same leaf get the same prediction.

> [!example]- A tree first splits on driver age $< 25$, and for older drivers on vehicle age $< 5$. The training severities in the leaf for drivers 25 or older with vehicles 5 years or older are 4, 6 and 8 (in $\$000$). What does the tree predict for a 40-year-old driver with an 8-year-old vehicle? {Example}
> - The driver is not under 25, so the observation goes to the right branch.
> - The vehicle is not under 5 years old, so it lands in that leaf.
> - The prediction is the leaf's mean, $(4 + 6 + 8)/3 = 6$, or $\$6{,}000$.

## Recursive binary splitting

The regions are chosen to make the residual sum of squares small:

> $$\text{RSS} = \sum_{j=1}^{J}\sum_{i \in R_j}\left(y_i - \hat{y}_{R_j}\right)^2$$

The tree is grown by recursive binary splitting, which is greedy and top-down. At each step it makes the split that reduces the RSS most at that step, with no look-ahead. Grown until a stopping rule such as a minimum node size, the tree fits the training data closely, so it can be overly complex and predict poorly on test data. A large tree is cut back by [[Tree Pruning|pruning]].

> [!example]- The responses at $x = 1, \ldots, 6$ are $2, 3, 4, 9, 11, 13$. Which cutoff does the first split use, $x < 2.5$ or $x < 3.5$? {Example}
> - $x < 2.5$ gives $\{2, 3\}$ and $\{4, 9, 11, 13\}$, with RSS $0.5 + 44.75 = 45.25$.
> - $x < 3.5$ gives $\{2, 3, 4\}$ and $\{9, 11, 13\}$, with RSS $2 + 8 = 10$.
> - The tree splits at $x < 3.5$.

## Classification trees

A [[Classification Tree|classification tree]] predicts the most common class among the training observations in a region. Its splits are chosen by a [[Node Impurity|node impurity]] measure, the [[Gini Index|Gini index]] or the [[Entropy|entropy]], in place of the RSS.

## Advantages and disadvantages

Advantages:

1. Trees are very easy to explain, even easier than linear regression. Their splits form simple if-then rules that can be followed directly.
2. Some believe they mirror human decision-making more closely than other regression and classification methods do.
3. They can be displayed graphically and are easily interpreted even by a non-expert, especially when small.
4. They handle qualitative predictors without dummy variables.

Disadvantages:

1. They generally predict less accurately than other regression and classification approaches.
2. They are non-robust: they have high variance, so a small change in the data can cause a large change in the final tree.

[[Tree Ensemble|Tree ensembles]], such as [[Bagging|bagging]], [[Random Forest|random forests]] and [[Boosting|boosting]], combine many trees to reduce this variance.

> [!trap] Splits are axis-parallel
> Each split uses one predictor, so every boundary between regions is a vertical or horizontal line in the predictor space. A class pattern divided by a diagonal line can only be approximated by a staircase of splits.
