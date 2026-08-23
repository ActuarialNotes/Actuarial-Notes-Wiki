---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:823b159ad34e0ffe6bc52417b151eeceb3d5dcb0477a19539c9442ec3665bda1
  sources: []
  open_findings: 0
  log: .verify/Concepts/Earned Exposure.md
---

**Earned Exposure** is the portion of written exposure for which coverage has actually been provided during the period — the exposure analogue of [[Earned Premium|earned premium]], and the correct denominator for a pure premium.

> $$\text{Earned Exposure} = \text{Written Exposure} - \Delta\text{Unearned Exposure}$$

> $$\text{Pure Premium} = \frac{\text{Losses}}{\text{Earned Exposures}}$$

- A $12$-month policy contributes **one** earned car-year in total, spread pro rata over its term: written the day it is issued, earned $1/12$ per month, in force from effective date to expiry.
- Losses in the numerator and exposures in the denominator must cover the **same period**. Accident-year losses over written exposures inflates the denominator in a growing book and understates the pure premium — the same mismatch that makes written premium wrong for a loss ratio.
- With policies written **uniformly** through the year, a calendar year earns roughly half of that year's written exposure plus half of the prior year's. In a steady-state book the two halves are equal and earned $\approx$ written; in a growing book earned lags written.
- Exposures must be earned on a basis consistent with the premium: if premium is earned pro rata, so are exposures. Lines with strongly seasonal risk (crop, some property covers) may earn premium on a non-uniform schedule, and exposures follow the same schedule.
- Earned exposures are also the weights in classification analysis and the denominator of [[Frequency|claim frequency]], so an error here propagates through the entire indication.

![[Media/Figures/Earned_Exposure.svg|340]]

> [!example]- Calendar Year Earned Car-Years {Example}
> An insurer writes $1{,}200$ annual auto policies during $2024$ — $100$ on the first of each month — and wrote no business before $2024$.
>
> How many car-years are earned in calendar year $2024$?
>
> > [!answer]-
> > The January cohort earns $12/12$ of a year, the February cohort $11/12$, and so on down to the December cohort's $1/12$:
> >
> > $$\begin{align*}
> > \text{Earned} &= 100 \times \frac{12 + 11 + \cdots + 1}{12} \\
> > &= 100 \times \frac{78}{12} \\
> > &= 650 \text{ car-years}
> > \end{align*}$$
> >
> > Written exposure for $2024$ is $1{,}200$ car-years, so the year earns $54.2\%$ of what it wrote. The remaining $550$ car-years are unearned at $12/31/2024$ and earn during $2025$.
> >
> > Using $1{,}200$ as the denominator of the $2024$ pure premium would understate loss cost by nearly half.

> [!example]- Earned Exposure in a Growing Book {Example}
> An insurer writes annual policies uniformly and grows steadily:
>
> | Year | Written car-years |
> |---|---|
> | $2023$ | $10{,}000$ |
> | $2024$ | $12{,}000$ |
>
> Accident year 2024 losses are $\$4{,}500{,}000$. Compute the AY 2024 pure premium.
>
> > [!answer]-
> > With uniform writings and annual terms, a calendar year earns half of its own writings and half of the prior year's:
> >
> > $$\begin{align*}
> > \text{Earned}_{2024} &= 0.5 \times 12{,}000 + 0.5 \times 10{,}000 \\
> > &= 11{,}000 \text{ car-years} \\[6pt]
> > \text{Pure premium} &= \frac{\$4{,}500{,}000}{11{,}000} \\
> > &= \$409.09
> > \end{align*}$$
> >
> > Had written exposure ($12{,}000$) been used, the pure premium would come out at $\$375.00$ — an $8\%$ understatement, entirely an artefact of growth. The faster the book grows, the larger the error, which is why the earned basis is not optional.
