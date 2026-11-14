---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:9bac2ca35f738dfe2e36ed05d28ae60d6db09de84db208e8d4d2525ec31ee955
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021, CAS-hosted copy), §8.1.2 PDF pp.343-345 (eq. 8.5-8.7, error rate not sensitive enough, prune with error rate for accuracy, qualitative splits, same-class leaves), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Classification Tree.md
---

A **Classification Tree** is a [[Decision Tree|decision tree]] for a qualitative [[Response Variable|response]], one that takes values in a set of classes. Recursive binary splitting divides the predictor space into regions $R_1, \ldots, R_J$, and each observation is predicted to belong to the **most commonly occurring class** among the training observations in its region.

To classify an observation, follow it from the root down the splits, applying each split condition to its predictor values, until it reaches a terminal node (a leaf). A qualitative predictor splits by sending some of its levels to each branch.

The class proportions in the region, $\hat{p}_{mk}$, double as estimated probabilities. $\hat{p}_{mk}$ is the proportion of training observations in region $m$ from class $k$. With two classes, a leaf predicts the class whose estimated probability exceeds one half.

> [!example]- What class and fraud probability does each leaf of this fraud tree predict? {Example}
> A pruned tree for claim fraud has three terminal nodes. Its training counts are:
>
> | Leaf | Claims | Fraudulent |
> | :--- | ---: | ---: |
> | 1 | 60 | 21 |
> | 2 | 240 | 24 |
> | 3 | 700 | 14 |
>
> > [!answer]-
> > - The estimated fraud probability of a leaf is its share of fraudulent claims: $21/60 = 0.35$, $24/240 = 0.10$ and $14/700 = 0.02$.
> > - The fraud shares are all below one half, so **every leaf predicts "legitimate"**.
> > - The training error rate is $59/1{,}000 = 5.9\%$, the same as flagging nothing.

## Node impurity measures

A split is chosen by how pure it leaves the nodes. The **classification error rate** of node $m$ is

> $$E = 1 - \max_{k}\left(\hat{p}_{mk}\right)$$

The [[Gini Index|Gini index]] of node $m$ is

> $$G = \sum_{k=1}^{K}\hat{p}_{mk}\left(1 - \hat{p}_{mk}\right)$$

- $K$ is the number of classes.

The [[Entropy|entropy]] of node $m$ is

> $$D = -\sum_{k=1}^{K}\hat{p}_{mk}\ln\hat{p}_{mk}$$

These are the three [[Node Impurity|node impurity]] measures, and all three are zero for a pure node. For two classes $G = 2\hat{p}(1-\hat{p})$ and $E = \min(\hat{p}, 1-\hat{p})$, where $\hat{p}$ is the share of either class. With three or more classes, sum over all $K$ classes.

A split is scored by the observation-weighted impurity of its two children,

> $$\frac{n_L}{n}I_L + \frac{n_R}{n}I_R$$

- $n_L$ and $n_R$ are the numbers of observations in the left and right child, and $n = n_L + n_R$.
- $I_L$ and $I_R$ are the children's impurities, measured by $E$, $G$ or $D$.

Under the error rate, each node predicts its majority class, so its errors are the observations in its minority class.

## Growing and pruning the tree

The error rate is not sensitive enough for growing a tree. A split that makes a node much purer without changing its majority class leaves $E$ unchanged, so the tree is grown with the Gini index or entropy. For the same reason a split can give two leaves that predict the *same* class: it raises node purity, and so the confidence of each prediction.

> [!example]- Which first split is chosen when growing this lapse tree? {Example}
> Of $1{,}000$ auto policies up for renewal, $300$ lapsed. There are two candidate first splits:
>
> | Split | Left node | Right node |
> | :--- | :--- | :--- |
> | A: rate increase over 10% | 200 policies, 120 lapsed | 800 policies, 180 lapsed |
> | B: tenure of 10 years or more | 300 policies, 0 lapsed | 700 policies, 300 lapsed |
>
> > [!answer]-
> > - The parent has $\hat{p} = 0.30$, so $G = 2(0.3)(0.7) = 0.42$ and $E = 0.30$.
> > - Split A has lapse shares $0.60$ and $0.225$, so $G_A = 0.2(0.48) + 0.8(0.34875) = 0.375$ and $E_A = 0.2(0.40) + 0.8(0.225) = 0.26$.
> > - Split B has lapse shares $0$ and $3/7$, so $G_B = 0.7 \times 2\left(\tfrac{3}{7}\right)\left(\tfrac{4}{7}\right) = 0.3429$ and $E_B = 0.7\left(\tfrac{3}{7}\right) = 0.30$.
> > - The Gini index falls by $0.0450$ for A and $0.0771$ for B. The error rate falls by $0.04$ for A and $0$ for B.
> > - Every node of B still predicts "renew", so the error rate sees no gain, yet B isolates 300 policies that never lapsed. Entropy agrees with the Gini index ($0.1328$ against $0.0497$).
> > - **The Gini index chooses B.** Growing on the error rate would have taken A.

The tree is pruned by cost-complexity [[Tree Pruning|pruning]]: an error term replaces the RSS, the penalty $\alpha\lvert T\rvert$ on the number of terminal nodes is unchanged, and $\alpha$ is chosen by [[Cross-Validation|cross-validation]]. Any of the three measures can be used to prune, but the error rate is preferred if prediction accuracy is the goal.

A single tree is easy to explain but has high variance. [[Bagging]], [[Random Forest|random forests]] and [[Boosting|boosting]] trade that interpretability for accuracy ([[Tree Ensemble|tree ensembles]]). For a binary response its competitor is [[Logistic Regression|logistic regression]], and a fitted tree is evaluated on held-out data with a [[Confusion Matrix|confusion matrix]].

> [!trap] Averaging the children's impurities unweighted
> The impurity of a split is $\frac{n_L}{n}I_L + \frac{n_R}{n}I_R$, not $\frac{1}{2}(I_L + I_R)$. A plain average counts a tiny pure node as much as a large mixed one.
