---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6fb79257782c9a7509f1033ba1f17502e90ccd7852934e72d22a5882768ec0b2
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stochastic Reserving.md
---

**Stochastic reserving** treats a loss triangle as the observed part of a set of random variables with a stated probability model. Estimating that model then gives more than a central estimate of [[Unpaid Claims|unpaid claims]]: it also gives the [[Prediction Error|prediction error]] and a full [[Predictive Distribution|predictive distribution]] of the reserve.

> $$E[q_{w,d}] = m_{w,d} = x_w\, y_d$$

> $$\mathrm{Var}(q_{w,d}) = \phi\, m_{w,d}$$

- This is the **over-dispersed Poisson (ODP)** cross-classified model, the workhorse behind the bootstrap. $q_{w,d}$ is the incremental amount for accident year $w$ at development period $d$. $x_w$ is the expected ultimate for the year, $y_d$ the share of it emerging in period $d$ (with $\sum_d y_d = 1$), and $\phi$ the scale ([[Dispersion Parameter|dispersion]]) parameter. As a [[Generalized Linear Model|GLM]] with a log link it reads $\ln m_{w,d} = c + \alpha_w + \beta_d$. Its fitted reserve equals the volume-weighted [[Chain Ladder Method|chain ladder]] reserve.
- **The methods on the Exam 7 syllabus:**
  - **Mack:** distribution-free. It gives the first two moments of the chain ladder reserve, and no more.
  - **Clark:** fits a loglogistic or Weibull growth curve by maximum likelihood under an ODP assumption, in LDF or [[Cape Cod Method|Cape Cod]] form. It gives process variance $\sigma^2 R$ and parameter variance from the information matrix.
  - **Shapland's ODP bootstrap:** resamples Pearson residuals to build pseudo-triangles (parameter risk), then adds gamma-distributed process noise to every future cell. This yields a simulated distribution by year and in total, with diagnostics.
  - **Taylor and McGuire's GLMs:** add calendar-period trends, covariates and other error distributions.
  - **Verrall's Bayesian models:** bring expert opinion in through priors on row or column parameters; the [[Bornhuetter-Ferguson Method|BF]] method emerges as a special case.
  - **Meyers' Bayesian MCMC models:** validated against actual outcomes.
- **What it adds.** Percentiles, [[Risk Margin|risk margins]], capital and ranges all need a distribution, and a point estimate cannot supply one. The simulated output also gives [[Parameter Risk|parameter percentiles]] and an [[Unpaid Claim Distribution|unpaid claim distribution]] by accident year.
- **What it does not add.** A model fitted to the triangle only knows the volatility the triangle contains. Changes that are not in the data, such as reform, a new claims system or a shift in inflation, are systemic risk. So is the model being wrong. Marshall et al. assess these outside the stochastic model.
- **Validation matters more than sophistication.** Meyers tested the models on hundreds of Schedule P triangles with known outcomes. On incurred data, Mack's distributions had tails that were too light. On paid data, both Mack and the ODP bootstrap gave means that ran high. Models allowing correlated accident years and changing settlement rates did better. See [[Reasonableness Testing]].

> [!example]- The ODP Model Reproduces the Chain Ladder {Example}
> Incremental paid losses ($000s):
>
> | AY | 1 | 2 | 3 |
> |---|---|---|---|
> | 1 | $1{,}000$ | $600$ | $200$ |
> | 2 | $1{,}200$ | $780$ | |
> | 3 | $1{,}300$ | | |
>
> Fit the ODP model. Find the reserve, the scale parameter and the process standard deviation of the total reserve.
>
> > [!answer]-
> > **Chain ladder:** $\hat f_1 = 3{,}580/2{,}200 = 1.6273$ and $\hat f_2 = 1{,}800/1{,}600 = 1.125$. The future incrementals are:
> >
> > $$
> > \begin{align*}
> > m_{2,3} &= 1{,}980(0.125) \\
> > &= 247.5 \\
> > m_{3,2} &= 1{,}300(0.6273) \\
> > &= 815.5 \\
> > m_{3,3} &= 1{,}300(1.6273)(0.125) \\
> > &= 264.4 \\
> > \hat R &= 1{,}327.4
> > \end{align*}
> > $$
> >
> > **Fitted past values** come from dividing each diagonal back through the factors. AY 1 gives $983.2, 616.8, 200$ and AY 2 gives $1{,}216.8, 763.2$. The unscaled Pearson residuals $r = (q - m)/\sqrt{m}$ are $0.534, -0.675, 0$ for AY 1, $-0.480, 0.607$ for AY 2, and $0$ for AY 3.
> >
> > **Scale**, with $N = 6$ cells and $p = 5$ parameters:
> >
> > $$
> > \begin{align*}
> > \hat\phi &= \frac{\sum r^2}{N - p} \\
> > &= \frac{1.340}{1} \\
> > &= 1.340 \\
> > \mathrm{Var}_{\text{process}} &= 1.340 \times 1{,}327.4 \\
> > &= 1{,}779 \\
> > \mathrm{SD} &= 42.2
> > \end{align*}
> > $$
> >
> > The mean is exactly the chain ladder's. The model adds a variance structure around it. With one degree of freedom $\hat\phi$ is barely estimable, which is why real applications need larger triangles. A bootstrap would resample these residuals to add parameter variance on top.

> [!example]- Choosing Between Stochastic Models {Example}
> An actuary runs Mack on reported losses (mean $10.0$M, 95th percentile $11.5$M) and an ODP bootstrap on paid losses (mean $11.2$M, 95th percentile $13.4$M). Closed-to-reported count ratios have risen steadily over the last three calendar years.
>
> What should the actuary conclude?
>
> > [!answer]-
> > The two models do not disagree because of randomness. They sit on different data, and each has a known weakness here.
> >
> > - **Paid bootstrap.** Faster settlement puts more paid on the latest diagonal than the historical pattern expects. Applying the historical paid factors to it overstates ultimate, which is consistent with Meyers' finding that paid-data models tend to run high. A model that allows for a **changing settlement rate**, or a paid triangle restated to current disposal rates, is needed before this mean can be trusted.
> > - **Mack on reported data.** The mean may be fine, but Meyers found Mack's reported-data distributions too light in the tails. The $11.5$M 95th percentile is probably too low.
> >
> > So the actuary should neither average the two means nor adopt the wider distribution. The better course is to fix the paid model's settlement-speed bias and widen the reported model's tail, for example with correlation between accident years. Then compare the two again.
