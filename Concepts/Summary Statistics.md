---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:b726f0d07b269ac1102045dbeb1a9e3d7d2150ac53f0590368319845c181ba57
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Summary Statistics.md
---

**Summary statistics** condense a data set, or a fitted model, into a few numbers a reader can take in at once. For **data** they measure location, spread, shape and association, usually tabulated by group; for a **fitted model** they measure fit against complexity — the log-likelihood, [[AIC]], [[BIC]] and, in a [[Linear Mixed Model]], the estimated [[Variance Components|variance components]].

> $$\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i$$

> $$s = \sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(x_i - \bar{x})^2}$$

**Describing data** — the tabular half of presenting data, beside [[Data Visualization|graphs]]:

- **Location**: the [[Sample Mean|mean]] $\bar{x}$ and the [[Median|median]]. For right-skewed severity the mean sits well above the median, and the gap is itself a finding
- **Spread**: the standard deviation $s$ ([[Sample Variance]]), the interquartile range $Q_3 - Q_1$, the range, and the [[Coefficient of Variation|coefficient of variation]] $s/\bar{x}$ for comparing spread across variables on different scales
- **Shape and completeness**: [[Percentile|percentiles]] (the five-number summary behind a [[Box Plot]]), the share of zeros, the largest values, and the count of [[Missing Data|missing]] values in each column
- **Categorical variables and association**: counts, proportions and — in insurance — *exposure* by level; the [[Correlation|correlation]] matrix for numeric predictors and two-way tables for categorical ones
- **Insurance one-way tables** show exposure, claim count, [[Frequency|frequency]], [[Severity|severity]] and [[Pure Premium|pure premium]] by level, with pure premium $=$ frequency $\times$ severity. Each is a ratio of sums, not an average of ratios, and each level's figure is confounded with everything correlated with it — the reason final relativities come from a multivariate model
- Use a table when the reader needs exact values, a graph when the message is a shape or a comparison

**Summarizing a fitted mixed model:**

- **$-2 \times$ log-likelihood**, by [[Restricted Maximum Likelihood|REML]] or ML, and the [[Likelihood Ratio Test|likelihood ratio test]] between nested models. Use REML to compare random effects or [[Covariance Structure|covariance structures]] with identical fixed effects; use ML to compare fixed effects
- **AIC** $= -2\ell + 2k$ and **BIC** $= -2\ell + k\ln n$ for choices that are not nested. BIC's penalty per parameter is heavier once $\ln n > 2$, i.e. $n \geq 8$, so it favours smaller models
- **Variance components** and the implied [[Intraclass Correlation|intraclass correlation]]. A component estimated at zero means the grouping explains nothing. Testing whether a variance is zero puts the null on the boundary of the parameter space, so the naive $\chi^2$ p-value is too large — for a single variance component it should be halved
- **Fixed-effect tests** — a $t$ or $F$ statistic per term — guide [[Variable Selection|variable selection]], alongside the [[Model Diagnostics|diagnostic plots]] that check the assumptions behind them

> [!example]- A One-Way Table by Vehicle Use {Example}
> Personal auto experience by vehicle use:
>
> | Use | Exposure | Claims | Losses |
> | :--- | ---: | ---: | ---: |
> | Pleasure | 6,000 | 300 | 1,500,000 |
> | Commute | 3,000 | 195 | 1,053,000 |
> | Business | 1,000 | 90 | 540,000 |
>
> Build the frequency, severity and pure premium table, with pure premium relativities to Pleasure, and the all-uses totals.
>
> > [!answer]-
> > | Use | Frequency | Severity | Pure premium | Relativity |
> > | :--- | ---: | ---: | ---: | ---: |
> > | Pleasure | 0.0500 | 5,000 | 250.00 | 1.000 |
> > | Commute | 0.0650 | 5,400 | 351.00 | 1.404 |
> > | Business | 0.0900 | 6,000 | 540.00 | 2.160 |
> > | All | 0.0585 | 5,287 | 309.30 | |
> >
> > The Business relativity decomposes as $1.80$ in frequency times $1.20$ in severity, which is $2.16$. The overall frequency is $585/10{,}000 = 0.0585$, not the average of the three rows ($0.0683$), because Pleasure carries $60\%$ of the exposure. Before quoting $2.16$ as a rating factor, check what else Business use travels with — annual mileage, vehicle type — since a one-way table credits all of it to vehicle use.

> [!example]- Choosing a Random-Effects Structure from Summary Statistics {Example}
> Loss ratios for $500$ policy-years are fitted by REML with identical fixed effects. Model 1 has a random intercept per policyholder ($2$ covariance parameters); Model 2 adds a random slope on year and its covariance with the intercept ($4$). The $-2$ REML log-likelihoods are $2{,}431.6$ and $2{,}420.2$. Compare them by likelihood ratio test, AIC and BIC.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{LRT} &= 2{,}431.6 - 2{,}420.2 \\
> > &= 11.4 \\
> > \text{AIC}_1 &= 2{,}431.6 + 2(2) \\
> > &= 2{,}435.6 \\
> > \text{AIC}_2 &= 2{,}420.2 + 2(4) \\
> > &= 2{,}428.2 \\
> > \text{BIC}_1 &= 2{,}431.6 + 2\ln 500 \\
> > &= 2{,}444.0 \\
> > \text{BIC}_2 &= 2{,}420.2 + 4\ln 500 \\
> > &= 2{,}445.1
> > \end{align*}
> > $$
> > The LRT of $11.4$ on $2$ degrees of freedom exceeds $\chi^2_{0.05,\,2} = 5.99$; because the slope variance is tested on its boundary, the true p-value is smaller still than the naive one, so the conclusion only strengthens. AIC also prefers Model 2. BIC, charging $\ln 500 = 6.21$ per parameter rather than $2$, narrowly prefers Model 1. When the criteria split, look at the size of the estimated slope variance and at the residual plots by policyholder before adding structure.
