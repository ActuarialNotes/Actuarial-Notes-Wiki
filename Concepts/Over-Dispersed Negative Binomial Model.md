---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:14b21528449c5c81bd45979e3947b5dd7fcefde6ed8ee810122199c1f483ede2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Over-Dispersed Negative Binomial Model.md
---

The **Over-Dispersed Negative Binomial Model** (ODNB) is Verrall's (2000) recursive form of the stochastic [[Chain Ladder Method|chain ladder]], which models each incremental loss given the cumulative loss to date. It gives the same predictive distribution as the [[Over-Dispersed Poisson Model|over-dispersed Poisson]] model, but it is written in terms of the development factors, which is what lets [[Obtaining Predictive Distributions for Reserves Which Incorporate Expert Opinion (Verrall - 2007)|Verrall (2007)]] put expert-opinion priors directly on the factors.

The mean of the incremental loss $C_{ij}$ of accident year $i$ in development year $j$, given its previous cumulative loss $D_{i,j-1}$, is

> $$E[C_{ij} \mid D_{i,j-1}] = (\lambda_j - 1)\,D_{i,j-1}$$

- $\lambda_j$ is the development factor into year $j$.

Its variance is

> $$\mathrm{Var}[C_{ij} \mid D_{i,j-1}] = \phi\,\lambda_j(\lambda_j - 1)\,D_{i,j-1}$$

- $\phi$ is the over-dispersion parameter.

The mean is the chain ladder's own projection, and the variance is proportional to it. Adding $D_{i,j-1}$ gives the cumulative form: $D_{ij}$ has mean $\lambda_j D_{i,j-1}$ and the same variance. Written that way, the connection with the chain ladder is immediately apparent from the mean. "Over-dispersed" again means $Y = \phi X$ for a negative binomial $X$, with a quasi-likelihood so that losses need not be integers.

> [!example]- What are the mean, variance and CoV of the next incremental loss? {Example}
> An accident year has cumulative losses $D_{i,2} = 4{,}000$ ($\$000$s). The next factor is $\lambda_3 = 1.25$ and $\phi = 60$.
>
> > [!answer]-
> > - The mean is $E[C_{i3}] = (1.25 - 1) \times 4{,}000 = 1{,}000$.
> > - The variance is $60 \times 1.25 \times 0.25 \times 4{,}000 = 75{,}000$, a standard deviation of 273.9.
> > - The CoV is $273.9/1{,}000 = 27.4\%$.
> > - $D_{i3}$ has mean $1.25 \times 4{,}000 = 5{,}000$ and the same variance, since $D_{i2}$ is given.

## Relation to the ODP and normal models

The reserve estimates equal the chain ladder's, and the predictive distribution is exactly that of the ODP model, whether it is written for incremental or cumulative losses. The same positivity constraint applies: every column sum must be positive, because $\lambda_j < 1$ would make the variance negative. For that case Verrall notes a model close to [[Mack Chain Ladder Model|Mack's]] that keeps the mean but uses a normal distribution with variance $\phi_j D_{i,j-1}$, at the cost of another set of variance parameters.

> [!example]- What goes wrong in the example above if $\lambda_3 = 0.98$? {Example}
> - The variance would be $60 \times 0.98 \times (-0.02) \times 4{,}000 = -4{,}704$, which is impossible.
> - A column of negative development cannot be modeled this way.
> - The normal version keeps the mean, $-80$, and uses $\phi_3 D_{i2}$.
> - To match the example's variance at $\lambda_3 = 1.25$ it would need $\phi_3 = 60 \times 1.25 \times 0.25 = 18.75$.

## Priors on the development factors

In Verrall's Section 4, after Verrall and England (2005), each row gets its own factor $\lambda_{i,j}$ with a prior distribution:

1. *Reproduce the chain ladder.* Set $\lambda_{i,j} = \lambda_j$ within each column and give the $\lambda_j$ vague priors. This yields prediction errors and a [[Predictive Distribution|predictive distribution]] for the chain ladder itself.
2. *Intervene in some rows.* If a change in settlement makes an older factor wrong for recent rows, those rows share a separate factor. Its prior mean is the expert's factor, and its variance $W$ is set to reflect the strength of the opinion.
3. *Use only recent years.* Give the most recent rows factors $\lambda_j$ and the earlier rows factors $\lambda^*_j$, both with large-variance priors. That is a stochastic version of a latest-years volume-weighted average.

Changing a factor by hand abandons the stochastic model's estimates, and it is not clear what estimation error an inserted parameter should carry. A [[Bayesian|Bayesian]] prior answers both, and [[Markov Chain Monte Carlo|MCMC]] simulation in winBUGS produces the posterior. The prior's form (gamma, lognormal) is chosen so the numerical procedures work well. The same recursive form, running down the rows instead of across the columns, carries the [[Bayesian Bornhuetter-Ferguson Model|Bayesian Bornhuetter-Ferguson]] model.

> [!example]- What gamma prior on $\lambda - 1$ gives the factor a mean of 1.5 and a standard deviation of 0.1? {Example}
> - For $\lambda - 1$ the mean is 0.5 and the standard deviation 0.1.
> - The shape is $(0.5/0.1)^2 = 25$ and the rate is $0.5/0.1^2 = 50$, the `dgamma(25, 50)` of Verrall's winBUGS program.
> - The alternative $\mathrm{Gamma}(0.005, 0.01)$ has the same mean, $0.005/0.01 = 0.5$, but a standard deviation of $\sqrt{0.005}/0.01 = 7.07$.
> - That prior is effectively no opinion, so the data decide.

> [!example]- How does the prior on the second factor change accident year 9's reserve? {Example}
> In Verrall's Taylor and Ashe illustration, information implies that the second development factor, from column 2 to column 3, should be 1.5 for rows 7 to 10. The chain ladder estimate is 1.7473. The fitted factor for rows 7 to 10 is 1.971 under a vague prior and 1.673 under a prior with standard deviation 0.1. Accident year 9 has cumulative losses of 1,363,294 at development year 2, and its later factors multiply to 2.36877.
>
> > [!answer]-
> > - The reserve is approximately $1{,}363{,}294 \times (\lambda \times 2.36877 - 1)$.
> >
> > | Second factor | Reserve | Verrall's reserve |
> > | :--- | ---: | ---: |
> > | 1.7473 (chain ladder) | 4,279,314 | 4,278,972 (Table 2) |
> > | 1.971 (vague prior) | 5,001,715 | 4,998,000 (Table 6) |
> > | 1.673 (prior sd 0.1) | 4,039,375 | 4,044,000 (Table 6) |
> >
> > - Left to their own data, rows 7 and 8, whose individual factors are 1.878 and 2.016, pull the separate factor up to 1.971, and the reserve rises by 17%.
> > - The tight prior pulls it toward $1.5$, and the reserve falls by $6\%$.
> > - The intervention changes the reserve and its prediction error considerably, while the prediction error as a percentage barely moves (Table 6 gives 24%, 27% and 25%).

> [!trap] Using the over-dispersed negative binomial on negative development
> A column with $\lambda_j < 1$ gives a negative variance, as in the second example. Such a column needs the normal version, with variance $\phi_j D_{i,j-1}$.
