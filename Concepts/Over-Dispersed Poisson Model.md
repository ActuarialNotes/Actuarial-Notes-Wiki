---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:0e3668af9341f3c8541749765b0d56c1dc213d0bba3093443cab983cd5aa199f
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Over-Dispersed Poisson Model.md
---

**Over-Dispersed Poisson Model** (ODP) is the stochastic model for a [[Development Triangle|triangle]] of incremental losses in which each cell $q(w,d)$ is an independent over-dispersed Poisson variable. Its mean is an [[Accident Year|accident-year]] level times a development-period share, and its variance is a constant scale parameter $\phi$ times the mean. Fitted as a [[Generalized Linear Model|GLM]] with a log link, it reproduces the volume-weighted [[Chain Ladder Method|chain ladder]], which is why it underlies the [[ODP Bootstrap Model|ODP bootstrap]].

> $$E[q(w,d)] = m_{w,d} = x_w\, y_d$$

> $$\mathrm{Var}[q(w,d)] = \phi\, m_{w,d}$$

> $$\ln m_{w,d} = c + \alpha_w + \beta_d$$

- **Two ways of writing it.** $x_w$ is the expected ultimate loss of accident year $w$, and $y_d$ is the proportion of ultimate that emerges in development period $d$, with $\sum_d y_d = 1$. That is [[Obtaining Predictive Distributions for Reserves Which Incorporate Expert Opinion (Verrall - 2007)|Verrall's]] form. In the log-link form of [[Using the ODP Bootstrap Model (Shapland - 2016)|Shapland's]] formula 3.7, $\alpha_1 = \beta_1 = 0$; the $\alpha_w$ adjust the level and the $\beta_d$ the development trend after the first period. The reserve estimates are the same either way.
- **What "over-dispersed" means.** If $X$ is Poisson with mean $\mu$, then $Y = \phi X$ has $E(Y) = \phi\mu$ and $\mathrm{Var}(Y) = \phi^2\mu = \phi\,E(Y)$. A quasi-likelihood approach means the losses need not be integers. $\phi$ is usually above 1 but need not be, and Shapland notes that "quasi-Poisson" is the more general name. [[LDF Curve-Fitting and Stochastic Reserving (Clark - 2003)|Clark (2003)]] writes the loss dollars as a Poisson count times a scale factor $\sigma^2$.
- **Why it is the chain ladder.** Its maximum likelihood equations equate each row sum and each column sum of fitted values with the actual ones ([[Stochastic Loss Reserving Using Generalized Linear Models (Taylor and McGuire - 2016)|Taylor and McGuire]]). The solution is the volume-weighted chain ladder, found by dividing the latest diagonal backwards through the factors and differencing. That needs a parameter for every accident and every development period, a common $\phi$, and positive column sums; a negative column total makes the GLM fail. Clark finds likewise that the ODP likelihood reproduces the LDF and Cape Cod ultimates.
- **The scale parameter** is estimated from the [[Pearson Residual|Pearson residuals]] $r_{w,d} = (q - m)/\sqrt{m}$ as $\phi = \sum r^2/(N - p)$. $N$ is the number of cells and $p = 2n - 1$ the number of parameters of an $n \times n$ triangle. (Shapland's errata corrects the printed $2(n-1)$.) It is the [[Dispersion Parameter|dispersion parameter]] of a GLM whose variance is $\phi\,m^{z}$ with $z = 1$; $z = 0$, $2$ and $3$ give the Normal, [[Gamma|gamma]] and inverse Gaussian. Taylor and McGuire call the ODP the [[Tweedie Distribution|Tweedie]] case $p = 1$.
- **Where it is used.** Because the cells are independent, the process variance of a reserve $R$ is $\phi R$. Shapland resamples its residuals in the [[ODP Bootstrap Model|ODP bootstrap]]. Verrall's [[Over-Dispersed Negative Binomial Model|over-dispersed negative binomial]] model gives the same predictive distribution, and his [[Bayesian Bornhuetter-Ferguson Model|Bayesian Bornhuetter-Ferguson]] model puts priors on its row parameters $x_w$.

> [!example]- Row and Column Parameters from the Chain Ladder {Example}
> Incremental paid losses (\$000s):
>
> | AY | 1 | 2 | 3 |
> |---|---|---|---|
> | 1 | $2{,}000$ | $1{,}200$ | $400$ |
> | 2 | $2{,}400$ | $1{,}500$ | |
> | 3 | $2{,}700$ | | |
>
> Fit the ODP model. Find $x_w$, $y_d$, the fitted values and the reserve.
>
> > [!answer]-
> > The cumulative losses are $2{,}000$, $3{,}200$, $3{,}600$ for AY 1, $2{,}400$, $3{,}900$ for AY 2 and $2{,}700$ for AY 3. The volume-weighted factors are:
> >
> > $$
> > \begin{align*}
> > \hat f_1 &= \frac{3{,}200 + 3{,}900}{2{,}000 + 2{,}400} \\
> > &= 1.61364 \\
> > \hat f_2 &= \frac{3{,}600}{3{,}200} \\
> > &= 1.125
> > \end{align*}
> > $$
> >
> > **Column parameters**, the share of ultimate emerging in each period:
> >
> > $$
> > \begin{align*}
> > y_1 &= \frac{1}{1.61364 \times 1.125} \\
> > &= 0.5509 \\
> > y_2 &= \frac{1}{1.125} - 0.5509 \\
> > &= 0.3380 \\
> > y_3 &= 1 - \frac{1}{1.125} \\
> > &= 0.1111
> > \end{align*}
> > $$
> >
> > **Row parameters**, each year's chain ladder ultimate: $x_1 = 3{,}600$, $x_2 = 3{,}900 \times 1.125 = 4{,}387.5$ and $x_3 = 2{,}700 \times 1.81534 = 4{,}901.4$.
> >
> > **Fitted values** $m_{w,d} = x_w y_d$, with the future cells in brackets:
> >
> > | AY | 1 | 2 | 3 |
> > |---|---|---|---|
> > | 1 | $1{,}983.1$ | $1{,}216.9$ | $400.0$ |
> > | 2 | $2{,}416.9$ | $1{,}483.1$ | $(487.5)$ |
> > | 3 | $2{,}700.0$ | $(1{,}656.8)$ | $(544.6)$ |
> >
> > The fitted row sums over the observed cells are $3{,}600$ and $3{,}900$, and the column sums are $7{,}100$ and $2{,}700$. Each equals its actual total, which is the marginal-sum property behind the equivalence. The two corner cells are fitted exactly because each has a parameter of its own.
> >
> > $$
> > \begin{align*}
> > \hat R &= 487.5 + 1{,}656.8 + 544.6 \\
> > &= 2{,}688.9
> > \end{align*}
> > $$
> >
> > That is the chain ladder reserve: $3{,}900 \times 0.125 = 487.5$ for AY 2 and $2{,}700 \times 0.81534 = 2{,}201.4$ for AY 3.

> [!example]- The Scale Parameter and the Process Variance of the Reserve {Example}
> Incremental losses (\$000s), and the ODP fitted values from the chain ladder (factors $1.58788$, $1.17059$ and $1.05263$):
>
> | AY | 1 | 2 | 3 | 4 |
> |---|---|---|---|---|
> | 1 | $1{,}000$ | $600$ | $300$ | $100$ |
> | 2 | $1{,}100$ | $700$ | $280$ | |
> | 3 | $1{,}200$ | $640$ | | |
> | 4 | $1{,}300$ | | | |
>
> | Fitted | 1 | 2 | 3 | 4 |
> |---|---|---|---|---|
> | 1 | $1{,}022.2$ | $600.9$ | $276.9$ | $100.0$ |
> | 2 | $1{,}119.0$ | $657.9$ | $303.1$ | |
> | 3 | $1{,}158.8$ | $681.2$ | | |
> | 4 | $1{,}300.0$ | | | |
>
> The chain ladder reserve is $1{,}780.3$. Estimate $\phi$ and the process standard deviation of the reserve. What would the misprinted $p = 2(n-1)$ have given?
>
> > [!answer]-
> > **Residuals**, $r = (q - m)/\sqrt{m}$. For example, $r_{1,1} = (1{,}000 - 1{,}022.2)/\sqrt{1{,}022.2} = -0.694$.
> >
> > | AY | 1 | 2 | 3 | 4 |
> > |---|---|---|---|---|
> > | 1 | $-0.694$ | $-0.038$ | $1.389$ | $0$ |
> > | 2 | $-0.569$ | $1.643$ | $-1.328$ | |
> > | 3 | $1.211$ | $-1.579$ | | |
> > | 4 | $0$ | | | |
> >
> > The squares sum to $11.160$. There are $N = 10$ cells and $p = 2(4) - 1 = 7$ parameters: four accident-year levels and three development trends.
> >
> > $$
> > \begin{align*}
> > \hat\phi &= \frac{11.160}{10 - 7} \\
> > &= 3.720 \\
> > \mathrm{Var}(R) &= 3.720 \times 1{,}780.3 \\
> > &= 6{,}623 \\
> > \mathrm{SD}(R) &= 81.4
> > \end{align*}
> > $$
> >
> > The process CoV is $81.4/1{,}780.3 = 4.6\%$.
> >
> > With the misprint, $p = 6$ gives $\hat\phi = 11.160/4 = 2.790$ and a standard deviation of $\sqrt{2.790 \times 1{,}780.3} = 70.5$. That is $13\%$ too low, because the degrees of freedom were overstated by one. Either way this is process variance only. The parameter variance is what the ODP bootstrap adds by resampling the residuals.
