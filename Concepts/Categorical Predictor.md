---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-05
  last_checked_by: agent:validate-v1
  content_hash: sha256:0d5a9672a022dbcadfce84ffb270b9c0474279bd4694df85e18c932ce5a99623
  sources:
    - "CAS Exam MAS-I Content Outline 2026 (MASI_CO_2026_F v06), Domain C description and tasks 1-9, PDF p.5; reading list PDF p.6, sha256:245892366dea073ff44e89b3ac2ae1401517b127d36d51c8a1198b3185faa2ed — https://www.casact.org/sites/default/files/2026-06/MASI_ContentOutline_2026.pdf"
    - "Dobson & Barnett, An Introduction to Generalized Linear Models, 4th ed. (CRC 2018) — publisher eBook preview, §1.2 Scope, printed p.2 (PDF p.19), sha256:40ed0b2549113ee0bea29e41786886ce992ffa29251ad26fb1037385bb51611a — https://api.pageplace.de/preview/DT0400.9781351726221_A37406780/preview-9781351726221_A37406780.pdf"
    - "James, Witten, Hastie & Tibshirani, An Introduction to Statistical Learning with Applications in R, 2nd ed. (Springer 2021), §3.3.1 Qualitative Predictors, printed p.86 (PDF p.96); §3.3.2 printed pp.88-90 (PDF pp.98-100), sha256:f708349f34d2b345a40766f7b4830d22c1bcbf90b4194ae603dcd1245b4e975f — https://www.casact.org/sites/default/files/2022-12/James-G.-et-al.-2nd-edition-Springer-2021.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §1.2 log-link relativities PDF p.21; §5.4.2 Binning Continuous Predictors PDF pp.59-60, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Categorical Predictor.md
---

![[Media/Figures/Categorical_Predictor.svg|340]]

A **Categorical Predictor** is a [[Predictor Variable|predictor variable]] whose values are a finite set of categories, called levels, such as territory or vehicle type. A categorical predictor with $k$ levels enters a model with an intercept through $k - 1$ indicator variables, one for each level except a base level. With level 1 as the base level, the linear predictor of observation $i$ is

> $$\eta_i = \beta_0 + \beta_2 x_{i2} + \cdots + \beta_k x_{ik}$$

- $x_{ij}$ is 1 if observation $i$ is at level $j$, and 0 otherwise.
- $\beta_j$ is the difference in the linear predictor between level $j$ and the base level.

The base level has no indicator, so its effect is part of the intercept, and software reports its coefficient as 0, with 0 degrees of freedom. The intercept is the linear predictor of an observation at the base level of every categorical predictor. The base level is usually the level with the most exposure. Under a log link, $e^{\beta_j}$ is the relativity of level $j$ to the base level. Whether the predictor has any effect is tested on all $k - 1$ coefficients together, by comparing the models with and without it in a nested-model test based on the [[Deviance|deviance]].

> [!example]- Territory has levels A, B and C. A Poisson GLM with a log link uses territory A as the base level and gives $\hat{\beta}_B = 0.20$ and $\hat{\beta}_C = -0.10$. What are the relativities of B and C to A, and of C to B? {Example}
> - The relativity of territory B to A is $e^{0.20} = 1.221$.
> - The relativity of territory C to A is $e^{-0.10} = 0.905$.
> - The relativity of C to B is the exponential of the difference in their coefficients, $e^{-0.10 - 0.20} = 0.741$.

## Categorical, ordinal and continuous predictors

A predictor is entered according to its type:

| Type | Example | How it enters the model | Coefficients |
| --- | --- | --- | --- |
| Categorical (nominal) | Territory, vehicle type | An indicator for each level except the base | $k - 1$ |
| Ordinal | Credit tier, limit band | As categorical, or as one numeric score | $k - 1$, or $1$ |
| Continuous | Vehicle age, amount of insurance | One term, or banded or transformed | $1$ |

The codes of a nominal predictor, such as territory numbers, have no meaningful spacing. Entering them as one numeric predictor imposes a single slope and treats the order of the codes as meaningful, so they are entered as indicators. An ordinal predictor whose levels have unknown spacing is safest entered as indicators. It is entered as one numeric score only if its effect changes steadily from level to level. A continuous predictor is entered as one term only if its effect on the linear predictor is roughly linear. Otherwise it is banded into categories or transformed, for example by its logarithm or a polynomial.

> [!example]- Territories are stored as the codes 1 to 5, and an actuary enters the code as a numeric predictor. What does the model assume, and how should territory be entered? {Example}
> - A numeric predictor has one coefficient, so the model assumes the linear predictor changes by the same amount from each territory code to the next.
> - Territory 5 is not "more" than territory 1, so that assumption has no basis.
> - Territory should be entered as a categorical predictor with 4 indicator variables against a base territory.

## Binning a continuous predictor

Binning a continuous predictor into ranges and entering it as a categorical predictor gives each bin its own coefficient, so the model can follow an effect that is not linear. Binning has these costs:

1. It adds parameters, one for each bin after the first.
2. Each bin has less data, so its estimate is less credible and less stable.
3. It ignores the variation of the effect within a bin.
4. Nothing keeps adjacent bins consistent, so the estimates can reverse between neighbouring bins.
