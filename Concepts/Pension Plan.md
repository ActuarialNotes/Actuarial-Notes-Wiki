---
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:da73586b12142c14c699e89fcc16ce3f331f6b3770cb9acd7fbb5ddd338a8b67
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Pension Plan.md
---

A **pension plan** is an arrangement through which a [[Plan Sponsor|plan sponsor]], usually an employer, provides retirement income to employees, financed by contributions accumulated in a fund. In a [[Defined Benefit Plan|defined benefit (DB)]] plan the benefit is set by formula from salary and service and the sponsor bears the investment and [[Mortality|longevity]] risk; in a [[Defined Contribution Plan|defined contribution (DC)]] plan the contributions are set and the member's benefit is whatever the account buys.

> $$B = \alpha \, n \, \bar S$$

> $$R = \frac{\text{pension income in the year after retirement}}{\text{salary in the year before retirement}}$$

> $$\frac{S_y}{S_x} = \frac{s_y}{s_x}$$

> $$c\sum_{t=0}^{n-1} S_{x+t}\,(1+i)^{n-t} = \text{account at retirement}$$

- In the DB formula $\alpha$ is the **accrual rate** (e.g. $1.5\%$), $n$ the years of service and $\bar S$ the pensionable salary: final average salary (FAS), career average earnings (CAE), or career average revalued earnings (CARE). $R$ is the **replacement ratio**
- The **salary scale** $s_y$ projects salary from age $x$ to age $y$; in the DC equation $c$ is the contribution rate, paid at the start of each year here, and the account buys an annuity at retirement
- A DB plan is valued for several **purposes** with different assumptions: **going-concern funding** (contributions, via a cost method's [[Normal Cost|normal cost]] and [[Actuarial Accrued Liability|accrued liability]]), **solvency or hypothetical wind-up** (benefits if the plan ended today, at annuity-purchase rates), **termination**, and accounting
- The liabilities are long-duration and often inflation-linked, so their value is very sensitive to interest rates and longevity; liability-driven investing matches the asset [[Duration|duration]] to the liability's (a partial [[Immunization|immunization]]) instead of maximizing return

> [!example]- Replacement Ratio under a Final-Average-Salary Plan {Example}
> A member aged exactly 40, hired at 30, earns $\$70{,}000$ in the year of age 40 to 41. Salaries rise $3\%$ a year. The plan pays $1.6\%$ of the 3-year final average salary per year of service at age 65. Find the annual pension and the replacement ratio.
>
> > [!answer]-
> > The final year's salary (age 64 to 65) is $70{,}000(1.03)^{24} = 142{,}296$, and the 3-year average is
> > $$
> > \begin{align*}
> > \bar S &= \frac{142{,}296}{3}\left(1 + 1.03^{-1} + 1.03^{-2}\right) \\
> >        &= 138{,}191 \\
> > B &= 0.016 \times 35 \times 138{,}191 \\
> >   &= 77{,}387 \\
> > R &= \frac{77{,}387}{142{,}296} \\
> >   &= 0.544
> > \end{align*}
> > $$
> > The pension of $\$77{,}387$ replaces $54.4\%$ of final salary; averaging over three years costs about $2.9\%$ of the benefit.

> [!example]- DC Contribution Rate for a Target Replacement Ratio {Example}
> A member aged 35 earns $\$50{,}000$ this year; salaries rise $3\%$ a year. Contributions of $c$ times salary are paid at the start of each year to age 65 and earn $6\%$. At 65 the account buys a pension at $\$12.0$ per $\$1$ of annual income. Find $c$ for a replacement ratio of $50\%$.
>
> > [!answer]-
> > Final salary is $50{,}000(1.03)^{29} = 117{,}828$, so the target pension is $58{,}914$ and the account must reach $12.0 \times 58{,}914 = 706{,}970$.
> > $$
> > \begin{align*}
> > \sum_{t=0}^{29} 50{,}000(1.03)^t(1.06)^{30-t} &= 50{,}000(1.06)^{30}\,\frac{1 - (1.03/1.06)^{30}}{1 - 1.03/1.06} \\
> >                                               &= 5{,}858{,}671 \\
> > c &= \frac{706{,}970}{5{,}858{,}671} \\
> >   &= 0.1207
> > \end{align*}
> > $$
> > A contribution rate of about $12.1\%$ meets the target, but only if every assumption is realized; the member bears any shortfall.

> [!example]- Interest Rate Hedge Ratio of a DB Plan {Example}
> A DB plan has liabilities of $\$200$ million with modified duration $14$. Its $\$200$ million of assets are $\$80$ million of bonds with duration $6$ and $\$120$ million of equities (treat as duration $0$). Find the interest rate hedge ratio, the surplus change if rates fall $1\%$, and the receive-fixed swap notional (duration $18$) that raises the hedge ratio to $80\%$.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Hedge ratio} &= \frac{80 \times 6}{200 \times 14} \\
> >                    &= 17.1\% \\
> > \Delta\text{Surplus} &\approx (480 - 2{,}800)(0.01) \\
> >                      &= -23.2 \text{ million} \\
> > \text{Notional} &= \frac{0.8(2{,}800) - 480}{18} \\
> >                 &= 97.8 \text{ million}
> > \end{align*}
> > $$
> > The plan loses $\$23.2$ million of surplus on a $1\%$ fall; a $\$97.8$ million swap overlay cuts that to about $\$5.6$ million without selling equities.

> [!tip]- How it appears on the exam
> - **ALTAM** (Pension Plans and Retirement Benefits): compute replacement ratios for FAS, CAE and CARE plans, the DC contribution rate for a target ratio, and use service-table and salary-scale functions to value accrued benefits.
> - **RET-201 / RET-301** ("differentiate between the various purposes for valuing pension plans"): explain how going-concern, solvency or hypothetical wind-up, termination and accounting valuations differ in purpose, assumptions and method, usually as a written answer for a described plan.
> - **CP-351** ("asset allocation strategies appropriate to underlying liability profiles such as pension plans"): critique an allocation using duration, hedge ratio and surplus sensitivity, and propose a liability-driven investment strategy.

> [!warning]- Exam traps
> - **Wrong salary in the replacement ratio.** The denominator is the salary in the year *before* retirement, not the final average salary and not the salary projected to the retirement age itself.
> - **Counting years of salary increase.** A salary for the year of age 40 to 41 grows $24$ times to reach the year 64 to 65, not $25$.
> - **Using going-concern assumptions for a wind-up valuation.** Solvency and hypothetical wind-up liabilities use settlement (annuity purchase and commuted value) rates and include no future salary increases; a going-concern discount rate understates them.
> - **Treating asset share as hedge ratio.** A plan $40\%$ invested in bonds is not $40\%$ hedged; the hedge ratio compares *dollar durations*, and short bonds hedge little of a long liability.
