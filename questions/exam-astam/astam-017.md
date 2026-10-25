---
id: "astam-017"
exam: "Exam ASTAM"
topic: "Maximum Likelihood Estimation"
learning_objective: "Construction and Selection of Parametric Models"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Maximum+Likelihood+Estimation
  - Concepts/Truncation
  - Concepts/Censoring
  - Concepts/Cramér-Rao+Lower+Bound
  - Concepts/Delta+Method
  - Concepts/Policy+Limit
points: 0
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-25
  last_checked_by: agent:validate-v1
  content_hash: sha256:f12850043cd742ac5cec8af76d86dc7d6b3d9e98f8385b72394ff0f2dc44c4d5
  sources:
    - "SOA ASTAM Sample Questions (version of Feb. 23, 2026), Q17, p.22, sha256:0294cf4e8717191cda2747e7a6bb49fbb5e2d08f2d281ec979e670621de74ab4 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/questions/february-2024-astam-questions.pdf"
    - "SOA ASTAM Solutions to Sample Questions, Q17, p.33, sha256:c4206394603cf205da0668d40333bee5aaa6e3dadcaa241fdb03e5488a1ba4e1 — https://www.soa.org/globalassets/assets/files/edu/2024/spring/solutions/february-2024-astam-solutions.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-017.md
---

You are given the following data from a sample of 6 claims. The ground up loss for the risk is assumed to be exponential with mean $\theta$.

| Loss Amount | Modification |
|---|---|
| 120 | None |
| 640 | None |
| 700 | None |
| 820 | \$100 deductible |
| 1220 | \$100 deductible |
| 1500 | Censored at \$1500 |

## Part a

Write down the likelihood function for this sample and simplify as far as possible.

### Explanation

$$
\begin{align*}
L(\theta) &= f(120)\,f(640)\,f(700)\,\frac{f(820)}{S(100)}\,\frac{f(1220)}{S(100)}\,S(1500) \\
&= \left(\frac{e^{-120/\theta}}{\theta}\right)\left(\frac{e^{-640/\theta}}{\theta}\right)\left(\frac{e^{-700/\theta}}{\theta}\right)\left(\frac{e^{-820/\theta}}{\theta e^{-100/\theta}}\right)\left(\frac{e^{-1220/\theta}}{\theta e^{-100/\theta}}\right)e^{-1500/\theta} \\
&= \theta^{-5}\,e^{-4800/\theta}
\end{align*}
$$

## Part b

Show that the Maximum Likelihood Estimate of the parameter $\theta$ is $\hat{\theta} = 960$.

### Explanation

$$
\begin{align*}
l(\theta) &= \log L(\theta) \\
          &= -5\log\theta - \frac{4800}{\theta} \\
\frac{dl}{d\theta} &= -\frac{5}{\theta} + \frac{4800}{\theta^2} \\
\Rightarrow \hat{\theta} &= \frac{4800}{5} \\
                   &= 960
\end{align*}
$$

## Part c

Estimate the standard deviation of $\hat{\theta}$ using Cramer-Rao lower bound.

### Explanation

$$
V[\hat{\theta}] \approx -\left(\frac{d^2 l}{d\theta^2}\right)^{-1}_{\theta=\hat{\theta}}
$$

$$
\begin{align*}
\frac{d^2 l}{d\theta^2} &= \frac{5}{\theta^2} - \frac{9600}{\theta^3} \\
\Rightarrow V[\hat{\theta}] &\approx \frac{\hat{\theta}^3}{9600 - 5\hat{\theta}} \\
                        &= 184{,}320 \\
SD[\hat{\theta}] &\approx 429.3
\end{align*}
$$

## Part d

Let $Y$ be the random variable representing the insured loss amount per claim with a limit of \$1000 and no deductible. Use your fitted model to estimate $E[Y]$.

### Explanation

$Y = \max(X, 1000)$ (as printed)

$$
\begin{align*}
E[Y] &= \theta\left(1 - e^{-1000/\theta}\right) \quad \text{from the formula sheet} \\
&\approx 960(0.64713) \\
     &= 621.25
\end{align*}
$$

## Part e

Using the delta method, construct an approximate 80% confidence (as printed) for $E[Y]$.

### Explanation

$$
g(\theta) = \theta\left(1 - e^{-1000/\theta}\right) \;\Rightarrow\; g(\hat{\theta}) = 621.25
$$

$$
V\left[g(\hat{\theta})\right] \approx \left(g'(\hat{\theta})\right)^2 V\left[\hat{\theta}\right] \quad \text{by the delta method}
$$

$$
\begin{align*}
g'(\theta) &= 1 - e^{-1000/\theta} + \frac{1000}{\theta}e^{-1000/\theta} \text{ (as printed)} \\
\Rightarrow g'(\hat{\theta}) &= 1.0147 \\
\Rightarrow V\left[g(\hat{\theta})\right] &\approx 1.0147^2(184{,}320) \\
           &= 189{,}780 \\
           &= 435.6^2
\end{align*}
$$

80% CI is approximately $621.25 \pm 1.28(435.6) = (62.96, 1179.54)$

> [!note] Editor's note
> The SOA's $g'(\theta)$ has $+$ where it should have $-$: differentiating $\theta\left(1 - e^{-1000/\theta}\right)$ gives $g'(\theta) = 1 - e^{-1000/\theta} - \frac{1000}{\theta}e^{-1000/\theta}$, so $g'(960) = 0.2796$, not 1.0147. Then $V\left[g(\hat{\theta})\right] \approx 0.2796^2(184{,}320) = 14{,}406 = 120.0^2$, and the 80% interval is $621.25 \pm 1.2816(120.0) \approx (467.4, 775.1)$, not $(62.96, 1179.54)$.
