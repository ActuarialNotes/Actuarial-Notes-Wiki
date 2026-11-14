---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:0f53e4c361ebacef251793353ae6af0aaf0a5d85d0ee6792583c69bd6bed4055
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.1.1-8.1.4 and §8.2 opening, printed pp.327-340 (PDF pp.335-348; printed = PDF - 8), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 10 CART, p.184 (PDF p.196), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "SOA Exam SRM syllabus, January 2027, Topic 4 Decision Trees, outcomes a-d, p.4, sha256:2165c0dec2c26a810a100a504f6a38ac05f02348c1af26e4c8ad71b679eb56af — https://www.soa.org/globalassets/assets/files/edu/2027/spring/syllabi/2027-01-exam-srm-syllabus.pdf"
    - "SOA Exam PA syllabus, October 2026, Topic 5 Tree-Based Models, outcome a, p.4, sha256:1f1c46424d78ac04c297bf6c121bf9d03aec7d451560335cc9e07c7c533a4d84 — https://www.soa.org/globalassets/assets/files/edu/2026/fall/syllabi/2026-10-exam-pa-syllabus.pdf"
    - "Therneau & Atkinson, An Introduction to Recursive Partitioning Using the RPART Routines (rpart package vignette), §4.1 pp.12-13 and the scaled cp definition, p.24, sha256:bfaf9d334344b5ffa5622f136acbabb6943fd78e8e03ad9d1daa57b2b7fbf5a6 — https://cran.r-project.org/web/packages/rpart/vignettes/longintro.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Regression Tree.md
---

A **Regression Tree** is a [[Decision Tree|decision tree]] for a quantitative [[Response Variable|response]]. Recursive binary splitting divides the predictor space into regions $R_1, \ldots, R_J$, and every observation that falls in region $R_j$ is predicted by the mean response $\hat{y}_{R_j}$ of the training observations in that region. The tree's [[Residual Sum of Squares|residual sum of squares]] is

> $$\text{RSS} = \sum_{j=1}^{J}\sum_{i \in R_j}\left(y_i - \hat{y}_{R_j}\right)^2$$

- $y_i$ is the response of training observation $i$.

To predict for an observation, start at the root and follow the branch whose split condition its predictor values satisfy, until it reaches a terminal node (a leaf). Each leaf is a region, the intersection of the split conditions on the path from the root to it. A predictor that is not split on along that path puts no condition on the region, and splits in other branches do not affect the prediction.

> [!example]- What does this severity tree predict for three claims, and what does it assume about urban garaging? {Example}
> A pruned regression tree for collision severity (in thousands) splits first on vehicle age $< 5$. Its left branch then splits on urban garaging, with leaf means 9.2 (urban) and 7.6 (not urban). Its right branch splits on driver age $< 25$, with leaf means 6.8 (under 25) and 4.1 (25 or over). The three claims are:
>
> | Claim | Vehicle age | Garaging | Driver age |
> | :--- | ---: | :--- | ---: |
> | (a) | 3 | Urban | 40 |
> | (b) | 7 | Rural | 22 |
> | (c) | 5 | Urban | 30 |
>
> > [!answer]-
> > - Each prediction follows the splits to a leaf and returns that leaf's training mean.
> > - (a) The vehicle is 3 years old, which is below 5, and it is garaged in a city, so the prediction is \$9,200.
> > - (b) The vehicle is 7 years old, so the claim goes right, and the driver is under 25, so the prediction is \$6,800.
> > - (c) A vehicle age of 5 is not below 5, so the claim goes right, and the driver is 30, so the prediction is \$4,100.
> > - Urban garaging adds $9.2 - 7.6 = 1.6$ thousand for vehicles under 5 years old and nothing for older ones, because the right branch never splits on it.
> > - The tree has built an interaction between vehicle age and garaging, which a linear model would include only if an interaction term were specified.

## Recursive binary splitting

Following James et al., a split on predictor $X_j$ at cutpoint $s$ sends $R_1(j,s) = \{X \mid X_j < s\}$ to one branch and $R_2(j,s) = \{X \mid X_j \geq s\}$ to the other. The split chosen is the one that minimizes

> $$\begin{aligned} & \sum_{i:\,x_i \in R_1(j,s)}\left(y_i - \hat{y}_{R_1}\right)^2 \\ & + \sum_{i:\,x_i \in R_2(j,s)}\left(y_i - \hat{y}_{R_2}\right)^2 \end{aligned}$$

- $\hat{y}_{R_1}$ and $\hat{y}_{R_2}$ are the mean responses of the training observations in the two parts.

The method is top-down and greedy. At each step it searches every predictor and every cutpoint for the split of one current region that reduces the RSS most, without looking ahead to splits that might follow, and it repeats until a stopping rule is met, such as a minimum number of observations in each leaf. Any cutpoint between two consecutive observed values gives the same partition, so only those gaps need checking. A qualitative predictor is split by sending some of its levels to each branch.

ISLR sends $X_j < s$ to the left. An observation exactly at the cutpoint goes to the branch for $X_j \geq s$ unless the tree states otherwise.

Each split is on one predictor and divides one existing region in two. On a plot of two predictors it is a line perpendicular to that predictor's axis, drawn only across the region being split, so a boundary that is diagonal cannot be represented exactly.

> [!example]- What first split does recursive binary splitting make for these six claims? {Example}
> Six collision claims (severity $y$ in thousands) have two predictors, vehicle age in years and an urban indicator.
>
> | Claim | Vehicle age | Urban | Severity |
> | :--- | ---: | :--- | ---: |
> | 1 | 1 | Yes | 9 |
> | 2 | 2 | No | 8 |
> | 3 | 4 | Yes | 7 |
> | 4 | 6 | No | 4 |
> | 5 | 8 | Yes | 5 |
> | 6 | 10 | No | 3 |
>
> > [!answer]-
> > - With no split, every claim is predicted by $\bar{y} = 36/6 = 6$, and the RSS is $9 + 4 + 1 + 4 + 1 + 9 = 28$.
> > - Each candidate split is scored by the total RSS of its two children: age $< 1.5$ gives $17.2$, age $< 3$ gives $9.25$, age $< 5$ gives $4$, age $< 7$ gives $16$, age $< 9$ gives $17.2$ and urban gives $22$.
> > - The best split is vehicle age below 5 years, with means 8 and 4 and an RSS of $1 + 0 + 1 = 2$ on each side.
> > - A claim on a vehicle under 5 years old is predicted at \$8,000 and an older one at \$4,000.
> > - Any cutpoint between 4 and 6 gives the same split, and the urban indicator is considered again inside each branch at the next step.

## Cost-complexity pruning

A large tree fits the training data closely but has high variance. Cost-complexity [[Tree Pruning|pruning]] chooses, for each $\alpha \geq 0$, the subtree $T$ that minimizes

> $$\sum_{m=1}^{\lvert T\rvert}\sum_{i:\,x_i \in R_m}\left(y_i - \hat{y}_{R_m}\right)^2 + \alpha\lvert T\rvert$$

- $\lvert T\rvert$ is the number of terminal nodes (leaves) of $T$, and $R_m$ is the region of its $m$th leaf.
- $\alpha$ is the price charged for each leaf.

At $\alpha = 0$ the full tree wins, and a larger $\alpha$ gives a smaller tree, because a split that adds one leaf survives only if it reduces the RSS by more than $\alpha$.

ISLR's Algorithm 8.1 grows a large tree $T_0$, uses cost-complexity pruning to obtain the best subtree for each $\alpha$, chooses $\alpha$ by $K$-fold [[Cross-Validation|cross-validation]], and returns the subtree for that $\alpha$. Training RSS always prefers the full tree. The size of the pruned tree must come from cross-validation or a validation set, at the size where its error is lowest. Growing a large tree first and pruning it back avoids stopping early at a weak split that sits above a strong one.

## Trees compared with linear models

The prediction is a step function of the predictors, so the tree captures non-linear effects and [[Interaction|interactions]] without being told about them, and it is easy to explain. A single tree has high variance, however, and a linear model predicts better when the true relationship is close to linear. [[Bagging]], [[Random Forest|random forests]] and [[Boosting|boosting]] combine many trees to gain accuracy at the cost of that interpretability ([[Tree Ensemble|tree ensembles]]).

> [!trap] Scoring a split by the gap between its means
> A split is scored by the summed RSS of its two children. The split with the largest difference between the two means can be a poor one when it isolates a single extreme observation.
