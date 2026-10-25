---
id: "astam-025"
exam: "Exam ASTAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Construction and Selection of Parametric Models"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Pareto+Distribution
  - Concepts/Fisher+Information
  - Concepts/Approximate+Confidence+Interval
  - Concepts/Delta+Method
points: 0
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-25
  last_checked_by: agent:validate-v1
  content_hash: sha256:4ee14cf188e49e9d6807c2c8b3db95ddf37f339036bb37a491e6a9c39a24db55
  sources:
    - "SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q25, p.31, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf"
    - "SOA ASTAM Solutions to Sample Questions, Q25, p.47, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-025.md
---

Let $X_1, X_2, \ldots, X_n$ be a random sample from a population with Pareto distribution having unknown parameter $\alpha$ but known parameter $\theta = 100$.

## Part a

Show that the maximum likelihood estimate (MLE) of $\alpha$ can be expressed as

$$
\hat{\alpha} = \frac{n}{\sum_{i=1}^{n}\log(x_i + 100) - n\log(100)}.
$$

### Explanation

The product of the likelihood of the random sample is

$$
\prod_{i=1}^{n} f_X(x_i) = \frac{\alpha^n (100)^{n\alpha}}{\prod_{i=1}^{n}(x_i + 100)^{\alpha + 1}},
$$

so that the log-likelihood is

$$
l(\alpha) = n\log(\alpha) + n\alpha\log(100) - (\alpha + 1)\sum_{i=1}^{n}\log(x_i + 100)
$$

Taking partial derivative with respect to the unknown parameter, we get

$$
\frac{\partial l(\alpha)}{\partial \alpha} = \frac{n}{\alpha} + n\log(100) - \sum_{i=1}^{n}\log(x_i + 100)
$$

Setting this to zero and solving for $\alpha$, we get the desired mle:

$$
\hat{\alpha} = \frac{n}{\sum_{i=1}^{n}\log(x_i + 100) - n\log(100)}.
$$

## Part b

Determine the asymptotic variance of the MLE of $\alpha$.

### Explanation

Its asymptotic variance is the inverse of the information which is

$$
Var(\hat{\alpha}) = \left[-\frac{\partial l(\alpha)}{\partial \alpha}\right]^{-1} = \left[\frac{n}{\alpha^2}\right]^{-1} = \frac{\alpha^2}{n} \text{ (as printed)}.
$$

## Part c

Give a general expression for a 95% confidence interval for $\alpha$.

### Explanation

A 95% confidence interval for $\alpha$ is given by (using asymptotic results):

$$
\hat{\alpha} \pm 1.96 \cdot \sqrt{\widehat{Var}(\hat{\alpha})} = \hat{\alpha} \pm 1.96 \cdot se(\hat{\alpha}) = \hat{\alpha} \pm 1.96 \cdot \frac{\hat{\alpha}}{\sqrt{n}}
$$

## Part d

Let the mean of $X$ be $\mu$.

(i) Express the MLE of $\mu$ in terms of the MLE of $\alpha$.

(ii) Obtain its asymptotic variance.

(iii) Give a general expression for a 95% confidence interval for $\mu$.

### Explanation

The mean is $\frac{100}{\alpha - 1} = g(\alpha)$ so that the mle of this mean is $g(\hat{\alpha}) = \frac{100}{\hat{\alpha} - 1}$.

Using Delta method, we get $\frac{dg(\alpha)}{d\alpha} = \frac{-100}{(\alpha - 1)^2}$ and we obtain its asymptotic variance as

$$
Var(g(\hat{\alpha})) = Var(\hat{\alpha})\left(\frac{dg(\alpha)}{d\alpha}\right)^2 = \frac{1}{n}\left(\frac{100\hat{\alpha}}{\hat{\alpha} - 1}\right)^2 \text{ (as printed)}.
$$

Therefore, a 95% confidence interval for the mean $\mu$ is given by

$$
\begin{align*}
g(\hat{\alpha}) \pm 1.96 \cdot \sqrt{\widehat{Var}(g(\hat{\alpha}))} &= g(\hat{\alpha}) \pm 1.96 \cdot se(g(\hat{\alpha})) \\
&= \frac{100}{\hat{\alpha} - 1} \pm 1.96 \cdot \frac{1}{\sqrt{n}}\left(\frac{100\hat{\alpha}}{\hat{\alpha} - 1}\right) \text{ (as printed)}
\end{align*}
$$

> [!note] Editor's note
> The SOA's variance drops the square on $(\hat{\alpha} - 1)$: squaring $\frac{dg}{d\alpha} = \frac{-100}{(\alpha - 1)^2}$ gives $Var(g(\hat{\alpha})) = \frac{\hat{\alpha}^2}{n} \cdot \frac{100^2}{(\hat{\alpha} - 1)^4} = \frac{1}{n}\left(\frac{100\hat{\alpha}}{(\hat{\alpha} - 1)^2}\right)^2$. The 95% confidence interval for $\mu$ is therefore $\frac{100}{\hat{\alpha} - 1} \pm 1.96 \cdot \frac{1}{\sqrt{n}}\left(\frac{100\hat{\alpha}}{(\hat{\alpha} - 1)^2}\right)$; the printed variance and interval are out by a factor of $(\hat{\alpha} - 1)$ in the standard error.
