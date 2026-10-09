---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a08cbd708b85d9a711241caa99d6b59f8868dab670dec1d44a194ae870cf596a
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Regression Tree.md
---

A **regression tree** is a [[Decision Tree|decision tree]] for a quantitative [[Response Variable|response]]: recursive binary splitting divides the predictor space into regions $R_1, \ldots, R_J$, and every observation that falls in region $R_j$ is predicted by the mean response $\hat{y}_{R_j}$ of the training observations in that region. The splits are chosen to minimize the [[Residual Sum of Squares|residual sum of squares]], and the grown tree is cut back by cost-complexity [[Tree Pruning|pruning]] with a penalty chosen by [[Cross-Validation|cross-validation]].

> $$\text{RSS} = \sum_{j=1}^{J}\sum_{i \in R_j}\left(y_i - \hat{y}_{R_j}\right)^2$$

> $$\begin{aligned} \min_{j,\,s}\ & \sum_{i:\,x_i \in R_1(j,s)}\left(y_i - \hat{y}_{R_1}\right)^2 \\ & + \sum_{i:\,x_i \in R_2(j,s)}\left(y_i - \hat{y}_{R_2}\right)^2 \end{aligned}$$

> $$\sum_{m=1}^{\lvert T\rvert}\sum_{i:\,x_i \in R_m}\left(y_i - \hat{y}_{R_m}\right)^2 + \alpha\lvert T\rvert$$

- **Symbols:** Following James et al. (ISLR, §8.1.1), a split on predictor $X_j$ at cutpoint $s$ sends $R_1(j,s) = \{X \mid X_j < s\}$ to one branch and $R_2(j,s) = \{X \mid X_j \geq s\}$ to the other. $\lvert T\rvert$ is the number of terminal nodes (leaves) of a subtree $T$, and $\alpha \geq 0$ is the price charged for each leaf.
- **Recursive binary splitting:** The method is top-down and greedy. At each step it searches every predictor and every cutpoint for the split of one current region that reduces the RSS most, without looking ahead to splits that might follow, and it repeats until a stopping rule is met, such as a minimum number of observations in each leaf. Any cutpoint between two consecutive observed values gives the same partition, so only those gaps need checking, and a qualitative predictor is split by sending some of its levels to each branch.
- **Pruning:** ISLR's Algorithm 8.1 grows a large tree $T_0$, uses cost-complexity pruning (the third block) to obtain the best subtree for each $\alpha$, chooses $\alpha$ by $K$-fold cross-validation, and returns the subtree for that $\alpha$. At $\alpha = 0$ the full tree wins, and a larger $\alpha$ gives a smaller tree, because a split that adds one leaf survives only if it reduces the RSS by more than $\alpha$.
- **Strengths and weaknesses:** The prediction is a step function of the predictors, so the tree captures non-linear effects and [[Interaction|interactions]] without being told about them, and it is easy to explain. A single tree has high variance, however, and a linear model predicts better when the true relationship is close to linear. [[Bagging]], [[Random Forest|random forests]] and [[Boosting|boosting]] combine many trees to gain accuracy at the cost of that interpretability ([[Tree Ensemble]]).

> [!example]- Choosing the First Split for a Severity Tree {Example}
> Six collision claims (severity $y$ in thousands) have two predictors: vehicle age in years and an urban indicator.
>
> | Claim | Vehicle age | Urban | Severity |
> |---|---|---|---|
> | 1 | 1 | Yes | 9 |
> | 2 | 2 | No | 8 |
> | 3 | 4 | Yes | 7 |
> | 4 | 6 | No | 4 |
> | 5 | 8 | Yes | 5 |
> | 6 | 10 | No | 3 |
>
> Find the first split that recursive binary splitting makes, the RSS it leaves, and the two predictions.
>
> > [!answer]-
> > With no split, every claim is predicted by $\bar{y} = 36/6 = 6$, and the RSS is $9 + 4 + 1 + 4 + 1 + 9 = 28$. Each candidate split is scored by the RSS of its two children:
> >
> > | Split | Left (mean, RSS) | Right (mean, RSS) | Total RSS |
> > |---|---|---|---|
> > | Age $< 1.5$ | $9$, $0$ | $5.4$, $17.2$ | $17.2$ |
> > | Age $< 3$ | $8.5$, $0.5$ | $4.75$, $8.75$ | $9.25$ |
> > | Age $< 5$ | $8$, $2$ | $4$, $2$ | $4$ |
> > | Age $< 7$ | $7$, $14$ | $4$, $2$ | $16$ |
> > | Age $< 9$ | $6.6$, $17.2$ | $3$, $0$ | $17.2$ |
> > | Urban | $7$, $8$ | $5$, $14$ | $22$ |
> >
> > The best split is vehicle age below 5 years. Each side then leaves an RSS of $1 + 0 + 1 = 2$, so the split reduces the RSS from 28 to 4. A claim on a vehicle under 5 years old is predicted at \$8,000 and an older one at \$4,000. Any cutpoint between 4 and 6 gives the same split, and the urban indicator is considered again inside each branch at the next step.

> [!example]- Predicting from a Fitted Tree {Example}
> A pruned regression tree for collision severity (in thousands) splits first on vehicle age $< 5$. Its left branch then splits on urban garaging, with leaf means 9.2 (urban) and 7.6 (not urban). Its right branch splits on driver age $< 25$, with leaf means 6.8 (under 25) and 4.1 (25 or over). Predict the severity for (a) a 3-year-old vehicle garaged in a city with a 40-year-old driver, (b) a 7-year-old rural vehicle with a 22-year-old driver, and (c) a 5-year-old urban vehicle with a 30-year-old driver. What does the tree assume about the effect of urban garaging?
>
> > [!answer]-
> > Each prediction follows the splits to a leaf and returns that leaf's training mean.
> >
> > - (a) The vehicle is 3 years old, which is below 5, and it is garaged in a city, so the prediction is \$9,200.
> > - (b) The vehicle is 7 years old, so the claim goes right, and the driver is under 25, so the prediction is \$6,800.
> > - (c) A vehicle age of 5 is not below 5, so the claim goes right, and the driver is 30, so the prediction is \$4,100.
> >
> > Urban garaging adds $9.2 - 7.6 = 1.6$ thousand for vehicles under 5 years old and nothing for older ones, because the right branch never splits on it. The tree has built an interaction between vehicle age and garaging, which a linear model would include only if an interaction term were specified.

> [!tip]- How it appears on the exam
> - **SRM** gives a small data set and asks for the first split, the RSS after it or the leaf predictions. Its objectives also ask candidates to describe how trees are fit to training data and pruned, and to compare trees with linear models, often as multiple-choice statements about greedy splitting, pruning and interpretability.
> - **Reading a tree:** SRM questions show a tree diagram and ask for the prediction of a new observation, or the number of leaves and the regions they define.
> - **PA** asks candidates to construct, prune and validate a regression tree for a business problem: justify the pruned size from a cross-validation table, interpret the splits, and compare the tree's hold-out error with that of a GLM. When output from R's `rpart` package is shown, the pruning penalty appears as a complexity parameter `cp`, which is $\alpha$ divided by the root node's RSS.

> [!warning]- Exam traps
> - **Total RSS, not the gap in means:** A split is scored by the summed RSS of its two children. The split with the largest difference between the two means can be a poor one when it isolates a single extreme observation.
> - **Greedy is not optimal:** Recursive binary splitting chooses the best split at each step, so the finished tree is not guaranteed to have the lowest RSS of all trees of its size.
> - **The boundary:** ISLR sends $X_j < s$ to the left. An observation exactly at the cutpoint goes to the branch for $X_j \geq s$ unless the tree states otherwise.
> - **Pruning on training RSS:** Training RSS always prefers the full tree. The size of the pruned tree must come from cross-validation or a validation set, and a larger $\alpha$ gives a smaller tree.
> - **Stopping early:** A rule that stops growing as soon as no split reduces the RSS by much can miss a strong split that sits below a weak one. Growing a large tree first and pruning it back avoids this.
