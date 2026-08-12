**Report Year** (RY) is a data aggregation method that groups claims by the calendar year in which the claim was first *reported* to the insurer, regardless of when the loss occurred.

> $$\text{Report lag} = \text{Report date} - \text{Accident date}$$

- RY is the correct basis for [[Claims Made Coverage|claims-made]] coverage, because a claims-made policy's trigger *is* the report date: every claim reported during the policy period is covered by that policy, so the report year cohort and the coverage cohort coincide.
- A report year **closes to new claims** at year end — pure [[IBNR]] is zero by construction, since every claim in the cohort is already known. All remaining development is **IBNER**: re-estimation of claims already reported.
- That makes RY triangles develop faster and more smoothly than [[Accident Year]] triangles, and it makes RY the natural basis for **severity** studies: the claim count denominator is fixed, so an average-severity triangle is not distorted by late-emerging claims.
- The cost is that a report year is **not a homogeneous exposure period**. RY 2024 contains old accidents reported late alongside fresh ones; if the reporting pattern shifts, the mix of accident dates inside the cohort shifts with it, and trend measured on an RY basis is contaminated by the change.
- For occurrence coverage, report year cannot be matched to earned premium at all — the premium was earned in the accident year, not the report year — so occurrence ratemaking uses accident year and reserves for the unreported claims.

> [!example]- Report Year vs. Accident Year Under Each Coverage Trigger {Example}
> A general liability loss occurs $11/15/2023$ and is reported $2/3/2024$. The insured held an occurrence policy effective $6/1/2023$–$5/31/2024$ and, separately, a claims-made policy renewing each $1/1$.
>
> Which policy year responds, and which cohort does the claim join?
>
> > [!answer]-
> > **Accident year 2023, report year 2024.**
> >
> > - Under the **occurrence** policy, the $6/1/2023$ policy responds — the trigger is the $11/15/2023$ occurrence date. The claim is part of AY 2023, and at $12/31/2023$ it sat in that year's IBNR.
> > - Under **claims-made**, the policy in force on $2/3/2024$ responds — the $2024$ policy — provided the accident date is on or after the retroactive date. The claim belongs to RY 2024, and the $2024$ policy's premium was collected to pay it.
> >
> > The same claim is therefore priced from AY 2023 data on one contract and RY 2024 data on the other.

> [!example]- Why Severities Are Studied on a Report Year Basis {Example}
> For accident year 2024 at $12$ months, $820$ claims are reported with $\$6{,}150{,}000$ of reported losses. By $24$ months, $940$ claims are reported with $\$8{,}500{,}000$. The $120$ newly reported claims are small, late-emerging claims averaging $\$4{,}000$.
>
> What happens to the accident-year average severity, and how does a report-year view fix it?
>
> > [!answer]-
> > $$\begin{align*}
> > \text{Avg severity at 12 mo} &= \frac{\$6{,}150{,}000}{820} = \$7{,}500 \\[4pt]
> > \text{Avg severity at 24 mo} &= \frac{\$8{,}500{,}000}{940} = \$9{,}043
> > \end{align*}$$
> >
> > Severity rose $20.6\%$, but two different things are mixed into that number: genuine development on the original $820$ claims, and dilution from $120$ cheap new claims.
> >
> > Isolating the original cohort:
> >
> > $$\frac{\$8{,}500{,}000 - 120 \times \$4{,}000}{820} = \frac{\$8{,}020{,}000}{820} = \$9{,}780$$
> >
> > On a **report year** basis the denominator is frozen at the claims reported in the year, so the triangle measures IBNER on a fixed set of claims and gives the $\$9{,}780$ answer directly. This is why [[Frequency-Severity Method|frequency-severity]] analyses of average severity favour report year, while the frequency side stays on accident year.
