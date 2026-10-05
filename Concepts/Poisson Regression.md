---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:eadc382a8c7d9e6af82a20819dac959b7fa6e8be197dfd1b7e5fee821e8ccfbe
  sources:
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning, 2nd ed. (Springer 2021; MAS-I reading), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf, sec.4.6.2 'Poisson Regression on the Bikeshare Data' (log link, multiplicative coefficients, mean = variance, overdispersion footnote; printed pp.167-170, PDF pp.177-180)"
    - "Rodriguez, GLM lecture notes (Princeton), ch.4 Poisson Models for Count Data, secs.4.2.2-4.2.3 (deviance, Pearson, tests) and 4.3 (offset) (PDF pp.7-10), sha256:1caaa05c152c35d73ab90400c526e871016283aade13ee812c40032f6dfa8fbe — https://grodri.github.io/glms/notes/c4.pdf"
    - "Rodriguez, GLM lecture notes (Princeton), Models for Count Data With Overdispersion, secs.1-2 (quasi-Poisson, negative binomial) (PDF pp.1-3), sha256:956c3ad4849787d3a60c6d0f42b8c7e60d23e80be1da988417f9e9a42c73121e — https://grodri.github.io/glms/notes/c4a.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision; PCPA reading, rank 3 for MAS-I), sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf, sec.2.6 exposure offsets vs weights (PDF pp.28-29); sec.2.7.2 Poisson, ODP and negative binomial (PDF pp.31-32)"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Poisson Regression.md
---

**Poisson Regression** is the [[Generalized Linear Model]] for count data: the response is Poisson and the log [[Link Function]] makes the predictors act multiplicatively on the expected count. With log exposure entered as an [[Offset Variable|offset]], it is the standard model for claim **[[Frequency]]**.

> $$\ln \mu_i = \ln(e_i) + \beta_0 + \beta_1 x_{i1} + \cdots + \beta_p x_{ip}$$

> $$\mu_i = e_i\,e^{\beta_0}\,e^{\beta_1 x_{i1}} \cdots e^{\beta_p x_{ip}}$$

- The log link turns each coefficient into a **rating relativity**: $e^{\beta_j}$ is the multiplicative effect on frequency of a one-unit increase in $x_j$, which is exactly how rating algorithms are built
- The exposure term $\ln(e_i)$ is an **offset** — a predictor with coefficient fixed at $1$ — so the model predicts a *rate* per unit of exposure. Leaving exposure out (or entering it as an ordinary predictor) is a classic error
- The Poisson variance function is $V(\mu) = \mu$ and the [[Dispersion Parameter]] is nominally $\phi = 1$; when the residual [[Deviance]] far exceeds its degrees of freedom the data is **overdispersed**
- Overdispersion usually comes from unmodelled heterogeneity (a [[Mixed Poisson Process]]). Remedies: estimate $\phi$ (quasi-Poisson, which inflates standard errors by $\sqrt{\hat\phi}$ but leaves $\hat\beta$ unchanged), or fit a [[Negative Binomial Distribution|negative binomial]] model
- Coefficients are tested individually in [[Parameter Estimate Tables]] and in groups by analysis of deviance ([[Likelihood Ratio Test]])
- Poisson regression tolerates non-integer responses (average counts with weights) because the quasi-likelihood only needs the mean–variance relationship to be right

![[Media/Figures/Poisson_Regression.svg|340]]

> [!example]- Predicting a Frequency from a Fitted Model {Example}
> A frequency GLM with log link and log-exposure offset gives $\hat\beta_0 = -2.30$, urban $= 0.26$, young driver $= 0.41$. Find the expected claim count for a young urban driver with $0.5$ years of exposure.
>
> > [!answer]-
> > $$\ln\hat\mu = \ln(0.5) - 2.30 + 0.26 + 0.41 = -0.693 - 1.63 = -2.323$$
> > $$\hat\mu = e^{-2.323} = 0.098$$
> > Equivalently, the base rate is $e^{-2.30} = 0.100$ claims per exposure-year, multiplied by $e^{0.26} = 1.30$ for urban and $e^{0.41} = 1.51$ for young, times $0.5$ exposure: $0.100 \times 1.30 \times 1.51 \times 0.5 = 0.098$.

> [!example]- Detecting Overdispersion {Example}
> A Poisson GLM has residual deviance $1{,}840$ on $600$ degrees of freedom. What does this indicate, and how should the results be adjusted?
>
> > [!answer]-
> > $$\hat\phi \approx \frac{D}{n - p} = \frac{1{,}840}{600} = 3.07$$
> > A dispersion near $3$ instead of $1$ means the counts are far more variable than Poisson allows — **overdispersion**. The estimated coefficients remain usable, but standard errors are understated by a factor of $\sqrt{3.07} = 1.75$, so p-values are far too small. Refit as quasi-Poisson (scaling the standard errors) or as a negative binomial model, which builds the extra variance into the distribution.
