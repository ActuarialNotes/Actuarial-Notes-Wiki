---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b06f9845edbe003a222c47e0ff0e0b376ae857aef1b00b01e63de9aac45ee506
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Cross Classified Model.md
---

**Cross Classified Model** (CRC) is the basic Bayesian model of [[Stochastic Loss Reserving Using Bayesian MCMC Models (Meyers - 2019)|Meyers (2019)]]. It gives each [[Accident Year|accident year]] and each development year its own parameter and treats each cumulative loss $C_{w,d}$ as [[Lognormal Distribution|lognormal]], with the parameters fitted by [[Markov Chain Monte Carlo|MCMC]]. The other models in the monograph are built by adding a feature to it.

> $$\mu_{w,d} = \log(\text{Premium}_w) + \mathit{logelr} + \alpha_w + \beta_d$$

> $$C_{w,d} \sim \text{lognormal}(\mu_{w,d},\ \sigma_d)$$

> $$\sigma_d^2 = \sum_{i=d}^{10} a_i$$

- $w = 1, \dots, 10$ is the accident year and $d = 1, \dots, 10$ the development year. $\mu_{w,d}$ and $\sigma_d$ are the log mean and log standard deviation.
- **Priors**, exactly as the monograph states them:
    - $\mathit{logelr} \sim \text{normal}(-0.4, \sqrt{10})$
    - $\alpha_w \sim \text{normal}(0, \sqrt{10})$ for $w = 2, \dots, 10$, with $\alpha_1 = 0$
    - $\beta_d \sim \text{normal}(0, \sqrt{10})$ for $d = 1, \dots, 9$, with $\beta_{10} = 0$
    - $a_i \sim \text{uniform}(0, 1)$ for $i = 1, \dots, 10$
    - That is 29 parameters; $\mu_{w,d}$ and $\sigma_d$ are "transformed parameters".
- **Reading the parameters.** $\beta_{10} = 0$ and $\alpha_1 = 0$, so $e^{\mathit{logelr}}$ is approximately the final loss ratio of the first accident year. The $\alpha_w$ show how much the loss ratio varies by year. Because $\beta_{10} = 0$, $e^{\beta_d}$ is the ratio of the median loss at development year $d$ to the median at year 10; Meyers calls the $\beta_d$ log-development factors.
- **Why the variance falls with $d$.** Summing the $a_i$ from $d$ upward forces $\sigma_1^2 > \dots > \sigma_{10}^2$. A cumulative loss mixes claims with different settlement dates, and the proportion settled grows with $d$.
- **Predictive distribution.** For each of 10,000 posterior parameter vectors, set $\mu_{w,10} = \log(\text{Premium}_w) + \mathit{logelr} + \alpha_w$, simulate $C_{w,10}$ for $w = 2, \dots, 10$, and add the known $C_{1,10}$. The "Estimate" is the mean of the simulated totals, and the outcome's percentile is the share of them at or below it.
- **Diagnostics on the upper triangle.** Standardized residuals $r_{w,d} = (\log C_{w,d} - \mu_{w,d})/\sigma_d$, from 100 random posterior draws, go into box plots by accident year and by development year. The interquartile range should contain 0, and should lie close to that of a standard normal.
- **Validation** on 200 Schedule P triangles ([[PP Plot|p-p plots]], KS critical value $9.6$ for all lines combined):
    - On **paid** losses the plot is worse than Mack's or the ODP bootstrap's ($D = 25.5$), and shares their reputation for predicting losses **too high**. All four lines fail.
    - On **incurred** losses it is better than Mack ($D = 11.9$ against $15.4$), but it still **understates the variability** of the outcomes. Only Other Liability fails its own line test.
    - Against the [[Stochastic Cape Cod Model|stochastic Cape Cod model]], which drops the $\alpha_w$ and so holds the loss ratio constant, the CRC model has the higher $\widehat{elpd}_{loo}$ on all 200 paid and incurred triangles.
- **What it leads to.** Two fixes follow from these results: the [[Changing Settlement Rate Model|CSR model]] for the paid bias and the [[Correlated Accident Year Model|CAY model]] for the light incurred tail. Each reduces to the CRC model when its extra parameter is 0.
- **First edition.** The 2015 first edition's [[Leveled Chain Ladder Model|leveled chain ladder (LCL) model]] has the same $\alpha_w + \beta_d$ structure on cumulative lognormal losses. It differs in its priors, and it sums the $a_i$ to give $\sigma_d$ rather than $\sigma_d^2$.
- "Cross-classified" also describes the over-dispersed Poisson model behind the bootstrap, which likewise has a row and a column parameter; see [[Stochastic Reserving]].

> [!example]- Why the Estimate Beats the Plug-In {Example}
> For accident year $10$ of Meyers' illustrative paid triangle, premium is $4{,}962$. The CRC posterior means are $\mathit{logelr} = -0.3965$, $\alpha_{10} = 0.3435$ (posterior standard deviation $0.3316$) and $\sigma_{10} = 0.0202$.
>
> (a) Compute the lognormal mean of $C_{10,10}$ at the posterior means.
>
> (b) Meyers' simulated Estimate for the year is $4{,}976$. Explain the difference, and approximate it by treating $\alpha_{10}$ as normal and the other parameters as fixed.
>
> > [!answer]-
> > **(a)**
> >
> > $$
> > \begin{align*}
> > \mu_{10,10} &= \ln 4{,}962 - 0.3965 + 0.3435 + 0 \\
> > &= 8.50956 - 0.0530 \\
> > &= 8.45656 \\
> > E[C_{10,10}] &= e^{8.45656 + 0.0202^2/2} \\
> > &= 4{,}707
> > \end{align*}
> > $$
> >
> > **(b)** The Estimate averages $e^{\mu + \sigma^2/2}$ over the posterior, and the exponential is convex, so uncertainty in $\alpha_{10}$ raises the mean. That is [[Parameter Risk|parameter risk]] entering the expected value. With $\alpha_{10}$ normal, $E[e^{\alpha_{10}}] = e^{0.3435 + 0.3316^2/2}$:
> >
> > $$
> > \begin{align*}
> > e^{0.3316^2/2} &= e^{0.0550} \\
> > &= 1.0565 \\
> > 4{,}707 \times 1.0565 &= 4{,}973
> > \end{align*}
> > $$
> >
> > That is within a few units of $4{,}976$. The newest year has almost no data, so its $\alpha$ is uncertain and the gap is largest there. For older years, with tight posteriors, the plug-in and the Estimate agree.

> [!example]- One Standardized Residual {Example}
> Accident year $7$ of the illustrative paid triangle has premium $4{,}992$ and a cumulative paid loss of $2{,}980$ at development year $2$. The CRC posterior means are $\mathit{logelr} = -0.3965$, $\alpha_7 = 0.4354$, $\beta_2 = -0.5751$ and $\sigma_2 = 0.2073$.
>
> Compute the standardized residual for this cell at the posterior means, and say how it would be used.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \mu_{7,2} &= \ln 4{,}992 - 0.3965 + 0.4354 - 0.5751 \\
> > &= 8.51559 - 0.5362 \\
> > &= 7.97939 \\
> > r_{7,2} &= \frac{\ln 2{,}980 - 7.97939}{0.2073} \\
> > &= \frac{7.99968 - 7.97939}{0.2073} \\
> > &= 0.098
> > \end{align*}
> > $$
> >
> > The cell's paid loss is about a tenth of a standard deviation above the model's log mean ($e^{7.97939} = 2{,}920$). Meyers repeats this for all $55$ upper-triangle cells under each of $100$ posterior draws, giving $5{,}500$ residuals. He then draws a box plot for each accident year and each development year. A year whose box sits wholly above or below 0 flags an effect the model has missed. That is how the stochastic Cape Cod model's fixed loss ratio shows itself.
