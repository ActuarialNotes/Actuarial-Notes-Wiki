---
id: "astam-010"
exam: "Exam ASTAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Construction and Selection of Parametric Models"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Fisher+Information
  - Concepts/Chi-Squared+Distribution
  - Concepts/Approximate+Confidence+Interval
  - Concepts/Estimator
points: 5
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-23
  last_checked_by: agent:validate-v1
  content_hash: sha256:7fcf8e93c7b2d4045763cad423e4fdf021cd2837b25edec3a4e0ce7b8258abb5
  sources:
    - "SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q10, p.15, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf"
    - "SOA ASTAM Solutions to Sample Questions, Q10, pp.21-22, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-010.md
---

For a portfolio of short-term insurance contracts, claim amounts are modeled with a density function

$$f(x; \lambda) = \lambda^2 x e^{-\lambda x} \qquad x > 0,\ \lambda > 0$$

A random sample of $n$ claim amounts, $x_1, x_2, \cdots, x_n$, is used to estimate the parameter $\lambda$.

## Part a

Derive and simplify as far as possible a formula for the maximum likelihood estimate of $\lambda$.

### Explanation
$$
\begin{align*}
L(\lambda) &= \prod_{i=1}^{n} \lambda^2 x_i e^{-\lambda x_i} \Rightarrow \log L(\lambda) = 2n \log \lambda - \lambda \sum_{i=1}^{n} x_i + \sum_{i=1}^{n} \log x_i \\
\Rightarrow \frac{\partial \log L(\lambda)}{\partial \lambda} &= \frac{2n}{\lambda} - \sum_{i=1}^{n} x_i.
\end{align*}
$$

Set equal to zero for $\hat{\lambda} = \dfrac{2}{\bar{x}}$

## Part b

Use the moment generating function to show that $Y = 2n\lambda\bar{X}$ has a chi-square distribution and state the degrees of freedom.

### Explanation
$$M_Y(t) = E\left[e^{2\lambda n \bar{X} t}\right] = E\left[e^{2\lambda t \sum_{i=1}^{n} X_i}\right] = \left(E\left[e^{2\lambda X t}\right]\right)^n$$

as the $X_i$ are i.i.d.

$$
\begin{align*}
E\left[e^{2\lambda X t}\right] &= \int_0^\infty e^{2\lambda x t} \lambda^2 x e^{-\lambda x}\, dx \\
                               &= \int_0^\infty e^{-\lambda x(1-2t)} \lambda^2 x e^{-\lambda x}\, dx \text{ (as printed)} \\
&= \frac{\lambda^2}{\left(\lambda(1-2t)\right)^2} \int_0^\infty e^{-\lambda x(1-2t)} \left(\lambda(1-2t)\right)^2 x e^{-\lambda x}\, dx
\end{align*}
$$

If $(1-2t) > 0$, the integrand is the pdf of the original distribution, with a new $\lambda$ parameter, so the integral is equal to 1, giving

$$E\left[e^{2\lambda X t}\right] = (1-2t)^{-2} \Rightarrow E\left[e^{2\lambda n \bar{X} t}\right] = (1-2t)^{-2n}$$

Which is the MGF of the chi-square distribution, with $\nu = 4n$ degrees of freedom.

## Part c

Determine the Fisher information function, $I(\lambda)$ and use it to derive a formula for the asymptotic variance of $\hat{\lambda}$.

### Explanation
The Information function is $-E\left[\dfrac{\partial^2 \log L}{\partial \lambda^2}\right] = -E\left(-\dfrac{2n}{\lambda^2}\right) = \dfrac{2n}{\lambda^2}$.

The asymptotic variance of $\hat{\lambda}$ is $\left(-E\left[\dfrac{\partial^2 \log L}{\partial \lambda^2}\right]\right)^{-1} = \dfrac{\lambda^2}{2n}$.

## Part d

A random sample of 10 claim amounts resulted in a sample mean of $\bar{x} = 358$.

- (i) Use the results in (b) to calculate an exact 95% confidence interval of $\lambda$.
- (ii) Use the results in (c) to calculate an approximate (asymptotic) 95% confidence interval of $\lambda$.

### Explanation
(i) A 95% confidence interval for $Y$ is $\left(Q_{0.025}(Y), Q_{0.975}(Y)\right)$, where $Q_\alpha$ is the $\alpha$-quantile of the chi-square distribution with $4n = 40$ degrees of freedom.

Using CHISQ.INV in Excel, we find the CI for $Y = 2n\lambda\bar{X}$ is $(24.43, 59.34)$. Divide by $2n\bar{x}$ gives a 95% confidence interval for $\hat{\lambda}$ of $(0.00341, 0.00829)$

(ii) The MLE is asymptotically normally distributed. We have $\hat{\lambda} = \dfrac{2}{\bar{x}} = 0.005587.$ The variance is approximately $\dfrac{\hat{\lambda}^2}{2n} = 1.5605 \times 10^{-6} = 0.00125^2$. So the approximate 95% CI is

$$0.005587 \pm 1.96 \times 0.00125 = (0.00314, 0.00804).$$

## Part e

Comment briefly on the comparison of these confidence intervals.

### Explanation
The confidence intervals are quite close. The MLE CI is an asymptotic result, and we would expect less accuracy applying this to a sample of only 10 values. The chi-square confidence interval is an exact interval for $Y$, based on the actual sample size rather than on asymptotic results, so we would expect it to be more accurate.
