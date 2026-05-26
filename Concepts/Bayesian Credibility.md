**Bayesian Credibility** applies [[Bayes Theorem|Bayesian inference]] to credibility: the prior distribution of the risk parameter $\theta$ is updated with observed data to produce a posterior distribution, and the credibility estimate is the **posterior mean** $E[\theta \mid \mathbf{X}]$.

> $$\text{Credibility Estimate} = E[\theta \mid X_1, \ldots, X_n]$$
>
> $$\pi(\theta \mid \mathbf{X}) \propto L(\mathbf{X} \mid \theta) \cdot \pi(\theta)$$

- When the prior and likelihood form a **conjugate pair**, the posterior mean is a linear credibility formula of the form $Z\bar{X} + (1-Z)\mu_0$
- In this case, **Bayesian credibility = [[Bühlmann Credibility]]** (Bayesian is optimal; Bühlmann is the best linear approximation, and they agree for conjugate priors)

**Common conjugate pairs:**

| Likelihood | Prior | Posterior |
| :--- | :--- | :--- |
| Poisson$(\theta)$ | Gamma$(\alpha, \beta)$ | Gamma$(\alpha + \sum x_i,\, \beta + n)$ |
| Binomial$(m, \theta)$ | Beta$(\alpha, \beta)$ | Beta$(\alpha + \sum x_i,\, \beta + mn - \sum x_i)$ |
| Normal$(\theta, \sigma^2)$ | Normal$(\mu_0, \tau^2)$ | Normal (linear combination) |

> [!example]- Bayesian Update for Poisson Claim Frequency {Example}
> A policyholder's annual claim count $N \sim \text{Poi}(\theta)$. The prior for $\theta$ is Gamma$(2, 0.5)$ (mean $= 2 \times 0.5 = 1$). In 3 years, the policyholder had 0, 2, and 1 claims. Find the posterior mean.
>
> > [!answer]-
> > $\sum x_i = 3$, $n = 3$. Posterior is Gamma$(2 + 3,\; 0.5 + 3) = \text{Gamma}(5, 3.5)$.
> > Posterior mean $= 5/3.5 \approx 1.43$ claims per year.
> > This is a weighted blend: prior mean $= 1$ and sample mean $= 1$, updated toward the data (both happen to be 1 here; the posterior mean = $Z \cdot \bar{X} + (1-Z)\mu_0$ with $Z = 3/(3 + 2) = 0.6$, giving $0.6(1) + 0.4(1) = 1$).
