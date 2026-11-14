---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:4ff17031413f17d111cd4951e79e7f9cfb339d72d6c119cd7182c76aec03bec5
  sources:
    - "Fisher, McTaggart, Petker & Pettingell, Individual Risk Rating (CAS Study Note, v3 Oct 2019), Ch.1 §1-10, Ch.2 §1, §5, PDF pp.8-18, 21-29, sha256:3182cd5d8ebccc92be67a246e61a527acda5b304b823448d99f8a2546ca07b81 — https://www.casact.org/sites/default/files/2021-03/8_Fisher_et_al.pdf"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS, 2016), Ch.15, PDF pp.301-303, 312, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Bailey & Simon, An Actuarial Note on the Credibility of Experience of a Single Private Passenger Car (PCAS XLVI, 1959), conclusion (2), PDF p.3, sha256:3e44bb5b3d17e96aaae61b27b0d72889043c44feb049a3ca3444095101f456e2 — https://www.casact.org/sites/default/files/2021-03/8_Bailey_Simon.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Individual Risk Rating.md
---

**Individual Risk Rating** is the adjustment of one insured's premium away from the manual (class) rate, to reflect that risk's own characteristics or its own loss experience. It works either *prospectively*, through [[Experience Rating|experience]] and [[Schedule Rating|schedule rating]], or *after the policy period*, through [[Retrospective Rating|retrospective rating]] and other [[Loss Sensitive Rating|loss-sensitive plans]]. With $M$ the risk's modification, its premium is

> $$\text{Standard Premium} = \text{Manual Premium} \times M$$

In experience rating, the modification is

> $$M = Z\,\frac{A}{E} + (1 - Z)$$

> $$M = \frac{A + K}{E + K}$$

- $A$ is the risk's actual (usually capped) losses, its [[Risk Experience|own experience]].
- $E$ is the losses expected for a risk of its [[Rating Class|class]] and size.
- $Z = E/(E + K)$ is the credibility given to the risk's experience.
- $K$ is the [[Bühlmann Credibility|Bühlmann]] ratio of the expected process variance to the variance of the hypothetical means, in units of expected loss.

As the study note requires, $Z$ lies between 0 and 1 and never falls as $E$ grows, while $Z/E$ falls. A loss of a given size therefore moves a large risk's mod less than a small one's.

> [!example]- What are the two risks' experience mods? {Example}
> A plan uses $Z = E/(E + K)$ with $K = \$50{,}000$. Two risks in the same class both ran at $70\%$ of expected losses: a small risk with $E = \$10{,}000$ and $A = \$7{,}000$, and a large risk with $E = \$500{,}000$ and $A = \$350{,}000$.
>
> > [!answer]-
> > - The small risk's mod is $(7{,}000 + 50{,}000)/(10{,}000 + 50{,}000) = 0.950$.
> > - The large risk's mod is $(350{,}000 + 50{,}000)/(500{,}000 + 50{,}000) = 0.727$.
> > - Their credibilities are $Z = 10/60 = 0.167$ and $Z = 500/550 = 0.909$.
> > - The same relative experience earns the small risk a $5\%$ credit and the large one a $27\%$ credit. The small risk's good year is mostly noise, and the large risk's volume makes its record a signal about its hazard.

## Reasons for individual risk rating

No class is perfectly [[Homogeneity|homogeneous]]: experience rating picks up the variance of the hypothetical means *within* a class. It improves equity, strengthens the incentive for loss control, and makes more risks acceptable to write. A mod is a prospective estimate of loss potential, not a charge-back for past losses. Bailey and Simon found that the more refined the class plan, the less credibility individual experience deserves.

## Individual risk rating by size of risk

From the smallest risks to the largest, the plans run:

1. Manual rating.
2. Schedule and experience modification.
3. Retrospective rating or large deductibles.
4. Loss rating and self-insurance.

Each step moves more of the risk, and more of the premium's sensitivity to actual losses, onto the insured ([[Commercial Lines Rating]]).

## Design features of an experience rating plan

A plan sets a maximum single loss or a primary/excess split (the NCCI plan weights primary losses more heavily, since they signal frequency). It also sets minimum and maximum mods, the experience period, and rules against double-counting a feature through both a schedule credit and the mod.

## Off-balance

The average mod written, $\bar{M}$, is

> $$\bar{M} = \frac{\text{Total Standard Premium}}{\text{Total Manual Premium}}$$

If the mods actually written average below $1.00$, manual rates must be loaded by an off-balance factor of $1/\bar{M}$ so the plan collects the required premium. Mods can average below $1.00$ when debit-mod risks leave for competitors or the residual market, or because of plan features that discount some losses. Whether the mods separate risks correctly is tested with the quintiles and efficiency tests of a [[Rating Plan|rating plan]].

> [!example]- What happens to this book's collected premium, and what is the fix? {Example}
> Class rates are set so that total manual premium of $\$10$M equals the required premium. On the business actually written, $\$4$M of manual premium is below the eligibility threshold and unrated. $\$5$M carries credit mods averaging $0.85$, and $\$1$M carries debit mods averaging $1.15$.
>
> > [!answer]-
> > - The standard premium is $4.0(1.00) + 5.0(0.85) + 1.0(1.15) = \$9.40$M.
> > - The average mod is $\bar{M} = 9.40/10.0 = 0.94$.
> > - The book collects $\$9.4$M against a $\$10$M need, a $6\%$ shortfall that no individual mod reveals.
> > - The off-balance factor is $1/0.94 = 1.064$, so the manual rates must be loaded by $6.4\%$.
> > - The off-balance has to be measured and reflected in each rate review.

> [!trap] Taking the mod as actual over expected losses
> The mod gives the risk's experience only partial credibility, so it is not $A/E$. The small risk above ran at $A/E = 0.70$, and its mod is $0.95$.
