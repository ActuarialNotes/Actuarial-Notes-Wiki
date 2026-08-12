**Calendar Year** (CY) is a data aggregation method that groups every transaction by the calendar year in which it is *booked* — premium as it is earned, losses as they are paid or as case reserves change — without regard to the policy's effective date or the claim's accident date.

> $$\text{CY Earned Premium} = \text{Written Premium} - \Delta\text{UEP}$$

> $$\text{CY Incurred Losses} = \text{Paid} + \Delta\text{Case Reserves} + \Delta\text{IBNR}$$

- $\Delta\text{UEP}$ is the change in the [[Unearned Premium|unearned premium reserve]] over the year; $\Delta$ terms are ending balance minus beginning balance.
- CY is the **financial reporting** basis: it is what the income statement, the [[Combined Ratio|combined ratio]] and Schedule P Part 1 report, and it is available immediately after the year closes with no estimation of "which cohort does this belong to".
- A calendar year **never develops** — it is closed and fixed the moment the books close. That is its one advantage and the source of its central defect.
- CY incurred losses **mix accident years**: a CY 2024 figure contains payments and reserve changes on claims from $2024$ and from every prior year. A single large reserve strengthening on a $2018$ claim lands entirely in CY 2024 and contaminates the CY 2024 loss ratio.
- Because of that mixing, a CY loss ratio is a **profitability** measure, not a pricing measure. Ratemaking uses [[Accident Year]] or [[Policy Year]] losses against on-level earned premium — see [[Ratemaking Data Organization]].
- CY premium is unambiguous and is used everywhere: CY earned premium is the same number under CY, AY and (with more work) PY loss aggregation, so "calendar/accident year" data — CY premium against AY losses — is the standard ratemaking pairing.

![[Media/Figures/Calendar_Year.svg|340]]

> [!example]- Calendar Year Earned Premium from Written Premium {Example}
> An insurer writes $\$5{,}000{,}000$ of $12$-month policies during calendar year $2024$. The unearned premium reserve was $\$1{,}800{,}000$ at $12/31/2023$ and $\$2{,}400{,}000$ at $12/31/2024$.
>
> Calculate CY 2024 earned premium, and explain what the change in UEP says about the book.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{CY 2024 EP} &= \text{WP} - (\text{UEP}_{\text{end}} - \text{UEP}_{\text{begin}}) \\
> > &= \$5{,}000{,}000 - (\$2{,}400{,}000 - \$1{,}800{,}000) \\
> > &= \$5{,}000{,}000 - \$600{,}000 \\
> > &= \$4{,}400{,}000
> > \end{align*}$$
> >
> > Written premium exceeds earned premium because the unearned reserve grew: the book is **growing** (or prices rose). In a shrinking book the UEP falls and earned premium exceeds written premium.

> [!example]- How a Prior-Year Reserve Change Distorts the Calendar Year {Example}
> An insurer's CY 2024 results: paid losses $\$7{,}200{,}000$; case reserves $\$5{,}000{,}000$ at $12/31/2023$ and $\$6{,}100{,}000$ at $12/31/2024$; IBNR $\$3{,}000{,}000$ at $12/31/2023$ and $\$3{,}400{,}000$ at $12/31/2024$. Of the reserve movement, $\$900{,}000$ is adverse development on accident years $2021$ and prior. Earned premium is $\$12{,}000{,}000$.
>
> Compute the CY 2024 loss ratio and comment on its use for ratemaking.
>
> > [!answer]-
> > $$\begin{align*}
> > \text{CY incurred} &= 7{,}200{,}000 + (6{,}100{,}000 - 5{,}000{,}000) \\
> > &\quad + (3{,}400{,}000 - 3{,}000{,}000) \\
> > &= \$8{,}700{,}000 \\[4pt]
> > \text{CY 2024 LR} &= \frac{\$8{,}700{,}000}{\$12{,}000{,}000} \\
> > &= 72.5\%
> > \end{align*}$$
> >
> > Stripping the prior-year strengthening:
> >
> > $$\frac{\$8{,}700{,}000 - \$900{,}000}{\$12{,}000{,}000} = 65.0\%$$
> >
> > The $7.5$ point gap is entirely about accident years $2021$ and prior. Using $72.5\%$ to set $2026$ rates would charge today's policyholders for a five-year-old reserving miss — the reason a rate indication is built on accident-year losses developed to ultimate, not on the calendar year the accountants report.
