---
verification:
  status: stale
  confidence: null
  last_checked: 2026-09-13
  last_checked_by: agent:validate-v1
  content_hash: sha256:bfb00864f6515ef57110ba3983f7feb243bca8179afd006c08ac85aa3b94b8ac
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.2 'Rating Manuals', printed pp.13, 16, 27-28 and 31-32 (PDF pp.25, 28, 39-40, 43-44), and Ch.10 printed p.176 (PDF p.188), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/old/studynotes_werner_modlin_ratemaking.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Rating Algorithm.md
---

![[Media/Figures/Rating_Algorithm.svg|340]]

A **Rating Algorithm** is the ordered set of rules that turns a base rate and a risk's characteristics into a premium. It is part of the rating manual, and it describes in detail how the rules and rate pages combine to calculate the premium for any risk. A common form of it is

> $$\text{Premium} = \left[\text{Base Rate} \times \prod_i R_i + \sum_j A_j\right] \times (1 - D) + \text{Fees}$$

- $\text{Base Rate}$ is the rate of the base risk, a risk profile the insurer defines.
- $R_i$ are the multiplicative relativities of the [[Rating Variable|rating variables]].
- $A_j$ are additive charges, such as a flat loading.
- $D$ is a percentage discount.
- $\text{Fees}$ are flat expense fees.

The algorithm is very specific, and gives explicit instructions on:

1. The order in which the rating variables are considered.
2. How each is applied: multiplicatively, additively or by some other expression.
3. Any maximum and minimum premiums, or maximum discount.
4. Any rounding.

A product with several coverages has a separate algorithm for each.

> [!example]- The base rate is $\$500$, the territory relativity 1.20 and the class relativity 0.90. A $\$25$ policy fee is added, then a 10% paid-in-full discount is applied, then a $\$400$ minimum premium. What is the premium, and what would it be if the discount came before the fee? {Example}
> - The relativities give $500 \times 1.20 \times 0.90 = \$540.00$.
> - Adding the fee gives $540.00 + 25 = \$565.00$.
> - The discount gives $565.00 \times 0.90 = \$508.50$, above the $\$400$ minimum, so the premium is $\$508.50$.
> - With the discount before the fee, the premium is $540.00 \times 0.90 + 25 = \$511.00$.
> - The order changes the premium by $\$2.50$ on one policy, and systematically across a book, so it is filed.

## Multiplicative and additive structures

Relativities that compound are the norm for class, territory and vehicle factors, and they fall out of a log-link [[Generalized Linear Model|GLM]]. Additive charges are used for flat loadings and fees. The structure should follow how the costs actually combine. A fixed per-policy cost is additive, and a risk characteristic that scales the whole loss cost is multiplicative. An additive charge adds the same dollar amount whatever the premium it is added to. To re-rate a policy whose premium includes a flat fee, the fee is removed, the rest is multiplied by the ratio of the new combined factor to the old, and the fee is added back.

## Implementation rules in the algorithm

The algorithm also encodes the implementation rules: the [[Minimum Premium|minimum premium]] floor, expense fees, renewal rate capping, and limits on how discounts stack. Because factors interact, a change to any single relativity is evaluated through the whole algorithm on the actual book. The realized effect differs from the factor change wherever the minimum premium binds or a cap applies. A rating variable the policy administration system cannot capture, or an interaction the algorithm cannot express, cannot be used however well it models.

> [!example]- A class's relativity is raised from 0.85 to 0.95, an 11.8% increase. Of its 4,000 policies, 600 sit at the $\$400$ minimum with rated premiums averaging $\$355$. The other 3,400 average $\$620$, and renewal capping limits any increase to 10%. What premium change does the class deliver in the first year? {Example}
> - The 3,400 policies above the minimum would rise 11.8%, so the cap limits each to 10%, an average of $\$682$.
> - The rated premium of the 600 minimum-premium policies rises to $355 \times 0.95/0.85 = \$396.76$, still below the minimum, so they still pay $\$400$.
> - The current premium is $3{,}400 \times 620 + 600 \times 400 = \$2{,}348{,}000$.
> - The new premium is $3{,}400 \times 682 + 600 \times 400 = \$2{,}558{,}800$.
> - The change is $2{,}558{,}800/2{,}348{,}000 - 1 = +9.0\%$, not 11.8%.
> - The capped policies need a second year to reach the intended level, and the minimum-premium policies never get there until the minimum itself is raised.
