---
aliases:
  - Benefit Subsidy
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:d907f9e2dd33b2af831d8e2167a40feddf2ec860dbefc6089af0f559fb060c02
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Early Retirement.md
---
**Early Retirement** is the start of a pension before the plan's normal retirement age, allowed by a [[Defined Benefit Plan|defined benefit plan]] from a stated earliest age and usually with a reduction for each year the pension starts early. When the plan's reduction is smaller than the actuarially equivalent one, the early pension is worth more than the deferred pension it replaces, and the difference is a benefit subsidy paid for by the [[Plan Sponsor|plan sponsor]].

> $$B_y = B\left(1 - r\,(NRA - y)\right)$$

> $$f_y = \frac{{}_{NRA-y}E_y\;\ddot{a}_{NRA}}{\ddot{a}_y}$$

> $$\text{Subsidy}_y = B_y\,\ddot{a}_y - B\;{}_{NRA-y}E_y\;\ddot{a}_{NRA}$$

- **Symbols:** $B$ is the [[Accrued Benefit|accrued pension]] payable from the normal retirement age $NRA$, $y$ is the age at which the pension starts, and $r$ is the plan's reduction per year early. $f_y$ is the actuarially equivalent reduction factor, the fraction of $B$ that, paid from age $y$, has the same EPV as $B$ deferred to $NRA$. ${}_nE_y$ is the [[Pure Endowment|pure endowment]] factor and $\ddot{a}$ the [[Life Annuity|life annuity]] factor, as in Dickson, Hardy & Waters (chapter 10).
- **Plan provisions:** A plan sets an earliest retirement age, often 55, and may require a minimum period of service. The reduction is commonly 3% to 6% per year, and many plans waive it entirely once a points or age-and-service condition is met, such as age 62, age 60 with 30 years, or age plus service of 85.
- **Actuarial reduction:** An actuarially equivalent reduction is much steeper than most plan reductions: on the Standard Ultimate Life Table it is about 6% to 7% a year at ages around 60 at 5% interest, and still about 5% a year at 3%. A plan that reduces by 3% a year therefore subsidizes almost every early retirement, and the subsidy grows the further from normal retirement age the pension starts.
- **Vested or non-vested:** A subsidy is vested once the member can take it on leaving, and non-vested while it depends on staying until an eligibility age or points threshold is reached (see [[Vesting|vesting and benefit eligibility]]). A terminated vested member usually gets only an actuarially reduced early pension, so the subsidy rewards those who stay to retirement.
- **Workforce effects:** McGill describes early retirement provisions as human-resource tools. A subsidy encourages older employees to leave when eligible, opening positions for younger staff and lowering payroll, but it also pulls out experienced workers the employer may want to keep. A bridge benefit to the start of social security, an [[Ancillary Benefit|ancillary benefit]], makes early retirement more attractive still.
- **Windows and incentive programs:** An early retirement window offers enhanced benefits for a limited period to a defined group, for example by waiving the reduction, adding years of age or service, or paying a bridge or lump sum. The reading on early retirement incentive programs works through the steps: defining the business objective, choosing the eligible group, projecting take-up, comparing the pension and severance cost with the payroll saved, and communicating the offer.
- **Sponsor risk:** The subsidy is an [[Embedded Option|embedded option]] held by members, and its cost depends on retirement-rate assumptions that can prove wrong. Windows add the risk of losing more key staff than planned and of paying a windfall to members who would have retired anyway, while repeated windows teach employees to wait for the next one.

> [!example]- Actuarial Versus Plan Reduction at Age 62 {Example}
> A member aged 62 has an accrued pension of \$24,000 a year payable from 65, annually in advance. The plan reduces the pension by 3% for each year it starts before 65. Using the Standard Ultimate Life Table at 5%, $\ddot{a}_{62} = 14.3861$, ${}_3E_{62} = 0.85158$ and $\ddot{a}_{65} = 13.5498$. Find the actuarially equivalent factor, the plan's factor, and the value of the subsidy at 62.
>
> > [!answer]-
> > The equivalent factor sets the EPV of the early pension equal to that of the deferred one.
> > $$
> > \begin{align*}
> > f_{62} &= \frac{0.85158 \times 13.5498}{14.3861} \\
> > &= 0.80208 \\
> > f_{\text{plan}} &= 1 - 3(0.03) \\
> > &= 0.91
> > \end{align*}
> > $$
> > The plan reduces by 9% where an equivalent reduction is about 19.8%, or 6.6% a year.
> > $$
> > \begin{align*}
> > \text{EPV}_{\text{deferred}} &= 24{,}000 \times 0.85158 \times 13.5498 \\
> > &= 276{,}930 \\
> > \text{EPV}_{\text{early}} &= 24{,}000 \times 0.91 \times 14.3861 \\
> > &= 314{,}192 \\
> > \text{Subsidy} &= 314{,}192 - 276{,}930 \\
> > &= 37{,}262
> > \end{align*}
> > $$
> > Retiring at 62 is worth 13.5% more to the member than waiting, and the sponsor pays for the difference. The [[Plan Design|plan design]] page works the same comparison at age 60, where the subsidy is larger.

> [!example]- Costing an Early Retirement Window {Example}
> To reduce headcount, the sponsor above offers a window: members aged 62 who retire in the next 90 days get their pension with no reduction. Twenty members like the one above accept. The sponsor estimates that 8 of them would have retired at 62 anyway, and that 12 positions will not be refilled, saving \$95,000 a year each in pay and benefits. Find the extra pension cost of the window and the share of it that is a windfall.
>
> > [!answer]-
> > Each taker gains the 9% the plan would otherwise have taken off the early pension.
> > $$
> > \begin{align*}
> > \text{Extra per member} &= 24{,}000 \times 0.09 \times 14.3861 \\
> > &= 31{,}074 \\
> > \text{Total extra} &= 20 \times 31{,}074 \\
> > &= 621{,}480 \\
> > \text{Windfall} &= 8 \times 31{,}074 \\
> > &= 248{,}592 \\
> > \text{Payroll saved} &= 12 \times 95{,}000 \\
> > &= 1{,}140{,}000
> > \end{align*}
> > $$
> > The window costs about \$621,000 in added pension value, of which about \$249,000 changes no one's behaviour. Against that, the payroll saving of \$1.14 million a year pays for the window in well under a year, provided the 12 positions really stay empty. The plan's funded status also falls by the extra liability, and that matters for funding contributions.

> [!tip]- How it appears on the exam
> - **RET-101 plan features:** Objective 1b asks candidates to explain early and late retirement options and benefit subsidies and their value, vested or non-vested. Expect a calculation of the equivalent reduction factor and the subsidy from given annuity factors, followed by a written explanation of who gains and why.
> - **RET-101 sponsor risk:** Objective 3b asks candidates to assess the sponsor risk from early retirement options, and the reading on early retirement incentive programs supports questions on designing and costing a window and on mitigating its risks.
> - **Recommendation questions:** Recommendation questions ask whether a subsidy or window serves a sponsor's workforce goals, such as reducing headcount, making room for promotion or keeping experienced staff.

> [!warning]- Exam traps
> - **A reduction is not automatically actuarial:** A factor below 1 is a subsidy whenever it is above ${}_{n}E_y\,\ddot{a}_{NRA}/\ddot{a}_y$. Calling a 3% per year reduction "actuarially reduced" misses a subsidy worth about 13% of the deferred pension's value at 62.
> - **Discount and survive:** The equivalent factor needs ${}_nE_y = v^n\,{}_np_y$, interest and survival together. Using $v^n$ alone ignores the members who die before $NRA$ and makes the equivalent reduction too small.
> - **Windfall cost:** The cost of a window is the extra value for everyone who takes it, including members who would have retired anyway. Counting only the members induced to leave understates it.
> - **Terminated vested members:** A member who terminates before the eligibility age usually loses the subsidy. Valuing a deferred vested member's early pension on the plan's subsidized factor overstates the liability.
