---
id: "astam-008"
exam: "Exam ASTAM"
topic: "Mean Excess Loss"
learning_objective: "Severity Models"
difficulty: medium
type: multi-part
wiki_link:
  - Concepts/Hazard+Rate
  - Concepts/Mean+Excess+Loss
  - Concepts/Tail+Weight
  - Concepts/Exponential+Distribution
  - Concepts/Generalized+Extreme+Value+Distribution
points: 4
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:21aaa6c75323b704b41c2a4dfaa35fc05a6bdbcdcf8e983bb95c4bb53cbdf03c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/questions/exam-astam/astam-008.md
---

The random variable $X$ has distribution function $F(x)$ where

$$F(x) = 1 - \exp(-2x)\left(x^2 + x + 1\right) \qquad x > 0$$

## Part a

Derive the hazard rate function for this distribution.

### Explanation

The hazard rate is $\lambda(x)$, say, where

$$\begin{aligned}
\lambda(x) &= -\frac{d}{dx}\log S(x) \\
\log S(x) &= -2x + \log\left(x^2 + x + 1\right) \\
\Rightarrow \frac{d}{dx}\log S(x) &= -2 + \frac{2x + 1}{x^2 + x + 1} \\
&= \frac{-2x^2 - 1}{x^2 + x + 1} \\
\Rightarrow \lambda(x) &= \frac{2x^2 + 1}{x^2 + x + 1}
\end{aligned}$$

## Part b

Comment on the tail behaviour of this distribution, compared with the exponential distribution with the same mean

### Explanation

The hazard rate is increasing for all $x > 1$. For the exponential distribution, the hazard rate is constant, and the MEL is flat. This indicates that the given distribution is lighter tailed than the exponential.

## Part c

Derive the mean excess loss function for this distribution.

### Explanation

$$e(d) = E\left[X - d \mid X > d\right] = \frac{1}{S(d)}\int_d^\infty S(x)\,dx$$

$$\begin{aligned}
\int_d^\infty S(x)\,dx &= \int_d^\infty e^{-2x}\left(x^2 + x + 1\right)dx \\
&= \left[-\frac{1}{2}e^{-2x}(x^2 + x + 1)\right]_d^\infty + \frac{1}{2}\int_d^\infty e^{-2x}(2x + 1)\,dx \\
&= (d^2 + d + 1)\frac{e^{-2d}}{2} + \left[-\frac{1}{4}e^{-2x}(2x + 1)\right]_d^\infty + \frac{1}{2}\int_d^\infty e^{-2x}\,dx \\
&= (d^2 + d + 1)\frac{e^{-2d}}{2} + (2d + 1)\frac{e^{-2d}}{4} + \left[-\frac{e^{-2x}}{4}\right]_d^\infty \\
&= (d^2 + d + 1)\frac{e^{-2d}}{2} + (2d + 1)\frac{e^{-2d}}{4} + \frac{e^{-2d}}{4} \\
&= \frac{e^{-2d}}{4}\left(2d^2 + 4d + 4\right) \\
&= e^{-2d}\left(\tfrac{1}{2}d^2 + d + 1\right)
\end{aligned}$$

$$\Rightarrow e(d) = \frac{e^{-2d}\left(\tfrac{1}{2}d^2 + d + 1\right)}{e^{-2d}\left(d^2 + d + 1\right)} = \frac{\tfrac{1}{2}d^2 + d + 1}{d^2 + d + 1}$$

## Part d

The distribution lies in the MDA of the GEV distribution, with parameter $\xi$. State with reasons whether $\xi$ is greater than 0, equal to 0, or less than 0.

### Explanation

As $d \to \infty$, $e(d) \to \tfrac{1}{2}$, and the gradient of the MEL function tends to 0. This indicates that the distribution is in the MDA of the Gumbel GEV distribution, which means that $\xi = 0$.
