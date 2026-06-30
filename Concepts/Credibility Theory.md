**Credibility Theory** provides the framework for weighting observed experience data against prior or external expectations, balancing the statistical reliability of an individual group's data with the stability of broader pooled data.

> $$\text{Estimate} = Z \cdot \bar{X} + (1 - Z)\cdot \mu_0$$

- $Z \in [0, 1]$ is the **credibility factor**, $\bar{X}$ is the observed experience, and $\mu_0$ is the **complement of credibility** (a class mean, industry data, or manual rate)
- **Classical ([[Limited Fluctuation Credibility|limited fluctuation]]) credibility** assigns full credibility ($Z = 1$) when a dataset meets a minimum size standard; below that threshold, the square-root rule $Z = \sqrt{n / n_0}$ applies
- **[[Bühlmann Credibility|Bühlmann]] (greatest accuracy) credibility** derives $Z$ from the ratio of between-group variance to total variance; it minimizes mean squared error rather than satisfying a probability bound
- **[[Bayesian Credibility|Bayesian]]** credibility takes the estimate to be the posterior mean $E[\theta \mid \mathbf{X}]$, and equals Bühlmann exactly for conjugate priors

> [!example]- Classical vs. Bühlmann Credibility {Example}
> A rating class has $n = 300$ claims. The full-credibility standard for frequency is $n_0 = 1{,}082$ claims.
>
> > [!answer]-
> > **Classical:** $Z = \sqrt{300 / 1{,}082} = \sqrt{0.277} = 0.527$
> >
> > **Bühlmann** (if between-group variance $v = 0.10$, process variance $\sigma^2 = 0.20$):
> > $$Z = \frac{v}{v + \sigma^2/n} = \frac{0.10}{0.10 + 0.20/300} = \frac{0.10}{0.1007} \approx 0.993$$
> >
> > The two methods yield very different credibilities because Bühlmann accounts for variance structure; classical only uses count relative to the full-credibility threshold.
