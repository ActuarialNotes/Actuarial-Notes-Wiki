---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:3db440427c0cb803b58a564b667c92a8f8087011994e911af576b5bdb0047e0d
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.13 Berquist-Sherman Techniques, PDF pp.289-298 (printed 283-292): case adequacy adjustment, settlement rate adjustment (pp.288-290), XYZ Insurer combined adjustment (p.292), sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Berquist-Sherman Method.md
---

![[Media/Figures/Berquist-Sherman_Method.svg|340]]

The **Berquist-Sherman Method** is a pair of adjustments that restate a historical [[Development Triangle|development triangle]] to the current level of [[Case Adequacy|case reserve adequacy]] or of [[Settlement Rate|claim settlement rate]], so that development factors selected from it suit the latest diagonal. The case outstanding adjustment restates the reported claims triangle. The latest diagonal's average case outstanding at each age is taken as the current adequacy and detrended back along its column, so the adjusted average case outstanding of an accident year at age $n$ is

> $$\text{Adjusted Average Case} = \frac{\text{Average Case on the Latest Diagonal}}{(1 + t)^k}$$

- $\text{Average Case on the Latest Diagonal}$ is the case outstanding per open claim at age $n$ on the latest diagonal.
- $t$ is the selected annual severity trend, the rate at which average case outstanding would grow with adequacy unchanged.
- $k$ is the number of years from the accident year to the accident year on the latest diagonal at that age.

Each cell of the adjusted reported triangle is then

> $$\text{Adjusted Reported Claims} = \text{Paid Claims} + \text{Adjusted Average Case} \times \text{Open Claim Counts}$$

- $\text{Paid Claims}$ and $\text{Open Claim Counts}$ are the cell's actual cumulative paid claims and open counts, unadjusted.

The latest diagonal is unchanged. Age-to-age factors are selected from the adjusted triangle and applied to the latest reported claims as in the [[Chain Ladder Method|development technique]]. Raising the older years' reported claims while leaving the latest diagonal alone lowers the factors after a strengthening, so the projected ultimate falls. The adjusted factors can also give the percent unreported in the [[Bornhuetter-Ferguson Method|Bornhuetter-Ferguson]] method.

> [!example]- At 12 months the average case outstanding per open claim is $\$4{,}000$, $\$4{,}200$ and $\$5{,}500$ for AY 2022, 2023 and 2024, with 250 open claims and $\$300{,}000$ paid in each year. The severity trend is 5%. What is the adjusted 12-month reported column? {Example}
> - The latest average, $\$5{,}500$, rose 31% in a year, far above the 5% trend, so case reserves were strengthened.
> - AY 2023's adjusted average is $5{,}500/1.05 = \$5{,}238$, and AY 2022's is $5{,}500/1.05^2 = \$4{,}989$.
>
> | AY | Adjusted average | Adjusted case | Adjusted reported |
> | --- | --- | --- | --- |
> | 2022 | $\$4{,}989$ | $\$1{,}247{,}250$ | $\$1{,}547{,}250$ |
> | 2023 | $\$5{,}238$ | $\$1{,}309{,}500$ | $\$1{,}609{,}500$ |
> | 2024 | $\$5{,}500$ | $\$1{,}375{,}000$ | $\$1{,}675{,}000$ |
>
> - The adjusted case is the adjusted average times 250 open claims, and the adjusted reported claims add the $\$300{,}000$ paid.
> - The older years rise about 19% from their actual $\$1{,}300{,}000$ and $\$1{,}350{,}000$, and AY 2024 is unchanged.

## Detecting a change in case adequacy or settlement rate

The adjustments are needed when the claims department reports, and the diagnostics confirm, a change in case reserving or settlement practice. A change shows up as a shift along the latest diagonal, a calendar-year effect.

1. **Case adequacy.** Average case outstanding, case outstanding over open counts, rising much faster than average paid claims or the severity trend points to a strengthening. Average reported claims moving with the severity trend point to stable adequacy.
2. **Settlement rate.** A rising ratio of closed to reported claim counts, or of closed counts to ultimate counts (the disposal rate), at the same age points to faster settlement. The ratio of paid to reported claims moves with it.

A change in case adequacy distorts the reported projections, and the paid development and [[Expected Loss Method|expected claims]] techniques are unaffected. A change in settlement rate distorts the paid projections, and the reported development technique is largely unaffected, because reported claims include case reserves whether or not a claim has closed. Either adjustment addresses claims practice, not a change in the legal environment.

> [!example]- For a liability book at 24 months, average case outstanding is $\$12{,}000$, $\$12{,}600$, $\$13{,}100$ and $\$13{,}700$ for AY 2021 to 2024. The ratio of closed to reported counts is 58%, 59%, 67% and 74%, and paid over reported claims is 0.42, 0.43, 0.52 and 0.61. Which adjustment applies? {Example}
> - Average case outstanding grows about 4.5% a year, steadily, so case adequacy has not changed.
> - The closed-to-reported ratio has risen from 58% to 74% and paid-to-reported with it, so claims are closing faster.
> - Historical paid factors were built on years that had paid less by 24 months, so they over-develop the latest paid diagonal.
> - The settlement rate adjustment applies to the paid triangle, with the reported development technique as the check.

## The settlement rate adjustment

The settlement rate adjustment restates the paid claims triangle to the disposal rates of the latest diagonal. The disposal rate on the latest diagonal at each age is selected, and the adjusted closed claim counts of an accident year at age $n$ are

> $$\text{Adjusted Closed Counts} = \text{Selected Disposal Rate} \times \text{Ultimate Claim Counts}$$

- $\text{Selected Disposal Rate}$ is the disposal rate, cumulative closed counts over ultimate counts, on the latest diagonal at age $n$.
- $\text{Ultimate Claim Counts}$ are the accident year's selected ultimate counts.

The adjusted paid claims are read off the year's relationship between cumulative paid claims and cumulative closed counts. Berquist and Sherman fit an exponential curve between each pair of successive ages,

> $$\text{Paid Claims} = a\,e^{b \times \text{Closed Counts}}$$

- $a$ and $b$ are the curve's parameters, fitted through the two ages' actual closed counts and paid claims.

An adjusted count between two actual counts is interpolated on their curve, and one outside them is extrapolated from the closest pair. Linear interpolation is the simpler alternative. The latest diagonal is unchanged, and the paid factors are selected from the adjusted triangle. The key assumption is that a higher share of claims closed means a higher share of ultimate claims paid. A shift toward settling larger claims first breaks it, and the adjustment then makes the years less comparable.

> [!example]- AY 2022 had closed 300 claims and paid $\$1{,}200{,}000$ at 12 months, and closed 600 and paid $\$3{,}000{,}000$ at 24 months. Its ultimate counts are 1,000 and the latest diagonal's disposal rate at 12 months is 40%. What are its adjusted closed counts and paid claims at 12 months? {Example}
> - The adjusted closed counts are $0.40 \times 1{,}000 = 400$, between the actual 300 and 600.
> - Through the two points, $b = \ln(3{,}000{,}000/1{,}200{,}000)/300 = 0.0030543$ and $a = 1{,}200{,}000/e^{300b} = 480{,}000$.
> - The adjusted paid claims are $480{,}000 \times e^{400b} = \$1{,}628{,}651$.
> - Linear interpolation would give $1{,}200{,}000 + \tfrac{100}{300} \times 1{,}800{,}000 = \$1{,}800{,}000$.

## Both adjustments together

When case adequacy and settlement rate have both changed, the two adjustments are combined into one adjusted reported triangle, which gives one projection in place of two. The adjusted open counts are the reported counts less the adjusted closed counts. The adjusted reported claims are the adjusted average case outstanding times the adjusted open counts, plus the adjusted paid claims.

The adjustments are judgment-laden: the result is highly sensitive to the selected severity trend, and the case adjustment attributes every change in average case outstanding beyond that trend to adequacy. The restated result is checked against the methods insensitive to the distortion, paid methods for a case adequacy change and reported methods for a settlement rate change. The strengthened reserves on the latest diagonal stay in the estimate. What the restatement removes is factors that would develop the strengthening a second time.

> [!trap] Multiplying by reported counts
> The adjusted average case outstanding is a per-open-claim amount, so it multiplies the **open** claim counts, and the paid claims are added. For AY 2022 above, $4{,}989 \times 250 + 300{,}000 = \$1{,}547{,}250$. With 400 reported claims in place of the 250 open ones, the case alone would be $4{,}989 \times 400 = \$1{,}995{,}600$, and the paid claims would be reserved again on top.
