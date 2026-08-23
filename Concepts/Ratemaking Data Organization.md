---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:131d22610f1a15ceedfc64c4bf1545cc749314f5c6b289ed4d6156795289a4d6
  sources: []
  open_findings: 0
  log: .verify/Concepts/Ratemaking Data Organization.md
---

**Ratemaking Data Organization** is the choice of how premium, loss and exposure transactions are grouped into cohorts for a rate analysis. Werner & Modlin frame the choice as a trade-off between two properties an actuary cannot have at once: **accuracy** — how cleanly losses are matched to the premium that funds them — and **availability**, how soon the cohort can be used.

> $$\text{Experience Ratio} = \frac{\text{Losses of a cohort, developed and trended}}{\text{Premium of that cohort, on level}}$$

- **[[Accident Year]]** — losses by occurrence date against premium earned in the same year. The industry standard: good matching, closes at year end, needs development.
- **[[Policy Year]]** — every transaction on policies incepting in the year. The best match of premium to loss and the only basis that isolates a change in policy terms, but a full year less mature.
- **[[Calendar Year]]** — everything booked in the year. Instantly final and used for financial reporting, but mixes accident years on the loss side, so it is unusable for pricing without adjustment.
- **[[Report Year]]** — claims by first notice date. Required for [[Claims Made Coverage|claims-made]] coverage and preferred for severity studies.
- **[[Close Year]]** — claims by settlement date. Operational analysis only.
- **[[In-Force]]** snapshots answer point-in-time exposure questions (catastrophe accumulation, concentration) rather than period questions.

Two further choices cut across the time basis:

- **Gross, ceded or net.** Data may be organized before reinsurance, as the reinsurer's share alone, or [[Net of Reinsurance|net]] of cessions. The indication must be internally consistent — net losses against net premium.
- **Granularity.** Coarser cohorts are more [[Credibility|credible]]; finer cohorts are more [[Homogeneity|homogeneous]] and more responsive. Accident *quarters* are used where volume permits, and the same tension governs the [[Line of Business|line and class]] segmentation of the data.

Werner also distinguishes the **internal** sources (policy and claim databases, accounting records) from **external** ones — statistical plans, [[External Information in Reserving|industry aggregates]], competitor filings and third-party data — used where internal volume is thin.

![[Media/Figures/Ratemaking_Data_Organization.svg|340]]

> [!example]- One Transaction Set, Five Cohorts {Example}
> A $12$-month policy is effective $7/1/2024$ for $\$1{,}200$. A loss occurs $11/15/2024$, is reported $12/20/2024$, is reserved at $\$8{,}000$, and closes $3/15/2025$ for a $\$9{,}500$ payment.
>
> Assign every element to its cohort under each basis.
>
> > [!answer]-
> > | Basis | Premium | Loss |
> > |---|---|---|
> > | [[Policy Year]] | PY 2024: $\$1{,}200$ | PY 2024: $\$9{,}500$ |
> > | [[Accident Year]] | CY 2024: $\$600$; CY 2025: $\$600$ | AY 2024: $\$9{,}500$ |
> > | [[Calendar Year]] | CY 2024: $\$600$ earned | CY 2024: $\$8{,}000$ incurred; CY 2025: $\$1{,}500$ |
> > | [[Report Year]] | — | RY 2024 |
> > | [[Close Year]] | — | Close year 2025 |
> >
> > Only the policy year keeps the whole $\$1{,}200$ and the whole $\$9{,}500$ together. The calendar year splits *both*, and splits them differently — the source of the mismatch that makes CY unsuitable for pricing.

> [!example]- Choosing a Basis for a Mid-Year Coverage Change {Example}
> An insurer intends to file a rate change effective $1/1/2026$ for a homeowners book. Two facts complicate the choice of experience period: the insurer doubled its minimum deductible on all policies written on or after $7/1/2024$, and it needs the filing prepared in early $2025$.
>
> What data organization should the analysis use?
>
> > [!answer]-
> > The two facts pull in opposite directions.
> >
> > - The deductible change attaches to the **policy**, so [[Policy Year]] would isolate it cleanly — PY 2025 is all-new-deductible business.
> > - But in early $2025$, PY 2024 is only half-earned and PY 2025 does not exist. Waiting for a credible PY cohort would delay the filing by two years.
> >
> > The practical answer is **accident year with an adjustment**: use AY experience for volume and responsiveness, and restate historical losses to the current deductible level using a [[Deductible Rating|loss elimination ratio]] — the same "adjust the data to current conditions" logic that [[On-Leveling|on-levelling]] applies to premium and [[Loss Trend|trend]] applies to cost level.
> >
> > Werner's rule of thumb: pick the most responsive basis that can be *corrected* to current conditions, rather than the most accurate basis that arrives too late to file.
