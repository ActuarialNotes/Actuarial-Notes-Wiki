---
aliases:
  - Early Exit
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e98555b32d3b72fbd19f3871f88d98b8c1264f910fffb3602195b6e59519aaaa
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Accrued Benefit.md
---
The **Accrued Benefit** of a member of a [[Defined Benefit Plan|defined benefit plan]] is the pension earned by service to date under the plan's benefit formula. In a final-salary plan it is the accrual rate times past service times the pensionable salary. It is what the member keeps on early exit: a deferred pension if she withdraws, or an immediate pension reduced for early payment if she retires early. The [[Actuarial Accrued Liability|actuarial accrued liability]] is the expected present value of the accrued benefits.

> $$B = n\,\alpha\,S^{\text{pen}}$$

> $$B^{\text{wd}} = n\,\alpha\,S^{\text{pen}}\,(1+j)^{\,65-y}$$

> $$B^{\text{er}} = n\,\alpha\,S^{\text{pen}}\,\bigl(1 - \rho\,(65-y)\bigr)$$

> $$f_y = \frac{v^{\,65-y}\;{}_{65-y}p_y\;\ddot{a}_{65}}{\ddot{a}_y}$$

- **Symbols:** Following Dickson, Hardy & Waters (chapter 10), $n$ is the service completed by the valuation or exit date, $\alpha$ is the accrual rate and $S^{\text{pen}}$ is the pensionable salary the plan defines, such as the final salary, a final average or a career average. The normal retirement age is 65, $y$ is the exit age, $j$ is the rate at which a deferred pension is revalued (0 if it is not), and $\rho$ is the early-retirement reduction per year. $f_y$ is the actuarially equivalent reduction factor: the fraction of the full pension that, paid from age $y$, has the same EPV as the full pension deferred to 65.
- **Current or projected salary:** In a final-salary plan the service already worked is fixed, but the salary it will be paid on is not. The [[Traditional Unit Credit Method|traditional unit credit method]] values the accrued benefit on today's salary, and the [[Projected Unit Credit Method|projected unit credit method]] values it on salary projected with the [[Salary Scale|salary scale]] to each exit date. In a career-average plan without revaluation the accrued benefit does not depend on future salary, so the two methods agree.
- **Withdrawal:** A member who leaves before the earliest retirement age keeps her accrued benefit as a deferred pension from the normal retirement age, based on her salary at exit. Without revaluation, inflation erodes it during deferment, so many plans revalue it with prices or at a fixed rate. Its value at exit uses survival from mortality alone, because a deferred member can no longer withdraw or retire from service.
- **Early retirement:** A pension that starts before 65 is paid for more years, so the plan reduces it. A reduction to $f_y$ keeps the EPV equal to that of the full pension deferred to 65, while a smaller reduction, such as a fixed percentage per year, subsidises early retirement and raises the plan's cost.

> [!example]- Accrued Benefit and the Deferred Pension on Withdrawal {Example}
> A final-salary plan pays 2% of the salary rate at exit for each year of service, as a pension from age 65. A member aged exactly 60 has 25 years of service and a salary rate of \$90,000, and salary rates rise 3% a year. (a) Find her accrued benefit on her current salary and on her salary projected to 65. (b) She withdraws at 61.5. Find her deferred pension and its value at withdrawal, given $v^{3.5} = 0.84302$, ${}_{3.5}p_{61.5} = 0.98389$ and $\ddot{a}_{65} = 13.5498$ (SULT at 5%). (c) Repeat (b) if deferred pensions are revalued by 2% a year.
>
> > [!answer]-
> > (a) On today's salary the accrued benefit is $25(0.02)(90{,}000) = 45{,}000$ a year. Projected to 65, her salary rate is $90{,}000(1.03)^5 = 104{,}334.67$, so the same 25 years are worth $25(0.02)(104{,}334.67) = 52{,}167.33$ a year. The five years she may still work are future service and are not part of either figure.
> >
> > (b) At 61.5 she has 26.5 years of service and a salary rate of $90{,}000(1.03)^{1.5} = 94{,}080.22$.
> > $$
> > \begin{align*}
> > B^{\text{wd}} &= 26.5(0.02)(94{,}080.22) \\
> > &= 49{,}862.52 \\
> > v^{3.5}\,{}_{3.5}p_{61.5}\,\ddot{a}_{65} &= 0.84302(0.98389)(13.5498) \\
> > &= 11.23873 \\
> > \text{Value at exit} &= 49{,}862.52(11.23873) \\
> > &= 560{,}391.40
> > \end{align*}
> > $$
> > (c) Revaluation for the 3.5 years to 65 raises the pension by $(1.02)^{3.5} = 1.07177$.
> > $$
> > \begin{align*}
> > B^{\text{wd}} &= 49{,}862.52(1.07177) \\
> > &= 53{,}441.15 \\
> > \text{Value at exit} &= 53{,}441.15(11.23873) \\
> > &= 600{,}610.66
> > \end{align*}
> > $$
> > Revaluation adds 7.2% to what the leaver takes. Without it, 3.5 years of 2% inflation would cut the frozen pension's purchasing power by about 6.7% before the first payment.

> [!example]- Is the Early-Retirement Reduction Actuarially Fair? {Example}
> The same plan allows retirement from 62 and reduces the pension by 5% for each year before 65. The member above retires at 62.5, when her salary rate is \$96,902.63. Given $\ddot{a}_{62.5} = 14.2516$, ${}_{2.5}p_{62.5} = 0.98785$, $v^{2.5} = 0.88517$ and $\ddot{a}_{65} = 13.5498$, find her reduced pension, the actuarially equivalent reduction factor, and the value at retirement of the plan's subsidy.
>
> > [!answer]-
> > Her accrued pension on 27.5 years is $27.5(0.02)(96{,}902.63) = 53{,}296.45$, and the plan pays $0.875(53{,}296.45) = 46{,}634.39$ from 62.5.
> > $$
> > \begin{align*}
> > f_{62.5} &= \frac{0.88517(0.98785)(13.5498)}{14.2516} \\
> > &= \frac{11.84815}{14.2516} \\
> > &= 0.8314
> > \end{align*}
> > $$
> > At 62.5, the plan's reduced pension and the full pension deferred to 65 are worth:
> > $$
> > \begin{align*}
> > \text{Reduced pension} &= 46{,}634.39(14.2516) \\
> > &= 664{,}614.67 \\
> > \text{Full pension at 65} &= 53{,}296.45(11.84815) \\
> > &= 631{,}464.33 \\
> > \text{Subsidy} &= 664{,}614.67 - 631{,}464.33 \\
> > &= 33{,}150.34
> > \end{align*}
> > $$
> > The actuarial reduction is 16.9% for 2.5 years, about 6.7% a year, so the plan's 5% a year is a subsidy worth 5.2% of the value of the deferred pension. The accrued liability captures that cost through the early-retirement rates in the [[Service Table|service table]].

> [!tip]- How it appears on the exam
> - **ALTAM** asks candidates to calculate and interpret the accrued benefit of a DB member, including the benefit on early exit: the deferred pension on withdrawal, with or without revaluation, and the reduced pension on early retirement.
> - **Valuing the benefit:** The question then values the accrued benefit on age retirement or early exit, under the [[Projected Unit Credit Method|projected]] or [[Traditional Unit Credit Method|traditional unit credit]] method, as the [[Actuarial Accrued Liability|accrued liability]] and the [[Normal Cost|normal cost]].
> - **Interpretation:** Some parts ask whether an early-retirement reduction is actuarially fair, or why a leaver's deferred pension is worth less than the benefit of a member who stays.

> [!warning]- Exam traps
> - **Counting future service:** The accrued benefit uses the service completed so far. Using the service the member would have at 65 values benefits she has not yet earned.
> - **Projected salary in the benefit itself:** A leaver's deferred pension is fixed at her salary on exit and grows only by any revaluation. Projecting her salary to 65 after she has left overstates it.
> - **Service-table survival after withdrawal:** The deferred pension is discounted to 65 with the mortality-only ${}_{65-y}p_y$, because a deferred member cannot withdraw or retire from service.
> - **The direction of the reduction:** A reduction of 5% a year for 2.5 years multiplies the pension by 0.875. Dividing by 0.875, or applying the reduction to the EPV of the deferred pension instead of to the pension paid from the early date, gives the wrong benefit.
