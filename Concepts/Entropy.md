---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:b7b31961a4626eb94dce1066207b78e78a51c1a5d95a801e993dafb88bd13872
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §8.1, printed pp.327-340 (PDF pp.335-348; printed = PDF - 8), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Entropy.md
---

![[Media/Figures/Entropy.svg|340]]

The **Entropy** of a node in a classification [[Decision Tree|decision tree]] is a measure of the node's [[Node Impurity|impurity]], taken from information theory:

> $$D = -\sum_{k=1}^{K}\hat{p}_{mk}\ln\hat{p}_{mk}$$

- $\hat{p}_{mk}$ is the share of node $m$'s training observations in class $k$.
- $K$ is the number of classes.

The entropy is $0$ for a pure node and largest when the classes are evenly mixed. For two classes it is $D = -\hat{p}\ln\hat{p} - (1 - \hat{p})\ln(1 - \hat{p})$, largest at $\hat{p} = 0.5$ with $D = \ln 2 = 0.693$. Base-2 logarithms, which give the entropy in bits, rescale every node's entropy by the same factor, so they never change which split wins. The entropy and the [[Gini Index|Gini index]] are numerically similar.

> [!example]- A node holds 40 large losses and 60 small losses. What is its entropy? {Example}
> - The class shares are $0.40$ and $0.60$.
> - $D = -[0.40(-0.916) + 0.60(-0.511)] = 0.366 + 0.307 = 0.673$.

## Information gain

The information gain of a split is the reduction in entropy from it. When the split divides a node's $n$ observations into $n_L$ and $n_R$, the information gain is

> $$\Delta D = D_{\text{parent}} - \frac{n_L}{n}D_L - \frac{n_R}{n}D_R$$

- $D_L$ and $D_R$ are the entropies of the two nodes the split creates.

The split with the largest information gain, which is the smallest weighted entropy of the two nodes, is chosen.

> [!example]- A node of 100 observations has entropy $0.693$. A split leaves 60 observations with entropy $0.5$ and 40 with entropy $0.2$. What is the information gain? {Example}
> - The weighted entropy after the split is $0.6(0.5) + 0.4(0.2) = 0.38$.
> - $\Delta D = 0.693 - 0.38 = 0.313$.
