---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-31
  last_checked_by: agent:checker-islr-a
  content_hash: sha256:e834419a6bb863300eeeff0fa1520851d0bb284adf4405b6bda1589f715a3b47
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §10.1-10.2, printed pp.404-410 (PDF 411-417); §10.7 incl. eqs. (10.23)-(10.31), printed pp.434-439 (PDF 441-446), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goodfellow, Bengio & Courville, Deep Learning (MIT Press 2016), author-hosted Ch.6 §6.5 (back-propagation cost of the same order as forward propagation), sha256:14d53b99e734892233699b5814588592cb38a24c5437e811a012b135ba510ad2 — https://www.deeplearningbook.org/contents/mlp.html"
    - "Goodfellow, Bengio & Courville, Deep Learning, author-hosted Ch.8 §8.3.1 SGD (learning rate too large: violent oscillations, cost increasing; too low: learning proceeds slowly), sha256:95f2810d0ab10e3934ad7dd858e816572b6a30893e7fca19163b211f6dfe91a1 — https://www.deeplearningbook.org/contents/optimization.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Backpropagation.md
---

**Backpropagation** is the chain rule applied backwards through a [[Neural Network]] to get the gradient of the loss with respect to every weight in one sweep. It is what makes gradient descent on a network with thousands of weights feasible.

> $$\frac{\partial L}{\partial w_{kj}} = \frac{\partial L}{\partial A_k}\cdot\frac{\partial A_k}{\partial z_k}\cdot\frac{\partial z_k}{\partial w_{kj}}$$
>
> $$w \leftarrow w - \eta\,\frac{\partial L}{\partial w}$$

- **Forward pass** computes the activations layer by layer and the loss; **backward pass** propagates $\partial L/\partial z$ from the output back to the input, reusing each layer's result for the one below
- Cost is roughly the same as a forward pass — the saving over differentiating each weight numerically is what made deep networks practical
- $\eta$ is the **learning rate**: too large and the loss oscillates or diverges, too small and training crawls
- **Stochastic gradient descent** applies the update on mini-batches rather than the full dataset; it is the state of the art for fitting deep networks, and it naturally enforces its own form of approximately quadratic regularization
- The loss surface is **non-convex** — different random starting weights give different fits, so results are not reproducible without a fixed seed
- The squared-error objective is often written with a $\tfrac12$, $R(\theta) = \tfrac12\sum_i \left(y_i - f_\theta(x_i)\right)^2$: differentiating the square brings down a 2 that cancels it, so $\partial R_i/\partial f_\theta(x_i) = -\left(y_i - f_\theta(x_i)\right)$ and an output weight's gradient is minus the residual times the activation $A_k = g(z_{ik})$ feeding it, $\partial R_i/\partial \beta_k = -\left(y_i - f_\theta(x_i)\right) A_k$. Without the $\tfrac12$ (as in the example below) every gradient doubles
- Regularization comes as a weight-decay penalty ([[Regularization|ridge]] on the weights), early stopping, or dropout

![[Media/Figures/Backpropagation.svg|340]]

> [!example]- One Gradient-Descent Step {Example}
> A single output weight is $w = 0.40$. The forward pass gives a prediction of 3.0 against an actual of 5.0, under squared-error loss $L = (y - \hat y)^2$, and the activation feeding that weight is $A = 2.0$. With $\eta = 0.05$, find the updated weight.
>
> > [!answer]-
> > $$\frac{\partial L}{\partial \hat y} = -2(y - \hat y) = -2(5 - 3) = -4$$
> > $$\frac{\partial \hat y}{\partial w} = A = 2 \;\Rightarrow\; \frac{\partial L}{\partial w} = -4(2) = -8$$
> > $$w \leftarrow 0.40 - 0.05(-8) = 0.40 + 0.40 = 0.80$$
> > The weight rises because the prediction was too low and the activation feeding it was positive — the step size is the gradient scaled by $\eta$.
