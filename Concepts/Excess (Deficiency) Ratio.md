---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:21fbff055ab455724e16e2100e5b6addcbe0cc1ff2eb42cd8900b91e5962a0f1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Excess (Deficiency) Ratio.md
---
![[Media/Figures/Excess_Deficiency_Ratio.svg|340]]

An **Excess (Deficiency) Ratio** measures how a year-end estimate of [[Unpaid Claims|claim liabilities]] has run off. It is the excess (positive: the liabilities proved more than enough) or deficiency (negative) that emerged over one or more calendar years, as a percentage of the liabilities being tested.

When the liabilities are discounted, the [[CIA Runoff|CIA's runoff educational note]] credits them with the investment income earned while they were held, so a liability that was exactly right runs off to zero. The excess (deficiency) that emerges in calendar year $t$ is

> $$\text{Excess (Deficiency)}_t = L_{t-1} + I_t - P_t - L_t$$

- $L_t$ is the discounted claim liability for the [[Accident Year|accident year(s)]] tested at the end of calendar year $t$.
- $I_t$ is the investment income earned during $t$ on the liability.
- $P_t$ is the amount paid during $t$, incremental rather than cumulative.

The investment income is the annual yield applied to the average of the opening and closing liability:

> $$I_t = y_t \times \frac{L_{t-1} + L_t}{2}$$

- $y_t$ is the annual yield for calendar year $t$.

The ratio adds the excesses over the period measured and divides by the liability at its start:

> $$\text{Ratio} = \frac{\sum_t \text{Excess (Deficiency)}_t}{L_{\text{start}}}$$

- $L_{\text{start}}$ is the liability at the start of the period measured.

For a **cumulative** ratio, $L_{\text{start}}$ is the liability at the end of the accident year itself, which is how the note's Table 6 and every published cumulative answer divide. For a **one-year** ratio it is the prior year-end liability. Always say whether the result is an excess or a deficiency.

> [!example]- What are the cumulative discounted ratio for accident year 2023 at 31 December 2025, and the one-year ratio for 2025? {Example}
> For accident year 2023 (\$000s):
>
> | | 31 Dec 2023 | 31 Dec 2024 | 31 Dec 2025 |
> | :--- | ---: | ---: | ---: |
> | Discounted claim liability | 50,000 | 28,000 | 15,000 |
> | Paid during the year | | 20,500 | 12,000 |
> | Annual yield for the year | | 4.0% | 3.5% |
>
> > [!answer]-
> > - The investment income for 2024 is $0.040 \times (50{,}000 + 28{,}000)/2 = 1{,}560$.
> > - The investment income for 2025 is $0.035 \times (28{,}000 + 15{,}000)/2 = 752.5$.
> > - The excess for 2024 is $50{,}000 + 1{,}560 - 20{,}500 - 28{,}000 = 3{,}060$.
> > - The excess for 2025 is $28{,}000 + 752.5 - 12{,}000 - 15{,}000 = 1{,}752.5$.
> > - The cumulative ratio divides by the original liability, not by an average: $(3{,}060 + 1{,}752.5)/50{,}000 = 9.6\%$.
> > - The one-year ratio for 2025 divides by the liability at the end of 2024: $1{,}752.5/28{,}000 = 6.3\%$.
> > - Both are **excesses**: the liability set at the end of 2023 has so far proved $9.6\%$ more than enough.

## Allowing for the time value of money

The note (§1.2) gives two ways to allow for the time value of money. One discounts the payments and the closing liability back to $t-1$. The other adds the investment income earned during $t$ on the assets supporting the liabilities. The two should agree, and the note uses the second because it is simpler to calculate and present. An answer that says only "discount" is incomplete: the time-$t$ amounts are discounted back to $t-1$.

The note says it is useful for the [[Appointed Actuary's Report]] to identify the runoff's components: the undiscounted liabilities, changes in the discount rate and changes in the provision for adverse deviations.

## The undiscounted basis

On the undiscounted basis (§1.1), the emergence is the ultimate estimated at $t-1$ less the ultimate estimated at $t$. Equivalently, it is $L_{t-1} - P_t - L_t$ on undiscounted liabilities, with no investment income. The ratio divides by the undiscounted unpaid amount at the start.

On the discounted basis the same shortcut works with **actuarial present value** ultimates, which are cumulative paid plus discounted unpaid. The excess is the APV ultimate at the start, less the APV ultimate now, plus the investment income. Pre-[[IFRS 17]] questions build $L_t$ as case reserves plus IBNR plus the "effect of discounting and PfAD", where PfAD is the [[Margin for Adverse Deviations|provision for adverse deviations]] the 2011 note refers to.

> [!example]- What are the undiscounted and discounted ratios for accident year 2024 at 31 December 2025, and why do they differ? {Example}
> For accident year 2024 (\$000s), with an annual yield of 3% for 2025:
>
> | | 12 months | 24 months |
> | :--- | ---: | ---: |
> | Cumulative paid | 30,000 | 52,000 |
> | Undiscounted ultimate | 95,000 | 97,000 |
> | Actuarial present value ultimate | 92,000 | 94,600 |
>
> > [!answer]-
> > - The undiscounted unpaid amount at 12 months is $95{,}000 - 30{,}000 = 65{,}000$.
> > - The undiscounted ratio is $(95{,}000 - 97{,}000)/65{,}000 = -3.1\%$.
> > - The discounted liabilities are $92{,}000 - 30{,}000 = 62{,}000$ and $94{,}600 - 52{,}000 = 42{,}600$.
> > - The investment income is $0.03 \times (62{,}000 + 42{,}600)/2 = 1{,}569$.
> > - The discounted excess is $92{,}000 - 94{,}600 + 1{,}569 = -1{,}031$, a ratio of $-1{,}031/62{,}000 = -1.7\%$.
> > - Both bases show a **deficiency**. The undiscounted ultimate rose $2{,}000$.
> > - The effect of discounting and PfAD moved from $-3{,}000$ to $-2{,}400$, adding a further $600$ to the discounted liability.
> > - The investment income offsets part of both: $-2{,}000 - 600 + 1{,}569 = -1{,}031$.

## The yield on the liabilities

The yield (§3) is the investment income attributable to policy liabilities, consistent with any allocation of assets. With no formal allocation, the default yield follows exhibit 10.60 of the return. It is applied to the average of the opening and closing *net unpaid claims + net [[Unearned Premium|unearned premium]] − gross DPAC + [[Premium Deficiency|premium deficiency]] provisions + unearned commissions − agents', brokers' and policyholders' receivables − instalment premiums* (see [[Deferred Policy Acquisition Expenses]]). The result is capped at total investment income. A negative overall yield is used as it is, so the runoff is penalized.

## Reporting in the annual return

Before IFRS 17, the return carried the margin (deficiency) for unpaid claims at the prior year-end on page 60.30, and the ratio on P&C-1 page 60.41. The 2023 [[OSFI Annual Return|annual return]] reports, on page 60.45, the prior-year development excess or (deficiency) on **net, undiscounted** ultimates (column 09 less column 10). The effects of discounting and of the [[Risk Adjustment for Non-Financial Risk|risk adjustment]] are shown separately below it. Page 10.60 reports claims development as a percentage of adjusted equity. The [[OSFI Memorandum]] asks the [[Appointed Actuary]] to explain differences between page 60.45 and the [[Actual vs Expected Analysis|actual-versus-expected]] comparison.

A deficiency repeated across accident years and calendar years says the insurer keeps understating its initial liabilities, and the published 2019 answer says [[OSFI]] may intervene (see [[Reserve Adequacy]] and [[Runoff]]).

> [!trap] Cumulative paid in place of paid during the year
> $P_t$ is the amount paid during calendar year $t$. Subtracting cumulative paid counts earlier years' payments again, an error several examiners' reports list.
