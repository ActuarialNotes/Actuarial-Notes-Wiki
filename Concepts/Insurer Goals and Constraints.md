---
verification:
  status: in_review
  confidence: null
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:bf7b27e1e33685a2f4eab2f6111056a39c7887c6a364c5185a9324cf1d219362
  sources:
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.8 (PDF p.157) loss ratio method, sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.7 p.129 (PDF p.148), sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
  open_findings: 1
  open_critical: 0
  log: .verify/Concepts/Insurer Goals and Constraints.md
---

**Insurer Goals and Constraints** are what an [[Insurer|insurer]] is trying to achieve and what limits its ability to achieve it. The major goals are to earn a profit, to meet customer needs, to comply with legal requirements and to fulfil its duty to society. The constraints are internal, such as its financial resources, people and expertise, and external, such as regulation, competition and economic conditions. The goals often conflict, so most decisions in [[Insurance Operations|insurance operations]], from a rate change to entering a new market, are a balance among them within the constraints.

> $$\text{Operating income} = \text{UW profit} + \text{Investment income}$$

> $$\text{Indicated change} = \frac{\text{LR} + F}{1 - V - Q} - 1$$

> $$\text{WP} \le k \times \text{Surplus}$$

- **Symbols:** The first identity measures the profit goal: [[Underwriting Profit|underwriting profit]] plus [[Investment Income|investment income]]. In the [[Loss Ratio Method|loss ratio method]], LR is the projected loss and LAE ratio at current rates, $F$ is the fixed expense ratio, $V$ is the variable expense ratio and $Q$ is the [[Profit and Contingency Provision|profit and contingency provision]]. In the capacity constraint, WP is annual [[Written Premium|written premium]], Surplus is policyholders' surplus and $k$ is the premium-to-surplus ratio the insurer, its regulator or rating agencies regard as prudent.
- **Earn a profit:** A stock insurer must give its owners a return that competes with other investments, and a mutual needs profit to build the surplus that backs its policies and funds growth. Profit comes from underwriting and from investing the funds held between collecting premium and paying claims, and over time it is what keeps the insurer [[Solvency|solvent]].
- **Meet customer needs:** Customers want coverage that fits their exposures, a fair price, good service, and claims paid promptly. An insurer that ignores them loses business to competitors, so this goal supports the profit goal in the long run even when it costs money in the short run.
- **Comply with legal requirements:** Insurers are licensed, and regulators oversee their solvency, [[State Rating Laws|rates]] and policy forms, and their [[State Market Conduct Regulation|market conduct]]. Compliance is not optional, so it acts as a goal and a constraint at once, and failing at it risks fines, lost licences and lost trust.
- **Fulfil the duty to society:** Because society relies on insurance to restore people and businesses after a loss, an insurer has a duty to stay solvent, treat customers and employees ethically, and support the economy through employment, taxes and investment. Many insurers also add loss prevention and community programs.
- **Internal constraints:** An insurer's capital and surplus limit how much business it can write safely, its people and their expertise limit the lines and markets it can serve well, and its systems, distribution and reputation shape what it can do quickly. A company that lacks the underwriting or claims expertise for a line takes on more risk than its numbers show.
- **External constraints:** Regulation limits rates, forms, investments and how the insurer treats customers. Competition limits the price it can charge and the selection it can apply, and economic conditions such as inflation, interest rates and recessions change claim costs, investment returns and demand. Catastrophes and the [[Underwriting Cycle|underwriting cycle]] change the market it works in.

> [!example]- A Rate Change When the Goals Conflict {Example}
> A personal auto insurer writes \$10,000,000 of premium in a state. At current rates its projected loss and LAE ratio is 72%, its fixed expense ratio is 6%, its variable expense ratio is 22% and its target profit provision is 5%. The state regulator signals that it will not approve an increase above 4% this year, and the marketing department warns that a large increase will drive away long-standing customers. Find the indicated change, and the profit margin the insurer can expect if it takes the 4% increase, assuming the same exposures.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{Indicated} &= \frac{0.72 + 0.06}{1 - 0.22 - 0.05} - 1 \\
> > &= \frac{0.78}{0.73} - 1 \\
> > &= 6.85\%
> > \end{align*}
> > $$
> > With a 4% increase the premium is \$10,400,000, losses and fixed expenses stay at \$7,200,000 and \$600,000, and variable expenses are 22% of the new premium.
> > $$
> > \begin{align*}
> > \text{UW profit} &= 10.4 - 7.2 - 0.6 - 0.22(10.4) \\
> > &= 0.312 \text{ million} \\
> > \text{Margin} &= \frac{0.312}{10.4} \\
> > &= 3.0\%
> > \end{align*}
> > $$
> > The profit goal calls for 6.85%, the compliance goal caps the increase at 4%, and the customer goal argues for less. Taking 4% meets the legal requirement and keeps more customers, at a margin of 3.0% against the 5% target. The insurer might close part of the gap through other levers within its constraints, such as tightening underwriting, reducing expenses, or filing a further increase next year with better support. Ignoring the regulator to reach the target was never an option.

> [!example]- Sorting Goals and Constraints for a Growth Plan {Example}
> A small commercial insurer with \$40,000,000 of surplus plans to grow from \$90,000,000 to \$130,000,000 of written premium by entering contractors' liability. Its board regards a premium-to-surplus ratio of 3 to 1 as the most it should run at. It has no contractors' underwriters, a competitor is cutting prices in the line, and the economy is slowing. Which goals and constraints are at work, and does the plan fit its capacity?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > k \times \text{Surplus} &= 3 \times 40{,}000{,}000 \\
> > &= 120{,}000{,}000
> > \end{align*}
> > $$
> > The plan needs \$130,000,000 of capacity, so surplus is a binding internal constraint: the insurer must raise capital, buy [[Reinsurance|reinsurance]] or grow more slowly. The missing expertise is a second internal constraint, and a reason to hire experienced underwriters before writing the business. Price cutting by the competitor and the slowing economy are external constraints that threaten the profit goal. The plan serves the profit goal and the customer goal of offering a new coverage, but only if the insurer grows within its capacity, which also serves its duty to society to stay solvent.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The overview of insurance operations opens with insurer goals and constraints. Questions ask for the four major goals, sort a list of factors into internal and external constraints, or describe how one goal can conflict with another.
> - **DISC-RM:** Short cases describe a decision, such as a rate change, a new line or a market withdrawal, and ask which goal it serves, which it puts at risk, or which constraint limits it. The same goals return later in the underwriting function, where [[Underwriting Policy|underwriting policy]] is set within these constraints.

> [!warning]- Exam traps
> - **Profit is not the only goal:** Answers that judge every decision on profit alone miss the other three goals. A decision that maximizes short-term profit by breaking a regulation or treating customers unfairly fails the insurer's goals overall.
> - **Mutuals also need profit:** A mutual insurer has no shareholders, but it still needs profit to build surplus and stay solvent. "Mutuals don't seek a profit" is a wrong answer.
> - **Internal versus external:** Constraints the insurer controls or owns, such as its capital, staff and expertise, are internal. Regulation, competition and the economy are external, even though they show up inside the insurer's own numbers.
> - **Compliance is a goal and a constraint:** Legal requirements appear on both lists. As a goal, the insurer seeks to comply; as a constraint, regulation limits what it can do. Don't treat the two lists as mutually exclusive.
