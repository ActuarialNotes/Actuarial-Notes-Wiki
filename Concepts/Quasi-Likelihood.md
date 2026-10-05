**Quasi-Likelihood** is a way of estimating the parameters of a [[Generalized Linear Model]] when the full distribution of the response is not known or not trusted. The analyst specifies only how the mean depends on the predictors and how the variance depends on the mean, up to a constant of proportionality $\phi$. Its estimating equations are a variation on the likelihood (score) equations, hence the name.

> $$g(\mu_i) = \mathbf{x}_i^\top\boldsymbol\beta$$

> $$\text{Var}(Y_i) = \phi\,V(\mu_i)$$

> $$\hat\phi = \frac{X^2}{n-p} = \frac{1}{n-p}\sum_{i=1}^{n}\frac{(y_i - \hat\mu_i)^2}{V(\hat\mu_i)}$$

- $g$ is the [[Link Function]], $V(\mu)$ the [[Variance Function]], $\phi$ the [[Dispersion Parameter]], $X^2$ Pearson's chi-square statistic, $n$ the number of observations and $p$ the number of parameters. No [[Exponential Family]] distribution has to be assumed.
- **Why it works.** The iteratively reweighted least squares algorithm that fits a GLM uses only the mean and the variance of the observations. Applying it with just a mean–variance relationship gives the maximum quasi-likelihood estimates, which share many of the optimality properties of maximum likelihood estimates.
- **Quasi-Poisson.** For [[Poisson Regression]] with $\text{Var}(Y) = \phi\mu$, $\phi$ cancels out of the weighted least-squares step. So $\hat{\boldsymbol\beta}$ is *exactly* the Poisson estimate, and $\phi$ is estimated alongside it. Only the variances change: $\text{Var}(\hat{\boldsymbol\beta}) = \phi(X^\top W X)^{-1}$, so standard errors are multiplied by $\sqrt{\hat\phi}$.
- $\phi > 1$ is **overdispersion** (variance larger than the Poisson or binomial formula allows), and $\phi < 1$ is underdispersion, which is rare. Ignoring overdispersion understates standard errors, overstates significance and can lead to overly complex models.
- **Testing under quasi-likelihood.** Single coefficients use $t = \hat\beta/(\sqrt{\hat\phi}\,SE)$ on $n - p$ degrees of freedom. Nested models use the drop in [[Deviance]] per degree of freedom divided by $\hat\phi$, which is compared with an $F$ distribution.
- Treating a large $X^2$ as dispersion assumes the systematic part of the model is right. A large $X^2$ can also mean a missing predictor or a wrong link. The fully specified alternative is a [[Negative Binomial Distribution|negative binomial]] model.

> [!example]- Adjusting a Frequency Model's Standard Errors {Example}
> A Poisson frequency GLM fitted to $n - p = 500$ degrees of freedom gives a sprinkler-credit coefficient $\hat\beta = 0.25$ with standard error $0.08$, and Pearson $X^2 = 1{,}450$. Refit as quasi-Poisson. Is the coefficient significant at the $5\%$ level?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \hat\phi &= \frac{1{,}450}{500} = 2.90 \\[4pt]
> > SE_Q &= 0.08\sqrt{2.90} \\
> > &= 0.08(1.703) \\
> > &= 0.136
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > t &= \frac{0.25}{0.136} \\
> > &= 1.84
> > \end{align*}
> > $$
> >
> > The two-sided $5\%$ critical value of $t_{500}$ is about $1.96$, so the term is **not** significant. The unadjusted Poisson test gave $z = 0.25/0.08 = 3.13$, which only looked significant because the overdispersion was ignored. The estimate and its relativity $e^{0.25} = 1.284$ are unchanged; only the uncertainty around them has grown.

> [!example]- Drop-in-Deviance Test With Overdispersion {Example}
> In the same model, adding a 5-level territory variable lowers the residual deviance from $1{,}560$ (on $504$ df) to $1{,}520$ (on $500$ df), and $\hat\phi = 2.90$. Test whether territory belongs in the model. The $95$th percentile of $F_{4,500}$ is $2.39$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > F &= \frac{(1{,}560 - 1{,}520)/(504 - 500)}{\hat\phi} \\
> > &= \frac{40/4}{2.90} \\
> > &= 3.45
> > \end{align*}
> > $$
> >
> > $3.45 > 2.39$, so territory is significant even after allowing for overdispersion. Without the adjustment, the drop of $40$ would have been compared with $\chi^2_4$ (critical value $9.49$), which overstates the evidence by a factor of $\hat\phi$.
