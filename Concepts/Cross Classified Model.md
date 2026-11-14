---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c18baa617c3610c1a3f724fadc839a09ed4e11c849e15e5c7c4dbe99ede2db86
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cross Classified Model.md
---

The **Cross Classified Model** (CRC) is the basic Bayesian model of [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]]. It gives each [[Accident Year|accident year]] $w$ and each development year $d$ its own parameter, treats each cumulative loss $C_{w,d}$ as [[Lognormal Distribution|lognormal]], and fits the parameters by [[Markov Chain Monte Carlo|MCMC]]. The other models in the monograph are built by adding a feature to it.

For $w = 1, \dots, 10$ and $d = 1, \dots, 10$, the log mean of the cumulative loss is

> $$\mu_{w,d} = \log(\text{Premium}_w) + \mathit{logelr} + \alpha_w + \beta_d$$

- $\mathit{logelr}$ is the log loss ratio parameter.
- $\alpha_w$ is the accident-year parameter, with $\alpha_1 = 0$.
- $\beta_d$ is the development-year parameter, with $\beta_{10} = 0$.

The cumulative loss is

> $$C_{w,d} \sim \text{lognormal}(\mu_{w,d},\ \sigma_d)$$

- $\sigma_d$ is the log standard deviation of development year $d$.

The log variance of development year $d$ is

> $$\sigma_d^2 = \sum_{i=d}^{10} a_i$$

- $a_i$ are positive parameters, one per development year.

Summing the $a_i$ from $d$ upward forces $\sigma_1^2 > \dots > \sigma_{10}^2$. A cumulative loss mixes claims with different settlement dates, and the proportion settled grows with $d$.

## Priors

The monograph states these priors:

- $\mathit{logelr} \sim \text{normal}(-0.4, \sqrt{10})$.
- $\alpha_w \sim \text{normal}(0, \sqrt{10})$ for $w = 2, \dots, 10$.
- $\beta_d \sim \text{normal}(0, \sqrt{10})$ for $d = 1, \dots, 9$.
- $a_i \sim \text{uniform}(0, 1)$ for $i = 1, \dots, 10$.

That is 29 parameters. $\mu_{w,d}$ and $\sigma_d$ are "transformed parameters".

## Reading the parameters

Because $\beta_{10} = 0$ and $\alpha_1 = 0$, $e^{\mathit{logelr}}$ is approximately the final loss ratio of the first accident year. The $\alpha_w$ show how much the loss ratio varies by year. Because $\beta_{10} = 0$, $e^{\beta_d}$ is the ratio of the median loss at development year $d$ to the median at year 10, and Meyers calls the $\beta_d$ log-development factors.

## Predictive distribution

For each of 10,000 posterior parameter vectors, Meyers sets $\mu_{w,10} = \log(\text{Premium}_w) + \mathit{logelr} + \alpha_w$, simulates $C_{w,10}$ for $w = 2, \dots, 10$, and adds the known $C_{1,10}$. The "Estimate" is the mean of the simulated totals, and the outcome's percentile is the share of them at or below it.

> [!example]- What is the lognormal mean of $C_{10,10}$ at the posterior means, and why is Meyers' simulated Estimate of $4{,}976$ higher? {Example}
> For accident year $10$ of Meyers' illustrative paid triangle, premium is $4{,}962$. The CRC posterior means are $\mathit{logelr} = -0.3965$, $\alpha_{10} = 0.3435$ (posterior standard deviation $0.3316$) and $\sigma_{10} = 0.0202$. Approximate the difference by treating $\alpha_{10}$ as normal and the other parameters as fixed.
>
> > [!answer]-
> > - At development year $10$, $\beta_{10} = 0$, so $\mu_{10,10} = \ln 4{,}962 - 0.3965 + 0.3435 = 8.50956 - 0.0530 = 8.45656$.
> > - The lognormal mean at the posterior means is $e^{8.45656 + 0.0202^2/2} = 4{,}707$.
> > - The Estimate averages $e^{\mu + \sigma^2/2}$ over the posterior, and the exponential is convex, so uncertainty in $\alpha_{10}$ raises the mean. That is [[Parameter Risk|parameter risk]] entering the expected value.
> > - With $\alpha_{10}$ normal, $E[e^{\alpha_{10}}] = e^{0.3435 + 0.3316^2/2}$, and $e^{0.3316^2/2} = 1.0565$.
> > - The approximation is $4{,}707 \times 1.0565 = 4{,}973$, within a few units of $4{,}976$.
> > - The newest year has almost no data, so its $\alpha$ is uncertain and the gap is largest there. For older years, with tight posteriors, the plug-in and the Estimate agree.

## Residual diagnostics

The standardized residuals of the upper triangle are

> $$r_{w,d} = \frac{\log C_{w,d} - \mu_{w,d}}{\sigma_d}$$

They are computed from 100 random posterior draws and go into box plots by accident year and by development year. The interquartile range should contain 0, and should lie close to that of a standard normal. A year whose box sits wholly above or below 0 flags an effect the model has missed.

> [!example]- What is the standardized residual of this cell at the posterior means, and how is it used? {Example}
> Accident year $7$ of the illustrative paid triangle has premium $4{,}992$ and a cumulative paid loss of $2{,}980$ at development year $2$. The CRC posterior means are $\mathit{logelr} = -0.3965$, $\alpha_7 = 0.4354$, $\beta_2 = -0.5751$ and $\sigma_2 = 0.2073$.
>
> > [!answer]-
> > - The log mean is $\mu_{7,2} = \ln 4{,}992 - 0.3965 + 0.4354 - 0.5751 = 8.51559 - 0.5362 = 7.97939$.
> > - The residual is $r_{7,2} = (\ln 2{,}980 - 7.97939)/0.2073 = (7.99968 - 7.97939)/0.2073 = 0.098$.
> > - The cell's paid loss is about a tenth of a standard deviation above the model's log mean ($e^{7.97939} = 2{,}920$).
> > - Meyers repeats this for all $55$ upper-triangle cells under each of $100$ posterior draws, giving $5{,}500$ residuals, and draws a box plot for each accident year and each development year.
> > - That is how the stochastic Cape Cod model's fixed loss ratio shows itself.

## Validation

Meyers validates the model on 200 Schedule P triangles with [[PP Plot|p-p plots]], with a KS critical value of $9.6$ for all lines combined.

On **paid** losses the plot is worse than Mack's or the ODP bootstrap's ($D = 25.5$), and the model shares their reputation for predicting losses **too high**. All four lines fail.

On **incurred** losses it is better than Mack ($D = 11.9$ against $15.4$), but it still **understates the variability** of the outcomes. Only Other Liability fails its own line test.

Against the [[Stochastic Cape Cod Model|stochastic Cape Cod model]], which drops the $\alpha_w$ and so holds the loss ratio constant, the CRC model has the higher $\widehat{elpd}_{loo}$ on all 200 paid and incurred triangles.

## Related models

Two fixes follow from these results: the [[Changing Settlement Rate Model|CSR model]] for the paid bias and the [[Correlated Accident Year Model|CAY model]] for the light incurred tail. Each reduces to the CRC model when its extra parameter is 0.

The 2015 first edition's [[Leveled Chain Ladder Model|leveled chain ladder (LCL) model]] has the same $\alpha_w + \beta_d$ structure on cumulative lognormal losses. It differs in its priors, and it sums the $a_i$ to give $\sigma_d$ rather than $\sigma_d^2$.

"Cross-classified" also describes the over-dispersed Poisson model behind the bootstrap, which likewise has a row and a column parameter. That model is part of [[Stochastic Reserving|stochastic reserving]].
