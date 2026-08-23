---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:c2664c2e9315fee6d99eede39d16f00ae0bdd5dc8364633f03509360ef4f312d
  sources: []
  open_findings: 0
  log: .verify/Concepts/Policy Year.md
---

**Policy Year** (PY), also called underwriting year or year of account, is a data aggregation method that groups every premium and loss transaction belonging to policies *incepting* in a given calendar year, and follows that cohort until the last claim closes.

> $$\text{PY } n \text{ Loss Ratio} = \frac{\text{Losses on policies written in year } n}{\text{Premium on policies written in year } n}$$

- PY gives the **cleanest match** of premium to loss: every dollar of premium and every claim in the cohort arises from the same set of policies, written under the same rates, forms and underwriting rules. Nothing has to be put on level.
- The price of that match is **time**. With annual policies a PY cohort is not fully written until $12$ months after the year begins and not fully earned until $24$ months, so PY data is roughly a year less mature than the corresponding [[Accident Year]] at the same valuation date.
- A single PY spans **two accident years**: a policy effective $7/1/2024$ contributes accident-year-2024 losses for its first half and accident-year-2025 losses for its second.
- PY is the natural basis where the policy *is* the unit being priced — [[Experience Rating|experience rating]], [[Retrospective Rating|retrospective rating]], large-deductible programs and most [[Reinsurance|reinsurance]] treaties — and it is the required basis where a policy's terms (limits, deductibles, rate level) matter more than the calendar.
- In a triangle, PY rows develop more slowly than AY rows and the earliest maturities are thin, so [[Chain Ladder Method|chain ladder]] factors at $12$ months are highly leveraged.

![[Media/Figures/Policy_Year.svg|340]]

> [!example]- Splitting a Policy Year Across Accident Years {Example}
> An insurer writes only $12$-month policies, uniformly through the year. It writes $\$6{,}000{,}000$ of premium in $2024$.
>
> How much of Policy Year 2024's premium is earned in calendar year $2024$, and which accident years do PY 2024's losses fall into?
>
> > [!answer]-
> > With uniform writing, the average policy is effective at mid-year and earns half its premium in the writing year:
> >
> > $$\text{Earned in CY 2024} = \$6{,}000{,}000 \times 0.50 = \$3{,}000{,}000$$
> >
> > The remaining $\$3{,}000{,}000$ earns in CY $2025$. Correspondingly, PY 2024 losses fall in **accident years 2024 and 2025**, split roughly $50/50$.
> >
> > This is why PY 2024 at $24$ months of maturity is comparable to AY 2024 at about $18$ months: the exposure period is twice as long, so the cohort's average loss date is six months later.

> [!example]- Choosing Between Policy Year and Accident Year {Example}
> An insurer raised its minimum deductible from $\$500$ to $\$1{,}000$ on all policies written on or after $1/1/2024$. An actuary wants to measure the effect of the change on loss costs.
>
> Which aggregation basis should be used, and why?
>
> > [!answer]-
> > **Policy year.** The deductible change attaches to the *policy*, so PY 2024 contains only $\$1{,}000$-deductible business while PY 2023 contains only $\$500$-deductible business — a clean before/after comparison.
> >
> > On an accident year basis, AY 2024 is a blend: losses occurring in $2024$ arise both from $2024$-written policies (new deductible) and from $2023$-written policies still running off (old deductible). AY 2024 would show roughly half the true effect, and AY 2025 would show the rest — see [[Policy Provision Changes]].
> >
> > The trade-off is timeliness: the actuary must wait until $12/31/2024$ for PY 2024 to be fully written, and considerably longer for the losses to develop.
