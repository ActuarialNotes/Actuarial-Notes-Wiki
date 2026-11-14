---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:6ea0644eb8134deef8efa7d9f4c541a7d03d2009dc1bb5952a5d5a8ed30a879d
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Valuation.md
---

**Valuation** is the actuarial process of placing a value, at a valuation date, on a set of future cash flows: an insurer's policy obligations, a [[Pension Plan|pension plan's]] promised benefits, a block of assets, or a derivative. The cash flows are projected under stated assumptions and methods, then discounted, so the value at the valuation date is

> $$V_0 = \sum_{t} v^t\, E\left[CF_t\right]$$

- $CF_t$ is the cash flow at time $t$.
- $v^t$ is the discount factor for time $t$.

The result depends on the purpose of the valuation as much as on the cash flows. A funding valuation, an accounting valuation and a wind-up or solvency valuation of the same plan give different numbers.

## Valuation of liabilities

For an insurer, $V_0$ is the expected [[Present Value|present value]] of benefits and expenses less premiums, the policy value or [[Reserve|reserve]]. For a [[Defined Benefit Plan|DB plan]], a funding method splits the value of benefits into the [[Actuarial Accrued Liability|actuarial accrued liability]] for past service and a [[Normal Cost|normal cost]] for the coming year. The [[Projected Unit Credit Method|projected unit credit]] (PUC) method projects salary to retirement. The [[Traditional Unit Credit Method|traditional unit credit]] (TUC) method uses the current salary, and its normal cost also includes the effect of this year's salary increase on all past service.

> [!example]- What are the accrued liability under TUC and PUC, and the PUC normal cost, for this member? {Example}
> A DB plan pays $1.5\%$ of final salary per year of service, as a pension from age 65. A member aged 55 has 20 years of service and a current salary of $\$100{,}000$. Final salary is projected as $100{,}000(1.03)^{10}$. The probability of reaching 65 in service is $0.94$, no benefit is paid on earlier exit, $i = 5\%$, and the pension annuity factor at 65 is $\ddot{a}^{(12)}_{65} = 12.0$.
>
> > [!answer]-
> > - The EPV at 55 of each $\$1$ of annual pension at 65 is $0.94\,v^{10}(12.0) = 0.577078(12.0) = 6.92494$.
> > - The projected final salary is $100{,}000(1.03)^{10} = 134{,}392$.
> > - Under TUC, the accrued liability is $0.015(20)(100{,}000)(6.92494) = 207{,}748$.
> > - Under PUC, it is $0.015(20)(134{,}392)(6.92494) = 279{,}196$.
> > - The PUC normal cost is one year's accrual, $0.015(134{,}392)(6.92494) = 13{,}960$.
> > - PUC reserves for the projected salary now, so its accrued liability is $34\%$ higher. TUC recognises the salary growth later, through higher normal costs.

## The basis follows the purpose

Going-concern funding uses best-estimate assumptions, sometimes with margins. Accounting valuations follow a standard ([[GAAP]], [[IFRS 17]], pension accounting standards). Solvency and wind-up valuations assume the plan or company ends at the valuation date and use settlement-type [[Discount Rate|discount rates]]. A wind-up rate below the funding rate raises the liability. A [[Valuation Principle|valuation principle]] is the rulebook for one such purpose.

The assumptions cover interest, [[Mortality|mortality]], salary scale, lapse and expense. Their selection is governed by [[Actuarial Standards of Practice|ASOPs]], such as ASOP 4 for pension obligations, and in Canada by CIA standards.

Assets are valued at [[Market Value|market value]] or a smoothed actuarial value. The surplus is

> $$\text{Surplus} = \text{Assets} - \text{Liabilities}$$

> [!example]- What are this plan's liability and funded ratio at a going-concern rate of $5.5\%$ and at a wind-up rate of $3.5\%$? {Example}
> A closed pension plan's benefit outgo is approximated by $\$120{,}000$ a year, paid at the end of each year for 15 years. Assets are $\$1{,}400{,}000$.
>
> > [!answer]-
> > - At $5.5\%$, the liability is $120{,}000\,a_{\overline{15}|} = 120{,}000(10.03758) = 1{,}204{,}510$.
> > - At $3.5\%$, it is $120{,}000(11.51741) = 1{,}382{,}089$.
> > - The funded ratio is $1{,}400{,}000/1{,}204{,}510 = 116.2\%$ on the going-concern basis.
> > - It is $1{,}400{,}000/1{,}382{,}089 = 101.3\%$ on the wind-up basis.
> > - The cash flows are the same. Only the purpose, and therefore the discount rate, changed.

## Valuation of derivatives

Derivatives are valued by [[Risk-Neutral Valuation|risk-neutral valuation]] or by replication, as in the [[Black-Scholes Model|Black-Scholes model]]. The value of a derivative paying $\text{Payoff}_T$ at time $T$ is

> $$V_0 = e^{-rT}\,E^{\mathbb{Q}}\left[\text{Payoff}_T\right]$$

- $r$ is the risk-free force of interest.
- $E^{\mathbb{Q}}$ is the expectation under the risk-neutral probabilities $\mathbb{Q}$.

Averaging the payoff under real-world probabilities and then discounting at $r$ misprices the derivative.

> [!trap] Swapping the salaries of PUC and TUC
> PUC uses the projected final salary and TUC uses the current salary. Using the other method's salary gives the other method's answer.
