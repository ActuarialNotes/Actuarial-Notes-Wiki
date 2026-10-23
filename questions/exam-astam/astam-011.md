---
id: "astam-011"
exam: "Exam ASTAM"
topic: "Chi-Square Goodness-of-Fit Test"
learning_objective: "Construction and Selection of Parametric Models"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Chi-Square+Goodness-of-Fit+Test
  - Concepts/Poisson+Distribution
  - Concepts/Geometric+Distribution
  - Concepts/Hypothesis+Testing
points: 3
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:be8e6a0e633453dcb4d7e48935a3d676b8dde922246d63d7c6e28ac5c2e37e42
  sources:
    - "SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q11, p.16, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf"
    - "SOA ASTAM Solutions to Sample Questions, Q11, pp.23-24, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-011.md
---

For a portfolio of 2000 policyholders of automobile insurance, you are given the observed number of claims per policyholder for a given period:

| Number of claims | 0 | 1 | 2 | 3 | 4 | 5+ |
|---|---|---|---|---|---|---|
| Number of policyholders | 1625 | 307 | 58 | 9 | 1 | 0 |

## Part a

Assume first that $N$, can be modeled as a Poisson random variable.

- (i) Calculate the maximum likelihood estimate of the Poisson parameter.
- (ii) Calculate the expected number of policyholders for each possible number of claims using the fitted Poisson distribution.
- (iii) Calculate the chi-square test statistic for testing the goodness-of-fit of the Poisson model to the observed data.

### Explanation
(i) Let $k_i$ denote the number of claims from the $i$th policy. The likelihood function is

$$
\begin{align*}
L(\lambda) &= \frac{\lambda^{\sum_{i=1}^{n} k_i} e^{-n\lambda}}{\prod_{i=1}^{n} k_i!} \Rightarrow \log L = \sum_{i=1}^{n} k_i \log \lambda - n\lambda - \sum_{i=1}^{n} \log k_i! \\
\Rightarrow \frac{\partial \log L}{\partial \lambda} &= \frac{\sum_{i=1}^{n} k_i}{\lambda} - n \\
\Rightarrow \hat{\lambda} &= \frac{\sum_{i=1}^{n} k_i}{n} \\
&= \bar{k} \\
\Rightarrow \hat{\lambda} &= \frac{1625 \times 0 + 307 \times 1 + 58 \times 2 + 9 \times 3 + 1 \times 4}{2000} \\
                          &= 0.227.
\end{align*}
$$

(ii) Using the Poisson probability function with the estimated value of $\lambda$, we have the following estimated frequency:

| Number of claims (per policyholder) | 0 | 1 | 2 | 3 | 4 | 5+ |
|---|---|---|---|---|---|---|
| (Expected) Number of policyholders | 1593.842 | 361.802 | 41.065 | 3.107 | 0.176 | 0.008 |

(iii) The chi-square test statistic for this model is

$$\chi^2 = \frac{(1625 - 1593.842)^2}{1593.842} + \frac{(307 - 361.802)^2}{361.802} + \frac{(58 - 41.065)^2}{41.065} + \frac{(10 - 3.291)^2}{3.291} = 29.571$$

## Part b

Now assume that the distribution of $N$ is given by

$$\Pr\left[N = n\right] = \pi(1-\pi)^n \qquad n = 0, 1, 2, \cdots \qquad 0 < \pi < 1$$

- (i) Calculate the maximum likelihood estimate of $\pi$.
- (ii) Calculate the expected number of policyholders for each possible number of claims using the fitted distribution.
- (iii) Calculate the chi-square test statistic for testing the goodness-of-fit of the given model to the observed data.

### Explanation
(i) The likelihood function is given by

$$
\begin{align*}
L(\pi) &= \pi^n (1-\pi)^{\sum_{i=1}^{n} k_i} \Rightarrow \log L = n \log \pi + \left(\sum_{i=1}^{n} k_i\right) \log(1-\pi) \\
\Rightarrow \frac{\partial \log L}{\partial \pi} &= \frac{n}{\pi} - \frac{n\bar{k}}{1-\pi}.
\end{align*}
$$

Set equal to 0 for

$$\hat{\pi} = \frac{1}{\bar{k} + 1} = 0.8150$$

(ii) Using the estimated probability, we produce the following estimated frequency:

| Number of claims (per policyholder) | 0 | 1 | 2 | 3 | 4 | 5+ |
|---|---|---|---|---|---|---|
| (Expected) Number of policyholders | 1630.000 | 301.550 | 55.787 | 10.321 | 1.909 | 0.433 |

(iii) The chi-square test statistic for this model is 0.762.

## Part c

Compare the suitability of the two models to the data.

### Explanation
Since each model has one parameter to estimate, the corresponding degrees of freedom in the chi-square test are the same. Hence, because the chi-square test statistic based on the second model is much smaller, it will result in a much higher $p$-value, and is therefore a far better model.
