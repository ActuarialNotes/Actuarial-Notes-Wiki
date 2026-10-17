---
verification:
  status: verified
  confidence: medium
  last_checked: 2026-10-11
  last_checked_by: agent:validate-v1
  content_hash: sha256:7a5bbba0cc7be7c176f05538386e54c62b52dbb73a93284ba18af492df840529
  sources:
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012, CC BY-NC-SA), §6.4 Types of Insurance and Insurers (Stock Insurers; Mutual Insurers), sha256:627a6ed1d0a36f68e681bdcc3a027f60fd8537b741d67e2cbdea3d41eb76005d — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s10-04-types-of-insurance-and-insurer.html"
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012, CC BY-NC-SA), §7.2 Insurance Operations: Actuarial and Investment (investment paragraph: two businesses; assets cover reserves and leave adequate capital and surplus), sha256:0064ff8c9ff68c89296f1a67346ed0a2468f58d808fd560b9d5ad468da9db501 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-02-insurance-operations-actuarial.html"
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012, CC BY-NC-SA), §7.3 Reinsurance, Legal and Regulatory Issues, Claims, and Management (Benefits of Reinsurance: capacity, rapidly expanding company, reinsurer's knowledge of rates and underwriting), sha256:85078f2f0eb5eeae7a77d336f6f5ff14be25519272bfc27d528e037c21424877 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s11-03-insurance-operations-reinsuran.html"
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012, CC BY-NC-SA), §8.1 Insurance Market Conditions (soft/hard markets, capacity, cash flow underwriting, break-even combined ratios by line, box on the 2008-2009 recession), sha256:7e7830b39c5a0cd17f75dbfeb2f0d2abe4e422df2b92c3f0218097ca48411d3d — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s12-01-insurance-market-conditions.html"
    - "Baranoff, Brockett & Kahane, Risk Management for Enterprises and Individuals v1.0 (Saylor Academy 2012, CC BY-NC-SA), §8.2 Insurance Regulation (objective of solvency; Table 8.4; commissioner's powers incl. grant all, part or none of a rate request; licensing capital and surplus; solvency regulations, investments, RBC, reserves; prior approval and file-and-use; trade practices), sha256:d6b9f53c3fd3c106c652f9ef8b46b21ee9199f1fda6e8951f64e4cf4b09bb021 — https://saylordotorg.github.io/text_risk-management-for-enterprises-and-individuals/s12-02-insurance-regulation.html"
    - "Werner & Modlin, Basic Ratemaking, 5th ed. (CAS 2016), Ch.1 pp.5, 11 (PDF pp.17, 23); Ch.8 p.145 (PDF p.157); Ch.13 pp.239-246 (PDF pp.251-258), sha256:6b214d4db52674df2e83343920c06781e491254bd77f27e32ba312faaff3782c — https://www.casact.org/sites/default/files/2021-03/5_Werner_Modlin.pdf"
    - "IRMI Glossary, 'capacity', sha256:3415704b5ee0c824b7783afa78c17c89f84b733510356e74abb572b9a7cd9e6b — https://www.irmi.com/term/insurance-definitions/capacity"
    - "IRMI Glossary, 'Kenney ratio', sha256:29601c36922c9186f07f0fc8e5af26ab649858629e0be5e67c2485d666080cc0 — https://www.irmi.com/term/insurance-definitions/kenney-ratio"
  open_findings: 0
  open_critical: 0
  log: .verify/Concepts/Insurer Goals and Constraints.md
---

**Insurer Goals and Constraints** are what an [[Insurer|insurer]] is trying to achieve and what limits how far it can get there. A stock insurer is formed to make a profit for its owners, and a mutual's stated purpose is to provide low-cost insurance to the policyholders who own it. Either kind must stay solvent, able to pay claims when they come due after it has collected the premium, and that is also the main objective of insurance regulation. Its profit comes from underwriting and from investing the funds it holds. What limits it is the capital and surplus that back the business it writes, the rules on its rates, forms, licences and investments, the competitors its customers can buy from, the [[Underwriting Cycle|underwriting cycle]] and the economy, and its own systems and staff. Most decisions in [[Insurance Operations|insurance operations]], from a rate change to entering a new line, are made inside these limits.

> $$\text{Profit} = \text{UW profit} + \text{Investment income}$$

> $$\text{Indicated change} = \frac{\text{LR} + F}{1 - V - Q} - 1$$

> $$\text{GWP} \le k \times \text{Surplus}$$

- **Symbols:** The first line names the two main sources of an insurer's profit: [[Underwriting Profit|underwriting profit]], what the policies earn as premium less losses and expenses, and [[Investment Income|investment income]] on the funds it holds. In the [[Loss Ratio Method|loss ratio method]], LR is the projected loss and LAE ratio at current rates, $F$ is the fixed expense ratio, $V$ is the variable expense ratio and $Q$ is the [[Profit and Contingency Provision|target underwriting profit provision]]. In the capacity limit, GWP is annual gross [[Written Premium|written premium]], Surplus is policyholders' surplus ([[Capital and Surplus|capital and surplus]]), and $k$ is the premium-to-surplus ratio the insurer holds itself to. The Kenney rule of thumb sets $k = 2$ for an insurer writing only property insurance and $k = 3$ for one that also writes liability.
- **Profit on the capital at risk:** When an insurer sells a policy it takes the risk that the premium will not cover the claims and expenses. It supports that risk with capital, and that capital entitles it to a reasonable expected return. Because the [[Combined Ratio|combined ratio]] leaves out investment income, an insurer can be profitable with a combined ratio above 100%. The break-even level differs by line: long-tailed lines such as general liability hold premium longer before paying claims, so they break even at a higher combined ratio than homeowners does.
- **Stock and mutual insurers:** Stockholders provide a stock insurer's capital and receive dividends when it is profitable. A mutual has no stockholders and issues no stock. Its policyholders are its owners, and they share its profits as policyholder dividends.
- **Solvency:** Insurance delivers only a promise of future payment, so regulation's main objective is that the money to pay claims will be there. To be licensed, a stock insurer must hold a set amount of capital and surplus and a mutual a minimum surplus, and it must keep holding them. States also regulate the investments an insurer may make, the reserves it must set and its [[Risk-Based Capital|risk-based capital]]. The insurer's assets must cover its reserves and still leave adequate capital and surplus.
- **Capacity:** Capacity is the largest amount of insurance a company or the whole market can provide. It is set by financial strength, and the premium a company could still write on its unused capital is its surplus capacity. A rule such as the Kenney ratio turns this into a ceiling on written premium. [[Reinsurance]] adds capacity. A fast-growing insurer may cede some of its liabilities to a reinsurer to avoid impairing its capital, and one entering a line for the first time can use the reinsurer's knowledge of rates and underwriting practices.
- **Regulatory constraints:** U.S. insurers generally file their rates with the state ([[State Rating Laws]]). Some states require approval before the rates are used, and the commissioner may grant all, part or none of a requested increase. A jurisdiction may cap the overall rate change or any one customer's increase, require notices or a hearing above a threshold, ban a rating variable such as insurance credit score, prescribe a ratemaking technique, or dispute the actuary's assumptions. Whatever its indication, a company must charge compliant rates. Licensing, policy forms and trade practices, including marketing and claims handling ([[State Market Conduct Regulation]]), are regulated too.
- **Operational constraints:** Systems and resources can make an indicated change hard to put in place. Changing a rating algorithm's structure can require major systems work, and a new rating variable may need data the company has never collected or trained inspectors it does not have. A cost-benefit analysis compares the extra profit from the change with the cost of making it.
- **Competition and customers:** Profit is earned only on policies that are sold, and demand falls as price rises. Total profit therefore rises with price only up to a point, after which the business lost outweighs the higher price on the business kept. Customers' decisions to renew or switch depend on competitors' prices, the size of a rate change, how costly the product is, who the customer is, and their satisfaction with claims handling and service. Retention and close ratios are how a company watches its competitiveness.
- **The market cycle and the economy:** In a soft market losses are low and prices are very competitive, and the industry loosens underwriting standards to bring in cash to invest. In a hard market losses run above expectations, reserves fall short, and insurers draw on capital, so capacity falls and prices rise. A recession shrinks exposure bases, for example payroll for workers compensation and new homes for homeowners, and cuts investment returns, which calls for more discipline in underwriting.

> [!example]- A Rate Change the Regulator Caps {Example}
> A personal auto insurer writes \$10,000,000 of premium in a state. At current rates its projected loss and LAE ratio is 72%, its fixed expense ratio is 6%, its variable expense ratio is 22% and its target underwriting profit provision is 5%. The state will not approve an increase above 4% this year, and its marketing department warns that a large increase will send long-standing customers to competitors. Find the indicated change, and the underwriting profit margin the insurer can expect if it takes the 4% increase on the same exposures.
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
> > The indication is 6.85%, but the company must charge rates the state will approve, so it takes 4% and expects a 3.0% margin against its 5% target. The marketing warning points the same way, since a large increase drives customers to shop. The insurer can tighten its underwriting guidelines to write less business at rates it considers inadequate, aim its advertising at areas where it believes rates are adequate, or challenge the regulation, and it can file again next year.

> [!example]- Does the Growth Plan Fit the Insurer's Capacity? {Example}
> A small commercial insurer that writes property and liability insurance has \$40,000,000 of policyholders' surplus. It plans to grow from \$90,000,000 to \$130,000,000 of gross written premium by entering contractors' liability, a line it has never written. Its board holds it to the Kenney ratio of 3 to 1. A competitor is cutting prices in the line, and the economy is slowing. Does the plan fit, and what limits it?
>
> > [!answer]-
> > $$
> > \begin{align*}
> > k \times \text{Surplus} &= 3 \times 40{,}000{,}000 \\
> > &= 120{,}000{,}000 \\
> > \text{Surplus needed} &= \frac{130{,}000{,}000}{3} \\
> > &= 43{,}333{,}333
> > \end{align*}
> > $$
> > The plan needs \$10,000,000 more premium than the ratio allows, or about \$3,333,333 more surplus. The insurer can add surplus, grow more slowly, or use reinsurance, which adds capacity and brings the reinsurer's knowledge of rates and underwriting in a line new to the insurer. The price cutting and the slowing economy add to the risk. Prices that are very competitive and loose standards are the marks of a soft market, and a recession shrinks the exposure base the new business is priced on.

> [!tip]- How it appears on the exam
> - **DISC-RM:** *Insurer Goals and Constraints* is the first topic of the overview of insurance operations. The course text belongs to The Institutes and is not openly available, so this page does not reproduce its own list of goals and constraints; read the course for its exact wording. Expect questions on what an insurer is trying to achieve and on how a limit, such as capacity, rate regulation, competition or the market cycle, shapes a decision such as a rate change or a new line.
> - **DISC-RM:** The same limits return in the underwriting function, where [[Underwriting Policy|underwriting policy]] is set within them, and in measuring insurer performance through the [[Combined Ratio|combined ratio]].

> [!warning]- Exam traps
> - **A combined ratio over 100% is not a loss for the insurer:** It leaves out investment income, and a long-tailed line can break even well above 100%.
> - **Mutuals need surplus too:** A mutual has no stockholders to pay, but it must hold a minimum surplus to be licensed and keep holding it. "A mutual needs no surplus because it does not seek profit for stockholders" is wrong.
> - **The indication is not the rate charged:** Regulation, systems and the market can all lead a company to charge something other than the indicated rate, and it must charge compliant rates whatever the indication says.
> - **A higher price does not always mean more profit:** Demand falls as price rises, so past some point a higher rate loses more business than it gains in margin.
> - **Capacity moves with the cycle:** Capacity is high in a soft market and falls in a hard one, when losses force insurers to draw on capital.
