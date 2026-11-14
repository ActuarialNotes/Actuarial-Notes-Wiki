---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:88229729391a80c28b9d2d8b45b2fabd7767855fa80054699c9f966d1729e333
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §2.4.3, §9.1-9.2, PDF pp.25-26, 99-101, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "Chalk et al., From GLMs to Comprehensive Insurance Pricing: Techniques and Challenges, CAS Monograph 16, 1st ed., §8.2-8.3, PDF pp.143-146, sha256:0b293634c3d6320eac9aca5d2f8ba4ca7954f20db8a462b24771c60b5e046d74 — https://www.casact.org/sites/default/files/2026-02/CAS_Monograph-16_From_GLMs.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rating Factors.md
---

A **Rating Factor** is the multiplier (occasionally an additive amount) that a [[Rating Algorithm|rating algorithm]] applies for one level of a [[Rating Variable|rating variable]]. Each is expressed relative to a base level whose factor is $1.00$, and together they turn a base rate into a risk's rate. In a multiplicative algorithm, risk $i$'s rate is

> $$\text{Rate}_i = \text{Base Rate} \times \prod_{k} f_k(v_{ik})$$

- $f_k$ is the factor for variable $k$.
- $v_{ik}$ is risk $i$'s level of variable $k$.

The variable is the characteristic, such as territory, and the factor is the number charged for one of its levels. A one-way (univariate) relativity absorbs the effects of every correlated variable, whereas a multivariate factor is net of the others, as set out under [[Classification Ratemaking|classification ratemaking]]. In the filed plan, factors are rounded and capped, and the base rate is off-balanced so the change hits the target overall rate level ([[Rating Plan|rating plan]]).

## Rating factors from a GLM

In a log-link [[Generalized Linear Model|GLM]] a level's factor is its exponentiated coefficient, and the base rate corresponds to $e^{\hat\beta_0}$ (adjusted for any offsets). The factor for level $v$ of variable $k$ is

> $$f_k(v) = e^{\hat\beta_{k,v}}$$

- $\hat\beta_{k,v}$ is the fitted coefficient of level $v$, which is $0$ at the base level.

Coefficients add on the log scale, and factors multiply on the dollar scale. Goldburd et al. advise making the base level the one with the most data, so the other levels' standard errors measure distance from a well-estimated reference.

> [!example]- What are the rating factors, and the pure premium for a youthful driver in territory 3? {Example}
> A log-link pure premium GLM gives intercept $5.70$, youthful driver $+0.47$ and territory 3 $+0.18$. The base levels are adult driver and territory 1.
>
> > [!answer]-
> > - The base rate is $e^{5.70} = \$298.87$.
> > - The youthful driver factor is $e^{0.47} = 1.600$, and the territory 3 factor is $e^{0.18} = 1.197$.
> > - The pure premium is $e^{5.70 + 0.47 + 0.18} = e^{6.35} = \$572.49$.
> > - Rounding the factors to three decimals before multiplying gives $\$572.40$ instead, which is why the filed algorithm has to specify the rounding.

## Stripping out rating factors

Some variables fit a GLM poorly. Territory is the standard case, with too many levels for a GLM (Goldburd et al., §9.2). The fix is to use the model of everything else to remove the other variables' effects before analysing that one:

1. Fit the class GLM without territory.
2. Measure each territory's actual losses against the GLM's prediction, or use that prediction as an [[Offset Variable|offset]] in a separate territory model.
3. Smooth the result spatially and weight it by credibility.
4. Feed the territory relativities back into the class GLM as an offset, so the class factors cannot proxy for location.

The monograph calls this a two-way street to be iterated ([[Territorial Rating|territorial rating]]).

> [!example]- What is territory T's relativity once the other rating factors are stripped out? {Example}
> Territory T has $3{,}000$ exposures and $\$1{,}320{,}000$ of losses, and the statewide pure premium is $\$300$. A class GLM built without territory, balanced statewide, predicts $\$1{,}100{,}000$ for T's policies. T's neighbours show an actual-to-predicted ratio of $1.10$, and T's own ratio is given credibility $0.60$.
>
> > [!answer]-
> > - T's one-way relativity is $(1{,}320{,}000/3{,}000)/300 = 1.467$.
> > - The mix of other factors in T is $(1{,}100{,}000/3{,}000)/300 = 1.222$.
> > - The stripped residual, T's actual-to-predicted ratio, is $1{,}320{,}000/1{,}100{,}000 = 1.200$.
> > - The one-way $1.467$ splits into $1.222 \times 1.200$. Most of T's high loss cost comes from who lives there, which the class factors already charge for, and only $1.20$ from where.
> > - Credibility-weighted with the neighbours, the relativity is $0.60 \times 1.200 + 0.40 \times 1.10 = 1.160$, which goes back into the class GLM as an offset.

## Factors for coverage options

Deductible, limit and peril-group factors should be set outside the GLM by loss-elimination and [[Increased Limits|ILF]] methods and entered as offsets. A factor fitted in the GLM for an option the insured chose picks up selection effects, and a higher deductible can even come out as a surcharge.

> [!trap] Using a one-way relativity as the territory factor
> A one-way territory relativity includes the effect of who lives there. In the example, using $1.467$ instead of the stripped $1.20$ would charge the class effects twice.
