---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:checker-islr-a
  content_hash: sha256:d356fdb72808d7bc61ad922a879ae65a89ce99b3db0bbfb8a4e7ab271c169d95
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021), CAS-hosted copy, §2.2.3 'The Classification Setting' and 'K-Nearest Neighbors', printed pp.37-42 (PDF pp.48-53) incl. eqs. (2.11)-(2.12); §3.5, printed pp.105-108 (PDF pp.115-118); §4.7.6, printed p.183 (PDF p.193), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "MIT OpenCourseWare 15.062 Data Mining (Spring 2003), 'k-Nearest Neighbor Algorithms for Classification and Prediction' notes, §1 p.2 (k = n predicts the training majority for all observations, oversmoothing) and §3 p.4 (no time to estimate parameters; finding neighbors in a large training set slow), sha256:ab47cf9500c44d5dc75dfb2c76f58cd5431810f39c3da5b0d085284cde7cb746 — https://ocw.mit.edu/courses/15-062-data-mining-spring-2003/c58922a0bfc2261ec849ebdbfdae9bf9_knn3.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/K-Nearest Neighbors.md
---

![[Media/Figures/K-Nearest_Neighbors.svg|340]]

**K-Nearest Neighbors** (KNN) is a nonparametric [[Statistical Learning|statistical learning]] method that predicts the response of a new observation $x_0$ from the $K$ training observations closest to it. For regression, the prediction is the average of their responses:

> $$\hat{f}(x_0) = \frac{1}{K}\sum_{i \in \mathcal{N}_0} y_i$$

- $\mathcal{N}_0$ is the set of the $K$ training observations nearest to $x_0$, usually by Euclidean distance.

To find $\mathcal{N}_0$, compute the distance from $x_0$ to every training observation, rank them, and select the $K$ smallest. The predictors are standardized first, because a distance depends on their units. KNN estimates no parameters. It keeps the training data and does its work at prediction time, which can be slow with a large training set. It also degrades with many predictors, because distances in high dimensions become uninformative.

> [!example]- The training data are $(x, y) = (1, 10)$, $(3, 14)$, $(4, 15)$, $(7, 20)$ and $(9, 30)$. What does KNN regression with $K = 3$ predict at $x_0 = 5$? {Example}
> - The distances from $x_0$ are $4$, $2$, $1$, $2$ and $4$.
> - The three nearest are $x = 4$, $3$ and $7$, with responses $15$, $14$ and $20$.
> - $\hat{f}(5) = (15 + 14 + 20)/3 = 16.33$.

## KNN classification

For classification, the estimated probability of class $j$ at $x_0$ is

> $$\hat{P}(Y = j \mid X = x_0) = \frac{1}{K}\sum_{i \in \mathcal{N}_0} I(y_i = j)$$

- $I(y_i = j)$ is $1$ when $y_i = j$ and $0$ otherwise.

KNN predicts the class with the largest estimated probability, the majority class among the $K$ neighbors. With $K = 1$ it assigns the class of the single closest training observation.

> [!example]- The 3 nearest neighbors of a new claim are labelled Fraud, Fraud and Not Fraud. What are the estimated probability of fraud and the predicted class? {Example}
> - Two of the three neighbors are Fraud, so $\hat{P}(\text{Fraud} \mid X = x_0) = 2/3 = 0.667$.
> - The predicted class is Fraud.

## Choosing $K$

A small $K$ gives a flexible fit, with low bias and high variance, and a jagged decision boundary. A large $K$ gives a smooth fit, with high bias and low variance. When $K = n$, every neighborhood is the whole training set, so KNN predicts the training data's majority class for every observation. $K$ is chosen by [[Cross-Validation|cross-validation]].

> [!example]- A binary classifier is fitted with $K = 1$ and with $K = 50$. How do the decision boundaries differ? {Example}
> - With $K = 1$ the boundary is highly irregular, and the training error is zero.
> - With $K = 50$ the boundary is much smoother, and it misclassifies some training observations.

## The Bayes classifier

The Bayes classifier assigns $x_0$ to the class $j$ with the largest true $\Pr(Y = j \mid X = x_0)$. KNN estimates this classifier, which can't be computed in practice because the true conditional probabilities are unknown. The Bayes error rate is the lowest possible test error rate:

> $$1 - E\left[\max_j \Pr(Y = j \mid X)\right]$$

- The expectation averages over the values of $X$.

At one point $x_0$ the Bayes classifier's error probability is $1 - \max_j \Pr(Y = j \mid X = x_0)$. For two classes with $p = \Pr(Y = 1 \mid X = x_0)$, that is $\min(p, 1 - p)$. On a set of test points, the Bayes classifier's expected error rate is the average of these error probabilities, worked from the true conditional probabilities rather than from the test labels.

> [!example]- At two test points the true probabilities of class 1 are $0.7$ and $0.4$. What is the Bayes classifier's expected error rate on them? {Example}
> - At the first point it predicts class 1, with error probability $1 - 0.7 = 0.3$.
> - At the second it predicts class 0, with error probability $0.4$.
> - The expected error rate is $(0.3 + 0.4)/2 = 0.35$.

> [!trap] Unstandardized predictors
> A distance on unstandardized predictors is driven by the one with the largest units: a $\$1{,}000$ difference in claim amount swamps a 10-year difference in age. Standardize the predictors before finding neighbors.
