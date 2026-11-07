---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:d55c1dc5c3b6f4bbbfd459db173036012eca52cdf5e5a8de3771f2ca93c2d228
  sources:
    - "Werner & Modlin, Basic Ratemaking (CAS, 5th ed. May 2016), Ch. 5 pp. 71-80 (PDF pp. 83-92), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Third Version, July 2010), Ch. 3 p. 41, Ch. 6 pp. 70-71, Ch. 8 pp. 139-142 and Exhibit III Sheet 2 notes p. 151, Ch. 10 pp. 182-183 (PDF pages), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Rate Level Change.md
---

![[Media/Figures/Rate_Level_Change.svg|340]]

A **Rate Level Change** is a change in the overall level of the rates an insurer charges. Premium earned before it is at an older rate level, so before premium from different years is compared with claims it is restated to one rate level, by [[On-Leveling|on-leveling]]. The on-level factor for a historical period is

> $$\text{On-Level Factor} = \frac{\text{Current Cumulative Rate Level Index}}{\text{Average Cumulative Rate Level Index of the Period}}$$

- Each cumulative rate level index is the product of $1$ plus each rate change to date, starting from $1.00$ before the first.
- The average index weights each index by the share of the period's premium earned at it.

The on-level premium is the earned premium times the on-level factor. Premium put on a common level is restated relative to a target year's level, so the target year's own premium is unchanged. A rate change does not change losses. The same factor, with benefit levels in place of rate levels, restates losses for a [[Policy Provision Changes|benefit change]].

> [!example]- Rates rose $12\%$ on $1/1/2023$ and $12\%$ on $1/1/2024$, on annual policies written uniformly. Earned premium was $\$20{,}000{,}000$, $\$23{,}000{,}000$ and $\$27{,}600{,}000$ in $2022$ to $2024$, and losses $\$14{,}400{,}000$, $\$15{,}870{,}000$ and $\$18{,}216{,}000$. Is the book improving? {Example}
> - The current index is $1.12^{2} = 1.2544$.
> - Each year earns half at each level, so the average indices are $1.000$, $1.060$ and $1.1872$.
> - The on-level factors are $1.2544$, $1.1834$ and $1.0566$.
> - The on-level premiums are $\$25{,}088{,}000$, $\$27{,}218{,}000$ and $\$29{,}162{,}000$.
> - The loss ratios on them are $57.4\%$, $58.3\%$ and $62.5\%$, against $72.0\%$, $69.0\%$ and $66.0\%$ on earned premium.
> - At a constant rate level the loss ratio worsened, so the apparent improvement was the rate increases outrunning a deterioration.

## Rate level in the expected claim ratio

The [[Expected Loss Method|expected claims]], [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] and [[Cape Cod Method|Cape Cod]] techniques need an expected claim ratio for each accident year, so a rate change moves that ratio. In Friedland's expected claims technique, each historical year's claims are developed to ultimate and brought to the target year's level, and the premium is put on the target year's rate level. A historical year's claim ratio at the target year's level is

> $$\text{Claim Ratio} = \frac{\text{Ultimate Claims} \times (1 + t)^{n} \times \text{Reform Factor}}{\text{On-Level Earned Premium}}$$

- $t$ is the annual claim trend, and $n$ the number of years from the historical accident year to the target year.
- $\text{Reform Factor}$ restates the claims to the target year's legal environment, and is $1$ when the environment has not changed.

The expected claim ratio is selected from these ratios, and the expected claims are that ratio times the target year's earned premium on the same rate level. Claims already trended to the target year need no further trend for it. When the expected claim ratio is stated at a common level that is not a given year's own, it is restated back to that year's level, by detrending and dividing by the reform factor. Putting premium on current rate level raises it, so the on-level factor lowers a historical claim ratio, while the trend factor raises it.

> [!example]- Accident year $2021$'s ultimate claim ratio of $68\%$ is a fair a priori. Rates rose $6\%$, $10\%$ and $4\%$ on $1/1/2022$, $2023$ and $2024$, and claim trend is $5\%$ a year. What expected claim ratio does it imply for accident year $2024$? {Example}
> - The cumulative rate change from $2021$ to $2024$ is $1.06 \times 1.10 \times 1.04 = 1.2126$.
> - The trend factor over three years is $1.05^{3} = 1.1576$.
> - The expected claim ratio is $0.68 \times 1.1576/1.2126 = 64.9\%$.
> - Rates outran trend, so carrying $68\%$ forward would overstate the IBNR of accident year $2024$.

The Bornhuetter-Ferguson technique is appropriate only if its expected claim ratio is reasonable. A trend in the claim ratios that differs from the a priori shows it understated or overstated, especially for the immature years. Its expected claims are usually an expected claim ratio times on-level earned premium, so an inaccurate rate change history impairs both. Expected claims set another way, such as an expected pure premium times exposures, avoid it. Earned premium is also put on current rate level before the Cape Cod technique, also called the Stanard-Bühlmann method, uses it, so that every year's premium is comparable.
