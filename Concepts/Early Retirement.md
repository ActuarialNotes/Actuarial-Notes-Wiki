---
aliases:
  - Benefit Subsidy
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:8f8d2e09fd61ee0f5c1d6bdc8f23314ba1b81a719c8d8ff13d1ef78b9a2ed695
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Early Retirement.md
---

**Early Retirement** is the start of a pension before the plan's normal retirement age, which a [[Defined Benefit Plan|defined benefit plan]] allows from a stated earliest age, usually with a reduction for each year the pension starts early. When the plan's reduction is smaller than the actuarially equivalent one, the early pension is worth more than the deferred pension it replaces, and the difference is a **benefit subsidy** paid for by the [[Plan Sponsor|plan sponsor]].

If the plan reduces the pension by $r$ for each year it starts before the normal retirement age $NRA$, the pension starting at age $y$ is

> $$B_y = B\left(1 - r\,(NRA - y)\right)$$

- $B$ is the [[Accrued Benefit|accrued pension]] payable from $NRA$.

A plan sets an earliest retirement age, often 55, and may require a minimum period of service. The reduction is commonly 3% to 6% per year. Many plans waive it entirely once a points or age-and-service condition is met, such as age 62, age 60 with 30 years of service, or age plus service of 85.

## Actuarially equivalent reduction

The actuarially equivalent reduction factor is the fraction of $B$ that, paid from age $y$, has the same EPV as $B$ deferred to $NRA$. It is

> $$f_y = \frac{{}_{NRA-y}E_y\;\ddot{a}_{NRA}}{\ddot{a}_y}$$

- ${}_{n}E_y = v^n\,{}_{n}p_y$ is the [[Pure Endowment|pure endowment]] factor.
- $\ddot{a}$ is the [[Life Annuity|life annuity]]-due factor at the age shown.

The pure endowment discounts for interest and survival together. Using $v^n$ alone ignores the members who die before $NRA$ and makes the equivalent reduction too small.

An actuarially equivalent reduction is much steeper than most plan reductions. On the Standard Ultimate Life Table it is about 6% to 7% a year at ages around 60 at 5% interest, and still about 5% a year at 3%. A plan that reduces by 3% a year therefore subsidizes almost every early retirement.

> [!example]- What are the actuarially equivalent factor and the plan's factor for this member retiring at 62? {Example}
> A member aged 62 has an accrued pension of $\$24{,}000$ a year payable from 65, annually in advance. The plan reduces the pension by 3% for each year it starts before 65. On the Standard Ultimate Life Table at 5%, $\ddot{a}_{62} = 14.3861$, ${}_{3}E_{62} = 0.85158$ and $\ddot{a}_{65} = 13.5498$.
>
> > [!answer]-
> > - The equivalent factor sets the EPV of the early pension equal to that of the deferred one: $f_{62} = 0.85158 \times 13.5498 / 14.3861 = 0.80208$.
> > - The plan's factor is $1 - 3(0.03) = 0.91$.
> > - The plan reduces the pension by 9%, where an equivalent reduction is about 19.8%, or 6.6% a year.

## Benefit subsidy

The benefit subsidy at age $y$ is the EPV of the early pension less the EPV of the deferred pension it replaces:

> $$\text{Subsidy}_y = B_y\,\ddot{a}_y - B\;{}_{NRA-y}E_y\;\ddot{a}_{NRA}$$

The subsidy grows the further from normal retirement age the pension starts. A subsidy is vested once the member can take it on leaving, and non-vested while it depends on staying until an eligibility age or points threshold is reached (see [[Vesting|vesting and benefit eligibility]]). A terminated vested member usually gets only an actuarially reduced early pension, so the subsidy rewards those who stay to retirement.

> [!example]- What is the value of the subsidy at 62 for the member above? {Example}
> - The EPV of the deferred pension is $24{,}000 \times 0.85158 \times 13.5498 = 276{,}931$.
> - The EPV of the early pension is $24{,}000 \times 0.91 \times 14.3861 = 314{,}192$.
> - The subsidy is $314{,}192 - 276{,}931 = \$37{,}261$.
> - Retiring at 62 is worth 13.5% more to the member than waiting, and the sponsor pays for the difference. The [[Plan Design|plan design]] page works the same comparison at age 60, where the subsidy is larger.

## Early retirement windows

An early retirement window offers enhanced benefits for a limited period to a defined group. It may waive the reduction, add years of age or service, or pay a bridge or lump sum. The reading on early retirement incentive programs works through the steps:

1. Define the business objective.
2. Choose the eligible group.
3. Project take-up.
4. Compare the pension and severance cost with the payroll saved.
5. Communicate the offer.

The cost of a window is the extra value for everyone who takes it, including members who would have retired anyway. That part is a windfall that changes no one's behaviour.

> [!example]- What is the extra pension cost of this window, and how much of it is a windfall? {Example}
> To reduce headcount, the sponsor above offers members aged 62 who retire in the next 90 days their pension with no reduction. Twenty members like the one above accept. The sponsor estimates that 8 of them would have retired at 62 anyway, and that 12 positions will not be refilled, saving $\$95{,}000$ a year each in pay and benefits.
>
> > [!answer]-
> > - Each taker gains the 9% the plan would otherwise have taken off the early pension, worth $24{,}000 \times 0.09 \times 14.3861 = \$31{,}074$.
> > - The total extra cost is $20 \times 31{,}074 = \$621{,}480$.
> > - The windfall to the 8 who would have retired anyway is $8 \times 31{,}074 = \$248{,}592$.
> > - The payroll saved is $12 \times 95{,}000 = \$1{,}140{,}000$ a year, which pays for the window in well under a year, provided the 12 positions really stay empty.
> > - The plan's funded status also falls by the extra liability, and that matters for funding contributions.

## Workforce effects and sponsor risk

McGill describes early retirement provisions as human-resource tools. A subsidy encourages older employees to leave when eligible, opening positions for younger staff and lowering payroll, but it also pulls out experienced workers the employer may want to keep. A bridge benefit to the start of social security, an [[Ancillary Benefit|ancillary benefit]], makes early retirement more attractive still.

The subsidy is an [[Embedded Option|embedded option]] held by members, and its cost depends on retirement-rate assumptions that can prove wrong. Windows add the risk of losing more key staff than planned and of paying a windfall to members who would have retired anyway. Repeated windows teach employees to wait for the next one.

> [!trap] Calling a plan reduction actuarial
> A factor below 1 is still a subsidy whenever it is above ${}_{n}E_y\,\ddot{a}_{NRA}/\ddot{a}_y$. Calling a 3% per year reduction "actuarially reduced" misses a subsidy worth about 13% of the deferred pension's value at 62.
