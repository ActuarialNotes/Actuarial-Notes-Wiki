---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:1623b4335d3488d0d53f8885e68fd986652e3b7a102ae047e854f63bca226e70
  sources:
    - "Shapland, CAS Monograph 4 (2016), Sections 1, 3.2-3.4, 4.1.1, 5.5.1, 6, 6.1 (pp. 1-3, 8-19, 21-22, 41-49; PDF 9-11, 16-27, 29-30, 49-57), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
    - "Verrall, Variance 1(1) 2007, Sections 1, 3, 5, 6.1 (pp. 53-60, 61-63, 65-66; PDF 1-8, 9-11, 13-14), sha256:da4a19ac50ec7756ad651c5632e73b71ff99f584d7db436772f94de1ec024506 — https://www.casact.org/sites/default/files/2021-03/7_Verrall.pdf"
    - "Meyers, CAS Monograph 8 (2019), Sections 1, 3-5, 7-8, 12 (pp. 1-2, 6-22, 31-42, 77-80; PDF 11-12, 16-32, 41-52, 87-90), sha256:3c01999f6c8a170dc412968658d4f7d673d637e74cb27d84b4173ea60532d2d1 — https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf"
    - "Taylor and McGuire, CAS Monograph 3 (2016), Sections 2.1.2, 3.2-3.3, 4.1-4.5, 5.2-5.4, 7 headings (pp. 10, 24-33, 35-41, 44-55; PDF 20, 34-43, 45-51, 54-65), sha256:d9ca082d0e8e8c0ed514e5e526cf0372cc457f4b5c94e4ff774cd6fc9e24249a — https://www.casact.org/sites/default/files/2021-03/7_Taylor.pdf"
    - "Clark, LDF Curve-Fitting and Stochastic Reserving, CAS Forum Fall 2003, Sections 2.3-2.4 (PDF 13-14) and the LDF/Cape Cod examples, pp. 65 and 69 (PDF 25, 29), sha256:1db0baa8ca6aef6711e6483601de5be6e180f016b1110a7fb0e49765c0953b9e — https://www.casact.org/sites/default/files/2021-03/7_Clark.pdf"
    - "Mack, Measuring the Variability of Chain Ladder Reserve Estimates, CAS Forum Spring 1994, assumptions (3)-(5) pp. 109-113, formulas (6)-(9) pp. 115-117, formula (11) p. 120, Appendices D and F pp. 150-154 (PDF 9-20, 50-54), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf"
    - "Marshall, Collings, Hodson and O'Dowd, A Framework for Assessing Risk Margins (2008), Sections 1.3-2.2 incl. Table 1 and Figure 1 (PDF 7-11), internal benchmarking (PDF 24-25), sha256:534ad0edf3b2294d2d1421b1d17df1fc0837f1fe3a4e430db347a6abbcc8c774 — https://www.casact.org/sites/default/files/2021-03/7_Marshall_et_al.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Stochastic Reserving.md
---
**Stochastic Reserving** is reserving with a stated probability model, which treats a loss triangle as the observed part of a set of random variables. Estimating that model then gives more than a central estimate of [[Unpaid Claims|unpaid claims]]: it also gives the [[Prediction Error|prediction error]] and a full [[Predictive Distribution|predictive distribution]] of the reserve.

Percentiles, [[Risk Margin|risk margins]], capital and ranges all need a distribution, and a point estimate cannot supply one. The simulated output also gives [[Parameter Risk|parameter percentiles]] and an [[Unpaid Claim Distribution|unpaid claim distribution]] by accident year.

## The over-dispersed Poisson model

The [[Over-Dispersed Poisson Model|over-dispersed Poisson (ODP)]] cross-classified model is the workhorse behind the bootstrap. In it, the expected incremental amount $q_{w,d}$ for accident year $w$ at development period $d$ is

> $$E[q_{w,d}] = m_{w,d} = x_w\, y_d$$

- $x_w$ is the expected ultimate for the year.
- $y_d$ is the share of it emerging in period $d$, with $\sum_d y_d = 1$.

Its variance is

> $$\mathrm{Var}(q_{w,d}) = \phi\, m_{w,d}$$

- $\phi$ is the scale ([[Dispersion Parameter|dispersion]]) parameter.

As a [[Generalized Linear Model|GLM]] with a log link it reads $\ln m_{w,d} = c + \alpha_w + \beta_d$. Its fitted reserve equals the volume-weighted [[Chain Ladder Method|chain ladder]] reserve.

> [!example]- What are the ODP model's reserve, scale parameter and process standard deviation for this triangle? {Example}
> Incremental paid losses ($000s) are:
>
> | AY | 1 | 2 | 3 |
> | :--- | ---: | ---: | ---: |
> | 1 | 1,000 | 600 | 200 |
> | 2 | 1,200 | 780 | |
> | 3 | 1,300 | | |
>
> > [!answer]-
> > - The chain ladder factors are $\hat f_1 = 3{,}580/2{,}200 = 1.6273$ and $\hat f_2 = 1{,}800/1{,}600 = 1.125$.
> > - The future incrementals are $m_{2,3} = 1{,}980(0.125) = 247.5$, $m_{3,2} = 1{,}300(0.6273) = 815.5$ and $m_{3,3} = 1{,}300(1.6273)(0.125) = 264.4$.
> > - The reserve is $247.5 + 815.5 + 264.4 = 1{,}327.4$, exactly the chain ladder's.
> > - The fitted past values come from dividing each diagonal back through the factors: $983.2$, $616.8$ and $200$ for AY 1, and $1{,}216.8$ and $763.2$ for AY 2.
> > - The unscaled [[Pearson Residual|Pearson residuals]] $r = (q - m)/\sqrt{m}$ are $0.534$, $-0.675$ and $0$ for AY 1, $-0.480$ and $0.607$ for AY 2, and $0$ for AY 3.
> > - With $N = 6$ cells and $p = 5$ parameters, $\hat\phi = \sum r^2/(N - p) = 1.340/1 = 1.340$.
> > - The process variance of the reserve is $1.340 \times 1{,}327.4 = 1{,}779$, so its process standard deviation is $42.2$.
> > - With one degree of freedom $\hat\phi$ is barely estimable, which is why real applications need larger triangles. A bootstrap would resample these residuals to add parameter variance on top.

## Stochastic reserving methods on the Exam 7 syllabus

1. **Mack:** distribution-free. It gives the first two moments of the chain ladder reserve, and no more.
2. **Clark:** fits a loglogistic or Weibull [[Growth Curve|growth curve]] by maximum likelihood under an ODP assumption, in LDF or [[Cape Cod Method|Cape Cod]] form. It gives process variance $\sigma^2 R$ and parameter variance from the information matrix.
3. **Shapland's [[ODP Bootstrap Model|ODP bootstrap]]:** resamples Pearson residuals to build pseudo-triangles (parameter risk), then adds gamma-distributed process noise to every future cell. This yields a simulated distribution by year and in total, with diagnostics.
4. **Taylor and McGuire's GLMs:** add calendar-period trends, covariates and other error distributions.
5. **Verrall's Bayesian models:** bring expert opinion in through priors on the row or column parameters. Strong priors on the row parameters reproduce the [[Bornhuetter-Ferguson Method|BF]] method, and vague priors the chain ladder.
6. **Meyers' Bayesian MCMC models:** validated against actual outcomes.

## Risk outside the model

A model fitted to the triangle only knows the volatility the triangle contains. Changes that are not in the data, such as reform, a new claims system or a shift in inflation, are systemic risk. So is the model being wrong. Marshall et al. assess these outside the stochastic model ([[Internal Systemic Risk|internal]] and [[External Systemic Risk|external systemic risk]]).

## Validating a stochastic model

Validation matters more than sophistication. Meyers tested the models on hundreds of Schedule P triangles with known outcomes. On incurred data, Mack's distributions had tails that were too light. On paid data, both Mack and the ODP bootstrap gave means that ran high. Models allowing correlated accident years and changing settlement rates did better ([[Reasonableness Testing|reasonableness testing]]).

> [!example]- Should the actuary average the two models' means, or adopt the wider distribution? {Example}
> An actuary runs Mack on reported losses (mean $10.0$M, 95th percentile $11.5$M) and an ODP bootstrap on paid losses (mean $11.2$M, 95th percentile $13.4$M). Closed-to-reported count ratios have risen steadily over the last three calendar years.
>
> > [!answer]-
> > - The two models sit on different data, and each has a known weakness here.
> > - Faster settlement puts more paid on the latest diagonal than the historical pattern expects, so the historical paid factors overstate ultimate. That is consistent with Meyers' finding that paid-data models tend to run high.
> > - The paid mean can be trusted only after a model that allows for a changing settlement rate, or a paid triangle restated to current disposal rates.
> > - Meyers found Mack's reported-data distributions too light in the tails, so the $11.5$M 95th percentile is probably too low.
> > - The actuary should do neither. Fix the paid model's settlement-speed bias, widen the reported model's tail, for example with correlation between accident years, and compare the two again.
