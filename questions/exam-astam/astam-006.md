---
id: "astam-006"
exam: "Exam ASTAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Construction and Selection of Parametric Models"
difficulty: hard
type: multi-part
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Pareto+Distribution
  - Concepts/Policy+Limit
  - Concepts/Limited+Expected+Value
  - Concepts/Censoring
  - Concepts/Fisher+Information
points: 4
---

Individual losses from a risk follow a Pareto distribution with parameters $\alpha$ and $\lambda$. Insurance covers these losses up to a policy limit of $M$. There is no deductible.

## Part a

Show that the expected claim severity is

$$\frac{\lambda}{\alpha - 1}\left(1 - \left(\frac{\lambda}{\lambda + M}\right)^{\alpha - 1}\right)$$

### Explanation

$$\begin{aligned}
E\big[\min(Y, M)\big] &= \int_0^M y\,f(y)\,dy + M\big(1 - F(M)\big) \\
&= \int_0^M y\,\frac{\alpha\lambda^\alpha}{(\lambda + y)^{\alpha + 1}}\,dy + M\left(\frac{\lambda}{\lambda + M}\right)^\alpha \\
&= \left[-y\left(\frac{\lambda}{\lambda + y}\right)^\alpha\right]_0^M + \int_0^M \left(\frac{\lambda}{\lambda + y}\right)^\alpha dy + M\left(\frac{\lambda}{\lambda + M}\right)^\alpha \\
&= -M\left(\frac{\lambda}{\lambda + M}\right)^\alpha + \left[-\frac{\lambda^\alpha}{(\alpha - 1)(\lambda + y)^{\alpha - 1}}\right]_0^M + M\left(\frac{\lambda}{\lambda + M}\right)^\alpha \\
&= \frac{\lambda^\alpha}{\alpha - 1}\left(\frac{1}{\lambda^{\alpha - 1}}\right) - \frac{\lambda^\alpha}{\alpha - 1}\left(\frac{1}{(\lambda + M)^{\alpha - 1}}\right) \\
&= \frac{\lambda}{\alpha - 1}\left(1 - \left(\frac{\lambda}{\lambda + M}\right)^{\alpha - 1}\right)
\end{aligned}$$

## Part b

A sample of 100 claims is available. Of these, three were above the policy limit of 20,000. The remaining 97 were below the policy limit and the precise values, $x_1, x_2, \ldots, x_{97}$, are known.

Derive and simplify as far as possible, expressions for the maximum likelihood estimators $\hat{\alpha}$ and $\hat{\lambda}$.

### Explanation

$$L(\alpha, \lambda) = \left(\alpha^{97}\lambda^{97\alpha}\prod_{i=1}^{97}(\lambda + x_i)^{-\alpha - 1}\right)\left(\frac{\lambda}{\lambda + M}\right)^{3\alpha}$$

$$l = \log L(\alpha, \lambda) = 97\log\alpha + 100\alpha\log\lambda - (\alpha + 1)\sum_{i=1}^{97}\log(\lambda + x_i) - 3\alpha\log(\lambda + M)$$

$$\frac{\partial l}{\partial \alpha} = \frac{97}{\alpha} + 100\log\lambda - \sum_{i=1}^{97}\log(\lambda + x_i) - 3\log(\lambda + M)$$

$$\frac{\partial l}{\partial \lambda} = \frac{100\alpha}{\lambda} - (\alpha + 1)\sum_{i=1}^{97}\frac{1}{(\lambda + x_i)} - \frac{3\alpha}{\lambda + M}$$

Set equal to zero:

$$0 = \frac{97}{\hat{\alpha}} + 100\log\hat{\lambda} - \sum_{i=1}^{97}\log(\hat{\lambda} + x_i) - 3\log(\hat{\lambda} + M)$$

$$0 = \frac{100\hat{\alpha}}{\hat{\lambda}} - (\hat{\alpha} + 1)\sum_{i=1}^{97}\frac{1}{(\hat{\lambda} + x_i)} - \frac{3\hat{\alpha}}{\hat{\lambda} + M}$$

## Part c

You are given that $\hat{\lambda} = 10{,}683$, and that

$$\sum_{i=1}^{97}\log\left(\hat{\lambda} + x_i\right) = 925.314; \quad \sum_{i=1}^{97}\frac{1}{\hat{\lambda} + x_i} = 0.007150; \quad \sum_{i=1}^{97}\frac{1}{\left(\hat{\lambda} + x_i\right)^2} = 5.488\times 10^{-7}$$

Show that $\hat{\alpha} = 3.4$ to the nearest 0.1. You should calculate the value to the nearest 0.01.

### Explanation

Substituting the given values gives $\hat{\alpha} = 3.3836$.

## Part d

Calculate the approximate asymptotic variance-covariance matrix for $\hat{\alpha}$ and $\hat{\lambda}$.

### Explanation

The estimated covariance matrix is found by taking second partial derivatives of the log-likelihood, multiply by -1, substitute the unknown parameters with the MLEs, and invert, as follows:

$$\frac{\partial l}{\partial \alpha} = \frac{97}{\alpha} + 100\log\lambda - \sum_{i=1}^{97}\log(\lambda + x_i) - 3\log(\lambda + M)$$

$$\frac{\partial l}{\partial \lambda} = \frac{100\alpha}{\lambda} - (\alpha + 1)\sum_{i=1}^{97}\frac{1}{(\lambda + x_i)} - \frac{3\alpha}{\lambda + M}$$

$$\frac{\partial^2 l}{\partial \alpha^2} = -\frac{97}{\alpha^2} \approx -\frac{97}{\hat{\alpha}^2} = -8.4725$$

$$\frac{\partial^2 l}{\partial \lambda^2} = -\frac{100\alpha}{\lambda^2} + (\alpha + 1)\sum_{i=1}^{97}\frac{1}{(\lambda + x_i)^2} + \frac{3\alpha}{(\lambda + M)^2} \approx -5.483\times 10^{-7}$$

$$\frac{\partial^2 l}{\partial \lambda\,\partial \alpha} = \frac{100}{\lambda} - \sum_{i=1}^{97}\frac{1}{(\lambda + x_i)} - \frac{3}{\lambda + M} \approx 0.002113$$

$$\begin{aligned}
\Rightarrow V &\approx \begin{pmatrix} 8.4725 & -0.002113 \\ -0.002113 & 5.483\times 10^{-7} \end{pmatrix}^{-1} = \begin{pmatrix} 8.4725 & -0.002113 \\ -0.002113 & 5.483\times 10^{-7} \end{pmatrix}^{-1} \\
&\approx \begin{pmatrix} 3.034 & 11{,}693 \\ 11{,}693 & 4.689\times 10^{7} \end{pmatrix}
\end{aligned}$$
