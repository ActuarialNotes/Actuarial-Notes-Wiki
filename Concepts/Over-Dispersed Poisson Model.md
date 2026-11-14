---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:9960b91a1292c832d6b38820c17bb0fe9384a75b24ea95b4554965f2e5beb4c5
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Over-Dispersed Poisson Model.md
---

An **Over-Dispersed Poisson Model** (ODP) is the stochastic model for a [[Development Triangle|triangle]] of incremental losses in which each cell $q(w,d)$, for [[Accident Year|accident year]] $w$ and development period $d$, is an independent over-dispersed Poisson variable. Fitted as a [[Generalized Linear Model|GLM]] with a log link, it reproduces the volume-weighted [[Chain Ladder Method|chain ladder]], which is why it underlies the [[ODP Bootstrap Model|ODP bootstrap]].

In [[Obtaining Predictive Distributions for Reserves Which Incorporate Expert Opinion (Verrall - 2007)|Verrall's]] form, the mean of a cell is an accident-year level times a development-period share,

> $$E[q(w,d)] = m_{w,d} = x_w\, y_d$$

- $x_w$ is the expected ultimate loss of accident year $w$.
- $y_d$ is the proportion of ultimate that emerges in development period $d$, with $\sum_d y_d = 1$.

Its variance is a constant scale parameter $\phi$ times the mean,

> $$\mathrm{Var}[q(w,d)] = \phi\, m_{w,d}$$

In the log-link form of [[Using the ODP Bootstrap Model (Shapland - 2016)|Shapland's]] formula 3.7, the mean is

> $$\ln m_{w,d} = c + \alpha_w + \beta_d$$

- $c$ is a constant, and $\alpha_1 = \beta_1 = 0$.
- The $\alpha_w$ adjust the level of each accident year, and the $\beta_d$ the development trend after the first period.

The reserve estimates are the same in either form.

## What over-dispersed means

If $X$ is Poisson with mean $\mu$, then $Y = \phi X$ has $E(Y) = \phi\mu$ and $\mathrm{Var}(Y) = \phi^2\mu = \phi\,E(Y)$. A quasi-likelihood approach means the losses need not be integers. $\phi$ is usually above 1 but need not be, and Shapland notes that "quasi-Poisson" is the more general name. [[LDF Curve-Fitting and Stochastic Reserving (Clark - 2003)|Clark (2003)]] writes the loss dollars as a Poisson count times a scale factor $\sigma^2$.

## Equivalence with the chain ladder

Its maximum likelihood equations equate each row sum and each column sum of fitted values with the actual ones ([[Stochastic Loss Reserving Using Generalized Linear Models (Taylor and McGuire - 2016)|Taylor and McGuire]]). The solution is the volume-weighted chain ladder, found by dividing the latest diagonal backwards through the factors and differencing. That needs a parameter for every accident and every development period, a common $\phi$, and positive column sums. A negative column total makes the GLM fail, and the log of a negative incremental is undefined. Clark finds likewise that the ODP likelihood reproduces the LDF and Cape Cod ultimates.

> [!example]- What are $x_w$, $y_d$, the fitted values and the reserve of the ODP model for this triangle? {Example}
> Incremental paid losses (thousands):
>
> | AY | 1 | 2 | 3 |
> |---|---|---|---|
> | 1 | 2,000 | 1,200 | 400 |
> | 2 | 2,400 | 1,500 | |
> | 3 | 2,700 | | |
>
> > [!answer]-
> > - The cumulative losses are 2,000, 3,200 and 3,600 for AY 1, 2,400 and 3,900 for AY 2, and 2,700 for AY 3.
> > - The volume-weighted factors are $\hat f_1 = 7{,}100/4{,}400 = 1.61364$ and $\hat f_2 = 3{,}600/3{,}200 = 1.125$.
> > - The column parameters, the share of ultimate emerging in each period, are $y_1 = 1/(1.61364 \times 1.125) = 0.5509$, $y_2 = 1/1.125 - 0.5509 = 0.3380$ and $y_3 = 1 - 1/1.125 = 0.1111$.
> > - The row parameters are each year's chain ladder ultimate: $x_1 = 3{,}600$, $x_2 = 3{,}900 \times 1.125 = 4{,}387.5$ and $x_3 = 2{,}700 \times 1.81534 = 4{,}901.4$.
> > - The fitted values $m_{w,d} = x_w y_d$ are 1,983.1, 1,216.9 and 400.0 for AY 1, 2,416.9 and 1,483.1 for AY 2, and 2,700.0 for AY 3.
> > - The fitted row sums are 3,600 and 3,900, and the fitted column sums 7,100 and 2,700, each equal to its actual total.
> > - The future cells are 487.5 for AY 2, and 1,656.8 and 544.6 for AY 3, so $\hat R = 2{,}688.9$.
> > - That is the chain ladder reserve: $3{,}900 \times 0.125 = 487.5$ for AY 2 and $2{,}700 \times 0.81534 = 2{,}201.4$ for AY 3.

## The scale parameter

The scale parameter is estimated from the [[Pearson Residual|Pearson residuals]] $r_{w,d} = (q - m)/\sqrt{m}$ as

> $$\phi = \frac{\sum r_{w,d}^2}{N - p}$$

- $N$ is the number of cells.
- $p = 2n - 1$ is the number of parameters of an $n \times n$ triangle. Shapland's errata corrects the printed $2(n-1)$.

$\phi$ is the [[Dispersion Parameter|dispersion parameter]] of a GLM whose variance is $\phi\,m^{z}$ with $z = 1$. The values $z = 0$, $2$ and $3$ give the Normal, [[Gamma|gamma]] and inverse Gaussian. Taylor and McGuire call the ODP the [[Tweedie Distribution|Tweedie]] case $p = 1$.

Because the cells are independent, the process variance of a reserve $R$ is $\phi R$. Shapland resamples the residuals in the [[ODP Bootstrap Model|ODP bootstrap]], which adds the parameter variance. Verrall's [[Over-Dispersed Negative Binomial Model|over-dispersed negative binomial]] model gives the same predictive distribution, and his [[Bayesian Bornhuetter-Ferguson Model|Bayesian Bornhuetter-Ferguson]] model puts priors on its row parameters $x_w$.

> [!example]- What are $\hat\phi$ and the process standard deviation of the reserve for this triangle? {Example}
> Incremental losses (thousands), and the ODP fitted values from the chain ladder (factors 1.58788, 1.17059 and 1.05263). The chain ladder reserve is 1,780.3.
>
> | AY | 1 | 2 | 3 | 4 |
> |---|---|---|---|---|
> | 1 | 1,000 | 600 | 300 | 100 |
> | 2 | 1,100 | 700 | 280 | |
> | 3 | 1,200 | 640 | | |
> | 4 | 1,300 | | | |
>
> | Fitted | 1 | 2 | 3 | 4 |
> |---|---|---|---|---|
> | 1 | 1,022.2 | 600.9 | 276.9 | 100.0 |
> | 2 | 1,119.0 | 657.9 | 303.1 | |
> | 3 | 1,158.8 | 681.2 | | |
> | 4 | 1,300.0 | | | |
>
> > [!answer]-
> > - The residuals are $r = (q - m)/\sqrt{m}$, for example $r_{1,1} = (1{,}000 - 1{,}022.2)/\sqrt{1{,}022.2} = -0.694$.
> >
> > | AY | 1 | 2 | 3 | 4 |
> > |---|---|---|---|---|
> > | 1 | $-0.694$ | $-0.038$ | $1.389$ | 0 |
> > | 2 | $-0.569$ | $1.643$ | $-1.328$ | |
> > | 3 | $1.211$ | $-1.579$ | | |
> > | 4 | 0 | | | |
> >
> > - The squares sum to 11.160.
> > - There are $N = 10$ cells and $p = 2(4) - 1 = 7$ parameters: four accident-year levels and three development trends.
> > - $\hat\phi = 11.160/(10 - 7) = 3.720$.
> > - The process variance of the reserve is $3.720 \times 1{,}780.3 = 6{,}623$, a standard deviation of 81.4 and a coefficient of variation of 4.6%.

> [!trap] Counting $2(n-1)$ parameters
> An $n \times n$ triangle has $n$ accident-year levels and $n - 1$ development trends, so $p = 2n - 1$. The misprinted $p = 2(n-1)$ overstates the degrees of freedom by one. In the example it gives $\hat\phi = 11.160/4 = 2.790$ and a standard deviation of 70.5, 13% too low.
