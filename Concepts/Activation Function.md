---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3f45950d4e7f9186b2f6f1cff1d7e3972eb10fd34710efb1ce732306f02d928f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Activation Function.md
---

An **activation function** is the non-linear transform applied at each hidden unit of a [[Neural Network]]. Without it the whole network collapses to a single linear map, however many layers it has — the non-linearity is the entire source of a network's flexibility.

> $$A_k = g\!\left(w_{k0} + \sum_{j=1}^{p} w_{kj}X_j\right)$$

| Function | Form | Notes |
| :--- | :--- | :--- |
| **ReLU** | $g(z) = \max(0, z)$ | the modern default: cheap, no vanishing gradient for $z>0$ |
| **Sigmoid** | $g(z) = \dfrac{1}{1+e^{-z}}$ | squashes to $(0,1)$; saturates, so gradients vanish |
| **Tanh** | $g(z) = \dfrac{e^{z}-e^{-z}}{e^{z}+e^{-z}}$ | zero-centred sigmoid, range $(-1,1)$ |
| **Identity / softmax** | output layer | identity for regression, softmax for multi-class probabilities |

- **Compose two linear layers and you get a linear layer**: $W_2(W_1 x) = (W_2W_1)x$. The activation is what breaks that, letting a network represent interactions and curvature no [[Generalized Linear Model]] can without them being specified
- Sigmoid and tanh **saturate** — a large $\lvert z\rvert$ has near-zero derivative, so [[Backpropagation]] gradients shrink toward zero through deep stacks. ReLU's constant slope of 1 for $z>0$ is why it displaced them
- ReLU units can "die": once the input is always negative the gradient is permanently zero and the unit stops learning
- The **output** activation is chosen by the task, not by the hidden-layer convention: identity for a severity model, log-link-like exponential for a count model, sigmoid for a binary probability

![[Media/Figures/Activation_Function.svg|340]]

> [!example]- Computing One Hidden Unit {Example}
> A hidden unit has weights $w_0 = -1.5$, $w_1 = 0.8$, $w_2 = -0.3$ and inputs $X_1 = 4$, $X_2 = 2$. Find its output under ReLU and under sigmoid.
>
> > [!answer]-
> > $$z = -1.5 + 0.8(4) - 0.3(2) = -1.5 + 3.2 - 0.6 = 1.1$$
> > $$\text{ReLU: } \max(0, 1.1) = 1.1 \qquad \text{sigmoid: } \frac{1}{1 + e^{-1.1}} = 0.750$$
> > Had $z$ been $-1.1$, ReLU would output 0 (the unit contributes nothing and receives no gradient) while sigmoid would output 0.250.
