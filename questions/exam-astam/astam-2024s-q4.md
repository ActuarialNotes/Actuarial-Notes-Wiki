---
id: "astam-2024s-q4"
exam: "Exam ASTAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Construction and Selection of Parametric Models"
difficulty: medium
type: multi-part
year: 2024
session: Spring
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Fisher+Information
  - Concepts/Delta+Method
  - Concepts/Approximate+Confidence+Interval
  - Concepts/Weibull+Distribution
  - Concepts/Variance
points: 10
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:30fb0cfa4caf4b6f5ed7e6f1c909c6613c66e95bb68abfa5d03eda750b54c006
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-2024s-q4.md
---

The loss severity for an insurance policy has the following density function:

$$f(x) = \frac{3x^2 e^{-(x/\theta)^3}}{\theta^3} \qquad \text{for } x > 0$$

For this distribution, the first 3 raw moments are:

$$\mathrm{E}[X] = \theta\,\Gamma\!\left(1 + \frac{1}{3}\right) \qquad \mathrm{E}\big[X^2\big] = \theta^2\,\Gamma\!\left(1 + \frac{2}{3}\right) \qquad \mathrm{E}\big[X^3\big] = \theta^3$$

(Note: You can use the GAMMA function in Excel.)

A random sample of 100 losses, $x_1, x_2, \cdots, x_{100}$, has been collected. You are given:

$$\sum_{i=1}^{100} x_i = 954 \qquad \sum_{i=1}^{100} x_i^2 = 9{,}888 \qquad \sum_{i=1}^{100} x_i^3 = 109{,}812$$

## Part a (2 points)

Determine the log-likelihood function for this sample.

### Explanation
The log likelihood of the random sample is

$$l = \sum_{i=1}^{100} \log f(x_i) = 100\log 3 + 2\sum_{i=1}^{100}\log x_i - \frac{1}{\theta^3}\sum_{i=1}^{100}x_i^3 - 300\log\theta$$

### Examiner Report
A. Overall, students did well, though many candidates struggled with the algebra with taking logs (switching log and summation). Additionally, candidates wanted to plug in given sample values instead of giving a general formula.

## Part b (2 points)

Show that the maximum likelihood estimate of $\theta$, denoted $\hat\theta$, is 10.3 to the nearest 0.1. You should calculate the value to the nearest 0.0001.

### Explanation
To maximize the log likelihood, we differentiate wrt $\theta$:

$$\frac{\partial l}{\partial\theta} = \frac{3}{\theta^4}\sum_{i=1}^{100}x_i^3 - \frac{300}{\theta}$$

Set equal to 0:

$$\begin{align*}
\frac{3}{\theta^3}\sum_{i=1}^{100}x_i^3 &= 300 \\
\frac{1}{\theta^3}(109{,}812) &= 100 \\
\hat\theta^3 &= \frac{1}{100}\sum_{i=1}^{100}x_i^3 \\
&= 1098.12 \\
\Rightarrow \hat\theta &= 10.31692
\end{align*}$$

### Examiner Report
B. Most students did very well on this part, though some unnecessarily complicated it by plugging in values early.

## Part c (2 points)

Use Fisher's information to estimate the standard deviation of $\hat\theta$.

### Explanation
$$\begin{align*}
I = -E\left[\frac{\partial^2 l}{\partial\theta^2}\right] &= \frac{12}{\theta^5}\sum_{i=1}^{100}E[X_i^3] - \frac{300}{\theta^2} \\
&= \frac{12}{\theta^5}(100\theta^3) - \frac{300}{\theta^2} \\
&= \frac{900}{\theta^2}
\end{align*}$$

The asymptotic variance is $I^{-1}$, i.e.

$$\mathrm{SD}[\hat\theta] \approx \sqrt{\frac{\theta^2}{900}} = \frac{\theta}{30}$$

Approximate $\theta$ with $\hat\theta$ gives $\mathrm{SD}[\hat\theta] \approx \sqrt{0.118265} = 0.34390$

### Examiner Report
C. Most students knew what they needed to calculate but struggled with taking expectations.

## Part d (2 points)

(i) Calculate the maximum likelihood estimate of $\mathrm{Var}[X]$.

(ii) Using the delta method, estimate a 95% confidence interval for $\mathrm{Var}[X]$.

### Explanation
Let $V$ denote Var[X]. Then

$$V = \theta^2\Gamma(5/3) - \theta^2\Gamma(4/3)^2 = 0.10533\theta^2$$

Note that the Gamma function can be calculated in Excel

$$\begin{align*}
\hat V &= 0.105330\hat\theta^2 \\
&= 11.2115 \\
\mathrm{Var}[\hat V] &= (g'(\theta))^2\,\mathrm{Var}[\hat\theta] \quad \text{where } {g(\theta) = 0.10533\theta^2} \\
&= \left(0.21066\hat\theta\right)^2(0.118265) \\
&= 0.558657 \\
&= 0.74743^2
\end{align*}$$

So a 95% CI for $V$ is

$$11.2115 \pm 1.96(0.74743) = (9.7465,\ 12.6765)$$

### Examiner Report
D. Students showed good knowledge of what formula was needed for the delta method, though some struggled with how to apply the formulas or made small arithmetic mistakes.

## Part e (2 points)

Maximum likelihood estimates are known to have the following characteristics:

A. Invariance property

B. Asymptotically normally distributed

(i) Briefly describe each of these characteristics.

(ii) Explain where each of these characteristics has been applied in this question.

### Explanation
(i) The invariance property of MLEs means that the MLE of a function of a parameter is the function of the MLE of the parameter; that is, for any function $h$, $h(\theta) = h(\hat\theta)$.

We used the invariance property in (d), when we assumed that the MLE of $V$ was a function of the MLE of $\theta$, because $V$ is a function of $\theta$.

(ii) Asymptotically normality means that as the sample size increases, the distribution of the parameter estimator converges to a normal distribution.

We used asymptotic normality in the CI in part (d), where we assumed that 95% of the estimator distribution is captured by subtracting or adding 1.96 standard deviations to the estimated distribution mean.

### Examiner Report
E. While most students knew where they used Asymptotic normality assumptions, many struggled with the definition, specifically not mentioning sample size increasing to infinity. Very few were able to explain where Invariance was used (or even what it was), though they did use the property correctly in previous parts.
