---
id: "masi-an-036"
exam: "Exam MAS-I"
topic: "Efficiency"
learning_objective: "Statistics"
difficulty: hard
type: multi-part
bloom: evaluate
wiki_link:
  - Concepts/Efficiency
  - Concepts/Mean+Square+Error
  - Concepts/Bias
  - Concepts/Unbiasedness
  - Concepts/Sample+Variance
  - Concepts/Maximum+Likelihood+Estimation
points: 3
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:88e11e6211843eef45f6cd2380840a3fb46de1e65338e72fd9b6f4820c4d9135
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-036.md
---

A random sample of $n = 10$ claim severities is drawn from a normal distribution with unknown mean and variance $\sigma^2$. Two estimators of $\sigma^2$ are under consideration:

- the sample variance $S^2 = \frac{1}{9}\sum (X_i - \bar{X})^2$, which is unbiased with $\text{Var}(S^2) = \frac{2\sigma^4}{9}$;
- the maximum likelihood estimator $\hat\sigma^2 = \frac{1}{10}\sum (X_i - \bar{X})^2 = 0.9\,S^2$.

## Part a (1 point)
Calculate the mean square error of $\hat\sigma^2$, as a multiple of $\sigma^4$. Give the multiple to two decimal places (for example, enter 0.25 if the MSE is 0.25 times $\sigma^4$).

### Answer
0.19

### Explanation
$\hat\sigma^2 = 0.9\,S^2$, so its mean and variance follow from those of $S^2$:

$$
E[\hat\sigma^2] = 0.9\,\sigma^2, \qquad \text{Bias}(\hat\sigma^2) = -0.1\,\sigma^2
$$

$$
\text{Var}(\hat\sigma^2) = 0.81 \cdot \frac{2\sigma^4}{9} = 0.18\,\sigma^4
$$

$$
\text{MSE}(\hat\sigma^2) = \text{Var} + \text{Bias}^2 = 0.18\,\sigma^4 + 0.01\,\sigma^4 = 0.19\,\sigma^4
$$

The answer is **0.19**.

**Common wrong entries**

- **0.18** — the variance alone, leaving out the squared bias.
- **0.22** — the MSE of $S^2$, $\text{MSE}(S^2) = 2\sigma^4/9 = 0.222\,\sigma^4$, which is its variance because $S^2$ is unbiased.
- **0.17** — subtracting the squared bias instead of adding it.

## Part b (1 point)
Using mean square error as the criterion, which statement is correct?

- A) $S^2$ is preferred, because no biased estimator can have a smaller MSE than an unbiased one
- B) $\hat\sigma^2$ is preferred, because its MSE is below that of $S^2$
- C) $S^2$ is preferred, because a relative efficiency $\text{Var}(S^2)/\text{Var}(\hat\sigma^2)$ above 1 favours it
- D) Neither is preferred, because one is a constant multiple of the other
- E) $S^2$ is preferred, because the bias of $\hat\sigma^2$ grows as $n$ increases

### Answer
B

### Explanation
$\text{MSE}(S^2) = \text{Var}(S^2) = 2\sigma^4/9 = 0.222\,\sigma^4$, and $\text{MSE}(\hat\sigma^2) = 0.19\,\sigma^4$. The biased estimator's smaller variance more than pays for its squared bias, so under the MSE criterion $\hat\sigma^2$ is preferred. The answer is **B**.

**Why not the others**

- **A** — unbiasedness is one criterion, not a guarantee of the smallest MSE; MSE $=$ Var $+$ Bias$^2$, and here a little bias buys a larger cut in variance.
- **C** — the ratio $\text{Var}(S^2)/\text{Var}(\hat\sigma^2) = 1.23$ favours the estimator in the denominator, $\hat\sigma^2$, not $S^2$; and in any case relative efficiency is defined for two *unbiased* estimators, so it is the wrong yardstick here.
- **D** — scaling an estimator changes both its bias and its variance, so a constant multiple generally has a different MSE.
- **E** — the bias is $-\sigma^2/n$, which shrinks toward 0 as $n$ grows; $\hat\sigma^2$ is asymptotically unbiased.

## Part c (1 point)
A colleague proposes to rank the two estimators by their relative efficiency, $\text{Var}(S^2)/\text{Var}(\hat\sigma^2)$. Critique this proposal, and describe one situation in which $S^2$ would still be the better choice.

### Explanation
A full-credit answer makes these points:

1. Relative efficiency compares the variances of two **unbiased** estimators. $\hat\sigma^2$ is biased, so a variance comparison rewards it for shrinking toward 0 without charging it for missing $\sigma^2$ on average.
2. When either estimator is biased, the comparison should be by mean square error, $\text{Var} + \text{Bias}^2$, which charges for both — and here still favours $\hat\sigma^2$ (0.19 against 0.222, in units of $\sigma^4$).
3. A situation favouring $S^2$: when unbiasedness itself matters — for example, when many small-sample variance estimates are averaged or pooled (the bias of $\hat\sigma^2$ would not average away), or when the estimate feeds a $t$ or chi-square procedure built on $S^2$.

**Sample answer.** Ranking by $\text{Var}(S^2)/\text{Var}(\hat\sigma^2)$ is not valid because relative efficiency is only meaningful between unbiased estimators; $\hat\sigma^2$ has lower variance partly because it is biased toward zero. The right comparison is MSE, which adds the squared bias: 0.19 times $\sigma^4$ for $\hat\sigma^2$ against 0.222 times $\sigma^4$ for $S^2$, so $\hat\sigma^2$ still wins on MSE. $S^2$ would be the better choice when an unbiased estimate is required, for instance when the variance estimates from many small groups are averaged, since the downward bias of $\hat\sigma^2$ would persist in the average.
