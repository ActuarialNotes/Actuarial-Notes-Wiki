---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:796ee075c0b35807412fb2e510904cded229bfcb9933c8c67806e2d7a6d72bb5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Classification Tree.md
---

A **classification tree** is a [[Decision Tree]] for a qualitative [[Response Variable|response]]: recursive binary splitting divides the predictor space into regions $R_1, \ldots, R_M$, and each observation is predicted to belong to the **most commonly occurring class** among the training observations in its region. The class proportions in the region, $\hat{p}_{mk}$, double as estimated probabilities.

> $$E = 1 - \max_{k}\left(\hat{p}_{mk}\right)$$
>
> $$G = \sum_{k=1}^{K}\hat{p}_{mk}\left(1 - \hat{p}_{mk}\right)$$
>
> $$D = -\sum_{k=1}^{K}\hat{p}_{mk}\ln\hat{p}_{mk}$$

- $\hat{p}_{mk}$ is the proportion of training observations in region $m$ from class $k$. $E$ is the **classification error rate**, $G$ the [[Gini Index]] and $D$ the [[Entropy|entropy]] — the three [[Node Impurity|node impurity]] measures, all zero for a pure node. A split is scored by the observation-weighted impurity of its two children.
- **Grow with Gini or entropy; prune with any, but the error rate if accuracy is the goal.** Following James et al., $E$ is not sensitive enough for growing: a split that makes a node much purer without changing its majority class leaves $E$ unchanged. The same reason explains splits whose two leaves predict the *same* class — they raise node purity, and so the confidence of each prediction.
- **Pruning** is cost-complexity [[Tree Pruning]]: the error term replaces RSS, the penalty $\alpha\lvert T\rvert$ is unchanged, and $\alpha$ is chosen by [[Cross-Validation]].
- A qualitative predictor splits by sending some of its levels to each branch. A single tree is easy to explain but high-variance; [[Bagging]], [[Random Forest|random forests]] and [[Boosting]] trade that interpretability for accuracy ([[Tree Ensemble]]). Its competitor for a binary response is [[Logistic Regression]].

> [!example]- Choosing the First Split for a Lapse Model {Example}
> Of $1{,}000$ auto policies up for renewal, $300$ lapsed. Two candidate first splits:
>
> - **A — rate increase over 10%:** $200$ policies ($120$ lapsed) and $800$ policies ($180$ lapsed).
> - **B — tenure of 10 years or more:** $300$ policies ($0$ lapsed) and $700$ policies ($300$ lapsed).
>
> Compare the decrease in the Gini index and in the classification error rate. Which split is chosen when growing the tree?
>
> > [!answer]-
> > For two classes $G = 2\hat{p}(1-\hat{p})$ and $E = \min(\hat{p}, 1-\hat{p})$. The parent has $\hat{p} = 0.30$: $G = 0.42$, $E = 0.30$.
> >
> > **Split A** (lapse shares $0.60$ and $0.225$):
> >
> > $$
> > \begin{align*}
> > G_A &= 0.2(0.48) + 0.8(0.34875) \\
> > &= 0.375 \\
> > E_A &= 0.2(0.40) + 0.8(0.225) \\
> > &= 0.26
> > \end{align*}
> > $$
> >
> > **Split B** (lapse shares $0$ and $3/7$):
> >
> > $$
> > \begin{align*}
> > G_B &= 0.3(0) + 0.7 \cdot 2\left(\tfrac{3}{7}\right)\left(\tfrac{4}{7}\right) \\
> > &= 0.3429 \\
> > E_B &= 0.3(0) + 0.7\left(\tfrac{3}{7}\right) \\
> > &= 0.30
> > \end{align*}
> > $$
> >
> > | Split | Gini decrease | Error-rate decrease |
> > |---|---|---|
> > | A | $0.0450$ | $0.04$ |
> > | B | $0.0771$ | $0.00$ |
> >
> > **Gini chooses B.** Every node still predicts "renew", so the error rate sees no gain, yet B isolates $300$ long-tenure policies that never lapsed and leaves a $43\%$-lapse node ripe for further splitting. Entropy agrees ($0.1328$ against $0.0497$). Growing on the error rate would have taken A.

> [!example]- Majority Vote or Cost-Based Referral for Fraud {Example}
> A pruned tree for claim fraud has three terminal nodes. Training counts:
>
> | Leaf | Claims | Fraudulent |
> |---|---|---|
> | 1 | $60$ | $21$ |
> | 2 | $240$ | $24$ |
> | 3 | $700$ | $14$ |
>
> An investigation costs \$500 and prevents the loss on a fraudulent claim; an undetected fraud costs \$8,000. Find (a) each leaf's predicted class and the training error rate under majority vote, and (b) the leaves to refer for investigation to minimize total cost, with that cost.
>
> > [!answer]-
> > (a) The fraud shares are $0.35$, $0.10$ and $0.02$ — all below one half, so **every leaf predicts "legitimate"**. The training error rate is $59/1{,}000 = 5.9\%$, exactly that of flagging nothing.
> >
> > (b) Refer a leaf when the expected saving exceeds the cost, $8{,}000\,\hat{p} > 500$, so $\hat{p} > 0.0625$: **leaves 1 and 2**.
> >
> > $$
> > \begin{align*}
> > \text{Cost} &= 500(300) + 8{,}000(14) \\
> > &= 150{,}000 + 112{,}000 \\
> > &= 262{,}000
> > \end{align*}
> > $$
> >
> > against $8{,}000 \times 59 = \$472{,}000$ when nothing is referred. The referral rule's error rate is $(255 + 14)/1{,}000 = 26.9\%$ — far worse — yet it saves \$210,000. The tree's leaf proportions, not its majority vote, are what a business decision should use.

> [!tip]- How it appears on the exam
> - **DISC-DA:** Section 8.2 covers analyzing data with classification trees. Questions give a small fitted tree for an insurance yes/no outcome, such as lapse, fraud or a large loss, and ask for the class or probability predicted for a new record, which split separates the classes better, or how to evaluate the tree on holdout data with a [[Confusion Matrix|confusion matrix]] ([[Model Training and Evaluation]]).
> - **SRM** (multiple choice): compute the Gini index, entropy or error rate of a node or a split from class counts and pick the best split; or judge statements on which measure suits growing and which pruning.
> - **SRM**: read a fitted tree — follow a new observation to its leaf and give the predicted class or probability — and compare trees with linear models (interpretability, interactions, variance).
> - **PA** (written): construct, prune and validate a classification tree for a business problem — interpret its splits, justify the pruned size from CV error, and evaluate it on held-out data with a [[Confusion Matrix]] or [[AUROC]] at a cutoff suited to the problem.

> [!warning]- Exam traps
> - **Error rate for growing.** It can show zero gain on a split that Gini and entropy rightly prefer. Grow on Gini or entropy; prune on the error rate.
> - **Unweighted children.** The split's impurity is $\frac{n_L}{n}I_L + \frac{n_R}{n}I_R$, not $\frac{1}{2}(I_L + I_R)$; averaging ignores that a tiny pure node is worth little.
> - **"Both leaves predict the same class, so the split is useless."** It increases node purity and confidence, and it can enable the next split.
> - **Binary-only formulas.** $2\hat{p}(1-\hat{p})$ and $\min(\hat{p}, 1-\hat{p})$ hold for $K = 2$ only; with three or more classes sum over all $K$, and $E = 1 - \max_k \hat{p}_{mk}$.
