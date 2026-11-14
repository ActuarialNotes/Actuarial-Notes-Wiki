---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:92e959ebbab34af7b730ace4d5af94d0947ea346dcb7eb600872b1c9329dd831
  sources:
    - "ASOP No. 12, Risk Classification (Actuarial Standards Board, Dec 2005, doc. 132), §3.2.1-3.2.5, PDF pp.9-10, sha256:7d4f2631a589bac24cf34b1f622e95aa7bfa979aaca96de27c651099c0b12dc7 — https://www.actuarialstandardsboard.org/wp-content/uploads/2014/02/asop012_132.pdf"
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §3.8-3.9, §5.3, §7.2.2, §9.1, PDF pp.43-44, 57, 88-89, 99-100, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rating Variable.md
---

A **Rating Variable** is a characteristic of the insured, the insured object or the coverage, such as driver age, territory, construction, payroll class or deductible, whose level decides which [[Rating Factors|rating factor]] a risk receives. Together, the rating variables define the [[Rating Class|rating classes]].

With a base rate $B$ and $K$ rating variables, the rate for risk $i$ is

> $$\text{Rate}_i = B \times \prod_{k=1}^{K} R_k(v_{ik})$$

- $v_{ik}$ is risk $i$'s level of variable $k$.
- $R_k(v_{ik})$ is the factor for that level.

> [!example]- The base rate is $\$500$. A driver's age factor is $1.20$ and their territory factor is $0.90$. What is their rate? {Example}
> - The rate is the base rate times the factor for each of the driver's levels.
> - $\text{Rate} = 500 \times 1.20 \times 0.90 = \$540$.

## Criteria for a good rating variable

A good rating variable meets these criteria (Werner & Modlin's grouping is under [[Classification Ratemaking]]):

1. It is statistically related to expected losses. A causal story strengthens the case, but [[ASOP 12 - Risk Classification (ASB - 2005)|ASOP No. 12]] does not require one.
2. It is objective and hard to manipulate.
3. It is practical to collect and verify.
4. It is legal ([[Risk Classification Restrictions]], [[Unfair Discrimination]]) and socially acceptable.

A strong model coefficient does not by itself make a usable rating variable.

> [!example]- Self-reported annual mileage is strongly predictive in a personal auto insurer's GLM. Should it be a rating variable? {Example}
> - It passes the actuarial test. Exposure to driving plausibly drives loss frequency, the signal is statistically significant, and it is not already captured by other variables.
> - It fails the operational test. The insured reports the figure, has every reason to under-report it, and the insurer cannot cheaply verify it.
> - A variable the insured controls *by statement* is manipulable. That erodes the factor over time, as low-mileage declarations rise without losses following.
> - It passes the social test. It is controllable by the insured, causally intuitive and not a proxy for a protected class.
> - It is generally permitted by law, subject to local rules.
> - Adopt it only in a verifiable form, such as odometer readings at renewal or telematics, or with a moderated factor and audit rights.

## Coverage options

Coverage options, such as the deductible and the limit, are variables the insured *chooses*. Their factors belong outside the fitted model, set by loss elimination and entered as offsets, so that selection effects do not leak into them.

## Rating variables in a model

A continuous variable may be transformed, binned or fitted with polynomials or splines. A categorical one uses the levels of a [[Categorical Predictor|categorical predictor]], possibly with [[Interaction|interactions]]. A variable with hundreds of levels needs grouping, credibility (random effects) or a separate model ([[High Dimensional Variables]], [[Workers Compensation Classification]]).

A model's variables are benchmarked against the current plan or a competing model, for example with a [[Double Lift Chart|double lift chart]] ([[Model Benchmarking]]). A model is recalibrated by refreshing its coefficients on newer data while keeping its structure. Models lose accuracy as the world changes, so they are also rebuilt periodically. To be implemented, a variable must be obtainable at the point of sale, and the resulting factors are capped, rounded, off-balanced and checked for dislocation ([[Model Implementation]]).

## Revising a variable's factors without changing the rate level

When a variable's factors are revised and the overall rate level is to stay unchanged, the new base rate is

> $$B_{\text{new}} = B_{\text{old}} \times \frac{\bar{R}_{\text{old}}}{\bar{R}_{\text{new}}}$$

- $\bar{R}_{\text{old}}$ and $\bar{R}_{\text{new}}$ are the exposure-weighted average factors across the book under the current and revised factors.

> [!example]- What base-rate adjustment keeps this vehicle-age recalibration revenue-neutral, and how does each level's premium change? {Example}
> Vehicle-age factors are refitted on newer data:
>
> | Vehicle age | Exposure share | Current factor | Revised factor |
> | :--- | ---: | ---: | ---: |
> | New (base) | 30% | 1.00 | 1.00 |
> | 3–7 years | 45% | 0.88 | 0.92 |
> | 8+ years | 25% | 0.80 | 0.85 |
>
> > [!answer]-
> > - $\bar{R}_{\text{old}} = 0.30 + 0.45(0.88) + 0.25(0.80) = 0.8960$.
> > - $\bar{R}_{\text{new}} = 0.30 + 0.45(0.92) + 0.25(0.85) = 0.9265$.
> > - The base rate is multiplied by $0.8960/0.9265 = 0.9671$.
> > - New vehicles change by $0.9671 - 1 = -3.3\%$.
> > - Ages 3–7 change by $\tfrac{0.92}{0.88} \times 0.9671 - 1 = +1.1\%$.
> > - Ages 8+ change by $\tfrac{0.85}{0.80} \times 0.9671 - 1 = +2.8\%$.
> > - Weighted by current premium, these net to zero. New-vehicle owners still get a decrease that their own factor did not earn, and that dislocation is reviewed before implementation.

> [!trap] Inverting the off-balance factor
> The base rate is multiplied by the current average factor over the revised one. If the revised factors average higher, the base rate must come down. Using $0.9265/0.8960 = 1.034$ in the example would raise the overall rate level by about 7% instead of holding it.
