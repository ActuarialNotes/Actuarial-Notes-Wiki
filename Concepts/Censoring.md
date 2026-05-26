**Censoring** occurs when the exact value of an observation is unknown, but it is known to exceed (or fall below) a threshold. In actuarial and survival analysis, **right-censoring** is most common: a claim or lifetime is observed only up to some censoring time $c$, after which observation ends.

> **Right-censored likelihood contribution:**
> $$\text{If } X > c: \quad L_i(\theta) = P(X > c \mid \theta) = S(c \mid \theta)$$
>
> **Observed (uncensored) likelihood contribution:**
> $$\text{If } X = x \leq c: \quad L_i(\theta) = f(x \mid \theta)$$

- **Right-censoring**: true value exceeds $c$ (e.g., policy limit reached, study ends before claim settles)
- **Left-censoring**: true value is below a detection threshold
- **Interval censoring**: the value is known only to lie within an interval $(a, b)$
- Censoring must be accounted for in [[Maximum Likelihood Estimation]] to avoid **downward bias** in estimated means or survival times
- An observation that is **not** censored (the exact value is known) contributes $f(x|\theta)$ to the likelihood

> [!example]- MLE With Censored Exponential Data {Example}
> Three claims have observed values $x_1 = 2$, $x_2 = 3$, and one claim is right-censored at $c = 4$ (i.e., we know $X_3 > 4$). Assuming $X \sim \text{Exp}(\theta)$, write the likelihood.
>
> > [!answer]-
> > $$L(\theta) = f(2|\theta)\cdot f(3|\theta)\cdot S(4|\theta) = \frac{1}{\theta}e^{-2/\theta}\cdot\frac{1}{\theta}e^{-3/\theta}\cdot e^{-4/\theta} = \frac{1}{\theta^2}e^{-9/\theta}$$
> > Taking the log and differentiating: $\ell(\theta) = -2\ln\theta - 9/\theta$; $\ell'(\theta) = -2/\theta + 9/\theta^2 = 0$ gives $\hat{\theta} = 9/2 = 4.5$. Note: the censored observation still contributes information (the $e^{-4/\theta}$ term).
