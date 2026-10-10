---
aliases:
  - Optional Employee Contribution
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:e1b8bdfbad6ca95c2abfdf51df9f70a938e9d594142ecb91e8afe1e5e642aaf3
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Employee Contribution.md
---
An **Employee Contribution** is money a member pays into a [[Retirement Plan|retirement plan]] out of their own pay. It is required when the plan makes it a condition of membership, as in a contributory [[Defined Benefit Plan|defined benefit plan]] or a [[Defined Contribution Plan|defined contribution plan]] with a fixed member rate, and optional when the member chooses whether and how much to pay, as with additional voluntary contributions or 401(k) elective deferrals, often with an employer match.

> $$C = \bigl(d + m(d)\bigr)\,S$$

> $$m(d) = \mu\,\min\left(d,\ \bar{d}\right)$$

> $$A_n = \sum_{k=0}^{n-1} c\,S_k\,(1+i_c)^{\,n-k}$$

> $$\text{Excess} = \max\left(0,\ A_n - \tfrac{1}{2}\,CV\right)$$

- **Symbols:** $S$ is the member's pay, $d$ the deferral rate the member elects, and $m(d)$ the employer's matching rate, which pays $\mu$ of each dollar deferred up to a cap of $\bar{d}$ of pay. In a contributory DB plan, $c$ is the required contribution rate, $S_k$ the pay in year $k$, $i_c$ the interest rate the plan credits, and $A_n$ the member's contributions with interest after $n$ years. $CV$ is the [[Commuted Value|commuted value]] of the pension those years earned.
- **Required contributions:** A contributory DB plan typically asks for a fixed percentage of pay, sometimes lower on pay below the social security wage base so that it mirrors an integrated benefit formula. Many Canadian public sector and union plans are contributory, while most U.S. private DB plans are not. In a DC plan a required member rate fixes part of the account's funding, and in a [[Target Benefit Plan|target benefit plan]] or other shared-risk design the member rate may rise when the plan is underfunded.
- **Optional contributions:** A member may add to the account beyond what is required. In the United States the main vehicle is the 401(k) elective deferral, made pre-tax or as a Roth contribution, with catch-up contributions allowed from age 50. In Canada a member of a registered plan may make additional voluntary contributions to a money purchase account, or save on their own in a [[Registered Retirement Savings Plan|registered retirement savings plan]].
- **Matching:** A match pays the employer's contribution only if the member contributes, so it rewards saving and limits the employer's cost to those who take part. A match formula such as 50% up to 6% of pay makes $\bar{d}$ the natural target, and many members defer exactly to the cap and no further.
- **Tax treatment:** Required contributions to a registered or qualified plan are generally made from pre-tax pay, and the benefits they buy are taxed when paid (see [[Tax Treatment of Retirement Plans|tax treatment of retirement plans]]). Each country caps the amount that can go in tax-free, and in Canada contributions to a registered plan reduce the member's room for RRSP saving.
- **Behavioural design:** Members rarely change a default, as [[Behavioral Finance|behavioral finance]] predicts. Automatic enrolment at a default deferral rate raises participation sharply, and automatic escalation raises the rate by about one percentage point a year up to a ceiling, so that savings grow with pay rises the member barely notices. A low default rate can anchor members below the match cap, so plans now set defaults at or near $\bar{d}$.
- **Refunds:** A member's own contributions are always fully [[Vesting|vested]]. A member who leaves before the employer-provided benefit vests receives a refund of contributions with credited interest. Once the pension is vested and locked in, as it is immediately in most Canadian jurisdictions, the member's contributions stay in the pension and cannot be taken as cash.
- **The 50% rule:** Canadian pension standards legislation requires the employer to fund at least half of the pension earned in a contributory DB plan for service after the jurisdiction's reform date. If the member's contributions with interest exceed 50% of the commuted value of that pension, the excess is refunded or used to increase the pension (see [[Canadian Pension Legislation|Canadian pension legislation]]).

> [!example]- What a 50% Match up to 6% of Pay Adds {Example}
> A 401(k) plan matches 50% of each dollar a member defers, up to 6% of pay. A member earns \$80,000 a year. Find the employee's, the employer's and the total contribution at deferral rates of 3%, 6% and 10%, and the value after 30 years, at 5% a year, of the match the member gives up by deferring 3%. Assume contributions are made at the start of each year and pay stays level.
>
> > [!answer]-
> > The match rate is $m(d) = 0.5\min(d,\ 0.06)$, so it rises with the deferral up to 6% and stops there.
> > $$
> > \begin{align*}
> > C_{3\%} &= (0.03 + 0.015)(80{,}000) \\
> > &= 3{,}600 \\
> > C_{6\%} &= (0.06 + 0.03)(80{,}000) \\
> > &= 7{,}200 \\
> > C_{10\%} &= (0.10 + 0.03)(80{,}000) \\
> > &= 10{,}400
> > \end{align*}
> > $$
> > The employer pays \$1,200, \$2,400 and \$2,400. Deferring 3% leaves \$1,200 a year of match unclaimed, and the accumulated value of that over 30 years is an [[Annuity Due|annuity due]].
> > $$
> > \begin{align*}
> > \ddot{s}_{\overline{30}|} &= \frac{(1.05)^{30} - 1}{0.05/1.05} \\
> > &= 69.7608 \\
> > 1{,}200\,\ddot{s}_{\overline{30}|} &= 1{,}200 \times 69.7608 \\
> > &= 83{,}713
> > \end{align*}
> > $$
> > The member at 3% gives up about \$83,700 of retirement savings for want of another \$2,400 a year of deferral. Above 6% the extra contributions are the member's alone, so the total rises by only the amount deferred.

> [!example]- Applying the 50% Cost-Sharing Rule on Termination {Example}
> A member of a contributory DB plan in Canada terminates at 50 with a vested deferred pension of \$9,000 a year from 65, all for service after the reform date. Her required contributions with credited interest are \$34,600. The plan values the commuted value with the Standard Ultimate Life Table at 5%: ${}_{15}E_{50} = 0.46151$ and $\ddot{a}_{65} = 13.5498$. Find the commuted value and the excess contributions.
>
> > [!answer]-
> > The commuted value is the EPV at 50 of the deferred pension, a [[Pure Endowment|pure endowment]] times a [[Life Annuity|life annuity]] factor.
> > $$
> > \begin{align*}
> > CV &= 9{,}000 \times 0.46151 \times 13.5498 \\
> > &= 56{,}280 \\
> > \tfrac{1}{2}\,CV &= 28{,}140 \\
> > \text{Excess} &= 34{,}600 - 28{,}140 \\
> > &= 6{,}460
> > \end{align*}
> > $$
> > Her contributions have paid for 61% of the pension, more than the half the rule allows the member to bear. The plan refunds the \$6,460 or uses it to buy more pension, and the \$56,280 commuted value stays locked in, either as the deferred pension or as a transfer to a locked-in account.

> [!tip]- How it appears on the exam
> - **RET-101 plan features:** Objective 1b lists required and optional employee contributions among the plan features whose relevance and range candidates must explain for a given plan type. Expect a written answer on why a sponsor asks for contributions, how they are taxed, and how a match or a default shapes what members save.
> - **DC design questions:** The readings on DC success factors and on behavioural finance in DC design support questions on automatic enrolment, automatic escalation and match formulas. A calculation gives a match formula and pay, and asks for the contributions at several deferral rates or the cost to the employer of a change to the formula.
> - **Contributory DB and termination:** A calculation may give a terminating member's contributions with interest and the commuted value of the pension, and ask for the refund or the excess under the 50% rule, using pure endowments and annuity factors as in AMLCR chapter 10.

> [!warning]- Exam traps
> - **The cap applies to the deferral:** Under 50% up to 6% of pay, the employer pays at most 3% of pay. Reading the formula as a 6% employer contribution doubles the employer's cost.
> - **Contributions with interest, not contributions:** A refund and the 50% test both use the contributions accumulated at the credited rate. Comparing the bare sum of contributions with half the commuted value understates the excess.
> - **The 50% test uses the commuted value:** The comparison is with half the present value of the pension, not half the annual pension or half the total of the contributions made by both parties.
> - **Defaults change behaviour, not entitlement:** Automatic enrolment does not make a contribution required. The member can still opt out or change the rate, so a question about required contributions is about plan terms, not defaults.
