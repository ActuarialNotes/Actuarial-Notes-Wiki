---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:e82e9eaa1d3bce06f8815539865579ed69f114ae48c077711ea40b754c0a9760
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.6 Development Triangle as a Diagnostic Tool, PDF pp.78, 82 (printed 72, 76): settlement emphasis, less complicated claims close quickest, average case outstanding vs mix of claims, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 2
  open_critical: 0
  log: .verify/Concepts/Case Adequacy.md
---

![[Media/Figures/Case_Adequacy.svg|340]]

**Case Adequacy** is how close an insurer's case outstanding is to the amount its reported claims will eventually settle for. The reported [[Chain Ladder Method|development technique]] assumes that case adequacy is stable over time, apart from inflation, so a change in it is one of the two distortions of the development technique, the [[Settlement Rate|settlement rate]] being the other. The diagnostic is the average case outstanding, the case outstanding per open claim, which for an accident year at an age is

> $$\text{Average Case Outstanding} = \frac{\text{Reported Claims} - \text{Paid Claims}}{\text{Reported Counts} - \text{Closed Counts}}$$

- $\text{Reported Claims} - \text{Paid Claims}$ is the case outstanding, and $\text{Reported Counts} - \text{Closed Counts}$ is the number of open claims, all at the same age.

The average case outstanding is compared down each column of its triangle, at the same age for successive accident years. Its year-to-year changes are compared with the severity trend, which is measured on the average paid claim, paid claims divided by closed counts, since that is unaffected by case reserving. Changes in line with the trend mean stable case adequacy, and the unadjusted reported development technique is appropriate. A rise faster than the trend means strengthened case reserves, and a fall, weakened ones. A single evaluation point is not enough evidence. A strengthening also lowers the paid-to-reported ratio down the column. With no claim cost inflation and a stable settlement rate, the average case outstanding should be flat down a column.

Strengthening is a calendar-year effect: it raises the reported claims on the latest diagonal of every accident year at once, while a large loss affects only its own accident year. Its effect on each technique is:

| Technique | Case reserves strengthened |
| --- | --- |
| Reported development | Overstates, most for the least mature years |
| Reported Bornhuetter-Ferguson | Overstates, less than reported development |
| Reported Cape Cod | Overstates, more than reported BF |
| Paid development, paid BF, paid Cape Cod | None |
| Disposal rate frequency-severity | None |
| Expected claims | None |

The reported development technique overstates because its historical factors include development that no longer occurs, and they are applied to a higher reported diagonal. The strengthening also raises the age-to-age factors along the diagonals where it happened, so a higher diagonal is multiplied by higher factors. The paid techniques and the [[Expected Loss Method|expected claims technique]] use no case outstanding, so they are preferred while settlement rates are stable. Weakening reverses every sign. Reported claims emerge above expectation when case adequacy strengthens, reporting speeds up, or frequency, severity or large losses are worse than expected. They emerge below it when case adequacy weakens, reporting slows, or experience is better than expected. A strengthening changes the timing of emergence, not the ultimate, so the ultimate need not be revised, though the development pattern is revisited.

The settlement rate has to be checked before a rise is read as strengthening. Insurers usually close their less complicated, less expensive claims fastest, so faster settlement leaves the more expensive claims open and raises the average case outstanding with no change in adequacy. The ratio of closed to reported counts separates the two. A strengthening also raises the average reported claim, so a spike in average case outstanding with no rise in average reported claims points to slower settlement instead.

> [!example]- The average case outstanding at $12$ months was $\$5{,}200$, $\$5{,}500$, $\$5{,}700$ and $\$9{,}400$ for accident years $2020$ to $2023$, and at $24$ months $\$8{,}000$, $\$8{,}400$ and $\$14{,}000$ for $2020$ to $2022$. Average paid claims grow about $5\%$ a year. What happened? {Example}
> - Down the $12$-month column the averages grow about $5\%$ a year, then jump $65\%$ for $2023$.
> - Down the $24$-month column they grow $5\%$, then jump $67\%$ for $2022$.
> - Both jumps are on the latest diagonal, far above the $5\%$ severity trend, so case reserves were strengthened in the latest calendar year.
> - A stable ratio of closed to reported counts would rule out faster settlement as the cause.

## The Berquist-Sherman case outstanding adjustment

The [[Berquist-Sherman Method|Berquist-Sherman]] adjustment restates the historical case outstanding to the current level of adequacy. The latest diagonal of average case outstanding is kept as the current level, and each earlier value in its column is found by detrending it at the selected severity trend $t$:

> $$\text{Adjusted Average Case Outstanding} = \frac{\text{Latest Average Case Outstanding}}{(1 + t)^{n}}$$

- $n$ is the number of years between the accident year and the accident year on the latest diagonal, in the same column.
- $t$ is usually selected from the average paid claims, which case reserving does not affect.

The adjusted reported claims of each cell are its paid claims plus its adjusted average case outstanding times its open claim counts. The reported development technique is then applied to the adjusted triangle. Its latest diagonal is unchanged, and its factors are no longer distorted. When strengthening caused the gap, the adjusted reported estimates move close to the paid estimates.

> [!example]- At $12$ months, the latest average case outstanding is $\$7{,}000$, for accident year $2024$, and the severity trend is $5\%$. Accident year $2022$ had $\$1{,}000{,}000$ paid and $200$ open claims at $12$ months. What are its adjusted average case outstanding and adjusted reported claims at $12$ months? {Example}
> - Accident year $2022$ is two years before the latest diagonal in this column, so $n = 2$.
> - The adjusted average case outstanding is $7{,}000/1.05^{2} = \$6{,}349$.
> - The adjusted case outstanding is $200 \times 6{,}349 = \$1{,}269{,}800$, so the adjusted reported claims are $\$2{,}269{,}800$.

The adjustment addresses a change in case reserve strength, not a change in the legal environment. In an excess layer, claims are reported to the reinsurer by the size of their case reserves, so a strengthening also raises the excess reported counts, while ground-up reported counts are unaffected. A merged company that adopts one partner's claims practices makes the other partner's historical patterns unrepresentative of its future development. When a company's paid factors match a benchmark but its reported factors are higher, its case reserving philosophy differs from the benchmark's, with lower case reserves relative to ultimate.

## Case adequacy in a stochastic model

Increased claims staffing lets adjusters set adequate case reserves sooner. That speeds up case incurred development and shortens its pattern, so historical factors are higher than the true future development and overstate IBNR. Factors that are too low understate it. A strengthening raises case incurred losses in the calendar year of the change, giving positive residuals, and lowers later case incurred development once it stops, giving negative residuals afterward.
