---
id: "astam-021"
exam: "Exam ASTAM"
topic: "Bühlmann Credibility"
learning_objective: "Credibility"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Bühlmann+Credibility
  - Concepts/Bayesian+Credibility
  - Concepts/Posterior+Distribution
  - Concepts/Aggregate+Loss+Model
  - Concepts/Expected+Value+of+Process+Variance
  - Concepts/Variance+of+Hypothetical+Means
  - Concepts/Bayesian
points: 7
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7a42c62a669c98f640438c8dddeb48409ad4a41984895a7e103c1b273a830a55
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-021.md
---

For all policies in an auto insurance portfolio, the number of accidents in a year follows a Poisson distribution with unknown parameter $\theta$. The accident rate depends on the driving quality of the policyholder as described in the table below. The driving quality is not known in advance to the insurer.

| Quality | Number of accidents per year | Proportion of population |
|---|---|---|
| Good | Poisson(1) | 0.6 |
| Fair | Poisson(2) | 0.3 |
| Poor | Poisson(5) | 0.1 |

## Part a

For a random sample of 20 drivers from the population, calculate the expected number of accidents.

### Explanation

For a random sample of 1 person the expected number of accidents is

$$
E[N] = E\left[E[N \mid \theta]\right] = 0.6 \times 1 + 0.3 \times 2 + 0.1 \times 5 = 1.7
$$

For 20 people the expected number is $20 \times 1.7 = 34$.

## Part b

Calculate the standard deviation of the aggregate claims cost per year for a policyholder selected at random, assuming that for all claims the severity distribution has mean 1000 and standard deviation 2000.

### Explanation

Working in 000's, and letting $S$ denote the aggregate loss, we have:

$$
\begin{align*}
V[S] &= E\left[V[S \mid \theta]\right] + V\left[E[S \mid \theta]\right] \\
V[S \mid \theta] &= \theta E\left[Y^2\right] \\
                 &= \theta(1^2 + 2^2) \\
                 &= 5\theta \\
\Rightarrow E\left[V[S \mid \theta]\right] &= 0.6 \times 5 + 0.3 \times 10 + 0.1 \times 25 \\
                                           &= 8.5 \\
E[S \mid \theta] &= \theta E[Y] \\
                 &= \theta \\
\Rightarrow V\left[E[S \mid \theta]\right] &= \left(1(0.6) + 4(0.3) + 25(0.1)\right) - 1.7^2 \\
                                           &= 1.41
\end{align*}
$$

So, $V[S] = 8.5 + 1.41 = 9.91 \Rightarrow SD[S] = 3.148$.

## Part c

A policyholder has a claims experience of 3 claims (in total) in the past 3 years. Determine the posterior distribution of $\theta$ for this policyholder.

### Explanation

Let $p(\theta)$ denote the prior distribution of $\theta$, and let $\pi(\theta)$ denote the posterior distribution. Then $\pi(\theta) \propto L(\theta)\,p(\theta)$ where $L(\theta)$ is the likelihood function. Over a three year period, the distribution of the number of claims, given $\theta$, is Poisson$(3\theta)$, so $L(\theta)$ is the probability of having 3 claims from the Poisson$(3\theta)$ distribution.

$$
\begin{align*}
\pi(\theta = 1) &\propto \frac{3^3 e^{-3}}{3!}(0.6) = 0.13442 \\
\pi(\theta = 2) &\propto \frac{6^3 e^{-6}}{3!}(0.3) = 0.02677 \\
\pi(\theta = 5) &\propto \frac{15^3 e^{-15}}{3!}(0.1) = 0.00002
\end{align*}
$$

And, since $\pi(\theta = 1) + \pi(\theta = 2) + \pi(\theta = 5) = 1$

we have $\pi(\theta = 1) = 0.833836$; $\pi(\theta = 2) = 0.166057$; $\pi(\theta = 5) = 0.000107$.

## Part d

Calculate the Bayesian estimate of annual claim frequency for this policyholder.

### Explanation

$$
E[N] = 0.83384 \times 1 + 0.16606 \times 2 + 0.00011 \times 5 = 1.167
$$

## Part e

Identify the following functions/parameters used to calculate the Bühlmann credibility estimate of claim frequency, in the context of the parameters and distributions given above.

(i) $\mu(\theta)$; $v(\theta)$

(ii) $\mu$; $v$; $a$

### Explanation

$$
\begin{align*}
\mu(\theta) &= E[N \mid \theta] \\
            &= \theta \\
v(\theta) &= V[N \mid \theta] \\
          &= \theta
\end{align*}
$$

$\mu = E[\mu(\theta)]$ and $v = E[v(\theta)]$, based on the prior distribution,

so $\mu = v = E[\theta] = 1.7$

$$
a = V[\mu(\theta)] = (4.3 - 1.7^2) = 1.41
$$

## Part f

Calculate the Bühlmann Credibility estimate of claim frequency for the policyholder in part (c).

### Explanation

$$
P = Z\bar{X} + (1 - Z)\mu
$$

$$
\bar{X} = 3/3 = 1; \qquad Z = \frac{n}{n + v/a} = 0.71332
$$

$$
\Rightarrow P = 1.201
$$

## Part g

Your boss says, "It looks like this policyholder is a low-risk driver, so the correct risk premium should assume that they fall in the 'good driver' category." Comment on the appropriateness of this suggestion.

### Explanation

With three claims in 3 years, there is still more than a 16% probability that Adam is only a "fair" driver, with double the claim frequency of a "good" driver. Underestimating this risk could be costly.
