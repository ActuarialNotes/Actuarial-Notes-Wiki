---
aliases:
  - Multi-Employer
  - Single Employer
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:ebbf1eb0e7f538906cc19a3530dac23d36484800a7524c521fe574f853e4a7b1
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Multi-Employer Plan.md
---
A **Multi-Employer Plan** is a [[Pension Plan|pension plan]] to which several unrelated employers contribute, usually under collective agreements with a union, and in which members keep accruing benefits as they move between employers in the same industry or trade. A **single-employer plan** is sponsored by one employer, or one group of related companies, that pays whatever the benefits cost.

Contributions are fixed by bargaining, typically as an amount per hour worked, so the year's contribution income $C$ is

> $$C = c \times H$$

- $c$ is the negotiated contribution rate per hour.
- $H$ is the hours worked by covered members.

A joint board of trustees sets the benefits those contributions can support, so the benefits rather than the contributions absorb a shortfall. In the U.S. these plans are Taft-Hartley plans, named for the 1947 labour law that requires a union-employer pension fund to be run by trustees representing both sides equally. A Canadian multi-employer pension plan (MEPP) is usually also run by a joint board of trustees, sometimes by a union board alone, and the trustees rather than any employer act as the [[Plan Sponsor|plan sponsor]].

## Contribution margin

Each employer's obligation is its negotiated contribution, so the funding test is whether $C$ covers the cost of the benefits. The contribution margin is

> $$M = C - NC - SP$$

- $NC$ is the [[Normal Cost|normal cost]] of the benefits accruing.
- $SP$ is the special payments needed to amortize any unfunded liability.

When the margin is negative, the trustees reduce future accruals or, where the law allows, accrued benefits, or they negotiate higher contribution rates. A fall in hours worked cuts contribution income directly. When accrual is tied to hours, fewer hours lower the normal cost too, but the special payments stay fixed, so a shortfall in hours squeezes the margin. A [[Target Benefit Plan|target benefit plan]] formalizes this, with fixed contributions and benefits that adjust to the funded position.

If the contribution rate cannot change, the reduced accrual rate $\alpha'$ that brings the margin back to zero is

> $$\alpha' = \alpha \times \frac{C - SP}{NC}$$

- $\alpha$ is the current accrual rate.

> [!example]- What cut in the future accrual rate brings this MEPP's contribution margin back to zero? {Example}
> A MEPP's collective agreements set an illustrative contribution of $\$3.00$ per hour, and covered members are expected to work 2,000,000 hours next year. The going-concern valuation shows a normal cost of $\$4{,}800{,}000$. After a year of poor returns, the special payments needed to amortize the unfunded liability are $\$1{,}600{,}000$. The contribution rate cannot change.
>
> > [!answer]-
> > - The contribution income is $C = 3.00 \times 2{,}000{,}000 = \$6{,}000{,}000$.
> > - The margin is $M = 6{,}000{,}000 - 4{,}800{,}000 - 1{,}600{,}000 = -\$400{,}000$.
> > - The reduced accrual rate is $\alpha'/\alpha = (6{,}000{,}000 - 1{,}600{,}000)/4{,}800{,}000 = 0.91667$.
> > - The trustees must cut the accrual rate for future service by 8.3%, unless the parties bargain a higher contribution rate.
> > - In a single-employer plan the same loss would raise the employer's contribution by $\$400{,}000$ and leave the benefit unchanged.

## Valuation assumptions

Contributions depend on hours, so the valuation needs an assumption for future hours worked. That assumption follows the industry's employment rather than one employer's payroll. Termination and retirement rates reflect members moving between participating employers without leaving the plan. The plan has no single employer's financial strength behind it, which argues for larger margins in the [[Going-Concern Valuation|going-concern]] assumptions.

## Funding and tax rules in Canada

Canadian legislation has separate funding rules for MEPPs and target benefit plans. In several jurisdictions these relieve them of the solvency funding a single-employer plan faces, in exchange for other safeguards. The Income Tax Act has its own registration and pension adjustment rules for multi-employer plans, described under [[Canadian Pension Legislation]].

## Withdrawal liability

Under U.S. law since the Multiemployer Pension Plan Amendments Act of 1980, an employer that leaves an underfunded plan owes its share of the unfunded vested benefits. The employers who stay are then not left with the cost of the employees who were. The share can be allocated by several statutory methods. One of them gives the withdrawal liability of employer $j$ as

> $$WL_j = UVB \times \frac{\sum_{5} C_j}{\sum_{5} C}$$

- $UVB$ is the plan's unfunded vested benefits.
- $\sum_{5} C_j$ is employer $j$'s contributions over the last five plan years.
- $\sum_{5} C$ is all employers' contributions over the same five years.

Canadian MEPPs generally impose no such liability, so the members bear the shortfall.

> [!example]- What is this employer's withdrawal liability, and how long does it take to pay off? {Example}
> A Taft-Hartley plan's unfunded vested benefits are $\$50{,}000{,}000$. Over the last five plan years the plan received $\$40{,}000{,}000$ of contributions, of which a withdrawing employer paid $\$6{,}000{,}000$. The liability is allocated by the five-year contribution share. The statutory annual payment works out to $\$1{,}300{,}000$, paid at each year-end, at an illustrative 7%.
>
> > [!answer]-
> > - The employer's share of contributions is $6{,}000{,}000/40{,}000{,}000 = 15\%$.
> > - The withdrawal liability is $WL_j = 0.15 \times 50{,}000{,}000 = \$7{,}500{,}000$.
> > - The payoff period solves $1{,}300{,}000\,a_{\overline{n}|} = 7{,}500{,}000$ at 7%.
> > - So $n = -\ln\left(1 - 7{,}500{,}000(0.07)/1{,}300{,}000\right)/\ln 1.07 = 7.65$.
> > - The employer pays off $\$7{,}500{,}000$ in about seven and a half years of installments.

> [!trap] Sending the loss to the employer
> In a single-employer DB plan a loss raises the sponsor's contribution. In a multi-employer plan with negotiated contributions it reduces benefits or margins. An answer that sends the bill to "the employer" misreads the plan, and applying the U.S. withdrawal liability to a Canadian MEPP invents an obligation the legislation does not create.
