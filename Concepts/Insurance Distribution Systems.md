---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:905b62546916f2ba6af71393562faaac3e40829191621a07cc5eafa590e506c4
  sources:
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.5 pp.95-99, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s11-01 x-date; exclusive agents lower commissions; brokers in commercial lines, sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html"
    - "IRMI Glossary, \"managing general agent\", definition, sha256:6a995d166456ad5d3628e11e57d8985a68e371bb26fa474f7cdf606b39cd1ce6 — https://www.irmi.com/term/insurance-definitions/managing-general-agent"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Distribution Systems.md
---

**Insurance Distribution Systems** are the arrangements through which an [[Insurer|insurer]] sells its policies and serves its customers: the independent agency and brokerage system, the exclusive agency system, the direct writer system, direct response, and managing general agents. Communication channels, such as the internet, call centres, banks and affinity groups, are the ways an insurer and its customers connect within those systems.

> $$\text{Cost}_{\text{life}} = \sum_{t=1}^{\infty} c_t\, r^{t-1}$$

> $$N^* = \frac{F}{c\,P - v}$$

- **Symbols:** $\text{Cost}_{\text{life}}$ is the expected distribution cost of one policy over its life, undiscounted. $c_t$ is the cost in policy year $t$, such as commission plus any support the insurer pays, and $r$ is the retention rate at each renewal, so the policy is still in force in year $t$ with probability $r^{t-1}$. In the break-even, a direct response operation has fixed costs $F$ a year and variable cost $v$ per policy, an agency system pays commission at rate $c$ on average premium $P$, and $N^*$ is the number of policies at which the two cost the same.
- **Independent agency and brokerage:** Independent agents and brokers are businesses that represent several unrelated insurers and are paid by commission. They own the expirations, the right to the customer at renewal, so they can move an account to another insurer. The system gives an insurer broad reach without building a sales force, and gives customers a choice of insurers, at the price of higher commissions and less control.
- **Exclusive agency:** Exclusive agents sell for one insurer or a group under common ownership. They are usually independent contractors, often supported by the insurer with training and office help, and typically have limited or no ownership of expirations. The insurer gets more control and loyalty, and usually pays lower commissions, but it bears the cost of building and supporting the agency force.
- **Direct writer:** A direct writer sells through its own salaried or commissioned employees, and the insurer owns the expirations. This gives the most control of any system that uses salespeople.
- **Direct response:** The insurer sells directly by internet, telephone or mail, without a producer. It has high fixed costs in advertising, technology and call centres, but low variable cost per policy, so it suits standardized products, such as personal auto, that customers can buy on price.
- **Managing general agents:** An MGA is an agency given wide authority by an insurer, which may include underwriting, binding, issuing policies, appointing sub-agents and handling claims, often for a specialty line or a region. It lets an insurer enter a market without building the operation itself, but it delegates control, so the insurer must audit the MGA's underwriting.
- **Channels:** The internet lets customers get quotes and buy policies, and supports producers in every system. Call centres handle sales and service. Banks sell insurance to their customers in some jurisdictions, and affinity groups, such as employers, associations and alumni groups, offer insurance to their members, often as group or mass marketing programs. Many insurers use several systems and channels at once, a mixed or multichannel approach.
- **Selection factors:** The systems suit different markets. Direct response gives an insurer access to large markets at a low acquisition cost and sells uncomplicated products effectively, but complex products are hard to sell without an agent's services. Brokers are most significant in commercial property, liability, employee benefits and marine insurance, and they handle the accounts of large corporate buyers. Exclusive agents are paid lower commissions than independent agents, partly because the insurer absorbs some expenses that independent agents bear, and the insurer owns the expirations. See [[Insurance Producer]] for the producers' functions and [[Insurance Marketing]] for the targeting that comes first.

> [!example]- Commission Cost Against Control for Two Agency Systems {Example}
> An insurer entering a new state compares two systems for homeowners policies with an average premium of \$1,200 and a retention rate of 85%. With illustrative terms, independent agents would earn 15% commission every year. Exclusive agents would earn 12% in the first year and 8% on renewals, and the insurer would spend \$40 per policy each year on their training, systems and office support. Compare the expected distribution cost over the life of a policy, ignoring discounting.
>
> > [!answer]-
> > The expected number of years in force is $1/(1 - 0.85) = 6.667$.
> > $$
> > \begin{align*}
> > \text{Cost}_{\text{IA}} &= 0.15 \times 1{,}200 \times 6.667 \\
> > &= 1{,}200 \\
> > c_1 &= 0.12 \times 1{,}200 + 40 \\
> > &= 184 \\
> > c_{t \ge 2} &= 0.08 \times 1{,}200 + 40 \\
> > &= 136 \\
> > \text{Cost}_{\text{EA}} &= 184 + 136 \times (6.667 - 1) \\
> > &= 954.67
> > \end{align*}
> > $$
> > The exclusive agency system costs about \$245 less per policy and gives the insurer more control, including ownership of the expirations. The independent agency system costs more but needs no investment in recruiting and building an agency force, reaches customers at once across the state, and lets the insurer leave without stranded costs if the market disappoints. An insurer testing a new state might start with independent agents and switch once it has the volume.

> [!example]- Break-Even Volume for Direct Response {Example}
> The same insurer considers selling auto policies with an average premium of \$1,200 by direct response. With illustrative figures, the call centre, technology and advertising cost \$3,000,000 a year, and each policy costs \$45 to quote, issue and service. Independent agents would be paid 15% commission. At what number of policies does direct response cost less?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > N^* &= \frac{3{,}000{,}000}{0.15 \times 1{,}200 - 45} \\
> > &= \frac{3{,}000{,}000}{135} \\
> > &= 22{,}222
> > \end{align*}
> > $$
> > Above about 22,200 policies direct response is cheaper, and below it the agency system is. Direct response is a scale business: it pays off for a large insurer writing a standardized product, and it loses money for a small one, which is why its fixed costs are a barrier to entry.

> [!tip]- How it appears on the exam
> - **DISC-RM:** The marketing and distribution section covers distribution systems and channels and how an insurer selects them. Questions describe a system, such as producers representing several insurers who own their expirations, and ask which system it is, or ask which system best fits an insurer with a given target market and goals.
> - **DISC-RM:** Selection questions give a case, such as an insurer entering a new region, launching a niche commercial product or competing on price for personal auto, and ask which factor should weigh most or which system fits.

> [!warning]- Exam traps
> - **Ownership of expirations:** Independent agents and brokers own their expirations, while direct writers and direct response insurers own theirs. Exclusive agents usually have limited or no ownership. Mixing these up is the most common wrong answer about the systems.
> - **Systems versus channels:** The internet, call centres, banks and affinity groups are channels that any system can use. An independent agent who sells online is still in the independent agency system.
> - **Exclusive agents are not employees:** Exclusive agents are usually independent contractors representing one insurer. Salaried employees selling for the insurer belong to the direct writer system.
> - **Low commission is not low cost:** A system that pays lower commission can still cost more once the insurer's support costs, or direct response's fixed costs, are counted. Compare the whole cost at the volume the insurer expects.
> - **Brokers and agents:** A broker legally represents the buyer, and an agent represents the insurer. An independent producer may act as one or the other depending on the insurer and the transaction.
