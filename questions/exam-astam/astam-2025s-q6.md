---
id: "astam-2025s-q6"
exam: "Exam ASTAM"
topic: "Bühlmann Credibility"
learning_objective: "Credibility"
difficulty: medium
type: multi-part
year: 2025
session: Spring
wiki_link:
  - Concepts/Bühlmann+Credibility
  - Concepts/Bayesian+Estimation
  - Concepts/Conjugate+Prior
  - Concepts/Exact+Credibility
  - Concepts/Posterior+Distribution
points: 9
---

For a portfolio of 100 independent policies, the annual claim amount on a policy, conditional on the risk parameter $\Theta = \theta$, has an exponential distribution with mean $\theta$.

An actuary assumes that the prior distribution of $\Theta$ is an Inverse Gamma distribution, denoted $IG(\alpha, \beta)$, with density function:

$$\pi(\theta) = \frac{\beta^{\alpha} e^{-\left(\frac{\beta}{\theta}\right)}}{\theta^{\alpha+1}\Gamma(\alpha)}, \quad \theta, \alpha, \beta > 0$$

You are given that $E\left[\Theta^k\right] = \dfrac{\beta^k\, \Gamma(\alpha - k)}{\Gamma(\alpha)},\ k < \alpha$.

Let $x_i$ denote the observed claim amount from the $i^{\text{th}}$ policy, $i = 1, \ldots, 100$, in Year 1. The actuary first uses the Bayesian approach.

## Part a (2 points)

Show that the posterior distribution of $\Theta$ is $IG\left(\alpha + 100, \beta + \sum_{i=1}^{100} x_i\right)$.

### Explanation

Let $n = 100$.

$$
\begin{align*}
\pi_{\theta \mid \mathbf{x}}(\theta) \propto L(\theta)\,\pi(\theta) &= \left(\prod_{i=1}^{n} \frac{e^{-x_i/\theta}}{\theta}\right)\left(\frac{\beta^{\alpha} e^{-\beta/\theta}}{\theta^{\alpha+1}\Gamma(\alpha)}\right) \\
&= \frac{e^{-\frac{1}{\theta}\left(\sum_{i=1}^{n} x_i\right)} \beta^{\alpha} e^{-\beta/\theta}}{\theta^{n+\alpha+1}\Gamma(\alpha)} \\
&\propto \frac{e^{-\frac{1}{\theta}\left(\sum_{i=1}^{n} x_i + \beta\right)}}{\theta^{n+\alpha+1}} \quad \text{(ignoring terms not involving } \theta\text{)}
\end{align*}
$$

$$\Rightarrow \theta \mid \mathbf{x} \sim \text{IG}\left(\alpha + n,\ \beta + \sum_{i=1}^{n} x_i\right) \quad \text{as required.}$$

### Examiner Report

Examiners' Comments: If a question says "show that" in the directions, a detailed proof is expected. Many candidates cited this as a known result without providing a detailed proof.

## Part b (1 point)

You are given that $\alpha = 30$, $\beta = 10{,}000$, and $\sum_{i=1}^{100} x_i = 50{,}000$.

Calculate the Bayesian estimate of the annual claim amount of a randomly selected policy in Year 2.

### Explanation

Let $\alpha^* = \alpha + 100 = 130$; $\beta^* = \beta + \sum_{i=1}^{100} x_i = 60{,}000$.

$$E[X] = E\big[E[X \mid \theta]\big] = E[\theta] = \frac{\beta^*\,\Gamma(\alpha^* - 1)}{\Gamma(\alpha^*)} = \frac{\beta^*}{\alpha^* - 1} = \frac{60{,}000}{130 - 1} = 465.12$$

### Examiner Report

Examiners' Comments: The question asked for a predictive mean. Many students gave the posterior mean and didn't indicate why the posterior and predictive means are the same in this case.

## Part c (3 points)

The actuary decides to approximate the Bayesian premium using the Bühlmann credibility model.

(i) Show that the expected value of the hypothetical means, $\mu$, is 350 to the nearest 50. You should calculate the value to the nearest 1.

(ii) Show that the expected value of the process variance, $v$, is 123,150 to the nearest 50. You should calculate the value to the nearest 1.

(iii) Show that the variance of the hypothetical means, $a$, is 4,250 to the nearest 50. You should calculate the value to the nearest 1.

### Explanation

The hypothetical parameters are calculated using the prior distribution for $\theta$.

(i)

$$\mu(\theta) = E[X \mid \theta] = \theta$$

$$\mu = E\big[\mu(\theta)\big] = E[\theta] = \frac{\beta}{\alpha - 1} = \frac{10{,}000}{29} = 344.83$$

(ii)

$$v(\theta) = Var[X \mid \theta] = \theta^2$$

$$v = E\big[v(\theta)\big] = E\left[\theta^2\right] = \frac{\beta^2\,\Gamma(\alpha - 2)}{\Gamma(\alpha)} = \frac{\beta^2}{(\alpha - 1)(\alpha - 2)} = 123{,}152.7$$

(iii)

$$a = Var\big[\mu(\theta)\big] = Var[\theta] = E\left[\theta^2\right] - E[\theta]^2 = 4246.65$$

### Examiner Report

Examiners' Comments: None.

## Part d (2 points)

For estimating the annual claim amount of a randomly selected policy from the portfolio in Year 2:

(i) Calculate the Bühlmann credibility factor.

(ii) Determine the Bühlmann credibility estimate.

### Explanation

(i) The credibility factor is

$$Z = \frac{n}{n + v/a} = \frac{100}{100 + 29} = 0.7752$$

(ii)

$$P = Z\bar{X} + (1 - Z)\mu$$

$$\bar{X} = \frac{50{,}000}{100} = 500$$

$$\Rightarrow P = 0.7752(500) + 0.2248(344.83) = 465.12$$

### Examiner Report

Examiners' Comments: Some candidates misidentified n=1 rather than n=100. There was also some difficulty in calculating x-bar. It seemed that some candidates knew the formula but didn't understand what the inputs in the formula meant.

## Part e (1 point)

Explain why the Bayesian and Bühlmann estimates are the same in this case.

### Explanation

The Buhlmann premium is the nearest linear combination of prior and posterior estimates to the Bayesian premium.

In this case, the Bayesian estimate is itself a linear function of the prior and posterior means so the Bühlmann and Bayesian are the same.

### Examiner Report

Examiners' Comments: Not all conjugate prior pairs have exact credibility, and even in the case where there are linear exponential families and conjugate priors, there isn't always exact credibility. The question was looking for an understanding of Bayesian and Buhlmann credibility and their relationship. The idea that the Buhlmann credibility is the best linear estimate is a fundamental one, and understanding that concept is very important.
