---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:5187ccc8d2f1ba72db285ef7d7fb6687030039b49df68d3345b9fb3da06951c3
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 pp.40-42 (PDF pp.46-48), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Friedland, Reserving for Reinsurance (CAS Exam 7 study note), Ch.2 printed pp.35-37 (PDF pp.37-39), Ch.3 printed pp.49, 51-52 (PDF pp.51, 53-54), sha256:6da495a26206ececf40a3c3fc8fb3db04556c940242f5bcffe2b21b7e4445ceb — https://www.casact.org/sites/default/files/2022-11/Exam7_Study_Note_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Underwriting Year.md
---

**Underwriting Year** (UY), also called treaty year or contract year, groups all premium and losses by the year in which the reinsurance *contract became effective* (incepted). It is the [[Policy Year]] concept carried into reinsurance, where the contract being tracked is a treaty rather than a single policy.

> $$\text{UY } n \text{ Loss Ratio} = \frac{\text{Losses ceded under contracts incepting in year } n}{\text{Premium on contracts incepting in year } n}$$

- On a **direct** book, underwriting year and policy year are the same thing. The distinction matters in reinsurance, where a $1/1/2024$ treaty covers a whole portfolio of cedant policies written throughout $2024$, each of which then runs a further $12$ months.
- That stacking makes UY the **slowest-developing** basis of all. A single $1/1/2024$ annual risks-attaching treaty is exposed to accident dates through the end of $2025$. Underwriting year $2024$ also holds the contracts incepting later in $2024$: one effective $12/31/2024$ covers policies written through $12/30/2025$, with accidents as late as $12/29/2026$. The underwriting year's accidents therefore span three calendar years, a $36$-month window ([[Reserving for Reinsurance (Friedland - 2022)|Friedland]]).
- The offsetting advantage is an exact match of premium to exposure: the ceded premium, the commission, the reinstatement premiums and the losses in a UY all belong to one set of contract terms — attachment point, limit, and treaty conditions — so the cohort's profitability is measured against the deal that was actually struck.
- UY is frequently used by European reinsurers and at Lloyd's, and reinsurers often estimate ultimate losses by UY even where they report by accident year. At early UY maturities the cumulative development factors are highly leveraged and the premium is not fully earned, which is where the [[Expected Loss Method|expected]] and [[Bornhuetter-Ferguson Method|BF]] methods take over from the chain ladder.
- Converting between bases loses information: a UY triangle cannot be re-cut into accident years without claim-level accident dates, which is one reason ceded data quality is a recurring problem in [[Reinsurance Reserving|reinsurance reserving]].

![[Media/Figures/Underwriting_Year.svg|340]]

> [!example]- How Long a $\;2024$ Treaty Stays Exposed {Example}
> A quota share treaty incepting $1/1/2024$ covers all $12$-month policies written by the cedant during calendar $2024$. The line has an average reporting lag of nine months.
>
> Over what period can accidents and reports attach to underwriting year 2024?
>
> > [!answer]-
> > The last policy subject to the treaty is written $12/31/2024$ and runs through $12/30/2025$, so:
> >
> > - **Accident dates** run $1/1/2024$ through $12/30/2025$ — a $24$-month exposure window.
> > - With a nine-month average reporting lag, **reports** keep arriving well into $2026$, and the tail of the reporting distribution runs years beyond that.
> >
> > At $12$ months of maturity ($12/31/2024$) the treaty's premium is only about half-earned and only a fraction of one year's accidents have been reported. This is why a UY $12$-month [[Chain Ladder Method|chain ladder]] estimate is unusable and reinsurers lean on an a priori loss ratio at early maturities.

> [!example]- Same Claim, Three Cohorts {Example}
> A cedant writes a general liability policy on $7/1/2024$, subject to a treaty effective $1/1/2024$. A claim occurs $3/15/2025$ and is reported $6/20/2025$.
>
> Place the claim on the underwriting-year, policy-year and accident-year bases.
>
> > [!answer]-
> > | Basis | Cohort | Driver |
> > |---|---|---|
> > | **Underwriting Year** | UY 2024 | treaty effective $1/1/2024$ |
> > | [[Policy Year]] | PY 2024 | policy incepted $7/1/2024$ |
> > | [[Accident Year]] | AY 2025 | loss occurred $3/15/2025$ |
> >
> > The reinsurer books this loss against premium it earned on a treaty struck $15$ months before the accident. Nothing is wrong with that — the treaty premium was priced for exactly this exposure — but it explains why the reinsurer carries [[IBNR]] on UY 2024 for years after the cedant's own AY 2024 has largely settled.
