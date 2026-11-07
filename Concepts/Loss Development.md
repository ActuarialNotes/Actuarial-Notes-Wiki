---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:a2e1688cc70a25ef4604b8ab9197b52ee5651cfa16c3f2e783b7983c3bfffe53
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, Version 3, 2010), Ch.7 pp.95-97 (PDF 101-103), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Loss Development.md
---

![[Media/Figures/Loss_Development.svg|340]]

**Loss Development** is the change in the reported or paid value of a cohort of claims as it matures, from its value at an early age to its eventual [[Ultimate Loss|ultimate]] settled value. Immature [[Accident Year|accident years]] are developed to ultimate so that cohorts can be compared on a common basis. Losses at age $n$ are developed to ultimate by

> $$\text{Ultimate Losses} = \text{Losses at age } n \times \text{CDF}_{n \to \text{ult}}$$

> $$\text{CDF}_{n \to \text{ult}} = \prod_{k \ge n} f_{k \to k+1} \times \text{Tail}$$

- $\text{CDF}_{n \to \text{ult}}$ is the [[Cumulative Development Factor|cumulative development factor]] from age $n$ to ultimate.
- $f_{k \to k+1}$ is the selected [[Age to Age Factor|age-to-age factor]] from age $k$ to the next age, the losses at the later age divided by the losses at the earlier age.
- $\text{Tail}$ is the [[Tail Factor|tail factor]] for development beyond the last age of the [[Development Triangle|triangle]].

The [[IBNR]] is the ultimate losses less the reported losses. Development has two drivers. **Pure IBNR** is claims that occurred but have not yet been reported. **IBNER**, incurred but not enough reported, is the development on claims already known, as [[Case Reserves|case reserves]] are re-estimated toward settlement. A reported triangle by accident year captures both.

> [!example]- Reported losses for Accident Year 2024 at 12 months are $\$4{,}200{,}000$. The selected age-to-age factors are 1.650 from 12 to 24 months, 1.220 from 24 to 36, 1.080 from 36 to 48 and 1.030 from 48 to 60, with a tail factor of 1.015. What are the ultimate losses and the IBNR? {Example}
> - The CDF from 12 months is the product of every later factor and the tail, $1.650 \times 1.220 \times 1.080 \times 1.030 \times 1.015 = 2.2729$.
> - The ultimate losses are $4{,}200{,}000 \times 2.2729 = \$9{,}546{,}180$.
> - The IBNR is $9{,}546{,}180 - 4{,}200{,}000 = \$5{,}346{,}180$.

## Leverage at early maturities

The share of the ultimate not yet reported at age $n$ is

> $$\text{Percent Unreported} = 1 - \frac{1}{\text{CDF}_{n \to \text{ult}}}$$

The [[Chain Ladder Method]] applies the CDF directly, while the [[Bornhuetter-Ferguson Method]] uses the *complement* $(1 - 1/\text{CDF})$ to weight an a priori expectation. **Long-tail lines** ([[Long Tail Lines|liability, workers compensation]]) have large CDFs at early maturities and need a [[Tail Factor]] beyond the observed triangle. **Short-tail lines** ([[Short Tail Insurance|property, auto physical damage]]) are close to ultimate within a year or two. A large CDF multiplies every fluctuation in the few losses reported so far, so the immature end of the triangle leans on the Bornhuetter-Ferguson or [[Expected Loss Method|expected loss method]].

> [!example]- How leveraged is the 2024 estimate at 12 months? {Example}
> - The percent unreported is $1 - 1/2.2729 = 56.0\%$.
> - A CDF of $2.27$ means more than half the ultimate estimate is unreported.
> - A $5\%$ error in the $12\text{–}24$ factor moves ultimate by roughly $\$480{,}000$, which is $0.05 \times 9{,}546{,}180$.

## Reported and paid development

**Reported (incurred) development** is normally faster than **paid development**, because claims are reported sooner than they are paid, so cumulative reported CDFs are usually smaller than paid ones at the same age. Their relationship at each age is measured by a ratio, which is

> $$\text{Paid-to-Reported Ratio} = \frac{\text{Paid Losses}}{\text{Reported Losses}}$$

- Both losses are cumulative, for the same accident year at the same age.

A change in the paid-to-reported ratio signals a change in settlement patterns or in case adequacy. Down a column or along the latest diagonal, a rising ratio is consistent with faster settlement or weaker case reserves, a falling one with slower settlement or stronger case reserves. The actuary investigates which one has changed ([[Case Adequacy]], [[Settlement Rate]]). Offsetting changes in both can leave the ratio unchanged.

The development technique also assumes that claim reporting lags have not changed. If claims come to be reported faster while payments keep their pace, the reported factors overstate the remaining development and the reported projection overstates ultimate. The paid projection is unaffected.

> [!example]- For Accident Year 2022 at 36 months, paid losses are $\$6{,}300{,}000$ and reported losses are $\$9{,}000{,}000$. The historical paid-to-reported ratio at 36 months is $0.58$. What does the comparison suggest? {Example}
> - The paid-to-reported ratio is $6{,}300{,}000/9{,}000{,}000 = 0.70$, well above the historical $0.58$.
> - One reading is faster settlement. Claims are closing sooner, so historical *paid* development factors (built on slower settlement) will over-develop this year.
> - The other reading is weaker case reserving. Case reserves are lower relative to eventual payments, so historical *reported* factors will under-develop this year.
> - Either way the historical factors are biased for this cohort. The [[Berquist-Sherman Method]] restates the triangle for the changed settlement rate or case adequacy.

## Downward development

Development can be **downward**. Lines dominated by salvage/subrogation recoveries or by conservative initial case reserving produce age-to-age factors below $1.000$. Redundant case reserves release as favorable development in later periods.

## Development and trend in ratemaking

In ratemaking, developing losses to ultimate is a distinct step from trending. Development moves an immature year to its own ultimate value, while [[Loss Trend|trend]] restates it to the cost level of the future policy period. Applying one without the other understates the indication. Applying both is not a double count, and Werner & Modlin call the belief that it is the *overlap fallacy*.

> [!trap] Multiplying age-to-ultimate factors together
> A CDF already runs from its age to ultimate, so it is applied once. Multiplying the 12-month CDF of 2.2729 by the 24-month CDF of 1.3775 gives 3.1308 and develops the losses twice over.
