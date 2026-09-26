---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6cb266efae31cd3547ac2c4ea5f23952b108a7d36427a96ac118021f04ef68a9
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Frequency-Severity Models.md
---

**Frequency-Severity Models** build a [[Pure Premium|pure premium]] from separate component models — one for claim [[Frequency|frequency]] (claims per exposure) and one for claim [[Severity|severity]] (loss per claim) — and combine them, rather than modelling pure premium in a single step.

> $$\widehat{PP}_i = \hat{f}_i \times \hat{s}_i$$

> $$R^{PP}_k = R^{f}_k \times R^{s}_k = e^{\hat\beta^{f}_k + \hat\beta^{s}_k}$$

- $\hat f_i$ and $\hat s_i$ are the predicted frequency and severity for risk $i$. $R_k$ is the relativity for level $k$ of a variable, and $\hat\beta_k$ its fitted coefficient. The usual [[Generalized Linear Model|GLM]] setup is a Poisson (or overdispersed Poisson or negative binomial) frequency model with a log link and a $\ln(\text{exposure})$ [[Offset Variable|offset]], and a [[Gamma]] severity model with a log link, weighted by claim count. With log links on both, relativities multiply and coefficients add. The one-step alternative is a [[Tweedie Distribution|Tweedie]] pure premium model.
- **Why separate (Goldburd et al.).** First, *insight*: you see whether an effect is frequency- or severity-driven, and a variable that raises frequency while lowering severity equally would look like no effect at all in pure premium. Second, *stability*: each component is less noisy than pure premium, so a frequency-only effect is not drowned by severity noise, which would cause underfitting. Third, *no spurious fit*: a pure premium model forced to fit a frequency effect also fits the severity noise, which is overfitting. Fourth, the Tweedie *implicitly assumes frequency and severity move in the same direction*.
- **Costs.** Separate models need claim counts and amounts and double the modelling work, which matters when many segments or perils must each be modelled.
- **Other component splits.** Model each coverage or peril separately (fire, wind and hail, all other), or each claim type (workers compensation injury types), or capped losses with a separate excess load. **To combine by-peril models**, score them on data with the expected mix of business, add the peril predictions, and fit one multiplicative model to the sum using the union of their predictors. A sum of multiplicative models is not itself multiplicative, so the refit's factors depend on the mix.
- The combined predictions are then tested on a [[Holdout Sample|holdout]] like any other candidate: [[Lift|lift]], and a [[Double Lift Chart|double lift chart]] against the current plan (see [[Model Fit]]).

> [!example]- Combining Frequency and Severity Relativities {Example}
> A log-link frequency GLM has intercept $\ln 0.05$ and a youthful-driver coefficient of $0.40$. The companion severity GLM has intercept $\ln 8{,}000$ and a youthful coefficient of $-0.10$. Find the youthful pure premium relativity and the youthful pure premium.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > R^{f} &= e^{0.40} \\
> > &= 1.492 \\[4pt]
> > R^{s} &= e^{-0.10} \\
> > &= 0.905 \\[4pt]
> > R^{PP} &= e^{0.40 - 0.10} \\
> > &= e^{0.30} \\
> > &= 1.350 \\[6pt]
> > \widehat{PP}_{\text{youthful}} &= (0.05 \times 8{,}000) \times 1.350 \\
> > &= \$539.94
> > \end{align*}
> > $$
> >
> > Check: $0.074591 \times \$7{,}238.70 = \$539.94$. Youthful drivers have $49\%$ more claims, but those claims are $10\%$ smaller. A Tweedie model would report only a $+35\%$ effect, and it would fit that effect as if frequency and severity rose together. The split also tells underwriting and claims where the problem lies.

> [!example]- Combining Two Peril Models {Example}
> A homeowners fire model gives a base loss cost of $\$100$ and a frame-construction relativity of $1.50$. Fire has no territory effect. A separate wind model gives a base of $\$60$ and a coastal relativity of $2.00$. Wind has no construction effect. Exposure mix: brick/inland $40\%$, frame/inland $30\%$, brick/coastal $20\%$, frame/coastal $10\%$. Build an all-peril multiplicative plan.
>
> > [!answer]-
> > Add the peril loss costs in each cell: brick/inland $160$, frame/inland $210$, brick/coastal $220$, frame/coastal $270$.
> >
> > Reading the factors off the base cell gives frame $210/160 = 1.3125$ and coastal $220/160 = 1.375$. The frame/coastal cell then comes out at
> >
> > $$
> > \begin{align*}
> > 160 \times 1.3125 \times 1.375 &= 288.75 \\
> > \frac{288.75}{270} - 1 &= +6.9\%
> > \end{align*}
> > $$
> >
> > The whole error lands in one cell. Instead, fit an exposure-weighted log-link model to the four summed cells. It gives a base of $161.85$, frame $1.282$ and coastal $1.337$, and the fitted cells are
> >
> > $$161.85,\ 207.54,\ 216.31,\ 277.38$$
> >
> > The errors are now $+1.2\%$, $-1.2\%$, $-1.7\%$ and $+2.7\%$, and the book total is exact at $\$198$ per exposure. The refit spreads the unavoidable non-multiplicative error across the cells in proportion to the mix, which is why the data used for it should reflect the expected mix of business.
