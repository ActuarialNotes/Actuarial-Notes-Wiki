---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:028ed3f4bd83211d22b1a30158c82ade3b32b182949baf3ba73b0f4260814bdb
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Parameter Risk.md
---

**Parameter risk** is the uncertainty in a reserve that comes from not knowing the model's parameters: development factors, an expected loss ratio or growth-curve parameters are estimated from limited, noisy data. Together with **process risk**, the randomness of outcomes when the parameters are known, it makes up the [[Prediction Error|prediction error]]. Model (specification) risk sits on top of both.

> $$\mathrm{Var}(R) = \underbrace{E\big[\mathrm{Var}(R \mid \theta)\big]}_{\text{process}} + \underbrace{\mathrm{Var}\big(E[R \mid \theta]\big)}_{\text{parameter}}$$

- $\theta$ is the parameter vector and $R$ the unpaid amount. In a Bayesian model (Verrall, Meyers' MCMC) the split is literal, with $\theta$ drawn from its posterior. In a frequentist model, the second term is the sampling variance of $\hat\theta$ carried through to $\hat R$.
- **Where each Exam 7 model puts it.**
  - **Mack:** the $1/\sum_j C_{j,k}$ term of the standard error.
  - **Clark:** $(\partial R/\partial\theta)^{\top}\,\Sigma\,(\partial R/\partial\theta)$, where the covariance matrix $\Sigma$ comes from the inverse [[Fisher Information|information matrix]] of the [[Maximum Likelihood Estimation|maximum likelihood]] fit.
  - **ODP bootstrap:** the spread of reserves across refitted pseudo-triangles, before gamma process noise is added.
  - **MCMC:** the spread of the posterior draws.
- **Parameter percentiles** are percentiles of the simulated or posterior parameter set, such as the 5th to 95th percentile of simulated ELRs or development factors. A reserve computed at the 95th-percentile parameter is **not** the 95th percentile of unpaid claims. Process risk sits on top, so the outcome percentile is wider (see [[Unpaid Claim Distribution]]).
- **It grows with the number of parameters relative to the data.** A chain ladder fits a factor for every age. Clark's point is that a two-parameter growth curve, especially with a Cape Cod ELR, can cut parameter variance sharply. It concentrates in the most recent accident years, where a large CDF multiplies a thin diagonal. That is why a bootstrap CoV can turn up again for the latest year.
- **It does not diversify with volume.** Process CoV shrinks roughly like $1/\sqrt{\text{volume}}$. A misestimated factor, however, is applied to every year, so a large book still carries it in full. In Marshall et al.'s framework, the random part of parameter risk is *independent risk*, while *parameter selection error* is internal systemic risk, a [[Model Risk|model risk]] (see [[Risk Margin]]).

> [!example]- Process and Parameter Variance in a Cape Cod Fit {Example}
> A Clark Cape Cod fit gives $\widehat{\text{ELR}} = 0.70$ with standard error $0.05$. On-level premium is $10{,}000$ (\$000s), the fitted growth curve says $40\%$ of ultimate is still unreported, and the ODP scale is $\sigma^2 = 50$. Ignore uncertainty in the curve parameters.
>
> Split the reserve's variance.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \hat R &= 0.70 \times 10{,}000 \times 0.40 \\
> > &= 2{,}800 \\
> > \text{Process} &= \sigma^2 \hat R = 50 \times 2{,}800 \\
> > &= 140{,}000 \\
> > \text{Parameter} &= (10{,}000 \times 0.40)^2 \times 0.05^2 \\
> > &= 40{,}000 \\
> > \mathrm{PE} &= \sqrt{180{,}000} \\
> > &= 424.3
> > \end{align*}
> > $$
> >
> > The CoV is $15.2\%$ and parameter risk is $22\%$ of the variance. Suppose the book doubled with the same ELR uncertainty. Process variance would double, but parameter variance, which scales with $\hat R^2$, would quadruple. That is why parameter risk dominates for large books: their process risk has largely diversified away.

> [!example]- Parameter Percentile Versus Unpaid Percentile {Example}
> A Bayesian model gives a posterior for the ELR that is approximately normal with mean $0.70$ and standard deviation $0.05$. Given the ELR, unpaid claims are approximately normal with mean $5{,}000 \times \text{ELR}$ and process standard deviation $300$.
>
> Compare the reserve at the 95th-percentile ELR with the 95th percentile of unpaid claims.
>
> > [!answer]-
> > **At the parameter percentile:**
> >
> > $$
> > \begin{align*}
> > \text{ELR}_{0.95} &= 0.70 + 1.645(0.05) \\
> > &= 0.7822 \\
> > 5{,}000 \times 0.7822 &= 3{,}911
> > \end{align*}
> > $$
> >
> > **Unpaid claims.** The mean is $3{,}500$, and the parameter standard deviation is $5{,}000 \times 0.05 = 250$:
> >
> > $$
> > \begin{align*}
> > \mathrm{SD}(R) &= \sqrt{250^2 + 300^2} \\
> > &= 390.5 \\
> > R_{0.95} &= 3{,}500 + 1.645(390.5) \\
> > &= 4{,}142
> > \end{align*}
> > $$
> >
> > Setting the parameter to its 95th percentile understates the 95th percentile of the outcome by $231$, because it leaves out process risk. A simulation draws the parameter and *then* the outcome for each iteration, and ranks the outcomes. Reading percentiles off the parameter draws alone measures only one of the two risks.
