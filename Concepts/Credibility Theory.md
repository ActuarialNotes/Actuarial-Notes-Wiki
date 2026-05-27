**Credibility Theory** provides the framework for weighting observed experience data against prior or external expectations, balancing the statistical reliability of an individual group's data with the stability of broader pooled data.

- **Classical (limited fluctuation) credibility** assigns full credibility ($Z = 1$) when a dataset meets a minimum size standard; below that threshold, the square-root rule $Z = \sqrt{n / n_0}$ applies
- **Bühlmann (greatest accuracy) credibility** derives $Z$ from the ratio of between-group variance to total variance — see [[Bühlmann Credibility]] for the full model; it minimizes mean squared error rather than satisfying a probability bound
- Both models produce: $\text{Estimate} = Z \times \text{Observed} + (1-Z) \times \text{Expected}$, where the complement may be a class mean, industry data, or manual rate

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
