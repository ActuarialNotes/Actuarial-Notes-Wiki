---
id: "masi-an-063"
exam: "Exam MAS-I"
topic: "Cramér-Rao Lower Bound"
learning_objective: "Statistics"
difficulty: medium
type: free-entry
bloom: apply
wiki_link:
  - Concepts/Cramér-Rao+Lower+Bound
  - Concepts/Fisher+Information
  - Concepts/Gamma
  - Concepts/Unbiasedness
answer: "19200"
points: 1
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9618c9270501bf744e2b241602fcb4935d0af8d1f31d04fd78f6a10329201bbd
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-mas-i/masi-an-063.md
---

Claim sizes follow a gamma distribution with known shape $\alpha = 3$ and unknown scale $\theta$:

$$
f(x) = \frac{x^{\alpha - 1} e^{-x/\theta}}{\Gamma(\alpha)\,\theta^{\alpha}}, \quad x > 0
$$

A random sample of 25 claims will be used to estimate the mean claim size, $\alpha\theta = 3\theta$.

Calculate the Cramér–Rao lower bound for the variance of an unbiased estimator of the mean claim size, evaluated at $\theta = 400$. Give your answer as a whole number.

## Explanation

The Fisher information in one observation, from the second derivative of the log-density in $\theta$:

$$
\begin{align*}
\ln f(x) &= (\alpha - 1)\ln x - \frac{x}{\theta} - \ln\Gamma(\alpha) - \alpha\ln\theta \\
\frac{\partial^2}{\partial\theta^2}\ln f(x) &= -\frac{2x}{\theta^3} + \frac{\alpha}{\theta^2} \\
I(\theta) &= \frac{2\alpha\theta}{\theta^3} - \frac{\alpha}{\theta^2} \\
&= \frac{\alpha}{\theta^2}
\end{align*}
$$

The target is $g(\theta) = \alpha\theta$, so $g'(\theta) = \alpha$, and

$$
\begin{align*}
\text{Var}(T) &\ge \frac{[g'(\theta)]^2}{n\,I(\theta)} \\
&= \frac{\alpha^2}{n\alpha/\theta^2} \\
&= \frac{\alpha\theta^2}{n} \\
&= \frac{3 \times 400^2}{25} \\
&= 19{,}200
\end{align*}
$$

The bound is **19200**. The sample mean is unbiased for $\alpha\theta$ with variance $\alpha\theta^2/n$, so it attains the bound.

**Common wrong entries**

- **2133.33** — $\theta^2/(n\alpha)$, the bound for estimating $\theta$ itself: the factor $[g'(\theta)]^2 = \alpha^2$ for a function of the parameter was left out.
- **57600** — $\alpha^2\theta^2/n$: the $g'$ factor included but the information taken as $\theta^{-2}$, the exponential's, ignoring the shape.
- **480000** — $\alpha\theta^2$, the bound for a single observation: the information of the sample is $n I(\theta)$, not $I(\theta)$.
