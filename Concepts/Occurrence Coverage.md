---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:fc7b3abdf29b8e2ea01f6a123b4540913040f470332512e921f8983c6e035704
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.16 pp.312-319 (PDF pp.324-331), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Occurrence Coverage.md
---

**Occurrence Coverage** is a policy trigger under which the policy responds to losses that *occur* during the policy period, however long afterwards the claim is reported.

> $$\text{Covered if } \; \text{effective date} \le \text{accident date} \le \text{expiration date}$$

- The occurrence form gives the insured automatic "tail" protection: a loss occurring in the policy period is covered regardless of when the claim is reported, with no need for an extended reporting endorsement.
- The insurer bears the mirror image of that promise. It must reserve for **pure [[IBNR]]** — claims it has no knowledge of — for as long as claims from expired policies can still emerge, which for a product like medical malpractice can be many years.
- Occurrence business is aggregated on an [[Accident Year]] basis, because the accident date is the trigger: in Werner's report-year-by-lag table an occurrence policy is a diagonal.
- Pricing an occurrence policy means projecting claims that may not be reported, let alone settled, for many years, where a [[Claims Made Coverage|claims-made]] price needs only the claims reported in the coming policy period — so the pricing risk is greater. And as long as claim costs are increasing, the occurrence policy costs more than the claims-made one (Principle 1 of claims-made policies).
- Claims-made coverage was introduced as the alternative for professional liability, including medical malpractice, after high economic and social inflation and rising claim frequency in the 1960s and 1970s left long-tailed occurrence products significantly underpriced for years before insurers recognized it.

![[Media/Figures/Occurrence_Coverage.svg|340]]

> [!example]- Occurrence and Claims-Made on the Same Loss {Example}
> A general liability policy runs $1/1/2024$–$12/31/2024$. A customer slips and falls on $8/10/2024$ but does not present a claim until $3/15/2026$.
>
> Does the policy respond under an occurrence form? Under a claims-made form?
>
> > [!answer]-
> > **Occurrence form: covered.** The accident date $8/10/2024$ falls inside the policy period, so the $2024$ policy responds. The $2026$ report date is irrelevant to coverage — though it means the insurer carried this claim in AY 2024 IBNR for nineteen months.
> >
> > **Claims-made form: not covered by the $2024$ policy.** The trigger is the report date, which falls in $2026$. The claim would attach to the policy in force on $3/15/2026$ provided the $8/10/2024$ accident date is on or after that policy's **retroactive date**. If the insured let coverage lapse at the end of $2024$ and bought no extended reporting period, the claim is uninsured.

> [!example]- Why the Occurrence Form Costs More {Example}
> A liability exposure has an expected loss cost of $\$1{,}000$ per year in $2024$ terms, with annual loss trend of $6\%$. Claims report over four years: $40\%$ in the accident year, then $30\%$, $20\%$ and $10\%$.
>
> An insurer prices a $2026$ policy year on both forms. Ignore expenses and discounting.
>
> > [!answer]-
> > **Occurrence.** The policy covers accidents in $2026$, whose average accident date is mid-$2026$ — two years of trend from the mid-$2024$ base:
> >
> > $$\$1{,}000 \times 1.06^{2} = \$1{,}123.60$$
> >
> > **Claims-made (mature).** The policy covers claims *reported* in $2026$, which arise from accidents in $2026$, $2025$, $2024$ and $2023$ in the proportions above. The average accident date is therefore earlier:
> >
> > Weight each accident year's cost by its share of the claims reported in $2026$:
> >
> > $$\begin{align*}
> > \text{Cost} &= \$1{,}000 \times \left[0.4(1.06^{2}) + 0.3(1.06^{1}) + 0.2(1.06^{0}) + 0.1(1.06^{-1})\right] \\
> > &= \$449.44 + \$318.00 + \$200.00 + \$94.34 \\
> > &= \$1{,}061.78
> > \end{align*}$$
> >
> > The mature claims-made policy is about $5.5\%$ cheaper ($1{,}061.78 / 1{,}123.60 - 1$) — close to one year of trend, since the average reporting lag is $0.4(0) + 0.3(1) + 0.2(2) + 0.1(3) = 1.0$ year — because its claims come from older, cheaper accident years. (Putting the average lag in the exponent, $\$1{,}000 \times 1.06^{1.0} = \$1{,}060$, slightly understates the cost.) In a first-year claims-made policy the gap is far larger, since only accidents on or after the retroactive date can attach — which is why claims-made rates step up year by year until the policy is mature.
