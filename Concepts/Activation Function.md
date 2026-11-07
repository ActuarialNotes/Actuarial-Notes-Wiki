---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:04921297b3de04430f490cf0c396eb3499c73eb724024df03eda98b873255527
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §10.1-10.2, pp.404-410 (PDF 411-417); §10.7, pp.434-439 (PDF 441-446), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goodfellow, Bengio & Courville, Deep Learning (MIT Press 2016), author-hosted Ch.6 Deep Feedforward Networks, Ch.6 §6.3.1 ReLU, §6.3.2 logistic sigmoid and tanh, §6.2.2 output units, sha256:14d53b99e734892233699b5814588592cb38a24c5437e811a012b135ba510ad2 — https://www.deeplearningbook.org/contents/mlp.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Activation Function.md
---

![[Media/Figures/Activation_Function.svg|340]]

An **Activation Function** is the non-linear function $g$ that a unit of a [[Neural Network|neural network]] applies to the weighted combination of its inputs. The activation of hidden unit $k$ is

> $$A_k = g\!\left(w_{k0} + \sum_{j=1}^{p} w_{kj}X_j\right)$$

- $w_{kj}$ is the weight from predictor $X_j$ to unit $k$, and $w_{k0}$ is the unit's bias.

> [!example]- A hidden unit has weights $w_{k0} = -1.5$, $w_{k1} = 0.8$ and $w_{k2} = -0.3$. What is its activation for $X_1 = 4$ and $X_2 = 2$ under the ReLU and under the sigmoid? {Example}
> - The weighted combination is $-1.5 + 0.8(4) - 0.3(2) = 1.1$.
> - The ReLU gives $\max(0, 1.1) = 1.1$.
> - The sigmoid gives $1/(1 + e^{-1.1}) = 0.750$.

> [!idea] The idea
> The activation function is the only non-linear step in a network, so it is the whole source of the network's flexibility.

## Common activation functions

The ReLU (rectified linear unit) is

> $$g(z) = \max(0, z)$$

The sigmoid is

> $$g(z) = \frac{1}{1 + e^{-z}}$$

The ReLU is the usual choice for hidden layers. It is cheap to compute, and its slope is 1 for every $z > 0$. The sigmoid squashes its input into $(0, 1)$, and its slope is near zero for large $\lvert z \rvert$, so [[Backpropagation|backpropagation]] gradients shrink through a deep stack of sigmoid units. A ReLU unit whose input is negative for every observation outputs zero and stops learning.

> [!example]- A unit's weighted combination is $z = -1.1$. What are its ReLU and sigmoid activations? {Example}
> - The ReLU gives $\max(0, -1.1) = 0$, so the unit contributes nothing to this prediction.
> - The sigmoid gives $1/(1 + e^{1.1}) = 0.250$.

## Linear activation

With the identity activation $g(z) = z$, each hidden unit is a linear combination of the inputs, and the output is a linear combination of those. Two linear layers compose into one:

> $$\mathbf{W}_2(\mathbf{W}_1 x) = (\mathbf{W}_2\mathbf{W}_1)x$$

- $\mathbf{W}_1$ and $\mathbf{W}_2$ are the weight matrices of the two layers.

The network is then a [[Linear Regression|linear model]] with extra weights that cannot be identified, however many layers it has.

> [!example]- A network with the identity activation has one hidden unit $A = 1 + 2X$ and output $f = -2 + 3A$. What does it compute? {Example}
> - Substituting the hidden unit gives $f = -2 + 3(1 + 2X)$.
> - That is $f = 1 + 6X$, a straight line in $X$, which one linear predictor with two coefficients gives directly.

## Output activation

The output unit's activation is chosen by the response. A quantitative response takes the identity, so the output is $\beta_0 + \sum_k \beta_k A_k$. A binary response takes the sigmoid, so the output is a probability. A response with $M$ classes takes the softmax, which turns the $M$ outputs $Z_1, \ldots, Z_M$ into probabilities:

> $$P(Y = m \mid X) = \frac{e^{Z_m}}{\sum_{\ell=1}^{M} e^{Z_\ell}}$$
