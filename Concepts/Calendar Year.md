---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:e98ed6032b9e50347b9a1b6e739296fb015417d7b6082b9de30a5d18f0a30747
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 3 pp.42-44 (PDF pp.54-56); Ch. 5 p.69 (PDF p.81), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch. 3 pp.36, 39-40 (PDF pp.42, 45-46), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Calendar Year.md
---

![[Media/Figures/Calendar_Year.svg|340]]

A **Calendar Year** of data is every premium and loss transaction that occurs during a twelve-month calendar year, without regard to the date of policy issuance, the accident date or the report date of the claim. Its paid losses are all loss payments made during the year, and its reported losses are

> $$\text{CY Reported Losses} = \text{Paid Losses} + \text{Ending Case} - \text{Beginning Case}$$

- $\text{Paid Losses}$ are the loss payments made during the calendar year.
- $\text{Ending Case}$ and $\text{Beginning Case}$ are the [[Case Reserves|case reserves]] held at the end and at the start of the year, which is the end of the year before.
- A claim reported during the year has a beginning case reserve of zero, and a claim closed during the year has an ending case reserve of zero.

A case reserve is a balance at a point in time, so only the latest reserve on a claim counts at a date. Payments are summed over the year. A fall in case reserves during the year reduces the calendar year's reported losses, because the payments release reserves already held.

> [!example]- In 2024 an insurer has three claims. Claim A had a case reserve of $\$10{,}000$ at the start of the year, is paid $\$4{,}000$ and ends the year reserved at $\$8{,}000$. Claim B had $\$6{,}000$ reserved and closes with a payment of $\$5{,}000$. Claim C is reported in 2024, is paid $\$1{,}000$ and ends the year reserved at $\$7{,}000$. What are the calendar year 2024 reported losses? {Example}
> - Claim A contributes $4{,}000 + 8{,}000 - 10{,}000 = \$2{,}000$.
> - Claim B closes, so its ending reserve is zero and it contributes $5{,}000 + 0 - 6{,}000 = -\$1{,}000$.
> - Claim C is new, so its beginning reserve is zero and it contributes $1{,}000 + 7{,}000 - 0 = \$8{,}000$.
> - The calendar year 2024 reported losses are $2{,}000 - 1{,}000 + 8{,}000 = \$9{,}000$, whatever the claims' accident years.

## Calendar year earned premium

Calendar year earned premium is the premium earned during the year on every policy in force, including policies written the year before. Each policy contributes its premium times the fraction of its term that falls in the year. For a book, it is

> $$\text{CY Earned Premium} = \text{CY Written Premium} + \text{Beginning UEP} - \text{Ending UEP}$$

- $\text{CY Written Premium}$ is the [[Written Premium|written premium]] of the year.
- $\text{Beginning UEP}$ and $\text{Ending UEP}$ are the [[Unearned Premium|unearned premium]] reserves at the start and end of the year.

Calendar year exposures follow the same rule. A policy's written exposure falls in the calendar year it is written. A midterm cancellation in a later calendar year is recorded as negative written exposure in the year of the cancellation, and the original year is not restated.

> [!example]- An insurer writes $\$5{,}000{,}000$ of annual policies in 2024. Its unearned premium reserve was $\$1{,}800{,}000$ at the start of the year and $\$2{,}400{,}000$ at the end. What is its calendar year 2024 earned premium? {Example}
> - The earned premium is the written premium plus the unearned premium released less the unearned premium set up.
> - It is $5{,}000{,}000 + 1{,}800{,}000 - 2{,}400{,}000 = \$4{,}400{,}000$.
> - Earned premium is below written premium because the unearned premium reserve grew, as it does in a growing book.

> [!example]- A one-car annual policy is effective 7/1/2011 and is cancelled on 3/31/2012. What written and earned exposure does it contribute to calendar years 2011 and 2012? {Example}
> - The policy is written in 2011, so it contributes one written exposure to calendar year 2011.
> - The cancellation is a 2012 transaction removing the last quarter of the term, so it contributes $-0.25$ written exposure to calendar year 2012.
> - Half the term falls in 2011, so it earns $0.5$ exposure in calendar year 2011.
> - From 1/1/2012 to the cancellation it earns another $0.25$ exposure in calendar year 2012.

## Calendar year losses from a development triangle

In an [[Accident Year|accident year]] [[Development Triangle|triangle]] of cumulative reported losses, each diagonal is a valuation date. A calendar year's reported losses are the sum over accident years of the increase along the latest diagonal: each accident year's latest value less its value one year earlier, with an accident year new in the calendar year taken in full. The same difference on claim counts gives the actual emergence of each accident year in the calendar year.

> [!example]- Cumulative reported losses by accident year were $\$800$ for 2022 and $\$600$ for 2023 at 12/31/2023. At 12/31/2024 they are $\$900$ for 2022, $\$750$ for 2023 and $\$400$ for 2024. What are the calendar year 2024 reported losses? {Example}
> - Accident year 2022 increased by $900 - 800 = \$100$.
> - Accident year 2023 increased by $750 - 600 = \$150$.
> - Accident year 2024 is new, so its $\$400$ is taken in full.
> - The calendar year 2024 reported losses are $100 + 150 + 400 = \$650$.

## Calendar year incurred losses including IBNR

Financial reporting also measures a calendar year's incurred losses with the change in [[IBNR|IBNR]], as in Kittel's refinement of the ULAE technique in Friedland:

> $$\text{CY Incurred Losses} = \text{Paid Losses} + \text{Ending Reserves} - \text{Beginning Reserves}$$

- $\text{Ending Reserves}$ and $\text{Beginning Reserves}$ are the total claim liabilities, case reserves plus IBNR, at the end and start of the year.

## Uses of calendar year data

Calendar year data never develops. Its value is fixed once the year closes, and it is readily available, because most insurers report financially on a calendar year basis. Its main disadvantage is the mismatch of losses and premium: the premium is earned on policies in force during the year, but the losses include payments and reserve changes on claims from policies issued years ago.

- **In ratemaking**, Werner & Modlin say calendar year aggregation may be most appropriate for lines whose losses are reported and settled relatively quickly, such as homeowners. [[Accident Year|Accident year]] and [[Policy Year|policy year]] aggregation match losses and premium better.
- **In reserving**, very few techniques for estimating unpaid claims are based on calendar year claims, because calendar year data cannot address development. Calendar year data is used to aggregate exposures, and calendar year earned premium is paired with accident year claims.

> [!trap] Pricing on a calendar year loss ratio
> A reserve change on an old accident year lands entirely in the calendar year it is booked. An insurer pays $\$7{,}200{,}000$ in 2024, and its case reserves rise from $\$5{,}000{,}000$ to $\$6{,}100{,}000$ and its IBNR from $\$3{,}000{,}000$ to $\$3{,}400{,}000$. Its calendar year incurred losses are $\$8{,}700{,}000$, a 72.5% loss ratio on $\$12{,}000{,}000$ of earned premium. If $\$900{,}000$ of the reserve increase is adverse development on 2021 and prior, the loss ratio without it is $7{,}800{,}000/12{,}000{,}000 = 65.0\%$. Price on accident year losses developed to ultimate, not on the calendar year.
