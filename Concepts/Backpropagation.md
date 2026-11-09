---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:checker-islr-a
  content_hash: sha256:a934746a3b3e2961384bd6e6d49cb2e126c9b0bf4345387d18eaa2066a216f45
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §10.1-10.2, printed pp.404-410 (PDF 411-417); §10.7 incl. eqs. (10.23)-(10.31), printed pp.434-439 (PDF 441-446), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goodfellow, Bengio & Courville, Deep Learning (MIT Press 2016), author-hosted Ch.6 §6.5 (back-propagation cost of the same order as forward propagation), sha256:14d53b99e734892233699b5814588592cb38a24c5437e811a012b135ba510ad2 — https://www.deeplearningbook.org/contents/mlp.html"
    - "Goodfellow, Bengio & Courville, Deep Learning, author-hosted Ch.8 §8.3.1 SGD (learning rate too large: violent oscillations, cost increasing; too low: learning proceeds slowly), sha256:95f2810d0ab10e3934ad7dd858e816572b6a30893e7fca19163b211f6dfe91a1 — https://www.deeplearningbook.org/contents/optimization.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Backpropagation.md
---

![[Media/Figures/Backpropagation.svg|340]]

**Backpropagation** is the use of the chain rule, from the output of a [[Neural Network|neural network]] back to its inputs, to compute the gradient of the loss with respect to every weight in one sweep. For a quantitative response, the loss is

> $$R(\theta) = \frac{1}{2}\sum_{i=1}^{n}\left(y_i - f_\theta(x_i)\right)^2$$

- $\theta$ is the vector of all the network's weights, and $f_\theta(x_i)$ the prediction for observation $i$.

Gradient descent then moves each weight against its gradient:

> $$\theta \leftarrow \theta - \rho\,\frac{\partial R}{\partial \theta}$$

- $\rho$ is the learning rate.

A learning rate that is too large makes the loss oscillate or diverge, and one that is too small makes training slow.

> [!example]- A weight is $0.40$, its gradient is $-4$ and the learning rate is $\rho = 0.05$. What is the updated weight? {Example}
> - The step is $-\rho \times (-4) = 0.20$.
> - The updated weight is $0.40 + 0.20 = 0.60$.

## Forward and backward passes

The forward pass computes each hidden unit's weighted combination and activation, then the output and the loss. The backward pass carries the derivative of the loss from the output back through each layer, reusing each layer's result for the one below. For a weight into hidden unit $k$, with $z_k$ the unit's weighted combination, the chain rule gives

> $$\frac{\partial R}{\partial w_{kj}} = \frac{\partial R}{\partial A_k}\cdot\frac{\partial A_k}{\partial z_k}\cdot\frac{\partial z_k}{\partial w_{kj}}$$

The backward pass costs about as much as the forward pass, which is what makes fitting a network with thousands of weights feasible.

## Gradient of an output weight

The $\frac{1}{2}$ in the loss cancels the 2 that differentiating the square brings down, so for observation $i$ the gradient of an output weight is

> $$\frac{\partial R_i}{\partial \beta_k} = -\left(y_i - f_\theta(x_i)\right)A_k$$

- $A_k$ is the activation of hidden unit $k$ for observation $i$.

> [!example]- The network predicts $3.0$ for an observation whose response is $5.0$. The output weight $\beta_k = 0.40$ is fed by an activation $A_k = 2.0$. What is its gradient, and its value after one step with $\rho = 0.05$? {Example}
> - The residual is $5.0 - 3.0 = 2.0$.
> - The gradient is $-(2.0)(2.0) = -4$.
> - The updated weight is $0.40 - 0.05(-4) = 0.60$. It rises because the prediction was too low and the activation feeding it is positive.

## Gradient of a hidden-layer weight

Carrying the chain rule one layer further, the gradient of a weight into hidden unit $k$ is

> $$\frac{\partial R_i}{\partial w_{kj}} = -\left(y_i - f_\theta(x_i)\right)\beta_k\,g'(z_{ik})\,x_{ij}$$

- $g'(z_{ik})$ is the slope of the activation at the unit's input. For the ReLU it is 1 when $z_{ik} > 0$ and 0 otherwise.

> [!example]- For one observation the residual is $2.0$, the output weight is $\beta_k = 1.5$, the ReLU unit's input is positive and the predictor is $x_{ij} = 2$. What is the gradient of $w_{kj}$? {Example}
> - The ReLU's slope is 1, because the unit's input is positive.
> - The gradient is $-(2.0)(1.5)(1)(2) = -6$.
> - Had the unit's input been negative, its slope would be 0 and the weight would get no gradient from this observation.

## Stochastic gradient descent

Stochastic gradient descent applies the update on small batches of observations rather than the whole data set. The loss is non-convex, so different random starting weights give different fits. Regularization comes as a penalty on the weights, early stopping or dropout.

> [!trap] The $\frac{1}{2}$ in the loss
> Written without the $\frac{1}{2}$, as $\sum_i (y_i - f_\theta(x_i))^2$, the loss has gradients twice as large: $-2(y_i - f_\theta(x_i))A_k$ for an output weight. Check which loss a question uses before taking a step.
