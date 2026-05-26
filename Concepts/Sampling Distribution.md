A **Sampling Distribution** is the probability distribution of a statistic (e.g., the sample mean $\bar{X}$ or sample variance $S^2$) computed from all possible random samples of size $n$ drawn from a population.

> $$\bar{X} \sim N\!\left(\mu,\, \frac{\sigma^2}{n}\right) \quad \text{if } X_i \stackrel{\text{iid}}{\sim} N(\mu, \sigma^2)$$
>
> $$\frac{(n-1)S^2}{\sigma^2} \sim \chi^2_{n-1} \quad \text{(normal population)}$$

**Key sampling distributions used in hypothesis testing:**

| Statistic | Distribution | Use |
| :--- | :--- | :--- |
| $Z = \dfrac{\bar{X} - \mu}{\sigma/\sqrt{n}}$ | $N(0,1)$ | Mean test, known $\sigma$ |
| $T = \dfrac{\bar{X} - \mu}{S/\sqrt{n}}$ | $t_{n-1}$ | Mean test, unknown $\sigma$ |
| $\chi^2 = \dfrac{(n-1)S^2}{\sigma^2}$ | $\chi^2_{n-1}$ | Variance test |
| $F = \dfrac{S_1^2/\sigma_1^2}{S_2^2/\sigma_2^2}$ | $F_{n_1-1,\,n_2-1}$ | Two-variance test |

- The **standard error** is $\text{SE}(\bar{X}) = \sigma/\sqrt{n}$, the standard deviation of the sampling distribution of $\bar{X}$
- By the [[Central Limit Theorem (CLT)]], $\bar{X}$ is approximately normal for large $n$ even when the population is not normal

> [!example]- Probability That a Sample Mean Falls in a Range {Example}
> Claims $X_i$ are i.i.d. with $\mu = 2{,}000$ and $\sigma = 400$. For a random sample of $n = 64$, find $P(1{,}900 < \bar{X} < 2{,}100)$.
>
> > [!answer]-
> > $\text{SE} = 400/\sqrt{64} = 50$.
> > $$P(1{,}900 < \bar{X} < 2{,}100) = P\!\left(\frac{1{,}900-2{,}000}{50} < Z < \frac{2{,}100-2{,}000}{50}\right) = P(-2 < Z < 2) \approx 0.9545$$
