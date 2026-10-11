---
id: "cas7-an-004"
exam: "Exam 7"
topic: "Moment"
learning_objective: "Estimation of Claims Liabilities"
difficulty: medium
type: multiple-choice
bloom: apply
wiki_link:
  - Concepts/Moment
  - Concepts/Lognormal+Distribution
  - Concepts/Percentile
  - Concepts/Unpaid+Claim+Distribution
answer: "C"
points: 1
---

A chain ladder analysis of a liability book gives a reserve estimate of $R = 4{,}000$ with a standard error of 2,600. Because the standard error is more than half the reserve, the actuary follows Mack (1994) and approximates the reserve distribution by a lognormal distribution whose mean and variance equal the reserve estimate and the square of its standard error.

Using $z = -1.28$ for the 10th percentile of the standard normal distribution, calculate the 10th percentile of the reserve under this lognormal approximation.

- A) Less than 1,000
- B) At least 1,000, but less than 1,500
- C) At least 1,500, but less than 1,700
- D) At least 1,700, but less than 2,000
- E) At least 2,000

## Explanation

Matching the first two moments of the lognormal to the reserve estimate and its standard error,

$$
e^{\mu + \sigma^2/2} = R, \qquad e^{2\mu + \sigma^2}\left(e^{\sigma^2} - 1\right) = \text{s.e.}(R)^2
$$

gives

$$
\begin{align*}
\sigma^2 &= \ln\!\left(1 + \frac{\text{s.e.}(R)^2}{R^2}\right) \\
&= \ln\!\left(1 + 0.65^2\right) \\
&= 0.35242 \\
\sigma &= 0.59365 \\
\mu &= \ln R - \frac{\sigma^2}{2} \\
&= 8.29405 - 0.17621 \\
&= 8.11784
\end{align*}
$$

The 10th percentile is

$$
\begin{align*}
x_{0.10} &= e^{\mu - 1.28\sigma} \\
&= e^{8.11784 - 0.75987} \\
&= \mathbf{1{,}569}
\end{align*}
$$

The answer is **C**.

**Why not the others**

- **A** — the normal approximation gives 4,000 − 1.28 × 2,600 = 672. Mack's point is that the symmetric normal is a poor fit when the standard error exceeds half the reserve: its interval of $R \pm 2\,\text{s.e.}(R)$ then has a negative lower limit, although a negative reserve is not possible.
- **B** — taking $\sigma$ equal to the coefficient of variation (0.65) and $\sigma^2 = 0.65^2$ gives 1,409. The variance of the log is $\ln(1 + \text{CV}^2)$, not $\text{CV}^2$.
- **D** — setting $\mu = \ln R$ gives 1,871. That makes $R$ the *median* of the lognormal; the moment match puts the mean at $R$, which needs $\mu = \ln R - \sigma^2/2$.
- **E** — adding $\sigma^2/2$ to $\ln R$ instead of subtracting it gives 2,231.
