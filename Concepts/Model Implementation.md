---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-17
  last_checked_by: agent:validate-v1
  content_hash: sha256:3dbe54b7cd291dfaabb47a12cb30d59da3d955aaa3f054b25048a3c76021486d
  sources:
    - "Goldburd, Khare, Tevet & Guller, Generalized Linear Models for Insurance Rating, CAS Monograph 5, 2nd ed. (2025 revision), §3.2, §3.8-3.9, §9.1, PDF pp.42-44, 99-100, sha256:89b203ea55208911c4d8f6ef1ede4dd6c0206d47999b5e8aff96fe233c0ff757 — https://www.casact.org/sites/default/files/2021-01/05-Goldburd-Khare-Tevet.pdf"
    - "FSCO, Technical Notes for Automobile Insurance (Oct 2016), §16, PDF p.8, sha256:b2ca7a6cdf4e19924f8f4dcb0e2890d723ba9ee3bcd31c31277e72a298f6d2a0 — https://www.casact.org/sites/default/files/2022-05/6C_FSCOTechNotes_102016.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Model Implementation.md
---

**Model Implementation** is turning a validated model into a [[Rating Plan|rating plan]] that can be filed, programmed, sold and maintained. The fitted relativities become [[Rating Factors|rating factors]] in a [[Rating Algorithm|rating algorithm]]. They are adjusted for regulatory, systems and market constraints, balanced to the intended overall [[Rate Change|rate change]], and phased in so that no policyholder's premium moves too far at once.

To deliver an intended overall change $\Delta$ with new relativities, the new base rate is

> $$B_{\text{new}} = B_{\text{current}} \times \frac{1 + \Delta}{\text{OB}}$$

- $B_{\text{current}}$ is the current base rate.
- $\text{OB}$ is the **off-balance**, how much the new relativities alone would move average premium.

Dividing out the off-balance makes the plan deliver $\Delta$. The off-balance is

> $$\text{OB} = \frac{\sum_j w_j R_j^{\text{new}}}{\sum_j w_j R_j^{\text{current}}}$$

- $R_j^{\text{new}}$ and $R_j^{\text{current}}$ are the proposed and current relativities of level $j$.
- $w_j$ is the exposure weight of level $j$.

> [!example]- What new base rate delivers this change, and what overall change is achieved if increases are capped at $+10\%$? {Example}
> The current base rate is $\$500$ and the overall target is $+3\%$. A three-level variable is being revised:
>
> | Level | Exposures | Current relativity | Proposed relativity |
> | :--- | ---: | ---: | ---: |
> | 1 | 50% | 1.00 | 1.00 |
> | 2 | 30% | 1.20 | 1.35 |
> | 3 | 20% | 1.50 | 1.40 |
>
> > [!answer]-
> > - The off-balance is $\text{OB} = 1.185/1.160 = 1.0216$.
> > - The new base rate is $\$500 \times 1.03/1.0216 = \$504.14$.
> > - The premiums by level become $\$504.14$ against $\$500$ ($+0.8\%$), $\$680.58$ against $\$600$ ($+13.4\%$), and $\$705.79$ against $\$750$ ($-5.9\%$).
> > - Weighted by exposure, the average premium is $\$597.40$ against $\$580$, which is $+3.0\%$.
> > - With a $+10\%$ cap, Level 2 pays $\$660$, and the average premium is $0.5(504.14) + 0.3(660) + 0.2(705.79) = \$591.23$.
> > - The capped plan achieves only $+1.9\%$, about $1.1$ points short of the indication.

## From model to rating plan

The [[Generalized Linear Models for Insurance Rating (Goldburd et al. - 2020)|GLM monograph]] makes three points about turning a model into a plan:

1. The plan must be clear, leaving no ambiguity about which class a risk falls in.
2. A factor that is in the plan but not in the model, such as a new safe-driving discount, may overlap variables that were modelled, and needs a judgmental adjustment.
3. Coverage options (deductibles, [[Increased Limits|increased limits]], peril groups) should be priced outside the GLM by loss-elimination methods and entered as [[Offset Variable|offsets]].

> [!example]- Should this GLM's deductible factor be implemented? {Example}
> A pure premium GLM that includes deductible as a variable returns a highly significant factor of $1.08$ for the $\$1{,}000$ deductible relative to $\$500$.
>
> > [!answer]-
> > - No. Charging more for less coverage cannot be right as a price.
> > - The coefficient is picking up selection effects, not loss elimination. Insureds who choose high deductibles may have a greater appetite for risk, or underwriters may have required a higher deductible on risks they judged worse.
> > - The GLM predicts well for the existing book, but a deductible factor that departs from pure loss elimination would change which options future buyers choose, so the pattern would not repeat.
> > - The monograph's remedy is to derive deductible factors outside the GLM from a loss elimination analysis and include them as an offset, so the other variables are fitted around a fixed deductible structure.

## Stakeholder constraints

Regulators may prohibit or restrict variables, and the rules vary by jurisdiction ([[Risk Classification Restrictions|risk classification restrictions]], [[Unfair Discrimination|unfair discrimination]]). IT systems limit what the rating engine can compute, and programming costs money. Agents and underwriters have to be able to explain and sell the plan. The monograph advises raising these constraints early, because they can change the model itself. The wider [[Considerations for Implementing Rates|considerations for implementing rates]] apply as well.

## Dislocation and transition

Before filing, each policy's premium is compared under the current and proposed plans. Large movements are capped and the rest is phased in over later renewals. The capped shortfall makes the achieved change smaller than the indicated one. The insurer either accepts the shortfall and moves the capped policies the rest of the way at the next renewal, or raises the base rate further, which pushes more of the increase onto the uncapped levels.

## Maintenance

A model's accuracy decays as the world changes. It should be **refreshed** (recalibrated on newer data) between full rebuilds, and monitored after launch with [[Actual vs Expected Analysis|actual vs. expected]] results by segment.
