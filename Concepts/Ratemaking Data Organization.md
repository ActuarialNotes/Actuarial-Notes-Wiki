---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:164feac44fc2846fc9f45c66cdc711169c715860661abd45c8f1642797911a22
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 pp.42-44 (PDF pp.54-56); Ch. 5 p.71 (PDF p.83); Ch. 6 p.99 (PDF p.111), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 pp.40-42 (PDF pp.46-48), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Ratemaking Data Organization.md
---

**Ratemaking Data Organization** is the choice of how premium, loss and exposure transactions are grouped into cohorts for a rate analysis. Werner & Modlin set three objectives for it: **accurately match losses and premium** for the policy, **use the most recent data** available, and **minimize the cost** of data collection and retrieval. The four common methods — calendar, accident, policy and report year — each meet them to a different degree.

> $$\text{Experience Ratio} = \frac{\text{Losses of a cohort, developed and trended}}{\text{Premium of that cohort, on level}}$$

- **[[Accident Year]]** — losses by occurrence date against premium earned in the same year. The accepted norm for P&C insurers in the U.S. and Canada (Friedland): a better match than calendar year, with premium fixed at year end but losses that still need development.
- **[[Policy Year]]** — every transaction on policies incepting in the year. The best match of premium to loss, and particularly useful when underwriting or pricing changes occur (Friedland's example: a shift to large-deductible policies), but its exposures are not fully earned until 24 months after it starts, so its data takes longer to develop.
- **[[Calendar Year]]** — everything booked in the year. Available quickly and already collected for financial reporting, but its losses include payments and reserve changes on claims from policies issued years ago, a mismatch with the premium earned in the year. Werner & Modlin say it may be most appropriate for lines whose losses are reported and settled relatively quickly, such as homeowners.
- **[[Report Year]]** — claims by report date. Typically used for commercial lines written on a [[Claims Made Coverage|claims-made]] basis, such as medical malpractice.
- **[[Close Year]]** — claims by settlement date.
- **[[In-Force]]** premium is the full-term premium of every policy in effect on a date — the best estimate of the current mix of business, and often used to measure the impact of a rate change on existing customers.

Two further choices cut across the time basis:

- **Gross, ceded or net.** Data may be organized before reinsurance, as the reinsurer's share alone, or [[Net of Reinsurance|net]] of cessions. The indication must be internally consistent — net losses against net premium.
- **Granularity.** Coarser cohorts are more [[Credibility|credible]]; finer cohorts are more [[Homogeneity|homogeneous]] and more responsive. Accident *quarters* are used where volume permits, and the same tension governs the [[Line of Business|line and class]] segmentation of the data.

Werner also distinguishes the **internal** sources (policy and claim databases, accounting records) from **external** ones — data calls and statistical plans, [[External Information in Reserving|aggregated industry data]], competitors' rate filings and third-party data — needed when pricing a new line and often helpful to supplement internal data.

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
> > | [[Calendar Year]] | CY 2024: $\$600$; CY 2025: $\$600$ earned | CY 2024: $\$8{,}000$ reported; CY 2025: $\$1{,}500$ |
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

