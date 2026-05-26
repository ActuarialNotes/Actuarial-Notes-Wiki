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

> [!example]- Interpreting Neural Network Output {Example}
> A neural network with a sigmoid output is used to predict claim fraud. For a new claim, the network outputs $\hat{p} = 0.82$. What does this mean, and how should a threshold be chosen?
>
> > [!answer]-
> > $\hat{p} = 0.82$ means the network assigns an 82% estimated probability that the claim is fraudulent. The **classification threshold** (e.g., 0.5 for symmetric costs, or a higher/lower value based on relative costs of [[Type I Error|false positives]] and [[Type II Error|false negatives]]) determines the final class label. This threshold is typically tuned using an [[AUROC]] curve.
