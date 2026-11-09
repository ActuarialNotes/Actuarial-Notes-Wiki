---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-18
  last_checked_by: agent:validate-v1
  content_hash: sha256:ba09be6fe4085918be9b6bd64c2552128afa4628c326b8c8c4a45f796515fcf6
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §10.1-10.2, pp.404-410 (PDF 411-417); §10.7, pp.434-439 (PDF 441-446), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §4.4.2, pp.152-153 (PDF 160-161), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goodfellow, Bengio & Courville, Deep Learning (MIT Press 2016), author-hosted Ch.6 Deep Feedforward Networks, Ch.6 intro (multilayer perceptrons), sha256:14d53b99e734892233699b5814588592cb38a24c5437e811a012b135ba510ad2 — https://www.deeplearningbook.org/contents/mlp.html"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Neural Network.md
---

![[Media/Figures/Neural_Network.svg|340]]

A **Neural Network** is a [[Statistical Learning|statistical learning]] model that predicts a response through layers of units, each applying a non-linear [[Activation Function|activation function]] to a weighted combination of the layer before it. It is trained on data and learns the structure of the data automatically, by an iterative fit much like a [[Generalized Linear Model|GLM]]'s.

With one [[Hidden Layer|hidden layer]] of $K$ units and a quantitative response, the prediction for predictors $X_1, \ldots, X_p$ is

> $$f(X) = \beta_0 + \sum_{k=1}^{K}\beta_k\, g\!\left(w_{k0} + \sum_{j=1}^{p} w_{kj}X_j\right)$$

- $g$ is the activation function.
- $w_{kj}$ is the weight from predictor $X_j$ to hidden unit $k$, and $w_{k0}$ is the unit's bias.
- $\beta_0, \ldots, \beta_K$ are the output weights.

The most common activation is the **ReLU** (rectified linear unit), $g(z) = \max(0, z)$. The weights are estimated by [[Backpropagation|backpropagation]], gradient descent on a loss function.

> [!example]- A network has two ReLU hidden units, with weights $w_{10} = 0.5$, $w_{11} = 1.0$, $w_{12} = -1.0$ and $w_{20} = -0.5$, $w_{21} = 0.8$, $w_{22} = 0.6$, and output weights $\beta_0 = 1.0$, $\beta_1 = 2.0$, $\beta_2 = 1.5$. What does it predict for $X_1 = 1$ and $X_2 = 2$? {Example}
> - Unit 1's input is $0.5 + 1.0(1) - 1.0(2) = -0.5$, so its activation is $\max(0, -0.5) = 0$.
> - Unit 2's input is $-0.5 + 0.8(1) + 0.6(2) = 1.5$, so its activation is $1.5$.
> - The prediction is $1.0 + 2.0(0) + 1.5(1.5) = 3.25$.

## Neural networks for classification

For a binary response, the output passes through the sigmoid $1/(1 + e^{-z})$, so the network predicts a probability. A classification threshold turns the probability into a class. The threshold weighs the cost of [[Type I Error|false positives]] against that of [[Type II Error|false negatives]], and the [[AUROC|ROC curve]] shows the trade at every threshold.

> [!example]- A fraud network outputs $\hat{p} = 0.82$ for a new claim. What does this mean, and is the claim flagged at a threshold of $0.5$? {Example}
> - The network estimates an 82% probability that the claim is fraudulent.
> - $0.82$ is above the threshold, so the claim is flagged for investigation.

## Deep neural networks

A deep network has several hidden layers, each taking the activations of the layer below as its inputs. Later layers represent features of features. The many weights make overfitting likely, so a network is fitted with [[Regularization|regularization]], such as a penalty on the weights or dropout, and judged on [[Test Error|test error]].
