**Truncation** occurs when observations below (or above) a threshold are **not recorded at all** — unlike [[Censoring]], which records that an unobserved value exists. In insurance, **left-truncation** arises with deductibles: only losses exceeding the deductible $d$ are reported.

> **Left-truncated likelihood contribution** (only losses $X > d$ are observed):
> $$L_i(\theta) = \frac{f(x \mid \theta)}{S(d \mid \theta)} = \frac{f(x \mid \theta)}{P(X > d \mid \theta)}, \quad x > d$$

- Under left-truncation at $d$, the effective distribution is the **conditional** distribution $X \mid X > d$
- Failing to adjust for truncation leads to **upward bias** in estimated means (only the larger claims are seen)
- **Right-truncation**: only values below some upper limit are recorded (less common in insurance)
- Truncation differs from censoring: with truncation, you do not even know an observation exists; with censoring, you know there is an observation but not its exact value

> [!example]- MLE With Left-Truncated Exponential Data {Example}
> Claims above a deductible $d = 1$ are reported. Two reported claims are $x_1 = 2$ and $x_2 = 3$. Assume $X \sim \text{Exp}(\theta)$. Write and maximize the likelihood.
>
> > [!answer]-
> > $S(1|\theta) = e^{-1/\theta}$, so each claim contributes $f(x|\theta)/S(1|\theta) = \frac{1}{\theta}e^{-x/\theta}/e^{-1/\theta} = \frac{1}{\theta}e^{-(x-1)/\theta}$.
> > $$L(\theta) = \frac{1}{\theta}e^{-(2-1)/\theta}\cdot\frac{1}{\theta}e^{-(3-1)/\theta} = \frac{1}{\theta^2}e^{-3/\theta}$$
> > Solving $\ell'(\theta) = -2/\theta + 3/\theta^2 = 0$ gives $\hat{\theta} = 3/2 = 1.5$. This equals $\bar{x} - d = 2.5 - 1 = 1.5$, the sample mean of **excess losses**.
