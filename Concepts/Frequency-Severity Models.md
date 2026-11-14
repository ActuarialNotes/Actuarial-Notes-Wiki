---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:34399d81d92cbb2aed8b9aeeff871bf930a0cd9d39f5f62625cb845529f58856
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §5.1.1-5.1.2, PDF pp.53-55, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Frequency-Severity Models.md
---

A **Frequency-Severity Model** is a [[Pure Premium|pure premium]] model built from two component models, one for claim [[Frequency|frequency]] (claims per exposure) and one for claim [[Severity|severity]] (loss per claim), whose predictions are multiplied rather than modelling the pure premium in a single step. The predicted pure premium of risk $i$ is

> $$\widehat{PP}_i = \hat{f}_i \times \hat{s}_i$$

- $\hat f_i$ is the predicted frequency of risk $i$, and $\hat s_i$ is its predicted severity.

The one-step alternative is a [[Tweedie Distribution|Tweedie]] pure premium model.

## Frequency and severity GLMs

The usual [[Generalized Linear Model|GLM]] setup is a Poisson (or overdispersed Poisson or negative binomial) frequency model with a log link and a $\ln(\text{exposure})$ [[Offset Variable|offset]], and a [[Gamma]] severity model with a log link, weighted by claim count. With log links on both, relativities multiply and coefficients add, so the pure premium relativity for level $k$ of a variable is

> $$R^{PP}_k = R^{f}_k \times R^{s}_k$$

> $$R^{PP}_k = e^{\hat\beta^{f}_k + \hat\beta^{s}_k}$$

- $R^{f}_k$ and $R^{s}_k$ are the level's frequency and severity relativities.
- $\hat\beta^{f}_k$ and $\hat\beta^{s}_k$ are the level's fitted coefficients in the frequency and severity models.

> [!example]- What are the youthful-driver pure premium relativity and pure premium? {Example}
> A log-link frequency GLM has intercept $\ln 0.05$ and a youthful-driver coefficient of $0.40$. The companion severity GLM has intercept $\ln 8{,}000$ and a youthful coefficient of $-0.10$.
>
> > [!answer]-
> > - The frequency relativity is $e^{0.40} = 1.492$, so youthful drivers have $49\%$ more claims.
> > - The severity relativity is $e^{-0.10} = 0.905$, so their claims are $10\%$ smaller.
> > - The pure premium relativity is $e^{0.40 - 0.10} = e^{0.30} = 1.350$.
> > - The base pure premium is $0.05 \times 8{,}000 = \$400$.
> > - The youthful pure premium is $400 \times 1.350 = \$539.94$, which is also $0.074591 \times \$7{,}238.70$.
> > - A Tweedie model would report only the $+35\%$ effect, and fit it as if frequency and severity rose together.

## Reasons to model frequency and severity separately

Goldburd et al. give four reasons:

1. Insight: the models show whether an effect is driven by frequency or by severity. A variable that raises frequency while lowering severity equally would look like no effect at all in pure premium.
2. Stability: each component is less noisy than pure premium, so a frequency-only effect is not drowned by severity noise, which would cause underfitting.
3. No spurious fit: a pure premium model forced to fit a frequency effect also fits the severity noise, which is overfitting.
4. The Tweedie model implicitly assumes that frequency and severity move in the same direction.

Separate models need claim counts and amounts, and they double the modelling work. That matters when many segments or perils must each be modelled.

## Other component splits

A pure premium can also be split by coverage or peril (fire, wind and hail, all other), by claim type (workers compensation injury types), or into capped losses with a separate excess load. To combine by-peril models, score them on data with the expected mix of business, add the peril predictions, and fit one multiplicative model to the sum using the union of their predictors. A sum of multiplicative models is not itself multiplicative, so the refit's factors depend on the mix.

> [!example]- What all-peril multiplicative plan do these two peril models give? {Example}
> A homeowners fire model gives a base loss cost of $\$100$ and a frame-construction relativity of $1.50$, with no territory effect. A wind model gives a base of $\$60$ and a coastal relativity of $2.00$, with no construction effect. The exposure mix is:
>
> | Cell | Share |
> | :--- | ---: |
> | Brick, inland | 40% |
> | Frame, inland | 30% |
> | Brick, coastal | 20% |
> | Frame, coastal | 10% |
>
> > [!answer]-
> > - Adding the peril loss costs in each cell gives $160$ brick inland, $210$ frame inland, $220$ brick coastal and $270$ frame coastal.
> > - Reading the factors off the base cell gives frame $210/160 = 1.3125$ and coastal $220/160 = 1.375$.
> > - The frame coastal cell then comes out at $160 \times 1.3125 \times 1.375 = 288.75$, which is $6.9\%$ above $270$. The whole error lands in one cell.
> > - An exposure-weighted log-link model fitted to the four summed cells gives a base of $161.85$, frame $1.282$ and coastal $1.337$.
> > - Its fitted cells are $161.85$, $207.54$, $216.31$ and $277.38$, errors of $+1.2\%$, $-1.2\%$, $-1.7\%$ and $+2.7\%$.
> > - The book total is exact at $\$198$ per exposure. The refit spreads the error across the cells in proportion to the mix, which is why the data used for it should reflect the expected mix of business.

The combined predictions are then tested on a [[Holdout Sample|holdout sample]] like any other candidate model, by their [[Lift|lift]] and by a [[Double Lift Chart|double lift chart]] against the current plan.
