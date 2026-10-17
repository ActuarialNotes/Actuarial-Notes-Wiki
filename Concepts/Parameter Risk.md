---
verification:
  status: verified
  confidence: high
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:033c78d1ed26a5bbbef5a57017dad9dfb432d5faae69f2df4aa7ee5a455a13ee
  sources:
    - "Marshall, Collings, Hodson and O'Dowd, A Framework for Assessing Risk Margins (2008), Sections 1.3-2.2 incl. Table 1 and Figure 1 (PDF 7-11), internal benchmarking (PDF 24-25), sha256:534ad0edf3b2294d2d1421b1d17df1fc0837f1fe3a4e430db347a6abbcc8c774 — https://www.casact.org/sites/default/files/2021-03/7_Marshall_et_al.pdf"
    - "Clark, LDF Curve-Fitting and Stochastic Reserving, CAS Forum Fall 2003, Sections 2.3-2.4 (PDF 13-14) and the LDF/Cape Cod examples, pp. 65 and 69 (PDF 25, 29), sha256:1db0baa8ca6aef6711e6483601de5be6e180f016b1110a7fb0e49765c0953b9e — https://www.casact.org/sites/default/files/2021-03/7_Clark.pdf"
    - "Mack, Measuring the Variability of Chain Ladder Reserve Estimates, CAS Forum Spring 1994, assumptions (3)-(5) pp. 109-113, formulas (6)-(9) pp. 115-117, formula (11) p. 120, Appendices D and F pp. 150-154 (PDF 9-20, 50-54), sha256:f20a3d7ff26247fb26839073418b918b9823e6908829f9ae8f889f636e1a9da5 — https://www.casact.org/sites/default/files/2021-03/7_Mack_1994.pdf"
    - "Shapland, CAS Monograph 4 (2016), Sections 1, 3.2-3.4, 4.1.1, 5.5.1, 6, 6.1 (pp. 1-3, 8-19, 21-22, 41-49; PDF 9-11, 16-27, 29-30, 49-57), sha256:51b072243c0fe839cd776d9dc77532c544e2d52e025a29610e1aaea2cff07abf — https://www.casact.org/sites/default/files/2021-03/7_Shapland.pdf"
    - "Meyers, CAS Monograph 8 (2019), Sections 1, 3-5, 7-8, 12 (pp. 1-2, 6-22, 31-42, 77-80; PDF 11-12, 16-32, 41-52, 87-90), sha256:3c01999f6c8a170dc412968658d4f7d673d637e74cb27d84b4173ea60532d2d1 — https://www.casact.org/sites/default/files/2021-02/08-Meyers.pdf"
    - "Verrall, Variance 1(1) 2007, Sections 1, 3, 5, 6.1 (pp. 53-60, 61-63, 65-66; PDF 1-8, 9-11, 13-14), sha256:da4a19ac50ec7756ad651c5632e73b71ff99f584d7db436772f94de1ec024506 — https://www.casact.org/sites/default/files/2021-03/7_Verrall.pdf"
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
- **It grows with the number of parameters relative to the data.** A chain ladder fits a factor for every age. [[LDF Curve-Fitting and Stochastic Reserving (Clark - 2003)|Clark]] finds parameter variance far larger than process variance when his LDF method fits 12 parameters (an ultimate for each of ten years plus the two growth-curve parameters) to 55 data points. Replacing the ultimates with one Cape Cod ELR leaves 3 parameters, and the parameter standard deviation of the total reserve falls from $4{,}688{,}826$ to $3{,}143{,}967$; the total variance is cut in half. It concentrates in the most recent accident years, where a large CDF multiplies a thin diagonal. That is why a bootstrap CoV can turn up again for the latest year.
- **Its random part falls with volume; selection error does not.** In Marshall et al.'s framework, the random component of parameter risk is *independent risk*, which the law of large numbers makes smaller as the portfolio grows. *Parameter selection error* is internal systemic risk, also called model specification risk (a [[Model Risk|model risk]]), and is potentially common across claim groups (see [[Risk Margin]]).

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
> > The CoV is $15.2\%$ and parameter risk is $22\%$ of the variance. Suppose the book doubled with the same ELR uncertainty. Process variance would double, but parameter variance, which scales with $\hat R^2$, would quadruple.

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
