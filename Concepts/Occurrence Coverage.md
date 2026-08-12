**Occurrence Coverage** is a policy trigger under which the policy responds to losses that *occur* during the policy period, however long afterwards the claim is reported.

> $$\text{Covered if } \; \text{effective date} \le \text{accident date} \le \text{expiration date}$$

- The occurrence form gives the insured permanent, automatic "tail" protection: once a policy period has been covered, every loss occurring in it is covered forever, with no need for an extended reporting endorsement.
- The insurer bears the mirror image of that promise. It must reserve for **pure [[IBNR]]** — claims it has no knowledge of — for as long as claims from expired policies can still emerge, which in liability lines is decades.
- Occurrence business is aggregated on an [[Accident Year]] basis, because the accident date is the trigger and premium is earned over the occurrence period.
- Pricing an occurrence policy requires projecting loss costs to the future *accident* period and then developing them to ultimate — two adjustments that compound the uncertainty relative to [[Claims Made Coverage|claims-made]], which is why occurrence rates for the same exposure are higher.
- General liability, auto liability, workers compensation and most personal lines are written on an occurrence basis. Professional liability moved largely to claims-made precisely because occurrence-form IBNR proved unpriceable in the malpractice crises of the 1970s and 80s.

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
> > $$\$1{,}000 \times 1.06^{2} = \$1{,}124$$
> >
> > **Claims-made (mature).** The policy covers claims *reported* in $2026$, which arise from accidents in $2026$, $2025$, $2024$ and $2023$ in the proportions above. The average accident date is therefore earlier:
> >
> > $$\begin{align*}
> > \text{Avg lag} &= 0.4(0) + 0.3(1) + 0.2(2) + 0.1(3) \\
> > &= 1.0 \text{ year} \\[4pt]
> > \text{Cost} &= \$1{,}000 \times 1.06^{2 - 1.0} \\
> > &= \$1{,}060
> > \end{align*}$$
> >
> > The mature claims-made policy is about $6\%$ cheaper — one year of trend — because its claims come from older, cheaper accident years. In a first-year claims-made policy the gap is far larger, since only accidents on or after the retroactive date can attach.
> >
> > The occurrence form's extra cost is the price of the permanent tail, and it is the reason claims-made rates rise year by year as the retroactive period matures.
