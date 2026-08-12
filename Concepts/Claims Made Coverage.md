**Claims-Made Coverage** is a policy trigger under which the policy responds to claims *reported* during the policy period, provided the underlying loss occurred on or after the policy's **retroactive date**.

> $$\text{Covered if } \; \text{accident date} \ge \text{retro date} \; \text{ and } \; \text{report date} \in \text{policy period}$$

- Two conditions must hold together. The **retroactive date** caps how far back an accident may have occurred; the **policy period** fixes when the claim must be reported. A claim failing either test is not covered.
- An **extended reporting period** (ERP, or "tail coverage") lets an insured report, after the policy expires, claims arising from occurrences during the covered window. Its mirror image is **prior acts** ("nose") coverage, which moves a new policy's retroactive date back to pick up a predecessor policy's exposure.
- Because coverage closes at expiry, a claims-made policy year has **no pure IBNR** — only IBNER on claims already reported. Development is faster, reserves are smaller, and estimates are far more stable than on the [[Occurrence Coverage|occurrence]] form.
- Claims-made business is organized on a [[Report Year]] basis: the report year *is* the coverage cohort, so losses and earned premium match exactly.
- Rates for a claims-made programme **step up** through the maturity years. A first-year policy covers only accidents since the retro date — a thin sliver of exposure — while a mature policy covers the full reporting distribution. The steps stop once the programme is mature.
- Werner's principles for claims-made pricing: a claims-made policy should always cost less than an occurrence policy for the same exposure; if the reporting pattern is stable, the claims-made rate is less sensitive to the reporting-pattern assumption; and claims-made policies incur no liability for [[IBNR]] beyond the reported claims, so the insurer's exposure to unexpected reporting-pattern shifts falls on the insured instead.
- Standard in professional liability — medical malpractice, D&O, E&O, lawyers' and architects' liability — where occurrence-form IBNR proved unpriceable.

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
> > **(c) Not covered.** The accident predates the retroactive date, so no claims-made policy in this programme responds regardless of when it is reported. This is the gap that prior-acts coverage is bought to fill.
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
> > With trend included, each step is also multiplied by one year's trend, so a mature claims-made rate still sits below the occurrence rate by roughly the average reporting lag's worth of trend.
