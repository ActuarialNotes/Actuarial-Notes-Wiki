---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:a6812adef37ae9f35ec8124ee8cf73df215ad0b3ea655ba03909fbe16c1ff908
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Valuation.md
---

**Valuation** is the actuarial process of placing a value, at a valuation date, on a set of future cash flows: an insurer's policy obligations, a [[Pension Plan|pension plan's]] promised benefits, a block of assets, or a derivative. The cash flows are projected under stated assumptions and methods, then discounted. The result depends on the *purpose* of the valuation as much as on the cash flows. A funding valuation, an accounting valuation and a wind-up or solvency valuation of the same plan give different numbers.

> $$V_0 = \sum_{t} v^t\, E\left[CF_t\right]$$

> $$\text{Surplus} = \text{Assets} - \text{Liabilities}$$

> $$V_0^{\text{derivative}} = e^{-rT}\,E^{\mathbb{Q}}\left[\text{Payoff}_T\right]$$

- **Liabilities.** For an insurer, $V_0$ is the expected [[Present Value|present value]] of benefits and expenses less premiums, the policy value or [[Reserve|reserve]]. For a [[Defined Benefit Plan|DB plan]], a funding method splits the value of benefits into the [[Actuarial Accrued Liability|actuarial accrued liability]] for past service and a [[Normal Cost|normal cost]] for the coming year. Projected unit credit (PUC) projects salary to retirement. Traditional unit credit (TUC) uses the current salary.
- **The basis follows the purpose.** Going-concern funding uses best-estimate assumptions, sometimes with margins. Accounting valuations follow a standard ([[GAAP]], [[IFRS 17]], pension accounting standards). Solvency and wind-up valuations assume the plan or company ends at the valuation date and use settlement-type [[Discount Rate|discount rates]]. A [[Valuation Principle|valuation principle]] is the rulebook for one such purpose.
- **Assets** are valued at [[Market Value|market value]] or a smoothed actuarial value. **Derivatives** are valued by [[Risk-Neutral Valuation|risk-neutral valuation]] or replication, as in the [[Black-Scholes Model|Black-Scholes model]] (INV-201, ALTAM embedded options).
- **Assumptions** cover interest, [[Mortality|mortality]], salary scale, lapse and expense. Their selection is governed by [[Actuarial Standards of Practice|ASOPs]], such as ASOP 4 for pension obligations, and in Canada by CIA standards.

> [!example]- Accrued Liability and Normal Cost, PUC vs TUC {Example}
> A DB plan pays $1.5\%$ of final salary per year of service, as a pension from age 65. A member aged 55 has 20 years of service and a current salary of \$100,000. Final salary is projected as $100{,}000(1.03)^{10}$. The probability of reaching 65 in service is $0.94$, no benefit is paid on earlier exit, $i = 5\%$, and the pension annuity factor at 65 is $\ddot{a}^{(12)}_{65} = 12.0$. Find the accrued liability under TUC and PUC, and the PUC normal cost.
>
> > [!answer]-
> > The EPV factor at 55 for each \$1 of annual pension at 65 is $0.94\,v^{10}(12.0)$.
> > $$
> > \begin{align*}
> > 0.94\,v^{10}(12.0) &= 0.577078(12.0) \\
> > &= 6.92494 \\
> > \text{AAL}^{\text{TUC}} &= 0.015(20)(100{,}000)(6.92494) \\
> > &= 207{,}748 \\
> > \text{AAL}^{\text{PUC}} &= 0.015(20)(134{,}392)(6.92494) \\
> > &= 279{,}196 \\
> > \text{NC}^{\text{PUC}} &= 0.015(1)(134{,}392)(6.92494) \\
> > &= 13{,}960
> > \end{align*}
> > $$
> > PUC reserves for the projected salary now, so its accrued liability is $34\%$ higher. TUC recognises the salary growth later, through higher normal costs.

> [!example]- One Plan, Two Valuation Purposes {Example}
> A closed pension plan's benefit outgo is approximated by \$120,000 a year, paid at the end of each year for 15 years. Assets are \$1,400,000. Value the liability and the funded ratio at a going-concern discount rate of $5.5\%$ and at a wind-up rate of $3.5\%$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > L_{5.5\%} &= 120{,}000\,a_{\overline{15}|5.5\%} \\
> > &= 120{,}000(10.03758) \\
> > &= 1{,}204{,}510 \\
> > L_{3.5\%} &= 120{,}000(11.51741) \\
> > &= 1{,}382{,}089
> > \end{align*}
> > $$
> > The funded ratio is $1{,}400{,}000/1{,}204{,}510 = 116.2\%$ on the going-concern basis, but only $101.3\%$ on wind-up. The cash flows are identical. Only the purpose, and therefore the discount rate, changed.

> [!tip]- How it appears on the exam
> - **ALTAM** asks for the actuarial accrued liability and normal cost under PUC and TUC. It gives a service table, a salary scale and an annuity factor, sometimes with early-exit benefits that need a sum over decrements.
> - **RET-201/RET-301** ask written and calculation questions on valuations for a stated purpose: funding, accounting disclosure, plan termination, wind-up and solvency, mergers, and actuarial equivalence. The question asks which assumptions and methods fit the purpose, and how plan investments interact with them.
> - **ILA-101/ILA-201U** compare reserve valuations under the U.S. statutory, GAAP and IFRS frameworks. **CP-321** covers valuing retiree group benefits.
> - **INV-201** values derivatives by replication and risk-neutral pricing.

> [!warning]- Exam traps
> - **PUC vs TUC salary.** PUC uses the projected final salary. TUC uses the current salary. Swapping them gives the other method's answer, which will be among the choices.
> - **Normal cost under TUC is not one year's accrual on current pay.** It also includes the effect of this year's salary increase on all past service.
> - **Basis for the wrong purpose.** Quoting a going-concern liability where a wind-up or solvency figure is asked for overstates the funded position. A wind-up rate below the funding rate raises the liability.
> - **Risk-neutral vs real-world.** A derivative's payoff is averaged under $\mathbb{Q}$ and discounted at $r$. Averaging under real-world probabilities and then discounting at $r$ misprices it.
