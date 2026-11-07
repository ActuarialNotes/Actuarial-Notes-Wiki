---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:befdae1ce4c1483822edf2774749081928382930d137674d7f4fd6aab5c29bff
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §10.1-10.2, pp.404-410 (PDF 411-417); §10.7, pp.434-439 (PDF 441-446), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goodfellow, Bengio & Courville, Deep Learning (MIT Press 2016), author-hosted Ch.6 Deep Feedforward Networks, Ch.6 §7 weight decay; §6.4.1 universal approximation, sha256:14d53b99e734892233699b5814588592cb38a24c5437e811a012b135ba510ad2 — https://www.deeplearningbook.org/contents/mlp.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hidden Layer.md
---

A **Hidden Layer** is a layer of units in a [[Neural Network|neural network]] between the input predictors and the output. Each of its $K$ units computes an activation from the predictors $X_1, \ldots, X_p$:

> $$A_k = g\!\left(w_{k0} + \sum_{j=1}^{p} w_{kj}X_j\right)$$

- $g$ is a non-linear [[Activation Function|activation function]], such as the ReLU $g(z) = \max(0, z)$.
- $w_{kj}$ is the weight from $X_j$ to unit $k$, and $w_{k0}$ is the unit's bias.

For a quantitative response, the output is a weighted sum of the activations:

> $$f(X) = \beta_0 + \sum_{k=1}^{K}\beta_k A_k$$

- $\beta_0, \ldots, \beta_K$ are the output weights.

The layer is hidden because the activations $A_k$ are never observed: they are neither in the data nor targets. They are derived features, like basis functions, but they are learned from the data to predict the response rather than fixed in advance.

> [!example]- A fraud model has inputs $X_1 = 1.2$ and $X_2 = -0.5$, two ReLU hidden units with weights $(0.1, 0.8, -0.6)$ and $(-0.4, -0.5, 1.0)$, and a sigmoid output with $\beta_0 = -1.0$, $\beta_1 = 1.5$, $\beta_2 = 2.0$. What fraud probability does it give? {Example}
> - Unit 1's input is $0.1 + 0.8(1.2) - 0.6(-0.5) = 1.36$, so $A_1 = 1.36$.
> - Unit 2's input is $-0.4 - 0.5(1.2) + 1.0(-0.5) = -1.50$, so $A_2 = 0$.
> - The output's input is $-1.0 + 1.5(1.36) + 2.0(0) = 1.04$.
> - The probability is $1/(1 + e^{-1.04}) = 0.739$.

## Number of weights

A hidden layer of $K$ units fed by $p$ inputs has

> $$K(p + 1)$$

weights, counting each unit's bias. A quantitative output fed by the layer adds $K + 1$ more.

> [!example]- A network takes 12 rating variables, has hidden layers of 16 and 8 units, and one output. How many weights does it have? {Example}
> - The first hidden layer has $16(12 + 1) = 208$ weights.
> - The second takes the first layer's 16 activations as inputs, so it has $8(16 + 1) = 136$.
> - The output has $8 + 1 = 9$.
> - The total is $208 + 136 + 9 = 353$ weights, against 13 coefficients for a [[Generalized Linear Model|GLM]] on the same variables.

The many weights are why a network needs [[Regularization|regularization]] and is judged on [[Test Error|test error]].

## Multiple hidden layers

A second hidden layer takes the first layer's activations as its inputs:

> $$A^{(2)}_{\ell} = g\!\left(w^{(2)}_{\ell 0} + \sum_{k=1}^{K} w^{(2)}_{\ell k}A^{(1)}_k\right)$$

- $A^{(1)}_k$ is unit $k$ of the first layer, and $w^{(2)}_{\ell k}$ the weight from it to unit $\ell$ of the second.

Later layers represent features of features. One wide layer can approximate most functions, but several moderate layers usually make a good fit easier to find.

## Interactions built by a hidden layer

A non-linear activation lets hidden units build [[Interaction|interactions]] and curvature that the modeller never specified.

> [!example]- Two hidden units with $g(z) = z^2$ compute $A_1 = (X_1 + X_2)^2$ and $A_2 = (X_1 - X_2)^2$, and the output is $f = 0.25A_1 - 0.25A_2$. What does the network compute? {Example}
> - Expanding gives $f = 0.25\left[(X_1 + X_2)^2 - (X_1 - X_2)^2\right] = 0.25(4X_1X_2)$.
> - So $f = X_1X_2$, an interaction a GLM has only if the product term is added.
> - At $X_1 = 2$ and $X_2 = 1.5$, $A_1 = 12.25$ and $A_2 = 0.25$, so $f = 3.0 = 2 \times 1.5$.
