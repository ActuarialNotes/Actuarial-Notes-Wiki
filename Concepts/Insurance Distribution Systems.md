---
verification:
  status: stale
  confidence: null
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:d89848a6aac36e327eeb464af6a951fb648def492640be495d9d3350e89232a7
  sources:
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012, CC BY-NC-SA), §7.1 Insurance Operations: Marketing, Underwriting, and Administration (Marketing intro; Life/Health; General Agency; Managerial; Group and Supplemental; Property/Casualty; Independent Agency; Direct Writers and Exclusive Agents; Brokers; Internet; Mass Merchandising; Service), sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html"
    - "NAIC Producer Licensing Model Act (MO-218, January 2005), §3, §5A, §12A(5),(7), §13A-D, §18A-D, sha256:5b1eafdc7b1a841a97440f0e1e7c98e30c935855de4add58838c0f76aee37a34 — https://content.naic.org/sites/default/files/model-law-218.pdf"
    - "NAIC Unfair Trade Practices Act (MO-880, Spring 2024), §4A(1),(4), §4B, §4I(1) Rebates, sha256:e27f5324468298edb8af55d6166ac73a928c7fcd2571340a51bb342a1bf7367e — https://content.naic.org/sites/default/files/model-law-880.pdf"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Distribution Systems.md
---

**Insurance Distribution Systems** are the arrangements through which an [[Insurer|insurer]] sells its policies and serves its customers: the independent agency and brokerage system, the exclusive agency system, the direct writer system, direct response, and managing general agents.

The first four differ in who sells and who owns the expirations, the right to the customer at renewal:

| System | Who sells | Represents | Owns the expirations |
| --- | --- | --- | --- |
| Independent agency and brokerage | Independent agents and brokers, paid by commission | Several unrelated insurers | The agent or broker |
| Exclusive agency | Exclusive agents, usually independent contractors | One insurer or a group under common ownership | Usually the insurer, with the agent holding limited or none |
| Direct writer | The insurer's own salaried or commissioned employees | The insurer | The insurer |
| Direct response | No producer: internet, telephone or mail | The insurer | The insurer |

Independent agents and brokers are businesses that represent several unrelated insurers and are paid by commission. They own the expirations, the right to the customer at renewal, so they can move an account to another insurer. The system gives an insurer broad reach without building a sales force, and gives customers a choice of insurers, at the price of higher commissions and less control.

Exclusive agents sell for one insurer or a group under common ownership. They are usually independent contractors, often supported by the insurer with training and office help, and typically have limited or no ownership of expirations. The insurer gets more control and loyalty, and usually pays lower commissions, but it bears the cost of building and supporting the agency force.

A direct writer sells through its own salaried or commissioned employees, and the insurer owns the expirations. This gives the most control of any system that uses salespeople.

In direct response, the insurer sells directly by internet, telephone or mail, without a producer. It has high fixed costs in advertising, technology and call centres, but low variable cost per policy, so it suits standardized products, such as personal auto, that customers can buy on price.

[[Insurance Producer]] covers the producers' functions, and [[Insurance Marketing]] covers how insurance is sold and the rules on licensing, compensation and advertising.

> [!example]- An insurer sells through people who represent only it and are independent contractors, and it owns the expirations. Which system is this? {Example}
> - The sellers represent one insurer, so this is not the independent agency and brokerage system.
> - They are independent contractors rather than the insurer's employees, so it is not the direct writer system.
> - Producers sell the policies, so it is not direct response.
> - It is the exclusive agency system, in which the agents typically have limited or no ownership of expirations.

## Managing general agents

A managing general agent (MGA) is an agency given wide authority by an insurer, which may include underwriting, binding, issuing policies, appointing sub-agents and handling claims, often for a specialty line or a region. It lets an insurer enter a market without building the operation itself. It delegates control, so the insurer must audit the MGA's underwriting.

## Communication channels

Communication channels are the ways an insurer and its customers connect within the systems. The internet lets customers get quotes and buy policies, and supports producers in every system. Call centres handle sales and service. Banks sell insurance to their customers in some jurisdictions. Affinity groups, such as employers, associations and alumni groups, offer insurance to their members, often as group or mass marketing programs. Many insurers use several systems and channels at once, a mixed or multichannel approach.

## Choosing a distribution system

The systems suit different markets. Direct response gives an insurer access to large markets at a low acquisition cost and sells uncomplicated products effectively, but complex products are hard to sell without an agent's services. Brokers are most significant in commercial property, liability, employee benefits and marine insurance, and they handle the accounts of large corporate buyers. Exclusive agents are paid lower commissions than independent agents, partly because the insurer absorbs some expenses that independent agents bear.

A system that pays lower commission can still cost more once the insurer's support costs are counted. If a policy costs $c_t$ to distribute in policy year $t$ and is renewed with retention rate $r$, its expected distribution cost over its life, undiscounted, is

> $$\text{Cost}_{\text{life}} = \sum_{t=1}^{\infty} c_t\, r^{t-1}$$

- $c_t$ is the commission plus any support the insurer pays in year $t$.
- $r^{t-1}$ is the probability the policy is still in force in year $t$.

> [!example]- Which agency system costs less over a policy's life? {Example}
> An insurer entering a new state compares two systems for homeowners policies with an average premium of $\$1{,}200$ and a retention rate of 85%. With illustrative terms, independent agents would earn 15% commission every year. Exclusive agents would earn 12% in the first year and 8% on renewals, and the insurer would spend $\$40$ per policy each year on their support. Ignore discounting.
>
> > [!answer]-
> > - The expected number of years in force is $1/(1 - 0.85) = 6.667$.
> > - The independent agency cost is $0.15 \times 1{,}200 \times 6.667 = \$1{,}200$.
> > - The exclusive agency cost is $\$184$ in the first year ($0.12 \times 1{,}200 + 40$) and $\$136$ in each renewal year ($0.08 \times 1{,}200 + 40$).
> > - Over the expected $5.667$ renewal years it totals $184 + 136 \times 5.667 = \$954.67$.
> > - The exclusive agency system costs about $\$245$ less per policy and gives the insurer more control.
> > - The independent agency system needs no investment in building an agency force, reaches customers at once across the state, and lets the insurer leave without stranded costs, so an insurer testing a new state might start with independent agents.

Direct response trades commission for fixed costs. If it has fixed costs $F$ a year and variable cost $v$ per policy, and an agency system pays commission at rate $c$ on average premium $P$, the number of policies at which the two cost the same is

> $$N^* = \frac{F}{c\,P - v}$$

Above $N^*$ policies direct response is cheaper, so its fixed costs are a barrier to entry for a small insurer.

> [!example]- At what number of auto policies does direct response cost less than independent agents? {Example}
> The average premium is $\$1{,}200$. With illustrative figures, the call centre, technology and advertising cost $\$3{,}000{,}000$ a year, and each policy costs $\$45$ to quote, issue and service. Independent agents would be paid 15% commission.
>
> > [!answer]-
> > - The commission saved per policy, net of the variable cost, is $0.15 \times 1{,}200 - 45 = \$135$.
> > - The break-even volume is $3{,}000{,}000 / 135 = 22{,}222$ policies.
> > - Above about 22,200 policies direct response is cheaper, and below it the agency system is.

> [!trap] Who owns the expirations
> Independent agents and brokers own their expirations. Direct writers and direct response insurers own theirs, and exclusive agents usually have limited or no ownership. An independent agent who sells online is still in the independent agency system, because a channel does not change the system.
