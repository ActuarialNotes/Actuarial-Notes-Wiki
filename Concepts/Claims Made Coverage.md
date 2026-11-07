---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-09
  last_checked_by: agent:validate-v1
  content_hash: sha256:8965d7b99839a24f73565bc66537a784223e21fcb61751cea4c3fe6a395823e2
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch.16 pp.312-321 (PDF pp.324-333); Ch.2 p.26 (PDF p.38), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 3rd ed. 2010), Ch.3 pp.42-43 (PDF pp.48-49), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Claims Made Coverage.md
---

![[Media/Figures/Claims_Made_Coverage.svg|340]]

**Claims-Made Coverage** is a policy trigger under which the policy responds to claims *reported* during the policy period, provided the underlying loss occurred on or after the policy's **retroactive date**. Its alternative is [[Occurrence Coverage|occurrence coverage]], triggered by the date the loss occurs.

A claim is covered by a claims-made policy when both tests hold:

> $$\text{Covered if } \; \text{accident date} \ge \text{retro date} \; \text{ and } \; \text{report date} \in \text{policy period}$$

- The **retroactive date** caps how far back an accident may have occurred.
- The **policy period** fixes when the claim must be reported.

A claim failing either test is not covered.

> [!example]- A D&O policy runs $1/1/2024$ to $12/31/2024$ with a retroactive date of $1/1/2020$. Which of these four claims does it cover? {Example}
> | Claim | Accident date | Report date |
> | --- | --- | --- |
> | (a) | $6/15/2023$ | $9/1/2024$ |
> | (b) | $6/15/2023$ | $1/15/2025$ |
> | (c) | $3/1/2019$ | $5/1/2024$ |
> | (d) | $4/2/2024$ | $8/9/2024$ |
>
> - Claim (a) is covered, because its accident is after the retroactive date and it is reported in 2024.
> - Claim (b) is not covered by this policy, because it is reported in 2025. It falls to the 2025 renewal, or to an extended reporting endorsement.
> - Claim (c) is not covered, because its accident is before the retroactive date.
> - Claim (d) is covered, because it passes both tests.

## Report year aggregation

Claims-made losses are aggregated by [[Report Year|report year]]. Write $L(Y, i)$ for the losses reported in year $Y$ after a report lag of $i$ years, which occurred in year $Y - i$. In the table of $L(Y, i)$ by report year and lag, a claims-made policy for year $Y$ is a row, and an occurrence policy is a diagonal:

> $$\text{Claims-Made Policy}(Y) = \sum_{i=0}^{N} L(Y, i)$$

> $$\text{Occurrence Policy}(Y) = \sum_{i=0}^{N} L(Y + i, i)$$

- $N$ is the maximum report lag.

All of a claims-made policy's losses are at one report year's cost level. An occurrence policy's later lags are reported in later years, at higher cost levels when claim costs are increasing.

> [!example]- Report Year 2010's loss cost is $\$1{,}000$, loss costs rise 5% each report year, and 20% of claims are reported at each lag from 0 to 4. What do a 2011 claims-made policy and a 2011 occurrence policy cost? {Example}
> - Every cell of Report Year 2011 is $0.20 \times 1{,}000 \times 1.05 = \$210.00$.
> - The claims-made policy is the 2011 row, $5 \times 210.00 = \$1{,}050.00$.
> - The occurrence policy takes lag $i$ from Report Year $2011 + i$, at $200 \times 1.05^{1+i}$.
>
> | Lag | Report year | Loss cost |
> | --- | --- | --- |
> | 0 | 2011 | $\$210.00$ |
> | 1 | 2012 | $\$220.50$ |
> | 2 | 2013 | $\$231.53$ |
> | 3 | 2014 | $\$243.10$ |
> | 4 | 2015 | $\$255.26$ |
>
> - The occurrence policy is the sum of the diagonal, $\$1{,}160.39$.
> - The claims-made policy costs less, because its claims are all reported in 2011.

## The five principles of claims-made policies

Marker and Mohl give five principles of claims-made policies:

1. A claims-made policy should always cost less than an occurrence policy **as long as claim costs are increasing**.
2. If there is a sudden, unpredictable change in the underlying trends, the claims-made policy priced on the prior trend will be closer to the correct price than an occurrence policy priced on the prior trend.
3. If there is a sudden, unexpected shift in the reporting pattern, the cost of a **mature** claims-made policy will be affected relatively little, if at all, relative to the occurrence policy.
4. Claims-made policies incur no liability for [[IBNR]], so the risk of reserve inadequacy is greatly reduced.
5. The investment income earned from claims-made policies is substantially less than under occurrence policies.

Because the trigger is the report date, a claims-made policy has no pure IBNR. Its IBNR is only IBNER, the development on claims already reported, so the risk of reserve inadequacy is greatly reduced relative to the occurrence form. The [[Case Outstanding Development Method|case outstanding development technique]] suits such data, since it projects only from reported claims.

The claims-made policy shortens the time between collecting the premium and paying the claim, so its premium is invested for less time. The target [[Profit and Contingency Provision|underwriting profit provision]] for a claims-made policy reflects both the reduced investment income and the reduced pricing risk.

With negative trend, Principle 1 reverses. The occurrence policy's later lags are reported at lower costs, so the mature claims-made policy costs more.

> [!example]- The same book's loss costs actually rise 7% each report year instead of the 5% that was priced. How far off is each 2011 policy? {Example}
> - The claims-made policy costs $1{,}000 \times 1.07 = \$1{,}070.00$, against $\$1{,}050.00$ priced.
> - Its error is $1{,}070.00/1{,}050.00 - 1 = 1.9\%$.
> - The occurrence policy costs $200 \times (1.07 + 1.07^2 + \cdots + 1.07^5) = \$1{,}230.66$, against $\$1{,}160.39$ priced.
> - Its error is $1{,}230.66/1{,}160.39 - 1 = 6.1\%$.
> - The occurrence policy is off by more, because the trend compounds over every report year until its last lag is reported.

## Step factors

A first claims-made policy, with its retroactive date at its inception, covers only claims that occurred and were reported in its first year. Each renewal adds one more year of occurrences, until the policy is mature. The step factor for claims-made year $k$ is the share of the mature claims-made loss cost that it covers:

> $$\text{Step Factor}_k = \frac{\sum_{i=0}^{k-1} L(Y, i)}{\sum_{i=0}^{N} L(Y, i)}$$

- The step factor reaches 100% at year $N + 1$, the mature policy.

> [!example]- A claims-made medical malpractice programme starts with its retroactive date at inception. Claims report $25\%$ in the accident year, then $35\%$, $25\%$ and $15\%$ in the following three. The mature claims-made loss cost is $\$20{,}000$. Ignoring trend, what does each year's policy cost? {Example}
> - With the retro date set at inception, year $1$ can only receive accident-year reports, year $2$ receives lag-$0$ and lag-$1$, and so on.
> - The step factors are 25%, $25\% + 35\% = 60\%$, $60\% + 25\% = 85\%$ and 100%.
> - The year 1 policy costs $0.25 \times 20{,}000 = \$5{,}000$.
> - The year 2 policy costs $0.60 \times 20{,}000 = \$12{,}000$.
> - The year 3 policy costs $0.85 \times 20{,}000 = \$17{,}000$.
> - From year 4 the policy is mature and costs $\$20{,}000$.

## Switching between claims-made and occurrence

Switching from an occurrence policy to a claims-made policy with no retroactive date creates an overlap. A loss that occurred under the last occurrence policy and is reported under the claims-made policy would be covered by both. To give complete coverage without overlap, the retroactive date should be coordinated with the expiration of the last occurrence policy.

Switching from claims-made to occurrence creates a gap. A loss that occurred during the claims-made period and is reported after the last claims-made policy expires is covered by neither. An **extended reporting endorsement** (ERP, or "tail coverage") covers claims that occurred during the claims-made coverage period but are reported after the last policy expires. A retiring physician needs one for the same reason. For a switch to occurrence coverage at the start of year $Y$, the tail covers

> $$\text{Tail}(Y) = \sum_{j=0}^{N-1} \sum_{i=j+1}^{N} L(Y + j, i)$$

- $j$ is the number of years after the switch that the claim is reported.
- Each cell is a claim reported in year $Y + j$ that occurred before year $Y$.

Complete coverage without overlap is the occurrence policy plus the tail.

> [!example]- The insured in the 5% book has been mature claims-made and switches to occurrence in 2011. Report Year 2010's loss cost is $\$1{,}000$, with 20% at each lag from 0 to 4. What does the tail cost? {Example}
> - Report Year 2011 has 4 tail cells, lags 1 to 4, at $\$210.00$ each, $\$840.00$.
> - Report Year 2012 has 3 tail cells, lags 2 to 4, at $200 \times 1.05^2 = \$220.50$ each, $\$661.50$.
> - Report Year 2013 has 2 tail cells at $\$231.53$ each, $\$463.05$.
> - Report Year 2014 has 1 tail cell, lag 4, at $\$243.10$.
> - The tail costs $840.00 + 661.50 + 463.05 + 243.10 = \$2{,}207.65$, on top of the occurrence policy's $\$1{,}160.39$.

> [!trap] Summing a row for an occurrence policy
> An occurrence policy is a diagonal of the report-year table, not a row. Summing the 2011 row at 5% gives $\$1{,}050.00$, the claims-made cost, while the 2011 occurrence policy costs $\$1{,}160.39$. Take lag $i$ from report year $Y + i$.
