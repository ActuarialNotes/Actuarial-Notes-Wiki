---
aliases:
  - Multi-Employer
  - Single Employer
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:dfe75424e89f7b1f974794f0685deab6cab29c99a29f0e3fbfc749791b2afa1c
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multi-Employer Plan.md
---
A **Multi-Employer Plan** is a [[Pension Plan|pension plan]] to which several unrelated employers contribute, usually under collective agreements with a union, and in which members keep accruing benefits as they move between employers in the same industry or trade. Contributions are fixed by bargaining, typically as an amount per hour worked, and a joint board of trustees sets the benefits those contributions can support, so the benefits rather than the contributions absorb a shortfall. A **single-employer plan**, by contrast, is sponsored by one employer (or one group of related companies) that pays whatever the benefits cost.

> $$C = c \times H$$

> $$M = C - NC - SP$$

> $$\alpha' = \alpha \times \frac{C - SP}{NC}$$

> $$WL_j = UVB \times \frac{\sum_{5} C_j}{\sum_{5} C}$$

- **Symbols:** $c$ is the negotiated contribution rate per hour and $H$ is the hours worked by covered members, so $C$ is the year's contribution income. $NC$ is the [[Normal Cost|normal cost]] of the benefits accruing and $SP$ the special payments needed to amortize any unfunded liability, so $M$ is the contribution margin. $\alpha$ is the accrual rate and $\alpha'$ the reduced rate that brings the margin back to zero. In the U.S. withdrawal formula, $UVB$ is the plan's unfunded vested benefits and the fraction is the withdrawing employer $j$'s share of contributions over the last five plan years.
- **Collective bargaining and trustees:** In the U.S. these are Taft-Hartley plans, named for the 1947 labour law that requires a union-employer pension fund to be run by trustees representing both sides equally. Canadian multi-employer pension plans (MEPPs) are usually also run by a joint board of trustees, sometimes by a union board alone, and the trustees rather than any employer act as the [[Plan Sponsor|plan sponsor]].
- **Fixed contributions, adjustable benefits:** Because each employer's obligation is its negotiated contribution, the funding test is whether $C$ covers the normal cost and the special payments. When it does not, the trustees reduce future accruals or, where the law allows, accrued benefits, or they negotiate higher rates. A target benefit plan formalizes this, with fixed contributions and benefits that adjust to the funded position.
- **Withdrawal liability:** Under U.S. law since the Multiemployer Pension Plan Amendments Act of 1980, an employer that leaves an underfunded plan owes its share of the unfunded vested benefits, so the employers who stay are not left with the cost of the employees who were. The share can be allocated by several statutory methods, one of which uses the employer's share of the last five years' contributions. Canadian MEPPs generally impose no such liability, so the members bear the shortfall.
- **Assumptions differ from a single-employer plan:** Contributions depend on hours, so the valuation needs an assumption for future hours worked, which follows the industry's employment rather than one employer's payroll. Termination and retirement rates reflect members moving between participating employers without leaving the plan, and the plan has no single employer's financial strength behind it, which argues for larger margins in the [[Going-Concern Valuation|going-concern]] assumptions.
- **Funding and tax rules:** Canadian legislation has separate funding rules for MEPPs and target benefit plans, which in several jurisdictions relieve them of the solvency funding a single-employer plan faces in exchange for other safeguards. The Income Tax Act has its own registration and pension adjustment rules for multi-employer plans, described under [[Canadian Pension Legislation]].

> [!example]- A Negotiated Contribution That No Longer Covers the Cost {Example}
> A MEPP's collective agreements set an illustrative contribution of \$3.00 per hour, and covered members are expected to work 2,000,000 hours next year. The going-concern valuation shows a normal cost of \$4,800,000, and after a year of poor returns the special payments needed to amortize the unfunded liability are \$1,600,000. Find the contribution margin, and the cut in the future accrual rate that restores it to zero if the contribution rate cannot change.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > C &= 3.00 \times 2{,}000{,}000 \\
> > &= 6{,}000{,}000 \\
> > M &= 6{,}000{,}000 - 4{,}800{,}000 - 1{,}600{,}000 \\
> > &= -400{,}000 \\
> > \frac{\alpha'}{\alpha} &= \frac{6{,}000{,}000 - 1{,}600{,}000}{4{,}800{,}000} \\
> > &= 0.91667
> > \end{align*}
> > $$
> > The trustees must cut the accrual rate for future service by 8.3%, unless the parties bargain a higher contribution rate. In a single-employer plan the same loss would raise the employer's contribution by \$400,000 and leave the benefit unchanged.

> [!example]- A U.S. Employer Withdraws {Example}
> A Taft-Hartley plan's unfunded vested benefits are \$50,000,000. Over the last five plan years the plan received \$40,000,000 of contributions, of which a withdrawing employer paid \$6,000,000. Allocating by the five-year contribution share, find the employer's withdrawal liability. If the statutory annual payment works out to \$1,300,000, how long does it take to pay off at an illustrative 7%, with payments at each year-end?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > WL_j &= 50{,}000{,}000 \times \frac{6{,}000{,}000}{40{,}000{,}000} \\
> > &= 7{,}500{,}000 \\
> > 1{,}300{,}000\,a_{\overline{n}|7\%} &= 7{,}500{,}000 \\
> > n &= -\frac{\ln\left(1 - 7{,}500{,}000(0.07)/1{,}300{,}000\right)}{\ln 1.07} \\
> > &= 7.65
> > \end{align*}
> > $$
> > The employer owes \$7,500,000 and pays it off in about seven and a half years of installments. The remaining employers no longer need to fund the benefits of the withdrawing employer's former employees.

> [!tip]- How it appears on the exam
> - **RET-201 assumptions:** Candidates select and defend actuarial assumptions for a valuation of a multi-employer plan, explaining where they should differ from those of a single-employer plan, such as the hours assumption, termination rates and the size of the margins.
> - **RET-201 funding policy:** Candidates analyze and defend a funding policy for a multi-employer plan alongside single-employer and government-sponsored plans, which turns on the fixed contributions and on how the trustees adjust benefits when the margin is negative.

> [!warning]- Exam traps
> - **Who absorbs a loss:** In a single-employer DB plan a loss raises the sponsor's contribution. In a multi-employer plan with negotiated contributions it reduces benefits or margins, so an answer that sends the bill to "the employer" misreads the plan.
> - **Hours drive contributions:** A fall in hours worked cuts contribution income directly. Testing the margin on last year's hours, or projecting hours with a single employer's payroll growth, overstates the funding.
> - **Withdrawal liability is U.S.:** Canadian MEPPs generally do not charge a departing employer for its share of the deficit. Applying the U.S. rule to a Canadian plan invents an obligation the legislation does not create.
> - **Normal cost moves with hours:** When accrual is tied to hours, fewer hours lower the normal cost as well as the contributions. Only the special payments stay fixed, which is why a shortfall in hours squeezes the margin.
