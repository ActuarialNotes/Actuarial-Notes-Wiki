---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:1957e5630aaf053da6d15b3c82275d34a35d3c2a8f88a01564ccefdce7b1e23d
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.3 pp.40-41 (PDF 46-47), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. 2016), Ch.3 p.42 (PDF 54), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Accident Year.md
---

![[Media/Figures/Accident_Year.svg|340]]

An **Accident Year** of data is every loss on accidents that occurred during a twelve-month period, regardless of when the policy was issued or the claim was reported or paid. Each claim is assigned to the year of its accident date, the date of the event that caused the loss. At an evaluation date, an accident year's reported losses are

> $$\text{AY Reported Losses} = \text{Paid Losses} + \text{Case Reserves}$$

- $\text{Paid Losses}$ are all payments to the evaluation date on claims with an accident date in the year.
- $\text{Case Reserves}$ are the [[Case Reserves|case reserves]] on those claims at the evaluation date, the latest reserve on each claim.

Only transactions on or before the evaluation date count. A claim reported after the evaluation date is not in the accident year yet, and enters at a later evaluation.

> [!example]- Claim 1 occurred on 3/1/2023 and was paid $\$2{,}000$ in 2023, with $\$4{,}000$ reserved at year end. It was paid $\$3{,}000$ more and closed in 2024. Claim 2 occurred on 11/1/2023, was reported on 2/1/2024, was paid $\$1{,}000$ in 2024 and has $\$5{,}000$ reserved at 12/31/2024. What are accident year 2023's reported losses and claim count at 12/31/2023 and at 12/31/2024? {Example}
> - At 12/31/2023, only Claim 1 has been reported. Its reported loss is $2{,}000 + 4{,}000 = \$6{,}000$, one claim.
> - At 12/31/2024, Claim 1 is closed: its paid loss is $2{,}000 + 3{,}000 = \$5{,}000$ and its case reserve is zero.
> - Claim 2 occurred in 2023, so it belongs to accident year 2023 although it was reported in 2024. Its reported loss is $1{,}000 + 5{,}000 = \$6{,}000$.
> - At 12/31/2024, accident year 2023 has $5{,}000 + 6{,}000 = \$11{,}000$ of reported losses on two claims.

## Accident year loss ratio

Accident year aggregation takes premium and exposures on the [[Calendar Year|calendar year]] basis, so it is often called calendar-accident year. An accident year loss ratio divides the losses on accidents in the year by the premium earned in the same calendar year:

> $$\text{AY Loss Ratio} = \frac{\text{AY Losses}}{\text{CY Earned Premium}}$$

- $\text{AY Losses}$ are the accident year's losses, developed to ultimate for an indication.
- $\text{CY Earned Premium}$ is the [[Earned Premium|earned premium]] of the calendar year with the same number.

The premium is fixed at the end of the year, but the losses keep developing as claims are reported, paid and re-reserved. Before an accident year's loss ratio is compared with a mature year's, its losses are developed to ultimate with a [[Cumulative Development Factor|cumulative development factor]].

> [!example]- Accident year 2024 earned premium is $\$8{,}000{,}000$. Its reported losses are $\$4{,}400{,}000$ at 12 months and $\$5{,}300{,}000$ at 24 months, and the CDF from 24 months to ultimate is 1.150. What is its loss ratio at each age and at ultimate? {Example}
> - At 12 months the loss ratio is $4{,}400{,}000/8{,}000{,}000 = 55.0\%$.
> - At 24 months it is $5{,}300{,}000/8{,}000{,}000 = 66.3\%$.
> - The ultimate losses are $5{,}300{,}000 \times 1.150 = \$6{,}095{,}000$.
> - The ultimate loss ratio is $6{,}095{,}000/8{,}000{,}000 = 76.2\%$. The premium never changed, so every move in the loss ratio came from development.

## Accident year development triangles

In reserving, the rows of a [[Development Triangle|development triangle]] are usually accident years, and its columns are ages measured from the start of the accident year: 12, 24, 36 months. Each cell is the cumulative value through that age, built by assigning each claim's transactions to its accident year and adding them up to the evaluation date. Each diagonal is a valuation date. Insurers also compile claims by accident month, quarter and half-year.

Developing an accident year to ultimate captures both the development on known claims and the claims not yet reported, the total [[IBNR|IBNR]]. A [[Report Year|report year]] triangle measures only the development on known claims. Loss development projects the losses of a fixed accident year from their current valuation to ultimate.

## Advantages and disadvantages

Friedland calls accident year aggregation the accepted norm for P&C insurers in the U.S. and Canada, and by far the most common grouping for the analysis of unpaid claims. Its advantages:

- It is easy to achieve and easy to understand.
- Its claims occur over a shorter time frame than a [[Policy Year|policy year]]'s, so its ultimate claims can be reliably estimated sooner.
- Numerous industry benchmarks are available on an accident year basis.
- It tracks changes due to economic or regulatory forces, such as inflation or law amendments, and major claim events, such as atypical weather or a catastrophe, which fall in one accident year.

Its main disadvantage is the potential mismatch between claims and exposures. An accident year's losses come from policies written in two years, priced and underwritten at more varied times than a policy year's. It can therefore mask a change in policy limits, deductibles or retentions, which a policy year isolates. Accident year matches losses and premium better than calendar year and worse than policy year.

> [!trap] Quoting an immature accident year loss ratio
> An accident year's losses grow with every evaluation, while its premium is fixed. The 55.0% loss ratio at 12 months above is not a measure of the year's profitability. Develop the losses to ultimate first, which gives 76.2%.
