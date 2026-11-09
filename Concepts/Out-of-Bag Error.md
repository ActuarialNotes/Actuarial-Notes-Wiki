---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:7b0d97e4528a0ce0ad96fde4c4337143d86ad51d72b827f587ef38310c26dd5c
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.2.1-8.2.3 and 8.2.5, printed pp.340-347, 351-352 (PDF pp.348-355, 359-360), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §5.4 Exercise 2(c), printed p.219 (PDF p.228), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Out-of-Bag Error.md
---

![[Media/Figures/Out-of-Bag_Error.svg|340]]

The **Out-of-Bag Error** is an estimate of the test error of a [[Bagging|bagged]] model, made from the observations each [[Bootstrap|bootstrap]] sample leaves out. A bootstrap sample of size $n$, drawn with replacement, leaves out a given observation with probability

> $$\left(1 - \frac{1}{n}\right)^{n} \approx e^{-1} = 0.368$$

An observation is out of bag for a tree if it is not in that tree's bootstrap sample. Each observation is out of bag for about $0.368B$ of the $B$ trees, roughly a third.

> [!example]- A random forest of 600 trees is fitted to 4,000 claims. About how many trees are out of bag for one claim? {Example}
> - The probability a claim is left out of one sample is $(1 - 1/4{,}000)^{4{,}000} = 0.368$.
> - About $0.368 \times 600 = 221$ trees never saw the claim.

## Computing the out-of-bag error

The out-of-bag prediction for observation $i$ averages the predictions of only the trees for which $i$ is out of bag, or takes their majority vote for classification. The out-of-bag error is the MSE or classification error rate of these predictions over all the training observations. It needs no extra fitting, because it comes from the trees already grown. With $B$ large, it is virtually equivalent to the leave-one-out [[Cross-Validation|cross-validation]] error.

The out-of-bag error is defined only for methods that resample. A single [[Decision Tree|decision tree]] or a [[Boosting|boosted]] model has none.

> [!example]- An observation with $y = 15$ is out of bag for three trees, which predict $10$, $12$ and $14$. What is its out-of-bag prediction and squared error? {Example}
> - The out-of-bag prediction is $(10 + 12 + 14)/3 = 12$.
> - Its squared error is $(15 - 12)^2 = 9$, one term of the out-of-bag MSE.

> [!trap] Using every tree
> An observation's out-of-bag prediction uses only the trees that did not see it. Averaging all $B$ trees includes trees fitted to it and gives an optimistic training error, not a test-error estimate.
