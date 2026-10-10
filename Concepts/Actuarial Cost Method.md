---
aliases:
  - Cost Recognition
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8227bda45644fd94854af17d99a105e60bac3f0f3f840d39db21166afb8fe252
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Actuarial Cost Method.md
---
An **Actuarial Cost Method** is the rule a [[Defined Benefit Plan|defined benefit]] [[Pension Plan|pension plan]] valuation uses to split the present value of each member's future benefits into an [[Actuarial Accrued Liability|actuarial accrued liability]] for the past and a series of [[Normal Cost|normal costs]] for the years still to come. The benefits and the assumptions fix the total cost, and the method decides only when that cost is recognized over a member's career: the pattern of cost recognition.

> $$PVFB_x = AL_x + PVFNC_x$$

> $$NC_x^{\text{UC}} = \alpha\,\hat{S}\,v^{\,r-x}\,{}_{r-x}p_x^{(\tau)}\,\ddot{a}_r$$

> $$k^{\text{EAN}} = \frac{PVFB_e}{PVFS_e}$$

> $$k^{\text{agg}} = \frac{\sum PVFB_x - AVA}{\sum PVFS_x}$$

- **Symbols:** For a member aged $x$ with entry age $e$ and retirement age $r$, $PVFB_x$ is the present value of all projected benefits, $AL_x$ the accrued liability, $PVFNC_x$ the present value of future normal costs and $PVFS_x$ the present value of future salaries. $\alpha$ is the accrual rate, $\hat{S}$ the pensionable salary the benefit will be based on, ${}_{r-x}p_x^{(\tau)}$ the probability of staying in service to $r$ from the [[Service Table|service table]], and $AVA$ the actuarial value of assets from the [[Asset Valuation Method|asset valuation method]].
- **Unit credit methods:** These are accrued benefit methods. The [[Projected Unit Credit Method|projected unit credit]] (PUC) method values the [[Accrued Benefit|benefit accrued]] to date on salary projected by the [[Salary Scale|salary scale]], and its normal cost is one more year's accrual on the same projected salary. The [[Traditional Unit Credit Method|traditional unit credit]] (TUC) method values the benefit on today's salary. Its normal cost is the increase in that accrued benefit over the year, so when pay is expected to rise it also pays to raise every past year's benefit to the new salary. Under both, the normal cost for one member rises steeply with age, because the same year of benefit is discounted over a shorter period and is more likely to be paid.
- **Entry age normal:** EAN is a projected benefit method. It spreads each member's projected benefit evenly from entry to retirement, as a level percentage $k$ of pay or as a level dollar amount, and the accrued liability is whatever the level cost would have built up by now, $AL_x = PVFB_x - k\,PVFS_x$. The cost is front-loaded relative to unit credit, so the EAN liability is larger at any age before retirement.
- **Aggregate method:** This method has no accrued liability and so no unfunded liability. The present value of benefits not already covered by assets is spread over the future salaries of the current members, which means every gain and loss is absorbed into future normal costs automatically.
- **Frozen initial liability and attained age:** The frozen initial liability method fixes an unfunded liability at inception (by entry age in the usual form) and amortizes it separately, then runs the aggregate method on the rest. The attained age normal method funds the past service benefit as a unit credit liability and spreads only the future accruals over future pay, from today's age.
- **Individual and aggregate methods:** Unit credit and EAN are individual methods with a separate amortization of the unfunded liability, $C = NC + \text{amortization of }(AL - AVA)$. Aggregate methods spread cost over the group, so their results depend on the plan's demographics as well as each member's own.
- **Choosing a method:** Funding regulations limit the choice. Canadian going-concern funding commonly uses PUC, and ASC 715 and IAS 19 require a unit credit attribution of benefits to service for accounting. Public sector plans often fund on EAN level percent of pay because it gives a stable contribution rate as a share of payroll. Anderson's *Pension Mathematics for Actuaries* develops the methods in chapter 2.

> [!example]- Normal Cost Over One Career, PUC Versus EAN {Example}
> A plan pays 1.5% of the salary in the year before retirement for each year of service, from age 65. A member enters at 35 on a salary of \$50,000, and salaries rise 3% a year. Use $i = 6\%$, $\ddot{a}_{65} = 12.0$, and ignore all decrements before 65. Find the normal cost at ages 35, 50 and 64 under PUC and under EAN as a level percentage of pay.
>
> > [!answer]-
> > The salary at 64 is $\hat{S} = 50{,}000(1.03)^{29}$, and the PUC normal cost at age $x$ is one year's accrual on it, discounted to $x$.
> > $$
> > \begin{align*}
> > \hat{S} &= 117{,}828.28 \\
> > NC_{35}^{\text{PUC}} &= 0.015(117{,}828.28)(1.06)^{-30}(12.0) \\
> > &= 3{,}692.72 \\
> > NC_{50}^{\text{PUC}} &= 0.015(117{,}828.28)(1.06)^{-15}(12.0) \\
> > &= 8{,}849.81 \\
> > NC_{64}^{\text{PUC}} &= 0.015(117{,}828.28)(1.06)^{-1}(12.0) \\
> > &= 20{,}008.58
> > \end{align*}
> > $$
> > As a share of that year's salary these are 7.39%, 11.36% and 16.98%. For EAN, the projected pension is $30(0.015)\hat{S} = 53{,}022.72$, and the present value of 30 years of salary at entry uses the ratio $1.03/1.06$.
> > $$
> > \begin{align*}
> > PVFB_{35} &= 53{,}022.72(1.06)^{-30}(12.0) \\
> > &= 110{,}781.52 \\
> > PVFS_{35} &= 50{,}000 \sum_{t=0}^{29}\left(\tfrac{1.03}{1.06}\right)^{t} \\
> > &= 1{,}020{,}053.92 \\
> > k &= 110{,}781.52 / 1{,}020{,}053.92 \\
> > &= 10.86\%
> > \end{align*}
> > $$
> > The EAN normal costs are \$5,430.18, \$8,460.04 and \$12,796.57 at the three ages. EAN charges more than PUC early in the career and less near retirement, so at 50 its accrued liability is \$160,897 against PUC's \$132,747. Both methods fund the same pension by 65; EAN simply recognizes the cost sooner.

> [!example]- Gains and Losses Under the Aggregate Method {Example}
> A plan funded by the aggregate method has a present value of future benefits of \$40 million, assets of \$25 million, a present value of future salaries of \$150 million and a payroll of \$10 million this year. Find this year's normal cost. Then suppose an investment loss leaves assets at \$22 million instead.
>
> > [!answer]-
> > The unfunded part of the benefits is spread over all future pay.
> > $$
> > \begin{align*}
> > k &= \frac{40 - 25}{150} \\
> > &= 10\% \\
> > NC &= 0.10(10{,}000{,}000) \\
> > &= 1{,}000{,}000 \\
> > k' &= \frac{40 - 22}{150} \\
> > &= 12\%
> > \end{align*}
> > $$
> > The normal cost rises to \$1,200,000. The \$3 million loss never appears as an unfunded liability; it is folded into the contribution rate and recovered over the members' remaining careers, which is why aggregate methods are smooth but hide the size of a deficit.

> [!tip]- How it appears on the exam
> - **RET-201 Methods:** Candidates compute the normal cost and accrued liability for one member or a small group under two or more methods, usually unit credit against EAN, with salary scales, decrements and [[Ancillary Benefit|ancillary benefits]] such as early retirement.
> - **Cost recognition:** Written questions ask a candidate to describe and explain the pattern of cost each method produces over a career and for an open or closed group, and to recommend a method for a stated objective such as a stable contribution rate.
> - **Accounting link:** Accounting questions under ASC 715 or IAS 19 use projected unit credit, so the same member's service cost may differ from the funding normal cost when the plan funds on another method.

> [!warning]- Exam traps
> - **Same total cost:** A cost method changes the timing of contributions, not the total cost of the plan. Only the benefits, the actual experience and the investment return decide what the plan finally costs.
> - **Individual normal cost versus group cost:** One member's unit credit normal cost climbs with age, but a stable open group's total unit credit cost can be level as a share of payroll. A question about a closed or ageing group is where the unit credit cost rises.
> - **Level percent versus level dollar:** The EAN level percentage of pay uses a present value of future salaries that includes the salary scale, while the level dollar version uses an annuity of 1 a year. Mixing the two denominators gives the wrong normal cost.
> - **Aggregate has no unfunded liability:** Under the aggregate method there is no separate amortization payment. Adding one on top of the normal cost counts the unfunded benefits twice.
> - **TUC is not PUC:** Under TUC the year's normal cost includes the cost of raising past accruals to the new salary. Forgetting that piece understates the TUC normal cost, especially for an older member.
