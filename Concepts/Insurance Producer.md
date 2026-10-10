---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-10
  last_checked_by: agent:validate-v1
  content_hash: sha256:8aa6ac18d288e3aa4fef3719b8670ad379b443aa89a0fd70165952698c4eec64
  sources:
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s11-01 agents vs brokers; binding; x-date, sha256:9abf601a8c7e62c112667b15df20471c0a07e5e32ff1dea40448eec0afdccf7e — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-01-insurance-operations-marketing.html"
    - "Baranoff et al., Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012), s12-02 licensing; unfair practices; misappropriation, sha256:d6b9f53c3fd3c106c652f9ef8b46b21ee9199f1fda6e8951f64e4cf4b09bb021 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s12-02-insurance-regulation.html"
    - "Rejda & McNamara, Principles of Risk Management and Insurance, 12th ed. (Pearson 2014), Ch.5 pp.93-99; Ch.6 p.108; Ch.8 pp.145-146, sha256:d287eea5870c8b2d7dcfd205f5c26283d5c3cb4f536965eb8c21a344c428aed0"
    - "IRMI Glossary, \"producer\", definition, sha256:ab86f978b17bbaa40dcb8086817cd5a3fa812fc527a86b508f7d5412ecdeb1ea — https://www.irmi.com/term/insurance-definitions/producer"
    - "IRMI Glossary, \"contingent commission\", definition, sha256:5f3bd9ede066a8144c57ce4b896a8611d06972318b0a2c2cf56f740e64cb4ad1 — https://www.irmi.com/term/insurance-definitions/contingent-commission"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurance Producer.md
---

An **Insurance Producer** is a licensed person or firm that sells, solicits or negotiates insurance: an agent, who acts for the [[Insurer|insurer]] under an agency agreement, or a broker, who acts for the buyer. Producers are the marketing and distribution function of [[Insurance Operations|insurance operations]] in the independent agency and brokerage system and the exclusive agency system, while direct writers use salaried sales employees and direct response insurers sell without a producer at all. Producers are paid mostly by commission, a share of the premium they place.

> $$C = c \times \text{WP}$$

> $$C_{\text{cont}} = s \times \max\left(0,\ T - \text{LR}\right) \times \text{EP}$$

- **Symbols:** $C$ is the base commission, $c$ the commission rate and WP the [[Written Premium|written premium]] the producer places. $C_{\text{cont}}$ is a contingent commission: $T$ is a target [[Loss Ratio|loss ratio]], LR is the loss ratio on the producer's book with the insurer, EP is the book's [[Earned Premium|earned premium]] and $s$ is the share of the margin below the target paid to the producer. Actual contingent commission formulas vary by insurer and often add volume or growth conditions.
- **Agents and brokers:** An agent's authority comes from the insurer, and an agent often has binding authority, the power to put coverage in force before the insurer issues the policy. A broker legally represents the insured, shops the account among insurers, and usually cannot bind an insurer on its own. Many large firms act as brokers for some insurers and as agents for others.
- **Independent agency and brokerage system:** Independent agents and brokers are independent businesses that represent several unrelated insurers. They own the expirations, the records of their customers and the right to solicit them at renewal, so they can move an account to another insurer.
- **Exclusive agency system:** Exclusive agents represent one insurer or a group of insurers under common ownership. They are usually independent contractors, but they typically have limited or no ownership of expirations.
- **Direct writers and direct response:** A direct writer sells through its own employees, and the insurer owns the expirations. Direct response insurers sell by telephone, mail or the internet without a producer, and the insurer keeps the customer relationship entirely. Many insurers combine several of these channels, which is called a mixed marketing system.
- **Functions of producers:** Producers sell the insurer's policies: agents who sell insurance are called producers because no business is produced until a policy is sold. Using the insurer's forms, an independent agent binds the insurer, sends underwriting information to it and later delivers the policy, and may or may not collect premiums. Brokers place business for their clients, and modern brokerage firms also provide risk management surveys and administrative and claim services to self-insurers.
- **Licensing:** State insurance laws require agents, brokers and claims adjusters to be licensed, and the commissioner can grant, deny or suspend licenses; unfair practices and misappropriation of premium can cost a producer its license. Insurers themselves must be licensed in each state where they do business. In Canada, the provinces license agents, brokers and adjusters as part of [[Market Conduct Regulation|market conduct regulation]].
- **Why it matters to actuaries:** The distribution system drives the [[Expense Ratio|expense ratio]] and the persistency of the book. Commissions are a [[Variable Expenses|variable expense]] in the rate, and contingent commissions depend on the book's results, so they are accrued as the loss ratio develops.

> [!example]- Commission and Contingent Commission on an Agency's Book {Example}
> An insurer pays an independent agency a base commission of 15% of written premium. With illustrative terms, it also pays a contingent commission of 25% of the margin by which the agency's loss ratio falls below 60%, applied to earned premium. During the year the agency writes \$2,000,000 of premium with the insurer, earns \$1,900,000 and incurs \$950,000 of losses. Find the agency's total commission and its rate on written premium.
>
> > [!answer]-
> > $$
> > \begin{align*}
> > \text{LR} &= \frac{950{,}000}{1{,}900{,}000} \\
> > &= 50\% \\
> > C &= 0.15 \times 2{,}000{,}000 \\
> > &= 300{,}000 \\
> > C_{\text{cont}} &= 0.25 \times (0.60 - 0.50) \times 1{,}900{,}000 \\
> > &= 47{,}500 \\
> > \text{Total} &= 300{,}000 + 47{,}500 \\
> > &= 347{,}500 \\
> > \text{Rate} &= \frac{347{,}500}{2{,}000{,}000} \\
> > &= 17.4\%
> > \end{align*}
> > $$
> > The contingent commission rewards the agency for bringing in profitable business, which aligns its interest with the insurer's underwriting goals. Because the loss ratio is measured before the losses are fully developed, the insurer's estimate of the payment can change after the year ends.

> [!example]- Who Can Move the Account at Renewal? {Example}
> A restaurant has bought its property and liability coverage through the same producer for five years. At renewal, the producer believes another insurer offers better terms. What can the producer do if it is an independent agent, an exclusive agent, or a direct writer's sales representative?
>
> > [!answer]-
> > An independent agent owns the expirations, so it can place the restaurant with another insurer it represents, and the current insurer has no right to the customer's renewal information. An exclusive agent represents one insurer or group and typically doesn't own the expirations, so it can only offer that insurer's products and can't take the account elsewhere. A direct writer's sales representative is the insurer's employee, the insurer owns the account, and the representative has no other insurer to offer. This difference is one reason insurers that use independent agents must keep their price and service competitive at every renewal.

> [!tip]- How it appears on the exam
> - **DISC-RM:** Questions ask candidates to describe the distribution systems and channels, compare agents and brokers, and list or apply the functions producers perform, such as which function a producer is carrying out in a short scenario. A related objective asks how an insurer selects distribution systems for its markets.
> - **DISC-IA:** The regulation section asks why and how insurers and insurance personnel are licensed, including producers and claims representatives, and what regulators can do when a licensee breaks the rules. The licensing rules are on [[Insurance Licensing]].

> [!warning]- Exam traps
> - **Agent versus broker:** An agent represents the insurer and a broker represents the buyer. Saying that an independent agent represents the customer confuses the agency relationship with the customer relationship the agent manages.
> - **Exclusive does not mean employee:** Exclusive agents are usually independent contractors who sell for one insurer. The salaried sales employee belongs to the direct writer system.
> - **Ownership of expirations:** The independent agent owns the expirations, and the direct writer's insurer owns them. Ownership is what lets an independent agent move an account, so it is a common distinguishing question.
> - **Contingent commission is not guaranteed:** It depends on the book's loss ratio and often its volume, and it is paid only when the conditions are met. Treating it as part of the fixed commission rate overstates the insurer's acquisition cost in a bad year and understates it in a good one.
