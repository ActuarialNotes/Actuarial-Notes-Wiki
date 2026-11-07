---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:4d2d2f6fd44bdc22fe529b59e742a35689edef1decf6bd053e61396bac339506
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch. 4 pp. 44-47; Ch. 6 pp. 75-76; Ch. 7 p. 96; Ch. 11 p. 206 (disposal rate definition); Ch. 13 pp. 291-293 (B-S paid adjustment), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Settlement Rate.md
---

![[Media/Figures/Settlement_Rate.svg|340]]

The **Settlement Rate** is the speed at which an insurer closes its claims. Berquist and Sherman measure it by the disposal rate, which for an accident year at an age is

> $$\text{Disposal Rate} = \frac{\text{Closed Claim Counts}}{\text{Ultimate Claim Counts}}$$

- $\text{Closed Claim Counts}$ are cumulative to the age, and $\text{Ultimate Claim Counts}$ are the accident year's projected ultimate claim counts.

The definition differs among authors, and some divide by reported counts instead. The ratio of closed to reported claim counts is the diagnostic, compared down each column across accident years. A ratio that rises down a column at the same age means faster settlement, a stable one means no change, and a falling one means slower settlement. A rising paid-to-reported ratio along the latest diagonal, with case adequacy unchanged, also means faster payment.

The paid [[Chain Ladder Method|development technique]] assumes that the payment pattern is stable, so a change in the settlement rate makes its historical factors inappropriate. Faster settlement puts the recent paid claims further along than in the past, so the historical paid factors overstate their ultimate claims. Slower settlement leaves the recent paid claims lower, so the historical factors understate. A change in settlement speed moves amounts between case outstanding and payments, so with adequate, unchanged case reserves the reported claims stay the same. The reported development technique, the [[Expected Loss Method|expected claims technique]], reported [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] and [[Cape Cod Method|Cape Cod]] are then unaffected and preferred.

> [!idea] The idea
> Paid claims that run below expectation at an early age can be a change in settlement rate or in the mix of small and large claims rather than a change in the ultimate, so the shortfall is investigated before the estimate is revised.

When payments slow, the historical paid factors and the percentage unpaid derived from them are too low, and the paid claims to date are lower too. Unadjusted paid development and paid BF both understate the unpaid claims, paid development by more.

> [!example]- The disposal rates at $24$ months were $45\%$, $47\%$, $52\%$, $58\%$ and $63\%$ for accident years $2018$ to $2022$. What does that mean for the paid development technique? {Example}
> - Claims at $24$ months are closing steadily faster, since the disposal rate rises down the column.
> - Accident year $2022$ has closed $63\%$ of its claims by $24$ months, so more of its ultimate is already paid than in the older years.
> - The historical $24$-month paid factors were built when only about $45\%$ to $52\%$ had closed, so applying them to $2022$ overstates its ultimate claims.
> - The actuary restates the paid triangle to the current settlement rate, or relies on the reported development technique, which this change does not distort.

## The Berquist-Sherman paid adjustment

The [[Berquist-Sherman Method|Berquist-Sherman]] paid adjustment restates the historical paid claims to the current settlement rate. The disposal rates of the latest diagonal are selected at each age, and the adjusted closed counts of each cell are

> $$\text{Adjusted Closed Counts} = \text{Selected Disposal Rate} \times \text{Ultimate Claim Counts}$$

- $\text{Selected Disposal Rate}$ is the disposal rate of the latest diagonal at the cell's age.

A year whose disposal rate is above the selected rate settled faster than current practice, so its closed counts are adjusted down. A year below it is adjusted up, and a year at it is not adjusted, so the latest diagonal is unchanged. The adjusted paid claims are found from each accident year's own relationship between cumulative closed counts and cumulative paid claims, at the adjusted closed counts. The relationship is linear interpolation between the actual points, including zero paid at zero closed, or the two-point exponential fits $Y = ae^{bX}$ that Berquist and Sherman used. The paid development technique is then applied to the adjusted triangle. When disposal rates are stable across accident years, the adjusted estimate is close to the unadjusted paid development estimate.

> [!example]- An accident year with $1{,}000$ ultimate claims had $520$ closed claims and $\$4{,}000{,}000$ paid at $24$ months, and $700$ closed and $\$5{,}600{,}000$ paid at $36$ months. The latest diagonal's disposal rate at $24$ months is $63\%$. What are its adjusted paid claims at $24$ months? {Example}
> - The adjusted closed counts are $0.63 \times 1{,}000 = 630$, between the $520$ and $700$ actually closed at $24$ and $36$ months.
> - Between those points the paid claims rise $\$1{,}600{,}000$ over $180$ closed claims, and $630$ is $110$ claims past $520$.
> - Interpolating linearly, the adjusted paid claims are $\$4{,}000{,}000$ plus $110/180$ of $\$1{,}600{,}000$, or $\$4{,}977{,}778$.

The adjustment assumes that paid dollars move with closed counts. If settlement shifts by claim size, such as small claims closing faster while large claims close later, the assumption fails and the adjustment can make the misstatement worse. Splitting the data by size of claim is the response.

## Settlement rate in the frequency-severity techniques

The disposal rate [[Frequency-Severity Method|frequency-severity technique]] projects ultimate claim counts, applies disposal rates of closed-with-payment counts to get the claims closed in each future period, and multiplies by the severities of closed claims, trended for inflation. It uses only closed counts and paid severities, so case reserve strengthening does not affect it. It assumes stable disposal rates and a consistent definition of claim counts, so a change in claims handling, settlement speed or the statute of limitations distorts it. When settlement rates are changing, the frequency-severity technique uses reported counts and reported severities instead, which closure timing does not affect. The [[Berquist-Sherman Method|Berquist-Sherman]] restatement of closed counts to the current settlement rate is what lets the disposal rate technique be applied after a change. Because frequency-severity separates counts from severity, a sudden severity change from a legal change, or a change in settlement speed, can be reflected explicitly. Paid development factors rest on the historical pattern and cannot isolate either change.

The settlement rate is also a test of the stability of development factors, as the percentage of claims closed by age. Unstable factors can be remedied by adjusting the data for systematic changes such as these, by fitting a curve or a time-series model to the factors, or with expert opinion, industry data or Bayesian methods.
