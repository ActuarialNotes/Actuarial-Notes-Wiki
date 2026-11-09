---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-31
  last_checked_by: agent:validate-v1
  content_hash: sha256:c7cdcafa285c1726794f783ed6ef60eb47229c2b703549d4fb4865ca72a3f9d1
  sources:
    - "Friedland, Estimating Unpaid Claims Using Basic Techniques (CAS, 2010), Ch.15 Evaluation of Techniques, PDF pp.357-359 (printed 351-353): A/E purpose and expected-claims formula, quarterly/monthly interpolation, Bornhuetter-Ferguson quarterly distribution, Hugh White's three options, sha256:5e9830823346d2001d9bdcebecd0d0d399cac32a9a63d5cf021a6c7f03d50464 — https://www.casact.org/sites/default/files/2021-03/5_Friedland.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actual vs Expected Analysis.md
---

![[Media/Figures/Actual_vs_Expected_Analysis.svg|340]]

An **Actual vs Expected Analysis** compares the claims that actually emerged in a period with the claims the last [[Unpaid Claims|unpaid claim estimate]] expected to emerge in that period. It shows whether the prior selections were appropriate, so the actuary can revise them when claims do not emerge as expected. For an accident year, the reported claims expected to emerge between two evaluation dates are

> $$\text{Expected Emergence} = \frac{\text{Ultimate} - \text{Reported}}{1 - p_{\text{start}}} \times (p_{\text{end}} - p_{\text{start}})$$

- $\text{Ultimate}$ is the ultimate claims selected at the start of the period.
- $\text{Reported}$ is the actual reported claims at the start of the period.
- $p_{\text{start}}$ and $p_{\text{end}}$ are the percentages reported at the accident year's ages at the start and end of the period, each $1/\text{CDF}$ at that age.

$\text{Ultimate} - \text{Reported}$ is the [[IBNR]] at the start, and $1 - p_{\text{start}}$ is the percentage still unreported. The formula takes the share of the unreported claims that the pattern says will be reported during the period. Over a calendar year each accident year ages 12 months, so $p_{\text{end}}$ is read 12 months later in the pattern than $p_{\text{start}}$. The same formula with paid claims and the payment pattern gives the expected paid claims.

> [!example]- At December 31, 2007, an accident year 2007 has $\$2{,}463$ of reported claims and a selected ultimate of $\$2{,}798$. The reporting pattern is $88.0\%$ at 12 months and $99.9\%$ at 24 months. What reported claims are expected to emerge during 2008? {Example}
> - The IBNR at the start is $2{,}798 - 2{,}463 = \$335$.
> - The percentage unreported at 12 months is $1 - 0.880 = 0.120$.
> - The pattern reports $0.999 - 0.880 = 0.119$ of ultimate during 2008, which is $0.119/0.120 = 0.992$ of what is still unreported.
> - The expected emergence is $335 \times 0.992 = \$332$.

## Expected emergence when the ultimate comes from the development technique

When the selected ultimate is the [[Chain Ladder Method|development technique's]] own projection, the reported claims at the start are $\text{Ultimate} \times p_{\text{start}}$, and the expected emergence simplifies to

> $$\text{Expected Emergence} = \text{Ultimate} \times (p_{\text{end}} - p_{\text{start}})$$

> $$\text{Expected Emergence} = \text{Reported} \times \left(\frac{\text{CDF}_{\text{start}}}{\text{CDF}_{\text{end}}} - 1\right)$$

- $\text{CDF}_{\text{start}}$ and $\text{CDF}_{\text{end}}$ are the [[Cumulative Development Factor|cumulative development factors]] at the ages at the start and end of the period.

When the ultimate comes from another method, the pattern $1/\text{CDF}$ need not agree with it. The actuary can then derive a reporting or payment pattern by comparing the historical triangle with the selected ultimate claims, so that the expected emergence is consistent with the selection.

> [!example]- An accident year has $\$6{,}000{,}000$ of reported claims at 24 months. The CDF is $1.6667$ at 24 months and $1.3333$ at 36 months, and the selected ultimate is the development technique's. What reported claims are expected to emerge in the next 12 months? {Example}
> - The ultimate is $6{,}000{,}000 \times 1.6667 = \$10{,}000{,}000$.
> - The percentages reported are $1/1.6667 = 60\%$ at 24 months and $1/1.3333 = 75\%$ at 36 months.
> - The pattern reports $0.75 - 0.60 = 0.15$ of ultimate in the period, so the expected emergence is $\$1{,}500{,}000$.
> - From the CDFs directly, $1.6667/1.3333 - 1 = 0.25$, and $6{,}000{,}000 \times 0.25 = \$1{,}500{,}000$.

## Comparing actual with expected

The actual emergence in the period is the change in cumulative reported claims between the two evaluation dates. It is compared with the expected emergence as a difference or as a ratio,

> $$\text{A/E} = \frac{\text{Actual Emergence}}{\text{Expected Emergence}}$$

The expected cumulative reported claims at the end of the period are the actual reported claims at the start plus the expected emergence, and they are compared with the actual reported claims at the end. Actual emergence above expected says the ultimate claims may be understated, or that claims are being reported faster than the pattern assumes. Actual emergence below expected is favourable development. The comparison is made by accident year and in total, for reported and paid claims and for claim counts.

> [!example]- The accident year above has $\$8{,}100{,}000$ of reported claims at 36 months. How does the actual emergence compare with the expected? {Example}
> - The actual emergence is $8{,}100{,}000 - 6{,}000{,}000 = \$2{,}100{,}000$.
> - The expected cumulative reported claims are $6{,}000{,}000 + 1{,}500{,}000$, or $\$7{,}500{,}000$, so actual exceeds expected by $\$600{,}000$.
> - The ratio is $2{,}100{,}000/1{,}500{,}000 = 1.40$.
> - Claims emerged $40\%$ faster than expected, so the actuary looks for the cause before deciding whether the ultimate claims should rise.

## Reading paid and reported differences together

A difference between actual and expected can be a random fluctuation, such as a large loss. Otherwise it has one of two kinds of cause. It may be a change in the ultimate claims, or a change in operations that shifts the timing of reported or paid claims without changing the ultimate, such as [[Case Adequacy|case reserve strengthening]] or faster [[Settlement Rate|settlement]]. Comparing the paid and reported results tells them apart:

| Reported claims | Paid claims | Likely cause |
| --- | --- | --- |
| Above expected | As expected | Case reserve strengthening, or faster reporting |
| As expected | Above expected | Faster settlement of claims |
| Above expected | Above expected | Higher ultimate claims |

A change in operations is not a reason to revise the ultimate, but it is a reason to revisit the pattern. Case reserve strengthening raises the reported development factors, and applying them unadjusted overstates the ultimate claims, which is the situation the [[Berquist-Sherman Method|Berquist-Sherman]] adjustment corrects. Paid claims at early maturities are highly leveraged and volatile, so a paid shortfall can reflect a change in settlement rates or in the mix of small and large claims rather than a change in the ultimate.

> [!example]- Over a calendar year, reported claims exceeded expectation by about 30% in every accident year, while paid claims were within 2% of expectation in every accident year. What is the likely cause, and should the ultimate claims be raised? {Example}
> - The excess appears in every accident year, so it is a calendar-year effect rather than one bad accident year.
> - Paid claims are on expectation, so more money is not being paid out.
> - Reported claims are paid claims plus case outstanding, so the excess is in the case outstanding: case reserves were strengthened during the year.
> - Strengthening changes when claims are reported, not what they ultimately cost, so the ultimate need not be raised.
> - The reported development factors now overstate future development, so the reporting pattern is revisited before it is applied again.

## Responding to a difference

Hugh White's problem, which Friedland quotes, asks what to do when reported claims for the current accident year are 8% higher than expected. The actuary could

1. **reduce the IBNR** by a corresponding amount, sensing an acceleration in the rate of reporting;
2. **leave the IBNR** at the same percentage of expected claims, sensing a random fluctuation such as a large loss, so the excess raises the ultimate; or
3. **increase the IBNR** in proportion to the excess of actual over expected reported claims, not having full confidence in the expected claims.

None of the three is satisfactory without further investigation, and yet all are reasonable. The actuary revises the estimate when the difference is significant or can be traced to an identifiable change, which is found through meetings with management and claims staff and a detailed analysis of the claims.

## Monitoring between evaluation ages

A monthly or quarterly comparison needs the percentage reported at an age between two ages of the pattern. Linear interpolation assumes the percentage moves evenly between them:

> $$p_{\text{age}} = p_{\text{earlier}} + \frac{\text{age} - \text{earlier age}}{\text{later age} - \text{earlier age}} \times (p_{\text{later}} - p_{\text{earlier}})$$

The percentage reported, $1/\text{CDF}$, is interpolated rather than the CDF. Linear interpolation between quarterly ages is likely sufficient for monthly monitoring. Linear interpolation of an annual pattern is usually not appropriate, particularly for the most immature accident years, because development within a year is skewed early. Bornhuetter and Ferguson suggest the most recent accident year might be 40%, 70%, 85% and 100% developed at three, six, nine and twelve months, rather than the uniform 25%, 50%, 75% and 100%. With such a pattern of how a period's development is spread within it, the expected emergence for part of the period is the period's expected emergence times the share of it that falls in that part.

> [!example]- An accident year is 24 months old at December 31, with $\$4{,}000$ reported and a selected ultimate of $\$5{,}200$. The quarterly pattern has a CDF of $1.25$ at 24 months and $1.10$ at 36 months, and emergence between them is linear. At April 30 the accident year has $\$4{,}400$ reported. How does that compare with expected? {Example}
> - The percentages reported are $1/1.25 = 80.0\%$ at 24 months and $1/1.10 = 90.9\%$ at 36 months.
> - April 30 is 28 months, four of the twelve months between the two ages, so the percentage reported is $80.0\% + \tfrac{4}{12}(10.9\%) = 83.64\%$.
> - The share of the unreported claims reported by April 30 is $0.0364/0.2000 = 0.182$.
> - The expected emergence is $1{,}200 \times 0.182 = \$218$.
> - The expected cumulative reported claims are $4{,}000 + 218 = \$4{,}218$, so actual reported claims are $\$182$ above expected.

> [!trap] Expected emergence from a cumulative percentage
> The expected emergence over a period is the *change* in the percentage reported, not the percentage at the end. At 75% reported, an ultimate of $\$10{,}000{,}000$ expects $\$7{,}500{,}000$ reported in total, of which only $\$1{,}500{,}000$ emerges between 24 and 36 months. Comparing $\$7{,}500{,}000$ with the year's actual emergence of $\$2{,}100{,}000$ compares a cumulative amount with an incremental one.
