---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:eaaeffd8045aaba6c9acf33d6dae5421a83717c3b4651fc79b93661dac59e69a
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §10.1-10.2, pp.404-410 (PDF 411-417); §10.7, pp.434-439 (PDF 441-446), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §4.4.2, pp.152-153 (PDF 160-161), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goodfellow, Bengio & Courville, Deep Learning (MIT Press 2016), author-hosted Ch.6 Deep Feedforward Networks, Ch.6 intro (multilayer perceptrons), sha256:14d53b99e734892233699b5814588592cb38a24c5437e811a012b135ba510ad2 — https://www.deeplearningbook.org/contents/mlp.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Neural Network.md
---

A **Neural Network** (also called an **artificial neural network** or **multilayer perceptron**) is a [[Statistical Learning]] model composed of layers of interconnected **neurons** (units) that learn complex, non-linear mappings from inputs to outputs.

> **Single hidden layer network (regression):**
> $$\hat{f}(x) = \beta_0 + \sum_{k=1}^K \beta_k \cdot g\!\left(w_{k0} + \sum_{j=1}^p w_{kj} x_j\right)$$

**Architecture components:**

| Component | Description |
| :--- | :--- |
| **Input layer** | One node per predictor $x_j$ |
| **Hidden layer(s)** | $K$ neurons; each applies weights $w_{kj}$ and activation $g$ |
| **Output layer** | Produces prediction $\hat{y}$ (or class probabilities) |
| **Activation function** $g$ | Introduces non-linearity (ReLU, sigmoid, tanh) |

- **ReLU** (Rectified Linear Unit): $g(z) = \max(0, z)$ — most common in modern networks
- **Sigmoid**: $g(z) = 1/(1+e^{-z})$ — squashes output to $(0,1)$; used for binary classification output
- Parameters (weights $w_{kj}$, $\beta_k$) are estimated by **backpropagation** (gradient descent on the loss function)
- **Dropout** and **regularization** (L1/L2 penalties) combat overfitting
- **Deep networks** have multiple hidden layers; depth enables learning hierarchical feature representations

![[Media/Figures/Neural_Network.svg|340]]

> [!example]- Interpreting Neural Network Output {Example}
> A neural network with a sigmoid output is used to predict claim fraud. For a new claim, the network outputs $\hat{p} = 0.82$. What does this mean, and how should a threshold be chosen?
>
> > [!answer]-
> > $\hat{p} = 0.82$ means the network assigns an 82% estimated probability that the claim is fraudulent. The **classification threshold** (e.g., 0.5 for symmetric costs, or a higher/lower value based on relative costs of [[Type I Error|false positives]] and [[Type II Error|false negatives]]) determines the final class label. This threshold is typically examined with a [[AUROC|ROC curve]].
