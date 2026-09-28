---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:57fef9755b7c47e9dcdd5062c332ecbd652c8ef68f54a218bed370dd7f93f945
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Excess (Deficiency) Ratio.md
---

**The Excess (Deficiency) Ratio** measures how a year-end estimate of [[Unpaid Claims|claim liabilities]] has run off: the excess (positive: the liabilities proved more than enough) or deficiency (negative) that emerged over one or more calendar years, as a percentage of the liabilities being tested. When the liabilities are discounted, the [[CIA Runoff|CIA's runoff educational note]] credits them with the investment income earned while they were held, so a liability that was exactly right runs off to zero.

> $$\text{Excess (Deficiency)}_t = L_{t-1} + I_t - P_t - L_t$$
>
> $$I_t = y_t \times \frac{L_{t-1} + L_t}{2}$$
>
> $$\text{Ratio} = \frac{\sum_t \text{Excess (Deficiency)}_t}{L_{\text{start}}}$$

- $L_t$ is the discounted claim liability for the [[Accident Year|accident year(s)]] tested at the end of calendar year $t$, $P_t$ the amount **paid during** $t$ (incremental, not cumulative — using cumulative paid is an error several examiners' reports list), $y_t$ the annual yield for $t$, and $L_{\text{start}}$ the liability at the start of the period measured. For a **cumulative** ratio that is the liability at the end of the accident year itself, which is how the note's Table 6 and every published cumulative answer divide; for a **one-year** ratio it is the prior year-end liability.
- **Two ways to allow for the time value of money** (note §1.2): discount the payments and the closing liability back to $t-1$, or add the investment income earned during $t$ on the assets supporting the liabilities. They should agree; the note uses the second because it is simpler to calculate and present. Examiners marked down answers that said only "discount": the answer has to say that the time-$t$ amounts are discounted back to $t-1$.
- **Undiscounted basis** (§1.1): the emergence is the ultimate estimated at $t-1$ less the ultimate estimated at $t$, or equivalently $L_{t-1} - P_t - L_t$ on undiscounted liabilities, with no investment income; the ratio divides by the undiscounted unpaid amount at the start. On the discounted basis the same shortcut works with **actuarial present value** ultimates (cumulative paid plus discounted unpaid): excess = APV ultimate at the start $-$ APV ultimate now $+$ investment income. Pre-[[IFRS 17]] questions build $L_t$ as case reserves plus IBNR plus the "effect of discounting and PfAD" — the [[Margin for Adverse Deviations|provision for adverse deviations]] the 2011 note refers to.
- **Which yield** (§3): the investment income attributable to policy liabilities, consistent with any allocation of assets. With no formal allocation, the default yield follows exhibit 10.60 of the return, applied to the average of the opening and closing *net unpaid claims + net [[Unearned Premium|unearned premium]] − gross DPAC + [[Premium Deficiency|premium deficiency]] provisions + unearned commissions − agents', brokers' and policyholders' receivables − instalment premiums* (see [[Deferred Policy Acquisition Expenses]]). The result is capped at total investment income, and a negative overall yield is used as it is, so the runoff is penalized.
- **Where it appears.** Before IFRS 17 the return carried the margin (deficiency) for unpaid claims at the prior year-end on page 60.30, and the ratio on P&C-1 page 60.41. The 2023 [[OSFI Annual Return|annual return]] reports, on page 60.45, the prior-year development excess or (deficiency) on **net, undiscounted** ultimates (column 09 less column 10), with the effects of discounting and of the [[Risk Adjustment for Non-Financial Risk|risk adjustment]] shown separately below; page 10.60 reports claims development as a percentage of adjusted equity. The [[OSFI Memorandum]] asks the [[Appointed Actuary]] to explain differences between page 60.45 and the [[Actual vs Expected Analysis|actual-versus-expected]] comparison.
- **Reading it.** Always say whether the result is an excess or a deficiency. The note says it is useful for the [[Appointed Actuary's Report]] to identify the runoff's components — the undiscounted liabilities, changes in the discount rate and changes in the provision for adverse deviations (§1.2). A deficiency repeated across accident years and calendar years says the insurer keeps understating its initial liabilities, and the published 2019 answer says [[OSFI]] may intervene (see [[Reserve Adequacy]], [[Runoff]]).

![[Media/Figures/Excess_Deficiency_Ratio.svg|340]]

> [!example]- Cumulative Discounted Ratio for One Accident Year {Example}
> For accident year 2023 (\$000s): discounted claim liabilities are $50{,}000$ at 31 December 2023, $28{,}000$ at 31 December 2024 and $15{,}000$ at 31 December 2025. Payments were $20{,}500$ during 2024 and $12{,}000$ during 2025. The annual yield was $4.0\%$ in 2024 and $3.5\%$ in 2025.
>
> Calculate the cumulative discounted excess (deficiency) ratio for accident year 2023 as at 31 December 2025, and the one-year ratio for 2025.
>
> > [!answer]-
> > Investment income on the average liability in each year:
> >
> > $$
> > \begin{align*}
> > I_{2024} &= 0.040 \times \frac{50{,}000 + 28{,}000}{2} \\
> > &= 1{,}560 \\
> > I_{2025} &= 0.035 \times \frac{28{,}000 + 15{,}000}{2} \\
> > &= 752.5
> > \end{align*}
> > $$
> >
> > Excess in each calendar year:
> >
> > $$
> > \begin{align*}
> > E_{2024} &= 50{,}000 + 1{,}560 - 20{,}500 - 28{,}000 \\
> > &= 3{,}060 \\
> > E_{2025} &= 28{,}000 + 752.5 - 12{,}000 - 15{,}000 \\
> > &= 1{,}752.5
> > \end{align*}
> > $$
> >
> > Both ratios:
> >
> > $$
> > \begin{align*}
> > \text{Cumulative ratio} &= \frac{3{,}060 + 1{,}752.5}{50{,}000} \\
> > &= 9.6\% \\
> > \text{One-year ratio (2025)} &= \frac{1{,}752.5}{28{,}000} \\
> > &= 6.3\%
> > \end{align*}
> > $$
> >
> > Both are **excesses**: the liability set at the end of 2023 has so far proved $9.6\%$ more than enough, and the cumulative ratio divides by that original $50{,}000$, not by an average.

> [!example]- Undiscounted Versus Discounted From Ultimates {Example}
> For accident year 2024 (\$000s), as at 31 December 2025:
>
> | | 12 months | 24 months |
> |---|---|---|
> | Cumulative paid | $30{,}000$ | $52{,}000$ |
> | Undiscounted ultimate | $95{,}000$ | $97{,}000$ |
> | Actuarial present value ultimate | $92{,}000$ | $94{,}600$ |
>
> The annual yield for 2025 was $3\%$. Calculate the undiscounted and the discounted excess (deficiency) ratios for accident year 2024 as at 31 December 2025, and explain the difference.
>
> > [!answer]-
> > **Undiscounted.** The unpaid amount at 12 months is $95{,}000 - 30{,}000 = 65{,}000$.
> >
> > $$
> > \begin{align*}
> > \text{Ratio} &= \frac{95{,}000 - 97{,}000}{65{,}000} \\
> > &= -3.1\%
> > \end{align*}
> > $$
> >
> > **Discounted.** The discounted liabilities are $92{,}000 - 30{,}000 = 62{,}000$ and $94{,}600 - 52{,}000 = 42{,}600$.
> >
> > $$
> > \begin{align*}
> > I_{2025} &= 0.03 \times \frac{62{,}000 + 42{,}600}{2} \\
> > &= 1{,}569 \\
> > \text{Excess} &= 92{,}000 - 94{,}600 + 1{,}569 \\
> > &= -1{,}031 \\
> > \text{Ratio} &= \frac{-1{,}031}{62{,}000} \\
> > &= -1.7\%
> > \end{align*}
> > $$
> >
> > Both bases show a **deficiency**, and the pieces reconcile: the undiscounted ultimate rose $2{,}000$; the effect of discounting and PfAD moved from $-3{,}000$ to $-2{,}400$, adding a further $600$ to the discounted liability; and the $1{,}569$ of investment income earned on the liability offsets part of both, since $-2{,}000 - 600 + 1{,}569 = -1{,}031$. Separating undiscounted development from the discount and margin effects is the kind of analysis the CIA note says is useful in the Appointed Actuary's report.
