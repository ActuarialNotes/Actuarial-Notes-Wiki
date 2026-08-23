---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a9853223cf0ff4edd8f24770a23b1eb185324a758faee5da9c71f4e155562876
  sources: []
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
- **Stochastic gradient descent** applies the update on mini-batches rather than the full dataset, adding noise that helps escape poor local minima
- The loss surface is **non-convex** — different random starting weights give different fits, so results are not reproducible without a fixed seed
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
