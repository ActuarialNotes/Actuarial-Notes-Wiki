---
aliases:
  - Optional Employee Contribution
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e5da1f5447473adf87245497e89e21cd6d3a9c6d00049cdffd96d726eb251b08
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Employee Contribution.md
---

An **Employee Contribution** is money a member pays into a [[Retirement Plan|retirement plan]] out of their own pay. It is required when the plan makes it a condition of membership, and optional when the member chooses whether and how much to pay.

## Required contributions

A contributory [[Defined Benefit Plan|defined benefit plan]] typically asks for a fixed percentage of pay, sometimes lower on pay below the social security wage base so that it mirrors an integrated benefit formula. Many Canadian public sector and union plans are contributory, while most U.S. private DB plans are not. In a [[Defined Contribution Plan|defined contribution plan]] a required member rate fixes part of the account's funding. In a [[Target Benefit Plan|target benefit plan]] or other shared-risk design the member rate may rise when the plan is underfunded.

Required contributions to a registered or qualified plan are generally made from pre-tax pay, and the benefits they buy are taxed when paid (see [[Tax Treatment of Retirement Plans|tax treatment of retirement plans]]). Each country caps the amount that can go in tax-free, and in Canada contributions to a registered plan reduce the member's room for RRSP saving.

## Optional contributions and matching

A member may add to the account beyond what is required. In the United States the main vehicle is the 401(k) elective deferral, made pre-tax or as a Roth contribution, with catch-up contributions allowed from age 50. In Canada a member of a registered plan may make additional voluntary contributions to a money purchase account, or save on their own in a [[Registered Retirement Savings Plan|registered retirement savings plan]].

A match pays the employer's contribution only if the member contributes, so it rewards saving and limits the employer's cost to those who take part. If the member defers $d$ of pay $S$ and the employer matches at rate $m(d)$, the total contribution is

> $$C = \bigl(d + m(d)\bigr)\,S$$

A match that pays $\mu$ of each dollar deferred, up to a cap of $\bar{d}$ of pay, has the matching rate

> $$m(d) = \mu\,\min\left(d,\ \bar{d}\right)$$

A match formula such as 50% up to 6% of pay makes $\bar{d}$ the natural target, and many members defer exactly to the cap and no further.

> [!example]- What are the contributions at deferral rates of 3%, 6% and 10%, and what does deferring 3% give up? {Example}
> A 401(k) plan matches 50% of each dollar a member defers, up to 6% of pay. A member earns $\$80{,}000$ a year. Contributions are made at the start of each year, pay stays level, and money earns 5% a year for 30 years.
>
> > [!answer]-
> > - The match rate is $m(d) = 0.5\min(d,\ 0.06)$, so it rises with the deferral up to 6% and stops there.
> > - At 3% the total is $(0.03 + 0.015)(80{,}000) = \$3{,}600$, of which the employer pays $\$1{,}200$.
> > - At 6% the total is $(0.06 + 0.03)(80{,}000) = \$7{,}200$, of which the employer pays $\$2{,}400$.
> > - At 10% the total is $(0.10 + 0.03)(80{,}000) = \$10{,}400$, and the employer still pays $\$2{,}400$.
> > - Deferring 3% leaves $\$1{,}200$ a year of match unclaimed. Its value after 30 years is an [[Annuity Due|annuity due]], with $\ddot{s}_{\overline{30}|} = 69.7608$ at 5%.
> > - The member at 3% gives up $1{,}200 \times 69.7608 = \$83{,}713$ of retirement savings for want of another $\$2{,}400$ a year of deferral.

## Automatic enrolment and escalation

Members rarely change a default, as [[Behavioral Finance|behavioral finance]] predicts. Automatic enrolment at a default deferral rate raises participation sharply. Automatic escalation raises the rate by about one percentage point a year up to a ceiling, so that savings grow with pay rises the member barely notices. A low default rate can anchor members below the match cap, so plans now set defaults at or near $\bar{d}$. A default does not make a contribution required. The member can still opt out or change the rate.

## Refunds and the 50% rule

A member's own contributions are always fully [[Vesting|vested]]. A member who leaves before the employer-provided benefit vests receives a refund of contributions with credited interest. Once the pension is vested and locked in, as it is immediately in most Canadian jurisdictions, the member's contributions stay in the pension and cannot be taken as cash.

With a required contribution rate $c$ and pay $S_k$ in year $k$, the member's contributions with interest after $n$ years are

> $$A_n = \sum_{k=0}^{n-1} c\,S_k\,(1+i_c)^{\,n-k}$$

- $i_c$ is the interest rate the plan credits.

Canadian pension standards legislation requires the employer to fund at least half of the pension earned in a contributory DB plan for service after the jurisdiction's reform date. If the member's contributions with interest exceed 50% of the [[Commuted Value|commuted value]] $CV$ of that pension, the excess is refunded or used to increase the pension (see [[Canadian Pension Legislation|Canadian pension legislation]]). The excess is

> $$\text{Excess} = \max\left(0,\ A_n - \tfrac{1}{2}\,CV\right)$$

> [!example]- What are this terminating member's commuted value and excess contributions? {Example}
> A member of a contributory DB plan in Canada terminates at 50 with a vested deferred pension of $\$9{,}000$ a year from 65, all for service after the reform date. Her required contributions with credited interest are $\$34{,}600$. The plan values the commuted value with the Standard Ultimate Life Table at 5%: ${}_{15}E_{50} = 0.46151$ and $\ddot{a}_{65} = 13.5498$.
>
> > [!answer]-
> > - The commuted value is the EPV at 50 of the deferred pension, a [[Pure Endowment|pure endowment]] times a [[Life Annuity|life annuity]] factor: $9{,}000 \times 0.46151 \times 13.5498 = \$56{,}280$.
> > - Half of it is $\$28{,}140$.
> > - The excess is $34{,}600 - 28{,}140 = \$6{,}460$.
> > - Her contributions have paid for 61% of the pension, more than the half the rule allows the member to bear. The plan refunds the $\$6{,}460$ or uses it to buy more pension, and the $\$56{,}280$ commuted value stays locked in.

> [!trap] Reading the match cap as the employer's rate
> Under 50% up to 6% of pay, the employer pays at most 3% of pay. Reading the formula as a 6% employer contribution doubles the employer's cost.
