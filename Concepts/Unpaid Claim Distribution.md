---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:3aa363c31daf67d1c255da1f4945a882ee81f7c09447e3740cf2d00b72e12de6
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Unpaid Claim Distribution.md
---

**An unpaid claim distribution** is the probability distribution of the total amount $R$ that will be paid after the valuation date on claims that have already occurred. Its mean is the central estimate of [[Unpaid Claims|unpaid claims]], and its spread, measured by the [[Prediction Error|prediction error]] and [[Percentile|percentiles]], measures how uncertain the reserve is.

> $$R = \sum_{w + d \,>\, n + 1} q_{w,d}$$

> $$\sigma^2 = \ln\!\left(1 + \mathrm{CV}^2\right)$$

> $$\mu = \ln E[R] - \tfrac{1}{2}\sigma^2$$

- $R$ sums the future incremental payments $q_{w,d}$ below the diagonal of an $n$-year triangle, plus any tail. The second and third blocks fit a [[Lognormal Distribution|lognormal]] to a mean and a CV. Mack suggested this for his chain ladder moments. Its $p$-th percentile is then $R_p = e^{\mu + z_p\sigma}$.
- **Estimating the parameters.** One route is to take moments from a model (Mack's mean and standard error, or Clark's maximum likelihood fit with its variance) and attach a distribution. The other is to simulate: an ODP bootstrap, a GLM or MCMC posterior draws produce thousands of outcomes, and moments and percentiles are read off directly. See [[Stochastic Reserving]].
- **Moments and shape.** Report the mean, standard error, CoV and percentiles such as the 50th, 75th, 95th and 99th. Unpaid claims are right-skewed, so a normal approximation understates the upper tail. At a modest percentile such as the 75th, however, a normal puts the value slightly *above* a lognormal with the same mean and CV.
- **Simulating percentiles.** Each iteration draws the parameters (the bootstrap pseudo-triangle, or the posterior draw) and then the outcome. The 95th percentile of the total is not the sum of the accident years' 95th percentiles, because years diversify. See [[Parameter Risk]].
- **Reasonableness of the output** (Shapland):
  - the standard error should rise from the oldest to the most recent years;
  - the CoV should generally fall, though it may turn up again for the latest years as parameter uncertainty grows;
  - the total's standard error should exceed any single year's, and its CoV should be below any single year's;
  - the minimum and maximum iterations must be plausible.

  Meyers adds a retrospective test: the percentiles of actual outcomes should be uniform. See [[Reasonableness Testing]].
- The distribution drives [[Risk Margin|risk margins]], capital and reinsurance decisions. It is **not** a [[Range of Indications|range of reasonable estimates]]: its percentiles describe outcomes, not alternative estimates of the mean.

> [!example]- Percentiles from a Mean and Standard Error {Example}
> A Mack analysis gives a total reserve of $5{,}000$ with standard error $800$ ($000s). Assuming a lognormal, find the 75th and 95th percentiles and compare them with a normal.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \mathrm{CV} &= 800/5{,}000 \\
> > &= 0.16 \\
> > \sigma^2 &= \ln(1.0256) \\
> > &= 0.02528 \\
> > \sigma &= 0.1590 \\
> > \mu &= \ln 5{,}000 - 0.01264 \\
> > &= 8.50455
> > \end{align*}
> > $$
> >
> > $$
> > \begin{align*}
> > R_{0.75} &= e^{8.50455 + 0.6745(0.1590)} \\
> > &= 5{,}496 \\
> > R_{0.95} &= e^{8.50455 + 1.645(0.1590)} \\
> > &= 6{,}413
> > \end{align*}
> > $$
> >
> > The normal gives $5{,}000 + 0.6745(800) = 5{,}540$ and $5{,}000 + 1.645(800) = 6{,}316$. The lognormal is *lower* at the 75th percentile and *higher* at the 95th. The choice of distribution matters most exactly where capital and reinsurance decisions are made. The mean and standard error alone do not settle it.

> [!example]- Reviewing Bootstrap Output {Example}
> An ODP bootstrap on paid data (10,000 iterations, $000s) returns:
>
> | AY | Mean | Std error | CoV |
> |---|---|---|---|
> | 2016 | $120$ | $95$ | $79\%$ |
> | 2017 | $410$ | $160$ | $39\%$ |
> | 2018 | $900$ | $250$ | $28\%$ |
> | 2019 | $1{,}650$ | $330$ | $20\%$ |
> | 2020 | $2{,}800$ | $450$ | $16\%$ |
> | 2021 | $4{,}100$ | $1{,}350$ | $33\%$ |
> | Total | $9{,}980$ | $1{,}520$ | $15\%$ |
>
> The minimum iteration for 2016 is $-60$. Assess the output.
>
> > [!answer]-
> > - **Standard errors** rise from $95$ to $1{,}350$, and the total's $1{,}520$ exceeds every year's. ✓
> > - **The total's CoV** ($15.2\%$) is below every year's, the lowest being 2020's $16.1\%$. ✓
> > - **CoVs fall** from $79\%$ to $16\%$ through 2020, as they should. A small, nearly settled reserve for 2016 has most of its uncertainty relative to its size. ✓
> > - **2021 jumps to $33\%$.** A chain ladder on the latest year multiplies one thin diagonal by the full CDF, so parameter uncertainty swamps the decline. Shapland's remedy is to consider a BF or Cape Cod model for the recent years, which borrows an a priori loss ratio.
> > - **The negative minimum** for 2016 comes from negative incremental values in a few iterations. It is acceptable only if negative development is genuinely possible, for example from salvage or case-reserve takedowns. Otherwise the simulation should be constrained.
> >
> > The distribution is usable for 2016 to 2020, but 2021 should be re-modelled before any percentile is quoted for the total.
