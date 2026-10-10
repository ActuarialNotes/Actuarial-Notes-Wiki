---
aliases:
  - Public Sector Employer
  - Government-sponsored Plan
verification:
  status: unverified
  confidence: null
  last_checked: null
  last_checked_by: null
  content_hash: sha256:7a507e2685533bf363e536ef9ec9eebb0e44f658e3b9fbd2f9a5bfef3e67f645
  sources: []
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Public Sector Pension Plan.md
---
A **Public Sector Pension Plan** is a [[Retirement Plan|retirement plan]] sponsored by a government or a public body, such as a state, province, municipality, school board, university or crown agency, for its employees. It is usually created by legislation, run by a board of trustees or a public pension agency, and funded by contributions from both the employer and the members. Because the employer is a government, the plan's deficits are ultimately the taxpayers', and its [[Funding Policy|funding policy]] has to balance benefit security against fairness between today's and tomorrow's taxpayers.

> $$UAL_t = AAL_t - AVA_t$$

> $$ADC_t = NC_t + P_t$$

> $$P_t = \frac{UAL_t}{\displaystyle\sum_{k=0}^{n-1}\left(\frac{1+g}{1+i}\right)^{k}}$$

> $$FR_t = \frac{AVA_t}{AAL_t}$$

- **Symbols:** $AAL_t$ is the [[Actuarial Accrued Liability|actuarial accrued liability]] under the plan's [[Actuarial Cost Method|cost method]], usually entry age normal, and $AVA_t$ is the [[Asset Valuation Method|actuarial value of assets]]. $UAL_t$ is the unfunded liability, $NC_t$ the [[Normal Cost|normal cost]] and $ADC_t$ the actuarially determined contribution. $P_t$ is the first payment of an amortization that rises with payroll at rate $g$ over $n$ years, discounted at the valuation rate $i$, so the payment is a level percent of payroll.
- **Governance:** The plan's terms, and often its contribution rates, are set in statute, so benefits can be changed only by the legislature or through bargaining. In Canada many large public plans are jointly sponsored: the employer and the unions share the governance and split both the contributions and any deficit, often equally. U.S. state and local plans are typically governed by boards that include members, retirees and appointees.
- **Risks to participants:** Public plans rarely fail outright, because the sponsor can tax, so the risk to members is political rather than an insolvency. A legislature can raise member contributions, trim cost-of-living adjustments or close the plan to new hires. Municipal bankruptcies, such as Detroit's in 2013, have cut accrued pensions. In a jointly sponsored plan, members share deficits directly through higher contributions or lower future benefits.
- **Risks to taxpayers:** A shortfall is paid through higher taxes or fewer public services, sometimes decades after the service was rendered. Contribution holidays and pay-as-you-go funding move the cost of today's services onto future taxpayers, which is the intergenerational equity problem at the centre of public funding policy.
- **Funding policy:** The actuarial community's model funding policies for public plans ask for an ADC built from a cost method that recognizes cost as a level percent of pay, asset smoothing within a corridor, and amortization of each year's gains and losses over a closed, layered period. The policy's goals are to fund each member's benefit by retirement, keep contributions stable as a share of the budget, and charge each generation of taxpayers for the services it receives.
- **Contrast with private plans:** A [[Defined Benefit Plan|single-employer]] private plan faces sponsor insolvency, is often backed by a guarantee fund and is subject to minimum funding rules, and its sponsor wants low and stable contributions for shareholders. A public plan is usually outside the guarantee programs and the private funding rules, so its own funding policy carries the discipline. [[Social Insurance|Social insurance]] plans differ again: they are universal, set by statute and largely pay-as-you-go, while a public employer plan covers only the government's own workforce and is normally prefunded.
- **Discount rate:** Most U.S. public plans value liabilities at the expected return on their assets. A higher discount rate makes the plan look better funded and lowers the ADC, but it does not change the benefits, so the shortfall shows up later if the returns fall short.

> [!example]- An ADC With Level-Percent-of-Payroll Amortization {Example}
> A state plan has an actuarial accrued liability of \$12.0 billion and an actuarial value of assets of \$9.0 billion. Payroll is \$1.5 billion and is expected to grow 3% a year, the valuation rate is 7%, and the normal cost is 12% of payroll, of which members pay 7%. The funding policy amortizes the unfunded liability as a level percent of payroll over 20 years, with payments at the start of each year. Find the ADC and the employer's share as a percent of payroll.
>
> > [!answer]-
> > The unfunded liability is $12.0 - 9.0 = 3.0$ billion, and the payments grow with payroll.
> > $$
> > \begin{align*}
> > \ddot{a} &= \frac{1 - (1.03/1.07)^{20}}{1 - 1.03/1.07} \\
> > &= 14.2649 \\
> > P_0 &= \frac{3.0}{14.2649} \\
> > &= 0.2103 \\
> > ADC &= 0.12 \times 1.5 + 0.2103 \\
> > &= 0.3903
> > \end{align*}
> > $$
> > The ADC is \$390.3 million, or 26.0% of payroll. Members pay 7%, so the employer pays \$285.3 million, 19.0% of payroll. The first amortization payment, \$210.3 million, barely covers the \$210 million of interest on the unfunded liability, so after 10 years about \$2.4 billion of it is still unpaid. Over 30 years the first payment would be \$164.7 million, less than the interest, and the unfunded liability would grow for several years before it began to fall, which is called negative amortization. A level-dollar schedule over 20 years would charge \$264.7 million from the start.

> [!example]- Sharing a Deficit in a Jointly Sponsored Plan {Example}
> A jointly sponsored public plan reports a going-concern deficit of \$600 million. Its rules split deficits equally between members and employers and fund them with level special payments over an illustrative 15 years at 6%, made at the start of each year. Covered payroll is \$2.0 billion. Find each side's special payment and the members' share as a percent of pay.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \ddot{a}_{\overline{15}|} &= \frac{1 - 1.06^{-15}}{0.06/1.06} \\
> > &= 10.2950 \\
> > SP &= \frac{600}{10.2950} \\
> > &= 58.28 \\
> > \frac{SP/2}{2{,}000} &= 1.46\%
> > \end{align*}
> > $$
> > The special payments are \$58.3 million a year, \$29.1 million from each side. The members pay an extra 1.46% of pay on top of their regular contributions for 15 years, which is how a jointly sponsored plan hands part of the investment risk to its participants.

> [!tip]- How it appears on the exam
> - **RET-101 (2b):** Candidates contrast the risks borne by members of public sector plans with those in single-employer plans, plans with more than one employer and social insurance, using the AAA paper on public plan risk management.
> - **RET-101 (4e):** A design question asks where the sponsor's goals and the taxpayers' perspective conflict, such as rich early retirement subsidies or indexing that taxpayers fund.
> - **RET-201 (5b):** Candidates analyze and defend a funding policy for a government-sponsored plan, choosing the cost method, asset smoothing and amortization approach and explaining their effect on contribution stability and intergenerational equity.
> - **Calculations:** Short calculations find the ADC from the normal cost and the amortization of the unfunded liability, or compare level-dollar and level-percent-of-pay schedules.

> [!warning]- Exam traps
> - **Level percent of pay back-loads the cost:** Payments that grow with payroll start lower than level-dollar payments, and over a long period the first ones can fall below the interest on the unfunded liability. Calling the schedule "amortizing" when the UAL is growing misses negative amortization.
> - **Discount at the growth-adjusted rate:** The amortization factor uses $(1+g)/(1+i)$, not $v = 1/(1+i)$. Using the ordinary annuity factor gives the level-dollar payment.
> - **The taxpayer is a stakeholder:** A public plan's funding policy is judged on intergenerational equity as well as on benefit security. An answer that weighs only members and the employer leaves out the people who pay for any shortfall.
> - **Not social insurance:** A public employee plan covers the government's own workforce and is normally prefunded, while social insurance is universal and largely pay-as-you-go. The risks and the funding logic of the two differ.
> - **Members' share of contributions:** The ADC is the total cost. The employer pays the ADC minus the members' contributions, so an answer that charges the whole ADC to the employer overstates its cost.
