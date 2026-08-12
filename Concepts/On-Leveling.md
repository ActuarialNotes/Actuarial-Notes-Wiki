**On-Leveling** is the procedure that restates historical earned premium to the current rate level, producing [[On Level Premium|on-level premium]]. Werner & Modlin give two methods: the **parallelogram method**, which works from aggregate premium and the dates of past [[Rate Change|rate changes]], and **extension of exposures**, which re-rates every historical policy under the current manual.

> $$\text{On-Level Factor} = \frac{\text{Current cumulative index}}{\text{Average index for the year}}$$

**The parallelogram method.** Picture a unit square whose horizontal axis is calendar time and whose vertical axis is the fraction of the policy term elapsed. A rate change effective on date $d$ enters as a diagonal line; each region's **area** is the share of the year's earned premium written at that rate level.

- For **annual** policies written uniformly, a rate change effective at time $p$ through year $Y$ earns over a triangle of area $\tfrac{1}{2}(1-p)^2$ in year $Y$ — so a $7/1$ change affects only $0.125$ of that year's earned premium, and a $1/1$ change affects $0.500$.
- The method's assumptions are its weaknesses: premium written **uniformly** through the year, a **single** policy term, and rate changes applied uniformly to all risks. Seasonal writing (crop, some property) or a mid-year term change breaks it.
- **Extension of exposures** has none of those assumptions — it simply re-rates each historical policy at today's rates — and it automatically captures distributional shifts. Its cost is data: policy-level detail for every historical year, and a rating engine that still knows the old policies' characteristics.
- A special case: if the rate change applies to **in-force** policies rather than only new and renewal business, the parallelogram geometry no longer holds and the change is treated as effective immediately across the whole book.
- On-levelling handles rate changes only; changes in the average risk being written are [[Premium Trend|premium trend]], and law amendments or benefit-level changes are handled by a separate law-level adjustment on the loss side.

> [!example]- Parallelogram Factor for a Mid-Year Change {Example}
> Rates increased $12\%$ effective $7/1/2023$ for policies written on or after that date. All policies are annual and premium is written uniformly. There have been no other changes.
>
> Compute the on-level factor for calendar year $2023$ and for calendar year $2024$.
>
> > [!answer]-
> > Set the pre-change index at $1.000$, so the current index is $1.120$.
> >
> > **CY 2023.** The change takes effect at $p = 0.5$, so the area earned at the new level is
> >
> > $$\tfrac{1}{2}(1 - 0.5)^2 = 0.125$$
> >
> > $$\begin{align*}
> > \text{Avg index}_{2023} &= 0.875(1.000) + 0.125(1.120) \\
> > &= 1.0150 \\[4pt]
> > \text{OLF}_{2023} &= \frac{1.120}{1.0150} = 1.1034
> > \end{align*}$$
> >
> > **CY 2024.** By symmetry, the portion of $2024$ still earning at the *old* level is the complementary triangle, $\tfrac{1}{2}(0.5)^2 = 0.125$:
> >
> > $$\begin{align*}
> > \text{Avg index}_{2024} &= 0.125(1.000) + 0.875(1.120) \\
> > &= 1.1050 \\[4pt]
> > \text{OLF}_{2024} &= \frac{1.120}{1.1050} = 1.0136
> > \end{align*}$$
> >
> > Calendar year $2025$ would be fully at the new level, with an on-level factor of $1.000$. Notice how a single mid-year change takes two full years to work through earned premium — the reason rate changes feel slow to show up in results.

> [!example]- When the Parallelogram Method Breaks {Example}
> A crop insurer writes $80\%$ of its annual policies in March and the rest through the year. It took a $+15\%$ rate change effective $7/1/2024$.
>
> Should the parallelogram method be used?
>
> > [!answer]-
> > **No.** The method assumes premium is written uniformly, and it is not: by $7/1$ this book has already written most of its year at the old rates. The parallelogram formula would say $12.5\%$ of CY 2024 earned premium is at the new level; the true figure is close to zero for the March cohort's remaining term and only the small tail of later writings is affected.
> >
> > Two valid alternatives:
> >
> > 1. **Extension of exposures** — re-rate the historical policies at current rates. Exact, and it also picks up the mix shift, at the cost of policy-level data.
> > 2. **Adjust the parallelogram weights empirically** — replace the geometric areas with the actual earned-premium distribution by month from the insurer's own records, then weight the indices by those shares.
> >
> > The general rule: the parallelogram method is a shortcut that substitutes geometry for data. When the writing pattern is known to violate uniformity — seasonal lines, a book in rapid growth, a mid-year change in policy term — use the data instead.
