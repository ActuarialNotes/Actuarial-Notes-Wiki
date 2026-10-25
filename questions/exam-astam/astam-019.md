---
id: "astam-019"
exam: "Exam ASTAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Construction and Selection of Parametric Models"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Lognormal+Distribution
  - Concepts/Fisher+Information
  - Concepts/Delta+Method
  - Concepts/Variance
points: 0
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-25
  last_checked_by: agent:validate-v1
  content_hash: sha256:4cc1f144c2af2939a7de1d09473d1d8b479a9f61a8d54f0edbee9ef5a81e5e1b
  sources:
    - "SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q19, p.24, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf"
    - "SOA ASTAM Solutions to Sample Questions, Q19, pp.35-36, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-019.md
---

You are fitting a lognormal distribution to a sample of size (as printed) with complete individual data.

## Part a

Show that $\hat{\mu} = \frac{1}{n}\sum_{j=1}^{n} ln(x_j)$

### Explanation

$$
l(\mu, \sigma) = -\sum_{i=1}^{n} ln(x_j) - n\,ln\,\sigma - n\,ln\sqrt{2\pi} - \sum_{i=1}^{n}\frac{\left(ln(x_j) - \mu\right)^2}{2\sigma^2}
$$

$$
\begin{align*}
\frac{\partial l}{\partial \mu} &= -\frac{-2}{2\sigma^2}\sum_{i=1}^{n}\left[ln(x_j) - \mu\right] \\
&= \frac{1}{\sigma^2}\left[\sum_{j=1}^{n} ln(x_j) - n\mu\right] = 0 \;\therefore\; \hat{\mu} = \frac{1}{n}\sum_{j=1}^{n} ln(x_j)
\end{align*}
$$

## Part b

Show that $\hat{\sigma}^2 = \frac{1}{n}\sum_{j=1}^{n}\left(ln(x_j) - \mu\right)^2$

### Explanation

$$
\begin{align*}
\frac{\partial l}{\partial \sigma} &= -\frac{n}{\sigma} + \frac{2}{2}\sigma^{-3}\sum_{i=1}^{n}\left(ln(x_j) - \mu\right)^2 \\
                                   &= 0 \\
\therefore\; n\sigma^2 &= \sum_{i=1}^{n}\left(ln(x_j) - \mu\right)^2
\end{align*}
$$

## Part c

Show that the estimate of the Covariance matrix of the lognormal parameters is

$$
\widehat{Cov}(\hat{\mu}, \hat{\sigma}) = \begin{vmatrix} \frac{\hat{\sigma}^2}{n} & 0 \\ 0 & \frac{\hat{\sigma}^2}{2n} \end{vmatrix}
$$

### Explanation

$$
\frac{\partial^2 l}{\partial \mu^2} = \frac{-n}{\sigma^2}
$$

$$
\frac{\partial^2 l}{\partial \mu\,\partial \sigma} = \frac{-2}{\sigma^3}\left[\sum_{j=1}^{n} ln(x_j) - n\mu\right] = 0
$$

$$
\begin{align*}
\frac{\partial^2 l}{\partial \sigma^2} &= n\sigma^{-2} - 3\sigma^{-4}\sum_{i=1}^{n}\left(ln(x_j) - \mu\right)^2 \\
&= n\sigma^{-2} - 3\sigma^{-4}(n\sigma^2) \\
&= -2n\sigma^{-2}
\end{align*}
$$

$$
COV(\mu, \sigma) = -\begin{vmatrix} \frac{\partial^2 l}{\partial \mu^2} & \frac{\partial^2 l}{\partial \mu\,\partial \sigma} \\ \frac{\partial^2 l}{\partial \mu\,\partial \sigma} & \frac{\partial^2 l}{\partial \sigma^2} \end{vmatrix}^{-1} = -\begin{vmatrix} \frac{-n}{\sigma^2} & 0 \\ 0 & \frac{-2n}{\sigma^2} \end{vmatrix}^{-1} = \begin{vmatrix} \frac{\sigma^2}{n} & 0 \\ 0 & \frac{\sigma^2}{2n} \end{vmatrix}
$$

## Part d

Use the delta method to estimate the variance of mean of the population based on the lognormal model. State your answer in terms of the parameter estimates $\hat{\mu}$ and $\hat{\sigma}$.

### Explanation

$$
g = exp\left[\mu + \frac{\sigma^2}{2}\right]
$$

$$
\partial g = \begin{bmatrix} \frac{\partial g}{\partial \mu} \\ \frac{\partial g}{\partial \sigma} \end{bmatrix} = \begin{bmatrix} exp\left[\mu + \frac{\sigma^2}{2}\right] \\ \sigma\, exp\left[\mu + \frac{\sigma^2}{2}\right] \end{bmatrix}
$$

$$
\begin{align*}
\widehat{Var(g)} &= \begin{vmatrix} exp\left[\mu + \frac{\sigma^2}{2}\right] & \sigma\, exp\left[\mu + \frac{\sigma^2}{2}\right] \end{vmatrix} \begin{vmatrix} \frac{\sigma^2}{n} & 0 \\ 0 & \frac{\sigma^2}{2n} \end{vmatrix} \begin{vmatrix} exp\left[\mu + \frac{\sigma^2}{2}\right] \\ \sigma\, exp\left[\mu + \frac{\sigma^2}{2}\right] \end{vmatrix} \\
&= \frac{\sigma^2 exp[2\mu + \sigma^2]}{n} + \frac{\sigma^4 exp[2\mu + \sigma^2]}{2n}
\end{align*}
$$
