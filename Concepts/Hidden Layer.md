---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e6dc8bd236254138454099429575ecf3a8f69061ce5b065d8a20f93eecf8a8a3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Hidden Layer.md
---

**A hidden layer** is a layer of units in a [[Neural Network]] that sits between the input predictors and the output. Each unit forms a weighted combination of the layer below and passes it through a non-linear [[Activation Function|activation function]]. The resulting activations are new features that the network builds from the data, rather than ones the modeller specifies.

> $$A_k = g\!\left(w_{k0} + \sum_{j=1}^{p} w_{kj}X_j\right)$$
>
> $$f(X) = \beta_0 + \sum_{k=1}^{K}\beta_k A_k$$

- $K$ is the number of units in the layer, and $w_{kj}$ are the weights feeding unit $k$, with $w_{k0}$ its bias. $g$ is the activation (ReLU $\max(0, z)$, sigmoid), and the $\beta_k$ are the output weights. The layer is "hidden" because the $A_k$ are never observed: they are neither in the data nor targets.
- **What the layer adds is non-linearity.** If $g$ were linear, stacked layers would compose into a single linear map, and the network would collapse to a [[Linear Regression|linear]] or [[Generalized Linear Model|GLM]] predictor with extra, unidentifiable weights. A non-linear $g$ lets hidden units build [[Interaction|interactions]] and curvature that the modeller never wrote down.
- **Deep networks** stack layers. The second hidden layer takes the first layer's activations as its inputs, $A^{(2)}_{\ell} = g\big(w^{(2)}_{\ell 0} + \sum_k w^{(2)}_{\ell k}A^{(1)}_k\big)$, so later layers represent features of features. One wide layer can in principle approximate most functions. Several moderate layers usually make a good fit easier to find.
- **Parameter count.** A layer of $K$ units fed by $m$ inputs has $K(m + 1)$ weights. Counts grow quickly, which is why networks need [[Regularization|regularization]] (weight decay, dropout, early stopping). It is also why [[Test Error|test error]], not training error, judges the architecture.
- **Training and reading.** [[Backpropagation]] carries the gradient of the loss back through each hidden layer by the chain rule. A ReLU unit that is switched off ($z < 0$) passes no gradient for that observation. Individual hidden units rarely mean anything on their own. Unlike [[Principal Components Analysis|principal components]], they are learned to predict the response, not to summarise the predictors, and are read collectively.

> [!example]- Forward Pass for a Fraud Score {Example}
> A fraud model has two standardised inputs, claim size $X_1 = 1.2$ and days to report $X_2 = -0.5$. It has one hidden layer of two ReLU units and a sigmoid output:
> - unit 1: $w_{10} = 0.1$, $w_{11} = 0.8$, $w_{12} = -0.6$
> - unit 2: $w_{20} = -0.4$, $w_{21} = -0.5$, $w_{22} = 1.0$
> - output: $\beta_0 = -1.0$, $\beta_1 = 1.5$, $\beta_2 = 2.0$
>
> Compute the fraud probability.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > z_1 &= 0.1 + 0.8(1.2) - 0.6(-0.5) = 1.36 \\
> > z_2 &= -0.4 - 0.5(1.2) + 1.0(-0.5) = -1.50 \\
> > A_1 &= \max(0,\ 1.36) = 1.36 \\
> > A_2 &= \max(0,\ -1.50) = 0 \\
> > \eta &= -1.0 + 1.5(1.36) + 2.0(0) = 1.04 \\
> > \hat{p} &= \frac{1}{1 + e^{-1.04}} = 0.739
> > \end{align*}
> > $$
> > The claim scores a $73.9\%$ fraud probability. Unit 2 is switched off for this claim, so it contributes nothing to the score. In training, backpropagation would leave its weights unchanged for this observation.

> [!example]- Counting Weights in a Rating Network {Example}
> A pricing network takes $12$ numeric rating variables, has two hidden layers of $16$ and $8$ units, and one output. How many weights does it have? What happens if every activation is the identity?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Layer 1} &= 16(12 + 1) = 208 \\
> > \text{Layer 2} &= 8(16 + 1) = 136 \\
> > \text{Output} &= 1(8 + 1) = 9 \\
> > \text{Total} &= 353
> > \end{align*}
> > $$
> > A GLM on the same variables has $13$ coefficients. With identity activations the three layers multiply into a single linear map of the $12$ inputs. The network can then represent nothing a $13$-parameter linear predictor cannot, while carrying $340$ redundant weights. The non-linear activation is what the extra weights pay for.

> [!example]- How a Hidden Layer Builds an Interaction {Example}
> Two hidden units with activation $g(z) = z^2$ take $A_1 = g(X_1 + X_2)$ and $A_2 = g(X_1 - X_2)$. The output is $f = 0.25A_1 - 0.25A_2$. Here $X_1$ is driver inexperience and $X_2$ vehicle power, both standardised. Show what the network computes, and evaluate it at $X_1 = 2$, $X_2 = 1.5$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > f &= 0.25\left[(X_1 + X_2)^2 - (X_1 - X_2)^2\right] \\
> > &= 0.25\,(4X_1X_2) \\
> > &= X_1X_2
> > \end{align*}
> > $$
> > At the given point, $A_1 = 3.5^2 = 12.25$ and $A_2 = 0.5^2 = 0.25$, so $f = 0.25(12.25 - 0.25) = 3.0 = 2 \times 1.5$.
> >
> > The hidden layer has produced a pure inexperience-by-power **interaction**, which a GLM would only have if the modeller added the product term. ($z^2$ is chosen for clean algebra. ReLU or sigmoid units build such shapes approximately, piece by piece.)
