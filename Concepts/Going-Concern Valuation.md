---
aliases:
  - Ongoing Plan
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:eb06dd4749269cd4ce297f9ed2fffdb3c11f08d10ad8db2f9f3289d394450fef
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Going-Concern Valuation.md
---
A **Going-Concern Valuation** is the [[Valuation|valuation]] of a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]] on the assumption that the plan and its sponsor continue indefinitely: members keep working, earning service and pay increases, and the fund keeps investing for the long term. It uses an actuarial cost method, such as the [[Projected Unit Credit Method|projected unit credit]] (PUC) or [[Traditional Unit Credit Method|traditional unit credit]] (TUC) method, to split the value of the benefits into a [[Normal Cost|normal cost]] for the coming year and an [[Actuarial Accrued Liability|actuarial accrued liability]] (AAL) for service to date, and it sets the contributions that [[Funding|fund]] the plan.

> $$UAL_t = AAL_t - AVA_t$$

> $$C_t = NC_t + SP_t$$

> $$UAL_{t+1}^{\text{exp}} = \left(UAL_t + NC_t - C_t\right)(1+i)$$

> $$i_{\text{val}} = i_{\text{BE}} - m$$

- **Symbols:** $AAL_t$ is the actuarial accrued liability and $AVA_t$ is the actuarial value of assets, either market value or a smoothed value set by the [[Asset Valuation Method|asset valuation method]], so $UAL_t$ is the unfunded liability (a surplus when negative). $NC_t$ is the normal cost and $SP_t$ the special payments that amortize the unfunded liability, both paid at the start of the year in the roll-forward. $i_{\text{BE}}$ is the best-estimate discount rate, $m$ is a margin for adverse deviation, and $i_{\text{val}}$ is the rate actually used.
- **Cost methods:** Unit credit methods value the benefit accrued to date (on projected pay under PUC, on current pay under TUC) and charge each year's accrual as the normal cost. Entry age normal spreads the cost of each member's projected benefit as a level amount or a level percentage of pay over the career, which front-loads cost relative to PUC. Aggregate methods spread the whole unfunded present value over future pay and produce no separate unfunded liability. The method changes the pattern of cost recognition, not the benefits.
- **Assumptions:** The going-concern basis uses best-estimate economic and demographic assumptions. The discount rate is usually built from the expected return on the plan's asset mix, less investment expenses, with or without an explicit margin, and the CIA's standards require the actuary to disclose the margins included and the method used to set the rate.
- **Provision for adverse deviations:** A PfAD is a margin that makes the going-concern liability more conservative than best estimate, usually through a lower discount rate. Some Canadian jurisdictions now prescribe a minimum PfAD for funding, which links the margin to how much of the fund is invested in non-fixed-income assets.
- **Special payments:** A going-concern unfunded liability is amortized by special payments over a period that the governing legislation caps. A going-concern surplus can be used to reduce contributions, within the limits set by the plan terms, the legislation and the Income Tax Act.
- **Gains and losses:** The roll-forward gives the unfunded liability expected at the next valuation if every assumption is realized. The difference between the actual and expected values is the experience gain or loss, split by source (investment return, salary increases, mortality, terminations) so that an [[Experience Study|experience study]] can test the assumptions behind it.
- **Going concern and solvency:** In Canada the going-concern valuation is paired with a solvency or hypothetical wind-up valuation, which values the benefits as if the plan were [[Plan Termination|wound up]] on the valuation date at settlement rates and with no future salary increases. The legislation sets contributions from both results, under the rules in [[Canadian Pension Legislation|Canadian pension legislation]].

> [!example]- A Margin for Adverse Deviation Under PUC {Example}
> An ongoing plan's active members have a total accrued pension, on projected pay, of \$2,000,000 a year payable from age 65, and the coming year's service adds \$100,000 a year of projected pension. Treat the members as all aged 50, with a probability of 0.85 of reaching 65 in service and no benefit on earlier exit. With illustrative annuity factors $\ddot{a}_{65} = 12.40$ at 5.5% and $12.95$ at 5.0%, find the AAL, the normal cost and the funded ratio on assets of \$9,000,000 at the best-estimate rate of 5.5%, and with a PfAD of 0.5% in the discount rate.
>
> > [!answer]-
> > Each \$1 of annual pension from 65 is worth $v^{15}(0.85)\,\ddot{a}_{65}$ today.
> > $$
> > \begin{align*}
> > f_{5.5\%} &= 0.44793(0.85)(12.40) \\
> > &= 4.72121 \\
> > AAL_{5.5\%} &= 2{,}000{,}000(4.72121) \\
> > &= 9{,}442{,}420 \\
> > NC_{5.5\%} &= 100{,}000(4.72121) \\
> > &= 472{,}121 \\
> > f_{5.0\%} &= 0.48102(0.85)(12.95) \\
> > &= 5.29480 \\
> > AAL_{5.0\%} &= 2{,}000{,}000(5.29480) \\
> > &= 10{,}589{,}600 \\
> > NC_{5.0\%} &= 100{,}000(5.29480) \\
> > &= 529{,}480
> > \end{align*}
> > $$
> > The funded ratio is $9{,}000{,}000/9{,}442{,}420 = 95.3\%$ at best estimate and $9{,}000{,}000/10{,}589{,}600 = 85.0\%$ with the margin. The PfAD raises the AAL and normal cost by about 12%, and it turns an unfunded liability of \$442,420 into one of \$1,589,600 that special payments must amortize.

> [!example]- Rolling the Unfunded Liability Forward and Finding the Loss {Example}
> At the last valuation the AAL was \$30,000,000 and the actuarial value of assets \$27,000,000. The normal cost of \$1,200,000 and contributions of \$1,600,000 were paid at the start of the year, benefits of \$1,000,000 were paid at the end, and the valuation rate is 5.5%. A year later the assets are \$28,400,000 and the AAL is \$31,700,000. Find the expected unfunded liability and the gain or loss, split between assets and liabilities.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > UAL_1^{\text{exp}} &= (3{,}000{,}000 + 1{,}200{,}000 - 1{,}600{,}000)(1.055) \\
> > &= 2{,}743{,}000 \\
> > A_1^{\text{exp}} &= (27{,}000{,}000 + 1{,}600{,}000)(1.055) - 1{,}000{,}000 \\
> > &= 29{,}173{,}000 \\
> > AAL_1^{\text{exp}} &= (30{,}000{,}000 + 1{,}200{,}000)(1.055) - 1{,}000{,}000 \\
> > &= 31{,}916{,}000
> > \end{align*}
> > $$
> > The actual unfunded liability is $31{,}700{,}000 - 28{,}400{,}000 = 3{,}300{,}000$, so the plan had a net loss of \$557,000. The assets fell \$773,000 short of expected, an investment loss, while the AAL came in \$216,000 below expected, a liability gain. The loss is added to the unfunded liability and amortized by new special payments.

> [!tip]- How it appears on the exam
> - **RET-201:** Candidates perform periodic valuations of ongoing plans, computing the normal cost and AAL under several cost methods, and explain the pattern of cost recognition each produces. Questions also roll the unfunded liability forward, find gains and losses, and ask how the asset valuation method affects cost stability.
> - **RET-301:** Candidates prepare going-concern results appropriate for Canadian regulatory purposes. That means selecting and defending best-estimate assumptions and margins, computing the required contributions with special payments, and setting the result beside the solvency and hypothetical wind-up valuations.

> [!warning]- Exam traps
> - **Going-concern for a wind-up question:** The going-concern basis assumes the plan continues, with future pay increases in PUC and a discount rate tied to the asset mix. Using it where a solvency or wind-up liability is asked for usually understates the liability.
> - **Timing in the roll-forward:** Contributions paid at the start of the year earn a full year's interest and benefits paid at year-end earn none. Treating every cash flow as mid-year, or ignoring the timing, misstates the expected unfunded liability and so the gain or loss.
> - **Sign of the gain:** Assets above expected and a liability below expected are both gains. A higher-than-expected AAL is a loss even when the plan's assets also did well.
> - **The margin's direction:** A PfAD built into the discount rate lowers the rate and raises the liability. Adding the margin to the rate instead moves the result the wrong way.
