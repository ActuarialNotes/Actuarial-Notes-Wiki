---
aliases:
  - Public Sector Employer
  - Government-sponsored Plan
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:13e626bed2639e3838970eaea3e59b092ba47a77ccff5ff61131440098a7e6ca
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Public Sector Pension Plan.md
---
A **Public Sector Pension Plan** is a [[Retirement Plan|retirement plan]] sponsored by a government or a public body, such as a state, province, municipality, school board, university or crown agency, for its employees. It is usually created by legislation, run by a board of trustees or a public pension agency, and funded by contributions from both the employer and the members.

Because the employer is a government, the plan's deficits are ultimately the taxpayers'. Its [[Funding Policy|funding policy]] has to balance benefit security against fairness between today's and tomorrow's taxpayers, which is called intergenerational equity.

## Funding policy

The unfunded liability at time $t$ is

> $$UAL_t = AAL_t - AVA_t$$

- $AAL_t$ is the [[Actuarial Accrued Liability|actuarial accrued liability]] under the plan's [[Actuarial Cost Method|cost method]], usually entry age normal.
- $AVA_t$ is the [[Asset Valuation Method|actuarial value of assets]].

The plan's funded ratio is $AVA_t / AAL_t$. The actuarially determined contribution is

> $$ADC_t = NC_t + P_t$$

- $NC_t$ is the [[Normal Cost|normal cost]].
- $P_t$ is the payment that amortizes the unfunded liability.

When the unfunded liability is amortized as a level percent of payroll over $n$ years, with payments at the start of each year, the first payment is

> $$P_t = \frac{UAL_t}{\displaystyle\sum_{k=0}^{n-1}\left(\frac{1+g}{1+i}\right)^{k}}$$

- $g$ is the expected growth rate of payroll.
- $i$ is the valuation rate.

The actuarial community's model funding policies for public plans ask for an ADC built from a cost method that recognizes cost as a level percent of pay, asset smoothing within a corridor, and amortization of each year's gains and losses over a closed, layered period. The policy's goals are to fund each member's benefit by retirement, keep contributions stable as a share of the budget, and charge each generation of taxpayers for the services it receives.

The ADC is the total cost. The employer pays the ADC minus the members' contributions.

> [!example]- What are the ADC and the employer's share of it for this state plan? {Example}
> A state plan has an actuarial accrued liability of $\$12.0$ billion and an actuarial value of assets of $\$9.0$ billion. Payroll is $\$1.5$ billion and is expected to grow 3% a year, and the valuation rate is 7%. The normal cost is 12% of payroll, of which members pay 7%. The unfunded liability is amortized as a level percent of payroll over 20 years, with payments at the start of each year.
>
> > [!answer]-
> > - The unfunded liability is $12.0 - 9.0 = \$3.0$ billion.
> > - The amortization factor is $\sum_{k=0}^{19} (1.03/1.07)^k = 14.2649$.
> > - The first payment is $P_0 = 3.0 / 14.2649 = \$0.2103$ billion.
> > - The ADC is $0.12 \times 1.5 + 0.2103 = \$0.3903$ billion, or 26.0% of payroll.
> > - Members pay 7% of payroll, so the employer pays $\$285.3$ million, or 19.0% of payroll.

> [!trap] Level percent of pay back-loads the cost
> Payments that grow with payroll start lower than level-dollar payments. In the example, a level-dollar schedule over 20 years would charge $\$264.7$ million from the start, against $\$210.3$ million. The first payment is about the $\$210$ million of a year's interest on the unfunded liability, so after 10 years about $\$2.4$ billion is still unpaid. Over 30 years the first payment would be $\$164.7$ million, less than the interest, and the unfunded liability would grow for several years before it began to fall, which is called negative amortization. The amortization factor uses $(1+g)/(1+i)$, and using $v = 1/(1+i)$ instead gives the level-dollar payment.

## Discount rate

Most U.S. public plans value liabilities at the expected return on their assets. A higher discount rate makes the plan look better funded and lowers the ADC, but it does not change the benefits, so the shortfall shows up later if the returns fall short.

## Governance

The plan's terms, and often its contribution rates, are set in statute, so benefits can be changed only by the legislature or through bargaining. U.S. state and local plans are typically governed by boards that include members, retirees and appointees. In Canada, many large public plans are jointly sponsored. The employer and the unions share the governance and split both the contributions and any deficit, often equally.

> [!example]- In this jointly sponsored plan, what do members pay toward the deficit as a percent of pay? {Example}
> A jointly sponsored public plan reports a going-concern deficit of $\$600$ million. Its rules split deficits equally between members and employers and fund them with level special payments over an illustrative 15 years at 6%, made at the start of each year. Covered payroll is $\$2.0$ billion.
>
> > [!answer]-
> > - The annuity-due factor is $\ddot{a}_{\overline{15}|} = (1 - 1.06^{-15})/(0.06/1.06) = 10.2950$.
> > - The special payments total $600 / 10.2950 = \$58.28$ million a year, $\$29.14$ million from each side.
> > - The members' share is $29.14 / 2{,}000 = 1.46\%$ of pay, on top of their regular contributions for 15 years.

## Risks to members and taxpayers

Public plans rarely fail outright, because the sponsor can tax, so the risk to members is political rather than an insolvency. A legislature can raise member contributions, trim cost-of-living adjustments or close the plan to new hires. Municipal bankruptcies, such as Detroit's in 2013, have cut accrued pensions. In a jointly sponsored plan, members share deficits directly through higher contributions or lower future benefits.

Taxpayers pay a shortfall through higher taxes or fewer public services, sometimes decades after the service was rendered. Contribution holidays and pay-as-you-go funding move the cost of today's services onto future taxpayers. A public plan's funding policy is therefore judged on intergenerational equity as well as on benefit security.

## Comparison with other plans

A public plan differs from a private [[Defined Benefit Plan|single-employer plan]] and from [[Social Insurance|social insurance]]:

| | Public sector plan | Private single-employer plan | Social insurance |
| :--- | :--- | :--- | :--- |
| Who is covered | The government's own workforce | One employer's workforce | Universal |
| Main risk to members | Political change to benefits | Sponsor insolvency | — |
| Funding discipline | The plan's own funding policy, usually outside the guarantee programs and private funding rules | Minimum funding rules, often a guarantee fund | Set by statute |
| Funding | Normally prefunded | Prefunded | Largely pay-as-you-go |
| Sponsor's aim for contributions | Stable as a share of the budget | Low and stable, for shareholders | — |
