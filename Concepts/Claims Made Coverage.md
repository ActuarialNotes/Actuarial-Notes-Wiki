---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:846fc670f4610e8fe02e26ee6a53d2b57159ebfd33af38e9c9c98c8d443a64ce
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.16 pp.312-321 (PDF pp.324-333); Ch.2 p.26 (PDF p.38), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 pp.42-43 (PDF pp.48-49), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Claims Made Coverage.md
---

**Claims-Made Coverage** is a policy trigger under which the policy responds to claims *reported* during the policy period, provided the underlying loss occurred on or after the policy's **retroactive date**.

> $$\text{Covered if } \; \text{accident date} \ge \text{retro date} \; \text{ and } \; \text{report date} \in \text{policy period}$$

- Two conditions must hold together. The **retroactive date** caps how far back an accident may have occurred; the **policy period** fixes when the claim must be reported. A claim failing either test is not covered.
- An **extended reporting endorsement** (ERP, or "tail coverage") covers claims that occurred during the claims-made coverage period but are reported after the last policy expires — what a retiring physician, or an insured switching to an occurrence policy, needs to avoid a gap. Switching the other way, from occurrence to claims-made, the retroactive date should be coordinated with the expiration of the last occurrence policy to give complete coverage without overlap.
- Because the trigger is the report date, a claims-made policy has **no pure IBNR** — only IBNER on claims already reported — so the risk of reserve inadequacy is greatly reduced relative to the [[Occurrence Coverage|occurrence]] form.
- Claims-made business is organized on a [[Report Year]] basis: in Werner's report-year-by-lag table a claims-made policy is a row, where an occurrence policy is a diagonal. Report-year development measures only known claims, not pure IBNR.
- Rates for a claims-made programme **step up** through the maturity years. A first-year policy covers only accidents since the retro date — a thin sliver of exposure — while a mature policy covers the full reporting distribution. The steps stop once the programme is mature.
- The five principles of claims-made policies (Marker and Mohl, as set out by Werner):
  1. A claims-made policy should always cost less than an occurrence policy **as long as claim costs are increasing**.
  2. If there is a sudden, unpredictable change in the underlying trends, the claims-made policy priced on the prior trend will be closer to the correct price than an occurrence policy priced on the prior trend.
  3. If there is a sudden, unexpected shift in the reporting pattern, the cost of a **mature** claims-made policy will be affected relatively little, if at all, relative to the occurrence policy.
  4. Claims-made policies incur no liability for [[IBNR]], so the risk of reserve inadequacy is greatly reduced.
  5. The investment income earned from claims-made policies is substantially less than under occurrence policies — which the target underwriting profit provision must reflect, along with the reduced pricing risk.
- Introduced for professional liability, including medical malpractice, after the high economic and social inflation and rising claim frequency of the 1960s and 1970s left long-tailed occurrence products significantly underpriced for years before insurers noticed. Friedland lists medical malpractice, products liability, errors and omissions and directors' and officers' liability among the lines where coverage may be claims-made.

![[Media/Figures/Claims_Made_Coverage.svg|340]]

> [!example]- Applying Both Tests {Example}
> A D&O policy runs $1/1/2024$–$12/31/2024$ with a retroactive date of $1/1/2020$.
>
> Which of the following are covered?
>
> | | Accident date | Report date |
> |---|---|---|
> | (a) | $6/15/2023$ | $9/1/2024$ |
> | (b) | $6/15/2023$ | $1/15/2025$ |
> | (c) | $3/1/2019$ | $5/1/2024$ |
> | (d) | $4/2/2024$ | $8/9/2024$ |
>
> > [!answer]-
> > **(a) Covered.** Accident $6/15/2023$ is after the $1/1/2020$ retro date, and the claim is reported inside the $2024$ policy period.
> >
> > **(b) Not covered by this policy.** The report date falls in $2025$. It would attach to the $2025$ renewal (whose retro date must still reach back to $2023$), or to an ERP if one was purchased.
> >
> > **(c) Not covered.** The accident predates the retroactive date, so no claims-made policy in this programme responds regardless of when it is reported. An insured moving from occurrence coverage sets the retroactive date at the expiration of the last occurrence policy, which is the policy that covers an accident like this one.
> >
> > **(d) Covered.** Both tests pass — the ordinary case of an accident and report in the same year.

> [!example]- The Claims-Made Step Structure {Example}
> An insurer launches a claims-made medical malpractice programme. Claims report $25\%$ in the accident year, then $35\%$, $25\%$ and $15\%$ in the following three. The mature occurrence loss cost is $\$20{,}000$ per exposure.
>
> Compute the loss cost for each maturity year of the claims-made programme, ignoring trend.
>
> > [!answer]-
> > A claims-made policy in maturity year $k$ picks up the reporting-lag layers available to it. With the retro date set at inception, year $1$ can only receive accident-year reports, year $2$ receives lag-$0$ and lag-$1$, and so on:
> >
> > $$\begin{align*}
> > \text{Year 1} &= 0.25 \times \$20{,}000 = \$5{,}000 \\
> > \text{Year 2} &= 0.60 \times \$20{,}000 = \$12{,}000 \\
> > \text{Year 3} &= 0.85 \times \$20{,}000 = \$17{,}000 \\
> > \text{Year 4+ (mature)} &= 1.00 \times \$20{,}000 = \$20{,}000
> > \end{align*}$$
> >
> > The first-year policy costs a quarter of the occurrence policy — and the insured who buys it must understand that the discount is not free: it reflects genuinely narrower coverage, and leaving the programme without buying an ERP leaves the remaining $75\%$ of the exposure uninsured.
> >
> > With claim costs trending upward, Principle 1 applies to the mature step too: the mature claims-made policy costs less than the occurrence policy for the same year, because the occurrence policy's claims are reported further into the future, where trend has pushed costs higher.
